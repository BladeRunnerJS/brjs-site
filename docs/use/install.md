---
layout: docs
title: How to install BladeRunnerJS
permalink: /docs/use/install/
notice: none
---

## Prerequisites

### Java

In order to run BRJS you'll need Java 7 or 8 installed. Since BRJS requires Java to be on the system [PATH][wiki-path], and the JRE installer doesn't do this for all systems, we recommend you install the JDK which will update the `PATH`. If you are comfortable updating the `PATH` to reference your Java install you can of course install the JRE.

* [JDK 7](http://www.oracle.com/technetwork/java/javase/downloads/jdk7-downloads-1880260.html)
* [JDK](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

[wiki-path]:http://en.wikipedia.org/wiki/PATH_(variable)

To check that Java is on your path open up a new console or terminal and execute `java -version`. You should see something similar to the following:

```bash
› java -version
java version "1.8.0_05"
Java(TM) SE Runtime Environment (build 1.8.0_05-b13)
Java HotSpot(TM) 64-Bit Server VM (build 25.5-b02, mixed mode)
```

### Web Server

**BRJS comes with an in-build development server that you can use to run [blades](/docs/concepts/blades/) in isolation and to run your full application.**

To host built apps you'll need a web server that can serve static files, for example [PHP's built in web server](http://www.php.net/manual/en/features.commandline.webserver.php), [Python's SimpleHTTPServer](https://docs.python.org/2/library/simplehttpserver.html), or [Apache Tomcat 6.x](http://tomcat.apache.org/).

BRJS supports building [WAR files](war-files) so you can deploy your BRJS app as a WAR on any supporting web server e.g JBOSS or Apache Tomcat.

[war-files]:http://en.wikipedia.org/wiki/WAR_(file_format)

## Download & Install BRJS

<strong><a href="https://github.com/BladeRunnerJS/brjs/releases/" class="brjs-latest-download">Download the latest BRJS release</a></strong> and unzip it somewhere. We'll now refer to that unzipped location as `BRJS_HOME`. The BRJS CLI executable is `BRJS_HOME/sdk/brjs`.

*Note:* in order to use the `brjs` commands from any location on your machine, add `BRJS_HOME/sdk` to your `Path` in `Environment Variables`.