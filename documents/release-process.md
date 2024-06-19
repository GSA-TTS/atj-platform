# Release process

There are currently two environments:

- `main` (dev, main branch, CI/CD)
- `staging` (manually deployed via a release tag)

## Overview

To promote continuous integration, the 10x Forms Platform uses trunk-based development. In trunk-based development, we collaborate on code in a single, mainline branch.

Deployments are managed by Terraform CDK. On merge to main, the [../.github/workflows/deploy.yml](../.github/workflows/deploy.yml) Github Action workflow builds Docker images for each app in the repository, pushes them to [ghcr.io](https://github.com/orgs/GSA-TTS/packages?repo_name=atj-platform), and deploys to the dev environment (`gsa-tts-10x-atj-dev`).

When commits are made to main, the [../.github/workflows/create-pr-to-staging.yml](../.github/workflows/create-pr-to-staging.yml) workflow creates a PR to deploy to the staging environment, if it doesn't already exist.
