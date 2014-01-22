---
layout: post
title: "Sprint Demo - NodeJS style and further small enhancements"
authors: [sospirited]
thumb: nodejs-style-taste-it.jpg

excerpt: In the latest sprint we delivered NodeJS style code bundling support and command line params for port configuration.

---

## What's been worked on since last December?

<img src="/blog/img/{{ page.thumb }}" style="margin: 30px;" align="right" class="width-medium" />
The biggest headline here is that we have support for NodeJS style code which can be bundled with our new JS Bundler.

This style of bundling is our current vision of how we see BladeRunnerJS applications being written and as such, will be the current default behaviour. By doing this work we now have a proper mechanism for bundling and it will allow us to add support for ECMA6Script and TypeScript in the future.

As part of this major change, we've been able to do some further clean-up to our sdk libraries as well as the thirdparty libraries that our core libraries depend on. Some of which are now using this new NodeJS style. This is all very exciting and allows us to move away from a very verbose style of coding that BladeRunner previously demanded. Our aim is to remain backwardly compatible which has lead to some interesting problems for the team to deal with as we slowly convert the remaining bundlers over to using our new codebase.

We've also got some small enhancements which should improve the developmer experience, for example exposing the port on which BladeRunnerJS is served on from the command line as this seems to be a convention in other similar technologies which start up a server.

Example usage:

` ./brjs serve -p 8080`

## When will we see a new release?

Whilst we got the NodeJS bundling happy-path functionality working over Christmas, we've been ironing out some bundler performance issues which would have degraded the developer experience we're looking to deliver. We've made some excellent headway on these and we're aiming to release BladeRunnerJS v0.4 by the end of January.

## So what are we working on next?

This week we're hosting an internal *Hack Day* where we hope a number of the wider [@CaplinTech](https://twitter.com/CaplinTech) team will develop some new [BRJS Plugins](https://github.com/BladeRunnerJS/brjs/wiki/BladeRunnerJS-Plugin-Development-Guide). We've heard some exciting ideas and we'll no doubt look to make anything useful that comes out of the hack available.
For a view on our plan for BladeRunnerJS 1.0 - please see our [roadmap](http://bladerunnerjs.org/docs/roadmap/).

## Get involved!
Want to have a look at the release in more detail? Have a look at our GitHub [release](https://github.com/BladeRunnerJS/brjs/releases) and why not have a [play around with BRJS](http://bladerunnerjs.org/docs/use/getting_started/) and let us know what you think?
