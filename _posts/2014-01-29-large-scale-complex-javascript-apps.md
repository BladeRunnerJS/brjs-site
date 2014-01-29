---
layout: post
title: "What is a Large Scale Complex JavaScript App?"
authors: [leggetter]
thumb: br-logo-black-bg-150x150.png

excerpt: The terms "large scale" and "complex app" are being used with increasing frequecy. But when it comes to front-end JavaScript applications what does it actually mean? Are we simply talking about codebase, about application complexity or is there more to it? In this post we'll clarify what being a truly "Large Scale Complex JavaScript App" means.

---

<img src="/blog/img/{{ page.thumb }}" alt="B|R logo" width="150" style="margin: 20px;" align="right" />
The terms "large scale" and "complex app" are being used with increasing frequecy. But when it comes to front-end JavaScript applications what does it actually mean? Are we simply talking about codebase, about application complexity or is there more to it? In this post we'll clarify what being a truly "Large Scale Complex JavaScript App" means.

At [Caplin Systems](http://www.caplin.com) we help financial institutions build web trading platforms. We license a number of backend technologies to these companies, along with front-end SDKs to enable the development of web trading applications.

From around 2001 the primary front-end technology at Caplin has been JavaScript. One of the first front-end products we offered was something called RTML (Real-Time Markup Language) that let you add realtime updates to a web page via simple HTML markup, and RTSL (Real-Time Scripting Language) to allow more advanced functionality to be created by providing a JavaScript API for subscribing to and handling realtime updates.

On top of this technology we built something called WebSheet; an SDK framework that enabled the development of realtime displays of financial prices running in a web browser.

WebSheet has now long been replaced with something called [Caplin Trader](http://www.caplin.com/caplin-trader), a web SDK for developing HTML5 web trading applications, now at version 3.

## Large Scale JavaScript apps?

To understand what I mean by large scale JavaScript apps, let's take a look at Caplin Trader.

### Codebase

Caplin Trader is an SDK on top of which you build your web trading applications. The SDK is made up of:

* ~1,000 JavaScript files
* ~130,000 lines of code
* ~650 test files
* ~95,000 lines of test code

In addition to this, every customer that gets Caplin Trader has the opportunity to be provided with a reference implementation. This is a working Caplin Trader application that they can use to get started. It consists of:

* ~450 JavaScript files
* ~50,000 lines of code
* ~200 test files
* ~21,000 lines of test code

When we're talking about scaling, the assumption that this equates to "lots of code" is indeed true. Since it's a large application it's also highly likely that some of the code will have been - or is going to be - around for a long time. In the case of Caplin Trader we have some libraries that have been around for years.

How do you manage a JavaScript code base of this size? How do you ensure that all code, no matter how old, can be understood, maintained and improved? And let's not forget that there are other resource files that need managed such as CSS, images, i18n language files HTML templates and config files..

However, when we talk about large scale complex JavaScript applications there's **much more to consider than just just the number of files or lines of code**.

### Complexity

Before we look at Caplin Trader, let's take a look at an app that most people are more familiar with: Gmail.

![](/blog/img/gmail.png)

When it comes to complex web applications Gmail is the de facto reference. It offers lots of functionality, all within the browser, without requiring a page refresh:

* List email
* Filter email by search query or by category (Primary, Social, Promotions, Update, Forums)
* Pagination of emails
* View an email
* Compose email
* Start a new hangout (Chat)
* Participate in a chat
* View/hide labels
* View and change settings
* Contacts
* Tasks
* View other Google Applications
* Google+ notification integration
* And let's not forget contextual advertising!

That's a hell of a lot of functionality.

![](/blog/img/caplin-trader.png)

Next let's have a look at a Caplin Trader application:

* View realtime prices for various financial assets in a grid
* View realtime prices for a single financial asset in a trade tile
* Execute a trade in a trade tile
* Perform multi-leg trades from a trade tile
* View realtime news
* View changing prices of a financial asset in a chart
* View historical trade information in a blotter
* Add new UI items (trade tiles, grids, charts etc.) to a layout
* Reorganise areas of the UI e.g. resize UI components
* Drag & Drop instruments between various UI components
* Switch between different app layouts using a tab system
* View and change settings

In order to provide this level of functionality these applications have to interact with numerous other pieces of technology. Frequently, an interaction with the UI will result in either other parts of the UI updating or a call being made to a back-end service. Back-end services will also invoke client functionality resulting in UI changes.

It's easy to see how the code behind an application with this kind of complex functionality and interactive nature could become very tangled.

How do you ensure that the code stays clean and the way that application components interact doesn't get overly complex or tightly coupled, making it very hard make changes without unexpected knock-on effects?

### Contributors

A factor that is often overlooked when it comes to large applications is the human factor. A large scale complex web app simply can't be developed and maintained by a single developer. It's unlikely that it can be developed by a single team. So we know an application has achieved the status of "large scale" when it requires the contribution of many individuals and numerous teams.

I don't know about GMail, but at Caplin we have more than 80 developers. We consistently have one core Caplin Trader team and from time-to-time we may have more teams working on other Caplin Trader components. We then have one or more teams developing and maintaining the reference implementation. In addition, we have numerous teams - both internal professional service teams and customer developer teams - who are either staring out using the reference implementation or writing their own functionality using the Caplin trader SDK.

Lots of teams and lots of developers. But it's not just developers. Applications can have contributions from:

* Front-end devs
* Back-end devs
* Designers
* QA
* Infrastructure and release engineers
* Technical authors

Our teams are generally reasonably small and either located in our office or on-site at a customer. Customer teams may be large or multiple teams can spread across an organisation. Members of any of these teams may change over time. 

With input from so many people it can be difficult to ensure things are done in a consistent way. Different people can do the same things in different ways. Variety is great, but when it comes to building a codebase that everybody has to be able to understand, extend, improve and maintain you need people to do things in a consistent ways.

How do you make sure that all these individuals can work in harmony? We do have source control, but the best type of merge conflict is where there isn't a conflict at all. How do you ensure people aren't treading on each others toes by editing the same code or changing the same assets?

## How does BladeRunnerJS fit in?

BladeRunnerJS represents the tooling and a set of JavaScript micro-libraries that we created in order to help us deal with building large scale complex applications and answer the questions posed above. It was created to address a number of pain-points we were experiencing when developing Caplin Trader 2 based applications. It solves real problems that we've experienced when building real large scale complex JavaScript apps.

In the next post I'll cover what those pain points were, and finally - by-example - explain what the specific solutions that we've incorporated into BladeRunnerJS are.

If you want to find out more before the next post then I'll be [speaking at FOSDEM on Sunday 2nd February](https://fosdem.org/2014/schedule/event/javascript_app_scalable/) and [Andy Berry](https://twitter.com/andyberry88) will be talking about the BladeRunnerJS workflow at [GlasgowJS](http://glasgowjs.com/). Or for more thought-provoking background reading you should take a look at this excellent answer to [Why do dynamic languages make it more difficult ot maintain large codebases?](http://programmers.stackexchange.com/questions/221615/why-do-dynamic-languages-make-it-more-difficult-to-maintain-large-codebases/221658#221658)