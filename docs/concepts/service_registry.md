---
layout: docs
title: ServiceRegistry
permalink: /docs/concepts/service_registry/
---

The ServiceRegistry is a single, central location from which services can be accessed. It is created and configured when the application is first started. It is one of the first things created within an application so any other code can retrieve required services from the registry.

The ServiceRegistry within BRJS is a [Dynamic Service Locator](http://martinfowler.com/articles/injection.html#ADynamicServiceLocator) that allows an instance of an object - a service - to be registered with a registry with a unique identifier. That same identifier is then used anywhere within the application to access that registered instance.

## Benefits of the ServiceRegistry

Services provide a number of benefits as outlined in the [services section](/docs/concepts/services/). These include faster delivery, increased productivity and improved testability.

## How to use the ServiceRegistry

Since it's possible to access the ServiceRegistry from anywhere within the application it's therefore possible for anything to register itself as a service. However, it's recommended that services are defined within [libraries](/docs/concepts/libraries/) and registered in the following two ways:

* Via code at bootstrap time. This is generally in `App.js` within an aspect, within the `index.html` or JavaScript in the `src` directory of a workbench or in the `setUp` steps of a test.
* Via the aliases mechanism (see [using services](/docs/use/service_registry/)) that is built-in to BladeRunnerJS.

## Where Next?

There is more information on registering, accessing and deregistering a service can be found on [How to use Services](/docs/use/service_registry/).

For more information on the services themselves, see the [Services](/docs/concepts/services/) page.
