---
layout: docs
title: Libraries
permalink: /docs/concepts/libraries/
---

Libraries in BladeRunnerJS, like those in other web applications, can contain the definition of useful functionality, UI components or [services](http://bladerunnerjs.org/docs/concepts/services/).

There are two types of library - **BRJS conformant libraries** and **third-party libraries**. Both types of libraries have a config library attached to them to identify to the model which type they are.
<div class="alert alert-info">
  <p>
Note: In the future we hope to provide "out of the box" support libraries that have been drawn down from popular package management repositories such as npm and bower. Right now, you can use these, but you need to put in a little bit of work in order to achieve this.<p></div>

For information on how to create or edit libraries, see [How to Use Libraries](http://bladerunnerjs.org/docs/use/use_libraries/).

##Library Structure

The two types of library differ in how they are structured. BRJS libraries conform to the full structure of a blade whereas the structure of a third-party library is much more basic. 

###BRJS conformant Libraries

BRJS libraries will contain the following directories:

- src - for the JavaScript for the Blade
- tests - for the blade tests
- resources - for HTML, CSS and everything else
- lib.conf - configuration for the library

Bladerunner library has a config file `br lib.conf`. The structure of which is a yaml-type file that has a required prefix stupulated by the user. The default prefix for an app is ‘appns’

###Third-Party Libraries

The structure of the third party library is a lot more basic than that of the BRJS conformant library. It consists of a single folder which has a third party library manifest. Nothing else is created as part of the library scaffolding. Any additional files - such as `.js` and `.css` – will be included here This can be any arbitrary content which will be determined by the library that you are using.

##Manifest File

What is bundled and served by BRJS depends on the presence of manifest file. If a manifest file is not present, all top-level items are bundled by their associated bundler. Where the manifest file is present, then it will conform to the following structure:

```
thirdparty-library.manifest:
depends: jquery, lib1, someLib
js: js/*.js
css: css/*.js
exports: {}
```

The key `depends` allows a third-party library to depend on another third-party library. For example, if you wanted to use twitter bootstrap to lay out your app and then include jquery to do the more complex javascript, you can set this up so that the twitter bootstrap third-party library depends on the jquery third-party library.

Keys `js` and `css` are effectively the same but used for different types of files. It allows you to list the .js or .css files that need to be bundled when the library is used.  If this value is empty then all javascript  files in the root folder would be automatically bundled.

These values can use wildcards in order to specify, for example, all `.js` and `.css `files within specific folders.

```
js: js/*.js

css: css/*.js```

Unlike `depends`, `js` and `css`, the exports key is mandatory. Every third-party library must define what it exports. So, for example, a jquery third-party library would have the following value:
```
exports: jquery```

If the library does not need to export anything (if, for example, it is purely there for css) then you can export an empty object. This is specified by adding a pair of empty braces
```
exports: {}```

##Where Next?

To find out how to create new libraries and use existing libraries, go to Using Libraries