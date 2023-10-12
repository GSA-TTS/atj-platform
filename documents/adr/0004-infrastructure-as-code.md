# 4. Infrastructure as Code

Date: 2023-10-04

## Status

Accepted

## Context

The project team must deploy cloud resources to support the project. This must include automated deployments and documentation of the deployed resources.

Cloud environments available to the project team include AWS, Azure, GCP, and Cloud.gov.

## Decision

Terraform provides an extensive ecosystem of modules and providers, and is used widely in government. Every cloud provider the project team has access to supports Terraform.

Terraform CDK provides a Typescript interface to Terraform. Infrastructure in a formal programming language provides flexibility when writing well-factored code. Usage of Typescript simplifies sharing logic between application and infrastructure code.

We will use [Terraform CDK](https://github.com/hashicorp/terraform-cdk) for infrastructure as code (IaC).

## Consequences

The project team will be able to rapidly deploy test infrastructure to any available cloud provider.
