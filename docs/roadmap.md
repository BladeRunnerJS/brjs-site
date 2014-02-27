---
layout: docs
title: Roadmap to BRJS 1.0
permalink: /docs/roadmap/
notice: none
---

We hope to have the following in place before Christmas 2013.

### ~~[In-built EventHub](https://github.com/BladeRunnerJS/brjs/issues/10)~~

A key part of building a scalable application is loosely coupled communication between application components. We had an event hub, but took it out as it was a bit too complicated for general use cases. We want to add this key concept back in.

### ~~[Node.js style client-side code](https://github.com/BladeRunnerJS/brjs/issues/11)~~

We don't like the way we currently need to write our JavaScript. We like the Node.js coding style and moduling system. So, we're adding support for it within BRJS applications.

So, an `ExampleClass.js` will look like this:

    var br = require( 'br' );

    var Property = require( 'br/presenter/Property');
    var PresentationModel = require( 'br/presenter/PresentationModel' );

    function ExampleClass() {
      this.message = new Property( "Hello World!" );
    };
    br.extend(ExampleClass, PresentationModel);

    ExampleClass.prototype.buttonClicked = function() {
      console.log( 'button clicked' );
    };

### ~~[Improved Debugging Experience](https://github.com/BladeRunnerJS/brjs/issues/46)~~

BRJS presently generates very large bundled JavaScript files which an make debugging difficult. We need to create a way of improving that essential debug workflow.

### [Simplified Directory Structure](https://github.com/BladeRunnerJS/brjs/issues/19)

BRJS originally borrowed a lot from Java; the directory structure was one of those things. We've realised that this adds unnecessary complexity to folder structure so we're going to fix this and go with a much simpler, flatter directory structure.

### [Make BladeSets Optional](https://github.com/BladeRunnerJS/brjs/issues/2)

[BladeSets](http://bladerunnerjs.org/docs/concepts/bladesets) can be a very useful BRJS feature. But you *may* not actually need them, especially when you first start building your application.

### [Make Aspects Optional](https://github.com/BladeRunnerJS/brjs/issues/17)

As with BladeSets, [Aspects](http://bladerunnerjs.org/docs/concepts/aspects) are a really powerful feature. But you may not always need multiple aspects into your application. So we're going to make Aspects optional.

### [Flat File Deployment](https://github.com/BladeRunnerJS/brjs/issues/18)

The original requirement for BRJS was to be able to create deployable WAR files. This is very restrictive so we're going to add Flat File deployment.

### [Global Install](https://github.com/BladeRunnerJS/brjs/issues/1)

For legacy reasons, applications presently have to be located in a set directory within the BRJS install directory. We know this is a pain so we're going to provide a solution that enables a BRJS global install, allowing for your applications to be located anywhere on disk.
