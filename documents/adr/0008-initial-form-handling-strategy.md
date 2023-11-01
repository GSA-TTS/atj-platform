# 8. Initial form-handling strategy

Date: 2023-10-30

## Status

Accepted

## Context

The 10x Digital Access to Justice Platform project will require a strategy of organizing form-handling logic and presentation.

We aim to deliver utilities to aid in the creation of accessible, user-friendly forms. These forms will be defined using a declarative format that may be integrated with tools like a no-code form builder and a UI component library.

Additionally, the project team intends to interoperate with other tools. This means being framework-agnostic, leveraging web standards, and avoiding overly-opinionated patterns. The team also does not want to reinvent the wheel. If suitable solutions already exist, we would like to use them in a manner that does not reduce options for future development.

Design considerations include developer experience (DX), internal dependency management, and expressiveness/flexibilty.

## Decision

The project team will, initially, identify lightweight approaches that are easily reversible. As integrations are added, the approach will continuously be reevaluated.

Initially, forms will be implemented as a collection of React components. Each component will be isolated and be configured via props.

[Formik](https://formik.org/docs/overview) will be utilized to bind interactive browser behavior to form components. Formik has minimal surface area as an API, and enables use of UI components that themselves are not directly dependent on Formik.

Initially, a simple and bespoke declarative format for form definitions will be utilized. This format will be augmented as integrations are added, and supported interview flows are increased.

## Consequences

By starting small and not pulling in dependencies we do not immediately need, we will avoid bringing in potentially consequential design decisions without considering the impact. By keeping third party dependencies isolated, we enable swapping them out with alternatives.

However, we risk losing the opportunity to quickly get "big wins" by pulling in a more fully-baked interview format at the onset. As a result, such solutions should be considered near-term integration opportunities.

This ADR will need to be continually reevaluated through the course of 10x phase 3 work.
