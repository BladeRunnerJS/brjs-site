---
layout: docs
title: ServiceRegistry
permalink: /docs/concepts/service_registry/
---

The **ServiceRegistry** is a concept used within the BRJS JavaScript framework. It's realized by an application level object for registering and accessing [services](/docs/concepts/services/).

The ServiceRegistry within BRJS is a [Dynamic Service Locator](http://martinfowler.com/articles/injection.html#ADynamicServiceLocator)
that allows an instance of an object - a service - to be registered with a registry
with a unique identifier. That same identifier is then used anywhere within the application
to access that registered instance.

## Why use the ServiceRegistry?

Services provide a number of benefits as outlined in the [services section](/docs/concepts/services).
The ServiceRegistry faciliates services. In addition it allows different implementations of a service to be registered, and therefore used, in different runtime scenarios. Those scenarios are:

### Workbenches

In the [workbenches](/docs/concepts/workbenches/) scenarios you can register a service that enables the development of a blade.

### Tests

In the [test](/docs/concepts/testing/) runtime scenarios you can ensure the registered service helps testing;
either by offering control over the service behaviour or by being tied to a form of
testing, such as [mocking](http://en.wikipedia.org/wiki/Mock_object).

### Aspects

In the [aspect](/docs/concepts/aspects/) runtime scenario you are running the full application so you want
the implementations of your service to be interacting with real back-end services.
So, the implementations that are registered with the ServiceRegistry will offer
that full functionality.

## Predefined services

The [EventHub](/docs/concepts/event_hub/) is a service that is pre-defined and available by default in any BRJS application. It offers publish-subscribe functionality and can be used
for loosely coupled application messaging.

## Where should services be registered and defined?

Since it's possible to access the `ServiceRegistry` from anywhere within the application
it's therefore possible for anything to register itself as a service. However, it's
recommended that services are defined within [libraries](/docs/concepts/libraries)
and registered in the following two ways:

1. Via code at bootstrap time. This is generally in `App.js` within an aspect,
within the `index.html` or JavaScript in the `src` directory of a workbench or in
the `setUp` steps of a test.
2. Via the aliases mechanism that is built-in to BladeRunnerJS.

For more information on registering and accessing services see
[How to Use the ServiceRegistry](/docs/use/service_registry/).

## Where next?

* [Services](/docs/concepts/services/)
* [How to use the ServiceRegistry](/docs/use/service_registry)
