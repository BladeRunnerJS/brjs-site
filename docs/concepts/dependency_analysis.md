---
layout: docs
title: Dependency Analysis
permalink: /docs/concepts/dependency_analysis/
---

One of the main benefits of BladeRunnerJS is that it analyses your application assets for dependencies so that only the assets that you actually use are served to the web browser. For example, if the `index.html` of your application looks like this:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <base href="@APP.VERSION@"/>
    
    <title>My Awesome BRJS App</title>

    <@css.bundle theme="standard"@/>
  </head>
  <body>
    <@js.bundle@/>
    <script>
      ( function() {

        /*** new code ***/
        var App = require( 'awesome/App' );
        /*** end of new code ***/
        var app = new App();

      } )();
    </script>
  </body>
</html>
```

BRJS detects that the application has a dependency on the JavaScript class defined in `awesome/App`. If the definition of `awesome/App` looks as follows:

```javascript
/*** new code ***/
var WowBladeViewModel = require( 'awesome/amazing/WowBladeViewModel' );
var MegaBladeViewModel =  require( 'awesome/fantastic/MegaBladeViewModel' );
/*** end of new code ***/

function App() {
  /* App functionality here */
}

module.exports = App;
```

BRJS can determine that you are using both `awesome/amazing/WowBladeViewModel` and `awesome/fantastic/MegaBladeViewModel` through analysing the code and looking for `require` statements. From here BRJS analyses those Blades for dependencies in the same way. BRJS also looks for any other resources associated with those Blades - CSS, images, HTML templates, i18n, config and so on - and bundles and serves those too.

As stated above, it allows the dev server to only serve the assets that your application actually uses to the client. What's more, the same process is also followed when creating a deployment package for your application.