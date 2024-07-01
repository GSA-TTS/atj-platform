# 10. End to end testing

Date: 2024-07-01

## Status

Pending

## Context

Certain tests are not able to be performed with Storybook and JSDOM (e.g. drag-and-drop). The ability to replicate more complex user interactions in the test suite through an actual browser can provide this feature.

## Decision
The end-to-end tests should be used sparingly since they are slower to run than the ones through JSDOM. Storybook still should be the primary mechanism for testing, and the Playwright tests will round out what isn't possible there. 

## Consequences

The deployed application will include Playwright tests in the e2e package.
