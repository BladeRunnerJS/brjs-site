---
layout: post
title: "Sprint Demo - Dependency Analysis & Debugging Improvements"
authors: [sospirited]
thumb: yoda.jpg

excerpt: In this latest sprint we've improved bundling performance, implemented support for auto-serving individual JS files, added jsTestDriver plugin support for our new bundler and started on the new html, i18n and css bundlers.

---

<img src="/blog/img/{{ page.thumb }}" style="margin: 30px; width:200px;" align="right" class="width-medium" />
## What's new this sprint?

### Dependency Analysis Performance

One of the main benefits of BladeRunnerJS is that it analyses your application assets for dependencies. For example, if the `index.html` of your application looks like this:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <base href="@APP.VERSION@"/>
    
    <title>My Awesome BRJS App</title>

    <@css.bundle theme="standard"@/>
  </head>
  <body>
    <@js.bundle@/>
    <script>
      ( function() {

        /*** new code ***/
        var App = require( 'awesome/App' );
        /*** end of new code ***/
        var app = new App();

      } )();
    </script>
  </body>
</html>
```

BRJS detects that the application has a dependency on the JavaScript class defined in `awesome/App`. If the definition of `awesome/App` looks as follows:

```javascript
/*** new code ***/
var WowBladeViewModel = require( 'awesome/amazing/WowBladeViewModel' );
var MegaBladeViewModel =  require( 'awesome/fantastic/MegaBladeViewModel' );
/*** end of new code ***/

function App() {
  /* App functionality here */
}

