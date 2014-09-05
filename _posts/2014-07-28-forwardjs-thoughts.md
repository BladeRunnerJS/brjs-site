---
layout: post
title: "Thoughts from ForwardJS"
authors: [leggetter]
thumb: forwardhex.png
latest: false

excerpt: "ForwardJS took place in San Francisco last week. It was a great event consisting of progressive workshops and talks. Here's a post covering our involvement and the things I found most interesting: FluxJS, ES6 and Web Components."

---

ForwardJS took place in San Francisco last week. It was a great event consisting of progressive workshops and talks. Here's a post covering our involvement and the things I found most interesting: FluxJS, ES6 and Web Components.

## Building Large JS Apps Workshop

![](/blog/img/forwardjs-workshop-action.jpg)

On the day before the main event I ran a workshop covering How to Build Large Front-End Apps that Scale. By "scale" I mean grow in a maintainable way. The workshop covers principles and practices that help this take place and we use the BladeRunnerJS toolkit to help demonstrate these.

I've had some feedback from the workshop already and it seemed to go down really well. Although we used BRJS, the skills and ideas are very much transferrable to other tools. From the product point of view it was really valuable to run a workshop and see first-hand how others find using BRJS. Thanks to everybody that attended and I'll post more information after I've gathered and analysed further feedback.

## Facebook's FluxJS

One of the core takeaways from the workshop should be the importance of building applications in consistent ways; if this application is going to stand the test of time it needs to be as easy as possible for anybody to pick up, extend and maintain the codebase.

[Bill Fisher](https://twitter.com/fisherwebdev) and [Jing Chen](https://twitter.com/jingc) spoke at ForwardJS about [FluxJS](http://facebook.github.io/react/blog/2014/05/06/flux.html). Flux is much more an application pattern than it is a library (although they are open sourcing some of the components they use). At the start of the talk Jing stated that they use FluxJS because they need to build Facebook apps in consistent and maintainable ways from the very beginning. By applying contraints at the start it ensures that they avoid problems as the apps become larger and more complex.

<blockquote class="twitter-tweet" lang="en"><p>Applying constraints on your web app from the start will stop it getting out of control as complexity and size increases <a href="https://twitter.com/hashtag/forwardjs?src=hash">#forwardjs</a> <a href="https://twitter.com/hashtag/fluxjs?src=hash">#fluxjs</a></p>&mdash; Phil Leggetter (@leggetter) <a href="https://twitter.com/leggetter/statuses/492813388758528001">July 25, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

It's great to [yet again](https://twitter.com/floydophone/status/462529304904364032) see that Facebook are taking very similar approaches to building their applications as we do with our [Caplin Trader](http://www.caplin.com/business/page/caplin-trader) products - all enabled and supported by BladeRunnerJS.

## ES6 Modules & HTTP2

Right now the default [bundling](http://bladerunnerjs.org/docs/concepts/bundlers/) (analysis and concatenation of JavaScript files) plugin with BRJS supports writing JavaScript in a CommonJS/Node.js style syntax.

```js
var thing = require( 'thing' );

function MyThing() {
  thing.doStuff();
}

module.exports = MyThing;
```

This functionality is provided via a plugin because we've identified this as something that is subject to change. ES6 and ES6 modules are a perfect example of a plugin we may create in order to allow BRJS applications to be written using ES6.

```js
import thing;

class MyThing {
  constructor() {
    thing.toStuff();
  }
}
```

At ForwardJS [Guy Bedford](https://twitter.com/guybedford) gave a talk on SPDY/[HTTP2](http://http2.github.io/) and how that may relate to ES6 modules. He covered how HTTP2 enables multiple requests to be pipelined over a single connection and how applications will automatically benefit as HTTP2 is enabled on clients and servers.

```html
<head>
  <link href="css/styles1.css" rel="stylesheet" />
  <link href="css/styles2.css" rel="stylesheet" />
  <script src="js/script1.js"></script>
  <script src="js/script2.js"></script>
</head>
```

In the example above all the stylesheets and scripts can be retrieved over the same connection and in parallel; reducing resource usage and minimising latency. ES6 module loading should also be able to take advantage of this.

Guy mentioned the importance of [hinting (prefetch)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Link_prefetching_FAQ) when resources would result in additional resource downloads e.g. if `styles1.css` resulted in a request for an image. It's possible that tooling - a BRJS plugin or Grunt/Gulp task - could help with the automation of this and avoid the overhead of manually working out resource dependencies.

Until then we'll need to continue to use tooling that concatenates files of the same type into single bundles and augment application entry points (e.g. `index.html`) as part of the deployment. The above examples may become:

```html
<head>
  <link href="bundled/css/all_styles.css" rel="stylesheet" />
  <script src="bundled/js/all_scripts.js"></script>
</head>
```

## Web Components

<img src="/blog/img/webcomponents.svg" align="right" style="margin-left: 20px; margin-bottom: 20px;" />

Web Components were mentioned at ForwardJS, both in the [keynote by Christian Heilmann](https://www.youtube.com/watch?v=emicZVMZxac&sns=tw) and in a talk by [Erik Bryn](https://twitter.com/ebryn). At Caplin we've been building componentised web applications for a number of years. [Blades](/docs/concepts/blades/) can be considered components and it may be that the implementation of Blades becomes Web Components in future BRJS applications since we're not tied to any specific front-end technology.

Exactly what goes into a Web Component is open for discussion. A [FIRST (Focused, Independent, Reusable, Small & Testable) approach](http://addyosmani.com/firs/) is being touted, but I'm not entirely sure you can be quite so rigid with your Web Component structure and strategy. Should your application be an HTML page that imports and uses a number of components? Should that HTML page import and instantiate a single Web Component composed of many other components? Should a component only offer a small piece of functionality or should it offer a vertical slide of functionality - a business feature? I think this topic deserves a post all of its own.

## Forward 2 - More Forwarder

[Forward 2](http://forwardjs.com/2/) has already been announced for February 2015. It's definitely worth signing up for the newsletter to keep informed about what'll be in the next installment of this forward-thinking JavaScript conference.
