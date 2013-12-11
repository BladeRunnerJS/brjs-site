---
layout: docs
title: Presenter
permalink: /docs/concepts/presenter/
---

**Presenter** is a JavaScript-based MVVM framework that you can use for creating the user interfaces. It's based around the [Knockout](http://knockoutjs.com/) library, but has been modified to work in a way specific to BRJS.

<div class="alert alert-info">
  <p>Knockout 3.0 is more extensible than Knockout 2.x and we plan to <a href="https://github.com/BladeRunnerJS/brjs/issues/106">investigate how we can make Presenter extend Knockout 3.x</a>, rather than requiring a modified version of the 2.x library.</p>
</div>

## Separation of Concerns

The basis of *Presenter* is the separation of the HTML mark-up and CSS styling that describe the front-end of your user interface from the (JavaScript) code that controls the logic.

For example: the HTML **View** might contain a button, but the details of whether the button is enabled or disabled, visible or hidden, what it does when it is clicked and whether it has been clicked already, are all in the JavaScript **Presentation Model**.

User actions are fed back to the Presentation Model, which calculates any effects they will have on the underlying data, and immediately updates the view that the user can see, if necessary.

## Model Overview

We've already mentioned the (HTML) View and the (JavaScript) Presentation Model, and those are the main two things that you will be working with in *Presenter*, but there is a third, hiding in the background: the **Domain Model**. The Domain Model contains the data that the Presentation Model works with, and the business rules that it has to apply. If the data change as a result of user input, the Presentation Model will feed the changes back to the Domain Model. If any new data are received from the Domain Model (which will probably happen several times a second), the Presentation Model will immediately update the View.

<img src="/docs/concepts/img/presentation-model.png" width="600" />

## View

Written in HTML, with appropriate CSS styling, the View defines the actual user interface. HTML elements are bound to "properties" in the Presentation Model using the data-bind attribute.

## Presentation Model

Written in JavaScript, the behaviour of the User Interface is defined in the Presentation Model, and can be seen as a logical representation of the UI. It processes all user actions, and feeds the latest data to the View, communicating with the Domain Model as necessary.  

The *Presentation Model* encapsulates ALL the behaviour of the GUI component. You must create one that extends the `b/presenter/PresentationModel` abstract base class. You can then either instantiate your Presentation Model class directly, or just pass the class name to the Presenter Component in its constructor, and allow it to construct the model for you.

The Presentation Model handles component life-cycle events (i.e. events in which a change occurs to the focus, size, visibility or activity status of the frame containing the component) if it implements the `br/component/ComponentLifecycleEvents` interface. Presenter forwards these events to the Presentation Model so that it can respond appropriately.

For example: the Presentation Model may dispose of resources that it no longer needs when its `onClose()` method is called.

The Presentation Model is a logical representation of the user interface, and is composed of a number of properties and functions for manipulating these properties.

The Presenter library synchronises the value of these properties with the View. Note that the View depends on the Presentation Model and listens to it for changes to property values, but the Presentation Model is NOT dependent on the View. It must be possible to create an instance of the Presentation Model without the View being present, so that the Presentation Model can be unit-tested in isolation.

The Presentation Model contains the properties it needs to model the GUI component it represents. It detects changes to these properties, and can respond appropriately by setting the values of other properties.

The Presentation Model mustn't contain any references to DOM elements in the View, as this breaks the Presentation Model pattern, by tying the Presentation model to a particular HTML construct.

## Domain Model

The Domain Model contains the application's business logic. It also feeds live data to the Presentation Model, as well as receiving updated information back from it as a result of user input.

If there is any complex business functionality, then it should be encapsulated in a separate "Domain Model" class. It is the responsibility of the Presentation Model to instantiate any Domain model and synchronise it with the View.

## Integration Presenter Syntax

The data-bind attributes are a part of HTML5, that has been built upon by *Knockout.JS*, but the Presentation Model itself is based on the `br/presenter/PresentationModel` class.  Data in the Presentation Model are stored in Properties, which extend the `br/presenter/property/Property` class, and in some cases (notably HTML forms), these properties are grouped into fields, which are extensions of the `br/presenter/node/PresentationNode` class.

All Presenter's objects, classes and packages are based around this same format, making it very easy to use it to incorporate any component or function into your interface.
 
The HTML **View** is really very simple, and it doesn’t get much more complicated, even when you get to more complex functionality. It looks like this:

```html
<div id="view-template">
  <div id="message" data-bind="text:message"></div>
</div>
```

The clever bit is what the `data-bind` attribute is doing. By setting the `data-bind` to `"text:message"`, we are telling *Presenter* to replace the text content of the element with the value of the `message` property in the *Presentation Model*. So even if you add any content to the `<div>`, the `data-bind` attribute will override it.

```javascript
var br = require( 'br' );
var Property = require( 'br/presenter/property/Property' );
var PresentationModel = require( 'br/presenter/PresentationModel' );

function Demo() {
  this.message = new Property( 'Hello World!' );
};
br.implement( Demo, PresentationModel );
```

## How Presenter uses Knockout

The `data-bind` system used in Presenter comes from Knockout.js, a third-party open source library, available under the MIT license. You can find details of the data-bind types used in Presenter in [Knockout's own documentation](http://knockoutjs.com/documentation/introduction.html).

Beyond the use of the `data-bind` attribute, you don't actually have to know anything about the *Knockout* API, because *Presenter* handles it all for you, allowing you to use the same format for building components in *Presenter* as are used elsewhere in your BRJS app.

### Knockout and Presenter

Knockout uses a structure called *Model - View - View Model*, or "MVVM" for short. Presenter uses the same basic structure, but adapts it, so that developers using Presenter can use the `br/component/Component` syntax.

If you used Knockout directly, your HTML View would look much the same as it does in Presenter, but instead of the *Presentation Model*, you'd use Knockout's own classes to create a *View Model*. The Knockout Library scans the HTML for any elements that contain `data-bind` attributes, and they are then bound to "observable" objects in the View Model.

<img src="/docs/concepts/img/presenter-knockout.png" width="600" />

Using Presenter, you only have to worry about the HTML View and the *Presentation Model*. Knockout's View Model and Library are still there, but you don't have any direct contact with them. Basically, Presenter allows you to get the benefits offered by Knockout, but in a way that reduces the amount of "plumbing code" that you need, and which is fully integrated with BRJS components, controls and business model objects.
