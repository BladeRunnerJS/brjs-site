---
layout: docs
title: Getting Started
permalink: /docs/use/getting_started/
---

<p><strong>This guide provides you with a basic overview of getting started with BladeRunnerJS (BRJS), including covering some of the core concepts.</strong></p>

This isn't your typical 2 minute getting started guide - it probably takes around 10 minutes. This is because BRJS helps you build large-scale applications, so we need to go into a bit of detail in order to cover things like developing using Workbenches, cross-blade communication using the EventHub and services.

We'll follow convention to do this sort of thing - since following conventions are good - and we'll build a **Todo List**.

It'll be 10 minutes well-spent.

## Prerequisites

In order to run BRJS you'll need [JRE 7](http://www.oracle.com/technetwork/java/javase/downloads/java-se-jre-7-download-432155.html) installed.

## Download & Install the BRJS

Download the [BRJS Getting Started build](#TODO) and unzip it somewhere.

<div class="alert alert-info">
  <p>
    We're working towards a <a href="https://github.com/BladeRunnerJS/brjs/issues/1">global install</a>. For the moment you'll need to execute the <code>brjs</code> command via <code>unzip_location/sdk/brjs</code>.
  </p>
</div>

This build contains a "Getting Started" application that is the starting point for this guide. It also contains the BRJS CLI excutable: `unzip_location/sdk/brjs`.

## Getting Started App Overview

The Getting Started app is located within the `unzip_location/apps/brjs-todo` directory and has some basic structure in-place.

<div class="alert alert-info github">
  <p>
    BRJS apps presently have to reside within an `apps` folder in the unzip directory. Future releases will allow for <a href="https://github.com/BladeRunnerJS/brjs/issues/1">apps to be located anywhere on disk</a>.
  </p>
</div>

The It contains an Aspect called `default-aspect`. [Aspects](/docs/concepts/aspects/) represent entry points to your application and are a way of bringing together the Blades required for a specific *presentation* of your app. In the aspect directory you'll find an `index.html` entry point along with a `src` directory for your JavaScript, a `themes` directory for your CSS and images, and a `resources` directory for everything else.

<div class="alert alert-info">
  <p>
    <a href="https://github.com/BladeRunnerJS/brjs/issues/17">Aspects will be optional</a> optional.
  </p>
</div>

The getting started app also contains a BladeSet called `todo-bladeset`. [BladeSets](/docs/concepts/bladesets) provide a way of grouping related blades so that they can share common code or resources. For now we don't need to worry about BladeSets. All you need to know right now is that within the BladeSet directory there's a `blades` directory where we're going to create our blades - our functionality.

<div class="alert alert-info">
  <p>
    <a href="https://github.com/BladeRunnerJS/brjs/issues/2">BladeSets will be optional</a>.
  </p>
</div>

Now we can create our first Blade and start developing our Todo List app.

## The Todo Input Blade

First, let's create a Blade for capturing the Todo items.

### Scaffold the Blade

Create a new blade using the CLI:

    $ unzip_location/sdk/brjs create-blade brjs-todo todo todoinput

This creates a `todoinput` directory within the `todo` BladeSet containing the following sub-directories:

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
    <li>The <a href="https://github.com/BladeRunnerJS/brjs/issues/1">CLI will be context aware</a> so you can run <code>brjs create-blade</code> from within an application directory to create a blade for an app; you won't need to supply an app name, app namespace and BladeSet name</li>
  </ul>
</div>

### View the Code

Within `apps/todo-bladeset/blades/todoinput/src/bjrstodo/todo/todoinputtodoinput/src` you'll find an `ExampleClass.js` file.

<div class="alert alert-info">
  <p>Yeah, this folder structure is crazy! We're working on a <a href="https://github.com/BladeRunnerJS/brjs/issues/19">simplified directory structure</a></p>
</div>

Open up `ExampleClass.js` (ignoring the existing default Blade template code) and replace it with the following:

    caplin.thirdparty( 'caplin-br' );

    ( function() {

      var br = require( 'br' );

      function ExampleClass() {
        this.message = new br.presenter.property.Property( "Hello World!" );
      };
      br.extend( ExampleClass, br.presenter.PresentationModel );

      ExampleClass.prototype.buttonClicked = function() {
        console.log( 'button clicked' );
      }

      brjstodo.todo.todoinput.ExampleClass = ExampleClass;

    } )();

<div class="alert alert-info">
  <ul>
    <li>We know the JavaScript coding style (the closure, large namespaces etc.) needs to be improved so we are working towards adding <a href="https://github.com/BladeRunnerJS/brjs/issues/11">full support for Node.js module style code</a> as a priority.</li>
    <li>We plan to <a href="https://github.com/BladeRunnerJS/brjs/issues/6">give auto-generated files and classes better names</a></li>
  </ul>
</div>

Above, `ExampleClass` is a View Model which is bound to a view. You'll notice that it extends something called `PresentationModel`. This deals with binding data to the view using the [Presenter](/docs/concepts/presenter) library that we've built on top of [Knockout](http://knockoutjs.com/). The view definition can be found in an HTML template in `todoinput/resources/html/view.html`:

    <div id="brjstodo.todo.todoinput.view-template">
      <div class="hello-world-message" data-bind="text:message"></div>
      <button class="button" data-bind="click:buttonClicked">Log me</button>
    </div>

The template markup indicates that the text of the `div` element will get the value of the View Model's `message` property (`data-bind="text:message"`)  and that the `buttonClick` View Model function will be called when the `button` is clicked (`data-bind="click:buttonClicked"`).

### Run the Blade in a Workbench

Now that you've seen the View Model class and the view template, let's launch a Workbench and see the Blade running.

Using the CLI run:

    $ unzip_location/sdk/brjs start

This will start the development web server running on localhost port 7070. You can navigate to the workbench via `http://localhost:7070` or go directly to it via `http://localhost:7070/brjs-todo/todo-bladeset/blades/todoinput/workbench/`.

![](/docs/use/img/hello-world-workbench.png)

You'll notice that there's a **Visualise Presentation Model** Workbench Tool that shows a tree visualisation of the View Model. In there you'll see a simple `message:Hello World!` name and value.

If you click the `Log me` button the `buttonClicked` function is called and `button clicked` will be logged to the JavaScript console.

### Add Two-Way Data Binding

Next, let's edit the Blade to display in `input` element with a two-way binding between the View and View Model.

To do this we first need to update `ExampleClass.js` to handle the fact the view contains an input element. We do this by changing the `message` instance variable to be a `Field` object. When the button is clicked let's take the value of the message and log it.

    caplin.thirdparty( 'caplin-br' );

    ( function() {

      var br = require( 'br' );

      function ExampleClass() {
        this.message = new br.presenter.node.Field( "Hello World!" );
      };
      br.extend( ExampleClass, br.presenter.PresentationModel );

      ExampleClass.prototype.buttonClicked = function() {
        var todoText = this.message.value.getValue();
        console.log( todoText );
      }

      brjstodo.todo.todoinput.ExampleClass = ExampleClass;

    } )();

We also update `view.html` to contain an `input` element where the element's `value` property is still bound to the message's value. And since we want instant two-way binding we also need to add `valueUpdate:'afterkeydown'` to the `data-bind` attribute. Finally, update the `Log me` text to say `Add`:

    <div id="brjstodo.todo.todoinput.view-template">
      <div>
        <input type="text" class="hello-world-message" data-bind="value:message.value, valueUpdate:'afterkeydown'" />
      </div>
      <button class="button" data-bind="click:buttonClicked">Add</button>
    </div>

Now if you refresh your Workbench and change the value in the input element you'll instantly see the value updated in the Workbench Tool under *Presentation Model -> message -> value*. Clicking the button will now log the message that's been entered into the input.

![](/docs/use/img/hello-bladerunnerjs-workbench.png)

## Testing a Blade

A core concept with BRJS is building a JavaScript application that scales. One of the best ways to ensure that an application scales is to ensure it is maintainable via thorough testing. So, let's write a test - by default BRJS uses [JsTestDriver](JsTestDriver).

<div class="alert alert-info">
  <p>
    Part of our plugin architecture will eventually <a href="https://github.com/BladeRunnerJS/brjs/issues/8">support additional unit test runners</a>.
  </p>
</div>

### Write the Test

When you scaffold a new Blade a test class is also created. The scaffolded test can be found in `todoinput/tests/test-unit/js-test-driver/tests/ExampleClassTest.js`:

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

    $ ./brjs test ../apps/brjs-todo/todo-bladeset/blades/todoinput/

If all goes well you should see some output similar to the following:

    BladeRunner version: BRJS-dev, built: 26 September 2013

    Server already running, not bothering to start a new instance...

    Testing tests (UTs):
    Chrome: Reset
    Chrome: Reset
    Chrome 29.0.1547.76 Mac OS loaded /test/bundles/js/js.bundle
    Chrome 29.0.1547.76 Mac OS loaded /test/tests/ExampleClassTest.js
    Chrome 29.0.1547.76 Mac OS [PASSED] ExampleClassTest.testMessageFieldIsInitialized
    Total 1 tests (Passed: 1; Fails: 0; Errors: 0) (2.00 ms)
      Chrome 29.0.1547.76 Mac OS: Run 1 tests (Passed: 1; Fails: 0; Errors 0) (2.00 ms)
    Tests Passed.

If you wanted to run all the tests for the application you would execute:

    $ ./brjs test ../apps/brjs-todo

We've now created our first Blade, seen it running in a Workbench, updated the Blade and seen the change in the Workbench, and written a simple test to check the View Model initialized state. It's time to create our second Blade.

## Create a Todo Items Blade

Create a second blade to show the Todo list items. As with the first Blade, we do this using the CLI:

    $ unzip_location/sdk/brjs create-blade brjs-todo todo todoitems

This will create all the same assets that were created for the first blade, but in a `todoitems` directory.

Open up the newly generated `ExampleClass.js` and update the JavaScript as follows:

    caplin.thirdparty("caplin-br");

    ( function() {

      var br = require( 'br' );

      function ExampleClass() {
        var DisplayField = br.presenter.node.DisplayField;
        var NodeList = br.presenter.node.NodeList;
        this.items = new NodeList( [ new DisplayField( "foo" ), new DisplayField( "bar" ) ] );
      };
      br.extend( ExampleClass, br.presenter.PresentationModel );

      brjstodo.todo.todoitems.ExampleClass = ExampleClass;

    } )();

The class has a member variable called `items` that is an instance of a `NodeList`. This list object will contain a list of Todo list items, each of which should be a `DisplayItem`.

Next we need to update the View HTML template to loop over the `items` list and display each one in an unordered list. Since Presenter is built on Knockout we can do this using the [`foreach`](http://knockoutjs.com/documentation/foreach-binding.html) binding:

    <div id="brjstodo.todo.todoitems.view-template">
      <ul class="todo-list" data-bind="foreach:items">
        <li data-bind="text:value"></li>
      </ul>
    </div>

If you launch the Workbench for this blade via `http://localhost:7070/brjs-todo/todo-bladeset/blades/todoitems/workbench/` you'll see the two hard-coded list items.

![](/docs/use/img/todo-items-workbench.png)

## Inter-Blade communication using an EventHub

We now have a way for a user to input a todo list item and a place to show the items. But, how do we get the Blades to communicate with each other, so that when an item is added in one blade it is shown on the other? One way of doing this is to use an [EventHub](/docs/concepts/event_hub). BRJS doesn't have this default service right now, but the getting started application comes with a `demo-event-hub` [service](/docs/concepts/services) which is fine for the purposes of this guide.

<div class="alert alert-info">
  <p>
    The <a href="https://github.com/BladeRunnerJS/brjs/issues/10">EventHub isn't a default application service</a> right now. This is a priority feature.
  </p>
</div>

### Update the Todo Input Blade

Back in our `todoinput` Blade we can access the EventHub service using the [ServiceRegistry](/docs/concepts/service_registry) as shown in the `ExampleClass` constructor below:

    caplin.thirdparty( 'caplin-br' );

    ( function() {

      var br = require( 'br' );
      var ServiceRegistry = require( 'br/ServiceRegistry' );

      function ExampleClass() {
        this.message = new br.presenter.node.Field( "Hello World!" );
        this.eventHub = ServiceRegistry.getService( 'demo-event-hub' );
      };
      br.extend( ExampleClass, br.presenter.PresentationModel );

      ExampleClass.prototype.buttonClicked = function() {
        var todoText = this.message.value.getValue();
        console.log( todoText );
      }

      brjstodo.todo.todoinput.ExampleClass = ExampleClass;

    } )();

Now, in the `buttonClicked` function we can trigger an event called `todo-added` on a `todo-list` channel to tell any interested parties (the `todoitems` Blade) that a new Todo list item has been input, and the user has indicated they want to add it. We can also clear down the `input` element value.

    caplin.thirdparty( 'caplin-br' );

    ( function() {

      var br = require( 'br' );

      var ServiceRegistry = require( 'br/ServiceRegistry' );

      function ExampleClass() {
        this.message = new br.presenter.node.Field( "Hello World!" );
        this.eventHub = ServiceRegistry.getService( 'demo-event-hub' );
      };
      br.extend( ExampleClass, br.presenter.PresentationModel );

      ExampleClass.prototype.buttonClicked = function() {
        var todoText = this.message.value.getValue();
        this.eventHub.channel( 'todo-list' ).trigger( 'todo-added', { text: todoText } );

        this.message.value.setValue( '' );
      }

      brjstodo.todo.todoinput.ExampleClass = ExampleClass;

    } )();

Before we update the `todoitems` Blade to listen for this event, let's first see how services make it really easy to test our blades.

#### Testing in the Workbench

<div class="alert alert-info">
  <p>
    In a future version of this getting started guide we'll show how you can easily add test code, or Workbench Tools, to faciliate this testing. However, the auto-generated code for the Workbench would add unnecessary complexity to this guide. See: <a href="https://github.com/BladeRunnerJS/brjs/issues/76">zero-conf workbenches</a>.
  </p>
</div>

Ensure the BRJS server is running (`unzip_location/sdk/brjs start`) and open up the `todoinput` Workbench via `http://localhost:7070/brjs-todo/todo-bladeset/blades/todoinput/workbench/`. If you click the `Add` button you'll see a message appear in the JavaScript console. You can manually inspect this to ensure the information logged is as expected.

![](/docs/use/img/testing-in-the-workbench.png)

#### Testing via a Unit Test

Because we've introduced using the `ServiceRegistry` to our tests we should add a JsTestDriver `setUp` function to `todoinput/tests/test-unit/js-test-driver/tests/ExampleClassTest.js`. In this function we can create a `fakeEventHub` to capture any events that are triggered. We then deregister any existing services with the `demo-event-hub` identifier and then register our fake event hub. The `fakeEventHub` variable has a scope so that it's accessible to the new test (the first test doesn't need to be udpated):

    var fakeEventHub;
    var fakeChannel;

    ExampleClassTest.prototype.setUp = function() {

      fakeChannel = {
        trigger: function( eventName, data ) {
          // store event name and data
          this.eventName = eventName;
          this.data = data;
        }
      };

      fakeEventHub = {
        channel: function( channelName ) {
          // store the name of the channel
          this.channelName = channelName;
          return fakeChannel;
        }
      };

      var sr = require( 'br/ServiceRegistry' );

      // ensure there isn't already an event-hub registered
      sr.deregisterService( 'demo-event-hub' );

      // Register the fake event hub
      sr.registerService( 'demo-event-hub', fakeEventHub );
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
      assertEquals( 'todo-list', fakeEventHub.channelName );
      assertEquals( 'todo-added', fakeChannel.eventName );
      assertEquals( testTodoText, fakeChannel.data.text );
    };

The test initializes the `todoinput` Blade, sets a Todo text value we expect to be present within the event data, calls the `buttonClicked` function and verifies that the event is triggered on the expected channel, with the expected event name and data values.

Now that the test is written ensure the test server is running (`unzip_location/sdk/brjs test-server`) and execute the `todoinput` tests:

    $ ./brjs test ../apps/brjs-todo/todo-bladeset/blades/todoinput/

You should see confirmation that the tests pass:

    Chrome 29.0.1547.76 Mac OS [PASSED] ExampleClassTest.testMessageFieldIsInitialized
    Chrome 29.0.1547.76 Mac OS [PASSED] ExampleClassTest.testButtonClickedTriggersEventOnEventHub
    Total 2 tests (Passed: 2; Fails: 0; Errors: 0) (5.00 ms)
      Chrome 29.0.1547.76 Mac OS: Run 2 tests (Passed: 2; Fails: 0; Errors 0) (5.00 ms)
    Tests Passed.

    - Time Taken: 2secs

### Update the Todo Items Blade

Now the `todoinput` Blade is triggering an event on the EventHub, the `todoitems` Blade should be updated to listen for that event and update the UI accordinly.

First, get access to the ServiceRegistry and then register for the event on the channel:

    caplin.thirdparty("caplin-br");

    ( function() {

      var br = require( 'br' );
      var ServiceRegistry = require( 'br/ServiceRegistry' );

      function ExampleClass() {
        var DisplayField = br.presenter.node.DisplayField;
        var NodeList = br.presenter.node.NodeList;
        this.items = new NodeList( [ new DisplayField( "foo" ), new DisplayField( "bar" ) ] );

        // get the event hub
        this.eventHub = ServiceRegistry.getService( 'demo-event-hub' );

        // register to recieve events
        this.eventHub.channel( 'todo-list' ).on( 'todo-added', this._todoAdded, this );
      };
      br.extend( ExampleClass, br.presenter.PresentationModel );

      ExampleClass.prototype._todoAdded = function( added ) {
        // TODO: update this.items
      };

      brjstodo.todo.todoitems.ExampleClass = ExampleClass;

    })();

In the code above we listen for `todo-added` events that are triggered on the `todo-list` channel. Whenever those events are triggered the `_todoAdded` instance function is called. We ensure the `this` context is maintained by passing in `this` as the third parameter to the `eventHub.on` function.

Now that the object is informed whenever a new Todo item is added, we can update the View Model data.

    caplin.thirdparty("caplin-br");

    ( function() {

      var br = require( 'br' );
      var ServiceRegistry = require( 'br/ServiceRegistry' );

      function ExampleClass() {
        var DisplayField = br.presenter.node.DisplayField;
        var NodeList = br.presenter.node.NodeList;
        this.items = new NodeList( [ new DisplayField( "foo" ), new DisplayField( "bar" ) ] );

        this.eventHub = ServiceRegistry.getService( 'demo-event-hub' );
        this.eventHub.channel( 'todo-list' ).on( 'todo-added', this._todoAdded, this );
      };
      br.extend( ExampleClass, br.presenter.PresentationModel );

      ExampleClass.prototype._todoAdded = function( added ) {
        var DisplayField = br.presenter.node.DisplayField;

        // create a new field for the new item
        var newItem = new DisplayField( added.text );

        // get the existing items
        var nodes = this.items.getPresentationNodesArray();

        // append the new item to the array
        nodes.push( newItem );

        // update the View Model which triggers a UI update
        this.items.updateList( nodes );
      };

      brjstodo.todo.todoitems.ExampleClass = ExampleClass;

    })();

#### Testing in the Workbench

Open up the `todoitems` Workbench via `http://localhost:7070/brjs-todo/todo-bladeset/blades/todoitems/workbench/`. Open up the JavaScript console and enter the following code:

    var sr = require( 'br/ServiceRegistry' );
    var hub = sr.getService( 'demo-event-hub' );
    hub.channel( 'todo-list' ).trigger( 'todo-added', { text: 'console todo item' } );

This gets the `demo-event-hub` from the `ServiceRegistry` and then triggers a `todo-added` event on the `todo-list` channel. When you do this you'll see a new `console todo item` added to the list in the UI.

![](/docs/use/img/todo-items-console-workbench.png)

<div class="alert alert-info">
  <p>
    Since using an EventHub for inter-blade communication is a core concept in BRJS apps we should add an <a href="https://github.com/BladeRunnerJS/brjs/issues/125">EventHub Workbench Tool</a> to help during development.
  </p>
</div>

#### Testing via a Unit Test

As with the `todoinput` Blade we can also test the `todoitems` Blade with the help of services. In this case we want to ensure that the blade registers for the appropriate event and that when that even occurs the View Model data is updated.

First we want to set up a fake service that helps us interact with our Blade. Replace the contents of `todoitems/tests/test-unit/js-test-driver/tests/ExampleClassTest.js` with the following:

    ExampleClassTest = TestCase("ExampleClassTest");

    caplin.thirdparty( 'caplin-br' );

    var fakeEventHub;
    var fakeChannel;

    ExampleClassTest.prototype.setUp = function() {

      fakeChannel = {
        on: function(eventName, callback, context) {
          // store event name and data
          this.eventName = eventName;
          this.callback = callback;
          this.context = context;
        }
      };

      fakeEventHub = {
        channel: function( channelName ) {
          // store the name of the channel
          this.channelName = channelName;
          return fakeChannel;
        }
      };

      var sr = require( 'br/ServiceRegistry' );

      // ensure there isn't already an event-hub registered
      sr.deregisterService( 'demo-event-hub' );

      // Register the fake event hub
      sr.registerService( 'demo-event-hub', fakeEventHub );
    };

<div class="alert alert-info">
  <p>
    If this weren't a getting started guide we'd probably create a class that can be shared between the two Blades that implements the same interface as the `demo-event-hub` service, and use it for testing.
  </p>
</div>    

This code ensures that any interaction with the `demo-event-hub` service is captured so that we can test it. Our test will then simply check that the correct channel name is being subscribed to, the appropriate event is being bound to and that it is the `todoItemsBlade` that is doing the binding:

    ExampleClassTest.prototype.testTodoItemsBladeListensToItemAddedEvents = function() {
      var todoItemsBlade = new brjstodo.todo.todoitems.ExampleClass();

      assertEquals( fakeEventHub.channelName , 'todo-list' );
      assertEquals( fakeChannel.eventName , 'todo-added' );
      assertEquals( fakeChannel.context , todoItemsBlade );
    };

Now you can execute the tests (ensuring that the test server is running and at least one browser is connected):

    $ ./brjs test ../apps/brjs-todo/todo-bladeset/blades/todoitems/
    BladeRunner version: BRJS-dev, built: 26 September 2013

    Server already running, not bothering to start a new instance...

    Testing tests (UTs):
    Chrome: Reset
    Chrome 30.0.1599.66 Mac OS loaded /test/bundles/js/js.bundle
    Chrome 30.0.1599.66 Mac OS loaded /test/tests/ExampleClassTest.js
    Chrome 30.0.1599.66 Mac OS [PASSED] ExampleClassTest.testTodoItemsBladeListensToItemAddedEvents
    Total 1 tests (Passed: 1; Fails: 0; Errors: 0) (3.00 ms)
      Chrome 30.0.1599.66 Mac OS: Run 1 tests (Passed: 1; Fails: 0; Errors 0) (3.00 ms)
    Tests Passed.

    - Time Taken: 2secs

As explained above, we also want to make sure the View Model is updated with a new item when the `todo-added` event is received:

    ExampleClassTest.prototype.testItemsViewModelAddsItemOnTodoAddedEvent = function() {
      var todoItemsBlade = new brjstodo.todo.todoitems.ExampleClass();

      var itemText = 'hello';

      // trigger the callback
      fakeChannel.callback.call( fakeChannel.context, { text: itemText } );

      // check the item has been added to the end of the list
      var items = todoItemsBlade.items.getPresentationNodesArray();
      assertEquals( itemText, items[ items.length - 1 ].value.getValue() );
    };

Since we know that Blade uses the EventHub to receive new items, and we have a fake hub in place, we can execute the callback that the Blade is waiting for, passing Todo item data, and then check that the item has been added to the end of the list.

Both the `todoinput` and `todoitems` Blades have the functionality that we're looking for, and they are set up to communicate using the `demo-event-hub` service. The next thing to do is to add them to an application Aspect. We'll then have a fully functional Todo List app.

## Adding the Blades to an Aspect

 

## Build and Deploy

**TODO: Simple deploy to local Tomcat. Note that flat-file deploy is a priority.**

## Where next?

**TODO**