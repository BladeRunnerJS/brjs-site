---
layout: docs
title: Libraries
permalink: /docs/concepts/libraries/
---

Libraries in BladeRunnerJS, like those in other web applications, can contain the definition of useful functionality, UI components or [services](/docs/concepts/services/).

There are two types of library - **BRJS conformant libraries** (libraries that BRJS presently understands "out of the box") and **third-party libraries**. Both types of libraries contain configuration in order to identify to BRJS which type they are.

<div class="alert alert-info">
  <p>Note: In the future we hope to provide "out of the box" support for other types of libraries that have been drawn down from popular package management repositories such as npm and bower. Right now, you can use these, but you need to put in a little bit of work in order to achieve this.<p>
</div>

For information on how to create or edit libraries, see [How to Use Libraries](/docs/use/use_libraries/).

## Library Structure

The two types of library differ in how they are structured. BRJS libraries conform to the full structure of a [blade](/docs/concepts/blades/) whereas the structure of a third-party library can vary considerably.

## BRJS conformant Libraries

BRJS libraries will contain the following directories:

- `src` - for the JavaScript for the Blade
- `tests` - for the blade tests
- `resources` - for HTML, CSS and everything else
- `br-lib.conf` - configuration for the library

A BRJS library has a config file `br-lib.conf`. The contents of which is [YAML](http://en.wikipedia.org/wiki/YAML) that has a required prefix stipulated by the user. The default prefix for an app is `appns`.

## Third-Party Libraries

The structure of the third party library can vary considerably. You can have any contents you like within a third-party library - such as `.js`, images, `.html` and `.css` –  with the optional presence of a `thirdparty-library.manifest` file which tells BRJS what to do with the library contents. When you create a new third-party library using BRJS nothing else is created as part of the library scaffolding other than the manifest.

What is bundled and served by BRJS depends on the presence of a manifest file. If a `thirdparty-library.manifest` file is not present, all top-level items are bundled by their associated bundler. Where the `thirdparty-library.manifest` file is present, then it's contents should conform to the following structure:

```bash
depends: jquery, lib1, someLib
js: js/*.js
css: css/*.js
exports: AJavaScriptReference
```

The key `depends` allows a third-party library to depend on another library (including BRJS conformant libraries). For example, if you wanted to use twitter bootstrap to lay out your app and then include jquery to do the more complex JavaScript, you can set this up so that the twitter bootstrap third-party library depends on the jQuery third-party library.

Keys `js` and `css` are effectively the same but used for different types of files. It allows you to list the `.js` or `.css` files that need to be bundled when the library is used. If this value is empty then all JavaScript files in the root folder would be automatically bundled.

These values can use wildcards in order to specify, for example, all `.js` and `.css` files within specific folders.

```bash
js: js/*.js

css: css/*.js
```

Unlike `depends`, `js` and `css`, the exports key is mandatory. In order for the BRJS module system to work every third-party library must define the JavaScript reference that it exports. So, for example, a jQuery third-party library would have the following value:

```
exports: jQuery
```

If the library does not need to export anything (if, for example, it is purely there for css) then simply omit the `exports` property from the manifest file.

## Where Next?

To find out how to create new libraries and use existing libraries, go to [Using Libraries](/docs/use/use_libraries/).
