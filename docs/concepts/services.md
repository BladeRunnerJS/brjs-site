---
layout: docs
title: Services
permalink: /docs/concepts/services/
---

Services provide access to shared resources. They are a means of decoupling implementation detail from the interface that the service provides.

For example, a `PersistenceService`, used within the application, may have one implementation that persists data to a database via a web service and another that persists to `localStorage`. Which one is used depends on whether the application is online. The application logic using the service doesn't care which implementation is used as long as the contract - defined by the interface - is fulfilled when interacting with it.

Services can be registered and accessed from any part of the application via a [ServiceRegistry](/docs/concepts/service_registry/).
Service contracts (the functions they provide) can be enforced through the use of interfaces if required.

## Benefits of Services

Services have a number of benefits which include:

### Faster delivery

You may find yourself in a situation where you are building functionality that relies on a back-end service that hasn't yet been implemented. In this scenario you can create a fake service implementation that lets you start your development before the real service is available.

When the real back-end service becomes available you can easily swap out the implementation of that service so the back-end is being used via the ServiceRegistry.

### Increased productivity

As part of your development workflow you can use the [Workbench](/docs/concepts/workbenches) in conjunction with fake service implementations that allow you to control the behaviour of what will eventually be a real service. The benefit of this is that it allows you to quickly iterate and build your blade's functionality without the need of having a real service running or writing code to get your service to behave in certain ways in order to check your apps' behaviour in edge-case scenarios.

### Improved testing

By developing against a service and not an implementation is makes it easy to replace the object that your code is interacting with. This means services can be replaced by fakes or mocks in your tests.

See [What's the difference between faking, mocking, and stubbing?](http://stackoverflow.com/questions/346372/whats-the-difference-between-faking-mocking-and-stubbing/346440#346440)

You can reuse the fake implementations that you have created during the development of a blade when running it within a workbench. The benefit of this is that you get code reuse and you have full control over the behaviour of the fake service.

It's easy to change the service implementation that's registered with the ServiceRegistry to be an object that has been created by a mocking framework. In doing so you can verify the interactions that your blade has with services.

## How to use Services

Services are accessed via code at runtime. There is a detailed guide to registering, accessing and de-registering services at [How to Use Services](/docs/use/service_registry/)

## Where Next?

Services are accessed via the ServiceRegistry. More information can be found on the [ServiceRegistry page](/docs/concepts/service_registry/).

To for more information on how to start using Services, visit the How to Use Services page
For more information on Interfaces, see the [interfaces page](/docs/concepts/interfaces/).
