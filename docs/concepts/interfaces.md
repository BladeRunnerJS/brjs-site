---
layout: docs
title: Interfaces
permalink: /docs/concepts/interfaces/
---
**Interfaces** are a well known concept in object-oriented programming. Although they are not native to JavaScript they provide a number of benefit when building large applications.

The core BRJS framework provides a mechanism to define and use Interfaces within a JavaScript application through it's use of the [Topiarist library](https://github.com/BladeRunnerJS/topiarist).

Interfaces are used by [services](/docs/concepts/services/), the [ServiceRegistry](/docs/concepts/service_registry) and can also be used anywhere within a BRJS application that you wish to define a contract/protocol of interaction with an object.

*The use of Interfaces is entirely optional.*

## Benefits

Interfaces provide a way of a class stating that it offers a contract or protocol; a defined way of interacting and behaviour. Although we don't natively have Interfaces in JavaScript we do interact with objects and need to rely on them having functions with specific names that take particular parameter, have defined return values and behave in a defined way. Interfaces are simply a way of formalising that.

They offer an abstraction away from the implementation so that underlying implementation can change or be completely replaced without it impacting the functionality of anything that uses it.

Within BladeRunnerJS we have a way of checking that a class which state is implements and interface actually does. So, as developers we can get fast feedback if where contracts aren't being fulfilled by a class.

Interfaces are highly valuable when building large applications that require a siginficant amount of testing to ensure that they are maintainable. Mocks can easily be created from Interface definitions and fakes (test double) can be created and use in place of real implementations to help exercise business logic in different scenarios.

## Defining an Interface

Using `Animal` as an example interface, your definition in `Animal.js` could look something like this:

```js
function Animal() {
}

Animal.prototype.speak = function() {
};

Animal.prototype.getGender = function() {
};

Animal.prototype.getLegCount = function() {
};

module.exports = Animal;
```

## Implementing an Interface

You can implement an interface using the `br.implement()` method. As you might expect, you can use this invocation to implement as many interfaces as you wish. If we wanted to declare a `Quadruped` class in a `Quadruped.js` that implements the `Animal` interface, we could do it like this:

```js
var br = require( 'br/Core' );
var Animal = require( './Animal' );

function Quadruped( gender ) {
  this._gender = gender;
};
br.implement( Quadruped, Animal );

Quadruped.prototype.getLegCount = function() {
  return 4;
};

Quadruped.prototype.getGender = function() {
  return this._gender;
};

module.exports = Quadruped;
```

If another class implements the `Animal` interface, it must implement all its methods as well, or **an exception will be thrown after the declaration**. For example: if a class states that it implements `Animal`, but does not provide an implementation for the method `speak()``. Although we can't do static type checking we do get fast feedback that there is a problem in our code.

## Where next?

You may also notice the Quadruped class hasn't implemented the speak() method, which effectively makes this an abstract class. For more information check out the [Classes docs](/docs/concepts/classes).

Take a look at [services](/docs/concepts/services/), how they tie into Interfaces. Also see the [ServiceRegistry](/docs/concepts/service_registry) where services are registered.

[Topiarist](https://github.com/BladeRunnerJS/topiarist) enables both classes and interfaces and we wrote up an [introductory blog post on Topiarist](http://bladerunnerjs.org/blog/topiarist/) that's worth taking a look at.
