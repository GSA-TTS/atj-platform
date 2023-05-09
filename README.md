# 10x Access to Justice Tooling

Test bed for ATJ platform tooling, completed as part of the [10x Transparency for Fines and Fees](https://trello.com/c/25Jl6NwJ/207-transparency-for-fines-and-fees) project.

## Overview

This project is structured as a monorepo. The project dependencies within the workspace are:

![workspace project dependencies](./workspace-dependencies.svg)

## Development

This project uses [pnpm workspaces](https://pnpm.io/workspaces). To work with this project, [install pnpm](https://pnpm.io/installation) and then the project dependencies:

```bash
pnpm install
```

Run the test suite with coverage metrics generated:

```bash
pnpm test
```

## Command-line interface

A command-line interface is provided for manually running operations. The corresponding app resides in [./apps/cli](./apps/cli). A wrapper script, in the root directory, is provided.

```bash
./manage.sh --help
```
