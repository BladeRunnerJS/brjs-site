---
layout: docs
title: BladeRunnerJS Configuration Files
permalink: /docs/use/config/
notice: none
---

### bladerunner.conf

Configuration options for BladeRunner and the built in Jetty server. Located in the conf directory at the root of the BladeRunnerJS install.

```
jettyPort:              The port the built in Jetty server will bind to.
                        Default: 7070.
                        
defaultInputEncoding:   The input encoding for files read by BRJS.
                        Default: UTF-8
	
defaultOutputEncoding:  The output encoding for files produced by BRJS. 
                        Default: UTF-8

loginRealm:             The login realm the Jetty server will use. 
                        Only needed if you configure a login realm.
                        Default: BladeRunnerLoginRealm
```

### app.conf

Configuration options specific to an individual app. Located in the root of each app.

```
appNamespace:   The root namespace for the app.
                Default: appns

locales:        The locales supported by this app, seperated by a comma. 
                A locale consists of either two lowercase characters, or two lower case characters follow by an underscore and two uppercase characters. 
                Default: en
```

### .js-style

`.js-style` contains a single line that specifies the JavaScript coding style for a directory, 
	for use by AssetPlugins to detirmine which type of SourceModule to create for each source file. 
`js=style` files in parent directories apply to any sub-directories and styles in sub-directories will override those in parent directories.
Styles can be overridden multiple times, for example if an app has the style 'style1', a bladeset can have the style 'style2', 
	and a blade inside that bladeset could have the style 'style1'.

If no `js-style` is found the default is `node.js`.  Possible values are `node.js` &amp; `namespaced-js`.

```
node.js
```