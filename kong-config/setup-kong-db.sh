#!/bin/sh

KONG_ADMIN_URL="http://kong:8001"
KEYCLOAK_URL="http://keycloak:8180/realms/votacion_ot"

##########################
# Install Dependencies
##########################

# Install jq if missing
if ! command -v jq &> /dev/null; then
  echo "Installing jq..."
  apk add --no-cache jq || (echo "Failed to install jq" && exit 1)
fi

# Install curl if missing
if ! command -v curl &> /dev/null; then
  echo "Installing curl..."
  apk add --no-cache curl || (echo "Failed to install curl" && exit 1)
fi

# Install openssl if missing
if ! command -v openssl &> /dev/null; then
  echo "Installing openssl..."
  apk add --no-cache openssl || (echo "Failed to install openssl" && exit 1)
fi

##########################
# Wait for Kong Admin API
##########################

# Wait for Kong Admin API to be available
until curl -s ${KONG_ADMIN_URL}/status > /dev/null; do
  echo "Waiting for Kong Admin API..."
  sleep 5
done

echo "Kong Admin API is available."

##########################
# Kong Service Configuration
##########################

echo "Configuring Kong for OIDC (via JWT validation) and API Key..."

# Create a Kong service for the backend API
curl -i -X POST ${KONG_ADMIN_URL}/services \
   --data "id=94157cc3-0e51-4950-8fdb-384f95987c09" \
   --data "name=backend-service" \
   --data "url=http://backend:8080" \
   --data "protocol=http"

# Create a free Kong service for the backend API
curl -i -X POST ${KONG_ADMIN_URL}/services \
   --data "id=94157cc3-0e51-4950-8fdb-156f95987c09" \
   --data "name=backend-free-service" \
   --data "url=http://backend:8080/Participants" \
   --data "protocol=http"

# Create a Kong service for Keycloak
curl -i -X POST ${KONG_ADMIN_URL}/services \
   --data "id=c0505e29-360b-40b3-8f90-b36611cd38f3" \
   --data "name=keycloak-service" \
   --data "url=http://keycloak:8180" \
   --data "protocol=http"


##########################
# Kong Route Configuration
##########################

### Backend Free Service Routes ###
curl -s -X POST ${KONG_ADMIN_URL}/routes \
    --data "service.name=backend-service" \
    --data "id=3c02b7c0-0e0b-258f-b9b3-332a1b458e02" \
    --data "service.id=94157cc3-0e51-4950-8fdb-156f95987c09" \
    --data "paths[]=/free" \
    --data "paths[]=/free/*" \
    --data "strip_path=true"

#Create an API Key route for backend-service
 APIKEY_ROUTE_RESPONSE=$(curl -s -X POST ${KONG_ADMIN_URL}/routes \
   --data "service.name=backend-service" \
   --data "id=3c02b7c0-0e0b-466f-b9b3-332a1b458e01" \
   --data "service.id=94157cc3-0e51-4950-8fdb-384f95987c09" \
   --data "paths[]=/api-key" \
   --data "paths[]=/api-key/*" \
   --data "strip_path=true")

# Create a Keycloak route
curl -s -X POST ${KONG_ADMIN_URL}/routes \
    --data "service.name=keycloak" \
    --data "id=92e33755-3d1a-4469-81c2-ca7dc98c589d" \
    --data "service.id=c0505e29-360b-40b3-8f90-b36611cd38f3" \
    --data "paths[]=/auth" \
    --data "paths[]=/auth/*" \
    --data "strip_path=false"

### Backend Service Routes ###
curl -s -X POST ${KONG_ADMIN_URL}/routes \
    --data "service.name=backend-service" \
    --data "id=3c02b7c0-0e0b-466f-b9b3-332a1b458e02" \
    --data "service.id=94157cc3-0e51-4950-8fdb-384f95987c09" \
    --data "paths[]=/" \
    --data "strip_path=false"



 APIKEY_ROUTE_ID=$(echo "$APIKEY_ROUTE_RESPONSE" | jq -r '.id')
 if [ -z "$APIKEY_ROUTE_ID" ]; then
   echo "Failed to create API Key route for backend-service"
   exit 1
 fi

echo "API Key Route for backend-service created with ID: $APIKEY_ROUTE_ID"

# Create a JWT route for backend-service
# JWT_ROUTE_RESPONSE=$(curl -s -X POST ${KONG_ADMIN_URL}/routes \
#   --data "service.name=backend-service" \
#   --data "paths[]=/api" \
#   --data "paths[]=/api/*" \
#   --data "strip_path=true")

# JWT_ROUTE_ID=$(echo "$JWT_ROUTE_RESPONSE" | jq -r '.id')
# if [ -z "$JWT_ROUTE_ID" ]; then
#   echo "Failed to create JWT route for backend-service"
#   exit 1
# fi

# echo "JWT Route for backend-service created with ID: $JWT_ROUTE_ID"

# Create a route for OIDC authentication
# OIDC_ROUTE_RESPONSE=$(curl -s -X POST ${KONG_ADMIN_URL}/routes \
#   --data "service.name=backend-service" \
#   --data "paths[]=/oidc" \
#   --data "paths[]=/oidc/*" \
#   --data "strip_path=true")

# OIDC_ROUTE_ID=$(echo "$OIDC_ROUTE_RESPONSE" | jq -r '.id')
# if [ -z "$OIDC_ROUTE_ID" ]; then
#   echo "Failed to create OIDC route for backend-service"
#   exit 1
# fi

# echo "OIDC Route for backend-service created with ID: $OIDC_ROUTE_ID"

##########################
# Plugin Configuration
##########################

echo "Configuring plugins..."

