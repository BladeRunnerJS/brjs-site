---
layout: post
title: "Modelling Webapps"
authors: [jamest]
thumb: train.jpeg
latest: true

excerpt: Most web app development environments and toolsets treat a web-app as a bunch of files. The files are initially created using scaffolding tools like Yeoman and then built and deployed with the likes of Grunt, Gulp and Broccoli. These stitch together tools like file-watchers, CSS compilers, JavaScript compressors like Uglify/Closure etc. BladeRunnerJS takes a radically different approach - implementing a rich domain model for a web-app. Find out why?

---

### Introduction
Most web app development environments and toolsets treat a web-app as a bunch of files. The files are initially 
created using scaffolding tools like Yeoman and then built and deployed with the likes of Grunt, Gulp and Broccoli. 
These stitch together tools like file-watchers, CSS compilers, JavaScript compressors like Uglify/Closure etc. 
BladeRunnerJS takes a different approach - implementing a rich domain model for a web-app. 


### Food for thought: Models And Abstraction
Amidst the daily bustle of building web-apps its easy to forget that things like DOM elements, HTTP requests, closures, files etc
don't really exist. They are abstractions - logical constructs used to encapsulate the myriad complexities of modern computers
and communications networks. What really exists are: electrons moving through semiconductors, photons passing along optical 
fibers, liquid crystals changing orientation when a current is applied and such-like. 
Our day-to-day work is only made practically possible precisely because we don't have to think about the details of such things. The
bulk of computer science is about building layers of abstractions. Good abstractions make programmers hugely more productive, giving
us the mental models to think, communicate and solve problems effectively. 

### BladeRunnerJS domain model
If abstractions are so important, what is a good way to model a web-app? For BRJS we've decided to create a fully fledged 
[domain model](http://en.wikipedia.org/wiki/Domain_model). Each web-app is modelled as an instance of the ```App``` class. The bulk of an ```Apps```
code is contained in isolated features (components) called ``Blades``, [see here for more info](http://bladerunnerjs.org/docs/concepts/blades/).
To find all the blades in an App simply execute the following code

```java
BRJS.app("my-app").bladeset("my-bladeset").blades();
```

A ```BladeSet``` is a mechanism for grouping blades. In turn a ```Blade``` consists of many ```Assets``` each of which represents a single resource like an image, CSS or JavaScript file.
The ```Blade``` is responsible for knowing where ```Asset``` files may live on disk. Every (sub)type of ```Asset``` must implement the following interface: 

```java
public interface Asset {
	Reader getReader() throws IOException;
	String getAssetPath();
	String getAssetName();
	...
}
```
As you can infer from the interface, ```Assets``` are responsible for transforming their input into a readable stream (e.g. compiling CoffeScript to JavaScript). 
They also provide string names (decoupled from their location on disk) by which they can be referenced. Furthermore a ```LinkedAsset``` is a subtype 
of ```Asset``` which also provides the list of ```Assets``` on which it depends (by somehow referencing their names).  JavaScript code can define dependencies using 
standard ```require``` statements. However HTML and JSON are also treated as ```LinkedAssets``` and may be dependent on other ```Assets```. BRJS can therefore
start with the index page of your web-app, generate a full dependency tree and deliver the minimal code to your browser.            
The domain model fully understands the semantics of a web-app. It's not just a bunch of files but CSS, HTML, source code (of varying types) with inter-dependencies.
As you can see with the Asset example the actual structure and contents on disk of the App are decoupled from the model.

### BladeRunnerJS Plugins
The domain model itself is quite small, dealing with Abstract concepts like ```Assets``` and ```Blades```. The bulk of the code, including all the Asset implementations, consist of a set of Plugins.
Plugins conform to specific interfaces and generally have all or part of the BRJS model passed to them, which they query and/or update. 

### Comparison with existing technologies
It is instructive to compare this approach to that taken by current build tools. [This article]
(http://www.solitr.com/blog/2014/02/broccoli-first-release/) by Jo Liss, the author of Broccoli, is a really great summary of the issues. 
Like Jo we believe that to maximize developer productivity you must minimize the time from changing a line of code to reloading the browser. In BRJS
the model is responsible for watching all the ```Asset``` files. It [memoizes](http://en.wikipedia.org/wiki/Memoization) the output of model and plugin methods - reducing rebuild time to a minimum. 
So like Broccoli BRJS provides great performance but on top of that it include a domain model that we believ leads to a number of benefits. 

### Advantages of a domain model
Most of the advantages of a domain model flow from the fact that it encapsulates all the knowledge about the structure of your web-app. 

* 1. The domain model creates a ["ubiquitous language"](http://www.peoplematter.com/blog/domain-driven-design-importance-ubiquitous-language) that enables us 
to reason about a web-app and aids communication between developers. Although the most nebulous advantage it is also in many ways the most important.
* 2. The model enables a plugin architecture that can be extended. Many common plugins are provided as part of core BRJS but it is easy to add new ones.
For example we just created a plugin that automatically creates an [application cache](http://www.html5rocks.com/en/tutorials/appcache/beginner/) for a mobile project. It consisted of a few hundred lines of code - querying the domain model and generating the app-cache file.  
* 3. BRJS [memoizes](http://en.wikipedia.org/wiki/Memoization) the output of model methods, reducing rebuild time to a minimum. This is encapsulated
inside the model so it is transparent to Plugin developers. 
* 4. Large scale applications are long lived, the plugin architecture enable us to support new features (e.g. ES6 module and classes)
that co-exits with legacy code. This gives us a smooth migration path as web technologies change.
* 5. With many developers working on a web-app it helps to have consistency across the codebase. The model allows the enforcement
of conventions. Through the use of namespacing BRJS ensures that developers on separate areas of code cannot cause conflict by using
duplicate identifiers in HTML or i18n labels.  
* 6. Because all the conventions and tools are encapsulated within the model (and core Plugins) it is easy to onboard developers quickly. They don't have to spend
ages setting up build config files etc. All they have to put code in the conventional place and refresh their browser. Our mantra for developers is "your first line of code is feature code"  
* 7. All our conventions are encapsulated in a single place - so if you don't like them then they're easy to change. 
* 8. The model allows BRJS to be much more than just a build tool.  For example our "BRJS Dashboard" is a web-app that provides a visual
representation of the web-app. You can run tests, scaffold new Assets and build the final artifact at the click of a button. It accesses
the model via calls to a service layer that interrogates the domain model.

 At Caplin we've already reaped the benefits of using a domain model. Hopefully you will join us soon!  

