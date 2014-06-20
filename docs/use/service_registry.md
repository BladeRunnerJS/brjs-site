---
layout: docs
title: How to Use Services
permalink: /docs/use/service_registry/
---

## Registering a Service

Services can be registered in the for the following:

* Aspects - used when the application is running
* Workbenches - used when a Workbench is running
* Tests - used when executing tests

The benefit of this is that you can register different services for these scenarios. For example, you may register a test mock service that enables assertions in tests in the Tests scenario and you may register a dummy service in a Workbench scenario to facilitate the development of a Blade.

Services can be registered through code or configuration and can also be deregistered via code.

## Code

Services are instances of service classes which are identified by a name. They are registered with the `ServiceRegistry` passing the name and an instance of the class.

The following service may be defined in `myapp/libs/mylib/MyService.js`. This defines that the full require path of the class will be mylib/MyService:

```js
function MyService() {
}

MyService.prototype.doSomething = function() {
  console.log( 'something' );
};
```

In your initialisation code (`App.js` for an Aspect or `index.html` for a Workbench) you can register the service:

```js
var MyService = require( 'mylib/MyService' );
ServiceRegistry.registerService( 'my.something-service', new MyService() );
```


## XML configuration

`aliases.xml` files can be found in a few locations within a BRJS application:

* `<aspect>/resources/`
* `<blade>/workbench/resources/`
* `*/tests/test-unit/js-test-driver/resources/`

These allow you to set up the services that are registered for the given alias (service) name:

```xml
<aliases xmlns="http://schema.caplin.com/CaplinTrader/aliases" useScenario="dev">
  <alias name="my.something-service" class="mylib.MyService"/>
</aliases>
```

The `useScenario="dev"` attribute is only present in test and development scenarios

Note: the `alias` element will allow be updated to support a `requirePath` attribute to be consistent with the BRJS use of `require`. https://github.com/BladeRunnerJS/brjs/issues/724
In the example above a new instance of the `mylib/MyService` is created and registered with the ServiceRegistry with the `my.something-service` identifier.

## Accessing a Service

The MyService that was registered earlier can be accessed via the logical name we gave it, `my.something-service`, anywhere in the application or test code:

```js
var ServiceRegistry = require( 'br/ServiceRegistry' );
var myService = ServiceRegistry.getService( 'my.something-service' );
myService.doSomething();
```

If a service is defined in an `aliases.xml` but is not retrieved from the ServiceRegistry in any application or test code, the BRJS dependency analysis system will notice this and therefore not register it with the ServiceRegistry. See [Dependency Analysis](http://bladerunnerjs.org/docs/concepts/dependency_analysis/) for more information.

## De-registering a Service

The service with the identifier my.something-service can be removed from the ServiceRegistry using the deregisterService function.

```js
var ServiceRegistry = require( 'br/ServiceRegistry' );
ServiceRegistry.deregisterService( 'my.something-service' );
```

## Checking if a Service is Registered

It is possible to check if a service with and identifier (e.g. `my.something-service`) is registered as follows:

```js
var ServiceRegistry = require( 'br/ServiceRegistry' );
var isRegistered = ServiceRegistry.isServiceRegistered( 'my.something-service' );
```

## Where next?

You can see an example of a service being defined and used within an application in the [Knockout BRJS Todo MVC example app](https://github.com/BladeRunnerJS/brjs-todomvc-knockout). The service is defined in the `todomvc` library found in the `libs/todomvc` directory.
