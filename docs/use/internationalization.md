---
layout: docs
title: Internationalizing your app
permalink: /docs/use/internationalization/
---

BladeRunnerJS comes with in-built support for internationalization. Below are
the details required to add internationalization support to your BRJS application.

## Set up Supported Locales
Have a look in `app.conf`. It defines the locales that your app will support

```
requirePrefix: <namespace>
locales: en, de, es
```

## Include the Internationalization Bundler

Include the Internationalization Bundler in your app and workbench, by adding the `i18n.bundle` line into your `index.html` file.

```html
<head>
<title>Workbench</title>

<@css.bundle theme="standard"@ />

<!-- new code -->
<@i18n.bundle@/>
<!-- end of new code -->

<@js.bundle@ />
</head>
```

## Internationalizing via HTML

We will be using the workbench generated inside a newly created blade for this example. This is what it looks like before we make changes.

![](/docs/use/img/hello-world-workbench-no-console.png)

Let's add a new element inside our HTML, which will be automatically internationalized. Internationalization markup in BRJS takes the form of: `@{<token>}`. It's best to namespace your token so that other blades don't overwrite each other's tokens

```html
<div id="demo.blades.myblade.view-template">
   <h1>@{demo.blades.myblade.title}</h1>
   <div class="hello-world-message" data-bind="text:message"></div>
   <button class="button" data-bind="click:buttonClicked">Log me</button>
</div>
```

Then define the token translation inside the file: `$BLADE_ROOT/resources/i18n/en/en.properties`

```
demo.blades.myblade.title=Cool Title
```

Refresh the workbench, and it should look like this.

![](/docs/use/img/workbench-i18n-title.png)

The token replacement works by replacing all i18n tokens in all HTML as it is streamed through the HTML Bundler.

## Internationalizing via JavaScript

Let's add an internationalized property to the blade's view model at `$BLADE_ROOT/src/demo/blades/myblade/MybladeViewModel.js`.

```js
'use strict';

var ko = require( 'ko' );

/*** new code ***/
var i18n = require( 'br/I18n' );
/*** end of new code ***/

function MybladeViewModel() {
  /*** new code ***/
  var text = i18n( 'demo.blades.myblade.helloworldmessage' );
  this.message = ko.observable( text );
  /*** end of new code ***/
}

MybladeViewModel.prototype.buttonClicked = function() {
  console.log( 'button clicked' );
};

module.exports = MybladeViewModel;
```

Then add the translation to the i18n resource file.

```
demo.blades.myblade.title=Cool Title
/*** new code ***/
demo.blades.myblade.helloworldmessage=Internationalized Hello World!
/*** end of new code ***/
```

After a refresh of the blade workbench, your token should have been replaced, and it should look like this:

![](/docs/use/img/i18n-en.png)

## Add a New Language

Create a file `$BLADE_ROOT/resources/i18n/es/es.properties` file, containing:

```
demo.blades.myblade.title=Titulo Guay
demo.blades.myblade.helloworldmessage=Hola Mundo Internacionalizado!
```

Loading the app with a Spanish locale set in the browser, will display like this:

![](/docs/use/img/i18n-es.png)

## Useful Tips

### Missing Translations

If you miss out a translation, then the i18n makes it pretty obvious to you.

![](/docs/use/img/i18n-error.png)

## I18n at Different Levels

You can internationalize at different levels of your application, by locating property files under the different levels in their resource folders

* Aspect: `/app/aspect/resources/i18n`
* BladeSet: `/app/bladeset/resources/i18n`
* Blade: `/app/bladeset/blade/resources/i18n`
