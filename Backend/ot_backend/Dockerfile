FROM openjdk:17-jdk-slim AS build

WORKDIR /app

COPY pom.xml ./
COPY src ./src


RUN apt-get update && apt-get install -y maven \
    && mvn clean package -DskipTests

FROM openjdk:17-jdk-slim

WORKDIR /app

COPY --from=build /app/target/ot_backend-0.0.1-SNAPSHOT.jar /app/Votacion-OT.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/Votacion-OT.jar"]
