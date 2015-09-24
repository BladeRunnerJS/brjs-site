---
layout: docs
title: Using App Tokens
permalink: /docs/use/app_tokens/
---

Apps can make use of tokens where the replacement can be configured depending on the scenario. Tokens in content take the format `@[A-Z\.]+@`, for example `@MY.TOKEN@`, and can be included in any file. There are two mechanisms that are used when find a token replacement.

## Property Files

BRJS will first attempt to locate a token replacement in an app properties file located in `<appDir>/app-properties`.

Token replacements will first be read from `<appDir>/app-properties/default.properties` and can then be overridden in environment specific property files. To set the environment use the `-e` flag with either the `serve` or `build-app` commands.

Properties files should have the format:

```
MY.TOKEN=my token replacement
```

For example `brjs build-app myapp -e production` will first read properties from ``<appDir>/app-properties/default.properties` and then an optional overridding property from `<appDir>/app-properties/production.properties`.

Tokens can be included in any text based files served via BRJS, for example JavaScript; HTMl and XML files. Static file apps must provide a replacement for all properties used within an app. If a replacement is not provided an exception will be thrown. 'J2EE' apps, those that have a `WEB-INF` directory, can opt to provide some tokens via JNDI (see below).

Note: To use different tokens for different environment a static app must be built several times using a different environment setting each time.

## JNDI Replacement

J2EE apps can use [JNDI](https://en.wikipedia.org/wiki/Java_Naming_and_Directory_Interface) to provide token replacements. This gives the advantage that a single artifact can be generated and a JNDI database configured for each environment to supply the replacements.

To use JNDI tokens in development, configure `<appDir>/WEB-INF/jetty-env.xml` to provide the replacements. For example:

```
<?xml version="1.0"?>
<!DOCTYPE Configure PUBLIC "-//Jetty//Configure//EN" "http://www.eclipse.org/jetty/configure.dtd">
<Configure id="webAppCtx" class="org.eclipse.jetty.webapp.WebAppContext">
	<!-- required to stop Jetty warning that no transaction manager has been set -->
	<New id="tx" class="org.eclipse.jetty.plus.jndi.Transaction">
		<Arg></Arg>
	</New>

	<!-- define the token and it's replacement -->
    <New class="org.eclipse.jetty.plus.jndi.EnvEntry">
        <Arg><Ref id='webAppCtx'/></Arg>
        <Arg>MY.JNDI.TOKEN</Arg>
        <Arg type="java.lang.String">My JNDI token replacement</Arg>
        <Arg type="boolean">true</Arg>
    </New>

</Configure>
```

In production, how JNDI is configured will depend on the JNDI service you are using.

The J2EE filter responsible for the JNDI token replacement only filters requests with set file extensions, by default the regular expression used is `js|xml|json|html|htm|jsp`. To add or remove extensions set the `extensionRegex` init parameter for the filter. To do this change the `web.xml` so the filter definition looks something like:

```
<filter>
	<filter-name>BRJSServletFilter</filter-name> 
	<filter-class>org.bladerunnerjs.appserver.BRJSServletFilter</filter-class>
	<init-param>
    	<param-name>extensionRegex</param-name>
    	<param-value>xml|html|htm|jsp|txt</param-value>
	</init-param>
</filter>
<filter-mapping>
	<filter-name>BRJSServletFilter</filter-name> 
	<url-pattern>/*</url-pattern> 
	<dispatcher>REQUEST</dispatcher>
	<dispatcher>FORWARD</dispatcher>
</filter-mapping>
```

## BRJS System Tokens

Tokens begining `BRJS.` are BRJS system tokens and cannot be overdidden by property files or JNDI. Supported system tokens are listed below.

- BRJS.APP.LOCALE: If used in an index page will be replaced with the page's locale, otherwise replaced with the app's default locale.
- BRJS.APP.NAME: The name of the app.
- BRJS.APP.VERSION: The app version. Either automatically generated or specified by using the `-v` flag.
- BRJS.BUNDLE.PATH: The relative path to bundle requests. This should be used if trying to reference bundles since the relative URL will change depending on the version used.
