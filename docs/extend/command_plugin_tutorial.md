---
layout: docs
title: CommandPlugin Tutorial
permalink: /docs/extend/command_plugin_tutorial/
---

The `CommandPlugin` is the simplest extension point for **BladeRunnerJS** (*BRJS*). As the plugin name suggests, it gives you the ability to define commands that you can execute via the `brjs` command in the form `brjs <your_command_plugin_name>`.

A BladeRunnerJS `CommandPlugin` also has access to the `BRJS` model so have all the information you need to manipulate applications, blades and much more, along with any other functionality you wish to implement. And, of course, since you are building a plugin you can then share this functionality with other team members or the wider BRJS community.

This tutorial we'll introduce you to the basic concepts by creating a very simple **EchoCommandPlugin** that echos out the input arguments that you pass to it.

## Requirements

* Java 7
* Eclipse IDE - used in this tutorial, but it will be easy to convert these steps to using another IDE.
* BladeRunnerJS - of course, you'll need BladeRunnerJS installed.

## Create a Project

Create a new Java Project

**File &rarr; New &rarr; Java Project**

![](/docs/extend/img/command_plugin_tutorial/new-java-project.png)

Give your project a name and ensure the project is set to use a Java 7 JRE.

![](/docs/extend/img/command_plugin_tutorial/new-java-project-dialog.png)

## Reference brjs-core.jar

In order to implement the plugin you need to reference the JAR that `CommandPlugin` is defined in. The exact name of this JAR differs per build but it will be in the form `brjs-core-VERSION.jar`.

**Right-click on the Project &rarr; Properties &rarr; Java Build Path &rarr; Libraries &rarr; Add External JARs… &rarr; browser to the BRJS_install_directory/sdk/libs/java/system &rarr; select `brjs-core-VERSION.jar` and `jsap-2.1.jar` &rarr; Open &rarr; OK to close Properties dialog**

![](/docs/extend/img/command_plugin_tutorial/add-library-jar-reference.png)

<p class="fig-text">Please note: The above image shows a development version of the JAR with a <em>BRJS-dev</em> suffix being referenced</p>

This will result in `brjs-core-VERSION.jar` and `jsap-2.1.jar` being shown under *Referenced Libraries* within your project.

![](/docs/extend/img/command_plugin_tutorial/referenced-libraries.png)

## Create an EchoCommandPlugin Class

Create a new `EchoCommandPlugin` class which extends the `ArgsParsingCommandPlugin` abstract class. This class implements the `CommandPlugin` interface, but also provides helper argument parsing and command help-text functionality.

You can do this by:

**Right-click on the `src` folder &rarr; New &rarr; Class**

In the *New Java Class* dialog enter your plugin namespace e.g. `org.bladerunnerjs.examples` and a class name e.g. `EchoCommandPlugin`.

Make the class have a Superclass of type `ArgsParsingCommandPlugin`, which you can do this from the *New Java Class* dialog.

**Superclass &rarr; Browser... &rarr; type "ArgsParsingCommandPlugin" into the input &rarr; select in the Matching Items &rarr; OK**

![](/docs/extend/img/command_plugin_tutorial/command-plugin-new-class.png)

Close the *New Java Class* dialog by clicking *OK* and the new class will be generated for you.

For example:

    package org.bladerunnerjs.examples;

    import org.bladerunnerjs.core.plugin.command.ArgsParsingCommandPlugin;
    import org.bladerunnerjs.model.BRJS;
    import org.bladerunnerjs.model.exception.command.CommandArgumentsException;
    import org.bladerunnerjs.model.exception.command.CommandOperationException;

    import com.martiansoftware.jsap.JSAP;
    import com.martiansoftware.jsap.JSAPException;
    import com.martiansoftware.jsap.JSAPResult;

    public class EchoCommandPlugin extends ArgsParsingCommandPlugin {

      @Override
      public String getCommandDescription() {
        return null;
      }

      @Override
      public String getCommandName() {
        return null;
      }

      @Override
      public void setBRJS(BRJS brjs) {
      }

      @Override
      protected void configureArgsParser(JSAP argsParser) throws JSAPException {
      }

      @Override
      protected void doCommand(JSAPResult result) throws CommandArgumentsException,
          CommandOperationException {
      }

    }

  
*<small>Note: the method arguments in the code above have been changed to be more meaningful than the auto-generated defaults</small>.*

## Implement the Plugin methods

The class methods are called at different points in the plugins lifecycle:

* `setBRJS` is called when the plugin is discovered passing a reference to the BRJS model.
* `getCommandName` is called to discover which command String the plugin is interested in, in addition to being used along with `getCommandDescription` when a list of available commands are requested via `brjs help`.
* `getCommandDescription` is called when help is requested specifically for the registered command e.g. `brjs help echo`.
* `configureArgsParser` is called after the object is constructed. A `JSAP` instance is passed giving the plugin an opportunity to use that object to described the arguments that it accepts and how they affect the Plugin's behaviour.
* `doCommand` is called when the command is executed.

Let's these methods and implement our `EchoCommandPlugin`.

### setBRJS

We won't be using the BRJS core model functionality in this plugin, but it also provides access to logging and console functions; the latter of which we will use. So, let's keep a reference to it:

    private BRJS brjs;

    @Override
    public void setBRJS(BRJS brjs) {
      this.brjs = brjs;
    }

### getCommandName

Let's start with the `getCommandName` method  which BRJS uses to identify what command the plugin wishes to handle. In our case we want to handle the `echo` command. So, update the `getCommandName` method to return a string with the value `"echo"`.

    @Override
    public String getCommandName() {
      return "echo";
    }
  
### getCommandDescription

