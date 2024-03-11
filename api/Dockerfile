FROM maven:3.8.1-openjdk-17 AS build
# Compile api
COPY . /api
WORKDIR /api
RUN mvn install
RUN mvn clean package

FROM amazoncorretto:17 AS runtime
# Copy the compiled jar file from the build stage
ARG DATABASE_USER
ARG DATABASE_PASSWORD
ARG JWT_SECRET

# Set environment variables
ENV DATABASE_URL jdbc:postgresql://WIQ_DB:5432/wiq
ENV DATABASE_USER $DATABASE_USER
ENV DATABASE_PASSWORD $DATABASE_PASSWORD
ENV JWT_SECRET $JWT_SECRET
COPY --from=build /api/target/quiz-api-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-jar","app.jar"]

EXPOSE 8080