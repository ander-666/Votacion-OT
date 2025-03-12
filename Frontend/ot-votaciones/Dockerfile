# Step 1: Build the React application
FROM node:18 AS build

# Set working directory to /app inside the container
WORKDIR /app

# Copy package.json and package-lock.json (adjust if needed)
COPY package*.json ./

# Install dependencies
RUN npm install

RUN npm install vite

# Copy the rest of your app files (Make sure you're in the root of your React app folder)
COPY . .

# Build the React app for production (this generates the /build folder)
RUN npm run build

# Step 2: Serve the React app using a lightweight web server (nginx in this case)
FROM nginx:alpine

# Copy the build folder from the build stage to nginx's serving directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the web server
EXPOSE 80

# Run nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
