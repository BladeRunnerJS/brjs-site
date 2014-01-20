---
layout: post
title: "Sprint Demo - NodeJS style and further small enhancements"
authors: [sospirited]
thumb: nodejs-style-taste-it.jpg

excerpt: NodeJS style code bundling support, command line params for port configuration. Here's a brief update on what the BRJS team have been working on since the start of December.

---

## What's been worked on since last December?

<img src="/blog/img/{{ page.thumb }}" style="margin: 30px;" align="right" class="width-medium" />
The biggest headline here is that we have support for NodeJS style code which can be bundled with our new JS Bundler.

This style of bundling is our vision for how we see BladeRunnerJS being written and as such, will be the default behaviour going forwards.

As part of this major change, we've been able to do some further clean-up to our sdk libraries as well as our thirdparty libraries. Some of which are now using this new NodeJS style. This is all very exciting and allows us to move away from a very verbose style of coding that BladeRunner previously demanded. Our aim is to remain backwardly compatible which has lead to some interesting problems for the team to deal with as we slowly convert the remaining bundlers over to using our new codebase.

We've also got some small little enhancements which should improve the development experience, for example exposing the port on which BladeRunnerJS is served on from the command line instead of via a configuration file.

## When will we see a new release?

Whilst we got the NodeJS bundling happy-path working over Christmas, we've been ironing out some performance issues which we felt would make it an unusable development experience for users. At the time of writing the performance is much more stable and we are aiming to do a new release at the end of this current sprint (end of January) for BladeRunnerJS v0.4.

## So what are we working on next?

We are hosting an internal *Hack Day* where some people will be using BladeRunnerJS and creating new [Plugins](https://github.com/BladeRunnerJS/brjs/wiki/BladeRunnerJS-Plugin-Development-Guide). There are some exciting ideas which we'll no doubt look to make available for anyone interested.

For a view on our plan for BladeRunnerJS 1.0 - please see our [roadmap](http://bladerunnerjs.org/docs/roadmap/).

## Get involved!
Want to have a look at the release in more detail? Have a look at our GitHub [release](https://github.com/BladeRunnerJS/brjs/releases) and why not have a [play around with BRJS](http://bladerunnerjs.org/docs/use/getting_started/) and let us know what you think?
