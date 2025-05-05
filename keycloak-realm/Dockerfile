# Usa la imagen base de Keycloak especificada en el docker-compose
FROM quay.io/keycloak/keycloak:latest

RUN mkdir -p /opt/keycloak/data/import/
COPY keycloak-realm.json /opt/keycloak/data/import/votacion_ot-realm.json

# Expone el puerto que se mapeará (la parte derecha del puerto en docker-compose)
EXPOSE 8180

# Define el healthcheck para la imagen
HEALTHCHECK --interval=10s --timeout=3s --retries=10 --start-period=60s \
    CMD curl --fail http://localhost:8180/realms/votacion_ot || exit 1

# Define el comando de inicio del contenedor
CMD ["start-dev", "--verbose", "--import-realm"]