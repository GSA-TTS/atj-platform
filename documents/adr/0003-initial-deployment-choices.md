# 3. Initial deployment choices

Date: 2023-09-20

## Status

Accepted

## Context

The project team has a need to share our solution with our collaborators, as well as communicate project information such as the current status of work. The 10x team has access to TTS hosting options that do not require immediate approval.

## Decision

We will deploy server-side components to available sandbox accounts, including [Cloud.gov](https://www.cloud.gov) and [AWS](https://aws.amazon.com/). Initially, this will include a docassemble server. We will deploy client-side components to [Cloud.gov Pages](https://cloud.gov/pages/). Automation will be created for deployments, but it will initially be kept lightweight.

## Consequences

The project team will have a place to quickly test and share its work.
