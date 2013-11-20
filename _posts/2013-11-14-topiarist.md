---
layout: post
title: "Topiarist: A JavaScript OO library featuring mixins, interfaces & multiple inheritance"
authors: [kybernetikos]
thumb: topiarist.gif

excerpt: Topiarist is a new javascript OO library featuring sandboxed mixins, excellent interface support and simple multiple inheritance. It adapts to fit your style of writing code and supports in both Node.js and browser environments.

---

## Introducing Topiarist

<div style="float: right; margin: 30px; margin-top: 0; text-align: center; color: #c7c7c7;" align="right">
  <img src="/blog/img/{{ page.thumb }}" alt="Our mate Darth undertaking some topiary" style="margin-bottom: 0; margin-top: 0;" /><br />
  <small>Original image source unknown</small>
</div>

There are a lot of libraries out there to help with inheritance in JavaScript, and in truth, for simple single or prototype inheritance, [Object.create](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FGlobal_Objects%2FObject%2Fcreate) goes a long way.

If you need more, many libraries include their own helper methods for Object Orientation.  This is not really surprising as any large endevour is likely to start to want to talk in terms of the commonality shared by a class of objects which is exactly what a traditional OO class is, and relying only on the javascript built-ins for doing class inheritance involves writing some fairly opaque boilerplate.

