---
layout: docs
title: Using App Tokens
permalink: /docs/use/app_tokens/
---

Apps can make use of tokens where the replacement can be configured depending on the environment (e.g. _dev_, _uat_, _prod_, etc). Tokens take the format `@[A-Z\.]+@`, for example `@MY.TOKEN@`, and can be included in any text file used by your app. There are two mechanisms used when finding token replacements.

## Property Files

BRJS will first attempt to locate a token replacement in the `<app-dir>/app-properties/default.properties`file, but will subsequently look for overrides in an environment specific `.properties` file, for example `<app-dir>/app-properties/uat.properties`.

Properties files should have the format:

```
MY.TOKEN=my token replacement
```

`dev` is the default environment when running `brjs serve` and `prod` is the default environment when running `brjs build-app`. To explicitly set the environment, use the `-e` flag with these commands, for example:

```sh
./brjs serve -e prod
```

which will first read properties from `<app-dir>/app-properties/default.properties`, and will then look for overrides in `<app-dir>/app-properties/prod.properties`. Tokens can be included in any text based files served via BRJS, for example JavaScript; HTML and XML.

Non J2EE apps must provide a replacement for all properties used within the app &mdash; if a replacement is not provided an exception will be thrown &mdash; whereas J2EE apps (i.e. those that have a `WEB-INF` directory) can opt to provide some tokens via JNDI (see below).

**Note**: Apps that use different properties files for different environments will need to build their apps once for each environment.

## JNDI Replacement

J2EE apps can use [JNDI](https://en.wikipedia.org/wiki/Java_Naming_and_Directory_Interface) to provide token replacements. This gives the advantage that a single artifact can be generated, where the JNDI tokens can be configured differently on each of the target environments. To use JNDI tokens in development, configure `<app-dir>/WEB-INF/jetty-env.xml` to provide the replacements, for example:

```xml
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

In production, how JNDI is configured will depend on the J2EE App Server you are deploying to.

The J2EE filter responsible for the JNDI token replacement only filters requests with set file extensions; by default, a regular expression of `js|xml|json|html|htm|jsp` is used. To add or remove extensions set the `extensionRegex` init parameter for the filter within your app's `web.xml`, for example:

```xml
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

Tokens beginning `BRJS.` are system tokens and cannot be overridden within `.properties` files or JNDI. The following system tokens are currently supported:

- `BRJS.APP.NAME`: The name of the app.
- `BRJS.APP.VERSION`: The app version &mdash; either automatically generated or specified by using the `-v` flag.
- `BRJS.APP.LOCALE`: If used in an index page will be replaced with the page's locale, otherwise replaced with the app's default locale.
- `BRJS.BUNDLE.PATH`: A relative path to the directory containing the app's bundles &mdash; this should be used by library code needing to reference bundles since the relative URL will change depending on the versioning mechanism in use by the app.
