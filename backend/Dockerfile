# Use Java 17
FROM eclipse-temurin:17-jdk-alpine

# Set working directory
WORKDIR /app

# Copy ALL backend files (including the newly generated wrapper)
COPY backend .

# Make mvnw executable and build
RUN chmod +x mvnw && \
    ./mvnw clean package -DskipTests

# Run the application
CMD ["java", "-jar", "target/house-shop-0.0.1-SNAPSHOT.jar"]