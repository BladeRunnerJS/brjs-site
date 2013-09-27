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

    module.exports = ExampleClass;

<div class="alert alert-info">
  <ul>
    <li>The above code represents how we want to be able to write our JavaScript classes. We are adding <a href="https://github.com/BladeRunnerJS/brjs/issues/11">full support for Node.js module style code</a> as a priority.</li>
    <li>We plan to <a href="https://github.com/BladeRunnerJS/brjs/issues/6">give auto-generated files better names</a></li>
  </ul>
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

    module.exports = ExampleClass;

And we update `view.html` to contain an `input` element where the element's `value` property is bound to the message's value. And since we want instant two-way binding we also need to add `valueUpdate:'afterkeydown'` to the `data-bind` attribute. Finally, update the `Log me` text to say `Add`:

    <div id="brjstodo.todo.todoinput.view-template">
      <div>
        <input type="text" class="hello-world-message" data-bind="value:message.value, valueUpdate:'afterkeydown'" />
      </div>
      <button class="button" data-bind="click:buttonClicked">Add</button>
    </div>

Now if you refresh your Workbench and change the value in the input element you'll instantly see the value updated in the Workbench Tool under *Presentation Model -> message -> value*. Clicking the button will now log the message that's been entered into the input.

![](/docs/use/img/hello-bladerunnerjs-workbench.png)

## Testing a Blade

A core concept with BRJS is building a JavaScript application that scales. One of the best ways to ensure that an application is maintainable is to make sure that it's well tested. So, let's write a test - By default BRJS uses [JsTestDriver](JsTestDriver).

<div class="alert alert-info">
  <p>
    Part of our plugin architecture will eventually <a href="https://github.com/BladeRunnerJS/brjs/issues/8">support additional unit test runners</a>.
  </p>
</div>

### Write the Test

When you scaffold a new Blade a test class is also created. The scaffolded test can be found in `todoinput/tests/test-unit/js-test-driver/tests\ExampleClassTest.js`:

    ExampleClassTest = TestCase("ExampleClassTest");
        
    ExampleClassTest.prototype.testSomething = function()
    {
      assertEquals(1, 1);
    };

The simplest test we can write at the moment is to check that the `message` field is initialized with a value of `Hello World!`.

    ExampleClassTest = TestCase("ExampleClassTest");

    var ExampleClass = require( 'brjs-todo/todo/todoinput/ExampleClass' );
        
    ExampleClassTest.prototype.testMessageFieldIsInitialized = function()
    {
      var todoInputBlade = new ExampleClass();

      assertEquals( 'Hello World!', todoInputBlade.message.value.getValue() );
    };

### Run the Test

There are a few ways to run the tests using JsTestDriver, but the simplest is probably to start the test server using the CLI:

    unzip_location/sdk/brjs test-server

The test server will then continue running in the terminal/console that you started it in.

Then in the web browser (or browsers) you wish to execute the tests in navigate to `http://localhost:4224/capture?strict`. This browser is now waiting for the test server to instruct it to run tests. You do this by opening up another terminal/console tab/window and executing `unzip_location/sdk/brjs test path_to_directory_to_scan_for_tests`. In our case we just want to run the `todoinput` tests. So, assuming we're in the `unzip_location/sdk/` directory the command would be:

    ./brjs test ../apps/brjs-todo/todo-bladeset/blades/todoinput/

If all goes well you should see some output similar to the following:

    BladeRunner version: BRJS-dev, built: 26 September 2013

    Server already running, not bothering to start a new instance...

    Testing tests (UTs):
    WARN: SLF4J: Failed to load class "org.slf4j.impl.StaticLoggerBinder".
    WARN: SLF4J: Defaulting to no-operation (NOP) logger implementation
    WARN: SLF4J: See http://www.slf4j.org/codes.html#StaticLoggerBinder for further details.
    WARN: Sep 27, 2013 9:53:42 AM org.apache.bval.jsr303.ConstraintDefaults loadDefaultConstraints
    WARN: WARNING: Cannot find org/apache/bval/jsr303/DefaultConstraints.properties
    Chrome: Reset
    Chrome: Reset
    Chrome 29.0.1547.76 Mac OS loaded /test/bundles/js/js.bundle
    Chrome 29.0.1547.76 Mac OS loaded /test/tests/ExampleClassTest.js
    Chrome 29.0.1547.76 Mac OS [PASSED] ExampleClassTest.testMessageFieldIsInitialized
    Total 1 tests (Passed: 1; Fails: 0; Errors: 0) (2.00 ms)
      Chrome 29.0.1547.76 Mac OS: Run 1 tests (Passed: 1; Fails: 0; Errors 0) (2.00 ms)
    Tests Passed.

