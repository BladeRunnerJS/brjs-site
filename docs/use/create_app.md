---
layout: docs
title: How to Create an App
permalink: /docs/use/create_app/
---

The first stage in building an application with BladeRunnerJS (BRJS) is to scaffold
the skeleton (default structure) for an application

There are two ways to create an app

- Via the Command Line Interface (CLI) or

- Via the Web dashboard

We will go through both these ways below. Remember, you only need to follow one of the options as they both achieve the same thing.

## Option 1. Creating an app using the CLI

You can create an App as follows:

```bash
$ ./brjs create-app <app-name> [<require-prefix>]
```

* `app-name` is the name of the application you want to create. A directory will
be created in `BRJS_HOME/apps` with this name.
* `require-prefix` is an *optional* parameter for the prefix to be used in `require`
statements when referencing JavaScript [modules](/docs/concepts/modules/).

### Example

Executing the following will create a new application called `brjstodo` within the `BRJS_HOME/apps` directory.

```bash
./brjs create-app brjstodo
```
## Option 2. Creating an app using the web dashboard

You can create an app from the web dashboard by starting the BRJS development
server:

```bash
./brjs serve
```

And navigating to `http://localhost:7070`. From there click the **New App** button
and follow the instructions.

### Example

Click the button ‘New App’

![](/docs/use/img/create-app-newapp.png)

This brings up the a window which prompts you enter an app name and namespace:

![](/docs/use/img/create-app-newapp-name.png)
*Note: this will change to require prefix in the future*

Enter the App Name ‘brjstodo’ and App Namespace ‘brjs todo’ and click ‘Create’.

![](/docs/use/img/create-app-newapp-name-brjstodo.png)

You’ll see that an app icon has now been added to the dashboard.

![](/docs/use/img/create-app-icon-brjstodo.png)

You can click on this icon to open it. However, as there are no bladesets yet created there is nothing displayed at the moment. Once you start creating bladesets, there will be more to see here.

![](/docs/use/img/create-app-empty-bladeset.png)

## Results

<div class="alert alert-info">
  <p>
    BRJS apps presently have to reside within an <code>apps</code> folder in the unzip directory. Future releases will allow for <a href="https://github.com/BladeRunnerJS/brjs/issues/1">apps to be located anywhere on disk</a>.
  </p>
</div>

Whichever method you use to create your new app, you will see that your new app automatically contains multiple directories including libraries and a `default-aspect` directory. In the aspect directory you'll find an `index.html` entry point a `src` directory for your JavaScript, a `themes` directory for your CSS and images, and a `resources` directory for everything else.

You can view this aspect by starting the BRJS development server (if you haven't done so already) and navigating to `http://localhost:7070/brjstodo`.

![](/docs/use/img/create-app-icon-brjstodo.png)

## Where next?

- Now that you have created an app, the next thing to do is to [create a bladeset](/docs/use/create_bladeset/)
- Once you have a bladeset, you will be able to start [creating blades](/docs/use/create_blade/).
- You may also want to create multiple aspects for your app instead of using the default aspect you have just created. Details on how to do this on the [Create an Aspect](/docs/use/create_aspect/) page.
