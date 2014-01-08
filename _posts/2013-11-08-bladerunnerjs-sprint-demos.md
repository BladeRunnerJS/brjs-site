---
layout: post
title: "BladeRunnerJS Sprint Demos"
authors: [andyberry88]
thumb: demo-time.jpg

excerpt: Since BRJS is now an open source project we have gained a lot more potential stakeholders; everyone in the JavaScript community. We wanted to address this and provide continual updates and value to all of our stakeholders.  Consider these posts your sprint demos.

---

## What have these guys been doing for the past 2 weeks?

<img src="/blog/img/{{ page.thumb }}" style="margin: 30px;" align="right" class="width-medium" />
As you may, or may not know, BladeRunnerJS (BRJS) is a project born from an internal project at Caplin and has their continued sponsorship. Infact all of the core BRJS developers are Caplin developers. At Caplin we practice SCRUM and in doing so we divide tasks up in to 2 week sprints and at the end of every sprint we demo what was achieved to our stakeholders.

Since BRJS is now an open source project we have gained a lot more potential stakeholders; everyone in the JavaScript community. We wanted to address this and provide continual updates and value to all of our stakeholders.

So consider these posts your sprint demos.

## So what have we actually done?

Following our [initial release](http://bladerunnerjs.org/blog/bladerunnerjs-v0-1-released/) last sprint, we have started work on our new [Bundler Plugin architecture](https://github.com/BladeRunnerJS/brjs/wiki/Bundling-Strawman) allowing Bundlers to be written by anyone; more file types & bundles to be supported; and more complex use-cases such as [source maps](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/) to be supported. This has been the key focus this sprint and will be continued next sprint where we hope to finish this stream of work.

There have been a number of smaller bug fixes, including feedback related to browser issues when running JavaScript tests, and a focus on our CI builds and infrastructure. Emitr, Fell and Topiary - our general purpose JavaScript libraries that are used within BRJS - are now running (and passing) in [Travis CI](https://travis-ci.org/BladeRunnerJS/) using [Sauce Labs](https://saucelabs.com/) for their browser tests. There has also been work to automate our GitHub release workflow; making use of GitHub’s API to calculate closed issues, create the release and upload the released binary. A blog post on this is soon to follow since this is a topic we hope others will find useful.

Want to have a look at the release in more detail? Have a look at our GitHub [release](https://github.com/BladeRunnerJS/brjs/releases) and why not have a [play around with BRJS](http://bladerunnerjs.org/docs/use/getting_started/) and let us know what you think?
