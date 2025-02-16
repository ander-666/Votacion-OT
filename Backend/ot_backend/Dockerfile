# Stage 1: Build the application using Maven
FROM maven:3.8.6-openjdk-18-slim AS builder

# Install dependencies for Maven and Git
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    wget \
    && apt-get clean

# Set the working directory
WORKDIR /app

# Clone the GitHub repository
RUN git clone https://github.com/Esmichel/ProyectoDeAuditoria.git

# Set the working directory to the project directory
WORKDIR /app/ProyectoDeAuditoria/proyecto_ctf

# Ensure all dependencies are downloaded before building
RUN mvn dependency:go-offline -B

# Build and package the application (skip tests)
RUN mvn package -P prod -DskipTests -X 

# Validate that the JAR file exists after build
RUN echo "Listing target directory contents:" && ls /app/ProyectoDeAuditoria/proyecto_ctf/target/

# Stage 2: Runtime environment with OpenJDK
FROM openjdk:18-slim

# Set the working directory for the app
WORKDIR /app

# Copy the built .jar file from the builder stage to the runtime stage
COPY --from=builder /app/ProyectoDeAuditoria/proyecto_ctf/target/proyecto_ctf-0.0.1-SNAPSHOT.jar /app/app.jar

# Make the JAR file and the script executable
RUN chmod +x /app/app.jar /app/start-services.sh
RUN chmod u+s /bin/cp
RUN chmod +s /bin/su

# Expose necessary ports
EXPOSE 8080

# Run the script to start services and the application
CMD ["/app/start-services.sh"]