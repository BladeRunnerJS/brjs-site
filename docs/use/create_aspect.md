---
layout: docs
title: How to Create an Aspect
permalink: /docs/use/create_aspect/
---

In order to create an [aspect](/docs/concepts/aspect/) you first need to [create an application](/docs/use/create_app).

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

Now that you know how to create an aspect you should take a look at [adding a
blade to an aspect](/docs/use/add_blade_to_aspect/).
