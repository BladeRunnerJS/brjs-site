---
layout: docs
title: Blades
permalink: /docs/concepts/blades/
---

{% include docs/concepts/blade_overview.md %}

A blade encapsulates all the required resources – JavaScript, HTML, CSS, XML, images, etc – to implement a particular high level feature. For example, a blade might implement a map UI, a chat window, a charting module or an alerting mechanism. A blade usually (but not always) corresponds to a particular area of the display.

Blades can be run in isolation during development in a [Workbench](/docs/concepts/workbenches/), making them easy to develop, debug and test. Inter-blade communication is achieved via an [event hub](/docs/concepts/event_hub/) or via [services](/docs/concepts/services/).

![The contents of a Blade](/blog/img/blades.png)
<small class="fig-text">What goes into a <strong>Blade</strong>?</small>

Because application components are broken down into small pieces of functionality, with assets grouped by feature (not type), and because blades do not directly interact with other application blades and features, they can be run in isolation in BRJS [Workbenches](/docs/concepts/workbenches).

## Benefits of Blades

Complex web applications built in HTML5 can reveal shortcomings in the conventional JavaScript programming model. In particular, there is no inbuilt support for componentization ([yet](http://www.w3.org/TR/components-intro/)), resulting in ‘spaghetti’ code in which everything depends on everything else. This works for smaller apps, but is very hard to maintain for large-scale apps. The result is reduced developer productivity, high project costs and code that can be very hard to maintain and enhance.

The blades architecture and workflow was specifically developed to remedy this problem by providing provide a lightweight and flexible way of building HTML5 applications out of reusable components.

Blades do not limit what you can build in any way, and are fully compatible with virtually all current HTML5 libraries and tools. They simply offer a set of conventions for componentized development. BladeRunnerJS then provides a great set of tools to help do this efficiently.

Each blade is located in a physical folder on disk and all resources for the blade exists under that folder. This is part of the [BRJS application model](/docs/concepts/model/) and is automatically served to the browser when the page is loaded.

Some key benefits of blades are:

* Different parts of the application can be built by different teams, without creating integration problems later.
* Developers can build and test blades in isolation, without having to build the whole application every time, making the process far more efficient and productive.
* Business features are componentized and isolated from each other, eliminating the problem of creating inter-dependent ‘spaghetti’ code.
* Additional features can be developed, tested and added much more easily.
* Old unused features can be removed without side effects
* Blades developed for one user segment can easily be re-used later for another segment.
* Blades developed for one platform such as desktop can easily be reused for another platform such as tablet or phone.

##How to Use Blades

You can create a new blade on the BRJS dashboard or via the command line interface by executing the following instruction:

```bash
$ ./brjs create-blade <app-name> <bladeset-name> <blade-name>
```

for example:

```bash
$ ./brjs create-blade brjstodo todo input
```

## Where Next?

- For more information about creating blades see [How to Create a Blade](/docs/use/create_blade/).
- The [Getting Started guide](/docs/use/getting_started/) covers everything you need to get going, including instructions on how to create applications, bladesets and blades.
- Check out the pages for [bladesets](/docs/concepts/bladesets/), [aspects](/docs/concepts/aspects/) and [libraries](/docs/concepts/libraries/) to find out more about these concepts.
