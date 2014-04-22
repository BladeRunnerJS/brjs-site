---
layout: docs
title: BladeRunnerJS Documentation
notice: none
---

**BladeRunnerJS** (BRJS) is fundamentally about following a set of conventions that work when building very large and complex front-end applications. BRJS is an extensible toolkit and lightweight JavaScript framework to support these conventions and workflows.

The BRJS documentation is broken up into 3 high-level sections:

* [Concepts](/docs/concepts/) - overview of core concepts within BRJS
* [Use](/docs/use/) - documentation about using BRJS to build an application
* [Extend](/docs/extend) - docs on extending the BRJS toolkit functionality e.g. creating plugins

If you are looking to try out BRJS then check out the <a href="/docs/use/getting_started" class="btn btn-success">Getting Started Guide</a>

## Overview

BRJS consists of:

### A Toolkit CLI

The Toolkit CLI environment runs on [JRE 7][jre7] and includes a [Jetty][jetty] development web server and also provides support for:

* Scaffolding of apps, [blades](/docs/concepts/blades) and tests, development helpers called [Workbenches](/docs/concepts/workbenches) and more
* Running tests at a fine-grained level e.g. all app tests or just unit tests belonging to a blade
* Building and deploying of apps either as bundled static files or as part of a bundled [WAR][war_file]
* Dependency analysis when bundling assets (JS, CSS, HTML, XML, Images etc.) - only assets that your app uses are included
* Usage from any build process or CI environment
* Integration with a plugin architecture

[war_file]:http://en.wikipedia.org/wiki/WAR_file_format_(Sun)
[jre7]:http://www.oracle.com/technetwork/java/javase/downloads/java-se-jre-7-download-432155.html
[jetty]:http://www.eclipse.org/jetty/

In addition to the CLI, a number of commands can also be executed from a web dashboard.

### A lightweight JavaScript framework

In order to support the BRJS conventions we developed the following JavaScript frameworks:

* A **lightweight Object Oriented JavaScript framework** called [Topiarist](https://github.com/BladeRunnerJS/topiarist)
* An [EventHub](/docs/concepts/event_hub/) library for decoupled communication between application functionality
* A [ServiceRegistry](/docs/concepts/service_registry) where objects that offer a particular service can be registered and accessed throughout the application
* A GUI library called [Presenter](/docs/concepts/presenter) built on [KnockoutJS](http://knockoutjs.com/) which implements the MVVM pattern, provides rich data-binding and domain modelling capabilities, and enables highly efficient UI testing
* An **internationalisation** and localisation framework

### A Plugin Architecture

The Plugin Architecture means that you can create functionality to augment and extend the development workflow.

The plugin interfaces include:

* **CommandPlugin** - to create your own BRJS CLI command to do almost anything
* **BundlerPlugin** - used when bundling assets in both the development workflow and during the build and deploy steps
* **LogicalTagPlugin** - for tag replacement within assets
* **FileTransformPlugin** - used when transforming assets in both the development workflow and during the build and deploy steps e.g. for adding TypeScript, ECMAScript6 or CoffeeScript support
* **TestPlugin** - for adding support for additional testing tools

## Documentation Contribution

Because the documentation is open source we hope it's easy to submit improvements and fixes to them using pull requests. However, if you see a mistake and either can't fix it, or don't have time to, please [raise an issue]({{ site.social.docs_issues_link }}).