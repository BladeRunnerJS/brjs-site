---
layout: docs
title: Getting Started
permalink: /docs/use/getting_started/
---

<p><strong>This guide provides you with a basic overview of getting started with BladeRunnerJS (BRJS), including covering some of the core concepts.</strong></p>

This isn't your typical 2 minute getting started guide - it probably takes around 10 minutes. This is because BRJS is meant to help you build large-scale applications, so we need to go into a bit of detail in order to cover things like developing using Workbenches, cross-blade communication using the EventHub and services.

It'll be 10 minutes well-spent.

## Prerequisites

In order to run BRJS you'll need [JRE 7](http://www.oracle.com/technetwork/java/javase/downloads/java-se-jre-7-download-432155.html) installed.

## Download & Install BRJS

Download the [latest BRJS](#TODO) release and unzip it somewhere. The BRJS CLI excutable is `unzip_location/sdk/brjs`.

<div class="alert alert-info">
	<p>
		We're working towards a <a href="https://github.com/BladeRunnerJS/brjs/issues/1">global install</a>. For the moment you'll need to execute the <code>brjs</code> command via <code>unzip_location/sdk/brjs</code>.
	</p>
</div>

## Create an Application

Create a new application using the CLI:

    unzip_location/sdk/brjs create-app brjs-todo

This will create a new application called `brjs-todo` within the `unzip_location/apps` directory. Within that directory you'll also find a `default-aspect` directory. [Aspects](/docs/concepts/aspects/) represent entry points to your application and are a way of bringing together the Blades required for a specific *presentation* of your app.

<div class="alert alert-info">
	<p>
		BRJS apps presently have to reside within an `apps` folder in the unzip directory. Future releases will allow for <a href="https://github.com/BladeRunnerJS/brjs/issues/1">apps to be located anywhere on disk</a>.
	</p>
</div>

In there you'll find an `index.html` entry point along with a `src` directory for your JavaScript, a `themes` directory for your CSS and images, and a `resources` directory for everything else.

## Create a BladeSet

Create a new <a href="/docs/concepts/bladesets/">BladeSet</a> within the application using the CLI:

    unzip_location/sdk/brjs create-bladeset brjs-todo todo

This creates a folder called `todo-bladeset` within the application. For now we don't need to worry about BladeSets. All you need to know right now is that within the BladeSet directory there's a `blades` directory where we're going to create our blades - our functionality.

<div class="alert alert-info">
	<p>
		In future:
	</p>
	<ul>
		<li><a href="https://github.com/BladeRunnerJS/brjs/issues/2">BladeSets will be optional</a>. Right now a Blade must reside within a BladeSet</li>
		<li><a href="https://github.com/BladeRunnerJS/brjs/issues/1">The CLI will be context-aware</a> so you can run <code>brjs create-bladeset</code> from within an application directory to create a BladeSet for an app.</li>
	</ul>
</div>

Now we can create our first Blade and start developing.

## Develop a Blade

Create a new blade using the CLI:

    unzip_location/sdk/brjs create-blade brjs-todo todo todoinput

This creates a `todoinput` directory containing the following sub-directories:

* `src` - for the JavaScript for the Blade
* `tests` - for the blade tests
* `themes` - for CSS and images
* `workbench` - for the [Workbench](/docs/concepts/workbenches) for the Blade we're developing
* `resources` - for everything else

<div class="alert alert-info">
	<p>
		In future:
	</p>
	<ul>
		<li><a href="https://github.com/BladeRunnerJS/brjs/issues/3">A default blade will be created when an application is created</a></li>
		<li>The <a href="https://github.com/BladeRunnerJS/brjs/issues/1">CLI will be context aware</a> so you can run <code>brjs blade:create</code> from within an application directory to create a blade for an app.</li>
	</ul>
</div>

Within `todoinput/src` you'll find an `ExampleClass.js` file:

    var br = require( 'br' );
    
    var Property = require( 'br/presenter/Property');
    var PresentationModel = require( 'br/presenter/PresentationModel' );
    
    function ExampleClass() {
      this.message = new Property("Hello World!" );
    };
    br.extend(ExampleClass, PresentationModel);
    
    ExampleClass.prototype.buttonClicked = function() {
      console.log( 'button clicked' );
    };

Above, `ExampleClass` is a View Model which is bound to a view. You'll notice that `ExampleClass` extends `PresentationModel`. This deals with binding to the view. The view definition can be found in an HTML template in `resources/html/view.html`:

    <div id="brjstodo.todo.todoinput.view-template">
      <div class="hello-world-message" data-bind="text:message"></div>
      <button class="button" data-bind="click:buttonClicked">Log me</button>
    </div>

Now that you've seen the View Model class and the view, let's launch a Workbench and see the Blade running.

Using the CLI run:

    unzip_location/sdk/brjs start

This will start the development web server running on localhost port 7070. You can navigate to the workbench via http://localhost:7070 or go directly to it via http://localhost:7070/dashboard/#apps/brjs-todo/todo/todoinput/workbench.

![](/docs/use/img/hello-world-workbench.png)

**TODO: this should show the debug console logging rather than the "messages" log**

* Edit the Blade code and see the change in the workbench
* Test the Blade

## Create a second Blade

* Demonstrate communction between the blades via the EventHub
* Demonstrate interacting with a Blade via EventHub in a Workbench

## Create a service

* Do in-memory persistence stating that it could be swapped out for real persistence or LocalStorage

## Build and Deploy

* Simple deploy to local Tomcat. Note that flat-file deploy is a priority.

## Where next?