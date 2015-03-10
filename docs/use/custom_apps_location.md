---
layout: docs
title: Custom Apps Location
permalink: /docs/use/custom_apps_location/
---

Apps for BRJS should be stored within a `brjs-apps` directory. When the `brjs` command is run, BRJS will attempt to locate a `brjs-apps` directory in either the current working directory or any of it's parent directories. If the directory can be found it will be used for the location of apps, otherwise a `brjs-apps` directory located next to the `sdk` directory will be used.

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

then BRJS will look upwards through `blades`' ancestors (`app1`, `brjs-apps` & `root`), stopping at `root` since it contains the `brjs-apps` directory.

If a `brjs-apps` directory is not found when the traversal of the ancestors has finished, BRJS will assume that the applications are stored in `$BRJS_HOME$/brjs-apps`.

## Backwards Compatibility
If an `apps` directory alongside an `sdk` directory is found in one of the parent directories, the `apps` directory will be used and a warning will be logged. This provides backwards compatability for any apps using the legacy location. If the `apps` directory is used *only* apps within that directory will be available and any new apps created will be created inside the `apps` directory. You should move all apps into `brjs-apps` and delete the `apps` directory to remove the warning.

## Apps in Multiple Locations
BRJS apps may now be stored in several different locations, the current working directory will be used to determine which apps are available.

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
+-- root2
	+-- somedir
|   |   +-- brjs-apps
|   |   |   +-- another-app
```

Commands run within the directory `root/brjs-apps` will have `app1` and `app2` available while commands run within `root2/somedir/brjs-apps` will have `another-app` available. Any new apps will be created in the currently active `brjs-apps` directory.
