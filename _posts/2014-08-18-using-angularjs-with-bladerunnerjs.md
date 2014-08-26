---
layout: post
title: "Using AngularJS with BladeRunnerJS"
authors: [leggetter]
thumb: angularjs.png
latest: true

excerpt: ""

---

For quite a while now we've spoken about it being possible to use any framework/library (e.g. Backbone, Angular, Ember, React, Polymer) within a BladeRunnerJS (BRJS) app. [Angular](https://angularjs.org/) is by far the most popular front-end framework so it makes sense to demonstrate how to use it with BRJS first. Although we've done some work internally to ensure this is the case we need to:

1. Provide some examples of using BRJS with Angular
* Make it easy to get started with BRJS and Angular
* Demonstrate best practice when using BRJS and Angular

Points 1 and 2 are relatively simple. The reason for this post is to discuss point 3 - "best practice" when **using Angular within a BRJS app**.

In order to do this we'll re-create the [Todo MVC application](http://todomvc.com/) using BRJS and Angular.

## BRJS Application Structure

The purpose of BladeRunnerJS is to give you all the tooling required to build a scalable modular front-end application. BRJS applications consist of:

* [blades](http://bladerunnerjs.org/docs/concepts/blades) - where each blade is an application feature (a *slice* of application functionality)
* [services](http://bladerunnerjs.org/docs/concepts/services) - a [cross cutting concern](http://en.wikipedia.org/wiki/Cross-cutting_concern) that can be used independently by multiple application features - often used for accessing shared resources and to facilitate inter-blade communication

Within our Todo application we'll have three blades:

* input - to input new todo items
* items - to display a list of existing Todo items
* filter - to allow actions to be performed of the list of items

We'll have a single service that will provide Todo specific functionality:

* TodoService - add, update, remove and get Todo items

The service will be defined within a [library](http://bladerunnerjs.org/docs/concepts/libraries/).

One of the main driving forces behind BRJS application architecture is testability. But for the sake of brevity we'll omit writing tests from this post.

## Using the BRJS toolkit

The BRJS toolkit comes with an executable CLI that provide you with everything you need to automate common tasks when building BRJS apps. This includes scaffolding your app, a development server, running your blades in isolation, running tests, running your full app and more. The CLI can be found within the `BladeRunnerJS/sdk/` directory. Execute `./brjs help` to find out more.

## Create the Todo App

Use the `create-app` command to scaffold a BRJS application.

```
$ ./brjs create-app brjstodo
```

For now, applications need to reside within an `apps` folder within the `BladeRunnerJS` directory. The above command will create an application called `brjstodo` within the `apps` directory. That directory will have the following contents:

```
apps/brjstodo
├── app.conf    # Application configuration
├── index.html  # Application entry point
├── libs        # Other app libraries
├── resources   # For other app resources
├── src         # For app-level JavaScript
├── tests       # Application tests
└── themes      # CSS and images
```

## Adding Angular to a BRJS App

We know we're going to be using Angular so before we do anything else let's add the `angular.js` library to the applications. Third Party [Libraries](http://bladerunnerjs.org/docs/concepts/libraries/) are easily added to a BRJS application.

Within `apps/brjstodo/libs` create an `angular` directory. Withing that directory add the Angular JavaScript library. Finally, create a `thirdparty-lib.manifest` with the following contents:

```
exports: angular
```

The purpose of this manifest file is to define how the contents of the `angular` library directory are used. In this case all the absence of any `js` or `css` properties within the manifest file means everything should be bundled (well, just the `angular.js` file). The `exports` property identifies the JavaScript object to be exported from the module.

Angular can now be required and used in any JavaScript file using:

```js
var angular = require( 'angular' );
```

## How to use Angular in a Blade?

The trend towards [building componentised web apps](http://www.futureinsights.com/home/the-state-of-the-componentised-web.html) continues so as well as each blade representing a feature within our Todo app it will also be a component.

First, let's scaffold out the `Input` blade using the CLI:

```
$ ./brjs create-blade brjstodo default input
```

*Note: `default` is presently required but we'll remove the need for it shortly **TODO: link to issue***

This will create all the basic assets required for the blade within `apps/brjstodo/blades/input`. The contents will be as follows:

```
blades/input
├── resources
│       ├── html   # HTML views
│       └── i18n   # Language files
├── src            # JavaScript
├── tests          # Blade tests
├── themes         # CSS and images
└── workbench      # Files to run the blade in isolation
```

Now we have the basic scaffolding in place we can create an [Angular Directive](https://docs.angularjs.org/guide/directive) that represents the input component for the Todo app.

First we should define the HTML template. The convention here is to separate HTML and JavaScript so let's create create a `view.html` within the `blades/input/resources/html/` directory with the following content:

```html
<header id="brjstodo.ng.input.view-template" class="input-component">
	<h1>todos</h1>
	<form id="todo-form" ng-submit="addTodo()">
		<input class="todo-input" placeholder="What needs to be done?" ng-model="newTodo" autofocus>
	</form>
</header>
```

Next, create an `InputDirective.js` file within `blades/input/src` with the following content:

```js
'use strict';

var ServiceRegistry = require( 'br/ServiceRegistry' )

var InputDirective = function() {
	var HtmlService = ServiceRegistry.getService( 'br.html-service' )

	this.restrict = 'E';
	this.replace = true;
	this.template = HtmlService.getHTMLTemplate( 'brjstodo.ng.input.view-template' ).outerHTML;

	this.controller = function( $scope ) {
		$scope.newTodo = '';
		$scope.addTodo = function() {
			var newTodo = $scope.newTodo.trim();
			if (!newTodo.length) {
				return;
			}

			var todoItem = { title: newTodo };
			// TODO: store the todo item
			console.log( todoItem );

			$scope.newTodo = '';
		}
	};

};

module.exports = InputDirective;
```

You'll noticed that we're just logging the `todoItem` at the moment. Instead of doing that we actually want to persist the todo item and also ensure that items blade is informed about the new item. We achieve this using services - let's create a `TodoService` to handle this.

## The TodoService

As mentioned earlier, services can be used for "accessing shared resources" and for "inter-blade communication" which is exactly what we want to do here. We want to persist todo items and we want the items blade to be informed of the new todo item. The `TodoService` will do exactly this.

Let's create the `TodoService` within a library. [Libraries](/docs/concepts/libraries) can be scaffolded using the BRJS CLI.

```
$ ./brjs create-library brjstodo todomvc
``

This creates a directory called `todomvc` within `apps/brjstodo/libs/` with the following structure:

```
apps/brjstodo/libs/todomvc
├── br-lib.conf
├── src
└── test-unit
```

Within the `src` directory create a `TodoService.js` file with the following contents:

```js
var br = require( 'br/Core' );
var Emitr = require( 'emitr' );

var TODO_ITEMS_ID = 'brjs-todo-items';

function TodoService() {
	var items = localStorage.getItem( TODO_ITEMS_ID );
	this._items = ( items ? JSON.parse( items ) : [] );
}
br.extend( TodoService, Emitr );

TodoService.prototype.addTodo = function( item ) {
	this._items.push( item );
	this._sync();
	this.trigger( 'todo-added', item );
};

TodoService.prototype.updateTodo = function( item ) {
	this._items.forEach( function( existingItem, index ) {
		if ( item === existingItem ) {
			// since check is by reference there's no need for the following line
			// this._items[ i ] = item;
			this._sync();

			this.trigger( 'todo-updated', item );

			return false;
		}
	}, this );
};

TodoService.prototype.removeTodo = function( item ) {
	this._items.forEach( function( existingItem, index ) {
		if ( item === existingItem ) {
			this._items.splice( item, 1 );
			this._sync();

			this.trigger( 'todo-removed', item );

			return false;
		}
	}, this );
};

TodoService.prototype.getTodos = function() {
	return this._items;
};

TodoService.prototype._sync = function() {
	localStorage.setItem( TODO_ITEMS_ID, JSON.stringify( this._items ) );
	console.log( this._items );
};

module.exports = TodoService;

```

This is the full definition of a chat service that store and retrieves items to [localStorage](https://developer.mozilla.org/en/docs/Web/Guide/API/DOM/Storage#localStorage). Since this service is a simple object that doesn't have anything to do with Angular we'll ignore the details. For now we're only going to use the `addTodo` function from the input blade.

Before we can access the new service we need to register it with the service registry. Within `blades/input/workbench/resources` you'll find an `aliases.xml` file. Add the following in order to ensure the new `TodoService` is registered and can be accessed from the `ServiceRegistry` usin gthe unique ID of `todomvc.storage`:

```xml
<aliases xmlns="http://schema.caplin.com/CaplinTrader/aliases" useScenario="dev">
	<alias name="todomvc.storage" class="todomvc.TodoService" />
</aliases>
```

Within this in place you can now update `blades/input/src/InputDirective.js` to retrieve the service from the `ServiceRegistry` and call `addTodo` on it.

```js
'use strict';

var ServiceRegistry = require( 'br/ServiceRegistry' )

var InputDirective = function() {
  var HtmlService = ServiceRegistry.getService( 'br.html-service' );
  /*** new code ***/
  var todoService = ServiceRegistry.getService( 'todomvc.storage' );
  /*** end of new code ***/

  this.restrict = 'E';
  this.replace = true;
  this.template = HtmlService.getHTMLTemplate( 'brjstodo.ng.input.view-template' ).outerHTML;

  this.controller = function( $scope ) {
    $scope.newTodo = '';
    $scope.addTodo = function() {
      var newTodo = $scope.newTodo.trim();
      if (!newTodo.length) {
        return;
      }

      var todoItem = { title: newTodo };
      /*** new code ***/
      todoService.addTodo( todoItem );
      /*** end of new code ***/

      $scope.newTodo = '';
    }
  };

};

module.exports = InputDirective;
```

## Create the Items blade

## Create the Filter blade

## Conclusion