If you wanted to run all the tests for the application you would execute:

    ./brjs test ../apps/brjs-todo

We've now created our first Blade, seen it running in a Workbench and written a simple test to check the View Model initialized state. It's time to create our second Blade.

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

Next we need to update the View HTML template to loop over the `items` and display each one in a list. Since Presenter is built on KnockoutJS we can do this using the [`foreach`](http://knockoutjs.com/documentation/foreach-binding.html) binding:

    <div id="brjstodo.todo.todoitems.view-template">
      <ul class="todo-list" data-bind="foreach:items">
        <li data-bind="text:value"></li>
      </ul>
    </div>

If you launch the Workbench for this blade via `http://localhost:7070/brjs-todo/todo-bladeset/blades/todoitems/workbench/` you'll see the two hard-coded list items.

![](/docs/use/img/todo-items-workbench.png)

## Inter-Blade communication using the EventHub

We now have a way for a user to input a todo list item and a place to show the items. But, how do we get the Blades to communicate with each other? One way of doing this is to use the [EventHub](/docs/concepts/event_hub), which is a [service](/docs/concepts/services) provided in all BRJS apps.

<div class="alert alert-info">
  <p>
    The <a href="https://github.com/BladeRunnerJS/brjs/issues/10">EventHub isn't a default application service</a> right now. This is a priority feature.
  </p>
</div>

### Update the Todo Input Blade

Back in our `todoinput` Blade we can access the EventHub service using the [ServiceRegistry](/docs/concepts/service_registry) as shown in the `ExampleClass` constructor below:

    var br = require( 'br' );
    
    var Field = require( 'br/presenter/node/Field');
    var PresentationModel = require( 'br/presenter/PresentationModel' );

    var ServiceRegistry = require( 'br/ServiceRegistry' );
    
    function ExampleClass() {
      this.message = new Field( "Hello World!" );

      this.eventHub = ServiceRegistry.getService( 'event-hub' );
    };
    br.extend(ExampleClass, PresentationModel);
    
    ExampleClass.prototype.buttonClicked = function() {
      console.log( this.message.value.getValue() );
    };

    module.exports = ExampleClass;

Now, in the `buttonClicked` function we can trigger an event to tell any interested parties (the `todoitems` Blade) that a new Todo list item has been input, and the user has indicated they want to add it. We can also clear down the `input` element value.

    var br = require( 'br' );
    
    var Field = require( 'br/presenter/node/Field');
    var PresentationModel = require( 'br/presenter/PresentationModel' );

    var ServiceRegistry = require( 'br/ServiceRegistry' );
    
    function ExampleClass() {
      this.message = new Field( "Hello World!" );

      this.eventHub = ServiceRegistry.getService( 'event-hub' );
    };
    br.extend(ExampleClass, PresentationModel);
    
    ExampleClass.prototype.buttonClicked = function() {
      var todoText = this.message.value.getValue();
      console.log( todoText );

      // TODO: validate

      this.eventHub.trigger( 'todo-added', { text: todoText } );
      this.message.value.setValue( '' );
    };

    module.exports = ExampleClass;

Before we update the `todoitems` Blade to listen for this event, let's see how services make it really easy to test our blades.

#### Testing in the Workbench

Ensure the BRJS server is running (`unzip_location/sdk/brjs start`) and open up the `todoinput` Workbench via `http://localhost:7070/brjs-todo/todo-bladeset/blades/todoinput/workbench/`. In the JavaScript console enter the following:

    var sr = require( 'br/ServiceRegistry' ); // get the ServiceRegistry
    sr.deregisterService( 'event-hub' ); // deregister the normal EventHub
    var fakeEventHub = { // fake event hub which logs the arguments to the console
      trigger: function() {
        console.log('triggered: ', arguments );
      }
    };
    sr.registerService( 'event-hub', fakeEventHub );

This removes the application registered EventHub and registers a fake (stub) one that simply logs any calls to `trigger` to the console.

Now, in the Workbench click the `Add` button and we can verify both that the `input` value is cleared down and check the event name and data that is being sent via the EventHub in the console.

![](/docs/use/img/hacking-in-the-workbench.png)

#### Testing via a Unit Test

Because we've introduced using the ServiceRegistry to our tests we should add a JsTestDriver `setUp` function to `todoinput/tests/test-unit/js-test-driver/tests/ExampleClassTest.js`. This creates a `fakeEventHub` to capture any calls to `trigger` that may be made. We then deregister any existing services with the `event-hub` identifier and then register our fake event hub. The `fakeEventHub` variable has a scope so that it's accessible to the new test (the first test doesn't need to be udpated):

    var fakeEventHub;

    ExampleClassTest.prototype.setUp = function() {
      // Stub out a fake EventHub
      fakeEventHub = {
        trigger: function( eventName, data ) {
          this.eventName = eventName;
          this.data = data;
        }
      };

      var sr = require( 'br/ServiceRegistry' );

      // ensure there isn't already an event-hub registered
      sr.deregisterService( 'event-hub' );

      // Register the fake event hub
      sr.registerService( 'event-hub', fakeEventHub );
    };

Now add the new test to ensure that when the `buttonClicked` function is executed (which will normally be called via the user clicking the `Add` button) that an event is triggered on the Event Hub.

    ExampleClassTest.prototype.testButtonClickedTriggersEventOnEventHub = function() {

      // Initialize
      var testTodoText = 'write some code and test it';
      var todoInputBlade = new brjstodo.todo.todoinput.ExampleClass();
      todoInputBlade.message.value.setValue( testTodoText );

      // Execute test
      todoInputBlade.buttonClicked();

      // Verify
      assertEquals( 'todo-added', fakeEventHub.eventName );
      assertEquals( testTodoText, fakeEventHub.data.text );
    };

The test initializes the `todoinput` Blade, sets a Todo text value we expect to be present within the event data, calls the `buttonClicked` function and verifies that the expected event name and data values are triggered on the EventHub.

Now that the test is written ensure the test server is running (`unzip_location/sdk/brjs test-server`) and execute the `todoinput` tests:

    ./brjs test todo-bladeset/blades/todoinput/

You should see confirmation that the tests pass:

    Chrome 29.0.1547.76 Mac OS [PASSED] ExampleClassTest.testMessageFieldIsInitialized
    Chrome 29.0.1547.76 Mac OS [PASSED] ExampleClassTest.testButtonClickedTriggersEventOnEventHub
    Total 2 tests (Passed: 2; Fails: 0; Errors: 0) (5.00 ms)
      Chrome 29.0.1547.76 Mac OS: Run 2 tests (Passed: 2; Fails: 0; Errors 0) (5.00 ms)
    Tests Passed.

    - Time Taken: 2secs

### Update the Todo Items Blade

Now the `todoinput` Blade is triggering a `todo-added` event on the EventHub, the `todoitems` Blade should be updated to listen for that event and update the UI accordinly.

First, get access to the ServiceRegistry and then register for the event:

    var br = require( 'br' );
    
    var PresentationModel = require( 'br/presenter/PresentationModel' );

    var ServiceRegistry = require( 'br/ServiceRegistry' );
  
    function ExampleClass() {
      this.items = new caplin.presenter.node.NodeList( [ new DisplayField( "foo" ), new DisplayField( "bar" ) ] );
  
      this.eventHub = ServiceRegistry.getService( 'event-hub' );
      this.eventHub.on( 'todo-added', this._todoAdded, this );
    };
    br.extend( ExampleClass, PresentationModel );

    ExampleClass.prototype._todoAdded = function( item ) {
      // TODO: update this.items
    };

In the code above we listen for `todo-added` events that are triggered on the EventHub. And whenever those events are triggered the `todoAdded` instance function is called. We ensure the `this` context is maintained by passing in `this` as the third parameter to the `eventHub.on` function.

Now that the object is informed whenever a new Todo item is added, we can update the View Model.

**TODO**

## Build and Deploy

**TODO: Simple deploy to local Tomcat. Note that flat-file deploy is a priority.**

## Where next?

**TODO**