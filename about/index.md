---
layout: single_page
title: About
---

**BladeRunnerJS** (*BRJS*) is an open source development toolkit and framework for modular construction of large single-page HTML5 apps. It consists of a set of conventions, supporting tools and micro-libraries to help you develop, test and deploy complex web applications. In particular, it supports simultaneous development by multiple teams of very large JavaScript codebases with numerous components. It does this by providing powerful workflows based on software engineering principles and concepts. These concepts result in apps being split into discrete modules called **blades**, each of which implements a single high level feature.

## Why did we create BRJS?

Complex applications can unsurprisingly have a very large codebase which can be difficult to organise, develop upon, test, deploy and maintain.

Before BRJS we experienced a number of problems:

* New projects required an application setup phase; application scaffolding, framework selection and infrastructure setup for the upcoming project. We wanted to **focus on features, not frameworks**, so the **first line of code we wrote could be feature code**.
* All **application infrastructure** (database, authentication, realtime services etc.) had to be running in the development environment in order to develop a single piece of functionality
* Checking the result of code changes also meant **running the entire app**. The time taken to log-in and navigate around wasted developer time.
* **Acceptance tests** ran via the GUI, required the back-end to be available and lots of infrastructure. On larger apps, across multiple browsers, this sometimes took all night and was often unreliable. It was also difficult to simulate test cases where servers are slow or return errors. 
* **Multiple teams** would work on different parts of the application. Much time and effort was spent resolving bugs caused by incompatible tightly-coupled functionality or code merge conflicts
* Front-end development would frequently begin before **back-end services** were ready. This delayed development, integration and testing of the features

BRJS resolves these problems. It has resulted in a well organised 250k LoC codebase where the first line of code we write is a feature. The functionality is developed in isolation, code changes can quickly be verified and tests take minutes rather than hours to run. The codebase is updated and maintained by multiple teams who can work on the same application without conflict. And development can start whether or not a back-end services are ready.

The conventions and architecture that BRJS enables and supports mean we can now focus on building features instead of dealing with development workflow problems. This has a very positive impact on developer productivity for both us and our customers.

## Why are we open-sourcing BRJS?

We’re open-sourcing BRJS because, although there are a number of great developer toolkits and frameworks available (like [Yeoman](http://yeoman.io) and [Mimosa](http://mimosa.io/)), BRJS is unique in its approach and its support for [programming in the large](http://en.wikipedia.org/wiki/Programming_in_the_large_and_programming_in_the_small).

As the number of developers creating large-scale front-end web apps increases, we hope that BRJS will turn out to be useful to others. We’re also keen to validate our hunch that it will be equally valuable for building complex applications in domains other than financial web trading applications.

## How to find out more?

The best place to get started with BRJS is the [documentation](/docs).

The code is on [github]({{ site.social.github_link }}) and you can keep up to date by following [@BladeRunnerJS](https://twitter.com/BladeRunnerJS) on Twitter or by registering for [our mailing list](http://caplin.us7.list-manage.com/subscribe/?u=b11bf2689d15a7cdd68a0904a&amp;id=4649bf0c91).