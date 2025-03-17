#!/bin/sh

KONG_ADMIN_URL="http://kong:8001"
KEYCLOAK_URL="http://keycloak:8180/realms/myrealm"

# Install jq and curl if missing (for Alpine-based images)
if ! command -v jq &> /dev/null; then
  echo "Installing jq..."
  apk add --no-cache jq || (echo "Failed to install jq" && exit 1)
fi

if ! command -v curl &> /dev/null; then
  echo "Installing curl..."
  apk add --no-cache curl || (echo "Failed to install curl" && exit 1)
fi

if ! command -v openssl &> /dev/null; then
  echo "Installing openssl..."
  apk add --no-cache openssl || (echo "Failed to install openssl" && exit 1)
fi

# Wait for Kong Admin API to be available
until curl -s ${KONG_ADMIN_URL}/status > /dev/null; do
  echo "Waiting for Kong Admin API..."
  sleep 5
done

echo "Configuring Kong for OIDC (via JWT validation) and API Key..."

# Create a Kong service (your backend API)
curl -i -X POST ${KONG_ADMIN_URL}/services \
  --data "name=backend-service" \
  --data "url=http://backend:8080"

# Create a route that uses JWT authentication (for /api/* endpoints)
JWT_ROUTE_RESPONSE=$(curl -s -X POST ${KONG_ADMIN_URL}/routes \
  --data "service.name=backend-service" \
  --data "paths[]=/api" \
  --data "paths[]=/api/*" \
  --data "strip_path=true")

JWT_ROUTE_ID=$(echo "$JWT_ROUTE_RESPONSE" | jq -r '.id')
if [ -z "$JWT_ROUTE_ID" ]; then
  echo "Failed to create JWT route for backend-service"
  exit 1
fi

echo "JWT Route for backend-service created with ID: $JWT_ROUTE_ID"

# Create a route that uses API Key authentication (for /api-key/* endpoints)
APIKEY_ROUTE_RESPONSE=$(curl -s -X POST ${KONG_ADMIN_URL}/routes \
  --data "service.name=backend-service" \
  --data "paths[]=/api-key" \
  --data "paths[]=/api-key/*" \
  --data "strip_path=true")

APIKEY_ROUTE_ID=$(echo "$APIKEY_ROUTE_RESPONSE" | jq -r '.id')
if [ -z "$APIKEY_ROUTE_ID" ]; then
  echo "Failed to create API Key route for backend-service"
  exit 1
fi

echo "API Key Route for backend-service created with ID: $APIKEY_ROUTE_ID"

#############################
# JWT Authentication Setup
#############################

echo "Configuring JWT plugin on JWT Route..."

# Enable JWT Plugin for authentication on the JWT Route
curl -i -X POST ${KONG_ADMIN_URL}/routes/${JWT_ROUTE_ID}/plugins \
  --data "name=jwt" \
  --data "config.uri_param_names=jwt" \
  --data "config.key_claim_name=iss" \
  --data "config.secret_is_base64=false"

# Add Keycloak as a consumer (represents the identity provider)
curl -i -X POST ${KONG_ADMIN_URL}/consumers \
  --data "username=keycloak"




# Retrieve Keycloak's JWKS response
JWKS_URL="${KEYCLOAK_URL}/protocol/openid-connect/certs"
JWKS_RESPONSE=$(curl -s "${JWKS_URL}")

# Extract the first RS256 signing key (the correct key for JWT validation)
X5C=$(echo "$JWKS_RESPONSE" | jq -r '.keys[] | select(.alg=="RS256" and .use=="sig") | .x5c[0]')

if [ -z "$X5C" ] || [ "$X5C" == "null" ]; then
    echo "Failed to fetch Keycloak public signing key certificate"
    exit 1
fi

# Format the certificate with 64-character line breaks
FORMATTED_CERT=$(echo "$X5C" | sed 's/\(.\{64\}\)/\1\n/g')
CERTIFICATE="-----BEGIN CERTIFICATE-----\n${FORMATTED_CERT}\n-----END CERTIFICATE-----"

# Write the certificate to a temporary file
CERT_FILE=$(mktemp)
echo -e "$CERTIFICATE" > "$CERT_FILE"

# Extract the RSA public key from the certificate using openssl
RSA_PUBLIC_KEY=$(openssl x509 -pubkey -noout -in "$CERT_FILE")
rm "$CERT_FILE"

if [ -z "$RSA_PUBLIC_KEY" ]; then
    echo "Failed to extract RSA public key from certificate"
    exit 1
fi

# Register the extracted RSA public key in Kong for the keycloak consumer
curl -i -X POST "${KONG_ADMIN_URL}/consumers/keycloak/jwt" \
    --data "algorithm=RS256" \
    --data "key=keycloak-key" \
    --data-urlencode "rsa_public_key=${RSA_PUBLIC_KEY}" \
    --data "secret="



#############################
# API Key Authentication Setup
#############################

echo "Configuring API Key plugin on API Key Route..."

# Enable API Key Authentication on the API Key Route
curl -i -X POST ${KONG_ADMIN_URL}/routes/${APIKEY_ROUTE_ID}/plugins \
  --data "name=key-auth" \
  --data "config.key_names=apikey" \
  --data "config.key_in_query=true" \
  --data "config.key_in_header=true" \
  --data "config.key_in_body=false"

# Create an API Key Consumer
curl -i -X POST ${KONG_ADMIN_URL}/consumers \
  --data "username=api-key-user"

# Assign a default API Key to the consumer
API_KEY_RESPONSE=$(curl -s -X POST ${KONG_ADMIN_URL}/consumers/api-key-user/key-auth)
API_KEY=$(echo "$API_KEY_RESPONSE" | jq -r '.key')

if [ -z "$API_KEY" ]; then
  echo "Failed to generate API key"
  exit 1
fi

#############################
# API Public Route Setup
#############################

# Create a Kong service (your backend API)
curl -i -X POST ${KONG_ADMIN_URL}/services \
  --data "name=backend-public-service" \
  --data "url=http://backend:8080/Participants"

# Create a route that uses API Key authentication (for /api-key/* endpoints)
PUBLICAPI_ROUTE_RESPONSE=$(curl -s -X POST ${KONG_ADMIN_URL}/routes \
  --data "service.name=backend-service-public" \
  --data "paths[]=/api-public" \
  --data "paths[]=/api-public/*" \
  --data "strip_path=true")
  
PUBLICAPI_ROUTE_ID=$(echo "$PUBLICAPI_ROUTE_RESPONSE" | jq -r '.id')
if [ -z "$PUBLICAPI_ROUTE_ID" ]; then
  echo "Failed to create public route for backend-service"
  exit 1
fi

echo "API Key Route for backend-service created with ID: $PUBLICAPI_ROUTE_ID"

echo "API Key for api-key-user: $API_KEY"

echo "Kong setup completed successfully!"

echo "Use the following endpoints for testing:"
echo ""
echo "For JWT authentication, issue a request with a valid JWT token via query param 'jwt':"
echo "curl -X GET http://kong:8000/api/home?jwt=<your_valid_jwt>"
echo ""
echo "For API Key authentication, use the generated API key (query param or header):"
echo "curl -X GET http://kong:8000/api-key/home?apikey=$API_KEY"
echo "or"
echo "curl -X GET http://kong:8000/api-key/home -H \"apikey: $API_KEY\""
