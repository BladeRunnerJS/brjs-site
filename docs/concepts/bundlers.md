---
layout: docs
title: Bundlers
permalink: /docs/concepts/bundlers/
---

The main purpose of BladeRunnerJS is to split a monolithic web application into a set of independent, reusable HTML5 modules called blades. During development, all the software assets of a [Blade](/docs/concepts/blades) are kept within a single directory, with the JavaScript split further into a large number of .js files, each of which contains a single class. When an app is run, all the software assets of a particular type (for example: CSS, XML, JavaScript) are delivered in a single file. In a nut-shell: during development, all an application’s software components are kept separate, for ease of maintenance; but at runtime, they are assembled into one file per asset-type, for maximum efficiency.

**Bundlers** concatenate all the required code assets across a number of blades into asset-specific "bundle" files. Any detected dependencies are automatically included.

There are five bundlers; one for each asset type:

* JavaScript bundler
* CSS resource bundler
* i18n (internationalisation) bundler
* HTML bundler
* XML bundler