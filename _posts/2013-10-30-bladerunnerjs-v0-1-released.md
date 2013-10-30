---
layout: post
title: "BladeRunnerJS v0.1 released"
authors: [leggetter]
thumb: brjs-todo-mvc.png

excerpt: I'm very excited that after 4 months of hard work we've released BladeRunnerJS v0.1. We've been working on decoupling BRJS from a product called Caplin Trader, doing some re-architecting and tidying up some rough edges. There's a lot more work still to be done but v0.1 and the getting started guide does both a good job of introducing the core BRJS concepts and highlights some of the changes we're going to make.

---

I'm very excited that after 4 months of hard work we've **released BladeRunnerJS v0.1**. As outlined in the [Introducing BladeRunnerJS blog post](http://bladerunnerjs.org/2013/09/16/introducing-bladerunnerjs/) we've been working on decoupling BRJS from a product called [Caplin Trader](http://www.caplin.com/caplin-trader), doing some re-architecting and making the codebase open source. There's a lot more work still to be done in order for us to meet the functionality we believe justifies a v1.0 release - take a look at the [roadmap to v1.0][roadmap] - but we now have the [code in github](https://github.com/BladeRunnerJS/brjs/), some [basic documentation](http://bladerunnerjs.org/docs/) in place and a [getting started guide][getting_started] that does both a good job of introducing the core BRJS concepts and highlights some of the changes we're going to make on the road to v1.0.

### Try the Getting Started Guide

<a href="http://bladerunnerjs.org/docs/use/getting_started/"><img src="/blog/img/brjs-todo-mvc.png" class="blog-img-right" /></a>

These are still early days - and we're not shouting about BRJS from the rooftops yet - but we'd certainly like you to **[try out the getting started guide][getting_started]** and get in touch with feedback by emailing me ([phil@leggetter.co.uk](mailto:phil@leggetter.co.uk?subject=BRJS+feedback)).

The getting started guide covers creating a Todo List made up of two decoupled parts - the *Todo Input Blade* and the *Todo List Blade*. The guide demonstrates creating a maintainable and testable application, the benefits of a decoupled architecture, how to use services and using an event hub for inter-blade communication.

### Roadmap to v0.1

You can view the [roadmap][roadmap] to get more detail about the key things we're working on as we focus on delivering a v1.0 [MVP](http://en.wikipedia.org/wiki/Minimum_viable_product). Each entry in the roadmap also links to the releated github issue - we're now doing almost everything in github.

### What Next?

Other than working towards v1.0 we plan to publish blog posts covering our sprint demos, about decisions we've made while creating BRJS, about thew new functionality we expose and about the benefits BRJS provides when building **complex web apps**. We also plan to expand on our documentation, to run some BRJS workshops (provisionally in London and Edinburgh) and to speak at a few events. 

### Register for updates

{% include register_form.html %}

[getting_started]: http://bladerunnerjs.org/docs/use/getting_started/
[roadmap]: http://bladerunnerjs.org/docs/roadmap/