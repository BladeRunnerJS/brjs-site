---
layout: docs
title: CommandPlugin Tutorial
permalink: /docs/extend/command_plugin_tutorial/
notice: none
---

The `CommandPlugin` is the simplest extension point for **BladeRunnerJS** (*BRJS*). As the plugin name suggests, it gives you the ability to define commands that you can execute via the `brjs` command in the form:

```bash
$ ./brjs <your_command_plugin_name>
```

A BladeRunnerJS `CommandPlugin` also has access to the [BRJS model](/docs/concepts/model/) so have all the information you need to manipulate applications, blades and much more, along with any other functionality you wish to implement. And, of course, since you are building a plugin you can then share this functionality with other team members or the wider BRJS community.

## Requirements

* Java 7
* Eclipse IDE - used in this tutorial, but it will be easy to convert these steps to using another IDE.
* BladeRunnerJS - of course, you'll need BladeRunnerJS installed.

## Overview

This tutorial we'll introduce you to the basic concepts by creating a very simple **ListAppsPlugin** that lists the BRJS applications you have.

The tutorial will cover the following:

This screencast show how to:

1. Create a BladeRunnerJS plugin project using the [Plugin Project Creator](https://github.com/BladeRunnerJS/brjs-plugin-project-creator)
2. Create a CommandPlugin class
3. Deploy a plugin
4. Parse arguments within a CommandPlugin

Although a CommandPlugin is created many of the steps are the same for other types of plugin.

<iframe width="640" height="480" src="//www.youtube.com/embed/cFiEY077pmE" frameborder="0" allowfullscreen></iframe>

Please let us know what you build via [@BladeRunnerJS](https://twitter.com/BladeRunnerJS) or by posting a [BladeRunnerJS github issue]({{ site.social.github_issues_link }}).
