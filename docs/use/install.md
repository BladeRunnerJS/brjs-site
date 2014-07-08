---
layout: docs
title: How to install BladeRunnerJS
permalink: /docs/use/install/
notice: none
---

## Prerequisites

In order to run BRJS you'll need [JRE 7](http://www.oracle.com/technetwork/java/javase/downloads/java-se-jre-7-download-432155.html) installed. To deploy built apps you'll need any web server that can serve static files, for example [PHP's built in web server](http://www.php.net/manual/en/features.commandline.webserver.php), [Python's SimpleHTTPServer](https://docs.python.org/2/library/simplehttpserver.html), or [Apache Tomcat 6.x](http://tomcat.apache.org/).

*Note: You will need a Java App Server in order to deploy apps that have been built as WARs. Apache Tomcat can also be used to host WARs.

## Download & Install BRJS

<strong><a href="https://github.com/BladeRunnerJS/brjs/releases/" class="brjs-latest-download">Download the latest BRJS release</a></strong> and unzip it somewhere. We'll now refer to that unzipped location as `BRJS_HOME`. The BRJS CLI excutable is `BRJS_HOME/sdk/brjs`.


<div class="alert alert-info">
  <p>
    We're working towards a <a href="https://github.com/BladeRunnerJS/brjs/issues/1">global install</a>. For the moment you'll need to execute the <code>brjs</code> command via <code>BRJS_HOME/sdk/brjs</code>.
  </p>
</div>
