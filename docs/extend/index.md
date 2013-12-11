---
layout: docs
title: Extend
permalink: /docs/extend/
---

The BRJS Toolkit comes with a plugin architecture means that you can create functionality to augment and extend the development workflow.

## Plugin Interfaces

* **CommandPlugin** - to create your own BRJS CLI command to do almost anything
* **BundlerPlugin** - used when bundling assets in both the development workflow and during the build and deploy steps
* **LogicalTagPlugin** - for tag replacement within assets
* **FileTransformPlugin** - used when transforming assets in both the development workflow and during the build and deploy steps e.g. for adding TypeScript, ECMAScript6 or CoffeeScript support
* **TestPlugin** - for adding support for additional testing tools

### Tutorials

{% include docs/extend/toc.html %}