# 10x Access to Justice Tooling

Test bed for ATJ platform tooling, completed as part of the [10x Digital Access to Justice Platform](https://trello.com/c/25Jl6NwJ/207-digital-access-to-justice-platform) project.

## Overview

The project dependencies within the workspace are:

![workspace project dependencies](./workspace-dependencies.svg)

Additional documentation:

- [Architectural Decision Records (ADRs)](./documents/adr/)
- [Non-project contributions](./documents/value-created-log.md)

## Development

This project uses [pnpm workspaces](https://pnpm.io/workspaces). To work with this project, [install pnpm](https://pnpm.io/installation) and then the project dependencies:

```bash
pnpm install
```

To run the complete test suite, with coverage metrics generated:

```bash
pnpm test
```

To run tests in watch mode (except the `infra` tests, which use Jest):

```bash
pnpm vitest
```

To start developing with hot reloading, use:

```bash
pnpm dev --concurrency 12
```

These local servers will be started:

- Astro website - http://localhost:4321/
- Storybook - http://localhost:61610/

To lint the source code:

```bash
pnpm lint
```

## Command-line interface

A command-line interface is provided for manually running operations. The corresponding app resides in [./apps/cli](./apps/cli). A wrapper script, in the root directory, is provided.

```bash
./manage.sh --help
```
