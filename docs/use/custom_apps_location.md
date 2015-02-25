---
layout: docs
title: Custom Apps Location
permalink: /docs/use/custom_apps_location/
---

BRJS apps may be stored in either the `apps` directory, which is located parallel to the `sdk` directory, or in a user-created `brjs-apps` directory, which can be located anywhere. When the `brjs` command is run, BRJS locates the first app directory it can find relative to the directory the command is being run from.

It does this by traversing up through the parent directories of the current working directory, looking for a directory named `apps` having a sibling `sdk` directory, or otherwise just a directory named `brjs-apps`. In the case where both of these exist then `apps` will be preferred, since `brjs-apps` are designed for freeform use within arbitrary locations.

For example, given the following folder structure:

```
.
+-- root
|   +-- dir1
|   +-- brjs-apps
|   |   +-- app1
|   |   |   +-- blades
|   |   |   |   +-- myblade
|   |   |   +-- index.html
|   |   |   +-- app.conf
|   |   |   +-- index.html
|   |   +-- app2
```

if we then invoke the following command while located in the `blades` directory:

```bash
brjs workbench-deps app1 default myblade
```

then BRJS will iterate through `blades`' ancestors (`app1`, `brjs-apps` & `root`), only stopping at `root` as it contains a `brjs-apps` directory.

If a `brjs-apps` directory is not found when the traversal of the ancestors has finished, BRJS will assume that the applications are stored in `$BRJS_HOME$/brjs-apps`.

## Backwards Compatibility
Please note that in traversing up through the parent directories of the current working directory the command was called from, the `apps` directory having a sibling `sdk` directory will be recognized as the preferred location for BRJS applications if found.

## Apps in Multiple Locations
BRJS apps may now be stored in several different locations, the active working directory being determined through the path the BRJS commands are run from.
