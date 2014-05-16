---
layout: docs
title: How to Create an App
permalink: /docs/use/create_app/
---

The first stage in building an application with BladeRunnerJS (BRJS) is to create
the skeleton for an application. This is can be achieved via the CLI or the web
dashboard.

## Creating an app using the CLI

You can create an App as follows:

```bash
$ ./brjs create-app <app-name> [<require-prefix>]
```

* `app-name` is the name of the application you want to create. A directory will
be created in `BRJS_HOME/apps` with this name.
* `require-prefix` is an *optional* parameter for the prefix to be used in `require`
statements when referencing JavaScript [modules](/docs/concepts/modules/).

## Creating an app using the web dashboard

![](/docs/use/img/new-app-btn.png)

### Example

{% include docs/use/create_app_example.md %}
