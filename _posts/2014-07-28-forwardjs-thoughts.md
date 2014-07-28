---
layout: post
title: "Thoughts from ForwardJS"
authors: [leggetter]
thumb: blah.jpg
bgimg: /blog/img/blah.jpg
latest: true

excerpt: ForwardJS took place in San Francisco last week. It was a great event consisting of progressive workshops and talks. Here's a post covering our involvement and the things I found most interesting: FluxJS, ES6 and Web Components.

---

ForwardJS took place in San Francisco last week. It was a great event consisting of progressive workshops and talks. Here's a post covering our involvement and the things I found most interesting: FluxJS, ES6 and Web Components.

## Building Large JS Apps Workshop

**TODO: image**

On the day before the main event I ran a workshop covering How to Build Large Front-End Apps that Scale. By "scale" I mean grow in a maintainable way. The workshop covers principles and practices that help this take place and we use the BladeRunnerJS toolkit to help demonstrate these.

I've had some feedback from the workshop already and it seemed to go down really well. Although we use BRJS the skill and ideas are very much transferrable to other tools. But from the product point of view getting people to use BRJS is really valuable. Thanks to everybody that attended and I'll post more information after I've gathered and analysed further feedback.

## Facebook's FluxJS

One of the core takeaways from the workshop should be the importance of building applications in consistent ways; if this application is going to stand the test of time it needs to be as easy as possible for anybody to pick up, extend or maintain the codebase.

PersonA and PersonB spoke at ForwardJS about FluxJS. Flux is much more an application pattern than it is a libray (althought they are open sourcing some of the components they use). At the start of the talk PersonA stated that they use FluxJS because they need to build Facebook apps in consistent and maintainable ways from the very beginning. By applying contraints at the very beginning it ensure that they avoid problems as the apps become larger and more complex.

**TODO: insert tweet**

It's great to yet again see that Facebook are taking very similar approaches to building their applications as we do with our [Caplin Trader]() **TODO: link** products.

## ES6 Modules & HTTP2

Right now the default [bundling]() **TODO: link** (analytis and concatenation of JavaScript files) plugin with BRJS supports writing JavaScript in a CommonJS/Node.js style syntax.

```js
// TODO: CommonJS example
```

This functionality is provided via a plugin because we've identified this as something that is subject to change. ES6 and ES6 modules are a perfect example of a plugin we may create in order to allow BRJS applications to be written using ES6.

```js
// TODO: ES6 example
```

At ForwardJS [Guy Bedford](https://twitter.com/guybedford) gave a talk on SPDY/[HTTP2]() **TODO: link**. He covered how multiple HTTP requests can be pipelined over a single HTTP request and how applications will automatically benefit as HTTP2 is enabled on clients and servers.

```html
<head>
  <link href="css/styles1.css" rel="stylesheet" />
  <link href="css/styles2.css" rel="stylesheet" />
  <script src="js/script1.js"></script>
  <script src="js/script2.js"></script>
</head>
```

In the example above all the stylesheets and scripts can be retrieved over the same connection and in parallel; reducing resource usage and minimising latency **TODO: check terminology**.

Guy mentioned the importance of hinting where resources would result in additional resource downloads e.g. if `styles1.css` resulted in a request for an image. It's possible that tooling - a BRJS plugin or Grunt/Gulp task - could help with the automation of this.

Until then we'll need to continue to use tooling that concatenates files of the same type into single bundles and augment application entry points (e.g. `index.html`) as part of the deployment. For example:

```html
<head>
  <link href="bundled/css/all_styles.css" rel="stylesheet" />
  <script src="bundled/js/all_scripts.js"></script>
</head>
```

## Web Components

At Caplin we've been building componentised web applications for a number of years. [Blades](/docs/concepts/blades/) can be considered components and it may be that they become Web Components in future BRJS applications.

**TODO: image**

Exactly what goes into a Web Component is open for discussion. A FIRST approach is being touted, but I'm not entirely sure you can be quite so rigid with your Web Component strategy. Should your application consist of a single Web Component composed of many other components? Should a component only offer a small piece of functionality or should it offer a vertical slide of functionality - a business feature? I think this topic deserves a post all of its own.
