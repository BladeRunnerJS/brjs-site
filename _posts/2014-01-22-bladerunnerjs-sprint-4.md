---
layout: post
title: "Sprint Demo - Write BRJS apps using NodeJS style code"
authors: [sospirited]
thumb: nodejs-style-taste-it.jpg

excerpt: In this latest sprint we've delivered the ability to write Node.JS style code that runs in the web browser. This is enabled through our new JavaScript Bundler Plugin. We've also made tweaks to improve the developer experience of BRJS and are making solid headway towards a BladeRunnerJS v0.4 release.

---

<img src="/blog/img/{{ page.thumb }}" style="margin: 30px; width:200px;" align="right" class="width-medium" />
## What's been worked on since last December?

The biggest headline in this update is that when you write JavaScript code for a BladeRunnerJS application you can do so in the same style as you would when writing a Node.js app. Our bundler does the work of ensuring that this will execute in the browser so you don't have to think about the browser runtime and can focus on building functionality into your app. This is achieved thanks to our new JS Bundler.

```javascript
var Foo = require( 'Foo' );

function Bar() {
  this.foo = new Foo();
}

module.exports = Bar;
```

This style of code - enabled by the JS bundler - represents our current vision of how we see BladeRunnerJS applications being written. As such, it's now the current default behaviour. In order to achieve this we developed a new mechanism for bundling that will also allow us to add support for [ECMA6Script](http://wiki.ecmascript.org/doku.php?id=harmony:specification_drafts) and [TypeScript](http://www.typescriptlang.org/) in the future. This code works when it runs in the web browser because the bundling process wraps it within a 

As part of this major change, we've been able to do some further clean-up to our sdk JavaScript libraries as well as the thirdparty libraries that our core libraries depend on; some of which are now using this new NodeJS style. This is all very exciting and allows us to move away from a very verbose style of coding that BladeRunner previously demanded. Our aim is to remain backwardly compatible. This has resulted to some interesting problems for the team to deal with as we slowly convert the remaining bundlers (HTML, CSS, Images etc.) over to using our new codebase.

We've taken the opportunity to add some small enhancements which should improve the developmer experience compared to the version of BRJS we use internally. For example, you can now change the port on which BRJS is served on from the command line. This is a common convention in other similar technologies which start up a server. This is a very small step towards making the BRJS CLI as intuitive to use as possible.

```
$ ./brjs serve -p 8080
```

## When will we see a new release?

Whilst we have the NodeJS bundling happy-path functionality in place, we've been ironing out some bundler performance issues which would have degraded the developer experience we're looking to deliver. We've made some excellent headway on these and we're aiming to release BladeRunnerJS v0.4 by the end of January.

If you want to **live on the bleeding edge** then you can of course download the source from github. We're working out of a branch called [bundler-exploration](https://github.com/BladeRunnerJS/brjs/tree/bundler-exploration):

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

This week we're hosting an internal *Hack Day* where we hope a number of the wider [@CaplinTech](https://twitter.com/CaplinTech) team will develop some new [BRJS Plugins](https://github.com/BladeRunnerJS/brjs/wiki/BladeRunnerJS-Plugin-Development-Guide). We've heard some exciting ideas and we'll no doubt look to make anything useful that comes out of the hack available.

For a view on our plan for BladeRunnerJS 1.0 - please see our [roadmap](http://bladerunnerjs.org/docs/roadmap/).

## Stay tuned!

We're excited about the BladeRunnerJS v0.4 release. There are a number of ways of keeping track of progress: on [this blog](http://bladerunnerjs.org/blog), on [Twitter](https://twitter.com/BladeRunnerJS), on our [Google Plus page](https://plus.google.com/u/0/108556511900055348789) and on [Github](https://github.com/BladeRunnerJS/brjs). No Facebook!
