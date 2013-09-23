---
layout: docs
title: Getting Started
permalink: /docs/use/getting_started/
---

<p><strong>This guide provides you with a basic overview of getting started with BladeRunnerJS (BRJS), including covering some of the core concepts.</strong></p>

This isn't your typical 2 minute getting started guide - it probably takes around 10 minutes. This is because BRJS is meant to help you build large-scale applications, so we need to go into a bit of detail in order to cover things like developing using Workbenches, cross-blade communication using the EventHub and services.

It'll be 10 minutes well-spent.

## Download & Install BRJS

Download the [latest BRJS](#TODO) release and unzip it somewhere. The BRJS CLI excutable is `unzip_location/sdk/brjs`.

<div class="alert alert-block">
	<p>
		We're working towards a global install. For the moment you'll need to execute the <code>brjs</code> command via <code>unzip_location/sdk/brjs</code>.
	</p>
</div>

## Create an Application

Create a new application using the CLI:

    unzip_location/sdk/brjs app:create brjs-todo

This will create a new application called `brjs-todo` within the `unzip_location/apps` directory. Within that directory you'll also find a `default-aspect` directory. [Aspects](/docs/concepts/aspects/) represent entry points to your application and are a way of bringing together the Blades required for a specific *presentation* of your app.

In there you'll find an `index.html` entry point along with a `src` directory for your JavaScript, a `themes` directory for your CSS and images, and a `resources` directory for everything else.

## Create a BladeSet

Create a new BladeSet within the application using the CLI:

    unzip_location/sdk/brjs bladeset:create brjs-todo todo

This creates a folder called `todo-bladeset` within the application. For now we don't need to worry about BladeSets. All you need to know right now is that within the BladeSet directory there's a `blades` directory where we're going to create our blades - our functionality.

<div class="alert alert-block">
	<p>
		In future:
	</p>
	<ul>
		<li><a href="/docs/concepts/bladesets/">BladeSets</a> will be optional. Right now a Blade must reside within a BladeSet</li>
		<li>The CLI will be context-aware so you can run <code>brjs bladeset:create</code> from within an application directory to create a BladeSet for an app.</li>
	</ul>
</div>

Now we can create our first Blade and start developing.

## Develop a Blade

Create a new blade using the CLI:

    unzip_location/sdk/brjs blade:create brjs-todo todo todoinput

This creates a `todoinput` directory containing the following sub-directories:

* `src` - for the JavaScript for the Blade
* `tests` - for the blade tests
* `themes` - for CSS and images
* `workbench` - for the [Workbench](/docs/concepts/workbenches) for the Blade we're developing
* `resources` - for everything else

<div class="alert alert-block">
	<p>
		In future:
	</p>
	<ul>
		<li>A default blade will be created when an application is created</li>
		<li>The CLI will be context aware so you can run <code>brjs blade:create</code> from within an application directory to create a blade for an app.</li>
	</ul>
</div>

Within the `todoinput` directory you'll find an `ExampleClass.js` file. This represents 

* View the code for the Blade
* Run the Blade in a Workbench
* Edit the Blade code and see the change in the workbench
* Test the Blade

## Create a second Blade

* Demonstrate communction between the blades via the EventHub
* Demonstrate interacting with a Blade via EventHub in a Workbench

## Create a service

* Do in-memory persistence stating that it could be swapped out for real persistence or LocalStorage

## Build and Deploy

* Simple deploy to local Tomcat. Note that flat-file deploy is a priority.

## Where next?