---
layout: docs
title: Services
permalink: /docs/concepts/services/
---

Services are a core BRJS JavaScript concept that provide a way of decoupling implementation detail from the interface that the service provides. Services use [interfaces](/docs/concepts/interfaces/) to do this.

For example, if a `PersistenceService` may be used within the application it may have one implementation that persists data to a database via a web service and another that persists to localStorage. Which one is used depends on whether the a application is online. The application logic using the service doesn't care which implementation is used as long as the contract - defined by the interface - is fulfilled when interacting with it.

Services are registered and access via a [ServiceRegistry](/docs/concepts/service_registry/).