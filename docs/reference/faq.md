---
layout: docs
title: FAQ
permalink: /docs/reference/faq/
notice: none
---

<div class="alert alert-warning">
    <p>
        Got a question that's not answered here? Tweet <a href="//twitter.com/bladerunnerjs">@BladeRunnerJS</a>, <a href="https://github.com/BladeRunnerJS/brjs-site/issues/new?title=Question%3A%20">submit a github issue question</a> or <a href="//github.com/BladeRunnerJS/brjs-site">submit a pull request</a> and we'll add the answer.
    </p>
</div>

## Does BladeRunnerJS replace AngularJS/Knockout/Ember/Backbone etc.?

**No.**

BladeRunnerJS (BRJS) is a toolkit that enables the development of large-scale JavaScript apps. BRJS does provide a small layer of front-end architecture in the form of [services](/docs/concepts/service_registry) that can be used by any front-end library or framework.

The default BRJS application configuration has been proven to provide a productive developer workflow for large HTML5 application so no additional setup is required and the first line of code will be feature code, not configuration.

Right now BladeRunnerJS templates use Knockout by default. But there's no reason why you can't use Angular, Ember, React or any other front-end framework *with BladeRunnerJS*.

## How do Blades relate to Web Components?

Blades and Web Components represent similar concepts.

However, [Web Components](http://www.w3.org/TR/components-intro/) will potentially be natively supported by web browsers and will offer stronger browser-enforced encapsulation. [Blade](/docs/concepts/blades/) encapsulation is enforced at build time ("F5", "Cmd + R" or deploy) by the BRJS toolkit.

In coming months we want to demonstrate how you can *use Web Components within BladeRunnerJS applications*.

## Why is BladeRunnerJS Open Source?

We have a blog post pending to explain more about this. We'll update this question as soon as the post is written. For now, take a look at [About BladeRunnerJS](/about/).

## How does BladeRunnerJS differ from other solutions?

BladeRunnerJS is a solution for [Programming in the Large](http://en.wikipedia.org/wiki/Programming_in_the_large_and_programming_in_the_small). Although we *really* do want it to be a widely useful toolkit, large apps built by many contributors is the focus.

The current trend with tooling, libraries and even software is to go "micro". But there is still benefit in having a fully functional and proven solution that is feature rich and productive "out of the box". From there, the requirement is to be able to add customisations to meet the requirements of software projects, while maintaining the core benefits of the solution.

### Full Solution *not* Micro Tooling

Our focus with BladeRunnerJS is to provide a packaged solution for building large-scale single page HTML5 applications where the *first line of code a developer writes can be feature code*. To achieve this the solution needs to have everything in place to provide a productive developer workflow.

This means BRJS offers many of the things that a combination of "micro tooling" offers, but we do so in a package that has been proven to result in a highly functional and maintainable HTML5 application. We need to do this in order to ensure that our development teams build applications in a consistent way and so that we can also support our customer's development teams as efficiently as possible. We are sure that other organisations will have the same requirements.

**This doesn't mean that BRJS is a monolithic application**; it does consist of many different parts and BRJS makes use of a number of external open source libraries and tools. It just packages the usage up into a consistent and productive developer experience.

See [Unwrapping BladeRunnerJS](http://bladerunnerjs.org/blog/unwrapping-bladerunnerjs/).

### Focusing on *Large Apps* contributed to by *Many* individuals

BladeRunnerJS is used to build large HTML5 apps with contributions from many developers, designers, QAs etc. who potentially work across multiple teams and even organisations. Supporting a workflow that allows multiple developers to work together is key to BRJS. Additionally, a large scale JavaScript application must be maintainable by those developers; it should be easy to find the code related to a feature and common architectural concepts should be used to ensure consistency.

Although the same concerns will also be considered by other tools and libraries (e.g. for some of the generators for Yeoman - or a generator could be created for this) these factors haven't been at the fore-front of alternative tooling. They are with BladeRunnerJS.

### BRJS v Yeoman

BladeRunnerJS provides a scaffolding/application template solution. Some of that application template is fixed based on the concepts of [Aspects](/docs/concepts/aspects), [BladeSets](/docs/concepts/bladesets) and [Blades](/docs/concepts/blades). However, the skeletons (files and in some cases, folders) that are generated will eventually be customisable via a [Scaffolding plugin](https://github.com/BladeRunnerJS/brjs/issues/126).

So, BRJS provides basic level of scaffolding functionality and extensibility (right now) in comparison to Yeoman, but that basic level is enough to provide a proven foundation for building a scalable complex web app.

When Yeoman first began it contained (wrapped) Grunt and Bower, but they made the decision to remove that wrapping. This has [pros and cons](https://github.com/yeoman/yeoman/issues/864). For us, the pros far outweight the cons.

### BRJS v Browserify

BladeRunnerJS lets you use Node.js style `require`s in the browser, so in that sense it enables a similar experience to [Browserify](http://browserify.org/).

However, it doesn't:

* let you use native Node.js modules (e.g. `fs`)
* provide source maps ([yet](https://github.com/BladeRunnerJS/brjs/issues/538))
* support module dependencies of different versions (similar to Bower)

It does:

* Use the `require`s to analyse and build JavaScript, CSS, i18n, HTML template and other bundles (Browserify only helps with bundling JavaScript)
* Automatically builds on page refresh
* Allow you to use modules from NPM and Bower (with a bit of manual work - we're working on improving this)

Our support for CommonJS/Node.js style requires is performed via a [bundler plugin](https://github.com/BladeRunnerJS/brjs/wiki/BladeRunnerJS-Plugin-Development-Guide#bundler-plug-in-relationships). It is therefore possible to add support for other languages such as TypeScript, CoffeeScript or ES6 via the same mechanism.

### BRJS v Grunt/Gulp/Fez/Broccoli/AssetGraph

Coming soon...

## Why isn't BladeRunnerJS written in Node.JS?

We started the BladeRunner project in around 2011. Back then, Node.js wasn't an option for a production-grade solution. When we started the open sourcing process (and renaming from "BladeRunner" to "BladeRunnerJS") we decided on a re-write. We again thought about using Node.js. Unfortunately Node.js isn't supported in some of the development environments of our target customers, so building the toolkit in Node.js still isn't an option for us.

However, we do want to start integrating with some of the amazing Node.js tooling and we plan to do that via plugins. For more information see [Embracing Node.js](http://bladerunnerjs.org/blog/embracing-nodejs/).

## How big/small should a Blade be?

A Blade can be as big or as small as you want it to be - it's like anything else in software engineering, you need to make a judgement based on your goals and strategies.

However, we'd recommend that you split your application functionality up by feature - so each feature is a Blade. If you identify a reusable piece of functionality within a Blade you should consider refactoring in order to move that functionality into a [library](/docs/concepts/libraries/).

## Can I get support?

Yes.

By:

* [Asking a question on Twitter](https://twitter.com/BladeRunnerJS)
* [Raising an issue in github](https://github.com/BladeRunnerJS/brjs/issues/new)

If you're interested in a supported licence then please [drop us an email](mailto:bladerunnerjs@caplin.com)

## Can you do some training?

Maybe.

Please [drop us an email](mailto:bladerunnerjs@caplin.com).

## Will you do a Webinar to tell me more?

Maybe.

Please [drop us an email](mailto:bladerunnerjs@caplin.com).

## Can you add support for \*insert-cool-new-feature\*?

Please kick off the conversation by [raising an issue in github](https://github.com/BladeRunnerJS/brjs/issues/new).
