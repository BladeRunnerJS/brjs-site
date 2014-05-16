---
layout: docs
title: Getting Started
permalink: /docs/use/getting_started/
notice: none
---


<div class="alert alert-success">
  <p>
    <strong>This Getting Started Guide requires v0.4 of BladeRunnerJS and above</strong>. <strong><a href="https://github.com/BladeRunnerJS/brjs/releases/" class="brjs-latest-download">Download BladeRunnerJS</a></strong>.
  </p>
</div>

<p><strong>This guide provides you with a basic overview of getting started with BladeRunnerJS (BRJS), including covering some of the core concepts.</strong></p>

This isn't your typical 2 minute getting started guide. This is because BRJS helps you build large-scale applications, so we need to go into a bit of detail. In this guide we'll follow the JavaScript convention - since conventions are good - and build a **Todo List**.

We'll cover:

<div id="page_toc">
  <ul>
  <li>Downloading and installing BRJS</li>
  <li>Creating an Application and BladeSet</li>
  <li>Creating a Todo item <code>Input</code> Blade</li>
  <li>Running and Testing Blades in Workbenches</li>
  <li>Unit testing Blades</li>
  <li>Creating a Todo <code>Items</code> Blade</li>
  <li>Inter-Blade communication using an EventHub Service</li>
  <li>Testing Blade interactions by stubbing Services</li>
  <li>Adding Blades to an application Aspect</li>
  <li>Building and Deploying a BRJS application to Apache Tomcat (Flat File deploy coming soon)</li>
  </ul>
</div>

It'll be time well-spent.

{% include docs/use/install.md %}

## Create an Application

{% include docs/use/create_app_example.md %}

You can now either open a new CLI window to enter future commands in the getting started guide, or press Ctrl + C to kill the server and start it again next time you need the server.

## Create a BladeSet

Before creating our Blades we first need to create a new BladeSet within the application using the CLI. The format of this command is:

    $ BRJS_HOME/sdk/brjs create-bladeset <app-name> <bladeset-name>

[BladeSets](/docs/concepts/bladesets) provide a way of grouping related blades so that they can share common code or resources. For now we don't need to worry about BladeSets. All you need to know is that within the BladeSet directory there's a `blades` directory where we're going to create our blades - our functionality.

Run the following command to create a `todo` BladeSet for the `brjstodo` app:

    $ BRJS_HOME/sdk/brjs create-bladeset brjstodo todo

This create a folder called `todo-bladeset` within the application.

<div class="alert alert-info github">
  <p>
    In future:
  </p>
  <ul>
    <li><a href="https://github.com/BladeRunnerJS/brjs/issues/2">BladeSets will be optional</a>. Right now a Blade must reside within a BladeSet</li>
    <li><a href="https://github.com/BladeRunnerJS/brjs/issues/1">The CLI will be context-aware</a> so you can run <code>brjs create-bladeset</code> from within an application directory to create a BladeSet for an app.</li>
  </ul>
</div>

With this basic application structure in place we can create our first Blade and start developing our Todo List app.

## The Todo Input Blade

[Blades](/docs/concepts/blades) are a core concept within BRJS. Blades are modules that encapsulate all the required functionality and resources – JavaScript, HTML, CSS, XML, images, etc – to implement a particular high level feature. So, let's create a Blade for capturing the todo `Input` items.

### Scaffold the Blade

To create a blade we use the `create-blade` command. This has the following format:

    $ BRJS_HOME/sdk/brjs create-blade <app-name> <bladeset-name> <blade-name>

Let's create a new blade called `input` within the `todo` BladeSet in our `brjstodo` application:

{% include docs/use/create_blade_example.md %}

### View the Code

Within `apps/brjstodo/todo-bladeset/blades/input/src/brjstodo/todo/input` you'll find an `InputViewModel.js` file.

<div class="alert alert-info github">
  <p>Yeah, this folder structure is crazy! We're working on a <a href="https://github.com/BladeRunnerJS/brjs/issues/19">simplified directory structure</a></p>
</div>

Open up `InputViewModel.js` to see the following:

```javascript
'use strict';

var ko = require( 'ko' );

function InputViewModel() {
  this.message = ko.observable( 'Hello World!' );
}

InputViewModel.prototype.buttonClicked = function() {
  console.log( 'button clicked' );
};

module.exports = InputViewModel;

```

