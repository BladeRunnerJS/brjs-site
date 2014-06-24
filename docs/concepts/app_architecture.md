---
layout: docs
title: BladeRunnerJS Application Architecture
permalink: /docs/concepts/app_architecture/
---

BladeRunnerJS differs from other toolkits in that is has knowledge of application concepts such as [blades](/docs/concepts/blades/) (for more information see [Modelling Web Apps](/blog/modelling-webapps/)). What this means is that parts of the application architecture are tied to the toolkit. This doesn't mean that the toolkit or application architecture is inflexible, it simply means that there is a solid foundation that everything else has to be built upon.

## BRJS Architecture

The architecture within a running BladeRunnerJS application can be built out of a selection of modules. There are **foundation** modules that are required within every application, a set of **highly recommended** modules that we believe should be used in every application (although the toolkit doesn't enforce this)  and a set of **optional** modules that you can pick and choose from. On top of that you write your application and UI logic. BRJS defaults to using KnockoutJS but you can use any other library that you wish for your app and UI logic e.g. AngularJS, Ember, Backbone, Web Components (Polymer/Brick).

![BRJS Runtime Application Architecture](/docs/concepts/img/brjs-app-runtime.png)

### Foundation

This foundation includes three

* [Blades](/docs/concepts/blades/) - each application feature should be encapsulated in a blade although what goes into a blade is entirely up to you
* [bladeset](/docs/concepts/bladesets) and [libraries](/docs/concepts/libraries/) - code cannot be directly shared between blades so shared code should be in a bladeset or a library
* [Aspects](/docs/concepts/aspects/) - used to bring blades together to form a fully functional application
* [Node.js style modules](/docs/concepts/modules/) - code is imported using `require` statements and exported using `module.exports = myThing` or `exports.myThing = myThing` <sup>†</sup>

**Of the above points, only the Node.js style modules directly relate to the application runtime** (hence why they're not in the above *runtime* diagram). Blades, bladesets, libraries and aspects are all concepts to ensure separation of concerns and building an application in a modular way. These build restrictions ensure that application features can't directly talk to each other and instead have to use a loosely coupled communication mechanism (e.g. the [EventHub](/docs/use/event_hub)).

From that point there are **optional** additions that can be used as required.

*<sup>†</sup> it is also possible to write your own [bundling mechanism](/docs/concepts/bundlers/) as a [BRJS plugin](/docs/extend/) and thus write application code in other ways*

### Highly Recommended

Out of these addition there are two that are **highly recommended** to be used:

* [ServiceRegistry](/docs/concepts/service_registry/) - used to expose services to access shared resources e.g. Web APIs
* [EventHub](/docs/concepts/event_hub/) - A publish-subscribe messaging service, accessed via the ServiceRegistry

### Optional

The additional optional architectural components are:

* [AliasRegistry](/docs/concepts/ioc/) - a form of Inversion of Control/Dependency Injection
* [Topiarist](/blog/topiarist/) - to support Object Oriented JavaScript
* [Fell](/docs/use/logging/) - for application logging
* [Internationalization](/docs/use/internationalization/) - support for multiple locales via i18n
* [emitr](https://github.com/BladeRunnerJS/emitr) - an event emitter library

## Architecture Walkthrough

A traditional view of an full application architecture may look something like the following:

![](/docs/concepts/img/app-disection.png)

From bottom to top; backend services expose access to functionality executed on servers. They are accessed via the network. The runtime environment is the web browser and within that there is the application logic (JavaScript), presentation (CSS, HTML templates etc.) and the DOM (Document Object Model) which is a logical representation of the view that is rendered by the web browser.

The code within the Application in the diagram handles accessing services, business logic and controlling DOM manipulation. Most would agree that this isn't a good approach. There are two ways we can improve the application.

### Features

First, we can split the application up by feature - we call these [blades](/docs/concepts/blades/):

![](/docs/concepts/img/app-disection-blades.png)

In addition, the three concerns - accessing services, business logic, controlling DOM manipulation - should be separated.

![](/docs/concepts/img/app-disection-mvx.png)

Although this looks fine, there are a number of potential problems:

1. If two controllers access the same backend service there is potential for duplication of effort and code
2. If code is shared between controllers a change in that code for one feature can have a side effect on another
3. This type of solution can result in tight coupling between business logic and the implementation of code that accesses services making change difficult to manage
4. Controllers access backend services directly via AJAX calls or by creating WebSocket connections making testing difficult
5. Depending on the MVC/MV* solution, testing may require assertions being made against the DOM which can result in unreliable and inconsistent result due to browser rendering timings

These potential problems can be avoided with the introduction of two architectural decisions:

1. A services layer
2. A DOM abstraction

### Services

[Services](/docs/concepts/services/) can be be used to access shared resources such as backend services. They can solve the potential problems - points 1 to 4 - introduced above by:

* Centralising code that accesses services
* Providing a defined contract/protocol/interface for interacting with services
* Representing an abstraction from the implementation meaning the implementation can be changed without introducing unwanted side effects
* When accessed via a level of indirection through a [ServiceRegistry](/docs/concepts/service_registry/) it's easy to return a test double in test scenarios

![](/docs/concepts/img/app-disection-mvx-services.png)

### A DOM Abstraction

By using a DOM abstraction it's possible to make assertions against that abstraction during test and avoid the problems that direct DOM assertions can introduce. For this reason alone, by default a BRJS uses a MVVM ([Knockout](http://knockoutjs.com/)) solution as it provides a great benefit. However, as pointed out earlier, it is possible to use any other MV* solution.

![](/docs/concepts/img/app-disection-mvvm-services.png)

## Benefits

There are a number of benefits to this approach.

### Blades can be Run in Isolation

Since blades cannot access code defined by other blades and they access backend services through a Services layer it is possible to run a blade in isolation within a [workbench](/docs/concepts/workbenches). This results in a productive developer workflow, unaffected by changes in unrelated parts of the application.

### Apps are Composed of Blades

Blades can be selectively included into a composed view of application functionality known as an [aspect](/docs/concepts/aspects/). This allows for multiple aspects to be created offering different "views" of an application.

The loosely coupled nature of blade communication within this architecture also means blades can be updated, added or removed from aspects without unwanted side affects.

### Full Features can be Tested in Isolation

Since blades don't directly communicate with each other and services are accessed via a ServiceRegistry it's possible to run a full feature in isolation during test.

![](/docs/concepts/img/vm-services-testing.png)

It's possible to interact with the ViewModel and make assertions against interaction that have been made with a mock service that's been injected into the ServiceRegistry.

It's possible to inject a test double configured to behave in a particular way for a test into the ServiceRegistry and then make assertions agains the ViewModel to check that the view has been changed as expected.

### Effective Team Working

Since each feature can be built in isolation it's possible to have multiple teams working on different features. This can be split into:

* Vertical business features represented by blades
* Access to backend services represented by services

This results in teams working in parallel unaffected by code changes or hold-ups elsewhere in development. Services and aspects are integration points where teams must ensure contracts are defined upfront and are evolved through effective communication, but the surface areas for these are as small as possible to try and reduce integration slow down.

## Where next?

For more benefits, please read through each of the [BRJS concepts](/docs/concepts/).

A great way to see the benefits in action is to try out the [getting started guide](/docs/use/getting_started/).
