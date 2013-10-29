---
layout: docs
title: Getting Started
permalink: /docs/use/getting_started/
---

<p><strong>This guide provides you with a basic overview of getting started with BladeRunnerJS (BRJS), including covering some of the core concepts.</strong></p>

This isn't your typical 2 minute getting started guide - it probably takes around 20 minutes. This is because BRJS helps you build large-scale applications, so we need to go into a bit of detail. In this guide we'll follow the JavaScript convention - since conventions are good - and build a **Todo List**.

We'll cover:

* Downloading and installing BRJS
* Creating an Application and BladeSet
* Creating a Todo item Input Blade
* Running and Testing Blades in Workbenches
* Unit testing Blades
* Creating a Todo List Blade
* Inter-Blade communication using an EventHub Service
* Testing Blade interactions by stubbing Services
* Adding Blades to an application Aspect
* Building and Deploying a BRJS application to Apache Tomcat (Flat File deploy coming soon)

It'll be 20 minutes well-spent.

## Prerequisites

In order to run BRJS you'll need [JRE 7](http://www.oracle.com/technetwork/java/javase/downloads/java-se-jre-7-download-432155.html) installed. To deploy the built .WAR file you'll need access to an installation of [Apache Tomcat](http://tomcat.apache.org/) (installing is as simple as download and unzip).

## Download & Install the BRJS

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
    BRJS apps presently have to reside within an <code>apps</code> folder in the unzip directory. Future releases will allow for <a href="https://github.com/BladeRunnerJS/brjs/issues/1">apps to be located anywhere on disk</a>.
  </p>
</div>

In the aspect directory you'll find an `index.html` entry point a `src` directory for your JavaScript, a `themes` directory for your CSS and images, and a `resources` directory for everything else. You can view this default aspect by starting the BRJS development server:

    $ unzip_location/sdk/brjs start

This will start the development web server running on localhost port 7070. You can view the aspect by navigating to `http://localhost:7070/brjs-todo`.

![](/docs/use/img/brjs-app-nothing-to-see-here.png)

## Create a BladeSet

Create a new BladeSet within the application using the CLI:

    unzip_location/sdk/brjs create-bladeset brjs-todo todo

This creates a folder called `todo-bladeset` within the application. [BladeSets](/docs/concepts/bladesets) provide a way of grouping related blades so that they can share common code or resources. For now we don't need to worry about BladeSets. All you need to know is that within the BladeSet directory there's a `blades` directory where we're going to create our blades - our functionality.

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

First, let's create a Blade for capturing the Todo input items.

### Scaffold the Blade

Create a new blade using the CLI:

    $ unzip_location/sdk/brjs create-blade brjs-todo todo todoinput

This creates a `todoinput` directory within `unzip_location/apps/brjs-todo/todo-bladeset/blades/` containing the following sub-directories:

* `src` - for the JavaScript for the Blade
* `tests` - for the blade tests
* `themes` - for CSS and images
* `workbench` - for the [Workbench](/docs/concepts/workbenches) for the Blade we're developing
* `resources` - for everything else

<div class="alert alert-info github">
  <p>
    In future:
  </p>
  <ul>
    <li><a href="https://github.com/BladeRunnerJS/brjs/issues/3">A default blade will be created when an application is created</a></li>
    <li>The <a href="https://github.com/BladeRunnerJS/brjs/issues/1">CLI will be context aware</a> so you can run <code>brjs create-blade</code> from within an application directory to create a blade for an app; you won't need to supply an app name, app namespace and BladeSet name</li>
  </ul>
</div>

### View the Code

Within `apps/todo-bladeset/blades/todoinput/src/bjrstodo/todo/todoinput/src` you'll find an `ExamplePresentationModel.js` file.

<div class="alert alert-info github">
  <p>Yeah, this folder structure is crazy! We're working on a <a href="https://github.com/BladeRunnerJS/brjs/issues/19">simplified directory structure</a></p>
</div>

Open up `ExamplePresentationModel.js` to see the following:

    caplin.thirdparty( 'caplin-br' );
    
    ( function() {
    
      var br = require( 'br' );
    
      function ExamplePresentationModel() {
        this.message = new br.presenter.property.Property( 'Hello World!' );
      };
      br.extend( ExamplePresentationModel, br.presenter.PresentationModel );
    
      ExamplePresentationModel.prototype.buttonClicked = function() {
        console.log( 'button clicked' );
      }
    
      brjstodo.todo.todoinput.ExamplePresentationModel = ExamplePresentationModel;
    
    } )();

<div class="alert alert-info github">
  <ul>
    <li>We know the JavaScript coding style (the closure, large namespaces etc.) needs to be improved so we are working towards adding <a href="https://github.com/BladeRunnerJS/brjs/issues/11">full support for Node.js module style code</a> as a priority.</li>
    <li>We plan to <a href="https://github.com/BladeRunnerJS/brjs/issues/6">give auto-generated files and classes better names</a></li>
  </ul>
</div>

Above, `ExamplePresentationModel` is a View Model which is bound to a view. You'll notice that it extends something called `PresentationModel`. This deals with binding data to the view using the BRJS [Presenter](/docs/concepts/presenter) library that we've built on top of [Knockout](http://knockoutjs.com/). The view definition can be found in an HTML template in `todoinput/resources/html/view.html`:

    <div id="brjstodo.todo.todoinput.view-template">
      <div class="hello-world-message" data-bind="text:message"></div>
      <button class="button" data-bind="click:buttonClicked">Alert me</button>
    </div>

The template markup indicates that the text of the `div` element will get the value of the View Model's `message` property (`data-bind="text:message"`)  and that the `buttonClick` View Model function will be called when the `button` is clicked (`data-bind="click:buttonClicked"`).

### Run the Blade in a Workbench

Now that you've seen the View Model class and the view template, let's launch a Workbench and see the Blade running in isolation. Ensure the development web server is running (`unzip_location/sdk/brjs start`) and navigate to the workbench via `http://localhost:7070/brjs-todo/todo-bladeset/blades/todoinput/workbench/`.

![](/docs/use/img/hello-world-workbench.png)

You'll notice that there's a **Visualise Presentation Model** Workbench Tool that shows a tree visualisation of the View Model. In there you'll see a simple `message:Hello World!` name and value.

If you click the `Log me` button the `buttonClicked` function is called and `button clicked` will be logged to the JavaScript console.

### Add Two-Way Data Binding

Next, let's edit the Blade to display in `<input>` element with a two-way binding between the View and View Model.

To do this we first need to update `ExamplePresentationModel.js` to handle the fact the view contains an input element. We do this using a `Field` object initialized with an empty string instead of 'Hello World!'. We can also update the `message` instance variable to be called something more relevant: `todoText`.

Finally, instead of having to click a button we should handle the *Enter/Return* key being pressed as an indication of a new todo item being finalized. Let's rename `buttonClicked` to `keyPressed` and only handle the key press if it was the correct key (`ENTER_KEY_CODE`):

    caplin.thirdparty( 'caplin-br' );

    ( function() {

      var ENTER_KEY_CODE = 13;

      var br = require( 'br' );
      
      function ExamplePresentationModel() {
        this.todoText = new br.presenter.node.Field( '' );
      };
      br.extend( ExamplePresentationModel, br.presenter.PresentationModel );
      
      ExamplePresentationModel.prototype.keyPressed = function( data, event ) {
        if( event.keyCode === ENTER_KEY_CODE ) {
          var todoTextValue = this.todoText.value.getValue();
          console.log( todoTextValue );
        }

        return true;
      };
      
      brjstodo.todo.todoinput.ExamplePresentationModel = ExamplePresentationModel;

    } )();

We also update `view.html` to contain an `input` element where the element's `value` property is bound to the newly named `todoText` value. We want instant two-way binding so we also need to add `valueUpdate:'afterkeydown'` to the `data-bind` attribute. And we also want to call the newly named `enterPressed` function when a key is pressed in the input to check to see if it's the *Enter/Return*. We do this by adding `event: { keypress: keyPressed }` to the `data-bind` attribute. Finally, update the `class` attribute to indicate the input is a `todo-input`, add a `placeholder` attribute and remove the unused `<button>` element:

    <div id="brjstodo.todo.todoinput.view-template">
      <div>
        <input type="text" class="todo-input"
               data-bind="value:todoText.value,
                          valueUpdate:'afterkeydown', 
                          event: { keypress: keyPressed }"
               placeholder="What needs to be done?" />
      </div>
    </div>

If you refresh your Workbench and change the value in the input element you'll instantly see the value updated in the Workbench Tool under *Presentation Model -> todoText -> value*. Clicking the button will now log the message that's been entered into the input.

![](/docs/use/img/hello-bladerunnerjs-workbench.png)

## Testing a Blade

A core concept with BRJS is building a JavaScript application that scales. One of the best ways to ensure that an application scales is to ensure it is maintainable via thorough testing. So, let's write a test - by default BRJS uses [JSTestDriver](https://code.google.com/p/js-test-driver/).

<div class="alert alert-info github">
  <p>
    Part of our plugin architecture will eventually <a href="https://github.com/BladeRunnerJS/brjs/issues/8">support additional unit test runners</a>.
  </p>
</div>

### Write the Test

When you scaffold a new Blade a test class is also created. The scaffolded test can be found in `todoinput/tests/test-unit/js-test-driver/tests/ExampleClassTest.js`:

    (function() {

      ExampleClassTest = TestCase("ExampleClassTest");

      ExampleClassTest.prototype.testSomething = function() {
        assertEquals(1, 1);
      };

    } )();

The simplest test we can write at the moment is to check that the `todoText` field is initialized with an empty string value.

    (function() {
  
      ExampleClassTest = TestCase('ExampleClassTest');
    
      ExampleClassTest.prototype.testTodoTextFieldIsInitialized = function() {
        var todoInputBlade = new brjstodo.todo.todoinput.ExamplePresentationModel();
    
        assertEquals( '', todoInputBlade.message.todoText.getValue() );
      };

    } )();

### Run the Test

Within `unzip_location/conf/test-runner.conf` you will fine configuration for locations of browsers. Uncomment and update the configuration file according to your operating system and the location of the browsers you would like to use for your testing.

<div class="alert alert-warning github">
  <p>
    We presently have a bug that at least a single browser needs to be defined in <code>unzip_location/conf/test-runner.conf</code> even if you run the test server with the "no browser" option (<code>brjs test-server -b none</code>). In that case <a href="https://github.com/BladeRunnerJS/brjs/issues/183">it should not be necessary to set update this configuration file</a>.
  </p>
</div>

There are a few ways to run the tests using JSTestDriver, but the simplest is probably to start the test server using the CLI:

    $ unzip_location/sdk/brjs test-server -b none

The test server will then continue running in the terminal/console that you started it in.

Then in the web browser (or browsers) you wish to execute the tests in navigate to `http://localhost:4224/capture?strict`. This browser is now waiting for the test server to instruct it to run tests. You do this by opening up another terminal/console tab/window and executing `unzip_location/sdk/brjs test path_to_directory_to_scan_for_tests`. In our case we just want to run the `todoinput` tests. So, assuming we're in the `unzip_location/sdk/` directory the command would be:

    $ ./brjs test ../apps/brjs-todo/todo-bladeset/blades/todoinput/

If all goes well you should see output similar to the following:

    BladeRunner version: BRJS-dev, built: 26 September 2013

    Server already running, not bothering to start a new instance...

    Testing tests (UTs):
    Chrome: Reset
    Chrome: Reset
    .
    Total 1 tests (Passed: 1; Fails: 0; Errors: 0) (2.00 ms)
      Chrome 30.0.1599.101 Windows: Run 1 tests (Passed: 1; Fails: 0; Errors 0) (2.00 ms)
    Tests Passed.

If you wanted to run all the tests for the application you would execute:

    $ ./brjs test ../apps/brjs-todo

We've now created our first Blade, seen it running in a Workbench, updated the Blade and seen the change in the Workbench, and written a simple test to check the View Model initialized state. It's time to create our second Blade.

## Create a Todo Items Blade

Create a second blade to show the Todo list items. As with the first Blade, we do this using the CLI:

    $ unzip_location/sdk/brjs create-blade brjs-todo todo todoitems

This will create all the same assets that were created for the first blade, but in a `todoitems` directory.

Open up the newly generated `ExamplePresentationModel.js` and update the JavaScript as follows:

    caplin.thirdparty('caplin-br');
    
    ( function() {
    
      var br = require( 'br' );
      
      function ExamplePresentationModel() {
        var DisplayField = br.presenter.node.DisplayField;
        var NodeList = br.presenter.node.NodeList;

        var items = [ new DisplayField( 'foo' ), new DisplayField( 'bar' ) ];
        this.items = new NodeList( items );
      };
      br.extend( ExamplePresentationModel, br.presenter.PresentationModel );

      brjstodo.todo.todoitems.ExamplePresentationModel = ExamplePresentationModel;

    } )();

The class has a member variable called `items` that is an instance of a `NodeList`. This list object will contain a list of Todo list items, each of which should be a `DisplayItem`.

Next we need to update the View HTML template to loop over the `items` list and display each one in an unordered list. Since Presenter is built on Knockout we can do this using the [`foreach`](http://knockoutjs.com/documentation/foreach-binding.html) binding.

Update the `todoitems` view, `unzip_location/apps/brjs-todo/todo-bladeset/blades/todoitems/resources/html/view.html`, to have the following HTML:

    <div id="brjstodo.todo.todoitems.view-template">
      <ul class="todo-list" data-bind="foreach:items">
        <li class="view">
          <label data-bind="text:value"></label>
        </li>
      </ul>
    </div>

If you ensure the BRJS development server is running (`unzip_location/sdk/brjs start`) and launch the Workbench for this Blade via `http://localhost:7070/brjs-todo/todo-bladeset/blades/todoitems/workbench/` you'll see the two hard-coded list items.

![](/docs/use/img/todo-items-workbench.png)

## Inter-Blade communication using an EventHub

We now have a way for a user to input a todo list item and a place to show the items. But, how do we get the Blades to communicate with each other, so that when an item is added in one blade it is shown on the other? One way of doing this is to use an [EventHub](/docs/concepts/event_hub). BRJS has a *Demo Event Hub* [service](/docs/concepts/services) (`br.demo-event-hub`), that we plan to replace with a more permanent solution, but it's fine for the purposes of this guide.

<div class="alert alert-info github">
  <p>
    The <a href="https://github.com/BladeRunnerJS/brjs/issues/10">EventHub isn't a default application service</a> right now. This is a priority feature.
  </p>
</div>

### Update the Todo Input Blade

Back in our `todoinput` Blade we can access the EventHub service using the [ServiceRegistry](/docs/concepts/service_registry), which we `require`, as shown in the `ExamplePresentationModel` constructor below:

    caplin.thirdparty( 'caplin-br' );
    
    ( function() {

      var ENTER_KEY_CODE = 13;

      var br = require( 'br' );
      var ServiceRegistry = require( 'br/ServiceRegistry' );
    
      function ExamplePresentationModel() {
        this.todoText = new br.presenter.node.Field( '' );
        this.eventHub = ServiceRegistry.getService( 'br.demo-event-hub' );
      };
      br.extend( ExamplePresentationModel, br.presenter.PresentationModel );
    
      ExamplePresentationModel.prototype.keyPressed = function() {
        if( event.keyCode === ENTER_KEY_CODE ) {
          var todoTextValue = this.todoText.value.getValue();
          console.log( todoTextValue );
        }
      };
    
      brjstodo.todo.todoinput.ExamplePresentationModel = ExamplePresentationModel;
    } )();


Now, in the `keyPressed` function we can trigger an event called `todo-added` on a `todo-list` channel to tell any interested parties (the `todoitems` Blade) that a new Todo list item has been input, and the user has indicated they want to add it. We can also clear down the `input` element value.

    caplin.thirdparty( 'caplin-br' );

    ( function() {

      var ENTER_KEY_CODE = 13;

      var br = require( 'br' );
      var ServiceRegistry = require( 'br/ServiceRegistry' );
      
      function ExamplePresentationModel() {
        this.todoText = new br.presenter.node.Field( '' );
        this.eventHub = ServiceRegistry.getService( 'br.demo-event-hub' );
      };
      br.extend( ExamplePresentationModel, br.presenter.PresentationModel );
      
      ExamplePresentationModel.prototype.keyPressed = function( data, event ) {
        if( event.keyCode === ENTER_KEY_CODE ) {
          var todoTextValue = this.todoText.value.getValue();
          this.eventHub.channel( 'todo-list' ).trigger( 'todo-added', { text: todoTextValue } );
          this.todoText.value.setValue( '' );
        }

        return true;
      };
      
      brjstodo.todo.todoinput.ExamplePresentationModel = ExamplePresentationModel;

    } )();

Before we update the `todoitems` Blade to listen for this event, let's first see how services make it really easy to test our blades.

#### Testing in the Workbench

<div class="alert alert-info github">
  <p>
    In a future version of this getting started guide we'll show how you can easily add test code to the Workbench, or Workbench Tools, to faciliate this testing. However, the auto-generated code for the Workbench would add unnecessary complexity to this guide. See: <a href="https://github.com/BladeRunnerJS/brjs/issues/76">zero-conf workbenches</a>.
  </p>
</div>

Ensure the BRJS server is running (`unzip_location/sdk/brjs start`) and open up the `todoinput` Workbench via `http://localhost:7070/brjs-todo/todo-bladeset/blades/todoinput/workbench/`. If you enter some text and press *Enter* you'll see a message appear in the JavaScript console via a logger in the Demo Event Hub service. You can manually inspect this to ensure the information logged is as expected.

![](/docs/use/img/testing-in-the-workbench.png)

#### Testing via a Unit Test

Because we've introduced the concept and usage of the `ServiceRegistry` to our tests we should add a JSTestDriver `setUp` function to `todoinput/tests/test-unit/js-test-driver/tests/ExampleClassTest.js`. In this function we can create a `fakeEventHub` to capture any events that are triggered. We then deregister any existing services with the `br.demo-event-hub` identifier and then register our fake event hub. The `fakeEventHub` variable has a scope so that it's accessible to the new test (the first test doesn't need to be updated):

    ;(function() {
      var ServiceRegistry = require( 'br/ServiceRegistry' );
  
      var fakeEventHub;
      var fakeChannel;
      
      ExampleClassTest = TestCase('ExampleClassTest');
  
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
  
        // ensure there isn't already an event-hub registered
        ServiceRegistry.deregisterService( 'br.demo-event-hub' );
  
        // Register the fake event hub
        ServiceRegistry.registerService( 'br.demo-event-hub', fakeEventHub );
      };
    })();


Now add the new test to ensure that when the `keyPressed` function is executed (which will normally be called via the user pressing *Enter* in the `<input>` element) that an event is triggered on the Event Hub.

    ExampleClassTest.prototype.testEnterKeyPressedTriggersEventOnEventHub = function() {
      // Initialize
      var testTodoTextValue = 'write some code and test it';
      var todoInputBlade = new brjstodo.todo.todoinput.ExamplePresentationModel();
      todoInputBlade.todoText.value.setValue( testTodoTextValue );
    
      // Execute test
      todoInputBlade.keyPressed( null, { keyCode: 13 } );
    
      // Verify
      assertEquals( 'todo-list', fakeEventHub.channelName );
      assertEquals( 'todo-added', fakeChannel.eventName );
      assertEquals( testTodoTextValue, fakeChannel.data.text );
    };

The test initializes the `todoinput` Blade, sets a Todo text value we expect to be present within the event data, calls the `keyPressed` function with a fake event object and verifies that the event is triggered on the expected channel, with the expected event name and data values.

Now that the test is written ensure the test server is running (`unzip_location/sdk/brjs test-server`) and execute the `todoinput` tests:

    $ ./brjs test ../apps/brjs-todo/todo-bladeset/blades/todoinput/

You should see confirmation that the tests pass:

    ..
    Total 2 tests (Passed: 2; Fails: 0; Errors: 0) (3.00 ms)
      Chrome 30.0.1599.101 Windows: Run 2 tests (Passed: 2; Fails: 0; Errors 0) (3.00 ms)
    Tests Passed.

    - Time Taken: 2secs

### Update the Todo Items Blade

Now the `todoinput` Blade is triggering an event on the EventHub, the `todoitems` Blade should be updated to listen for that event and update the UI accordinly.

First, get access to the ServiceRegistry and then register for the event on the channel:

    caplin.thirdparty('caplin-br');
    
    ( function() {

      var br = require( 'br' );
      var ServiceRegistry = require( 'br/ServiceRegistry' );
    
      function ExamplePresentationModel() {
        var DisplayField = br.presenter.node.DisplayField;
        var NodeList = br.presenter.node.NodeList;

        var items = [ new DisplayField( 'foo' ), new DisplayField( 'bar' ) ];
        this.items = new NodeList( items );
    
        // get the event hub
        this.eventHub = ServiceRegistry.getService( 'br.demo-event-hub' );
     
        // register to recieve events
        this.eventHub.channel( 'todo-list' ).on( 'todo-added', this._todoAdded, this );
      };
      br.extend( ExamplePresentationModel, br.presenter.PresentationModel );


      ExamplePresentationModel.prototype._todoAdded = function( added ) {
        // TODO: update this.items
      };

      brjstodo.todo.todoitems.ExamplePresentationModel = ExamplePresentationModel;

    })();

In the code above we listen for `todo-added` events that are triggered on the `todo-list` channel. Whenever those events are triggered the `_todoAdded` instance function is called. We ensure the `this` context is maintained by passing in `this` as the third parameter to the `eventHub.on` function.

Now that the object is informed whenever a new Todo item is added, we can update the View Model data within the `_todoAdded` handler function.

    caplin.thirdparty('caplin-br');
    
    ( function() {

      var br = require( 'br' );
      var ServiceRegistry = require( 'br/ServiceRegistry' );
    
      function ExamplePresentationModel() {
        var DisplayField = br.presenter.node.DisplayField;
        var NodeList = br.presenter.node.NodeList;
        this.items = new NodeList( [ new DisplayField( 'foo' ), new DisplayField( 'bar' ) ] );
    
        // get the event hub
        this.eventHub = ServiceRegistry.getService( 'br.demo-event-hub' );
    
        // register to recieve events
        this.eventHub.channel( 'todo-list' ).on( 'todo-added', this._todoAdded, this );
      };
    
      br.extend( ExamplePresentationModel, br.presenter.PresentationModel );
    
      ExamplePresentationModel.prototype._todoAdded = function( added ) {
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
    
      brjstodo.todo.todoitems.ExamplePresentationModel = ExamplePresentationModel;
    } )();

#### Testing in the Workbench

Open up the `todoitems` Workbench via `http://localhost:7070/brjs-todo/todo-bladeset/blades/todoitems/workbench/` ensuring the BRJS development web server is running (`unzip_location/sdk/brjs start`). Open up the JavaScript console and enter the following code:

    var sr = require( 'br/ServiceRegistry' );
    var hub = sr.getService( 'br.demo-event-hub' );
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

    caplin.thirdparty( 'caplin-br' );
    
    ( function() {
    
      var ServiceRegistry = require( 'br/ServiceRegistry' );
  
      var fakeEventHub;
      var fakeChannel;
          
      ExampleClassTest = TestCase('ExampleClassTest');
  
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
  
        // ensure there isn't already an event-hub registered
        ServiceRegistry.deregisterService( 'br.demo-event-hub' );
  
        // Register the fake event hub
        ServiceRegistry.registerService( 'br.demo-event-hub', fakeEventHub );
      };
    
    })();


<div class="alert alert-info">
  <p>
    If this weren't a getting started guide we'd probably create a class that can be shared between the two Blades that implements the same interface as the <code>br.demo-event-hub</code> service, and use it for testing.
  </p>
</div>   

This code ensures that any interaction with the `br.demo-event-hub` service is captured so that we can test it. Our test will then simply check that the correct channel name is being subscribed to, the appropriate event is being bound to and that it is the `todoItemsBlade` that is doing the binding:

    ExampleClassTest.prototype.testTodoItemsBladeListensToItemAddedEvents = function() {
      var todoItemsBlade = new brjstodo.todo.todoitems.ExamplePresentationModel();

      assertEquals( fakeEventHub.channelName , 'todo-list' );
      assertEquals( fakeChannel.eventName , 'todo-added' );
      assertEquals( fakeChannel.context , todoItemsBlade );
    };
    

Now you can execute the tests ensuring that the test server is running (`./brjs test-server`) and at least one browser is connected (`http://localhost:4224/capture?strict`):

    $ ./brjs test ../apps/brjs-todo/todo-bladeset/blades/todoitems/
    BladeRunner version: BRJS-dev, built: 26 September 2013

    Server already running, not bothering to start a new instance...

    Testing tests (UTs):
    Chrome: Reset
    .
    Total 1 tests (Passed: 1; Fails: 0; Errors: 0) (3.00 ms)
      Chrome 30.0.1599.66 Mac OS: Run 1 tests (Passed: 1; Fails: 0; Errors 0) (3.00 ms)
    Tests Passed.

    - Time Taken: 2secs

As explained above, we also want to make sure the View Model is updated with a new item when the `todo-added` event is received:

    ExampleClassTest.prototype.testItemsViewModelAddsItemOnTodoAddedEvent = function() {
      var todoItemsBlade = new brjstodo.todo.todoitems.ExamplePresentationModel();

      var itemText = 'hello';

      // trigger the callback
      fakeChannel.callback.call( fakeChannel.context, { text: itemText } );

      // check the item has been added to the end of the list
      var items = todoItemsBlade.items.getPresentationNodesArray();
      assertEquals( itemText, items[ items.length - 1 ].value.getValue() );
    };

Re-running the test command will now show two tests successfully passing.

Since we know that Blade uses the EventHub to receive new items, and we have a fake hub in place, we can execute the callback that the Blade is waiting for, passing Todo item data, and then check that the item has been added to the end of the list.

Both the `todoinput` and `todoitems` Blades have the functionality that we're looking for, and they are set up to communicate using the `br.demo-event-hub` service. The next thing to do is to add them to an application [Aspect](/docs/concepts/aspects). We'll then have a fully functional Todo List app.

## Adding the Blades to an Aspect

In order to add the Blades to the default aspect we need to first update the aspect HTML to provide some basic structure. Open up `brjs-todo/default-aspect/index.html` and updated it to look as follows:

    <!DOCTYPE html>
    <html>
      <head>
        <base href="@APP.VERSION@"/>
        
        <title>My Application</title>

        <@css.bundle theme="standard"@/>

      </head>
      <body>

        <section id="todoapp">
          <header id="header">
            <h1>todos</h1>
          </header>
          <section id="main"></section>
          <footer id="footer"></footer>
        </section>

        <@js.bundle@/>
        <script>
          ( function() {
            var oApp = new brjstodo.App();
          } )();
        </script>
      </body>
    </html>

The `<@css.bundle theme="standard"@/>` tag is replaced at build time with a reference to a CSS bundle and the `<@js.bundle@/>` with a reference to the bundled JavaScript source. The element with the ID of `header` will have the Todo Input element appended to it and the section with the ID of `main` will have the Todo List appended to it. You'll also see that we initialize our application object here.

Open `brjs-todo/default-aspect/src/brjstodo/App.js` and in the `App` class create two instances of the objects we've just defined and tested; an Input `ExamplePresentationModel` and an Items `ExamplePresentationModel`:

    ;( function() {

      var App = function() {

        // pass in the HTML template identifier and View Model
        var PresenterComponent = br.presenter.component.PresenterComponent;

        // todo input Blade
        var inputModel = new brjstodo.todo.todoinput.ExamplePresentationModel();
        this.inputComponent = new PresenterComponent( 'brjstodo.todo.todoinput.view-template', inputModel );

        // todo items Blade
        var itemsModel = new brjstodo.todo.todoitems.ExamplePresentationModel();        
        this.itemsComponent = new PresenterComponent( 'brjstodo.todo.todoitems.view-template', itemsModel );

        // TODO: attach UI
      };

      brjstodo.App = App;

    } )();

From earlier, you'll remember that these classes extended something called `PresentationModel` - part of the BRJS [Presenter library](/docs/concepts/presenter/) - which means these classes are View Models. We can therefore use these models with something called `PresenterComponent` to use them within our Aspect. As well as passing in the View Model to the `PresenterComponent` constructor we also pass a HTML template identifier (which you'll also have seen in the HTML examples earlier).    

At this point we haven't added anything to our default aspect and it will look exactly as it did at the start of this guide.

In order for the Blade components to appear in the aspect we have to append the DOM elements that the `PresenterComponent` instances create to the Aspect - the main view into the Todo List web app. We do this by creating a `SimpleFrame` object and passing in the component to the constructor, then we can access the generated element via a `getElement` function on the frame object and simply appending it to the appropriate element in the DOM; for the Input we append to an element with an ID of `header` and for the List we append to an element with the ID of `main`:

    ;( function() {

      var App = function() {

        // pass in the HTML template identifier and View Model
        var PresenterComponent = br.presenter.component.PresenterComponent;

        // todo input Blade
        var inputModel = new brjstodo.todo.todoinput.ExamplePresentationModel();
        this.inputComponent = new PresenterComponent( 'brjstodo.todo.todoinput.view-template', inputModel );

        // todo items Blade
        var itemsModel = new brjstodo.todo.todoitems.ExamplePresentationModel();        
        this.itemsComponent = new PresenterComponent( 'brjstodo.todo.todoitems.view-template', itemsModel );

        var inputFrame = new br.component.SimpleFrame( this.inputComponent );
        document.getElementById( 'header' ).appendChild( inputFrame.getElement() );

        var itemsFrame = new br.component.SimpleFrame( this.itemsComponent );
        document.getElementById( 'main' ).appendChild( itemsFrame.getElement() );
      };

      brjstodo.App = App;

    } )();

If we refresh the application we'll now see the Input and the Todo List appended to the view.

![](/docs/use/img/unstyled-app.png)

Finally, we *really* need to apply some styling to the application.

Styling can be applied at a number of levels; from Blade through to Aspect. In our case we'll apply the styling at a the Aspect level. Since we've already covered the key points in developing a BRJS application we're going to miss out the styling part. Download the two files from the [BRJS Todo App github repo](https://github.com/BladeRunnerJS/brjs-todo/tree/master/default-aspect/themes/standard) and place them in `brjs-todo/default-aspect/themes/standard/`. Then refresh the app.

![](/docs/use/img/styled-app.png)

You now have a reasonable looking Todo List app based on the styling of [Todo MVC](http://todomvc.com/) that you can add items to. Now for deployment.

## Build and Deploy

For the moment we only support deploying as a [.WAR](http://en.wikipedia.org/wiki/WAR_file_format_(Sun)) file so we'll cover building and deploying to [Apache Tomcat](http://tomcat.apache.org/).

<div class="alert alert-info github">
  <p>
    We know only support WAR deployment is very restrictive so <a href="https://github.com/BladeRunnerJS/brjs/issues/18">supporting a Flat File build and deployment</a> is a priority.
  </p>
</div>

All that you need to do to build the .WAR file is use the `war` command:

    $ ./brjs war brjs-todo
    BladeRunner version: BRJS-dev, built: 26 September 2013

    Successfully created war file

Deploying to Tomcat is a simple as copying the `brjs-todo.war` file to the Tomcat `webapps` directory:

    $ cp brjs-todo.war path_to_tomcat_install/webapps/

By default Tomcat runs on port 8080. Once it's running (`path_to_tomcat_install/startup.sh` or `path_to_tomcat_install/startup.bat`) navigate to `localhost:8080/brjs-todo` to see your application running in a deployed environment.

## Summary

This comprehensive getting started guide has introduced you to [Blades](/docs/concepts/blades/), running Blades in isolation in [Workbenches](/docs/concepts/workbenches/), seeing how Workbenches help the development process, unit testing Blades, inter-Blade communication using an [EventHub](/docs/concepts/event_hub/), how [Services](/docs/concepts/services/) facilitate testing, incorporating Blades into application [Aspects](/docs/concepts/aspects) and deploying your BRJS application.

Believe it or not, this just scrapes the surface of BladeRunnerJS. So...

## Where next?

### Finish the Todo App

The getting started app doesn't offer 100% Todo App functionality. How about adding:

* Marking a Todo Item as complete
* Deleting a Todo Item
* Edit a Todo Item
* Persisting data to a backend **Service**
* Making the Todo List collaborative by using a [realtime service](http://www.leggetter.co.uk/real-time-web-technologies-guide)

### Explore the Docs

Read up more about the [concepts](/docs/concepts) behind BRJS, discover additional ways to [use](/docs/use/) BRJS or how you can [extend](/docs/extend/) BRJS to improve your developer workflow.

### Get Involved

BRJS is an open source project that we really want others to get involved in through using, sharing and contributing. You can do this by watching [BRJS on github]({{ site.social.github_link }}) and getting involved in the discussions. By building applications using BRJS and sharing your thoughts, findings and code. By [extending BRJS](/docs/extend/) through creating plugins that improve your developer workflow and sharing what you've done. Or by contributing to the core codebase.
