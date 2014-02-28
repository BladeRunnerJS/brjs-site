---
layout: post
title: "Productivity: Why Ghost chose Ember"
authors: [leggetter]
thumb: ember_banner.png

excerpt: If you're interested in JavaScript then it's highly like that you'll have seen open discussion the Ghost blogging platform team had regarding what framework they should use to rebuild their Admin UI. A few days ago they announced they had decided to go with Ember. Here's my take on their motivations and how it resonates with the decisions we've made when open sourcing BladeRunnerJS.

---

<img src="/blog/img/{{ page.thumb }}" style="margin: 30px; width:200px;" align="right" />
If you're interested in JavaScript then it's highly likely that you'll have seen the really interesting [discussion](https://github.com/TryGhost/Ghost/issues/2144) on the Ghost github repo regarding what framework they should use to rebuild their Admin UI; Angular, Ember, React and Backbone + marionette and many more were suggested. A few days ago Hannah Wolfe - the Ghost CTO and co-founder - [announced](http://dev.ghost.org/hello-ember/) they had decided to go with [Ember](http://emberjs.com/).

After avidly following the github discussion, providing [some input](https://github.com/TryGhost/Ghost/issues/2144#issuecomment-35388246) and reading the announcement blog post, the key statement for me was:

> we don't want to spend time discussing and deciding on the best structure, designing a framework & creating documentation and guidelines so that new contributors can get up to speed

The focus is getting the job done, done in a timely manner, and done well. Productivity is frequently key when there is a clear end goal; when the end goal isn't to develop for development's sake, but to develop driven by creating a real product. There are a number of factors that can affect productivity and, as you can tell from the above quote, here's what the Ghost team were looking for:

* **Quality of the solution and docs** - obviously! If they were looking to follow a trend or take a (debatable) gamble on future technologies then maybe Polymer/Web Components would have had more of chance.
* **Proven structure** - both in terms of assets and app architecture to provide a foundation to build the app upon.
* **Guidelines & Intuitive use** - [frequently related to structure] it should be possible to achieve things through consistency, convention and by applying common sense. Practices will also be documented.
* **Accessiblity & Popularity** - in the case of Ghost it means if you are familiar with Ember you're half way to being able to contribute to the project.

## What's the relevance to BladeRunnerJS?

I found the Ghost discussion and decision really interesting because we've been considering related points while open sourcing [BladeRunnerJS](http://bladerunnerjs.org) (BRJS).

The process of open sourcing - and reading great discussions like the "Ghost: Ember v Angular v Backbone + Marionette v React" one has reinforced our belief that BladeRunnerJS is more about following proven practices, **convention** and adhering to a good **application structure** than it is about the libraries you choose when building functionality. Of course, those choices do matter, but experience has taught us that when building large JavaScript applications you need to split your application up into vertical slides of functionality ([Blades](http://bladerunnerjs.org/docs/concepts/blades/)) and have an **architecture** that promotes [loose coupling](http://en.wikipedia.org/wiki/Loose_coupling). In BRJS one Blade can't directly access functionality exposed by other Blades. They instead need to communicate using [services](http://bladerunnerjs.org/docs/concepts/services/) such as the [EventHub](http://bladerunnerjs.org/docs/concepts/event_hub/). That - supported through tooling and application foundation libraries - ensures you have a well structured app that can be maintained, extended and worked on by numerous developers, designers, QAs, teams or even companies.

Open sourcing has also lead to us peeling back the layers of BRJS in order to increase **accessibility**. At conception BRJS was a reasonably complex offering. This is because it was created to solve many complex problems posed by large front-end JavaScript apps. However, all of these problems and associated solutions won't be relevant to every application. So in order for BRJS have to a better chance of being a successful open source project the initial learning curve can't be too steep. It's the same with most products!

For example, we use a UI library called [Presenter](http://bladerunnerjs.org/docs/concepts/presenter/) when we build trading applications. However, the need for a *"semantically rich set of controls"* may not be initially obvious and an additional new library dependency does increase the gradient of that learning curve.

Instead we've decided to make [Knockout](http://knockoutjs.com/) the default for our open source solution. Although this isn't as popular as Angular, Backbone or Ember it has a **strong following**, is **very well documented**, is actively developed and is probably the best MVVM framework out there. Presenter (built on top of Knockout) will instead be exposed as a tool for a more specific job (more details to come).

Here's a work-in-progress representation of what you get with BRJS:

<img src="https://docs.google.com/drawings/d/1RFx9q-Wt4K4q7qOsrXlpPouc-sGbn_EGJSRcSCa4rxs/pub?w=503&amp;h=593">

## Ghost: A great example of "open" source

A big thanks to the Ghost team for demonstrating that open sourcing is about much more than simply sharing code; it's about open discussion, sharing ideas and an opportunity for everybody involved to learn.

## v0.4 release due shortly

A final note to say that the BladeRunner v0.4 release is imminent. Please keep your eye on [Twitter](https://twitter.com/BladeRunnerJS) for an announcement during [QCon London](http://qconlondon.com/london-2014/).
