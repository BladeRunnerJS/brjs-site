---
layout: docs
title: How to Create a Blade
permalink: /docs/use/create_blade/
---

In order to create a blade, you first need to create an application and then create a bladeset (although we plan to make bladesets optional in the future).

There are two ways to create a blade

- Via the Command Line Interface (CLI) or
- Via the Web dashboard

We will go through both these ways below. Remember, you only need to follow one of the options as they both achieve the same thing.

## Option 1. Creating a blade via the CLI

Once you have an application and a BladeSet you can create a Blade as follows:

```bash
$ ./brjs create-blade <app-name> <bladeset-name> <blade-name>
```
### Example

The following command will create a Blade called `input` in the `todo` BladeSet which is part of the `brjstodo` app.

```bash
$ ./brjs create-blade brjstodo todo input
```

The `input` blade is represented on disk by a directory called `input` that resides under the directory called `blades` in the `brjstodo` app directory.

## Option 2. Creating an app using the web dashboard

Start the BRJS development server by by entering the following on the command line:

```bash
./brjs serve
```

and navigate to `http://localhost:7070`. Click on the relevant app and select ‘Add blade’.

### Example

This example follows on from those in How to Create an App and How to Create a Bladeset where we created an app called `brjstodo` and a bladeset called `todo`.

We are now going to create a blade called `input` within the `todo` bladeset.

![](/docs/use/img/create-blade-todo-bladeset.png)

Hover over the bladeset box to make the bladeset options visible. Two options will show “Add Blade” and “Run Tests”

Click on “Add Blade” to bring up the below window.

![](/docs/use/img/create-blade-new.png)

Enter the blade name ‘input’.

![](/docs/use/img/create-blade-input.png)

You will now see the name of the new blades displayed underneath the bladeset name.

![](/docs/use/img/create-blade-input-icon.png)

##Results

This creates a `input` directory within `BRJS_HOME/brjs-apps/brjstodo/todo-bladeset/blades/` containing the following sub-directories:

- `src` - for the JavaScript for the Blade
- `tests` - for the blade tests
- `themes` - for CSS and images
- `workbench` - for the [Workbench](/docs/concepts/workbenches/) for the Blade we're developing
- `resources` - for everything else


<div class="alert alert-info">
<p>
In future:
</p>

<ul>
  <li><a href="https://github.com/BladeRunnerJS/brjs/issues/3">A default blade will be created when an application is created</a></li>
  <li>The <a href="https://github.com/BladeRunnerJS/brjs/issues/1">CLI will be context aware</a> so you can run <code>brjs create-blade</code> from within an application directory to create a blade for an app; you won't need to supply an app name, app namespace and bladeset name</li>
</ul>

</div>

## Where next?

- Now that you know how to create a Blade you should take a look at [adding that Blade to an Aspect](/docs/use/add_blade_to_aspect/).
- For a better understanding of blades, look at the [blades](/docs/concepts/blades/) concepts page.
