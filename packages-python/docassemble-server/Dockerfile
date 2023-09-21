# As of writing, the docassemble image in 10.6GB, which exceeds the available
# space in our cloud.gov sandbox account. This multi-stage build leverages the
# upstream docassemble image to build a new image that excludes resources we do
# not require for our use case.
#
# docassemble-os: https://github.com/jhpyle/docassemble-os/blob/master/Dockerfile
# docassemble: https://github.com/jhpyle/docassemble/blob/master/Dockerfile
FROM jhpyle/docassemble:latest as build-stage

RUN apt-get -y remove \
    redis-server \
    postgresql
RUN apt-get clean && \
    rm -rf /var/lib/apt/lists/*

FROM scratch

COPY --from=build-stage / /

# EVERYTHING UNDER HERE WAS COPIED FROM THE UPSTREAM DOCKERFILE
USER root
RUN rm -rf /tmp/docassemble

EXPOSE 80 443 9001 514 25 465 8080 8081 8082 5432 6379 4369 5671 5672 25672
ENV \
    CONTAINERROLE="all" \
    LOCALE="en_US.UTF-8 UTF-8" \
    TIMEZONE="America/New_York" \
    SUPERVISORLOGLEVEL="info" \
    EC2="" \
    S3ENABLE="" \
    S3BUCKET="" \
    S3ACCESSKEY="" \
    S3SECRETACCESSKEY="" \
    S3REGION="" \
    DAHOSTNAME="" \
    USEHTTPS="" \
    USELETSENCRYPT="" \
    LETSENCRYPTEMAIL="" \
    BEHINDHTTPSLOADBALANCER="" \
    DBHOST="" \
    LOGSERVER="" \
    REDIS="" \
    RABBITMQ="" \
    DASUPERVISORUSERNAME="" \
    DASUPERVISORPASSWORD=""

CMD ["/usr/bin/supervisord", "-n", "-c", "/etc/supervisor/supervisord.conf"]
