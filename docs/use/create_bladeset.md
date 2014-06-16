---
layout: docs
title: How to Create a Bladeset
permalink: /docs/use/create_bladeset/
---

In order to create a bladeset you first need to create an application. Follow our guide to [creating an app](/docs/use/create_app).

As with apps, there are two ways to create an app

- Via the Command Line Interface (CLI) or
- Via the Web dashboard

We will go through both these ways below. Remember, you only need to follow one of the options as they both achieve the same thing.

##Option 1. Creating a bladeset via the CLI

Once you have an application you can create a bladeset as follows:

```bash
$ ./brjs create-bladeset <app-name> <bladeset-name>
```

### Example

The following command will create a bladeset called `todo` which is part of the `brjstodo` app.

```bash
$ ./brjs create-bladeset brjstodo todo
```

The `todo` bladeset is represented on disk by a directory called `todo-bladeset` that resides under the `brjstodo` app directory.

##Option 2. Creating an app using the web dashboard

Start the BRJS development server by by entering

```bash
./brjs serve
```
on the command line and navigate to `http://localhost:7070`. Click on the relevant app and select ‘New bladeset’.

###Example

We are going to create a bladeset called `todo` within our existing app `brjstodo` which should be showing on your dashboard.

![](/docs/use/img/create-bladeset-brjstodo-app.png)

Open the app by clicking the button.

![](/docs/use/img/create-bladeset-brjstodo-icon.png)

As the app does not currently contain any bladesets, there is nothing displayed here yet.
Click the button in the top lefthand corner which says ‘New Bladeset’

![](/docs/use/img/create-bladeset-empty.png)

This brings up the a window which prompts you enter a bladeset name.

![](/docs/use/img/create-bladeset-new.png)

Enter the bladeset name `todo`

![](/docs/use/img/create-bladeset-new-icon.png)

You will now see the name of the new bladeset displayed on the dashboard.

![](/docs/use/img/create-bladeset-new-todo.png)



If you hover over the bladeset box, you will see that you have two options ‘add blade’ and ‘run tests’. We go into more detail about adding blades on the [How to create a blade](/docs/use/create_blade/) document.

##Results

Whichever method you have used to create your new bladeset, you will see that BladeRunnerJS has created a new folder called “todo-bladeset” within apps/brjstodo. Within the bladeset directory you'll find the following:

* `resources` - for everything else
* `src` - for the JavaScript for the bladeset
* `tests` - for the bladeset tests
* `themes` - for CSS and images

<div class="alert alert-info">
<p>
In future:
</p>

<ul>
  <li><a href="https://github.com/BladeRunnerJS/brjs/issues/2">Bladesets will be optional</a>. Right now a Blade must reside within a BladeSet</li>
  <li>The <a href="https://github.com/BladeRunnerJS/brjs/issues/1">CLI will be context-aware</a> so you can run brjs create-bladeset from within an application directory to create a BladeSet for an app.</li>
</ul>

</div>

## Where next?

- Now that you know how to create a bladeset you should take a look at [creating blades](/docs/use/create_blade/).

- To find out more about bladesets, visit our [bladeset concept](/docs/concepts/blades/) page.
