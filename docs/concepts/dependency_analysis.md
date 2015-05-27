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
    <@base.tag@/>
	<meta charset="UTF-8">
    
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

BRJS can determine that you are using two [blades](/docs/concepts/blades/):

1. `awesome/amazing/WowBladeViewModel`
2. `awesome/fantastic/MegaBladeViewModel`

It does this by analysing the code and looking for `require` statements. From here BRJS analyses those Blades for dependencies in the same way. **BRJS also looks for any other resources associated with those Blades - CSS, images, HTML templates, i18n, config and so on - and bundles and serves those too**.

As stated above, it allows the dev server to only serve the assets that your application actually uses to the client. What's more, the same process is also followed when creating a deployment package for your application.

### BRJS CLI Dependency Analysis Example

You can also use the `brjs` CLI to check your application dependencies.

```
$ ./brjs app-deps awesome
Java HotSpot(TM) 64-Bit Server VM warning: ignoring option MaxPermSize=128M; support was removed in 8.0
Aspect 'default' dependencies found:
  +- 'index.html' (seed file)
  |  \- 'src/awesome/App.js'
  |  |  \- 'amazing-bladeset/blades/wow/src/awesome/amazing/wow/WowViewModel.js'
  |  |  |  \- 'amazing-bladeset/blades/amazing/src/awesome/amazing/mega/WowDomainModel.js'  
  |  |  |  \- 'amazing-bladeset/blades/amazing/src/awesome/amazing/mega/WowFormatter.js'
  |  |  \- 'fantastic-bladeset/blades/mega/src/awesome/fantastic/mega/MegaViewModel.js'
  |  |  |  \--- 'fantastic-bladeset/blades/mega/src/awesome/fantastic/mega/YoValidator.js'
  |  |  |  \--- 'fantastic-bladeset/blades/mega/src/awesome/fantastic/mega/YoYoer.js'

  (*) - subsequent instances not shown (use -A or --all to show)
```

The full domain model also includes classes that represent tests, minifiers, deployable artifacts etc. In short it fully understands the semantics and (dependency) structure of your web-app. It's not just a bunch of files but a rich model that is decoupled from the actual structure and contents on disk (also see [Bundlers](/docs/concepts/bundlers/)).

## Where next?

The dependency analysis functionality is used during development and when building applications. For more information on the latter see [Building & Deploying Apps](/docs/use/build_deploy/).

You can find out more about using the BRJS CLI via the [Using the BRJS CLI docs](/docs/use/commandline/)
