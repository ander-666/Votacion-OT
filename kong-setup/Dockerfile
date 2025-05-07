
FROM alpine:latest
# Crea el directorio si no existe y copia el script
RUN mkdir -p /scripts
COPY setup-kong-db.sh /scripts/setup-kong-db.sh
# Asegúrate de que el script sea ejecutable
RUN chmod +x /scripts/setup-kong-db.sh
# Define el entrypoint y el comando por defecto (aunque lo sobreescribiremos en ECS)
ENTRYPOINT ["/bin/sh"]
CMD ["-c", "sleep 30 && /scripts/setup-kong-db.sh"]