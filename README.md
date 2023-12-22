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

Run the test suite with coverage metrics generated:

```bash
pnpm test
```

To develop on the frontend app, run:

```bash
 pnpm build
```

then 

```bash
 cd apps/spotlight
```

To run an app server:

```bash
 pnpm start
```

To extract form fields, their attributes and labels from an HTML code and output them in a JSON file, go to the "htmlParser" directory:

```bash
 cd apps/spotlight/src/htmlParser
```

If you're already in the "spotlight" directory

```bash
 cd src/htmlParser
```

Replace the HTML content that's inside the "form-input.html" with your HTML, then run:

```bash
 node processHtml.js yourCustomJSONFileName.json
```

Be sure to replace "yourCustomJSONFileName.json" with whatever name you want your output JSON file to be called. If you don't indicate a new file name, your file will be given the default file name which is "form-field-output.json".

## Command-line interface

A command-line interface is provided for manually running operations. The corresponding app resides in [./apps/cli](./apps/cli). A wrapper script, in the root directory, is provided.

```bash
./manage.sh --help
```