module.exports = App;
```

BRJS can determine that you are using both `awesome/amazing/WowBladeViewModel` and `awesome/fantastic/MegaBladeViewModel` through analysing the code and looking for `require` statements. From here BRJS analyses those Blades for dependencies in the same way. BRJS also looks for any other resources associated with those Blades - CSS, images, HTML templates, i18n, config and so on - and bundles and serves those too.

This allows the dev server to only serve the assets that your application actually uses to the client. The same process is also followed when creating a deployment package for your application.

As you can imagine, analaysing dependencies via file parsing, detecting file changes using file-watching, managing a file cache and any other work that BRJS has to perform comes with its challenges. And up until this sprint the performance of the analysis process wasn't good enough.

Here's an image showing the progress we've made for our BladeRunnerJS dashboard load times over the past few weeks.
![](/blog/img/jsperf.png)

We're very pleased to have now got things to a much more acceptable level. Work on this hasn't completely finished and we do plan to go back and improve things further in later sprints.

### Improved Debugging thanks to BundlerPlugins

In our [What is a Large Scale Complex JavaScript App post](http://bladerunnerjs.org/blog/large-scale-complex-javascript-apps/) we confirmed that a large app will of course have a large codebase. So, when it comes to concatenating the JavaScript in that codebase the resulting file can be *very* large.

Up until now, BladeRunnerJS *always* bundled your application JS content in a single file to reduce the requests made to the server. This provided the benefit of a much faster application load-time than serving individual script files via `<script>` tags, but it also came at a cost - a difficult JavaScript debugging experience...

We've noticed that **some web browsers struggle when it comes to debugging very large JavaScript files**; they incorrectly report the location of errors, `debugger` statements and breakpoints. Even Chrome's devtools lose some responsiveness when debugging through a large single file. Since this made debugging very difficult, we clearly had to provide a remedy.

![](/blog/img/largejsfile.png)

So now it's possible to get JavaScript files in a number of different ways.

* Served as individual files fetched via multiple generated `<script>` tags
* Concatenated (the previous default)
* Concatenated and minified using Closure

We're still working out what the defaults should be, but you can configure them for different scenarios by adding attributes to the `<@js.bundle@>`  tags. For example, you may want individual script files when building a single feature (Blade) in isolation the [Workbench](http://bladerunnerjs.org/docs/concepts/workbenches/). The bundle tag for this looks as follows:

```html
<@js.bundle dev-minifier='none'@/>
```

And the concatentated version when viewing the full application by setting the `dev-minifier` attribute to `combined` as follows:

```html
<@js.bundle dev-minifier='combined'@/>
```

If you've found a bug that only seems to occur when the full app is running you can of course turn the individual file serving functionality on.

BladeRunnerJS processes the `<@js.bundle@/>` tag and replaces it with your JavaScript dependencies based on the minifier you have configured (if any). In the case of serving files individually, since BRJS knows what your dependencies are and simply writes `<script>` tag includes. For concatenation the files are - well - concatenated in the correct order for your app to work.

### JsTestDriver Plugin Support for BladeRunnerJS bundling

One of the great things about our JsTestDriver plugin is that it uses the same dependency analysis functionality for your tests and bundles all your dependencies from various locations (thirdparty libraries, SDK libraries, your own user-created-libraries as well as your actual application or module) into a single file.
The biggest benefit is that now you don't have to specify hard-coded or regex paths for all your JS dependencies from these locations.

The JSTD plugin is declared at the top of your jsTestDriver.conf as a path to the plugin jar and it allowed you to write/run tests using BRJS and generated HTML and JS bundle files available for the tests at run-time.

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

So now, in your test config all you are specifying is the location of where your tests are, a single line.

It's also worth noting that BladeRunnerJS will generate example test files for you whenever you create a new [Blade](http://bladerunnerjs.org/docs/concepts/blades/)!.

---

### Conferences and Talks

As well as building new functionality into BRJS we've been out and about giving a couple of talks. [Phil Leggetter](https://twitter.com/leggetter) was at [FOSDEM](https://fosdem.org/2014/) in Brussels (video coming soon!) and [Andy Berry](https://twitter.com/andyberry88) demoed the BRJS workflow to the friendly folk at [Glasgow.JS](http://glasgowjs.com/).

We're also going to be at [QCon London](http://qconlondon.com/london-2014/) and [Fluent](http://fluentconf.com/fluent2014/) in San Francisco in March.

## Get hands-on with the latest features of BRJS

If you want to **live on the bleeding edge** then you can of course download the source from [github](https://github.com/BladeRunnerJS/brjs/).

We're working out of a branch called [bundler-exploration](https://github.com/BladeRunnerJS/brjs/tree/bundler-exploration). The only pre-requisite is the [Java 7 JDK](http://www.oracle.com/technetwork/java/javase/downloads/jdk7-downloads-1880260.html) and you can get started as follows:

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

---
We use this term a lot when talking about BRJS, 'bundlers'.

What we mean by this is the 'bundling' (i.e. concatenation) of common resources so that the client only has to make a single request to the server. We've talked a bit about the bundling of an application's JavaScript dependencies into a single file in this blog post, but this will also apply for HTML, CSS, I18N and XML content.

BRJS allows you to split your application into modular pieces of functionality ('blades' of functionality) and each of these may have 'assets' associated with it. Maybe some CSS styling because it's a GUI widget or some HTML because it's using our Presenter library built upon [KnockoutJS](http://knockoutjs.com/).
On disk, you can have all these resources clearly separated for the blade which needs them. It's to help make development of large scale applications easier when you may have large teams working on a project. In order for this conceptual approach to 'work', it also needs to be perfomant to the end user, which is where bundling comes in.

We're working on implementing the following new asset bundlers which can all share the same [BladeRunnerJS model](https://github.com/BladeRunnerJS/brjs/wiki/Model-And-Plugin-Design).

These include:

* HTML bundler
* XML bundler
* CSS resource bundler (stylesheets and images)We're implementing the new HTML, I18N and CSS bundlers to go with our new JS Bundler which supports NodeJS style code.
* XML bundler

The current (legacy) implementations are not compatible with detecting dependencies written in NodeJS style. The work we're doing will allow them to be more efficient with dependency analysis, share common code and be smarter when keeping track of what work needs to be re-done when files are changed/added/removed on disk (cache management).

---

Once we have these new bundlers implemented (and tested!), we'll be able to proceed to releasing BladeRunnerJS v0.4.

For a view on our plan for BladeRunnerJS 1.0 - please see our [roadmap](http://bladerunnerjs.org/docs/roadmap/).

## Stay tuned!

We're excited about the BladeRunnerJS v0.4 release. There are a number of ways of keeping track of progress: on [this blog](http://bladerunnerjs.org/blog), on [Twitter](https://twitter.com/BladeRunnerJS), on our [Google Plus page](https://plus.google.com/u/0/108556511900055348789) and on [Github](https://github.com/BladeRunnerJS/brjs). No Facebook!
