#!/bin/sh

KONG_ADMIN_URL="http://kong:8001"
KEYCLOAK_URL="http://keycloak:8180/realms/myrealm"

# Install jq if missing (for Alpine-based images)
apk add --no-cache jq || apt-get update && apt-get install -y jq

# Wait for Kong Admin API to be available
until curl -s ${KONG_ADMIN_URL}/status > /dev/null; do
  echo "Waiting for Kong Admin API..."
  sleep 5
done

echo "Configuring Kong for OIDC (via JWT validation)..."

# Create a Kong service (your backend API)
curl -i -X POST ${KONG_ADMIN_URL}/services \
  --data "name=backend-service" \
  --data "url=http://backend:8080"

# Create a route for the service
curl -i -X POST ${KONG_ADMIN_URL}/routes \
  --data "service.name=backend-service" \
  --data "paths[]=/api"

# Enable JWT Plugin for authentication (Validates Keycloak-issued tokens)
curl -i -X POST ${KONG_ADMIN_URL}/services/backend-service/plugins \
  --data "name=jwt" \
  --data "config.uri_param_names=jwt" \
  --data "config.key_claim_name=iss" \
  --data "config.secret_is_base64=false"

# Add Keycloak as a consumer (represents the identity provider)
curl -i -X POST ${KONG_ADMIN_URL}/consumers \
  --data "username=keycloak"

# Retrieve Keycloak's public key for JWT verification
JWKS_URL="${KEYCLOAK_URL}/protocol/openid-connect/certs"
KEYCLOAK_PUBLIC_KEY=$(curl -s ${JWKS_URL} | jq -r '.keys[0].x5c[0]')

if [ -z "$KEYCLOAK_PUBLIC_KEY" ]; then
  echo "Failed to fetch Keycloak public key"
  exit 1
fi

# Properly format the public key
KEYCLOAK_PUBLIC_KEY="-----BEGIN CERTIFICATE-----\n${KEYCLOAK_PUBLIC_KEY}\n-----END CERTIFICATE-----"

# Register the public key in Kong
curl -i -X POST ${KONG_ADMIN_URL}/consumers/keycloak/jwt \
  --data "algorithm=RS256" \
  --data "key=keycloak-key" \
  --data-urlencode "rsa_public_key=${KEYCLOAK_PUBLIC_KEY}" \
  --data "secret="

# Enable API Key Authentication
echo "Enabling API Key Authentication..."

curl -i -X POST ${KONG_ADMIN_URL}/services/backend-service/plugins \
  --data "name=key-auth" \
  --data "config.key_names=apikey"

# Create an API Key Consumer
echo "Creating API Key Consumer..."

curl -i -X POST ${KONG_ADMIN_URL}/consumers \
  --data "username=api-key-user"

# Assign a default API Key to the consumer
echo "Assigning API Key..."

API_KEY_RESPONSE=$(curl -s -X POST ${KONG_ADMIN_URL}/consumers/api-key-user/key-auth)
API_KEY=$(echo "$API_KEY_RESPONSE" | jq -r '.key')

if [ -z "$API_KEY" ]; then
  echo "Failed to generate API key"
  exit 1
fi

echo "API Key for api-key-user: $API_KEY"

echo "Kong setup completed successfully!"
