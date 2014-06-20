---
layout: docs
title: Writing Tests
permalink: /docs/use/writing_tests/
---

Within a BRJS application the tests reside with the functionality they are written to test.

* Blade tests are located in `<blade-name>/tests`
* BladeSet tests are located in `<bladeset-name>/tests`
* Aspect tests are located in `<aspect-name>/tests`
* Library tests are located in `<library-name>/tests`

## Unit Tests

### Syntax

By default,
assertions are made using the [js-test-driver assertion syntax](https://code.google.com/p/js-test-driver/wiki/Assertions).

It is possible to use any other JavaScript runtime testing framework
by simply including it; by default this would be via the `require` syntax e.g. `require( 'your-prefered-test-framework' )`.

### Structure

In the case of a unit tests they should be in a `tests/test-unit`.

For example, the contents of a Blade directory is:

```
|-resources/
|-src/
|- tests/
/*** New code ***/
|  |- test-unit/
/*** end of new code ***/
|- themes/
|- workbench/
```

### Example

In the following example we're going to test a single class for a `TodoItem` which would be found in the `src` directory. First, we can define the class:

``` javascript
function TodoItem( text ) {
  this.text = text || '';
  this.done = false;
}

TodoItem.prototype.setDone = function( done ) {
  this.done = done;
};

TodoItem.prototype.setText = function( text ) {
  this.text = text;
};

module.exports = TodoItem;
```

The `TodoItem` class has two properties; `text` for the Todo item text and `done` as a flag to indicate if the item has been completed. It is possible to set both of these via setter functions; `setDone` and `setText`. Let's assume that this class is defined within an application called `brjstodo` so the path to this class would be `brjstodo/TodoItem`.

We can then define a test for this class:

```js
TodoItemTest = TestCase( 'TodoItemTest' );

var TodoItem = require( 'brjstodo/TodoItem' );

TodoItemTest.prototype.setUp = function() {
  this.todoItem = new TodoItem();
};

TodoItemTest.prototype.test_text_can_be_set = function() {
  var text = 'write your first unit test'
  this.todoItem.setText( text  );
  assertEquals( this.todoItem.text, text );
};

TodoItemTest.prototype.tearDown = function() {
  this.todoItem = undefined;
};
```

The test above defines a new `TestCase` giving it a name. Then it uses `require` to reference the `TodoItem` class and initializes a member instance called `todoItem` on the `TodoItemTest`, within a `setUp` function. The `setUp` function is executed before each test is run. There is also a `tearDown` function that's executed after every test is run in which the `todoItem` is set to `undefined` in order to ensure not state is leaked into later tests (although in this case there aren't any right now).

The test, `test_text_can_be_set`, defines the text to be used in the test in a local `text` variable, calls `setText` passing in the variable, and then asserts that the `todoItem.text` has been set as expected.

See [running tests](/docs/use/running_tests/) for how to execute tests.

## Business Facing Acceptance Tests

The purpose of Business Facing Tests is to ensure that application business requirements are being met. In BRJS apps this is done by testing a full feature in isolation by:

1. **View Model &rarr; Service**: asserting changes in View Model state when the services behaving in particular ways
2. **Service &rarr; View Model**: asserting the interactions with services when manipulating the View Model

### Syntax

By default, assertions are made using the [jasmine](http://jasmine.github.io/1.3/introduction.html).

It is possible to use any other JavaScript runtime testing framework
by simply including it; by default this would be via the `require` syntax e.g. `require( 'your-prefered-test-framework' )`.

### Structure

These tests should be in a `tests/test-acceptance` directory.

For example, the contents of a Blade directory is:

```
|-resources/
|-src/
|- tests/
|  |- test-unit/
/*** New code ***/
|  |- test-acceptance/
/*** end of new code ***/
|- themes/
|- workbench/
```

### View Model &rarr; Service Example

In the following example we're going to ensure that text being entered and then the `Enter`/`Return` key being pressed in the view will result in a new todo item being added to the a Todo Service.

The View Model looks as follows:

```js
"use strict";

var ENTER_KEY_CODE = 13;

var ServiceRegistry = require( 'br/ServiceRegistry' );
var ko = require( 'ko' );

function InputViewModel() {
  this.todoText = ko.observable('');
  this._todoService = ServiceRegistry.getService( 'todomvc.storage' );
}

InputViewModel.prototype.keyPressed = function( data, event ) {
  if( event.keyCode === ENTER_KEY_CODE ) {
    var todoTextValue = this.todoText().trim();

    var todoItem = { title: todoTextValue };
    this._todoService.addTodo( todoItem );

    this.todoText( '' );
  }

  return true;
};

module.exports = InputViewModel;

```

The `keyPressed` function is called when the user presses a key in the view. This is defined in the following view and the binding of the view to the View Model is handled by Knockout:

```html
<div id="brjstodo.todo.input.view-template">
  <header class="input-component">
    <h1>todos</h1>
    <input type="text" class="todo-input"
           data-bind="value:todoText,
                       valueUpdate:'afterkeydown',
                       event: { keypress: keyPressed }"
           placeholder="what needs to be done?" />
  </header>
</div>
```

As we stated above, the purpose of this test is to make sure that pressing `Enter`/`Return` when text has been entered into the an `input` will result in the new todo item being added to a `todoService` by ensuring the `addTodo` has been called.

``` js
'use strict';

var ServiceRegistry = require( 'br/ServiceRegistry' );
var InputViewModel = require( 'brjstodo/todo/input/InputViewModel' );

require( 'jasmine' );

describe('The Input', function() {

  it( 'Should add new todo items to the TodoService', function() {
    // Setup
    var todoService = jasmine.createSpyObj( 'todos', [ 'addTodo' ] );
    ServiceRegistry.registerService( 'todomvc.storage', todoService );

    var testTodoTitle = 'write some code and test it';
    var todoInputBlade = new InputViewModel();

    /*** new code ***/
    // Set text in view model
    todoInputBlade.todoText( testTodoTitle );
    /*** end of new code ***/

    var expectedEventData = {
      title: testTodoTitle
    };

    // Execute test
    /*** new code ***/
    // simulate key press with enter keyCode
    todoInputBlade.keyPressed( null, { keyCode: 13 } );
    /*** end of new code ***/

    // Assert
    /*** new code ***/
    // assert service has been interacted with
    expect( todoService.addTodo ).toHaveBeenCalledWith( expectedEventData );
    /*** end of new code ***/
  } );

});

```

The `require( 'jasmine' )` ensures that jasmine is available for the tests. `jasmine.createSpyObj` is used to create a spy object (some may refer to this as a mock) and this is added to the `ServiceRegistry` before any other set up. This ensures the service is ready to be used by the feature functionality:

```js
var todoService = jasmine.createSpyObj( 'todos', [ 'addTodo' ] );
ServiceRegistry.registerService( 'todomvc.storage', todoService );
```

The View Model is then set up and manipulated as if the user were interacting with the view. Finally the interaction that has taken place is asserted against the spy:

```js
expect( todoService.addTodo ).toHaveBeenCalledWith( expectedEventData );
```

This achieves full feature acceptance testing from View Model through to service.

### Service &rarr; View Model Example

It's also possible to test service through to View Model by adding a test double (fake) service to the service registry and then asserting the state of the View Model.

<p class="doc-feedback alert alert-warning">
  Coming soon...
  <!-- TODO: create example of feature test based on TodoItemsView model interactions with TodoService -->
</p>

See [running tests](/docs/use/running_tests/) for how to execute tests.
