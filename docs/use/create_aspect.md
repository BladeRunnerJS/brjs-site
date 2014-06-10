---
layout: docs
title: How to Create an Aspect
permalink: /docs/use/create_aspect/
---

In order to create an [aspect](/docs/concepts/aspect/) you first need to [create an application](/docs/use/create_app). Follow our guide to creating an app before you follow the instructions below.

<div class="alert alert-info">
<p>
Note that unlike apps, bladesets and blades, aspects can not currently be created on the BladeRunnerJS dashboard. Future releases will support [creating aspects from the dashboard](/https://github.com/BladeRunnerJS/brjs/issues/647).
</p>
</div>

Once you have an application you can create an aspect as follows:

```bash
$ ./brjs create-aspect <app-name> <aspect-name>
```

This will create an aspect with the name provided in the `aspect-name` parameter
in the application identified by the `app-name` parameter.

### Example

The following command will create an aspect called `mobile` for the `brjstodo` app:

```bash
$ ./brjs create-aspect brjstodo mobile
```

As part of this a `mobile-aspect` directory is created in the `brjstodo` application
directory.

In the newly created aspect directory you'll find an `index.html` entry point a `src` directory for your JavaScript, a `themes` directory for your CSS and images, and a `resources` directory for everything else. You can view this default aspect by starting the BRJS development server:

    $ ./brjs serve

This will start the development web server running on localhost port 7070. You can view the aspect by navigating to `http://localhost:7070/brjstodo/mobile`.

## Where next?

- You may have already created bladesets and blades for your app, if not, take a look at [Creating Bladesets](/docs/use/create_bladeset/).
- Once you have created aspects and blades, you should take a look at [adding a blade to an aspect](/docs/use/add_blade_to_aspect/).
- For more information about aspects, see the [aspects](/docs/concepts/aspects/) concept page.