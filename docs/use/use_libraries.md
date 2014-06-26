---
layout: docs
title: How to use Libraries
permalink: /docs/use/use_libraries/
---

#How to use Libraries

There are two types of library: BladeRunnerJS conformant libraries and third-party libraries. For more information on the difference, see [Libraries](http://bladerunnerjs.org/docs/concepts/libraries/).


##Create a BladeRunnerJS Library
Before you can create a Library, you need to create an application. Details on how to do this are in our [guide to creating an app](http://bladerunnerjs.org/docs/use/create_app/).

Once you have an application, you can create a Library by running the following command in the CLI:

```$ ./brjs create-library <app-name> <library-name>```

###Example

If you followed the example in [How to Create an App](http://bladerunnerjs.org/docs/use/create_app/), you should now have an app called `brjstodo`.

Follow this example to create a library called `todolib` within this app.

```$ ./brjs create-library brjstodo todolib todo```

Note that `todo` is the library namespace. *This is required.*

###Result

A directory with the name `todolib` will then be created in the libs directory of the application identified by <app-name>. It will have the following sub-directories and files:

- `src` - for the JavaScript for the Blade
- `tests` - for the blade tests
- `resources` - for HTML, CSS and everything else
- `lib.conf` - configuration for the library

There is more information on BRJS conformant libraries in [About Libraries](http://bladerunnerjs.org/docs/concepts/libraries/)..

##Create a third party library

By default the `create-library` command will create a BladeRunnerJS library. If you would like to create a third-party library, use the command below:

`brjs create-library brjstodo thirlib thir –t thirdparty`

There is more information on third party libraries in [About Libraries](http://bladerunnerjs.org/docs/concepts/libraries/).
 
##Use an Existing Library

For an existing library to be used and picked up by BladeRunnerJS, it needs to be within the libs folder of an application.

In order for the library to then be used a `library.manifest` file should be created. This is a YAML configuration file with the following format and options:
```
# the JavaScript reference that this library exports
exports: name

# optional list of other libraries this one depends on
depends: list, of, dependencies

# The JavaScript files to be included when the library is bundled
# The order of the list defines the bundle ordering
# Optional: defaults to including all JavaScript files
js: list.js, of.js, files.js

# The CSS files to be included  when the library is bundled
# Optional: defaults to including all CSS files
css: list.css, of.css, files.css```


###Example

```
thirdparty-library.manifest:
depends: jquery, lib1, someLib
js: js/*.js
css: css/*.js
exports: {}```



###Use an Existing BRJS Conformant Library

```var = require;```

[To be completed]

###Use an Existing third party Library

###Example
For example, if we wanted to use [Zepto](http://zeptojs.com/) within our application we can simply create a `libs/zepto` folder and download the latest `zepto.js` file into that directory. The final step is to create a library.manifest file. Zepto exports a Zepto object and we only have `zepto.js` to bundle so a js configuration option, but we'll add it for completeness.
```
js: zepto.js
exports: Zepto
```
With the files and place and configuration set up it's not possible to use Zepto within your application code as follows:

```var Zepto = require( 'zepto' );```


##Where Next?
For more information about libraries, see [About Libraries](http://bladerunnerjs.org/docs/concepts/libraries/)

