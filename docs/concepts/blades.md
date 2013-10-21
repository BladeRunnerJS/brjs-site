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