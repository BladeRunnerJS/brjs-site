---
layout: docs
title: EventHub
permalink: /docs/concepts/event_hub/
---

The EventHub is a core BRJS JavaScript [Service](/docs/concepts/services) available in any BRJS application. It is a publish-subscribe event service that decouples the communication between blades and provides a primary way for them to communicate with each other.

There are various situations where you would want to use the Event Hub, such as:

* Dragging from one blade and dropping in another
* Logging from multiple blades onto a single "log viewer" blade
* A "theme selector" blade telling all other blades to render to a new theme

For information on how to access and use the EventHub see [Using the EventHub](/docs/use/event_hub/).
