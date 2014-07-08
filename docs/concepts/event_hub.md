---
layout: docs
title: EventHub
permalink: /docs/concepts/event_hub/
---

The EventHub is a core BRJS JavaScript [Service](/docs/concepts/services) available in any BRJS application. It is a [publish-subscribe](http://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) event service, accessed via the [ServiceRegistry](/docs/concepts/service_registry/), that decouples the communication between blades and provides a primary way for them to communicate with each other.

There are various situations where you would want to use the Event Hub, such as:

* Dragging from one blade and dropping in another
* Logging from multiple blades onto a single "log viewer" blade
* A "theme selector" blade telling all other blades to render to a new theme

## Benefits of the EventHub

Blades can't directly access functionality exposed by other blades. Communicating via the EventHub allows them to communicate with each other in a loosely coupled way.

Using EventHub to ensure that blades do not directly interact with each other results in it being easy to change, add or remove additional blades without side effects. It also enables developer tooling such as [Workbenches](/docs/concepts/workbenches/). There is more information on what it can do on the Workbench page.

## Where Next?

To find out how to use the EventHub see the [How to use the EventHub section](/docs/use/event_hub/).

To find out more about Workbenches, see the [Workbenches ](/docs/concepts/workbenches/) page.

To understand how the Service Registry works, see the [Service Registry](/docs/concepts/service_registry/) page.
