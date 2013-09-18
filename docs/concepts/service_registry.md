---
layout: docs
title: ServiceRegistry
permalink: /docs/concepts/service_registry/
---

The **ServiceRegistry** is a BRJS JavaScript concept realized by an application level object for registering and accessing [services](/docs/concepts/services/).

Because blades aren't allowed to depend directly on classes in other blades, [interface](/docs/concepts/interfaces/) definitions are instead created for particular pieces of functionality, and blades can choose to register themselves as being providers of that functionality. The ServiceRegistry and the [EventHub](/docs/concepts/event_hub/) are both useful in this regard.