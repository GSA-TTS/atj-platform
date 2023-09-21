# atj-platform docassemble server

This is a docassemble server for the ATJ Platform that may be run locally for development purposes or deployed to cloud.gov.

## Local development

```bash
docker-compose up
```

## Cloud.gov deployment

To login with the Cloudfoundry CLI:

```bash
cf login -a api.fr.cloud.gov --sso
```

Deployment operations are available via this script:

```bash
./cloud.sh --help
```
