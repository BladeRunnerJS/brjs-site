---
layout: docs
title: BladeRunnerJS Configuration Files
permalink: /docs/use/config/
notice: none
---

### brjs.conf

Configuration options for BladeRunner and the built in Jetty server. Located in the conf directory at the root of the BladeRunnerJS install.

```
jettyPort:						The port the built in Jetty server will bind to.
								Default: 7070.

defaultFileCharacterEncoding:	The input encoding for files read by BRJS.
								Default: UTF-8

loginRealm:						The login realm the Jetty server will use.
								Only needed if you configure a login realm.
								Default: BladeRunnerLoginRealm
```

### app.conf

Configuration options specific to an individual app. Located in the root of each app.

```
requirePrefix:		Prefix for the app.
                	Default: appns

locales:        	The locales supported by this app, separated by a comma.
                	A locale consists of either two lowercase characters,
                	or two lower case characters follow by an underscore
                	and two uppercase characters.
                	Default: en

localeCookieName	The string identifier for the locale setting in the cookie
									used to store the application locale.
									Default: BRJS.LOCALE
```


### .js-style

`.js-style` contains a single line that specifies the JavaScript coding style for a directory,
	for use by AssetPlugins to determine which type of SourceModule to create for each source file.
`js-style` files in parent directories apply to any sub-directories and styles in sub-directories will override those in parent directories.
Styles can be overridden multiple times, for example if an app has the style 'style1', a bladeset can have the style 'style2',
	and a blade inside that bladeset could have the style 'style1'.

If no `js-style` is found the default is `common-js`.  Possible values are `common-js` &amp; `namespaced-js`.

```
common-js
```

### test-runner.conf

```
jsTestDriverJar:	 Path to location of JsTestDriver.jar in sdk


portNumber:				Port number for the test server. This needs to match with localhost.
									 Default: 4224
defaultBrowser:
									 Default: Chrome

browserPaths:

```

### web.xml and jetty-env.xml

BladeRunnerJS uses Jetty as its application server, therefore also creating the `web.xml` and `jetty-env.xml` in your webapp's `WEB-INF` directory. 

`web.xml` is a deployment descriptor file which, among others, contains the classes, resources and configuration of the application, the mapping of URLs to servlets, as well as environment-specific deployment information for the production and development environments. Configurations pertaining to the development environment will be placed between the `<!-- start-env: dev -->` and `<!-- end-env -->` tags, while production-related entries will be located between the `<!-- start-env: prod` and `end-env -->` tags.

```
<!-- start-env: dev -->
	<dev only xml here>
<!-- end-env -->

<!-- start-env: prod
	<prod only xml here>
end-env -->
```

For more information on how to configure this file, please see [The Deployment Descriptor: web.xml](https://cloud.google.com/appengine/docs/java/config/webxml).

Entries in `jetty-env.xml` are used for parsing the references in `web.xml` and configuring the naming environment for the application. For more information on how to configure this file, please see [jetty-env.xml](http://www.eclipse.org/jetty/documentation/9.2.1.v20140609/jetty-env-xml.html).

### users.properties

The `users.properties` file is created inside the `conf` directory and is used for configuring the usernames and passwords for the built-in Jetty server.

```
user: password,user
```