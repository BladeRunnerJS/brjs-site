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

*Note:* Upon running your first `brjs` command, you will be asked whether you would like to provide anonymous tracking of your use of BRJS. This means that information such as commands run, bundle times or operating system used, will be recorded for research purposes. We would like to encourage you to participate, as this will help us improve our products by gaining insight into common use cases and system specifications. Should you change your mind later on, you can always do so by either:

- running any `brjs` command with the `--stats` flag (tracking enabled) or `--no-stats` flag (tracking disabled) **or**;
- editing the value of the property `allowAnonymousStats` in your `BRJS_HOME/conf/brjs.conf` to `true` (tracking enabled) or `false` (tracking disabled).  

<div class="alert alert-info github">
	BRJS scans up the directory tree looking for one of 2 identifiers in order to locate where apps' live. If a file named app.conf is found, which identifies a single app folder, the directory above the app will be used as the apps location. Failing this if an apps folder is found inside one of the parent directories this will be used as the apps location. If neither of these conditions is met the current working directory will be used as the apps location.
</div>