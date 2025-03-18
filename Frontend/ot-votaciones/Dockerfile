# Step 1: Build the React application
FROM node:18 AS build

# Set working directory to /app inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install vite separately
RUN npm install vite

# Copy the rest of your app files
COPY . .

# Build the React app for production (this generates the /build folder)
RUN npm run build

# Step 2: Serve the React app using nginx
FROM nginx:alpine

# Copy nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the build folder from the build stage to nginx's serving directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the web server
EXPOSE 80

# Run nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
