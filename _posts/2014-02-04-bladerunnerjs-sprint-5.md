---
layout: post
title: "Sprint Demo - Improved performance and un-bundled JS"
authors: [sospirited]
thumb: yoda.jpg

excerpt: In this latest sprint we've improved bundling performance, implemented support for auto-serving individual JS files, added jsTestDriver plugin support for our new bundler and started on the new html, i18n and css bundlers.

---

<img src="/blog/img/{{ page.thumb }}" style="margin: 30px; width:200px;" align="right" class="width-medium" />
## What's new since the last update 2 weeks ago?

### Performance
Work on improving performance was carried forward from the previous sprint and currently provides what we consider to be, a far more acceptable developer experience.
When we were in a transition phase with the old JS bundler, we were doing some of the work multiple times and this was causing a large part of the slowness. Another area was caching and file-watching, these areas have been further implemented and refined and are evident when launching the BladeRunnerJS dashboard on the first initial load.
As we are now a bit more 'smarter' with caching, users should see a large improvement especially with subsequent reloads.

### Bunding Single/Individual JS files
We've now got support for specifying a value for the 'dev-minifier' attribute inside your index page.

```html
<head>
	<@js.bundle dev-minifier='none'@/>
</head>
```

The tag above would be replaced with individual `<script>` tags for including each of the individual dependencies of the app which BladeRunnerJS has identified, in the correct order. This is currently the default bahaviour if no attribute is specified.
Serving up individual JS files is useful in development for debugging purposes, though it does carry a slight performance overhead due to the increase of requests made to the server for each JS file.

### JsTestDriver Plugin Support for BRJS
As we now have the JavaScript bundling working to support both NodeJS style as well as the verbose namespace style, work was required to allow our JsTestDriver Plugin jar to also understand how to calculate depdencnies for node-style code.
This has now been completed and execution of tests for applications/blades now have all their JavaScript dependencies automatically bundled.

### Conferences and Talks
* [Phil Leggetter](https://twitter.com/leggetter) was at [FOSDEM](https://fosdem.org/2014/) giving a talk on BladeRunnerJS (video coming soon!)
* [Andy Berry](https://twitter.com/andyberry88) did a demo of the workflow of using BladeRunnerJS for development at [Glasgow.JS](http://glasgowjs.com/)

## Hands on with the latest features of BRJS

If you want to **live on the bleeding edge** then you can of course download the source from [github](https://github.com/BladeRunnerJS/brjs/).

We're working out of a branch called [bundler-exploration](https://github.com/BladeRunnerJS/brjs/tree/bundler-exploration):

```
# assuming your running bash on linux or mac
# or cygwin on windows

# get the source from git
git clone git@github.com:BladeRunnerJS/brjs.git
cd brjs
git fetch origin
git checkout -b bundler-exploration origin/bundler-exploration
git submodule init
git submodule update

# build BRJS
./gradlew assemble

# run the dev server
cd cutlass-sdk/workspace/sdk/
./brjs serve

# navigate to http://localhost:7070/ to see the dashboard

```

If you have any questions, please [raise an issue](https://github.com/BladeRunnerJS/brjs/issues/new) and tag as a **question**.

## What are we working on next?

### Bundlers, bundlers, bundlers

We're implementing the new HTML, I18N and CSS bundlers to go with our new JS Bundler which supports NodeJS style code.

The XML bundler will be following shortly after that and we're aiming to get all these completed this sprint (by February 14th).

Once we have these new bundlers implemented (and tested!), we'll be able to proceed to releasing BladeRunnerJS v0.4.

For a view on our plan for BladeRunnerJS 1.0 - please see our [roadmap](http://bladerunnerjs.org/docs/roadmap/).

## Stay tuned!

We're excited about the BladeRunnerJS v0.4 release. There are a number of ways of keeping track of progress: on [this blog](http://bladerunnerjs.org/blog), on [Twitter](https://twitter.com/BladeRunnerJS), on our [Google Plus page](https://plus.google.com/u/0/108556511900055348789) and on [Github](https://github.com/BladeRunnerJS/brjs). No Facebook!
