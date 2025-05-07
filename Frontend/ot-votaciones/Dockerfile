
# Step 1: Build the React application
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

# Instala todas las dependencias
RUN npm install

# Instala paquetes adicionales (opcional, si ya están en package.json no es necesario)
RUN npm install keycloak-js
RUN npm install vite

COPY . .

# Construye la app de React
RUN npm run build

# Step 2: Serve the React app using nginx
FROM nginx:alpine

# Instala envsubst (parte de gettext)
RUN apk add --no-cache gettext

# Copia la configuración de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia la build de React
COPY --from=build /app/build /usr/share/nginx/html

# Copia plantilla de variables de entorno
COPY env.template.js /usr/share/nginx/html/env.template.js

# Copia el script de entrada
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expone el puerto 80
EXPOSE 80

# Usa el script como entrypoint (reemplaza CMD anterior)
ENTRYPOINT ["/entrypoint.sh"]

