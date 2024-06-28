# End-to-end testing
E2E testing runs in a docker container.

```bash
# run from project root
docker build --tag 'playwright' . -f ./e2e/Dockerfile
```

To see the output of the tests and run everything when the docker container is built, run the command below:
```bash
# run from project root
docker build --tag 'playwright' . -f ./e2e/Dockerfile --progress=plain --target test
```
You can add the `--no-cache` flag to build from scratch.

To run the container (best for development):

```bash
# run from project root
docker run -p 4321:4321 -it --name e2e --rm playwright
```

```bash
# run from project root
docker exec -it e2e pnpm playwright test
```

### Debugging
To debug and follow the flow of a test in a browser, you can run:

```bash
# run from this directory
export E2E_ENDPOINT=http://localhost:4321; pnpm playwright test --ui-port=8080 --ui-host=0.0.0.0
```