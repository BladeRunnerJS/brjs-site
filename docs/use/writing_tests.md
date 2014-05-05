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

<p class="doc-feedback alert alert-warning">
  Coming soon...
</p>
