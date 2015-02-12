---
layout: docs
title: Namespaced Style Code
permalink: /docs/reference/namespaced_style_code/
---

In addition to supporting [CommonJS](http://wiki.commonjs.org/wiki/CommonJS) modules, for historical reasons BladeRunnerJS also supports [namespaced style](http://addyosmani.com/blog/essential-js-namespacing/) modules, which we refer to as _NamespacedJS_ modules. Although we'd ideally ideally recommend that you update your modules to use CommonJS instead, this may not always be feasible, and so this page hopes to document any issues unique to using NamespacedJS modules within BladeRunnerJS.

## Sub-Realms

If you've started using [sub-realms](https://github.com/BladeRunnerJS/browser-modules#sub-realms) to help test your CommonJs modules, but your application continues to be dependent upon NamespacedJS modules too, then you will need to re-install all global module references after installing and un-installing each _sub-realm_.

For example, instead of writing this:

``` js
var subrealm;

beforeEach(function() {
  subrealm = realm.subrealm();
  subrealm.install();

  // defines go here...

  // requires go here...
});

afterEach(function() {
  subrealm.uninstall();
});
```

you should instead write this:

``` js
var subrealm;

beforeEach(function() {
  subrealm = realm.subrealm();
  subrealm.install();

  // defines go here...

  globalizeSourceModules();

  // requires go here...
});

afterEach(function() {
  subrealm.uninstall();
  globalizeSourceModules();
});
```

## Circular Dependencies

The [Fixing Circular Dependencies](https://github.com/BladeRunnerJS/browser-modules#fixing-circular-dependencies) section of the [browser-modules](https://github.com/BladeRunnerJS/browser-modules) documentation describes how to overcome circular dependency issues you may run into. However, very little of the advice applies if you are using NamespacedJS modules since:

  1. You are unable to convert _define-time_ dependencies into _use-time_ dependencies.
  2. You can't control the order in which modules will be required, since this is controlled by the `globalizeSourceModules()` function.

For NamespacedJS modules, _use-time_ dependencies are automatically promoted to post-export _define-time_ dependencies, increasing the likelihood of circular dependency errors. Although this is technically wrong, it turns out to be useful as it makes it possible to work around BladeRunnerJS's inability to detect _self-invoking_ and _singleton_ modules.

### The Singleton Module Pattern

To prevent BladeRunnerJS from incorrectly classifying the dependencies within _self-invoking_ and _singleton_ modules, we recommend the use of a _singleton-module-pattern_ described here. This pattern involves the conversion of any modules that look like this:

```js
ns.Thingy = function() {
  // constructor code goes here...
};

ns.Thingy = new ns.Thingy();
```

into a distinct _class-module_ and a _singleton-module_, where the _class-module_ looks like this:

```js
ns.ThingyClass = function() {
  // constructor code goes here...
};
```

and where the _singleton-module_ looks like this:

```js
ns.Thingy = new ns.ThingyClass();
```

This pattern has the additional advantage that it makes it possible to test the underlying class that was used to create the singleton.

### Globalization Block Ordering

BladeRunnerJS automatically orders the _globalization-block_ to reduce the chance of circular dependencies becoming problematic. This is really helpful given that it's not possible to mark dependencies as being _use-time_ dependencies, but is also limiting since the algorithm used for ordering is _best-effort_ only, and doesn't correctly solve all dependency graphs.

In cases where problems still remain even after making use of the _singleton-module-pattern_, the final option is to hide dependencies from BladeRunnerJS completely.

For example, this module:

```js
pkg1.pkg2.SomeClass = function() {
  this.obj = new pkg1.pkg2.OtherClass();
};
```
can be re-written as:

```js
pkg1.pkg2.SomeClass = function() {
  this.obj = new pkg1['pkg2'].OtherClass();
};
```

This is akin to converting the dependency to a _use-time_ dependency, except that the dependency is no longer known about whatsoever, so won't work if `pkg1/pkg2/OtherClass` isn't also a dependency of some other module, or modules.