# Enable the OIDC plugin on the OIDC route
curl -s -X POST ${KONG_ADMIN_URL}/plugins \
  --data "id=3d1b5e45-8b4b-4052-9f2e-297806d5902a" \
  --data "route.id=3c02b7c0-0e0b-466f-b9b3-332a1b458e02" \
  --data "name=oidc" \
  --data "config.client_id=web-client" \
  --data "config.client_secret=cf657905-6daa-4e65-806f-86dd7c968b78" \
  --data "config.bearer_jwt_auth_enable=yes" \
  --data "config.access_token_as_bearer=yes" \
  --data "config.discovery=http://localhost:8000/auth/realms/votacion_ot/.well-known/openid-configuration"

# Enable the JWT plugin on the JWT route
# curl -i -X POST ${KONG_ADMIN_URL}/routes/${JWT_ROUTE_ID}/plugins \
#   --data "name=jwt" \
#   --data "config.uri_param_names=jwt" \
#   --data "config.key_claim_name=iss" \
#   --data "config.secret_is_base64=false"

 # Enable the API Key plugin on the API Key route
curl -i -X POST ${KONG_ADMIN_URL}/routes/${APIKEY_ROUTE_ID}/plugins \
  --data "name=key-auth" \
  --data "config.key_names=apikey" \
  --data "config.key_in_query=true" \
  --data "config.key_in_header=true" \
  --data "config.key_in_body=false"

# Enable the CORS plugin on the backend-service
#http://localhost:8002,http://localhost:8000,http://votacion-frontend,http://localhost,http://localhost:8180
curl -X POST ${KONG_ADMIN_URL}/plugins \
  --data "name=cors" \
  --data "config.origins=*" \
  --data "config.methods[]=GET" \
  --data "config.methods[]=HEAD" \
  --data "config.methods[]=PUT" \
  --data "config.methods[]=PATCH" \
  --data "config.methods[]=POST" \
  --data "config.methods[]=DELETE" \
  --data "config.methods[]=OPTIONS" \
  --data "config.methods[]=TRACE" \
  --data "config.methods[]=CONNECT" \
  --data "config.headers=Accept,Authorization,Content-Type" \
  --data "config.exposed_headers=Content-Length" \
  --data "config.credentials=true" \
  --data "config.max_age=3600"



##########################
# Keycloak Consumer and JWT Setup
##########################

#echo "Setting up Keycloak consumer and JWT..."

# Add Keycloak as a consumer
# curl -i -X POST ${KONG_ADMIN_URL}/consumers \
#   --data "username=keycloak"

# Retrieve Keycloak's JWKS response and extract the signing key
# JWKS_URL="${KEYCLOAK_URL}/protocol/openid-connect/certs"
# JWKS_RESPONSE=$(curl -s "${JWKS_URL}")

# X5C=$(echo "$JWKS_RESPONSE" | jq -r '.keys[] | select(.alg=="RS256" and .use=="sig") | .x5c[0]')

# if [ -z "$X5C" ] || [ "$X5C" == "null" ]; then
#     echo "Failed to fetch Keycloak public signing key certificate"
#     exit 1
# fi

# Format and extract the RSA public key
# FORMATTED_CERT=$(echo "$X5C" | sed 's/\(.\{64\}\)/\1\n/g')
# CERTIFICATE="-----BEGIN CERTIFICATE-----\n${FORMATTED_CERT}\n-----END CERTIFICATE-----"

# Write the certificate to a temporary file
# CERT_FILE=$(mktemp)
# echo -e "$CERTIFICATE" > "$CERT_FILE"

# Extract the RSA public key from the certificate
# RSA_PUBLIC_KEY=$(openssl x509 -pubkey -noout -in "$CERT_FILE")
# rm "$CERT_FILE"

# if [ -z "$RSA_PUBLIC_KEY" ]; then
#     echo "Failed to extract RSA public key from certificate"
#     exit 1
# fi

# Register the RSA public key in Kong for the keycloak consumer
# curl -i -X POST "${KONG_ADMIN_URL}/consumers/keycloak/jwt" \
#     --data "algorithm=RS256" \
#     --data "key=keycloak-key" \
#     --data-urlencode "rsa_public_key=${RSA_PUBLIC_KEY}" \
#     --data "secret="

##########################
# API Key Consumer Setup
##########################

echo "Setting up API Key consumer..."

 Create an API Key consumer
 curl -i -X POST ${KONG_ADMIN_URL}/consumers \
   --data "username=api-key-user"

 Generate an API Key for the consumer
 API_KEY_RESPONSE=$(curl -s -X POST ${KONG_ADMIN_URL}/consumers/api-key-user/key-auth)
 API_KEY=$(echo "$API_KEY_RESPONSE" | jq -r '.key')
 Generate an API Key for the consumer
 API_KEY_RESPONSE=$(curl -s -X POST ${KONG_ADMIN_URL}/consumers/api-key-user/key-auth)
 API_KEY=$(echo "$API_KEY_RESPONSE" | jq -r '.key')

 if [ -z "$API_KEY" ]; then
   echo "Failed to generate API key"
   exit 1
 fi
 if [ -z "$API_KEY" ]; then
   echo "Failed to generate API key"
   exit 1
 fi

echo "API Key for api-key-user: $API_KEY"

##########################
# Final Message
##########################

echo "Kong setup completed successfully!"
echo "Use the following endpoints for testing:"
echo ""
#echo "For JWT authentication, issue a request with a valid JWT token via query param 'jwt':"
#echo "curl -X GET http://kong:8000/api/home?jwt=<your_valid_jwt>"
#echo ""
echo "For API Key authentication, use the generated API key (query param or header):"
echo "curl -X GET http://kong:8000/api-key/home?apikey=$API_KEY"
echo "or"
echo "curl -X GET http://kong:8000/api-key/home -H \"apikey: $API_KEY\""