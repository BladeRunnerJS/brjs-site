---
layout: docs
title: Testing BRJS Applications
permalink: /docs/concepts/testing/
---

The BRJS toolkit and application architecture encourages you to implement tests at a number of different levels.

![](https://docs.google.com/drawings/d/1lIrdZ0RRk1J1uYdvrrG1nEwx7R0MlOUugE1MghtV0wk/pub?w=960&amp;h=720)

## Code Facing Tests

Of course, with the exception of any manual testing that takes place all tests are driven by code. However, **Code Facing Tests** are tests that exercise just the code - the business logic - without any direct thought to the business functionality that is being built. These are tests for developers.

### Unit Tests

A core purpose of a unit test is to test a single class in isolation. In order to do this you may need to create mock, stub or dummy dependencies. Dependencies can either be passed in via the constructor, via a getter, by using the [ServiceRegistry](/docs/concepts/service_registry/) or [AliasRegistry (IoC)](/docs/concepts/ioc/).

For an example of a unit test see [writing and running tests](/docs/using/writing_and_running_tests).

### Unit Integration Tests

Unit [Integration Tests](http://en.wikipedia.org/wiki/Integration_testing) can be used to test groups of classes together, representing a module of functionality. In the case of BRJS this may be testing a Blade, from View Model update through to the interactions with a Service.

![](https://docs.google.com/drawings/d/1y38qcsvoz-miI7hhAmkdeuH4zBNE4OC6gZ30rHienvg/pub?w=960&amp;h=720)

A common group of classes to test as a Unit Integration Test is a Blade's Presenter View Model component, the Domain Model and it's interaction with the Service. The View Model is a logical representation of the Blade's View which removes the need for a browner runtime environment and because services are accessed from the [ServiceRegistry](/docs/concepts/service_registry) we can create a mock service for the Domain Model to interact with. Assertions can then be made against the View Model state and interactions with the mock service.

## Business Facing Tests

**Business Facing Tests** are commonly known as [Acceptance Tests](http://en.wikipedia.org/wiki/Acceptance_testing). They are tests to ensure that the required business functionality, set out by the requirements, are achieved by the application.

### Blade Acceptance Tests

<p class="doc-feedback alert alert-warning">
  Coming soon...
</p>

### Application Acceptance Tests

<p class="doc-feedback alert alert-warning">
  Coming soon...
</p>