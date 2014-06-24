---
layout: docs
title: How to use Libraries
permalink: /docs/use/use_libraries/
---

## Create a Library

In order to create a [Library](/docs/concepts/libraries/) you first need to [create an application](/docs/use/create_app) .

Once you have an application you can create a Library as follows:

```bash
$ ./brjs create-library <app-name> <library-name> <library-namespace>
```

A directory with the name `<library-name>` will then be created in the directory of the application identified by `<app-name>`. It will have the following sub-directories and files:

* `src` - for the JavaScript for the Blade
* `tests` - for the blade tests
* `resources` - for HTML, CSS and everything else
* `lib.conf` - configuration for the library

## Use an Existing Library

For an existing library to be used and picked up by BladeRunnerJS it needs to be within the `libs` folder of an application.

In order for the library to then be used a `library.manifest` file should be created. This is a [YAML](http://en.wikipedia.org/wiki/YAML) configuration file with the following format and options:

```yaml
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
css: list.css, of.css, files.css
```

### Example

For example, if we wanted to use [Zepto](http://zeptojs.com/) within our application we can simply create a `libs/zepto` folder and download the latest [`zepto.js` file](http://zeptojs.com/zepto.js) into that directory. The final step is to create a `library.manifest` file. Zepto exports a `Zepto` object and we only have `zepto.js` to bundle so  a `js` configuration option, but we'll add it for completeness.

```js
js: zepto.js
exports: Zepto
```

With the files and place and configuration set up it's not possible to use Zepto within your application code as follows:

```javascript
var Zepto = require( 'zepto' );
```
