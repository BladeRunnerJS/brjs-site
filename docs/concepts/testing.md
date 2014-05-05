---
layout: docs
title: Testing BRJS Applications
permalink: /docs/concepts/testing/
---

The BRJS toolkit and application architecture encourages you to implement tests at a number of different levels. The focus is to push testing down the testing triangle as much as possible as this results in faster and more reliable tests.

<img src="https://docs.google.com/drawings/d/1lIrdZ0RRk1J1uYdvrrG1nEwx7R0MlOUugE1MghtV0wk/pub?w=960&amp;h=720" height="500" alt="BRJS App Testing Triangle" />

## Code Facing Tests

With the exception of any manual testing that takes place, all tests are driven by code. However, **Code Facing Tests** are tests that exercise just the code - the logic - without any direct thought to the high-level application functionality that is being built. These are tests for developers.

### Unit Tests

You can use unit tests to test a single class in isolation, or how a number of classes interact with each other. In order to do the latter you may need to create mock, stub or dummy dependencies. Dependencies can either be passed in via the constructor, via a getter, by using the [ServiceRegistry](/docs/concepts/service_registry/) or [AliasRegistry (IoC)](/docs/concepts/ioc/).

Within a BRJS application the tests reside with the functionality they are written to test. In the case of unit tests they should be in a `tests/test-unit` directory where `test` is at the same level as the `src` directory where the functional code is located.

For more information and an example of a unit test see the docs on [writing tests](/docs/using/writing_tests).

## Business Facing Tests

**Business Facing Tests** are commonly known as [Acceptance Tests](http://en.wikipedia.org/wiki/Acceptance_testing). These are tests that ensure the required business functionality, set out by the requirements, are achieved by the application. These tests can be written by developers or by product owners.

### Blade Functional Acceptance Tests

Blades represent a vertical slice of application functionality so common practice within a BRJS application is to test a Blade using "Given-When-Then" style Acceptance Tests. You can test the Blade's [Presenter View Model component](/docs/concepts/presenter/), the Domain Model and it's interaction with the Service as a whole.

![](https://docs.google.com/drawings/d/1y38qcsvoz-miI7hhAmkdeuH4zBNE4OC6gZ30rHienvg/pub?w=960&amp;h=720)

The View Model is a logical representation of the Blade's View, which removes the need for browser DOM (Document Object Model) manipulation, and because services are accessed from the [ServiceRegistry](/docs/concepts/service_registry) we can create a mock service for the Domain Model to interact with. Assertions can then be made against the View Model state and against interactions with the mocked service.

As already stated above; within a BRJS application the tests reside with the functionality they are written to test. In the case of acceptance tests they should be in a `tests/test-acceptance` directory where `test` is at the same level as the `src` directory where the functional code is located.

For more information and an example of an acceptance test see the docs on [writing tests](/docs/using/writing_tests).

### Application End-to-End Acceptance Tests

Application End-to-End Acceptance Tests run against the application as a whole, with all back-end services running.

These are tests which interact with your application via the GUI, using automation tools such as Selenium/WebDriver.

They exercise user workflows by performing actions against the application/webpage and making assertions against the browser DOM.

More often than not, these tests are purposed to verify that the client and server work together as expected (e.g. Does the correct server response come through to the client when X is clicked?).

Whilst from an automated-testing perspective they provide the strongest level of assurance, they are also the most expensive to maintain. As such, we would encourage that they be used sparingly and focus on coverage for the integration between the client and server (and less so for user-interaction permutations).

### Manual Tests

Some level of manual testing is more than likely always going to be required.

## Where next?

* [Writing Tests](/docs/use/running_tests/)
* [Running Tests](/docs/use/writing_tests/)
