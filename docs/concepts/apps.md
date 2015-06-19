---
layout: docs
title: Apps
permalink: /docs/concepts/apps/
---

In BladeRunnerJS an App is a collection of [Aspects](/docs/concepts/aspects/), [BladeSets](/docs/concepts/bladesets/) and [Libraries](/docs/concepts/libraries/). Apps also contain an [`app.conf`](/docs/use/config/), which configures app wide specific settings, but don't contain any code themselves. This is because your [Aspects](/docs/concepts/aspects/) make up the different views for your app.

To create a new app use the command

```bash
$ ./brjs create-app <app-name> <app-require-prefix>
```

for example:

```bash
$ ./brjs create-aspect example-app appx
```

This will create a new app, a default [Aspect](/docs/concepts/aspects/) to get you started and some very basic code. The `require-prefix` is the prefix that every require path will have in your library. This is to make it unique across your codebase so it doesn't clash with library require prefixes.
