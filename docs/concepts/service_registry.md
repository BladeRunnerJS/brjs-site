---
layout: docs
title: ServiceRegistry
permalink: /docs/concepts/service_registry/
---

The **ServiceRegistry** is a concept used within the BRJS JavaScript framework. It's realized by an application level object for registering and accessing [services](/docs/concepts/services/).

Services tend to offer access to either resources or non-UI tasks (e.g. a REST API, a Persistence Service, a Logging Service).

It is also possible for Blades to register themselves as offering services. Because blades aren't allowed to depend directly on classes in other blades, [interface](/docs/concepts/interfaces/) definitions are instead created for particular pieces of functionality, and blades can choose to register themselves as being providers of that functionality.

The [EventHub](/docs/concepts/event_hub/) is an example of a service that is pre-defined and available by default in any BRJS application.

## Where next?

[How to use the ServiceRegistry](/docs/use/service_registry) to register services via code and configuration.
