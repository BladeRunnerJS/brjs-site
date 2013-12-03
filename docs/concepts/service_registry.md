---
layout: docs
title: ServiceRegistry
permalink: /docs/concepts/service_registry/
---

The **ServiceRegistry** is a concept used within the BRJS JavaScript framework. It's realized by an application level object for registering and accessing [services](/docs/concepts/services/).

Services tend to offer access to either resources or non-UI tasks (e.g. a REST API, a Persistence Service, a Logging Service).

It is also possible for Blades to register themselves as offering services. Because blades aren't allowed to depend directly on classes in other blades, [interface](/docs/concepts/interfaces/) definitions are instead created for particular pieces of functionality, and blades can choose to register themselves as being providers of that functionality.

The [EventHub](/docs/concepts/event_hub/) is an example of a service that is pre-defined and available by default in any BRJS application.

### Registering a Service

Services can be registered through code or configuration.

#### Code

Services are instances of service classes which are identfied by a name. They are registered with the `ServiceRegistery` passing the name and an instance of the class.

The following service may be defined in `myapp/libs/mylib/MyService.js`. This defines that the full namespace to the class will be `mylib.MyService`:

```javascript
function MyService() {
}

MyService.prototype.doSomething = function() {
  console.log( 'something' );
};
```

In your initialisation code (`App.js` for an Aspect or `index.html` for a Workbench) you can register the service:

```javascript
var MyService = mylib.MyService;
ServiceRegistry.registerService( 'my.something-service', new MyService() );
```

#### XML configuration

`aliases.xml` files can be found in a few locations within a BRJS application.

* `<aspect>/resources/`
* `<blade>/workbench/resources/`
* `*/tests/test-unit/js-test-driver/resources/`

These allow you to set up the services that are registered for the given alias (service) name:

```xml
<aliases xmlns="http://schema.caplin.com/CaplinTrader/aliases" useScenario="dev">
  <alias name="my.something-service" class="mylib.MyService"/>
</aliases>
```

*Note: the `useScenario="dev"` attribute is only present in test and development scenarios*

In the example above a new instance of the `mylib.MyService` is created and registered with the `ServiceRegistry` with the `my.something-service` identifier.

### Accessing a Service

The `MyService` that was registered earlier can be accessed via the logical name we gave it, `my.something-service`, anywhere in the application or test code:

```javascript
var ServiceRegistry = require( 'br/ServiceRegistry' );

var myService = ServiceRegistry.getService( 'my.something-service' );
myService.doSomething();
```