Above, `InputViewModel` is a View Model which is bound to a view. You'll also see that we `require` something called `ko`. This is a reference to [Knockout](http://knockoutjs.com/) and we use this by default for building View Models.

<div class="alert alert-info github">
  <ul>
    <li>We plan to <a href="https://github.com/BladeRunnerJS/brjs/issues/6">add better template support</a> which will allow for more flexible file naming and also support for other front-end frameworks to be used by default e.g. Angular, Ember, Polymer (Web Components), React</li>
  </ul>
</div>

The view definition can be found in an HTML template in `input/resources/html/view.html`:

```html
<div id="brjstodo.todo.input.view-template">
  <div class="hello-world-message" data-bind="text:message"></div>
  <button class="button" data-bind="click:buttonClicked">Log me</button>
</div>
```

The template markup indicates that the text of the `div` element will get the value of the View Model's `message` property (`data-bind="text:message"`)  and that the `buttonClick` View Model function will be called when the `button` is clicked (`data-bind="click:buttonClicked"`).

### Run the Blade in a Workbench

Now that you've seen the View Model class and the view template, let's launch a Workbench and see the Blade running in isolation. Ensure the development web server is running (`BRJS_HOME/sdk/brjs serve`) and navigate to the workbench via `http://localhost:7070/brjstodo/todo-bladeset/blades/input/workbench/`.

![](/docs/use/img/hello-world-workbench.png)

You'll notice that there's a **Visualise Knockout View Model** Workbench Tool that shows a tree visualisation of the View Model. In there you'll see a simple `message:Hello World!` name and value.

If you click the `Log me` button the `buttonClicked` function is called and `button clicked` will be logged to the JavaScript console.

<div class="alert alert-info github">
    <p>
        <strong>This thing's really slow!</strong> Due to the dependency analysis BladeRunnerJS performs on your JavaScript the initial load of any page will take slightly longer than subsequent loads. Subsequent load time is however slightly longer than we'd like so we're working to improve it.
    </p>
</div>

### Add Two-Way Data Binding

Next, let's edit the Blade to display an `<input>` element with a two-way binding between the View and View Model.

To do this update the `message` instance variable to be called something more relevant to better reflect it will contain todo text: `todoText`. Additionally, the default value should be blank.

Finally, instead of having to click a button we should handle the *Enter/Return* key being pressed as an indication of a new todo item being finalized. Let's rename `buttonClicked` to `keyPressed` and only handle the key press if it was the correct key by checking `event.keyCode` to ensure its value equals `ENTER_KEY_CODE`:

```javascript
'use strict';

var ko = require( 'ko' );

/*** New code ***/
var ENTER_KEY_CODE = 13;
/*** End of new code ***/

function InputViewModel() {
  /*** New code ***/
  this.todoText = ko.observable( '' );
  /*** End of new code ***/
}

/*** New code ***/
InputViewModel.prototype.keyPressed = function( item, event ) {
  if( event.keyCode === ENTER_KEY_CODE ) {
    var todoTextValue = this.todoText();
    console.log( todoTextValue );
  }

  return true;
};
/*** End of new code ***/

module.exports = InputViewModel;
```

We also update `view.html` to contain an `input` element where the element's `value` property is bound to the newly named `todoText` value. We want instant two-way binding so we also need to add `valueUpdate:'afterkeydown'` to the `data-bind` attribute. And we also want to call the newly named `keyPressed` function when a key is pressed in the input to check to see if it was the *Enter/Return* key. We do this by adding `event: { keypress: keyPressed }` to the `data-bind` attribute.

Finally, update the `class` attribute to indicate the input is a `todo-input`, add a `placeholder` attribute, remove the unused `<button>` element, wrap in a `<header>` element and add a `<h1>` to indicate this is where the todos are entered:

```html
<div id="brjstodo.todo.input.view-template">
  <header id="header">
    <h1>todos</h1>
    <input id="new-todo" type="text" class="todo-input"
           data-bind="value:todoText,
                      valueUpdate:'afterkeydown',
                      event: { keypress: keyPressed }"
           placeholder="What needs to be done?" />
  </header>
</div>
```

If you refresh your Workbench and change the value in the input element you'll instantly see the value updated in the Workbench Tool under *Knockout View Model -> todoText -> value*. Pressing *Enter/Return* will now log the message that's been entered into the input.

