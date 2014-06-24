---
layout: docs
title: IoC (Inversion of Control) using the AliasRegistry
permalink: /docs/concepts/ioc/
---

The `AliasRegistry` is used to provide access to the aliases used within the application. Aliasing allows you to refer to JavaScript classnames using name-spaced logical identifiers.  The class that's actually used at run-time is independently defined in a separate configuration file. You can use alias names in JavaScript, HTML or XML files.

Using a logical name in your source code, whether it be Javascript, HTML or CSS, will cause the class to be bundled and sent to the browser. It is therefore, at it's simplest, a mechanism for ensuring that all the code your app needs, and no more, is bundled and sent to the browser. Though class dependencies are usually specified by directly referring to other classes, there are times when this is inappropriate:

We sometimes need a level of indirection, so that dependencies can be expressed without knowing the concrete class that will end up being used (e.g. [services](/docs/concepts/services)).

Another useful facet of aliases, is that they can be used to automatically discover all of the classes capable of implementing a particular interface, which makes it a good candidate for creating SPI (Service Provider Interface) type, auto-discovery mechanisms.

## Where next?

See [Using the AliasRegistry](/docs/use/ioc/).
