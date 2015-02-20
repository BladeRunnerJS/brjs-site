---
layout: docs
title: Custom Apps Location
permalink: /docs/use/custom_apps_location/
---

BRJS apps may be stored in either the `apps` directory, which is located in parallel to the `sdk` directory, or in a user-created `brjs-apps` directory. In case both of these exist, `brjs-apps` will be used. This means that new apps will be created in the `brjs-apps` folder and existing apps will be picked up from this folder as well.

In order to identify the user-created folder, BRJS will be looking through the ascendant folders of the location a command is called from. 

For example, say we have the following folder structure and that we call `brjs workbench-deps app1 default myblade` while located in the `blades` folder:

```
.
+-- folder1
+-- brjs-apps
|   +-- app1
|   |   +-- blades
|   |   |   +-- myblade
|   |   +-- index.html
|   |   +-- app.conf
|   |   +-- index.html
|   +-- app2
```

BRJS will start by looking if the current folder contains a directory titled `brjs-apps`. Since `blades` does not, it will move up the next level, at `app1` and perform the same check. `app1` does not contain a `brjs-apps` directory either, so moving up a level we reach `brjs-apps`, where we will also continue the traversal because it also does not contain a `brjs-apps` folder. When we reach `folder1` our search will stop as we have identified the location of `brjs-apps`, which is located here. Hence, BRJS will now be aware that the apps are located in this `brjs-apps`. 

This works well if the user is located in one of his apps' folders, as the `brjs-apps` will be picked up as one of its ascendants. 

Let's consider another scenario, in which `brjs-apps` is parallel to the original `apps` folder.

```
.
+-- apps
|   +-- app1
|   |   +-- blades
|   |   |   +-- myblade
|   |   +-- index.html
|   |   +-- app.conf
|   |   +-- index.html
+-- brjs-apps
|   +-- app1
|   |   +-- blades
|   |   |   +-- myblade
|   |   +-- index.html
|   |   +-- app.conf
|   |   +-- index.html
|   +-- app2
+-- conf
+-- sdk
```

If we again attempt to run the command `brjs workbench-deps app1 default myblade`, but this time from the `sdk` directory, BRJS will perform in a similar way. The first step it will take will be identifying the correct location of the apps. Which is why it will go to the parent of `sdk`, because `sdk` does not contain a `brjs-apps` directory, and it will find it under the root. That is why it will then be retrieving the workbench dependencies if the `app1` under `brjs-apps` and not under `apps`.

In case there are multiple existing `brjs-apps` folders, BRJS will pick up the one located at the lower level, for example:

```
.
+-- folder1
|   +-- brjs-apps
|   |   +-- app1
|   |   |   +-- blades
|   |   |   |   +-- myblade
|   |   |   +-- index.html
|   |   |   +-- app.conf
|   |   |   +-- index.html
|   |   +-- app2
+-- brjs-apps
|   +-- app1
|   |   +-- blades
|   |   |   +-- myblade
|   |   +-- index.html
|   |   +-- app.conf
|   |   +-- index.html
|   +-- app2
```

Running a command from `./folder1/brjs-apps/app1` will mean `./folder1/brjs-apps/` will be identified instead of `./brjs-apps/` because it is encountered first in the traversal. 

Please note that the `brjs-apps` folder will need to be created manually in a location of your choice.