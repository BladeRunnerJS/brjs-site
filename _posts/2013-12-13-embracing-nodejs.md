---
layout: post
title: "Embracing Node.js"
authors: [jamest]
thumb: java-nodejs.png

excerpt: In the last couple of years Node.js has exploded onto the web development stage and is rapidly becoming the heart of the web-development platform. BladeRunnerJS grew out of Caplin Trader and was built before Node.js was even a twinkle in the eye of Ryan Dahl. As a result BRJS is built on Java. But, is it possible for us to take advantage of Node.js tooling or are we out of luck?

---

<img src="/blog/img/{{ page.thumb }}" style="margin: 30px;" align="right" />

In the last couple of years [Node.js](http://nodejs.org/) has exploded onto the web development stage. (I’m going to assume that you are familiar with Node.js.  If you’re not, and you’re doing web-development then get learning [here](http://nodejs.org/), [here](http://en.wikipedia.org/wiki/Nodejs) and [here](https://npmjs.org/)). When Node.js is twinned with package managers like NPM and Bower it’s easy to gain access to a large ecosystem of tools and frameworks (e.g. [Yeoman](http://yeoman.io/), [Grunt](http://gruntjs.com/), [Express](http://expressjs.com/), [Browserify](http://browserify.org/) ...) from public repositories. Ironically although Node.js was written to help implement "push servers" with large numbers of concurrent users, we see it being used by individual developers running builds (using tools like [Grunt](http://gruntjs.com/)) or testing with the likes of [Karma](http://karma-runner.github.io/0.10/index.html). Either way, Node.js is rapidly becoming the heart of the web-development platform. 

**BladeRunnerJS** (BRJS) grew out of [Caplin Trader](http://www.caplin.com/caplin-trader), our framework for delivering high performance web based financial trading applications. It was built before Node.js was even a twinkle in the eye of Ryan Dahl. At that time the most common production environment for web-apps were J2EE servlet containers (Tomcat, Weblogic etc). Operations departments were comfortable administering them and production deployment consisted of uploading a WAR file followed by some simple configuration.

One of the key design principles of BRJS is that the development environment mirror production, reducing the possibility of bugs creeping in. The developer should be able to run the entire application stack on their desktop/laptop. We therefore built our development environment around the Java platform. This automatically gave us cross operating system support as well as access to the entire Java ecosystem. Using Jetty as an embedded servlet engine our only dependency is a JRE.

Talking to our customers (Tier1 and Tier 2 banks) we have found that they are all happy deploying Java (platform) based servers but the vast majority currently have no plans - and are not considering - using Node.js as a production server; the reactions ranged from outright hostility to a few starting pilot projects. However, we found the vast majority of our customers are happy to use Node.js as a development tool, except for a few who currently ban it's use. We even know some developers who have ignored the bans!

**So what is our strategy for BRJS and Node.js ?** - We have a long history (and great skills) with JavaScript, so we want to integrate Node.js with our Java-based tools to get the best of both worlds. We need to support existing customers who are not ready for a move to Node.js, while taking advantage of the new tools for those who are willing.

Very soon BRJS will have a full plugin architecture. This will enable us to add optional features and improve existing ones. For example adding the Karma test-runner provides faster and more reliable test execution than [js-test-driver](https://code.google.com/p/js-test-driver/). It also allows us to use newer test tools like [cucumber-js](https://github.com/cucumber/cucumber-js) or [Yadda](http://jster.net/library/yadda). It means we could use Bower as a package manager and/or integrate with Grunt. We're going to keep an eye on the Node.js toolchain and integrate the best tools. Of course, being open-source, BRJS users can easily integrate their favourite tools and hopefully contribute the plugins back.

We've also noticed some very interesting happenings in the Java world. Java 8 (due for release in Q1 2014) includes the new [Nashorn](http://en.wikipedia.org/wiki/Nashorn_(JavaScript_engine)) JavaScript engine that promises "Google V8 like" performance. Along with this comes [avatar-js](https://java.net/projects/avatar-js) that should allow you to run Node.js modules inside the JVM. [Vert.x](http://vertx.io/) was inspired by Node.js and allows you to write programs in the same single-threaded, event-driven manner. However amongst other advantages, you can write in any language that runs on the JVM: Scala, JavaScript, Ruby, Python, Groovy - whatever tickles your fancy. 

We believe in a polyglot world, where the widest group of developers can create plugins and server-side functionality in their language of choice, taking advantage of the best tools and frameworks from multiple platforms.  Programmers should be open to innovation wherever it arises, as the saying goes "if your only tool is a hammer, all problems look like nails".

Maybe JavaScript will end up ruling the world! If it does we will migrate the BRJS toolset using plugins while your valuable application code remains unchanged.
