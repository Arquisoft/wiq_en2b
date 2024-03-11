FROM maven:3.8.1-openjdk-17 AS build
LABEL authors="dario"
# Compile api
COPY . /questiongenerator
WORKDIR /questiongenerator
RUN mvn install
RUN mvn clean package

FROM amazoncorretto:17 AS runtime
# Copy the compiled jar file from the build stage
ARG DATABASE_USER
ARG DATABASE_PASSWORD

# Set environment variables
ENV DATABASE_URL jdbc:postgresql://WIQ_DB:5432/wiq
ENV DATABASE_USER $DATABASE_USER
ENV DATABASE_PASSWORD $DATABASE_PASSWORD
COPY --from=build /questiongenerator/target/QuestionGenerator-1.0-SNAPSHOT-jar-with-dependencies.jar app.jar
ENTRYPOINT ["java","-jar","app.jar"]