![](/docs/use/img/hello-bladerunnerjs-workbench.png)

## Testing a Blade

A core concept with BRJS is building a JavaScript application that scales. One of the best ways to ensure that an application scales is to ensure it is maintainable via thorough testing. So, let's write a test - by default BRJS uses [JSTestDriver](https://code.google.com/p/js-test-driver/).

<div class="alert alert-info github">
  <p>
    Part of our plugin architecture will eventually <a href="https://github.com/BladeRunnerJS/brjs/issues/8">support additional unit test runners</a>.
  </p>
</div>

### Write the Test

When you scaffold a new Blade a test class is also created. The scaffolded test can be found in `input/tests/test-unit/js-test-driver/tests/InputViewModelTest.js`:

```javascript
var InputViewModelTest = TestCase("InputTest");

var InputViewModel = require( 'brjstodo/todo/input/InputViewModel' );

InputViewModelTest.prototype.testSomething = function() {
  var model = new InputViewModel();
  assertEquals( 'Hello World!', model.message() );
};
```

The simplest test we can write at the moment is to check that the `todoText` field is initialized with an empty string value.

```javascript
var InputViewModelTest = TestCase( 'InputViewModelTest' );

var InputViewModel = require( 'brjstodo/todo/input/InputViewModel' );

InputViewModelTest.prototype.testSomething = function() {
  var model = new InputViewModel();
  assertEquals( '', model.todoText() );
};
```

### Run the Test

There are a few ways to run the tests using JSTestDriver, but the simplest is probably to start the test server using the CLI:

    $ BRJS_HOME/sdk/brjs test-server --no-browser

The test server will then start up on the default port (4224) and continue running in the terminal/console that you started it in.

Then in the web browser (or browsers) you wish to execute the tests in navigate to `http://localhost:4224/capture?strict`. This browser is now waiting for the test server to instruct it to run tests.

You can now run the tests by opening up another terminal/console tab/window and executing `BRJS_HOME/sdk/brjs test path_to_directory_to_scan_for_tests`. In our case we just want to run the `input` tests by running:

    $ BRJS_HOME/sdk/brjs test ../apps/brjstodo/todo-bladeset/blades/input/

If all goes well you should see output similar to the following:

```bash
BladeRunnerJS version: v0.3-931-g715bf3c-DEV, built: 26 February 2014 21:18 GMT

Server already running, not bothering to start a new instance...

Testing tests (UTs):
Chrome: Reset
Chrome: Reset
.
Total 1 tests (Passed: 1; Fails: 0; Errors: 0) (1.00 ms)
  Chrome 33.0.1750.117 Mac OS: Run 1 tests (Passed: 1; Fails: 0; Errors 0) (1.00 ms)
Tests Passed.

- Time Taken: 3secs
```

If you wanted to run all the tests for the application you would execute:

    $ BRJS_HOME/sdk/brjs test ../apps/brjstodo

We've now created our first Blade, seen it running in a Workbench, updated the Blade and seen the change in the Workbench, and written a simple test to check the View Model initialized state. It's time to create our second Blade.

## Create a Todo Items Blade

Create a second blade to show the Todo list `Items`. As with the first Blade, we do this using the CLI:

    $ BRJS_HOME/sdk/brjs create-blade brjstodo todo items

This will create all the same assets that were created for the first blade, but in a `items` directory.

Open up the newly generated `ItemsViewModel.js` and update the JavaScript as follows:

```javascript
'use strict';

var ko = require( 'ko' );

function ItemsViewModel() {
  /*** new code ***/
  this.todos = ko.observableArray( [
    { title: 'foo' },
    { title: 'bar' }
  ] );
  /*** end of new code ***/
}

module.exports = ItemsViewModel;
```

