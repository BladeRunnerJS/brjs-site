---
layout: docs
title: Blades
permalink: /docs/concepts/blades/
---

{% include docs/concepts/blade_overview.html %}

Blades can be run in isolation during development in a [Workbench](/docs/concepts/workbenches/), making them easy to develop, debug and test. Inter-blade communication is achieved via an event-hub.

![The contents of a Blade](/blog/img/blades.png)
<small class="fig-text">What goes into a <strong>Blade</strong>?</small>

Because application components are broken down into small pieces of functionality, with assets grouped by feature (not type), and because a blade only interacts with other application features through the EventHub or through services, they can be run in isolation in BRJS [Workbenches](/docs/concepts/workbenches).

## Benefits of the Blade approach

Complex web applications built in HTML5 can reveal shortcomings in the conventional JavaScript programming model. In particular, there is no inbuilt support for componentization ([yet](http://www.w3.org/TR/components-intro/)), resulting in ‘spaghetti’ code in which everything depends on everything else. This works for smaller apps, but is very hard to maintain for large-scale apps. The result is reduced developer productivity, high project costs and code that can be very hard to maintain and enhance.

The Blade architecture was specifically developed to remedy this problem. Using the best available open-source libraries and emerging standards, and building on top of these where necessary, Blades provide a lightweight and flexible way of building HTML5 applications out of re-usable components.

The Blade architecture does not limit what you can build in any way, and is fully compatible with virtually all current HTML5 libraries and tools. It simply offers a set of conventions for componentized development. BladeRunnerJS then provides a great set of tools to help do this efficiently.

Some key benefits of blades are:

* Different parts of the application can be built by different teams, without creating integration problems later.
* Developers can build and test blades in isolation, without having to build the whole application every time, making them far more productive.
* Business features are componentised and isolated from each other, eliminating the problem of creating inter-dependent ‘spaghetti’ code.
* Additional features can be developed, tested and added much more easily.
* Blades developed for one user segment can easily be re-used later for another segment.
* Blades developed for one platform (such as desktop) can easily be reused for another platform (such as tablet or phone).