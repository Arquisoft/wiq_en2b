FROM amazoncorretto:17
LABEL authors="dario"

# Install Maven
RUN yum install -y tar which gzip

ENV MAVEN_HOME /usr/share/maven

COPY --from=maven:3.9.6-eclipse-temurin-11 ${MAVEN_HOME} ${MAVEN_HOME}
COPY --from=maven:3.9.6-eclipse-temurin-11 /usr/local/bin/mvn-entrypoint.sh /usr/local/bin/mvn-entrypoint.sh
COPY --from=maven:3.9.6-eclipse-temurin-11 /usr/share/maven/ref/settings-docker.xml /usr/share/maven/ref/settings-docker.xml

RUN ln -s ${MAVEN_HOME}/bin/mvn /usr/bin/mvn

ARG MAVEN_VERSION=3.9.6
ARG USER_HOME_DIR="/root"
ENV MAVEN_CONFIG "$USER_HOME_DIR/.m2"

ENTRYPOINT ["/usr/local/bin/mvn-entrypoint.sh"]
CMD ["mvn"]

ARG DATABASE_USER
ARG DATABASE_PASSWORD
ARG JWT_SECRET

# Set environment variables
ENV DATABASE_URL jdbc:postgresql://WIQ_DB:5432/wiq
ENV DATABASE_USER $DATABASE_USER
ENV DATABASE_PASSWORD $DATABASE_PASSWORD
ENV JWT_SECRET $JWT_SECRET
# Compile api
COPY . /api
WORKDIR /api
RUN mvn install
COPY target/*.jar app.jar
ENTRYPOINT ["java","-jar","app.jar"]


EXPOSE 8080