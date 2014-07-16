---
layout: docs
title: How to use Libraries
permalink: /docs/use/use_libraries/
---

# How to use Libraries

There are two types of library: BladeRunnerJS conformant libraries and third-party libraries. For more information on the difference, see [Libraries](/docs/concepts/libraries/).

# BladeRunnerJS Conformant Library

"Conformant" libraries are libraries that follow the same directory structure as Blades. All assets are placed in a 'resources' directory, tests within a 'tests' directory and all source code withi in a 'src' directory. All source code should also be placed within a folder structure that is the same as the require path to that file, for example the module "mylib/some/cool/Thing" would be in 'src/mylib/some/cool/Thing.js'.

## Create a BladeRunnerJS Library

Before you can create a Library, you need to create an application. Details on how to do this are in our [guide to creating an app](/docs/use/create_app/).

Once you have an application, you can create a Library by running the following command in the CLI:

```bash
$ ./brjs create-library <app-name> <library-name>
```

If you followed the example in [How to Create an App](/docs/use/create_app/), you should now have an app called `brjstodo`.

Follow this example to create a library called `todolib` within this app.

```
$ ./brjs create-library brjstodo todolib
```

A directory with the name `todolib` will then be created in the libs directory of the `<app-name>` application and will be populated with a small amount of scaffolding.

There is more information on BRJS conformant libraries, including the structure and configuration file, in [About Libraries](/docs/concepts/libraries/).

## Use a BladeRunnerJS Conformant Library

If the `todo` library that was created above has a class called `Item` defined in an `Item.js` file in the `src` directory, it can be referenced and used anywhere within an application as follows:

```js
var Item = require( 'todo/Item' );
```

When the source code of a library is used all CSS, HTML and other resources are included in their corresponding bundle. See [Dependency Analysis](/docs/concepts/dependency_analysis/) and [Bundlers](/docs/concepts/bundlers/).

# Third Party Libraries

Third-party libraries are libraries that can have any arbitrary content. See the [libraries](/docs/concepts/libraries/) for more information about thirdparty libraries and how they differ from BladeRunnerJS conformant libraries.


## Create a Third Party Library

If you followed the example in [How to Create an App](/docs/use/create_app/), you should now have an app called `brjstodo`.

By default the `create-library` command will create a BladeRunnerJS library (see above). If you would like to create a thirdparty library use the `-t` flag with a `thirdparty` value, as shown in the command below:

```
brjs create-library <app-name> <library-name> -t thirdparty
```

Here's an example:

```
brjs create-library brjstodo myLib -t thirdparty
```

This will create an empty `myLib` library within the libs directory of the given app.

For more detailed information on libraries and the contents of this configuration file see [About Libraries](/docs/concepts/libraries/).

## Use or Import a Third Party Library

The two examples below demonstrate how to create and use thirdparty libraries. The first shows how libraries can be created without the use of the `create-library` command, the second with the `create-library` command.

### Example - Bootstrap

In order to create a Bootstrap library you would download the release and place it in `<yourapp>/libs/bootstrap/`. Within that folder you would create a `thirdparty-lib.manifest` file with the following contents:

```
depends: jquery
js: js/bootstrap.min.js
css: css/bootstrap.min.css
```

**Note**: the 'boostrap' library `depends` on a 'jQuery' library so the 'jquery' library must also exist. 'jQuery' is currently packaged as part of the BRJS release package.

If you also wanted the Bootstrap Theme files you would update the manifest and add the `bootstrap-theme.min.css` to the `css` value, as follows:

```
depends: jquery
js: js/bootstrap.min.js,
/*** new code ***/
css: css/bootstrap.min.css,bootstrap-theme.min.css
/*** end of new code ***/
```

In order to use Bootstrap you need to `require` it in JavaScript. The string value to be passed to the `require` function is the name of the library which is defined by the name of the folder the library lives within.

```js
require( 'bootstrap' );
```

You need to do this even if you only want the CSS for bootstap to be included.

<div class="alert alert-info github">
  <p>In future we may make it possible to <a href="https://github.com/BladeRunnerJS/brjs/issues/767">include CSS only libraries using some form of CSS include</a>.</p>
</div>

### Example - Zepto

If we wanted to use [Zepto](http://zeptojs.com/) within our application we first create the library.

```
brjs create-library myApp zepto -t thirdparty
```

We then move the `zepto.js` file into the newly created library. Zepto exports a Zepto object so we need to change the `exports` option in `thirdparty-lib.manifest` to reflect this.

```
exports: Zepto
```

With the files and place and configuration set up it's now possible to use Zepto within your application.

```
var Zepto = require( 'zepto' );
```

## Where Next?

For more information about libraries, see [About Libraries](/docs/concepts/libraries/)
