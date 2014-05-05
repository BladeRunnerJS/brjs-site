---
layout: docs
title: How to Use the ServiceRegistry
permalink: /docs/use/service_registry/
---

The [ServiceRegistry](/docs/concepts/service_registry) provides a way of loosely coupling an implementation of a [service](/docs/concepts/services/) from an implementation. It can be set up via code or configuration, is accessed via code at runtime and services can also be registered and deregistered via code at runtime.

<div id="page_toc"></div>

## Registering a Service

Services can be registered in the for the following:

* Aspects - used when the application is running
* Workbenches - used when a Workbench is running
* Tests - used when executing tests

The benefit of this is that you can register different services for these scenarios. For example, you may register a test mock service that enables assertions in tests in the Tests scenario and you may register a dummy service in a Workbench scenario to facilitate the development of a Blade.

Services can be registered through code or configuration.

Services can also be deregistered via code.

### Code

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
var MyService = require( 'mylib/MyService' );
ServiceRegistry.registerService( 'my.something-service', new MyService() );
```

### XML configuration

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

<div class="alert alert-info">
  <p>The <code>useScenario="dev"</code> attribute is only present in test and development scenarios</p>
</div>

In the example above a new instance of the `mylib.MyService` is created and registered with the `ServiceRegistry` with the `my.something-service` identifier.

## Accessing a Service

The `MyService` that was registered earlier can be accessed via the logical name we gave it, `my.something-service`, anywhere in the application or test code:

```javascript
var ServiceRegistry = require( 'br/ServiceRegistry' );

var myService = ServiceRegistry.getService( 'my.something-service' );
myService.doSomething();
```

<div class="alert alert-info">
  <p>If a service is defined in an <code>aliases.xml</code> but is not retrieved from the <code>ServiceRegistry</code> in any application or test code, the BRJS dependency analysis system will notice this and therefore not register it with the ServiceRegistry. Please see <a href="/docs/concepts/dependency_analysis/">Dependency Analysis</a> for more information.</p>
</div>

## Deregister a Service

The service with the identifier `my.something-service` can be removed from the ServiceRegistry using the `deregisterService` function.

```javascript
var ServiceRegistry = require( 'br/ServiceRegistry' );

ServiceRegistry.deregisterService( 'my.something-service' );
```
