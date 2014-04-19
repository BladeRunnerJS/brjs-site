---
layout: docs
title: Running Tests
permalink: /docs/use/running_tests/
---

Tests of any kind are executing using the `brjs test` command which uses [JS Test Driver](https://code.google.com/p/js-test-driver/). This means that both code and business tests can be executed at the same time if required, using the same test runner.

## Running tests with configuration

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

## Running tests with specific browsers

You can also run the tests and specify which browsers you wish to run the tests against. To do this you need to have the browsers configured in `test-runner.conf` (as above) and use call the `brjs test` command passing a `-b` flag and browser options, as follows:

To target different browsers an additional parameter is passed to the bladerunner test-server, or bladerunner test commands, as documented in the output of the  bladerunner test help command.

    $ ./brjs test <tests-path> -b <browsers>

Above, `browsers` is a comma separated list of labels used for each browser in the `browserPaths` section of the `testrunner.conf` file. i.e. Chrome, Firefox, Internet Explorer, etc. You can add additional labels with your own names (e.g. ie10) if you want to test against particular versions of a browser.

An example of running tests for the `brjs-todo` app using Firefox and Chrome would be:

    $ ./brjs test ../apps/brjs-todo -b firefox,chrome

*Note: firefox and chrome would need to be commented out in `test-runner.conf`*

## Running tests without setting config

If you would rather not set configuration you can instead start the test server and pass the `--no-browser` flag to indicate no browsers need to be configured:

    $ ./brjs test-server --no-browser

This will start the test server listening on the port identified by the `portNumber` option in `BRJS_HOME/conf/test-runner.conf`. By default this is 4224. You can then navigate to `http://localhost:4224` which will set the browser listening for tests to run, and then execute tests and passing the path to the tests you want to run.

Run all tests for the `brjs-todo` application:

    $ ./brjs test ../apps/brjs-todo

Run the tests for just the `todo-input` Blade:

    $ ./brjs test ../apps/brjs-todo/todo-bladeset/blades/todo-input
