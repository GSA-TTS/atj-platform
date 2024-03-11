# atj-platform docassemble server

This is a docassemble server for the ATJ Platform that may be run locally for development purposes or deployed to cloud.gov.

The configuration does not mount volumes for persistent data, because it is intended to be used as a disposable test environment. We may want to change this in the future, but for the moment the intention is to automate pushing data into the instance after startup.

## Local development

```bash
docker-compose up
```
