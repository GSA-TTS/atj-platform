# 10. End-to-end and interaction testing

Date: 2024-07-08

## Status

Pending

## Context

Certain tests are not able to be performed with Storybook and JSDOM (e.g. drag-and-drop). The ability to replicate more complex user interactions in the test suite through an actual browser can provide this feature.

## Decision
The end-to-end tests should be used sparingly since they are slower to run than the ones through JSDOM. We will use Playwright in CI/CD for the comprehensive tests and JSDOM during development for speed. Storybook still should be the primary mechanism for UI testing, and during CI/CD, the interaction tests will be run in Playwright using a docker container against the build. 

## Consequences

There are some tests that will be end-to-end that run against the built application, while the interaction tests will run against the built Storybook. The end-to-end tests will be in the e2e directory, and docker will be used to make the test environment consistent.