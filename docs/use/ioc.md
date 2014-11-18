---
layout: docs
title: Using the AliasRegistry
permalink: /docs/use/ioc/
---

The [AliasRegistry](/docs/concepts/ioc/) is used to provide access to the aliases used within the application. Aliasing allows you to refer to JavaScript classnames using name-spaced logical identifiers.  The class that's actually used at run-time is independently defined in a separate configuration file. You can use alias names in JavaScript, HTML or XML files.

## Alias definitions

Before using the `AliasRegistry`, each alias must first be defined in a file called `aliasDefinitions.xml`. Aliases can be defined in libraries, bladesets or blades and must be namespaced accordingly. This helps prevent developers from accidently overriding each others aliases.  You can define your own aliases by creating a file named `resources/aliasDefinitions.xml` in the appropriate directory. Optionally, aliases may specify an interface that any assigned class must implement, and /or a default implementation.

The snippet below shows how a `foo.date-picker` alias is defined in the `bar` library can be defined.

```xml
<aliasDefinitions xmlns="http://schema.caplin.com/CaplinTrader/aliasDefinitions">
    <alias name="foo.date-picker" defaultClass="bar.DatePickerControl" />
</aliasDefinitions>
```

## Accessing aliases in code

In the browser, all information about aliases can be accessed from the `AliasRegistry`. The AliasRegistry allows you to find all aliases or just aliases that implement a particular interface. Commonly, you would want to find the class that an alias points to.  This is  shown in the following code snippet:

```js
var AliasRegistry = require('br/AliasRegistry');
var DatePicker = AliasRegistry.getClass('foo.date-picker');
var datePicker = new DatePicker();
```

A more convenient short-hand for the above code is as follows:

```js
var DatePicker = require('alias!foo.date-picker');
var datePicker = new DatePicker();
```

## Alias groups

Some alias implementations are closely related, and likely to always be used together. For example, an application that uses a realtime framework called StreamLink JS (a Caplin System library) is likely to want to use the StreamLink implementations of each of the following aliases:

```
caplin.connection-service
caplin.message-service
caplin.user-service
caplin.permission-service
```

Alias groups help with this, as they allow you to set multiple aliases in one go. The following `aliases.xml` file uses the `caplin.sljs-service-aliases` group, which sets the four aliases above to their StreamLink implementations.

```xml
<aliases useGroups="caplin.sljs-service-aliases"
         xmlns="http://schema.caplin.com/CaplinTrader/aliases">
</aliases>
```

The `useGroups` attribute is a space-delimited list of group names, so it is possible to use multiple alias groups in your application.

It is possible to define your own alias groups within any aliasDefinitions.xml file. This can be useful as it prevents you from having to set the same aliases in different contexts (such as your application and your workbenches).

Below is an example of how to define an alias group:

```xml
<aliasDefinitions xmlns="http://schema.caplin.com/CaplinTrader/aliasDefinitions">

  <group name="foo.my-framework-group">
    <alias name="bar.user-prompt-service" class="foo.MyUserPromptService"/>
    <alias name="bar.frame-manager-service" class="foo.MyFrameManager"/>
  </group>

</aliasDefinitions>
```

Even though Alias groups are defined in `aliasDefinitions.xml` files, their contents follows the syntax of `alias.xml` files as shown in the above code snippet. If a group is used, its aliases will be treated as if they were included in your `aliases.xml`. This means, that they will override any existing aliases regardless of the scenario being used.

## Where next?
<!-- TODO: enable this link once the docs have been updated since the URLs will change
Read the [JavaScript API documentation](http://apidocs.bladerunnerjs.org/latest/js/index.html#br.AliasRegistry.html).
-->
The AliasRegistry is used by the ServiceRegistry so a good way of gaining a further understanding of the AliasRegistry is to read up on [ServiceRegistry](/docs/concepts/service_registry) and [how to use the ServiceRegistry](/docs/use/service_registry).