The `getCommandDescription` method is used to provide a short descriptive message about the purpose of the plugin. It is displayed along with the names and descriptions of other plugins when you run `brjs help`.

    @Override
    public String getCommandDescription() {
      return "echos out the input arguments that you pass to it";
    }

We can use the same text we used earlier to describe our plugin.

### configureArgsParser

`configureArgsParser` gives us the opportunity to set required and optional parameters and their help text. However, for our simple plugin we don't actually need any named parameters. Instead we'll create a **greedy** `com.martiansoftware.jsap.UnflaggedOption`. What this means is that there isn't any name for the parameter on the command line and it will capture all the input arguments:

    @Override
    protected void configureArgsParser(JSAP argsParser) throws JSAPException {
      UnflaggedOption messageOption = new UnflaggedOption("message")
                                            .setGreedy(true);
      argsParser.registerParameter(messageOption);
    }
  
### doCommand

Finally, we want to handle the executing command. The `doCommand` is called and the arguments supplied to the command line input can be accessed via the `JSAPResult` parameter. From this we get all the arguments from the command line using `result.getStringArray`:

    @Override
    protected void doCommand(JSAPResult result) throws CommandArgumentsException,
        CommandOperationException {
      String[] messageArgs = result.getStringArray("message");
      String echo = java.util.Arrays.toString(messageArgs);
      this.brjs.getConsoleWriter().println(echo);
    }
  
Ok, this doesn't just echo out the input exactly as entered. It will actually be surrounded with square brackets and the space-separated input arguments will be comma-separated e.g.

    $ brjs echo this should echo everything I type
    [this, should, echo, everything, I, type]

<div class="alert alert-info">
  <p>
    For more information on arguments parsing see the <a href="/docs/extend/command_plugin_argument_parsing_guide/">CommandPlugin argument parsing guide</a>.
  </p>
</div> 

Our plugin functionality is now complete. But we've a little more work to do yet.

## Exposing our CommandPlugin as a service

BladeRunnerJS uses the Java [ServiceRegistry](http://docs.oracle.com/javase/7/docs/api/javax/imageio/spi/ServiceRegistry.html) for it's plugin architecture. Because of this we need to add a file that states which Interface our plugin implements and the name of the class that implements it.

The first thing to do is to create a *resources* source folder.

**Right-click on the project &rarr; New &rarr; Source Folder**

Within that create a *META-INF* sub directory and within that a *services* directory. You will now have a *services* folder with the path of *project_root/resources/META-INF/services*.

We now need to create a file with a name that matches the full namespace of the Interface we are implementing a service for; the `CommandPlugin` interface.

**Right-click on the service folder &rarr; New &rarr; File &rarr; input "org.bladerunnerjs.core.plugin.command.CommandPlugin" &rarr; Finish**

![](/docs/extend/img/command_plugin_tutorial/new-service-file-dialog.png)

In the new file add a line with the full namespace to the plugin class we've just created:

    org.bladerunnerjs.examples.EchoCommandPlugin

## Building and deploying the plugin JAR

In Eclipse, building the JAR is as simple as:

**Right-click on the project &rarr; Export &rarr; Java &rarr; JAR File &rarr; BRJS_install_directory/conf/java (create the "conf" and "java" directories if it doesn't already exist)**

![](/docs/extend/img/command_plugin_tutorial/export-jar-finish.png)

## Using the plugin

Now if you run `brjs help` you should see your new plugin listed along side the existing plugins. In the case of the `EchoCommandPlugin` we now see an entry as follows:

    $ brjs help
    BladeRunner SDK version: BRJS-dev, built on: 02 September 2013
  
    Possible commands:
      echo:           echos out the input arguments that you pass to it
      ...

<div class="alert alert-info">
  <p>
    <strong>It's not working!</strong>
  </p>
  <p>
    There are a number of steps that we've just gone through where it's possible to make minor mistakes that result in the command plugin not being discovered by BRJS. Here's what to double-check:
  </p>
  <ul>
    <li><strong>Is the <code>resources</code> folder a <em>source folder</em>?</strong> It need to be in order for the files to be included in the exported JAR.</li>
    <li><strong>Is the path to the resource file <code>resources/META-INF/services</code>?</strong> Again, it's a required path.</li>
    <li><strong>Is the file correctly named <code>org.bladerunnerjs.core.plugin.command.CommandPlugin</code>?</strong> This is the classpath to the <code>CommandPlugin</code> Interface and needs to be correct for the JAR to be picked up as a service, and thus used as a Plugin.</li>
    <li><strong>Is the path to your Plugin class correct within the resource file?</strong> For the tutorial it should <code>org.bladerunnerjs.examples.EchoCommandPlugin</code>. It's long so it can be easy to make a mistake</li>
  </ul>
  <p>
    Hopefully if you check all of these you'll get to the bottom of any problems. If not, please post an issue in the <a href="{{ site.social.github_issues_link }}">BRJS github issues</a>.
  </p>
</div>    
    
You can ask for usage information:

    $ brjs help echo
    BladeRunner SDK version: BRJS-dev, built on: 02 September 2013

    Description:
    echos out the input arguments that you pass to it
    Usage:
      brjs echo <argument1> <argument2> <argumentx>
    
And finally I can execute the plugin command and see the information I provide an input echoed back to me:

    $ brjs echo this should echo everything I type
    BladeRunner SDK version: BRJS-dev, built on: 02 September 2013

    [this, should, echo, everything, I, type]

Although this plugin is absolutely useless, this provides you with all the information you need to create a truely useful `CommandPlugin`. You can find the source code for this example plugin in the [brjs-example-plugins](https://github.com/BladeRunnerJS/brjs-example-plugins) project in github.

Please let us know what you build via [@BladeRunnerJS](https://twitter.com/BladeRunnerJS) or by posting a [BladeRunnerJS github issue]({{ site.social.github_issues_link }}).