# Use Java 17
FROM eclipse-temurin:17-jdk-alpine

# Set working directory
WORKDIR /app

# Copy only the necessary files
COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn
COPY src src

# Build the application
RUN ./mvnw clean package -DskipTests

# Run the application (using your exact JAR name)
CMD ["java", "-jar", "target/house-shop-0.0.1-SNAPSHOT.jar"]