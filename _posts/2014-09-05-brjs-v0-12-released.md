---
layout: post
title: "BRJS v0.12 Released"
authors: [leggetter]
thumb: br-logo-black-bg-150x150.png
latest: false

excerpt: "BladeRunnerJS (BRJS) v0.12 represents the first release that contains some significant improvements that are focused on making it much easier for everybody to get started using BRJS. Read more to find out about the intuitive app structure, static file deployment, API Docs and AngularJS tutorial."

---
<img src="/blog/img/{{ page.thumb }}" style="margin: 30px;" align="right" />
BladeRunnerJS (BRJS) v0.12 represents the first release that contains some significant improvements that are focused on making it much easier for everybody to get started using BRJS.

The [application structure is now much more intuitive](#app-structure) for developers coming from apps with more traditional web app structures. You can also now [build and deploy your BRJS app as static files](#static-deploy) to the directory of your choice making it easy to deploy on any platform. [API reference docs](#api-docs) are now available. And we've published a [Using AngularJS with BRJS tutorial](#brjs-angular) showing one way of using AngularJS within a BladeRunnerJS app.

Last - but certainly not least - we're running a free [How to Build Front-End Web Apps that Scale](http://attending.io/events/brjs-workshop-london) workshop in London on Wednesday 10th September. [Register now](http://attending.io/events/brjs-workshop-london) while there are still places left.

<a name="app-structure"></a>
## BRJS App Structure

When you create a new BRJS application the structure now looks as follows:

* `app.conf` - application configuration
* `blades` - a place for your app's blade definitions to reside
* `index.html` - your app's entry point
* `libs` - for libraries
* `resources` - includes an `aliases.xml` for registering [services](http://bladerunnerjs.org/docs/concepts/services/), [i18n config](http://bladerunnerjs.org/docs/use/internationalization/) and any other config files you're app may use
* `src` - JavaScript for the main entry point of your app. The majority of your code is likely to live in blades or libraries
* `test-acceptance` - application acceptance tests to exercise the app as a whole
* `test-unit` - unit tests to execute against code defined in `src`
* `themes` - theming and skinning; CSS, images etc.
* `unbundled-resources` - for assets that shouldn't be processed by the BRJS [bundlers](bladerunnerjs.org/docs/concepts/bundlers/)

We hope that the majority of this is now actually quite self explanitory and that it will help others get started much faster.

This won't affect any existing applications and as your app becomes more complex you may want to start taking advantage of features such as [bladesets](http://bladerunnerjs.org/docs/concepts/bladesets/) and [aspects](http://bladerunnerjs.org/docs/concepts/aspects/).

<a name="static-deploy"></a>
## Static File Deployment

You can now use the `build-app <app-name> <path>` command to build your application as static files. This has actually been around for a little while but we've made some tweaks that make it easier to use.

Here are a few examples of building and deploying an app to different hosting services:

* [DivShot](http://bladerunnerjs.org/docs/use/build_deploy/#divshot)
* [GitHub pages](http://bladerunnerjs.org/docs/use/build_deploy/#gh-pages)
* [Firebase hosting](http://bladerunnerjs.org/docs/use/build_deploy/#firebase)

Any many, many more.

<a name="#api-docs"></a>
## API Docs & Doc Generation

We've published [JavaScript API docs](http://apidocs.bladerunnerjs.org/latest/js/) that provides information on the JavaScript objects that are available within a BRJS application runtime.

You can now generate JSDocs for your own application via the `./brjs jsdoc <app-name>` command.

The [Java API Docs](http://apidocs.bladerunnerjs.org/latest/java/) have also been published for those that are interested in writing plugins or getting involved in looking at the toolkit core codebase.

You can now reference [full list of API docs](http://apidocs.bladerunnerjs.org/) as well as the normal [BladeRunnerJS docs](http://bladerunnerjs.org/docs/) when using or extending BRJS.

<a name="brjs-angular"></a>
## Using AngularJS with BRJS

For quite a while now we've spoken about it being possible to use any framework/library (e.g. Backbone, Angular, Ember, React, Polymer) within a BladeRunnerJS (BRJS) app. Angular is by far the most popular front-end framework right now so it makes sense to demonstrate how to use it with BRJS first.

So, go checkout the [Using AngularJS with BladeRunnerJS tutorial](http://bladerunnerjs.org/blog/using-angularjs-with-bladerunnerjs/).

<a name="release-notes"></a>
## Release Notes

The [full release notes for v0.12](https://github.com/BladeRunnerJS/brjs/releases/tag/v0.12) are also available.
