---
layout: docs
title: CommandPlugin Argument Parsing Guide
permalink: /docs/extend/command_plugin_argument_parsing_guide/
---

## CommandPlugin Interface

The `CommandPlugin` interfaces provides a very simple `void doCommand( String[] args )` method. If you create a command Plugin using just the Interface then you will need to parse the arguments yourself.

## ArgsParsingCommandPlugin Helper

If you use the `ArgsParsingCommandPlugin` abstract class when creating your command plugin you get help when setting up and parsing command arguments. In this case you will uses the [Java Simple Argument Parser](http://www.martiansoftware.com/jsap/)<sup>†</sup> by Martian Software and the signature for the command execution method is `void doCommand( JSAPResult result )`.

In this case the following references will be of use:

* [JSAP User Guide](http://www.martiansoftware.com/jsap/doc/)
* [JSAP API Reference (JavaDocs)](http://www.martiansoftware.com/jsap/doc/javadoc/)
* [JSAP source code](http://sourceforge.net/projects/jsap/)

<small>† Please note this page suggests the library isn't maintained. However, it was actually last updated on 11 April 2013</small>