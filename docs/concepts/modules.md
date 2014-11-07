---
layout: docs
title: Modules
permalink: /docs/concepts/modules/
---

The default JavaScript [bundler](/docs/concepts/bundler/) in BladeRunnerJS (BRJS)
lets you reference code using Node.js-style `require`, `module.exports` and `exports`
syntax within your application's JavaScript. The generated JavaScript is then supported within the browser using a library called [browser-modules](https://github.com/BladeRunnerJS/browser-modules).

The contents of each JavaScript file within your application's codebase is entirely
up to you. For example, you could have a single JavaScript file at the root of
any group of files that exposes all the functionality within that group of files.

In BRJS we tend to make each file define a single class. In taking this approach
you `require` individual class definitions rather than groups of definitions of classes
as you might in other module or packaging systems. As above, *you can take the approach
you prefer*.

In the following examples we'll reference individual classes to demonstrate how you
can use `require`, `module.exports` and `exports` within your BRJS application's code.

## Require paths

**The paths to be used with calls to `require` do not always directly relate to the locations
of files on disk**. Instead they should be thought of as a reference based on where
the module is defined within the application's logical structure (app, aspect, bladeset,
blade and library).

For example, given a module defined in a file called `InputViewModel.js` that resides in a
[blade](/docs/concepts/blades) called `input`, that is part of a [BladeSet](/docs/concepts/bladesets)
called `todos` within an app called `brjstodo`, it would be required as follows:

```js
var InputViewModel = require( 'brjstodo/todos/input/InputViewModel' );
```

If you are referencing a module that is defined within a library then the require
path will be `<app-name>/<library-name>/<path-to-file>`. For example, if there
is a class defined in a file called `LocalStorageService.js` that resides in a library called
`todoservice` that is part of a `brjstodo` application, then it would be required
as follows:

```js
var LocalStorageService = require( 'brjstodo/todoservice/LocalStorageService' );
```

## module.exports

You can export a reference by assigning it to the `module.exports` property. In
the example below `Foo` is defined within a file named `Foo.js`.

```js
function Foo() {
}

Foo.prototype.sayHi = function() {
  console.log( 'hi' );
};

module.exports = Foo;
```

If you have a file that is in the same directory as `Foo.js` you can then use the
`Foo` module by requiring it as follows:

```js
var Foo = require( 'Foo' );

var foo = new Foo();
foo.sayHi();
```

## exports

You can also export references by assigning them as properties to an `exports` object.

`Baz` is defined in a `Bar.js` file as follows:

```js
function Baz() {
}

Baz.prototype.sayHi = function() {
  console.log( 'hi' );
};

exports.Baz = Baz;
```

If you have a file that is in the same directory as `Bar.js` you can then use the `Baz`
class from the `Bar` module as follows

```js
var Baz = require( 'Bar' ).Baz;

var baz = new Baz();
baz.sayHi();
```

## More about browser-modules

The [browser-modules repository](https://github.com/BladeRunnerJS/browser-modules) provides much more information about how it works. This includes information on things like [circular dependency detection](https://github.com/BladeRunnerJS/browser-modules#circular-dependency-detection) and how that impacts CommonJS compliance.

## Where next?

If you're interested in writing object oriented JavaScript then take a look
at the [Interfaces](/docs/concepts/interfaces/) section.

Or you can take a look at sharing code across applications through the use of
[libraries](/docs/concepts/libraries/).
