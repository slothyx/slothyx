FROM openjdk:8-alpine

WORKDIR /app
EXPOSE 8080

CMD ["java", "-jar", "slothyx.jar"]

COPY backend/target/slothyx.jar /app/slothyx.jar