The class has a member variable called `todos` that is an [`observableArray'](http://knockoutjs.com/documentation/observableArrays.html) because it will contain a number of todo items. For testing purposes we've added a couple of default items. The main thing to note about the items right now is that they have a `title` property.

Next we need to update the View HTML template to loop over the `todos` Array and display each one in an unordered list. We can do this using the [`foreach`](http://knockoutjs.com/documentation/foreach-binding.html) binding.

Update the `items` view, `BRJS_HOME/apps/brjstodo/todo-bladeset/blades/items/resources/html/view.html`, to have the following HTML:

```html
<div id="brjstodo.todo.items.view-template">
  <!-- new code -->
  <section id="main">
  	<ul id="todo-list" data-bind="foreach:todos">
      <li>
        <div class="view">
          <label data-bind="text:title"></label>
        </div>
      </li>
    </ul>
  </section>
  <!-- end of new code -->
</div>
```

If you ensure the BRJS development server is running (`BRJS_HOME/sdk/brjs serve`) and launch the Workbench for this Blade via `http://localhost:7070/brjstodo/todo-bladeset/blades/items/workbench/` you'll see the two hard-coded list items.

![](/docs/use/img/todo-items-workbench.png)

## Inter-Blade communication using an EventHub

We now have a way for a user to **input** a todo list item and a place to show the **items**. But, how do we get the Blades to communicate with each other, so that when an item is added in one blade it is shown on the other? One way of doing this is to use an [EventHub](/docs/concepts/event_hub). BRJS provides a default *Event Hub* [service](/docs/concepts/services) to help with this.

### Update the Todo Input Blade

Back in our `input` Blade we can access the EventHub service using the [ServiceRegistry](/docs/concepts/service_registry), which we `require`, as shown in the `InputViewModel` constructor below:

```javascript
'use strict';

var ko = require( 'ko' );
/*** new code ***/
var ServiceRegistry = require( 'br/ServiceRegistry' );
/*** end of new code ***/

var ENTER_KEY_CODE = 13;

function InputViewModel() {
  this.todoText = ko.observable( '' );

  /*** new code ***/
  this._eventHub = ServiceRegistry.getService( 'br.event-hub' );
  /*** end of new code ***/
}

InputViewModel.prototype.keyPressed = function( item, event ) {
  if( event.keyCode === ENTER_KEY_CODE ) {
    var todoTextValue = this.todoText();
    console.log( todoTextValue );
  }

  return true;
};

module.exports = InputViewModel;
```

Now, in the `keyPressed` function we can trigger an event called `todo-added` on a `todo-list` channel to tell any interested parties (the `items` Blade) that a new Todo list item has been input, and the user has indicated they want to add it. The `eventData` we send with the event will have a `title` property representing the todo item text. We can also clear down the `todoText` and associated element value.

```javascript
'use strict';

var ko = require( 'ko' );
var ServiceRegistry = require( 'br/ServiceRegistry' );

var ENTER_KEY_CODE = 13;

function InputViewModel() {
  this.todoText = ko.observable( '' );

  this._eventHub = ServiceRegistry.getService( 'br.event-hub' );
}

InputViewModel.prototype.keyPressed = function( item, event ) {
  if( event.keyCode === ENTER_KEY_CODE ) {
    var todoTextValue = this.todoText();
    /*** new code ***/
    var eventData = { title: todoTextValue };
    this._eventHub.channel( 'todo-list' ).trigger( 'todo-added', eventData );

    this.todoText( '' );
    /*** end of new code ***/
  }

  return true;
};

module.exports = InputViewModel;
```

Before we update the `items` Blade to listen for this event, let's first see how services make it really easy to test our blades.

#### Testing in the Workbench

<div class="alert alert-info github">
  <p>
    In a future version of this getting started guide we'll show how you can easily add test code to the Workbench, or Workbench Tools, to faciliate this testing. However, the auto-generated code for the Workbench would add unnecessary complexity to this guide. See: <a href="https://github.com/BladeRunnerJS/brjs/issues/76">zero-conf workbenches</a>.
  </p>
</div>

Ensure the BRJS server is running (`BRJS_HOME/sdk/brjs serve`) and open up the `input` Workbench via `http://localhost:7070/brjstodo/todo-bladeset/blades/input/workbench/`. If you input some text and press *Enter* you'll see a message appear in the **EventHub Logging** Workbench Tool. It's logged as a *DeadEvent* because nobody is actually listening to this event. You can manually inspect this to ensure the information logged is as expected.

![](/docs/use/img/testing-in-the-workbench.png)

#### Testing via a Unit Test

Because we've introduced the concept and usage of the `ServiceRegistry` we should add to our tests a JSTestDriver `setUp` function to `input/tests/test-unit/js-test-driver/tests/InputViewModelTest.js`. In this function we can create a `fakeEventHub` to capture any events that are triggered. We then deregister any existing services with the `br.event-hub` identifier and then register our fake event hub. The `fakeEventHub` variable has a scope so that it's accessible to the new test (the first test doesn't need to be updated):

```javascript
var InputViewModelTest = TestCase( 'InputViewModelTest' );

/*** new code ***/
var ServiceRegistry = require( 'br/ServiceRegistry' );

var fakeEventHub;
var fakeChannel;

InputViewModelTest.prototype.setUp = function() {

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

  // ensure there isn't already an event-hub registered
  ServiceRegistry.deregisterService( 'br.event-hub' );

  // Register the fake event hub
  ServiceRegistry.registerService( 'br.event-hub', fakeEventHub );
};
/*** end of new code ***/

var InputViewModel = require( 'brjstodo/todo/input/InputViewModel' );

InputViewModelTest.prototype.testSomething = function() {
  var model = new InputViewModel();
  assertEquals( '', model.todoText() );
};
```

Now add the new test to ensure that when the `keyPressed` function is executed (which will normally be called via the user pressing *Enter* in the `<input>` element) that an event is triggered on the Event Hub.

```javascript
InputViewModelTest.prototype.testEnterKeyPressedTriggersEventOnEventHub = function() {
  // Initialize
  var testTodoTextValue = 'write some code and test it';
  var inputViewModel = new InputViewModel();
  inputViewModel.todoText( testTodoTextValue );

  // Execute test
  inputViewModel.keyPressed( null, { keyCode: 13 } );

  // Verify
  assertEquals( 'todo-list', fakeEventHub.channelName );
  assertEquals( 'todo-added', fakeChannel.eventName );
  assertEquals( testTodoTextValue, fakeChannel.data.title );
};
```

The test initializes the `input` View Model, sets a Todo text value we expect to be present within the event data, calls the `keyPressed` function with a fake event object and verifies that the event is triggered on the expected channel, with the expected event name and data values.

Now that the test is written ensure the test server is running (`BRJS_HOME/sdk/brjs test-server --no-browser`), that you have a browser connected to the test server (`http://localhost:4224/capture?strict`) and execute the `input` tests:

    $ BRJS_HOME/sdk/brjs test ../apps/brjstodo/todo-bladeset/blades/input/

You should see confirmation that the tests pass:

    ..
    Total 2 tests (Passed: 2; Fails: 0; Errors: 0) (3.00 ms)
      Chrome 30.0.1599.101 Windows: Run 2 tests (Passed: 2; Fails: 0; Errors 0) (3.00 ms)
    Tests Passed.

    - Time Taken: 2secs

### Update the Todo Items Blade

Now the `input` Blade is triggering an event on the EventHub, the `items` Blade should be updated to listen for that event and update the UI accordingly.

First, get access to the `ServiceRegistry` and then register for the event on the channel:

```javascript
'use strict';

var ko = require( 'ko' );

/*** New code ***/
var ServiceRegistry = require( 'br/ServiceRegistry' );
/*** End of new code ***/

function ItemsViewModel() {
  this.todos = ko.observableArray( [
    { title: 'foo' },
    { title: 'bar' }
  ] );

  /*** new code ***/
  this._eventHub = ServiceRegistry.getService( 'br.event-hub' );

  // register to recieve events
  this._eventHub.channel( 'todo-list' ).on( 'todo-added', this._todoAdded, this );
  /*** end of new code ***/
}

/*** new code ***/
ItemsViewModel.prototype._todoAdded = function( added ) {
  this.todos.push( added );
};
/*** end of new code ***/

module.exports = ItemsViewModel;
```

In the code above we listen for `todo-added` events that are triggered on the `todo-list` channel. Whenever those events are triggered the `_todoAdded` instance function is called passing in the newly `added` item. We ensure the `this` context is maintained by passing in `this` as the third parameter to the `eventHub.on` function.

In `_todoAdded` we just need to add the item to the `todos` Knockout `observableArray`.

#### Testing in the Workbench

Open up the `items` Workbench via `http://localhost:7070/brjstodo/todo-bladeset/blades/items/workbench/` ensuring the BRJS development web server is running (`BRJS_HOME/sdk/brjs serve`). Open up the JavaScript console and enter the following code:

```
var sr = require( 'br/ServiceRegistry' );
var hub = sr.getService( 'br.event-hub' );
hub.channel( 'todo-list' ).trigger( 'todo-added', { title: 'console todo item' } );
```

This gets the `event-hub` from the `ServiceRegistry` and then triggers a `todo-added` event on the `todo-list` channel. When you do this you'll see a new `console todo item` added to the list in the UI.

![](/docs/use/img/todo-items-console-workbench.png)

<div class="alert alert-info">
  <p>
    The EventHub presently logs channels being subscribed to, events being bound to and events being triggered. We also need <a href="https://github.com/BladeRunnerJS/brjs/issues/125">a Workbench Tool for triggering events on channel</a>.
  </p>
</div>

#### Testing via a Unit Test

As with the `input` Blade we can also test the `items` Blade with the help of services. In this case we want to ensure that the blade registers for the appropriate event and that when that event occurs the View Model data is updated.

First we want to set up a fake service that helps us interact with our Blade. **Replace** the contents of `items/tests/test-unit/js-test-driver/tests/ItemsViewModelTest.js` with the following:

```javascript
var ItemsViewModelTest = TestCase( 'ItemsViewModelTest' );

var ServiceRegistry = require( 'br/ServiceRegistry' );

var fakeEventHub;
var fakeChannel;

ItemsViewModelTest.prototype.setUp = function() {

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

  // ensure there isn't already an event-hub registered
  ServiceRegistry.deregisterService( 'br.event-hub' );

  // Register the fake event hub
  ServiceRegistry.registerService( 'br.event-hub', fakeEventHub );
};

var ItemsViewModel = require( 'brjstodo/todo/items/ItemsViewModel' );
```

<div class="alert alert-info">
  <p>
    If this weren't a getting started guide we'd probably create a class that can be shared between the two Blades that implements the same interface as the <code>br.event-hub</code> service, and use it for testing.
  </p>
</div>

This code ensures that any interaction with the `br.event-hub` service is captured so that we can test it. Our test will then simply check that the correct channel name is being subscribed to, the appropriate event is being bound to and that it is the `itemsViewModel` that is doing the binding:

```javascript
ItemsViewModelTest.prototype.testitemsBladeListensToItemAddedEvents = function() {
  var itemsViewModel = new ItemsViewModel();

  assertEquals( fakeEventHub.channelName , 'todo-list' );
  assertEquals( fakeChannel.eventName , 'todo-added' );
  assertEquals( fakeChannel.context , itemsViewModel );
};
```

Now you can execute the tests, using `BRJS_HOME/sdk/brjs test ../apps/brjstodo/todo-bladeset/blades/items/`, ensuring that the test server is running (`BRJS_HOME/sdk/brjs test-server`) and at least one browser is connected (`http://localhost:4224/capture?strict`):

```bash
BladeRunnerJS version: v0.3-931-g715bf3c-DEV, built: 26 February 2014 22:26 GMT

Server already running, not bothering to start a new instance...

Testing tests (UTs):
Chrome: Reset
Chrome: Reset
.
Total 1 tests (Passed: 1; Fails: 0; Errors: 0) (2.00 ms)
  Chrome 33.0.1750.117 Mac OS: Run 1 tests (Passed: 1; Fails: 0; Errors 0) (2.00 ms)
Tests Passed.

- Time Taken: 5secs
```

As explained above, we also want to make sure the View Model is updated with a new item when the `todo-added` event is received:

```javascript
ItemsViewModelTest.prototype.testItemsViewModelAddsItemOnTodoAddedEvent = function() {
  var itemsViewModel = new ItemsViewModel();

  var itemText = 'hello';

  // trigger the callback
  fakeChannel.callback.call( fakeChannel.context, { title: itemText } );

  // check the item has been added to the end of the list
  var items = itemsViewModel.todos();
  assertEquals( itemText, items[ items.length - 1 ].title );
};
```

Re-running the test command will now show two tests successfully passing.

Since we know that the Blade uses the EventHub to receive new items, and we have a fake hub in place, we can execute the callback that the Blade is waiting for, passing Todo item data, and then check that the item has been added to the end of the list.

Both the `input` and `items` Blades have the functionality that we're looking for, and they are set up to communicate using the `br.event-hub` service. The next thing to do is to add them to an application [Aspect](/docs/concepts/aspects). We'll then have a fully functional Todo List app.

## Adding the Blades to an Aspect

In order to add the Blades to the default aspect we need to first update the aspect HTML to provide some basic structure. Open up `brjstodo/default-aspect/index.html` and update it to look as follows:

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">

		<base href="@APP.VERSION@"/>

		<title>My Application</title>

		<@css.bundle theme="standard"@/>

	</head>
	<body>
        <!-- new code -->
		<section id="todoapp"></section>
        <!-- end of new code -->

    <!-- dev-minifier can be set to "combined" for all JS content to be bundled with a single request -->
		<@js.bundle dev-minifier="none" prod-minifier="combined"@/>
		<script>
			( function() {

				// Register application EventHub. Required until the following is fixed:
				// https://github.com/BladeRunnerJS/brjs/issues/354
				var ServiceRegistry = require( 'br/ServiceRegistry' );
				var EventHub = require( 'br/EventHub' );
				ServiceRegistry.registerService( 'br.event-hub', new EventHub() );

				var App = require( 'brjstodo/App' );
				var app = new App();

			} )();
		</script>
	</body>
</html>

```

The `<@css.bundle theme="standard"@/>` tag is replaced at build time with a reference to a CSS bundle and the `<@js.bundle@/>` with a reference to the generated JavaScript source. This will be either numerous script tags for each JavaScript file or a single bundle file.

The element with the ID of `header` will have the Todo Input element appended to it for users to enter their todo items. The `<section>` with the ID of `todoapp` will first have the todo input element appended to it followed by the Todo items element. You'll also see that we initialize our application `App` object here.

Open `brjstodo/default-aspect/src/brjstodo/App.js` and in the `App` class create two instances of the objects we've just defined and tested; an Input `InputViewModel` and an Items `ItemsViewModel`. In addition we're going to use a class called `KnockoutComponent` that helps us create a DOM element from our view template and deal with binding that element to the view model. To do this we create a new `KnockoutComponent` instance and pass in an identifier to our view template and the view model instance:

```javascript
'use strict';

/*** new code ***/
var InputViewModel = require( 'brjstodo/todo/input/InputViewModel' );
var ItemsViewModel = require( 'brjstodo/todo/items/ItemsViewModel' );

var KnockoutComponent = require( 'br/knockout/KnockoutComponent' );
/*** end of new code ***/

var App = function() {
  /*** new code ***/
  var inputViewModel = new InputViewModel();
  var inputComponent =
    new KnockoutComponent( 'brjstodo.todo.input.view-template', inputViewModel );

  var itemsViewModel = new ItemsViewModel();
  var itemsComponent =
    new KnockoutComponent( 'brjstodo.todo.items.view-template', itemsViewModel );
  /*** end of new code ***/
};

module.exports = App;
```

At this point we haven't added any content to our page and it will just a blank page.

In order for the Blade components to appear in the aspect we have to append the DOM elements that the `KnockoutComponent` instances create, to the Aspect (the main view into the Todo List web app). We do this by calling `component.getElement()` and appending the returned element append it to the `todoapp` element in the DOM:

```javascript
'use strict';

var InputViewModel = require( 'brjstodo/todo/input/InputViewModel' );
var ItemsViewModel = require( 'brjstodo/todo/items/ItemsViewModel' );

var KnockoutComponent = require( 'br/knockout/KnockoutComponent' );

var App = function() {
  var inputViewModel = new InputViewModel();
  var inputComponent =
    new KnockoutComponent( 'brjstodo.todo.input.view-template', inputViewModel );

  var itemsViewModel = new ItemsViewModel();
  var itemsComponent =
    new KnockoutComponent( 'brjstodo.todo.items.view-template', itemsViewModel );

  /*** new code ***/
  var todoAppEl = document.getElementById( 'todoapp' );
  todoAppEl.appendChild( inputComponent.getElement() );
  todoAppEl.appendChild( itemsComponent.getElement() );
  /*** end of new code ***/
};

module.exports = App;
```

If we refresh the application we'll now see the Input and the Todo List appended to the view. The application now lets you enter todos into the input and when you press *Enter/Return* the todo is appended to the items list.

![](/docs/use/img/unstyled-app.png)

Finally, we *really* need to apply some styling to the application.

Styling can be applied at a number of levels; from Blade through to Aspect. In our case we'll apply the styling at the Aspect level. Since we've already covered the key points in developing a BRJS application we're going to miss out the styling part. Download the two following files from the Todo MVC Knockout example and place them in `brjstodo/default-aspect/themes/standard/`:

* [base.css](https://raw.github.com/tastejs/todomvc/gh-pages/architecture-examples/knockoutjs/bower_components/todomvc-common/base.css)
* [bg.png](https://raw.github.com/tastejs/todomvc/gh-pages/architecture-examples/knockoutjs/bower_components/todomvc-common/bg.png)

![](/docs/use/img/download-styles.png)

Then refresh the app.

![](/docs/use/img/styled-app.png)

You now have a reasonable looking Todo List app based on the styling of [Todo MVC](http://todomvc.com/) that you can add items to. Now for deployment.

## Build and Deploy

For the moment we only support deploying as a [.WAR][war-file] file so we'll cover building and deploying to [Apache Tomcat](http://tomcat.apache.org/).

[war-file]: http://en.wikipedia.org/wiki/WAR_file_format_(Sun)

<div class="alert alert-info github">
  <p>
    We presently only support WAR deployment. This is restrictive so <a href="https://github.com/BladeRunnerJS/brjs/issues/18">supporting Flat File build and deployment</a> is a priority.
  </p>
</div>

First download Tomcat 6.0 from the [Apache Tomcat](http://tomcat.apache.org/) website.

To build the WAR, run the `war` command:

    $ BRJS_HOME/sdk/brjs war brjstodo
    BladeRunnerJS version: BRJS-dev, built: 26 September 2013

    Successfully created war file

Deploying to Tomcat is a simple as copying the `brjstodo.war` file to the Tomcat `webapps` directory:

    $ cp brjstodo.war path_to_tomcat_install/webapps/

By default Tomcat runs on port 8080. Once it's running (`path_to_tomcat_install/startup.sh` or `path_to_tomcat_install/startup.bat`) navigate to `localhost:8080/brjstodo` to see your application running in a deployed environment.

![](/docs/use/img/deployed-to-tomcat.png)

<div class="alert alert-info github">
  <p>
    You may find that in deploying this application it will result in the root Tomcat application (<code>localhost:8080</code>) failing. We are aware of this and are <a href="https://github.com/BladeRunnerJS/brjs/issues/192">investigating</a>.
  </p>
</div>  

You can find the code for this application in the [brjstodo github repo](https://github.com/BladeRunnerJS/brjstodo-getting-started).

## Summary

This comprehensive getting started guide has introduced you to [Blades](/docs/concepts/blades/), running Blades in isolation in [Workbenches](/docs/concepts/workbenches/), seeing how Workbenches help the development process, unit testing Blades, inter-Blade communication using an [EventHub](/docs/concepts/event_hub/), how [Services](/docs/concepts/services/) facilitate testing, incorporating Blades into application [Aspects](/docs/concepts/aspects) and deploying your BRJS application.

Believe it or not, this just scrapes the surface of BladeRunnerJS. So...

## Where next?

### Finish the Todo App

The getting started app doesn't offer 100% Todo App functionality. How about taking a look at the standard [Todo MVC](http://todomvc.com) applications and adding some of that functionality using the [brjstodo getting started code](https://github.com/BladeRunnerJS/brjstodo-getting-started) as a starting point. Functionality like:

* Marking a Todo Item as complete
* Deleting a Todo Item
* Edit a Todo Item
* Persisting data to a backend **Service**
* Making the Todo List collaborative by using a [realtime service](http://www.leggetter.co.uk/real-time-web-technologies-guide)

### Explore the Docs

Read up more about the [concepts](/docs/concepts) behind BRJS, discover additional ways to [use](/docs/use/) BRJS or how you can [extend](/docs/extend/) BRJS to improve your developer workflow.

### Get Involved

BRJS is an open source project that we really want others to get involved in through using, sharing and contribution. You can do this by watching [BRJS on github]({{ site.social.github_link }}) and getting involved in the discussions. By building applications using BRJS and sharing your thoughts, findings and code. By [extending BRJS](/docs/extend/) through creating plugins that improve your developer workflow and sharing what you've done. Or by contributing to the core codebase.
