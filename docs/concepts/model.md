---
layout: docs
title: The BladeRunnerJS Model
permalink: /docs/concepts/model/
---

The BladeRunnerJS model is at the core of the BRJS toolkit. The model provides an abstraction away from files on the disk and provides rich access to the components and assets within an App.

The model also provides extension points for plugins. New commands, bundlers and file type support can be easily added and hooked into the existing logic to handle dependencies and serve content.

Most web app development environments and toolsets treat an app as a bunch of files. The files are initially created using scaffolding tools like Yeoman and then built and deployed with the likes of Grunt, Gulp and Broccoli. These stitch together tools such as file-watchers, CSS compilers, JavaScript compressors like Uglify/Closure etc. BladeRunnerJS takes a different approach - implementing a rich domain model for a web app.

## Models and Abstraction

Amidst the daily bustle of building web apps its easy to forget that things like DOM elements, HTTP requests, closures, files etc don't really exist. They are abstractions - logical constructs used to encapsulate the myriad complexities of modern computers and communications networks. What really exists are: electrons moving through semiconductors, photons passing along optical fibers, liquid crystals changing orientation when a current is applied and such-like. Our day-to-day work is only made practically possible precisely because we don't have to think about the details of such things. The bulk of computer science is about building layers of abstractions. Good abstractions make programmers hugely more productive, giving us the mental models to think, communicate and solve problems effectively.

## BladeRunnerJS domain model

If abstractions are so important, what is a good way to model a web app? For BRJS we've decided to create a fully fledged [domain model](http://en.wikipedia.org/wiki/Domain_model). Each application is modelled as an instance of the `App` class. The bulk of an `App`'s code is contained in isolated features (components) called [`Blades`](http://bladerunnerjs.org/docs/concepts/blades/).

To list blades in an App simply execute the following code:

```java
BRJS.app("my-app").bladeset("my-bladeset").blades();
```

A `BladeSet` is a mechanism for grouping blades. In turn a `Blade` consists of many `Assets` each of which represents a single resource like an image, CSS or JavaScript file.

The `Blade` is responsible for knowing where `Asset` files may live on disk. Every (sub)type of `Asset` must implement the following interface:

```java
public interface Asset {
  Reader getReader() throws IOException;
  String getAssetPath();
  String getAssetName();
  ...
}
```

As you can infer from the interface, `Assets`  are responsible for transforming their input into a readable stream (e.g. compiling CoffeeScript to JavaScript). They also provide string names (decoupled from their location on disk) by which they can be referenced.

Core application model concepts include:

* [Apps](/docs/concepts/apps/)
* [Aspects](/docs/concepts/aspects/)
* [Bladesets](/docs/concepts/bladesets/)
* [Blades](/docs/concepts/blades/)

## Advantages of a domain model

#### Creates a ["ubiquitous language"](http://www.peoplematter.com/blog/domain-driven-design-importance-ubiquitous-language)

This enables us to reason about a web app and aids communication between developers. Although the most nebulous advantage it is also in many ways the most important.

#### Enables a richer plugin architecture for better extensibility

Many plugins are provided as part of core BRJS but it is easy to add new ones. Rather than just being able to look at files, plugins access the domain model.

The dependency analysis plugin uses the dependency model (which is a graph) to generate the output shown above. Similarly you can create a plugin that automatically creates an [application cache](http://www.html5rocks.com/en/tutorials/appcache/beginner/) for a mobile project. It consisted of a few hundred lines of code - querying the domain model and generating the `.appcache` file. You can find the [brjs-appcache-plugin source code here](https://github.com/caplin/brjs-appcache/).

#### BRJS [memoizes](http://en.wikipedia.org/wiki/Memoization) the output of model methods

This reduces the cycle time from changing a line of code to reloading the browser - essential for good developer productivity. Even better, memoization is hidden inside the model so plugin developers reap the rewards without even being aware its happening.

#### Technology migration path

The JavaScript development ecosystem is changing very rapidly e.g. ES6 and Web Components will be available shortly. The code and structure of an app built today is radically different from one built three years ago. Large scale applications however are long lived and we can't afford to be constantly re-writing them. The plugin architecture and model allow us to keep legacy code running and interoperate  with newer styles of code and tooling. This gives us a smooth migration path as web technologies emerge.

#### Code consistency

With many developers working on a web app it helps to have consistency across the codebase. The model allows the enforcement of conventions. For example, the domain model (through namespacing) ensures that developers on separate areas of code cannot cause conflict by using duplicate HTML ID's or i18n labels.

#### Your first line of code is feature code

Because all the conventions and tools are encapsulated within the model (and core plugins) it is easy to onboard developers quickly. They don't have to spend time setting up build config files and installing build dependencies. They put code in the conventional place and refresh their browser - after having run their tests of course!

#### Conventions can be changed

The great thing about having all your conventions encapsulated in a single place is that if you don't like them they are relatively easy to change.

#### Much more than just a build tool.  

For example our BRJS "Dashboard" allows you to browse a visual representation of your web app.
You can explore, run tests, scaffold new `Assets` and build the final deployment artifact with the click of a button. It works by calling a web service layer that interrogates the domain model.

![](/blog/img/web-dashboard-todo-model.png)

#### Dependency Analysis

BRJS performs a recursive analysis and models your app as a full dependency tree rooted on its  `index` page. This enables BRJS to deliver the minimal code to your browser and provide a dependency analysis tool.

For more information see [Dependency Analysis](/docs/concepts/dependency_analysis/).

## Where next?

The content of the page came from a blog post we wrote on [Modelling Web Apps](http://bladerunnerjs.org/blog/modelling-webapps/). It covers additional factors including how the BRJS solution compares to tools like Grunt, Gulp and Broccoli.

You can also dive deeper in to the [Dependency Analysis](/docs/concepts/dependency_analysis/) and [Bundler](/docs/concepts/bundlers/) concepts.