So jQuery has a simple [extend method](http://api.jquery.com/jQuery.extend/), Backbone provides an [extend method](http://backbonejs.org/#Model-extend) that properly sets up the prototype chain, [prototype](http://prototypejs.org/learn/class-inheritance.html) gives you a Class object that manages extension for you, [underscore](http://underscorejs.org/) provides some basic extension methods too.

If you're uncomfortable including a full framework or general library for just the OO behaviour, there are also many more focussed microlibraries.  [ringjs](http://ringjs.neoname.eu/) is interesting because it implements Python style inheritance (including Python style multiple inheritance). There are a  number of interesting libraries which add aspect oriented programming to the OO paradigm too, such as [dcljs](http://www.dcljs.org/).

Even with a broad consensus on how Classes are implemented, the way the code the end user writes looks varies a great deal between libraries.  We like our OO libraries to have a light touch - to remove some of the boilerplate, but not to lock you out of the normal JavaScript way of doing things.

One of the things we've found useful in building large systems that include code which needs to operate on objects provided by others is the concept of [interfaces](http://blog.caplin.com/2012/10/25/javascript-interfaces-putting-the-java-back-into-javascript/).  While many libraries do inheritance well few of them provide some of the features we like around interfaces ([qooxdoo](http://qooxdoo.org/) is an exception, however it does lock you in to its way of defining classes).

In order to do interfaces well, we built our own library, [topiarist](http://bladerunnerjs.github.io/topiarist/).  It also does inheritance, both single and multiple, and a sandboxed form of mixins which protect the state of the target class.  It also supports more than one common way of writing code that uses it, from the 'traditional' to a more domain specific language style, similar to that favoured by libraries such as Backbone.  I'll give examples of the different styles possible at the end of this article.


## Single Inheritance 

Javascript has support for single inheritance built into the language.  The prototype chain is a chain of inheritance and you can query the chain with the `instanceof` operator.

### topiarist.extends

Topiarist's `extend` method is an evolution of what I [favoured back in early 2007](http://kybernetikos.com/2007/02/07/inheritance-and-javascript/) when I first started thinking about how to do class inheritance in javascript.  It's also very similar to what most libraries (and languages that compile to JS such as TypeScript and CoffeeScript) have converged on.

    topiarist.extend(subclass, superclass);

Even so, Topiarist does have some nice features over doing it yourself with `Object.create`:

 * setting up the inheritance chain overwrites any modifications that have been made to the prototype. **Changing the inheritance chain after having added methods is almost always a programmer mistake**.  Topiarist will detect if you try to do this and throw an error.
 * it copies function properties over from the superclass.  This is the same behaviour that Backbone has, and it lets you **add useful things to your functions that will carry forward to their children too**.
 * a 'superclass' property is created on the subclass constructor which gives you a nice **shorthand for calling super methods**.
 * **the constructor property is set up on the prototype**, which means that (object instance).constructor returns the actual constructor function used rather than some parent of it.
 * if you prefer an object literal style of definition, you can also **pass an object containing definitions of properties you want added to the prototype**.

Most helpers for inheritance out there do something similar, which means that there's a good chance `topiarist.extend` will interoperate with whatever your other favourite library is.

## Interfaces - Duck Typing

An interface is a description of a shape that an object can have.

**Interfaces are a concept, so the fact that javascript doesn't have any native operators or keywords that support them doesn't mean that you don't have interfaces.  All of your objects have a shape and sometimes it's useful for objects of different sorts to share the same shape so they can be treated in the same way.**

Testing the shape of an object is often considered to be a 'non-javascripty' thing to do, but it can allow you to fail fast, and that can help you catch errors that you might otherwise have missed.

It's particularly useful to test for conformance to an interface when you're writing framework code that receives an object created by someone else and you want to be sure that the object you've been passed really does support all the relevant behaviour before continuing.

### topiarist.fulfills

Topiarist's `fulfills` method does a fairly standard [duck type](https://en.wikipedia.org/wiki/Duck_type) check. Given an object and another object describing the shape, it checks that the first object is the shape represented by the second.

    topiarist.fulfills(instance, interface);

As well as taking an object to test, it can either take a function where the desired shape is that of its prototype, or a description of the shape in the form of a map of names to one of the type constructors (Number/Function/Object/String/Boolean).

In the following (much simplified) example, a variable is initialised in one method, and at some point later, two methods, `foo` and `numberOfFoos` are called on it.  This is problematic, because the `thisWillBeCalledLater` might not be called very often, and it could easily be missed in tests.

    var obj = null;

    function setFooable(passedFooable) {
      obj = passedFooable;
    }

    function thisWillBeCalledLater() {
      obj.foo();
      return obj.numberOfFoos();
    }

To make this fail fast, you could do the check inside `setFooable`:

    var obj = null;

    function setFooable(passedFooable) {
      if (!passedFooable.foo) {
        throw new Error('passedFooable was not a real fooable');
      }
      if (!passedFooable.numberOfFoos) {
        throw new Error('passedFooable was not a real fooable');
      }
      obj = passedFooable;
    }

    function thisWillBeCalledLater() {
      obj.foo();
      return obj.numberOfFoos();
    }

This fails fast now, but it's getting ugly and the checking code might have to be repeated in numerous places. If what a `fooable` is ever needed to change, the places you'd have to update in the code are scattered throughout.

`toparist.fulfills` just refactors those checks into a single method, and provides a single definition of what a Fooable should look like.

    var FooableProtocol = {
      foo: Function,
      numberOfFoos: Function
    };

    var obj = null;

    function setFooable(passedFooable) {
      if (! topiarist.fulfills(passedFooable, FooableProtocol)) {
        throw new Error('passedFooable was not a real fooable');
      }
      obj = passedFooable;
    }

    function thisWillBeCalledLater() {
      obj.foo();
      return obj.numberOfFoos();
    }

You can also define `Fooable` more like a traditional javascript object definition, and then have JSdoc describing the contract associated with the interface since this style is more natural to document.

    function Fooable() {}

    /** jsdoc describing the contract of Fooable.foo */
    Fooable.prototype.foo = function() {};

    /** jsdoc describing the contract of Fooable.numberOfFoos */
    Fooable.prottoype.numberOfFoos = function() {};

### topiarist.classFulfills

`classFulfills` does the analogous operation to `fulfills`, but testing a class instead of an instance object.  The intention is that you can use this to see if the objects created by a particular constructor would match a particular shape.  Obviously javascript is dynamic, so it's always possible that someone has deleted the property or changed its type.  This is pretty rare so `classFulfills` is still useful, particularly in situations where you've received some configuration telling you to construct a class and you'd like to check that the class is of the right shape before construction.

    topiarist.classFulfills(class, interface);

## Interfaces - Semantic Intent

Usually you're interested in the shape of objects that have been passed to you, but it's also useful to be able to quickly check that an object you're defining has the shape you are intending it to.  That way you can get a fast failure with a useful message if you've missed something important rather than have to wait until some code actually tries to call it, which might happen for the first time when a customer is using the system rather than when you are.

### topiarist.implements

Once you've defined a class, you can say `topiarist.implements` to assert that the class you've defined fulfills a particular interface.  If your class is missing anything, topiarist will throw an Error detailing the missing or incorrect properties.

    topiarist.implements(class, interface);

### Contracts

The shape of an object does not entirely define its contract. For some objects the `makeHistory` method might build a history of recent events, for others it might attempt to take some action of historical significance, and yet other objects might expect an argument for something to destroy.

Calling `makeHistory` for something that had an entirely different understanding of what `makeHistory` means just because it happens to have the shape you're expecting could be disastrous.  That's why duck typing, which says that things of the same shape are the same, though usually right can go badly wrong.

Fortunately, we have a way of avoiding this kind of misunderstanding.  If a developer has called `topiarist.implements` to indicate that their object follows a particular interface, we can say that anything that implements that exact interface will have a consistent understanding of what the methods mean.  So everything that implements `BaseBallGame` will have one understanding of what the `steal` method does, and that could well be different to things implementing `CrownJewels`.

### topiarist.isA

Just as `fulfills` allows you to check the shape of an object, `isA` allows you to query what has been declared about the object.  It's therefore a way of finding out information that the developer has decided to publish about their semantic intentions for a piece of code.

`isA` returns true for instances and any of their ancestors, whether from single inheritance, interfaces, or multiple or mixin inheritance.  It will return `false` if no parent-child relationship has been declared, even if the shapes are the same.

    topiarist.isA(instance, parent);

The class equivalent is called `classIsA`.

    topiarist.classIsA(myClass, parent);

## Multiple Inheritance

On the one hand, OO languages are intended to model real objects, and real objects are typically part of more than one conceptual hierarchy, on the other hand allowing inheritance from more than one parent opens up the question of what you should do if there are name clashes.  If something is both a product and a missile, what does `launch` do?

Different systems have different answers to that question.  Some just say "well you're not allowed to do that", others just ignore the problem, while yet others accept the problem and just allow the developer to resolve it through specifying orders of parents.  Java takes an approach which is a mix of the two - it disallows multiple inheritance of behaviour, regardless of whether there is a conflict or not and pretends (incorrectly) that the problem doesn't exist for interfaces.

    public class Sidewinder implements Product, Missile {
      @Override
      public void launch() {
        // Are there explosions or press-releases after calling this method?
      }
    }

Topiarist is more consistent; whenever it can detect a possible conflict of semantics it will disallow the inheritance, but otherwise it will allow multiple inheritance of either behaviour or contract.

### topiarist.inherit

In javascript, multiple inheritance is usually achieved by copying functionality over from the parent and topiarist does this too.  It will however check to see if there is a semantic clash, and throw an error if there is.  It also records the fact that your class has inherited from a parent in order to allow `isA` queries to work against multiple inherited parents as well as interfaces and the single inheritance chain.

    topiarist.inherit(class, parent);

In order to make clear what I mean by 'a semantic clash', let me give you an example:

Class `Foo` has a method `foo`.  This means that the `foo` action has a meaning in the context of things of type `Foo`.  If `Bar` and `Baz` both inherit from `Foo` and neither overrides the `foo` action, and then finally `MyClass` multiple inherits from `Bar` and `Baz`, then there is no problem, because the `foo` action on `MyClass` has a single semantic meaning - it works by virtue of the fact that `MyClass` is a `Foo`, and the meaning of the `foo` method is the `Foo` meaning.

<div class="ticked"><img src="http://yuml.me/diagram/scruffy;dir:LR;/class/[Foo|+foo();],[Foo]^-[Bar],[Foo]^-[Baz],[MyClass],[Bar]^-[MyClass],[Baz]^-[MyClass]" /></div>

If `Bar` were to override `foo`, then there would still be no problem, because the `foo` method `MyClass` would inherit from `Bar` would be appropriate for it being a `Bar` and a `Foo`, and since `Baz` doesn't specify any behaviour different to that required by `Foo`, it's appropriate for `Baz` too.

<div class="ticked"><img src="http://yuml.me/diagram/scruffy;dir:LR;/class/[Foo|+foo();], [Foo]^-[Bar|+foo();], [Foo]^-[Baz], [MyClass], [Bar]^-[MyClass], [Baz]^-[MyClass]" /></div>

If `Bar` *and* `Baz` were to provide implementations of `foo`, then there would be a problem, because topiarist has no way of knowing if the `Bar` concept of 'foo' is applicable to Baz'es or if the `Baz` concept of 'foo' is applicable to Bars.  Topiary will detect this and throw an error if you try to inherit in this case.

<div class="crossed"><img src="http://yuml.me/diagram/scruffy;dir:LR;/class/[Foo|+foo();],[Foo]^-[Bar|+foo();],[Foo]^-[Baz|+foo();],[MyClass],[Bar]^-[MyClass],[Baz]^-[MyClass]" /></div>

### topiarist.mixin

Inheritance is almost always a little risky, since it usually involves some level of encapsulation-breaking, where the childs dependency on the parent is at a deeper level than the parents public API.  This provides opportunities for the childs state to clash with the parents state.

One way of avoiding this is to receive behaviour (I use the term 'inherit', but not everyone agrees that is the correct usage) from a mixin.  Mixins are intended as slices of functionality that can be added to a class, without any possibility of the state of the mixin clashing with the state of the receiving class.

Conceptually, inheriting from a mixin means adding the mixins behaviour to your class, whereas inheriting from a superclass means *specialising* the superclass.  

This concept has been implemented in a number of different ways in different places.  Topiarist considers a mixin to be a set of functionality that should not have access to the childs state.  A classic example of a mixin is an observer, or in common javascript usage, an emitter.

    function RadioShow() { }

    topiarist.mixin(RadioShow, Emitter);


This will add definitions for `.on`, `.trigger`, etc to `RadioShow`.  The key difference between this and the `topiarist.inherit` method described above is that these functions are sandboxed.  If your emitter uses a `this.listeners` array to store listeners added with `.on`, and your `RadioShow` class happens to use a property `this.listeners` to store the number of listeners the programme receives, the `Emitter` methods will continue to work.  In fact, while the mixin has access to its own state per object, it has no access to the state of the instance.  It can only call functions and affect state that it defines on the instance.

According to some people, it's not true to say in this case that `RadioShow` is-a `Emitter` because it mixes in the `Emitter` functionality, rather than specialising the `Emitter` concept, but since I can't imagine a situation where it would be useful for `isA` to return false in this case, toparist takes the pragmatic view that adding a mixin causes you to become an example of the thing you mixed in for the purpose of `isA` checks.


## A Question Of Style

### Setup

    // works in node or the browser
    var topiarist = (typeof require !== 'undefined' ? require('topiarist') : window['topiarist']);

### 'Traditional Style': 

    function Furry() {}
    Furry.prototype.stroke = function() {};
    
    function Animal() {}
    
    function Mammal() {
      Animal.call(this);  // remember to call superconstructors in your constructor.
    };
    topiarist.extend(Mammal, Animal);
    topiarist.mixin(Mammal, Furry);
    
    function Cat() {
      Mammal.call(this);
    };
    topiarist.extend(Cat, Mammal);
    
    var tabby  = new Cat();
    topiarist.isA(tabby, Cat); // true
    topiarist.isA(tabby, Mammal); // true
    topiarist.isA(tabby, Furry); // true
  
    // there is also a topiarist.export, which will copy these methods to the global 
    // object if you want, so you can use isA/extend/mixin directly.

### DSL Style

To use the DSL style, you can call `install` which will add some nonenumerable extra methods to the `Function` and `Object` prototype.  While this would be a questionable thing for a library to do automatically, it's a perfectly valid thing for an application to do.
  
    topiarist.install();
    
    function Mammal() {
      Animal.call(this);
    }
    Mammal.extends(Animal);
    Mammal.mixin(Furry);
    
    function SomeInterface() {}
    
    function Cat() {
      Mammal.call(this);
    }
    Cat.extends(Mammal);
    Cat.implements(SomeInterface);;
    
    var tabby = new Cat();  
    tabby.isA(Cat); // true
    tabby.isA(Mammal); // true

### Base Class Style

If you want most of the benefits of calling `topiarist.install` without altering builtins, you can instead extend the `topiarist.Base` class to create your classes.  This has the benefit that if you do not provide a constructor, it will automatically call the superconstructor.  If you do provide a constructor, you should still call your superconstructor.  This style is very similar to how you extend backbone classes.

    // if you don't provide a constructor, the superconstructor will be automaticaly called.
    var Animal = topiarist.Base.extend();
    var Furry = topiarist.Base.extend({
      stroke: function() {}
    });
    var Mammal = Animal.extend();
    Mammal.mixin(Furry);
    var Cat = Mammal.extend();

## Getting It

Topiarist is available to download from [github](http://bladerunnerjs.github.io/topiarist/) and as `topiarist` on npm or bower.
