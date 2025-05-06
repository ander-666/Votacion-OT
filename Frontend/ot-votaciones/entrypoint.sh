#!/bin/sh

# Sustituye el marcador por el valor de la variable de entorno
envsubst '${VITE_KONG_ADDRESS}' < /usr/share/nginx/html/env.template.js > /usr/share/nginx/html/env.js

# Ejecuta nginx
exec nginx -g 'daemon off;'
