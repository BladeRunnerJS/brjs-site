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
We've seen that with large JavaScript applications, browsers tend to struggle when it comes to debugging large (concatenated) JavaScript files.
Up until now, BladeRunnerJS *always* bundled your application JS content in a single file to reduce the requests made to the server.

As part of a developer's workflow, it ultimately it comes down to what you are optimising for.

For day-to-day development, if you are styling something you maybe want to optimise for performance and would prefer that your workbench page allows you to instantly see your changes in action.

If you are looking at a bug that someone has reported then sometimes 'debuggability' makes an equal case too. Concatenated files add a small cost when breaking on JS errors in the browser in that you need to figure out which file on disk represents the code you are looking at in your browser debug window.

We've now got support for specifying a value for the 'dev-minifier' attribute inside your application index page or workbench to allow you do switch between the two, easily.

#### Bundle a concatenated JS file bundle
```html
<head>
	<@js.bundle dev-minifier='combined'@/>
</head>
```

#### Serve all JS files individually
```html
<head>
	<@js.bundle dev-minifier='none'@/>
</head>
```

BladeRunnerJS processes the `<@js.bundle@/>` tag and replaces it with your JavaScript dependencies based on what minification (if any) you want to load your web page with.
In the case of serving files individually, BladeRunnerJS knows what your dependencies are and simply writes script tag includes in the correct order for your app to work.

### JsTestDriver Plugin Support for BladeRunnerJS bundling
One of the great things about our JsTestDriver plugin is that it extended the dependency analysis convenience to jsTestDriver tests.

As it's a JSTD plugin, you include it at the top of your jsTestDriver.conf as a path to the plugin jar and it allowed you to write/run tests using BRJS and generated HTML and JS bundle files available for the tests at run-time.

```
    server: http://localhost:4224
    basepath: .

    plugin:
      - name: "BundleInjector"
        jar: ../../../../../../sdk/libs/java/testRunner/js-test-driver-bundler-plugin.jar
        module: com.caplin.jstestdriver.plugin.CutlassBundleInjectorPlugin

    load:
      - bundles/js/js.bundle

    test:
      - tests/**.js
```

It's worth noting that example test files are generated for you whenever you create a new [blade](http://bladerunnerjs.org/docs/concepts/blades/)!.

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
We're working on implementing the new asset bundlers which can all share the same [BladeRunnerJS model](https://github.com/BladeRunnerJS/brjs/wiki/Model-And-Plugin-Design).

These include:
* HTML bundler
* XML bundler
* CSS resource bundler (stylesheets and images)We're implementing the new HTML, I18N and CSS bundlers to go with our new JS Bundler which supports NodeJS style code.
* XML bundler

The current (legacy) implementations are not compatible with detecting dependencies written in the to-be-supported NodeJS style. The work we're doing will allow them to be more efficient with dependency analysis, share common code and be smarter when keeping track of what work needs to be re-done when files are changed/added/removed on disk (cache management).

Once we have these new bundlers implemented (and tested!), we'll be able to proceed to releasing BladeRunnerJS v0.4.

For a view on our plan for BladeRunnerJS 1.0 - please see our [roadmap](http://bladerunnerjs.org/docs/roadmap/).

## Stay tuned!

We're excited about the BladeRunnerJS v0.4 release. There are a number of ways of keeping track of progress: on [this blog](http://bladerunnerjs.org/blog), on [Twitter](https://twitter.com/BladeRunnerJS), on our [Google Plus page](https://plus.google.com/u/0/108556511900055348789) and on [Github](https://github.com/BladeRunnerJS/brjs). No Facebook!
