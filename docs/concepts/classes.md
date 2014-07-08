---
layout: docs
title: Classes
permalink: /docs/concepts/classes/
---

**Classes** are a well known concept in object-oriented programming. The core BRJS framework provides a mechanism to write Object Oriented code in a defined structure. In addition, it provides mechansims for inheritance, [Interfaces](/docs/concepts/interaces) and type checking. This is achieved by using a library called [Topiarist](https://github.com/BladeRunnerJS/topiarist).

Use of this mechanism within BladeRunnerJS is optional, but recommended.

## Defining a Class

In `Quadruped.js` we may define a class as follows:

```js
function Quadruped( gender ) {
	this._gender = gender;
}

Quadruped.prototype.getLegCount = function() {
	return 4;
};

Quadruped.prototype.getGender = function() {
	return this._gender;
};

module.exports = Quadruped;
```

## Inheritance

As Quadruped could be classed as an abstract class, we are going to need to extend it to provide a concrete implementation. You do this by using the `br.extend()` construct.

Going back to our example, let's extend `Quadruped` to give us two concrete classes: `Cat` and `Dog`.

In `Cat.js`:

```js
var br = require( 'br/Core' );
/*** new code ***/
var Quadruped = require( './Quadruped' );
/*** end of new code ***/

function Cat( gender ) {
  /*** new code ***/
  this.constructor.superclass( gender );
  /*** end of new code ***/
}
/*** new code ***/
br.extend( Cat, Quadruped );
/*** end of new code ***/

Cat.prototype.speak = function() {
  alert("Meow!");
};

module.exports = Cat;
```

The first highlighted piece of code shows `Quadruped` being required. For more information on this see [modules](/docs/concepts/modules/).

The `this.constructor.superclass` is a reference to a helper property that Topiarist adds for convenience; it references the constructor of the class that is being inherited from with the `this` context bound to the current class. This makes it easy to call the super constructor and ensure any superclass properties are inherited and initialization code is executed.

`br.extend` is used to perform the inheritance and define that a `Cat` is a `Quadruped`.

In `Dog.js` we do exactly the same as we did for `Cat` with the exception of providing a different implementation of the `speak` function.

```js
var br = require( 'br/Core' );
var Quadruped = require( './Quadruped' );

function Dog( gender ) {
  this.constructor.superclass( gender );
}
br.extend( Dog, Quadruped );

Dog.prototype.speak = function() {
  alert("Woof!");
};

module.exports = Dog;
```

## Overriding Super-methods

By default, our cats and dogs all have four legs, a feature that they inherit – not unreasonably – from the Quadruped class. If we wanted to allow for the occasional three-legged dog we might encounter however, the following code would allow us to do this, whilst still being able to call the super-method, allowing normal dogs to retain their traditional allocation of legs.

```js
Dog.prototype.getLegCount = function() {
  if ( this.is3LeggedDog() ) {
    return 3;
  }
  /*** new code ***/
  return Quadruped.prototype.getLegCount.call(this);
  /*** new code ***/
};
```

The highlighted code above shows how a super-method is called using [call](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call), you could also use [apply](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply).

## Where next?

We've mentioned [Interfaces](/docs/concepts/interfaces/) so it's worth taking a look at the benefits that they provide in complex applications and how they relate to [services](/docs/concepts/services/). [Topiarist](https://github.com/BladeRunnerJS/topiarist) enables both classes and interfaces and we wrote up an [introductory blog post on Topiarist](http://bladerunnerjs.org/blog/topiarist/) that's worth taking a look at.
