---
layout: docs
title: CommandPlugin Tutorial
permalink: /docs/extend/command_plugin_tutorial/
---

{% include docs/docs_first.html %}

The `CommandPlugin` is the simplest extension point for BladeRunnerJS. As the name suggests, it gives you the ability to define commands that you can execute via the `brjs` command in the form `brjs <your_command_plugin_name>`.

A BladeRunnerJS `CommandPlugin` also has access to the `BRJS` model so have all the information you need to manipulate applications, blades and much more, along with any other functionality you wish to implement. And, of course, since you are building a plugin you can then share this functionality with other team members or the wider BladeRunnerJS community.

This tutorial will show you how to create an *EchoCommandPlugin* which echos out the input arguments that you pass to it.

## Requirements

* Java 7
* Eclipse IDE - using in this tutorial, but it should be easy to convert these steps to using another IDE.
* BladeRunnerJS - of course, you'll need BladeRunnerJS installed.

## Create a Project

Create a new Java Project

*File -> New -> Java Project*

![](/docs/img/new-java-project.png)

Give your project a name and ensure the project is set to use a Java 7 JRE.

![](/docs/img/new-java-project-dialog.png)

## Reference brjs-core.jar

In order to implement the plugin you need to reference the JAR that `CommandPlugin` is defined in.

*Right-click on the Project -> Properties -> Libraries -> Add External JARs… -> browser to the BladeRunnerJS_install_directory/sdk/libs/java/system -> select brjs-core.jar -> Open -> OK to close Properties dialog*

![](/docs/img/add-library-jar-reference.png)

This will result in *brjs-core.jar* being shown under *Referenced Libraries* within your project.

![](/docs/img/referenced-libraries.png)

## Create an EchoCommandPlugin Class

Create a new `EchoCommandPlugin` class which implements the `CommandPlugin` Interface.

You can do this by:

*Right-click on the `src` folder -> New -> Class*

In the *New Java Class* dialog enter your plugin namespace e.g. `org.bladerunnerjs.examples` and a class name e.g. `EchoCommandPlugin`.

Ensure the class implements the `CommandPlugin` Interface. You can do this from the *New Java Class* dialog too.

*Interfaces -> Add… -> type "CommandPlugin" into the input -> select in the Matching Items -> OK*

![](/docs/img/command-plugin-new-class.png)

Close the *New Java Class* dialog by clicking *OK* and the new class will be generated for you, including stubs for the `CommandPlugin` interface.

For example:

	package org.bladerunnerjs.examples;
	
	import org.bladerunnerjs.core.plugin.command.CommandPlugin;
	import org.bladerunnerjs.model.BRJS;
	import org.bladerunnerjs.model.exception.command.CommandArgumentsException;
	import org.bladerunnerjs.model.exception.command.CommandOperationException;
	
	public class EchoCommandPlugin implements CommandPlugin {
	
		@Override
		public void setBRJS(BRJS brjs) {
			// TODO Auto-generated method stub
		}
	
		@Override
		public void doCommand(String[] args) throws CommandArgumentsException,
				CommandOperationException {
			// TODO Auto-generated method stub
		}
	
		@Override
		public String getCommandDescription() {
			// TODO Auto-generated method stub
			return null;
		}
	
		@Override
		public String getCommandName() {
			// TODO Auto-generated method stub
			return null;
		}
	
		@Override
		public String getCommandUsage() {
			// TODO Auto-generated method stub
			return null;
		}
	
	}
	
*<small>Note: the method arguments in the code above have been changed to be meaningful than the auto-generated defaults</small>.*

## Implement the CommandPlugin methods

The `CommandPlugin` Interface methods are called at different points in the plugins lifecycle. When the plugin is discovered the `setBRJS` method is called passing a reference to the BladeRunnerJS model.

`getCommandName` is called to discover which command String the plugin is interested in, in addition to being used along with `getCommandDescription` when a list of available commands are requested via `brjs help`.

`getCommandUsage` is called when help is requested specifically for the registered command e.g. `brjs help echo`.

Let's use each of these methods and implement our `EchoCommandPlugin`.

