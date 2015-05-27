---
layout: docs
title: How to Add a Blade to an Aspect
permalink: /docs/use/add_blade_to_aspect/
---

Once you've [created a Blade](/docs/use/create_blade) and developed it in isolation
in a [Workbench](/docs/concepts/workbenches) you will want to add it to an
[Aspect](/docs/concepts/aspects).

In the aspect folder (by default your main app folder) you'll find an
`App.js` file in the following location:

```bash
src/app-name/App.js
```

In order to add the Blade to the Aspect you need to do the following:

* `require` the View Model for the Blade
* Create an instance of the required View Model
* `require` the `KnockoutComponent` helper class
* Create a `KnockoutComponent` that binds the View Model instance to the Blade's view (referenced by a unique view ID)
* Create an element representing the Blade by calling `getElement` on the
`KnockoutComponent` instance
* Append the element to the DOM (Document Object Model)

The following example demonstrates this:

```javascript
'use strict';

/*** new code ***/
var InputViewModel = require( 'brjstodo/todo/input/InputViewModel' );
var KnockoutComponent = require( 'br/knockout/KnockoutComponent' );
/*** end of new code ***/

var App = function() {
  /*** new code ***/
  var inputViewModel = new InputViewModel();
  var inputComponent =
    new KnockoutComponent( 'brjstodo.todo.input.view-template', inputViewModel );
  var inputEl = inputComponent.getElement();

  document.body.appendChild( inputEl );
  /*** end of new code ***/
};

module.exports = App;
```
