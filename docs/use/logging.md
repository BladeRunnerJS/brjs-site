---
layout: docs
title: Logging
permalink: /docs/use/logging/
---

BladeRunnerJS comes with a library that enables you to generate custom log messages of various severity levels, from anywhere within your application.

The library is called [fell](https://github.com/BladeRunnerJS/fell) and is available as a standalone library. *Usage of fell is optional*, but you should consider using it if any of the following goals fit your application logging requirements:

* Very low cost when logging at a level not in use.
* Friendly to unit testing.
* Allows you to log at different levels from within different pieces of code.
* Quick and easy to get started with.

##  Getting the Log object.

As with any library in a BRJS application the `fell` library is required and then a `Log` object can be referenced for use:

```js
var Log = require('fell').Log;
```

## The Default Logger

The default configuration has it outputting to the console (if one is available), so you can start
using it immediately:

```js
Log.info( 'Log messages by default have {0} replaced {1}.',
          'numbers surrounded by curly braces',
          'by their arguments');
Log.warn( 'The levels supported are fatal, error, warn, info and debug' );
```

## Specific Loggers

You can get more finely grained control if you log to specified loggers within your modules or
classes.

```js
function MyClass() {
  this.log = Log.getLogger( 'mymodule.MyClass' );
}

MyClass.prototype.doAThing = function() {
  this.log.warn( 'The thing that MyClass does is potentially dangerous!' );
};

var myObj = new MyClass();
myObj.doAThing();
```

## Configuration

To take advantage of this control, you can configure particular loggers to log at particular levels.

You can set up your logging by calling configure before initializing the BRJS application or within a Workbench.  It takes up to three arguments. The first argument is the default log level that will be done for all loggers that don't have more specific configuration.

The second argument is a map containing logger names to the levels that they should log at.  This
is interpreted hierarchically, so in the above example the logger `mymodule.MyClass` will log at
level `info`, since it matches the `mymodule` configuration.  The logger `mymodule.some.hierarchy`
will log at level `fatal`, as will any loggers with names that start `mymodule.some.hierarchy.`.

The third argument is an array of destinations that log events should be routed too.  If you don't
pass anything (as in the above example), this will default to an array containing only a logger that
outputs to the console object in environments that support this.

```js
Log.configure( 'error', {
  'mymodule': 'info',
  'mymodule.some.hierarchy': 'fatal'
} );
```

Calling `Log.configure` clears the state of the logger, so the levels, configuration and log
destinations are all reset.

If you want to modify the logging while in use you can use methods specifically for that:

```js
var fell = require( 'fell' );
var Log = fell.Log;

// Changes the log level for things not configured specifically.
Log.changeLevel( 'error' );

// Changes the log level for mymodule.MyClass and things below it.
Log.changeLevel( 'mymodule.MyClass', 'warn');

// Adds a new destination that stores the most recent 10 log events.
var store = new fell.destination.LogStore( 10 );
Log.addDestination( store );

// Removes the previously added destination.
Log.removeDestination( store );
```

## Testing

Care must be taken when testing for log messages in order to avoid writing fragile tests.

In order to help with this, the provided LogStore destination detects when it's loaded with [JsHamcrest](http://danielfm.github.io/jshamcrest)
integrated, and provides a number of jshamcrest matchers to be used when unit testing.

Here's an example of usage:

```js
// code under test
var Log = require( 'fell' ).Log;

function MyObject(parameter) {
  this.log = Log.getLogger('mymodule.MyObject');

  this.info( MyObject.LOG_MESSAGES[ 'initialising' ], MyObject.version, parameter );
}

MyObject.LOG_MESSAGES = {
  'initialising': 'Initialising MyObject, version {0}, with parameter {1}.'
};

MyObject.version = "1.2.3";

// test code

// Note:  This will only work if JsHamcrest.Integration.jasmine() was run
// sometime before the LogStore was defined.

describe('My object', function() {
  var Log = fell.Log;
  var LogStore = fell.destination.LogStore;

  var store;

  beforeEach( function() {
    store = new LogStore();
    Log.configure("info", {}, [store]);
  } );

  it('when constructed, logs at info with its version and the parameter.', function() {
    var myObj = new MyObject(23);

    assertThat(store, LogStore.contains(
      LogStore.event(
        'info',
        'mymodule.MyObject',
        [ MyObject.LOG_MESSAGES[ 'initialising' ] , MyObject.version, 23 ]
      )
    ) );

    // or if the only thing we really care about is that the parameter
    // is in the log message:

    assertThat(store, LogStore.contains(
      LogStore.event(
        anything(), anything(), hasItem(23)
      )
    ) );

  } );
}
```

The provided matchers, `LogStore.contains`, `LogStore.containsAll` and `LogStore.event` also accept
JsHamcrest matchers as arguments.  You can make your tests less brittle by accepting anything that
makes sense for the code to do.  So if your code currently logs at 'debug', but it would also make
sense for it to log the same message at 'info', check against `either('debug').or('info')` rather
than checking against what your code actually does.

There is no matcher to check that no other log messages have been logged, since this is a test
antipattern - future code changes may add more log messages, causing your tests to break even
when there is no bug.

In the above example, I store the actual text of the log message in a staticly referenced map with
the code under test, and check against that rather than a hardcoded string.  This way, the text of
the message can be changed easily without breaking the tests.

The fell logger by default uses a string interpolation function so that the parts of the message
that change do not break the message matching and so that they can be compared separately.

Fell matchers don't require you to test every log message. This is desirable, as many log messages
don't form part of your public interface, and testing them would increase the frailty of the tests
without providing any benefit.

## Where next?

You can take a look at the [fell logging library on GitHub](https://github.com/BladeRunnerJS/fell), read up on the [BRJS module system](/docs/concepts/modules/) or find out more about [JSHamcrest](http://danielfm.github.io/jshamcrest).
