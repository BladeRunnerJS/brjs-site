---
layout: post
title: Introducing BladeRunnerJS
authors: [jamest, leggetter]
thumb: br-logo-black-bg-150x150.png

permalink: /2013/09/16/introducing-bladerunnerjs/

excerpt: Here at Caplin we've worked for many years with financial organisations to deliver complex, high performance, financial trading systems as single page web apps. Over the past 18 months we've created a developer toolkit and lightweight JavaScript framework called <strong>BladeRunnerJS</strong> to help us do this more efficiently.

---

<img src="/blog/img/{{ page.thumb }}" style="margin: 30px;" align="right" />

Here at Caplin we’re in the business of building extremely complex financial trading GUIs as single page web apps. Over the past 18 months we've created a developer toolkit and lightweight JavaScript framework called **BladeRunnerJS** to help us do this more efficiently.

*BladeRunnerJS* (**BRJS**) was designed for building modular large-scale HTML5 single page web apps. It consists of a set of conventions plus associated tools and libraries that make it easy to develop, test, deploy and maintain large JavaScript apps. These concepts result in apps being split into discrete modules called **blades**, each of which implements a single high level feature.

## Why did we create BRJS?

Complex applications can unsurprisingly have a very large codebase which can be difficult to organise, develop upon, test, deploy and maintain.

Before BRJS we experienced a number of problems:

* New projects required an application setup phase; application scaffolding, framework selection and infrastructure setup for the upcoming project. We wanted to *focus on features, not frameworks*, so the *first line of code we wrote could be feature code*.
* All *application infrastructure* (database, authentication, realtime services etc.) had to be running in the development environment in order to develop a single piece of functionality
* Checking the result of code changes also meant *running the entire app*. The time taken to log-in and navigate around wasted developer time.
* *Acceptance tests* ran via the GUI, required the back-end to be available and lots of infrastructure. On larger apps, across multiple browsers, this sometimes took all night and was often unreliable. It was also difficult to simulate test cases where servers are slow or return errors. 
* *Multiple teams* would work on different parts of the application. Much time and effort was spent resolving bugs caused by incompatible tightly-coupled functionality or code merge conflicts
* Front-end development would frequently begin before *back-end services* were ready. This delayed development, integration and testing of the features

BRJS resolves these problems. It has resulted in a well organised 250k LoC codebase where the first line of code we write is a feature. The functionality is developed in isolation, code changes can quickly be verified and tests take minutes rather than hours to run. The codebase is updated and maintained by multiple teams who can work on the same application without conflict. And development can start whether or not a back-end services are ready.

The conventions and architecture that BRJS enables and supports mean we can now focus on building features instead of dealing with development workflow problems. This has a very positive impact on developer productivity for both us and our customers.

## Why are we open-sourcing BRJS?

We’re open-sourcing BRJS because, although there are a number of great developer toolkits and frameworks available (like [Yeoman](http://yeoman.io) and [Mimosa](http://mimosa.io/)), BRJS is unique in its approach and its support for [programming in the large](http://en.wikipedia.org/wiki/Programming_in_the_large_and_programming_in_the_small).

As the number of developers creating large-scale front-end web apps increases, we hope that BRJS will turn out to be useful to others. We’re also keen to validate our hunch that it will be equally valuable for building complex applications in domains other than financial web trading applications.

## What do you get with BRJS?

BRJS is fundamentally about following a set of conventions that we've found work when building very large scale applications; it is the tooling that backs these conventions.

BRJS consists of:

### A CLI environment

The CLI environment runs on [JRE 7][jre7] and includes a [Jetty][jetty] development web server and also provides support for:

* Scaffolding of apps, blades and tests, development helpers called **workbenches** and more
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

* A *lightweight Object Oriented JavaScript framework* called [Topiary](https://github.com/BladeRunnerJS/topiary)
* An *EventHub library* for decoupled communication between application functionality
* A *ServiceRegistry* where objects that offer a particular service can be registered and accessed throughout the application
* A *GUI library built* on [KnockoutJS](http://knockoutjs.com/) which implements the MVVM pattern, provides rich data-binding and domain modelling capabilities, and enables highly efficient UI testing
* An *internationalisation* and localisation framework

### Blades & Workbenches

Blades are a BRJS concept that represent high level features within your application and consist of everything required for the feature; such as JavaScript, CSS, HTML templates, tests, documentation, internationalistion tokens and configuration.

![The contents of a Blade](/blog/img/blades.png)
<small class="fig-text">What goes into a <strong>Blade</strong>?</small>

Because application components are broken down into small pieces of functionality, with assets grouped by feature (not type), and because a blade only interacts with other application features through the EventHub or through services, we can run them in isolation. This has resulted in a feature we're *really* excited about - workbenches.

Workbenches allow a blade to be developed and run in isolation. They can also be interacted with through their runtime UI or through workbench tools via the EventHub or Services they use.

![A Blade Workbench](/blog/img/workbench_v2.png)

<small class="fig-text">A Caplin Trader FX Tile <strong>Blade</strong> running within a <strong>Workbench</strong></small>

### A Plugin Architecture

The Plugin Architecture means that you can create functionality to augment and extend the development workflow.

The plugin interfaces include:

* **CommandPlugin** - to create your own BRJS CLI command to do almost anything
* **BundlerPlugin** - used when bundling assets in both the development workflow and during the build and deploy steps
* **LogicalTagPlugin** - for tag replacement within assets
* **FileTransformPlugin** - used when transforming assets in both the development workflow and during the build and deploy steps e.g. for adding TypeScript, ECMAScript6 or CoffeeScript support
* **TestPlugin** - for adding support for additional testing tools

## What next?

BRJS was designed as a generic framework, but is presently within the codebase of the product ([Caplin Trader 3](http://www.caplin.com/developer/product/caplin-trader-3)) we have built with it. We’re in the process of decoupling and tidying up some of the rough edges. This will be completed by the end of the month (September) when we will be moving the BRJS codebase to [github](https://github.com/BladeRunnerJS/brjs). So, please watch the repo if you're keen to be an early adopter.

From the end of the month we'll be using [github issues](https://github.com/bladerunnerjs/brjs/issues) to plan our roadmap, track ongoing work, to capture feedback and discuss ideas.

Also, look out for upcoming blog posts providing more information on the What, Why and How's of BRJS, along with the answers to a number of questions you may well be asking; Why Java and not Node.js? How does BRJS differ from Yeoman et al? Interfaces... in JavaScript? What about RequireJS?

## Register for updates

{% include register_form.html %}
