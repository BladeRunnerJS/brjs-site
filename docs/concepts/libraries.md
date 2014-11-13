---
layout: docs
title: Libraries
permalink: /docs/concepts/libraries/
---

Libraries in BladeRunnerJS, like those in other web applications, can contain the definition of useful functionality, UI components or [services](http://bladerunnerjs.org/docs/concepts/services/).

There are two types of library - **BRJS conformant libraries** (libraries that BRJS presently understands "out of the box") and **third-party libraries**. Both types of libraries contain configuration in order to identify to BRJS which type they are.

<div class="alert alert-info">
  <p>Note: In the future we hope to provide "out of the box" support for other types of libraries that have been drawn down from popular package management repositories such as npm and bower. Right now, you can use these, but you need to put in a little bit of work in order to achieve this.<p>
</div>

For information on how to create or edit libraries, see [How to Use Libraries](/docs/use/use_libraries/).

## Library Structure

The two types of library differ in how they are structured. BRJS libraries conform to the same structure as a [blade](/docs/concepts/blades/) whereas the structure of a third-party library can vary considerably.

## BRJS conformant Libraries

BRJS libraries will contain the following files and directories:

- `src` - which contains all JavaScript source files
- `tests` - which contains the tests and test assets
- `resources` - for HTML, CSS and other resources
- `br-lib.conf` - the configuration file for the library

The library configuration file, `br-lib.conf`, is a [YAML](http://en.wikipedia.org/wiki/YAML) file that is used to configure properties on the library. An example of this configuration is below.

```
requirePrefix: myLibrary
```

- `requirePrefix` defines the require prefix for all source files and assets contained within the library. Much like where a Blade must have a defined prefix, libraries have a defined prefix too. The default value for `requirePrefix` is the name of the library itself.

## ThirdParty Libraries

Thirdparty libraries are intended for libraries that don't have any structure to the contained source files and assets. For example 'jQuery' and 'Twitter Bootstrap' are both libraries that are well suited to be a Thirdparty Library as they both don't have any defined structure and are simply a directory of files.

Thirdparty libraries can contain any file type, such as `.js`, images, `.html` and `.css`, in any structure you like. These libraries must contain a `thirdparty-lib.manifest` [YAML](http://en.wikipedia.org/wiki/YAML) file which BRJS uses to define how to handle the assets within the library. An example of this configuration is below.

```
depends: someOtherLibrary
js: js/*.js
css: css/*.js
exports: myLibrary
commonjsDefinition: true
```

- `depends` allows a third-party library to depend on another library (including BRJS conformant libraries). For example, if a 'twitterbootstrap' had a dependeny on a 'jquery' library you could use the `depends` configuration. This option is needed to explicitly define dependencies since, unlike other types of source code, BRJS cannot infer depencies for Thirdparty libraries since the structure of the source code is unknown.
- `js` and `css` configure the JavaScript and CSS files that should be bundled when this library is used. By default all `.js` and `.css` files in the root of the library directory are bundled. The option can support limited wildcards, for example `src/*.js` and `**/*.js` to bundle all '.js' files in the 'src' directory and all 'js' files in all directories and sub-directories respectively.
- `exports` defines the name of the object that this library 'exports'. In order for the BRJS module system to work with this type of library each library must define the JavaScript reference that it exports. For example 'jQuery' is written to define 'jQuery' on the window object (e.g `window.jQuery = ...`) so the value of `exports` would be 'jQuery'. The value of `exports` is not always the same as the name of the library. For example 'knockout' defines 'ko' on the window object, so the value of `exports` would be 'ko'. If the library does not need to export anything (for example, it is solely used for css) then you can export an empty object. This is specified by setting `exports` to `"{}"` (note the `"`s which are needed to define a literal `{}`).
- `commonjsDefinition` defines whether or not this library should be treated as a CommonJS library. This causes the library to be wrapped in a `define` block, preventing it from defining itself on `window`.

## Where Next?

To find out how to create new libraries and use existing libraries, go to [Using Libraries](/docs/use/use_libraries/).
