---
layout: docs
title: Getting Started
permalink: /docs/use/getting_started/
---

<p><strong>This guide provides you with a basic overview of getting started with BladeRunnerJS (BRJS), including covering some of the core concepts.</strong></p>

This isn't your typical 2 minute getting started guide - it probably takes around 10 minutes. This is because BRJS is meant to help you build large-scale applications, so we need to go into a bit of detail in order to cover things like developing using Workbenches, cross-blade communication using the EventHub and services.

We'll follow convention to do this sort of thing - since following conventions are good - and we'll build a **Todo List**.

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

## The Todo Input Blade

First, let's create a Blade for capturing the Todo items.

### Scaffold the Blade

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

### View the Code

Within `todoinput/src` you'll find an `ExampleClass.js` file:

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

<div class="alert alert-info">
	<p>
		We plan to <a href="https://github.com/BladeRunnerJS/brjs/issues/6">give auto-generated files better names</a>.
	</p>
</div>

Above, `ExampleClass` is a View Model which is bound to a view. You'll notice that `ExampleClass` extends something called `PresentationModel`. This deals with binding data to the view. The view definition can be found in an HTML template in `resources/html/view.html`:

    <div id="brjstodo.todo.todoinput.view-template">
      <div class="hello-world-message" data-bind="text:message"></div>
      <button class="button" data-bind="click:buttonClicked">Log me</button>
    </div>

### Run the Blade in a Workbench

Now that you've seen the View Model class and the view template, let's launch a Workbench and see the Blade running.

Using the CLI run:

    unzip_location/sdk/brjs start

This will start the development web server running on localhost port 7070. You can navigate to the workbench via http://localhost:7070 or go directly to it via http://localhost:7070/brjs-todo/todo-bladeset/blades/todoinput/workbench/.

![](/docs/use/img/hello-world-workbench.png)

You'll notice that there's a **Visualise Presentation Model** Workbench Tool that shows a tree visualisation of the View Model. In there you'll see a simple `message:Hello World!` name and value. 

### Add Two-Way Data Binding

Next, let's edit the Blade to display in `input` element with a two-way binding between the View and View Model.

To do this we first need to update `ExampleClass.js` to handle the fact the view contains an input element. We do this by changing the `message` instance variable to be a `Field` object. When the button is clicked let's take the value of the message and log it.

    var br = require( 'br' );
    
    var Field = require( 'br/presenter/node/Field');
    var PresentationModel = require( 'br/presenter/PresentationModel' );
    
    function ExampleClass() {
      this.message = new Field( "Hello World!" );
    };
    br.extend(ExampleClass, PresentationModel);
    
    ExampleClass.prototype.buttonClicked = function() {
      console.log( this.message.value.getValue() );
    };

And we update `view.html` to contain an `input` element where the element's `value` property is bound to the message's value. And since we want instant two-way binding we also need to add `valueUpdate:'afterkeydown'` to the `data-bind` attribute. Finally, update the `Log me` text to say `Add`:

    <div id="brjstodo.todo.todoinput.view-template">
      <div><input type="text" class="hello-world-message" data-bind="value:message.value, valueUpdate:'afterkeydown'" /></div>
      <button class="button" data-bind="click:buttonClicked">Add</button>
    </div>

Now if you refresh your Workbench and change the value in the input element you'll instantly see the value updated in the Workbench Tool under *Presentation Model -> message -> value*. Clicking the button will now log the message that's been entered into the input.

![](/docs/use/img/hello-bladerunnerjs-workbench.png)

## Testing a Blade

**TODO**

## Create a Todo Items Blade

Create a second blade to show the Todo list items using the CLI:

    unzip_location/sdk/brjs create-blade brjs-todo todo todoitems

This will create all the same assets that were created for the first blade, but in a `todoitems` directory.

Open up the newly generated `ExampleClass.js` and edit it to have an instance variable called `items`. `items` should be a `NodeList` since it will contain a list of Todo list items, each of which should be a `DisplayItem`. Also, we don't need the `buttonClicked` handler so remove that:

    var br = require( 'br' );
    
    var NodeList = require( 'br/presenter/node/NodeList');
    var DisplayField = require( 'br/presenter/node/DisplayField' );
    
    function ExampleClass() {
      this.items = new NodeList( [ new DisplayField( 'foo' ), new DisplayField( 'bar' ) ] );	
    };
    
    br.extend( ExampleClass, PresentationModel );

* Update View HTML template
* View this in the Workbench
* Demonstrate communction between the blades via the EventHub
* Demonstrate interacting with a Blade via EventHub in a Workbench

## Create a service

* Do in-memory persistence stating that it could be swapped out for real persistence or LocalStorage

## Build and Deploy

* Simple deploy to local Tomcat. Note that flat-file deploy is a priority.

## Where next?