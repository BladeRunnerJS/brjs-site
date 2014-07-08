---
layout: docs
title: Bladesets
permalink: /docs/concepts/bladesets/
layout: docs
title: Bladesets
permalink: /docs/concepts/bladesets/
---

Bladesets provide a way of grouping related blades so that they can share common code or resources.

<div class="alert alert-info">
  <p>Note: In future releases, <a href="https://github.com/BladeRunnerJS/brjs/issues/2">bladesets will be optional</a>. For now, a Blade must reside within a bladeset </p>
</div>

## Benefits of Bladesets

As well as sharing code, bladesets can also share assets such as styles, HTML templates and images. This allows you to create logical groupings of blades that display information in a consistent way. For instance: you would use a bladeset to share the custom code for numerical formatting in a set of blades, or to house a common date-chooser configuration.

When creating code, you should aim to keep as much of it as possible within your individual blades. This  enables the blades to operate separately from one another. However, a benefit of using bladesets is that  if there are common pieces of code that are shared between different blades, you can move the shared code into the parent bladeset.

As well as sharing code between different blades, you may find that you sometimes need to share code between different bladesets. Bladesets are designed to be independent of the app in which they run, so in order to do this, you’ll need to put it in a  library. To find out how to do this, see [How to use Libraries](/docs/use/use_libraries/).

## How to Use Bladesets

You can create new aspects on the BRJS dashboard or via the command line interface by executing the following instruction:

```bash
$ ./brjs create-bladeset <app-name> <bladeset-name>
```
For example:

```bash
$ ./brjs create-bladeset brjstodo todo
```

## Where Next?

The [creating bladesets](/docs/use/create_bladeset/) docs will give you more information on creating bladesets and what you will find in a bladeset directory.

Once you have created your bladesets, you can start [creating blades](/docs/use/create_blade/) to go in them.

To understand how to create and edit libraries, see [Using Libraries](/docs/use/use_libraries/).
