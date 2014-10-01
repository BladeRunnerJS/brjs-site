---
layout: docs
title: Example BladeRunnerJS Applications
permalink: /docs/reference/example_apps/
notice: none
---

## BRJS KnockoutJS Todo MVC

An example that breaks the Todo MVC KnockoutJS example down into blade components.

* [Tutorial](/docs/use/getting_started/) - *The Getting Started guide shows how to build part of the app*
* [Live example](http://bladerunnerjs.github.io/brjs-todomvc-knockout/)
* [Code on GitHub](https://github.com/BladeRunnerJS/brjs-todomvc-knockout)

## BRJS AngularJS Todo MVC

An example that breaks the Todo MVC AngularJS example down into Angular Directive blades.

* [Tutorial](http://bladerunnerjs.org/blog/using-angularjs-with-bladerunnerjs/)
* [Live example](http://bladerunnerjs.github.io/brjs-todomvc-angular)
* [Code on GitHub](https://github.com/BladeRunnerJS/brjs-todomvc-angular)

<!--
## BRJS Todo MVC with KnockoutJS & AngularJS Blades

The KnockoutJS & AngularJS Todo MVC example application demonstrates how you can build an application using multiple front-end technologies.

* Live example
* Code on GitHub
-->

## Modular App

The Module App example is used as part of our [How to Build Front-End Web Apps that Scale workshop](http://bladerunnerjs.github.io/scaling-js-apps/). It demonstrates how multiple blades can be developed by different teams and brought together into an application of medium complexity. Blades don't communicate with each other directly - since BRJS enforces that. Instead the application uses two [services](/docs/concepts/services/):

* A Chat Service for chat functionality
* A User Service for accessing user information

The application comes with some dummy services to help with development. It also comes with implementations of the services that use [Firebase](http://firebase.com) for realtime synchronisation of both user information and chat messages.

* [Workshop exercises](http://bladerunnerjs.github.io/scaling-js-apps/)
* Live example - *Coming Soon...*
* [Code on GitHub](https://github.com/BladeRunnerJS/modularapp)
