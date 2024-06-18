# Release process

There are currently two environments:

- `main` (dev, main branch, CI/CD)
- `staging` (manually deployed via a release tag)

## Context

To promote continuous integration, the 10x Forms Platform uses trunk-based development. Trunk-based development is a version control management practice where developers collaborate on code in a single, mainline branch.

Deployments are managed by Terraform CDK. On merge to main, the [../.github/workflows/deploy.yml](../.github/workflows/deploy.yml) Github Action workflow builds Docker images for each app in the repository, pushes them to [ghcr.io](https://github.com/orgs/GSA-TTS/packages?repo_name=atj-platform), and deploys to the dev environment (`gsa-tts-10x-atj-dev`).

## Tagging a release

To tag a release, Github Releases are utilized.

- Draft a new release
  - https://github.com/GSA-TTS/atj-platform/releases
  - Give the release a descriptive name
  - Tag it with a version identifier
- Deploy to the appropriate environment
  - https://github.com/GSA-TTS/atj-platform/actions/workflows/deploy.yml
