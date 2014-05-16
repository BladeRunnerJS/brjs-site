---
layout: docs
title: Services
permalink: /docs/concepts/services/
---

**Services** are a core BRJS JavaScript concept that provide a way of decoupling implementation detail from the interface that the service provides.

For example, if a `PersistenceService` may be used within the application it may have one implementation that persists data to a database via a web service and another that persists to localStorage. Which one is used depends on whether the a application is online. The application logic using the service doesn't care which implementation is used as long as the contract - defined by the interface - is fulfilled when interacting with it.

Services can be registered and accessed from any part of the application via a [ServiceRegistry](/docs/concepts/service_registry/).

Service contracts (the functions they provide) can be enforced through the use
of [interfaces](/docs/concepts/interfaces/) if required.

## Service Benefits

Services have a number of benefits:

### Faster delivery

You may find yourself in a situation where you are building functionality that relies
on a back-end service that hasn't yet been implemented. In this scenario you can
create a fake service implementation that lets you start your development before
the real service is available.

When the real back-end service becomes available you can easily swap out the
implementation of that service so the back-end is being used via the [ServiceRegistry](/docs/concepts/service_registry/).

### Increased productivity

As part of your development workflow you can use the [Workbench](/docs/concepts/workbenches)
in conjunction with fake service implementations that allow you to control the behaviour
of what will eventually be a real service. The benefit of this is that it allows
you to quickly iterate and build your blade's functionality without the need of
having a real service running or writing code to get your service to behave in
certain ways in order to check your apps' behaviour in edge-case scenarios.

### Improved testing

By developing against a service and not an implementation is makes it easy to
replace the object that your code is interacting with. This means services can be
replaced by fakes or mocks in your tests.

<div class="alert alert-info">
  <p>
    See <a href="http://stackoverflow.com/a/346440/39904">What's the difference between faking, mocking, and stubbing?</a>
  </p>
</div>

You can reuse the fake implementations that you have created during the development of a blade when running it within a workbench. The benefit of this is that you get code reuse
and you have full control over the behaviour of the fake service.

It's easy to change the service that's registered with the [ServiceRegistry](/docs/concepts/service_registry/). to be
an object that has been created by a mocking framework. In doing so you can verify
the interactions that your blade has with services.

## Where next?

* [ServiceRegistry](/docs/concepts/service_registry/).
