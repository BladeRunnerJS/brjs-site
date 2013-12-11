---
layout: docs
title: Writing and Running Tests
permalink: /docs/use/writing_and_running_tests/
---

## Writing Unit Tests

Within a BRJS application the tests reside with the functionality they are written to test. In the case of a unit tests they should be in a `tests/test-unit` directory where `test` is at the same level as the `src` directory where the functional code is located.

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

```javascript
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

See below for how to run the test.

## Writing Business Tests

<p class="doc-feedback alert alert-warning">
  Coming soon...
</p>

## Running Tests

Tests of any kind are executing using the `brjs test` command which uses [JS Test Driver](https://code.google.com/p/js-test-driver/). This means that both code and business tests can be executed at the same time if required, using the same test runner.

### Running tests with configuration

By default executing test requires browser locations to be configured. The configuration file can be found in `BRJS_HOME/conf/test-runner.conf`.

This file contains the most common paths to browser installations. Simply comment out the lines appropriate to your browsers or update the paths if required. For example:

```bash
browserPaths:
  mac:
    # chrome enabled
    chrome: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" 
#    firefox: /Applications/Firefox.app/Contents/MacOS/firefox
#   !!safari is currently not supported in this version of BladeRunner!!
#    safari: /Applications/Safari.app/Contents/MacOS/Safari
```

Now you can execute tests by running the `brjs test` command and supplying a path to the tests you wish to execute. You can run tests for an application at different levels of granularity - from all application tests through to tests for a single Blade or library - by passing the `test` command the approprate path.

Run all tests for the `brjs-todo` application:

    $ ./brjs test ../apps/brjs-todo

Run the tests for just the `todo-input` Blade:

    $ ./brjs test ../apps/brjs-todo/todo-bladeset/blades/todo-input

### Running tests without setting config

If you would rather not set configuration you can instead start the test server:

    $ ./brjs test-server

This will start the test server listening on the port identified by the `portNumber` option in `BRJS_HOME/conf/test-runner.conf`. By default this is 4224. You can then navigate to `http://localhost:4224` which will set the browser listening for tests to run, and then execute tests and pass the `--no-browser` flag and passing the path to the tests you want to run.

Run all tests for the `brjs-todo` application:

    $ ./brjs test --no-browser ../apps/brjs-todo

Run the tests for just the `todo-input` Blade:

    $ ./brjs test --no-browser ../apps/brjs-todo/todo-bladeset/blades/todo-input

