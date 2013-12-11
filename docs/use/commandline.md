---
layout: docs
title: Using the Command Line
permalink: /docs/use/commandline/
---

The `brjs` executable is available to use for Windows, Mac and Linux. It is located in `BRJS_HOME/sdk`.

## Help

To get general help execute:

    $ BRJS_HOME/sdk/brjs help

To get help for a specific command use:

    $ BRJS_HOME/sdk/brjs help <command-name>

## Start the Development Server

To start the development server run:

    $ BRJS_HOME/sdk/brjs serve

This will start the server on port 7070. If you wish to change the port the server starts on you can update the value of the `jettyPort` configuration option in `BRJS_HOME/conf/bladerunner.conf`.

<div class="doc-feedback alert alert-info">
  <p>In future versions of BRJS:</p>
  <ul>
    <li>The <a href="https://github.com/BladeRunnerJS/brjs/issues/281">port number should be configurable as a flag passed to the <code>serve</code> command</a></li>
    <li><a href="https://github.com/BladeRunnerJS/brjs/issues/280"><code>bladerunner.conf</code> will be renamed to <code>brjs.conf</code></a></li>
  </ul>
</div>