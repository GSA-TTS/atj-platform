# 10x Access to Justice Tooling

Test bed for ATJ platform tooling, completed as part of the [10x Digital Access to Justice Platform](https://trello.com/c/25Jl6NwJ/207-digital-access-to-justice-platform) project.

## Overview

A C4-like architectural diagram is [available here](documents/diagram.md).

Additional documentation:

- [Architectural Decision Records (ADRs)](./documents/adr/)
- [Release process](./documents/release-process.md)

## Overview

The platform is made up of the following high-level terms.

### Key personas

- Content authors: legal experts who craft guided interview experiences via a "no code" interface
- Self-represented litigants (SREs): end-users who interact with the court via guided interviews created by content authors

### Things

- **Blueprint**: produced by a content author, the blueprint defines the structure of an interactive session between a court and an SRL
- **Conversation**: one instance of a blueprint; the interactive session between a court and an SRL. Other terms for this concept include dialogue or session.
- **Pattern/template**: the building blocks of a blueprint, patterns implement UX best-practices, defining the content and behavior of the user interface.
- **Prompt**: produced by a pattern, the prompt defines what is presented to the end user at single point in a conversation.
- **Component**: user interface component that acts as the building block of prompts.

## Development

This project uses the version of Node.js defined in [.nvmrc](./nvmrc). To ensure you're using the correct node version, you may use the [Node Version Manager (NVM)](https://github.com/nvm-sh/nvm):

```bash
nvm install
```

This project uses [pnpm workspaces](https://pnpm.io/workspaces). To work with this project, [install pnpm](https://pnpm.io/installation) and then the project dependencies:

```bash
pnpm install
```

To install the browsers needed for the Storybook testing with `@vitest/browser`, you need to do a one-time install with `pnpm dlx playwright@1.48.1 install --with-deps`. This command also needs to be run when Playwright is updated because it requires version parity to find the executables across the local dev environment and CI to get all the tests to pass. To run the complete test suite, with coverage metrics generated:

```bash
pnpm test
```

To run tests, you also need to have Podman (previously Docker) installed so that PostgreSQL can start in a container before the tests run. Follow the sections below to set up Podman if you haven't done so.

To run tests in watch mode (except the `infra` tests, which use Jest):

```bash
pnpm vitest
```

To start developing with hot reloading, use:

```bash
pnpm build
```
then run:

```bash
pnpm dev
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


## Migrating from Docker Desktop to Podman

If you already have Docker Desktop installed and need to migrate to Podman, follow these steps:


### Step 1: Install Podman

First, you need to install Podman. If you're using Homebrew, you can install it with:

```bash
brew install podman
```

### Step 2: Initialize and Start Podman Machine

Initialize and start the Podman machine:

```bash
podman machine init
podman machine start
```

### Step 3: Uninstall Docker Desktop

1. Open Docker Desktop.
2. From the Docker menu, select the Troubleshoot icon.
3. Click Uninstall.
4. Confirm the uninstallation.

Alternatively, you can uninstall Docker Desktop from the CLI:

```bash
/Applications/Docker.app/Contents/MacOS/uninstall
```

After uninstalling Docker Desktop, you may want to remove residual files:

```bash
rm -rf ~/Library/Group\ Containers/group.com.docker
rm -rf ~/Library/Containers/com.docker.docker
rm -rf ~/.docker
```

### Step 4: Emulate Docker CLI Using Podman

Follow the steps [here](https://podman-desktop.io/docs/migrating-from-docker/emulating-docker-cli-with-podman#linux--macos) to create a script to emulate Docker CLI using Podman. This allows you to use Docker commands transparently.

### Step 5: Configure Environment Variables

Set the necessary environment variables to ensure testcontainers works correctly with Podman. Add the following lines to your shell configuration file (~/.zshrc for Zsh or ~/.bashrc for Bash):

```bash
export DOCKER_HOST=unix://$(podman machine inspect --format '{{.ConnectionInfo.PodmanSocket.Path}}')
export TESTCONTAINERS_DOCKER_SOCKET_OVERRIDE=/var/run/docker.sock
export TESTCONTAINERS_RYUK_DISABLED=true
```

### Step 6: Apply Changes

After adding the above lines to your shell configuration file, apply the changes by reloading your shell configuration:


For Zsh:
```bash
source ~/.zshrc
```

For Bash:
```bash
source ~/.bashrc
```

### Step 7: Verify Environment and Run Tests

Ensure the environment variables are set and run your tests:

```bash
echo $DOCKER_HOST
echo $TESTCONTAINERS_DOCKER_SOCKET_OVERRIDE
echo $TESTCONTAINERS_RYUK_DISABLED

pnpm test
```

## Setting Up Podman for New Team Members

If you're new to the team and need to start with Podman, follow these steps:


### Step 1: Install Podman

Install Podman using Homebrew:

```bash
brew install podman
```

### Step 2: Initialize and Start Podman Machine

Initialize and start the Podman machine:

```bash
podman machine init
podman machine start
```

### Step 3: Emulate Docker CLI Using Podman

Follow the steps [here](https://podman-desktop.io/docs/migrating-from-docker/emulating-docker-cli-with-podman#linux--macos) to create a script to emulate Docker CLI using Podman. This allows you to use Docker commands transparently.

### Step 4: [Set Environment Variables](https://github.com/testcontainers/testcontainers-node/blob/08da47baeaa9a43f29aec3a9bb1ce67a3bc1849f/docs/supported-container-runtimes.md)

Set the necessary environment variables to ensure testcontainers works correctly with Podman. Add the following lines to your shell configuration file (~/.zshrc for Zsh or ~/.bashrc for Bash):

```bash
export DOCKER_HOST=unix://$(podman machine inspect --format '{{.ConnectionInfo.PodmanSocket.Path}}')
export TESTCONTAINERS_DOCKER_SOCKET_OVERRIDE=/var/run/docker.sock
export TESTCONTAINERS_RYUK_DISABLED=true
```

### Step 5: Apply Changes

After adding the above lines to your shell configuration file, apply the changes by reloading your shell configuration:


For Zsh:
```bash
source ~/.zshrc
```

For Bash:
```bash
source ~/.bashrc
```

### Step 6: Verify Environment and Run Tests

Ensure the environment variables are set and run your tests:

```bash
echo $DOCKER_HOST
echo $TESTCONTAINERS_DOCKER_SOCKET_OVERRIDE
echo $TESTCONTAINERS_RYUK_DISABLED

pnpm test
```

# Optional: Troubleshooting nvm, Node.js, and pnpm Issues

If you encounter issues with nvm, node, or pnpm, follow these steps:

## Issue: Commands Not Found

### Step 1: Edit Your Shell Configuration File

Open your shell configuration file in a text editor. For Zsh:

```bash
nano ~/.zshrc
```

Or for Bash:
```bash
nano ~/.bashrc
```

### Step 2: Add nvm Initialization

Add the following lines to ensure nvm is properly initialized upon starting a new shell session:

```bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

### Step 3: Add Paths for pnpm

Add the following lines to ensure pnpm is correctly added to the PATH:

```bash
export PNPM_HOME="$HOME/.local/share/pnpm"
export PATH="$PNPM_HOME:$PATH"
```

### Step 4: Apply Changes

Save the file and close the editor. Apply the changes by reloading your shell configuration:


For Zsh:
```bash
source ~/.zshrc
```

For Bash:
```bash
source ~/.bashrc
```

### Step 5: Verify Installations

Ensure that node, nvm, and pnpm are properly installed and accessible:

```bash
node -v
nvm -v
pnpm -v
```
