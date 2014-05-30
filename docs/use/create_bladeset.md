---
layout: docs
title: How to Create a Bladeset
permalink: /docs/use/create_bladeset/
---

In order to create a [bladeset](/docs/concepts/bladeset/) you first need to [create an application](/docs/use/create_app).

Once you have an application you can create a bladeset as follows:

```bash
$ ./brjs create-bladeset <app-name> <bladeset-name>
```

### Example

The following command will create a bladeset called `todo` which is part of the `brjstodo` app.

{% include docs/use/create_bladeset_example.md %}

Within the bladeset directory you'll find the following:

* `blades` - a directory where all the blades for that bladeset will be found
* `resources` - for everything else
* `src` - for the JavaScript for the bladeset
* `tests` - for the bladeset tests
* `themes` - for CSS and images

## Where next?

Now that you know how to create a bladeset you should take a look at [creating blades](/docs/use/create_blade/).

Or you could take a look at [testing BRJS applications](/docs/concepts/testing).
