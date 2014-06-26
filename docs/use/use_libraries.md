---
layout: docs
title: How to use Libraries
permalink: /docs/use/use_libraries/
---

# How to use Libraries

There are two types of library: BladeRunnerJS conformant libraries and third-party libraries. For more information on the difference, see [Libraries](/docs/concepts/libraries/).

## BladeRunnerJS Conformant Library

"Conformant" libraries are libraries that follow the same directory structure as Blades. For more information on see the [libraries concept page](/docs/concepts/libraries/).

### Create a BladeRunnerJS Library

Before you can create a Library, you need to create an application. Details on how to do this are in our [guide to creating an app](/docs/use/create_app/).

Once you have an application, you can create a Library by running the following command in the CLI:

```bash
$ ./brjs create-library <app-name> <library-name>
```

If you followed the example in [How to Create an App](/docs/use/create_app/), you should now have an app called `brjstodo`.

Follow this example to create a library called `todolib` within this app.

```
$ ./brjs create-library brjstodo todolib todo
```

Note that `todo` is the library require prefix. *This is required.*

A directory with the name `todolib` will then be created in the libs directory of the application identified by `<app-name>`. It will have the following sub-directories and files:

- `src` - for the JavaScript for the Blade
- `tests` - for the blade tests
- `resources` - for HTML, CSS and everything else
- `lib.conf` - configuration for the library

There is more information on BRJS conformant libraries in [About Libraries](/docs/concepts/libraries/)..

### Use a BladeRunnerJS Conformant Library

If the `todo` library that was created above has classed called `Item` defined in an `Item.js` file in the `src` directory, it can be referenced and used anywhere within an application as follows:

```js
var Item = require( 'todo/Item' );
```

When the library functionality is required it will also mean that any CSS, HTML and other resources are included in their corresponding bundle. See [Dependency Analysis](/docs/concepts/dependency_analysis/) and [Bundlers](/docs/concepts/bundlers/).

## Third Party Libraries

Third-party libraries are libraries that can have any arbitrary content.

### Create a Third Party Library

If you followed the example in [How to Create an App](/docs/use/create_app/), you should now have an app called `brjstodo`.

By default the `create-library` command will create a BladeRunnerJS library. If you would like to create a third-party library use the `-t` flag with a `thirdparty` value, as shown in the command below:

```
brjs create-library <app-name> <library-name> <require-prefix> –t thirdparty
```

Here's an example:

```
brjs create-library brjstodo thirlib thir –t thirdparty
```

For a library to be used and picked up by BRJS, it needs to be within the `libs` folder of an application and the command does this for you. However, you can do this manually. Within that folder there should be a `thirdparty-library.manifest` file. This is a YAML configuration file with the following format and options:

```
# the JavaScript reference that this library exports
exports: JSReference

# optional list of other libraries this one depends on
depends: list, of, dependencies

# The JavaScript files to be included when the library is bundled
# The order of the list defines the bundle ordering
# Optional: defaults to including all JavaScript files
js: list.js, of.js, files.js

# The CSS files to be included  when the library is bundled
# Optional: defaults to including all CSS files
css: list.css, of.css, files.css
```

For more detailed information on libraries and the contents of this configuration file see [About Libraries](/docs/concepts/libraries/).

### Use or Import a Third Party Library

The two examples below demonstrate how to create and use third-party libraries.

#### Example - Bootstrap

In order to create a Bootstrap library you would download the release and place it in `yourapp/libs/bootstrap/`. Within that folder you would create a `thirdparty-library.manifest` file with the following contents:

```
depends: jquery
js: js/bootstrap.min.js
css: css/bootstrap.min.css
exports: {}
```

If you also wanted the Bootstrap Theme files you would update the manifest and add the `bootstrap-theme.min.css` to the `css` value, as follows:

```
depends: jquery
js: js/bootstrap.min.js,
/*** new code ***/
css: css/bootstrap.min.css,bootstrap-theme.min.css
/*** end of new code ***/
exports: {}
```

In order to use Bootstrap you still need to `require` it in JavaScript. The string value to be passed to the `require` function is the name of the folder that Bootstrap lives within:

```js
require( 'bootstrap' );
```

You need to do this even if you only want the CSS for bootstap to be included.

<div class="alert alert-info github">
  <p>In future we may make it possible to <a href="https://github.com/BladeRunnerJS/brjs/issues/767">include CSS only libraries using some form of CSS include</a>.</p>
</div>

#### Example - Zepto

If we wanted to use [Zepto](http://zeptojs.com/) within our application we can simply create a `libs/zepto` folder and download the latest `zepto.js` file into that directory. The final step is to create a library.manifest file. Zepto exports a Zepto object and we only have `zepto.js` to bundle so a js configuration option, but we'll add it for completeness.

```
js: zepto.js
exports: Zepto
```

With the files and place and configuration set up it's not possible to use Zepto within your application code as follows, where the string name passed to `require` is the name of the folder the code resides within:

```
var Zepto = require( 'zepto' );
```

## Where Next?

For more information about libraries, see [About Libraries](/docs/concepts/libraries/)
