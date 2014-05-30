---
layout: docs
title: Aspects
permalink: /docs/concepts/aspects/
---

**Aspects** represent a specific *presentation* of a BRJS application to a user. It might be used in particular circumstances, on particular devices, or because of different preferences. A single app may have multiple aspects; providing for different devices, user segments and so on. On the other hand, an app might get by perfectly well on just the default-aspect. It all depends on your needs.

In a BRJS app, an aspect consists of an entry `index.html` page, and a set of required resources. It acts as a sub-context for that application. Each aspect potentially has access to all the resources and blades in its parent application, but it may be set up only to deliver a fraction of that to the end-users.

![BladeRunnerJS Aspects example](https://docs.google.com/drawings/d/1zRaOTlTQ26t3n6vRRvSvo3KCtggQeP7DVpUlhFi7JD0/pub?w=1440&h=1080)

## Where Next?

Find out about [Adding Blades to Aspects](/docs/use/add_blade_to_aspect/).
