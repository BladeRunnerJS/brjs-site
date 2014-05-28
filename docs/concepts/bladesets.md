---
layout: docs
title: Bladesets
permalink: /docs/concepts/bladesets/
---

**Bladesets** provide a way of grouping related [blades](/docs/concepts/blades) 
so that they can share common code or resources. We show you how to create a 
bladeset in the Getting Started Guide.

<div class="alert alert-info github">
  <p>
    In future <a href="https://github.com/BladeRunnerJS/brjs/issues/2">Bladesets will be optional</a>. Right now a blade must reside within a bladeset.
  </p>
</div>

You can create new bladesets on the BRJS dashboard or via the command line interface
by executing the following instruction:

```bash
$ ./brjs create-bladeset <existing app-name> <bladeset-name>
```
For example:

```bash
$ ./brjs create-bladeset brjstodo todo
```

For more detailed information see the [creating bladesets docs](/docs/use/create_bladeset).

As well as sharing code, bladesets can also share assets such as styles, HTML 
templates and images. This allows you to create logical groupings of blades that 
display information in a consistent way. For instance: you would use a bladeset 
to share the custom code for numerical formatting in a set of blades, or to house 
a common date-chooser configuration.

You can put your code in one of four places: a [library](/docs/concepts/libraries),
an [aspect](/docs/concepts/aspects/), a bladeset or a [blade](/docs/concepts/blades/). 

While your aim should be to have as much code as possible inside the blade, if
you find that you need to share code between blades, you can move the shared code
into their parent bladeset. 

You may find you need to share some code between different bladesets. Bladesets 
are designed to be independent of the app in which they run, so if you want to 
do this, you’ll have to put it in a library.

## Where next?

* [Aspects](/docs/concepts/aspects/)
* [Blades](/docs/concepts/blades/)
* [Libraries](/docs/concepts/libraries/)
