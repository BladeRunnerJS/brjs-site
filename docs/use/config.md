---
layout: docs
title: BladeRunnerJS Configuration Files
permalink: /docs/use/config/
notice: none
---

### brjs.conf

The configuration options for BladeRunnerJS and the built-in Jetty server, located within `conf/brjs.conf`, are as follows:

  * `jettyPort`: The port the built in Jetty server will bind to (`7070` by default).
  * `defaultFileCharacterEncoding`: The input encoding for files read by BRJS (`UTF-8` by default).
  * `loginRealm`: The login realm the Jetty server will use &mdash; only needed if you configure a login realm within `WEB-INF/web.xml` (`BladeRunnerLoginRealm` by default).

### app.conf

The configuration options for BladeRunnerJS apps, located within `apps/<app>/app.conf`, are as follows:

  * `requirePrefix`: The require prefix for resources within the app (`appns` by default).
  * `locales`: The comma delimited list of locales (e.g. `en, en_GB, de`) supported by this app (`en` by default).
  * `localeCookieName`: The name of the cookie used to store the active locale (`BRJS.LOCALE` by default).


### .js-style

The `.js-style` files can be placed at arbitrary locations throughout the source code, and are used to indicate the style of any JavaScript modules within the same directory, or within child directories that don't contain an overriding `.js-style` file. Each `.js-style` file contains either the text `common-js` or the text `namespaced-js`, and nothing else.


### test-runner.conf

The test specific configuration options for BladeRunnerJS, located within `conf/test-runner.conf`, are as follows:

  * `jsTestDriverJar`: The path to the location of the `JsTestDriver.jar` within the SDK.
  * `portNumber`: The port number of the test server (`4224` by default).
  * `defaultBrowser`: The name of the browser to use if one isn't specified on the command-line (`chrome` by default).
  * `browserPaths`: A set of browser paths for different browsers, grouped by operating system.


### web.xml and jetty-env.xml

BladeRunnerJS uses the Jetty J2EE application server to serve applications stored within the `apps/<app>` directories. Apps that don't contain a `WEB-INF` directory of their own (as required by J2EE servers) are programmatically configured to use centrally held configuration within the SDK. Apps that would like to have a `WEB-INF` directory can use the `j2eeify`  command to create one, and are then free to customize `WEB-INF/web.xml` with any app specific servlets or servlet-filters, etc.

The `web.xml` file is filtered during the `build-app` process, allowing us to have different configuration in development and production. Development only configuration can be placed between `<!-- start-env: dev -->` and `<!-- end-env -->` tags, while production only configuration can be placed between `<!-- start-env: prod` and `end-env -->` tags, as follows:

```
<!-- start-env: dev -->
  dev only xml here...
<!-- end-env -->

<!-- start-env: prod
	prod only xml here...
end-env -->
```

For more information on `web.xml` configuration options, please see [The Deployment Descriptor: web.xml](https://cloud.google.com/appengine/docs/java/config/webxml).

The configuration within `jetty-env.xml` is used to configure the Jetty server, and to provide any JNDI tokens, for apps that are reliant on JNDI. Unlike, the `web.xml` file, `jetty-env.xml` isn't filtered during `build-app`, as you would normally deploy to some other J2EE server in production, which you are responsible for configuring as appropriate. For more information on how to configure this file, please see [jetty-env.xml](http://www.eclipse.org/jetty/documentation/9.2.1.v20140609/jetty-env-xml.html).

### users.properties

The `conf/users.properties` file contains a list of _usernames_, _passwords_ & _roles_ for those using the `loginRealm` to enable authentication for their app. The file has entries having the form:

```
user: password,role
```
