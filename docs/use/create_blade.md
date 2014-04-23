---
layout: docs
title: How to Create a Blade
permalink: /docs/use/create_blade/
---

In order to create a [Blade](/docs/concepts/blades/) you first need to [create an application](/docs/use/create_app) and then [create a BladeSet](/docs/use/create_bladeset/) (although we plan to [make BladeSets optional](https://github.com/BladeRunnerJS/brjs/issues/2)).

Once you have an application and a BladeSet you can create a Blade as follows:

```bash
$ ./brjs create-blade <app-name> <bladeset-name> <blade-name>
```

### Example

The following command will create a Blade called `input` in the `todo` BladeSet which is part of the `brjstodo` app.

{% include docs/use/create_blade_example.md %}

## Where next?

Now that you know how to create a Blade you should take a look at [adding that
Blade to an Aspect](/docs/use/add_blade_to_aspect/).