### setBRJS

We won't be using the BladeRunnerJS core model functionality in this plugin, but it also provides access to logging and console functions; the latter of which we will use. So, let's keep a reference to it:

	private BRJS brjs;

	@Override
	public void setBRJS(BRJS brjs) {
		this.brjs = brjs;
	}

### getCommandName

Let's start with the `getCommandName` method  which BladeRunnerJS uses to identify what command the plugin wishes to handle. In our case we want to handle the `echo` command. So, update the `getCommandName` method to return a string with the value `"echo"`.

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

### getCommandUsage

`getCommandUsage` gives us the opportunity to provide usage examples for our command. For a real world plugin it may be that it's actually easier for us to write this in some resources file and then read the contents from there. However, for our simple plugin we can provide a very simple usage example:

	@Override
	public String getCommandUsage() {
		return "brjs echo <argument1> <argument2> <argumentx>";
	}
	
### doCommand

Finally, we want to handle the executing command. The `doCommand` is called by BladeRunnerJS passing a `String[]` of arguments that have been supplied to the command line input.

	@Override
	public void doCommand(String[] args) throws CommandArgumentsException,
			CommandOperationException {
		String echo = Arrays.toString(args);
		this.brjs.getConsoleWriter().println(echo);
	}
	
Ok, this doesn't just echo out the input exactly as entered. It will actually be surrounded with square brackets and the arguments will be comma-separated e.g.

	$ brjs echo this should echo everything I type
	[this, should, echo, everything, I, type]

Our plugin functionality is now complete. But we've a little more work to do yet.

## Exposing our CommandPlugin as a service

BladeRunnerJS uses the Java [ServiceRegistry](http://docs.oracle.com/javase/7/docs/api/javax/imageio/spi/ServiceRegistry.html) for it's plugin architecture. Because of this we need to add a file that states which Interface our plugin implements and the name of the class that implements it.

The first thing to do is to create a *resources* source folder.

*Right-click on the project -> New -> Source Folder*

Within that create a *META-INF* sub directory and within that a *services* directory. You will now have a *services* folder with the path of *project_root/resources/META-INF/services*.

We now need to create a file with a name that matches the full namespace of the Interface we are implementing a service for; the `CommandPlugin` interface.

*Right-click on the service folder -> New -> File -> input "org.bladerunnerjs.core.plugin.command.CommandPlugin" -> Finish*

![](/docs/img/new-service-file-dialog.png)

In the new file add a line with the full namespace to the plugin class we've just created:

    org.bladerunnerjs.examples.EchoCommandPlugin

## Building and deploying the plugin JAR

In Eclipse, building the JAR is as simple as:

*Right-click on the project -> Export -> Java -> JAR File -> BladeRunnerJS_install_directory/conf/java (create the "conf" and "java" directories if it doesn't already exist)*

![](/docs/img/export-jar-finish.png)

## Using the plugin

Now if you run `brjs help` you should see your new plugin listed along side the existing plugins. In the case of the `EchoCommandPlugin` we now see an entry as follows:

	$ brjs help
	BladeRunner SDK version: BRJS-dev, built on: 02 September 2013
	
	Possible commands:
	  echo:           echos out the input arguments that you pass to it
	  ...
	  
I can ask for usage information:

    $ brjs help echo
	BladeRunner SDK version: BRJS-dev, built on: 02 September 2013

	Description:
	echos out the input arguments that you pass to it
	Usage:
	  bladerunner echo brjs echo <argument1> <argument2> <argumentx>
	  
And finally I can execute the plugin command and see the information I provide an input echoed back to me:

	$ brjs echo this should echo everything I type
	BladeRunner SDK version: BRJS-dev, built on: 02 September 2013

	[this, should, echo, everything, I, type]

Although this plugin is absolutely useless, this provides you with all the information you need to create a truely useful `CommandPlugin`.

Please let us know what you build via [@BladeRunnerJS](https://twitter.com/BladeRunnerJS) or by posting a [BladeRunnerJS github issue]({{ site.social.github_issues_link }}).