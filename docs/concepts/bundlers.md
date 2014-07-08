---
layout: docs
title: Introduction to Bundling in BladeRunnerJS
permalink: /docs/concepts/bundlers/
---

## Why we bundle assets of a similar type together

Traditional monolithic applications typically organize the assets that form the app (e.g. HTML templates, CSS stylesheets, etc) into horizontal seams of the same _asset-type_, so that the app can be efficiently deployed to the browser. Conversely, BladeRunnerJS apps organize their assets into a set of vertical feature-based slices, that we call [Blades](/docs/concepts/blades). This way of organizing code makes adding and removing business features, and testing business features in isolation much easier.

![Organizing assets by business feature](/docs/concepts/img/asset-structure.png)

The problem with splitting your app into vertical, feature-based slices is that, for efficiency reasons, the application must be re-composed into horizontal technology-based seams before it can be deployed to the browser. And, since having a production environment that is subtly different to your development environment is detrimental to productivity, this bundling activity must occur on-the-fly, every time the page is refreshed.

This is what BladeRunnerJS does; it allows you to compose your application as a set of feature _blades_, while deploying your application as a set of _bundles_ of the same _asset-type_.


## When we bundle assets

There are a number of scenarios in which it is necessary to deploy a set of bundles to the browser. In each of these scenarios, what is actually sent to the browser will vary; for example, we don't bundle workbench components or test code in the production application. These scenarios are as follows:

* Aspect Page (so that app can be viewed in a browser)
* Blade Workbench Page (so that a blade can be interacted with in isolation)
* Aspect Test (so that code used by the aspect can be tested)
* Blade Test (so that a single blade can be tested in isolation)
* BladeSet Test (so that common code used by multiple blades can be tested)
* Library Test (so that a re-usable library can be tested)
* Blade Workbench Test (so that any workbench widgets can be tested)


## What assets actually are

{% include docs/concepts/asset_definition.md %}

{% include docs/concepts/linked_asset_definition.md %}

{% include docs/concepts/source_module_definition.md %}

## Asset Containers & Asset Locations

{% include docs/concepts/asset_container_definition.md %}

{% include docs/concepts/asset_location_definition.md %}

Whereas the discovery of the available _asset-containers_ is a model concern, the discovery of the _asset-locations_ within each _asset-container_ is a plug-in concern (the `AssetLocationPlugin` in this case).

Some _asset-containers_ are _bundlable_, since there is a corresponding scenario for which it is useful to create a _bundle_ for them (see 'When we bundle assets'). Such _bundlable_ _asset-containers_ provide a list of the related _asset-containers_ that should also be included when a _bundle_ is to be generated.


## How assets are bundled together

The bundling process starts by determining a list of _seed_ _linked-assets_ for the _bundlable_ _asset-container_ in question, and adding these to the backlog of _linked-assets_ that need to be processed. One _linked-asset_ from the backlog is processed at a time, as follows:

* Any _source-modules_ referred to by the _linked-asset_ are added to the backlog (remembering that _source-modules_ are by definition _linked-assets_).
* The _asset-location_ within which the _source-module_ resides, and any dependent _asset-locations_ of that _asset-location_, are scanned for more _linked-assets_ to be added to the backlog.
* Only _source-modules_, _linked-assets_ and _asset-locations_ that have never been processed before are re-processed, so that each is only processed once, and so that processing does not continue indefinitely.
* _linked-assets_ that contain references to _aliases_ are processed in much the same way as if they had direct _source-module_ references, except that the _alias_ is swapped for the concrete _source-module_ it points as part of the bundling process.
* Once the backlog is empty, the final _bundle-set_ has effectively been generated, containing the list of all _source-modules_, _aliases_ and _asset-locations_ that could potentially be bundled.
* Exactly which bits of the _bundle-set_ will actually be sent to the client depends on the tags used within the index page, and whether the `HTMLResourceService` and `XMLResourceService` classes are used within the application.

##How bundlers work in practice

There are three basic scenarios in which you will run your application, and bundling works slightly differently in each of them:

Displaying in a browser during development
Running tests on your code
Building a deployable application

### Scenario 1 – Displaying in a Browser during Development

During development, you would want to display a blade in a browser, either in isolation (in a workbench page, while you are working on it) or as part of the whole application, which you would do by viewing the `index.html` page of a particular aspect.

In either case, every time the browser requests a page, the bundlers run as servlets within BRJS’s embedded app server. They treat the requested page as a "seed" file and perform a recursive dependency analysis (which is to say that they check which resources are going to be needed to display the page, and then go and fetch them), before producing bundle files that contain all the code needed to run the application.

This means that any time a line of source code is changed, that affects any part of the page being displayed, the result can be seen just by refreshing your browser. The bundlers are written with performance in mind, and workbench pages typically take just a few tenths of a second to reload.

### Scenario 2 – Running Tests on Your Code

Test code is placed in the `tests` directory of the appropriate aspect, bladeset or blade (depending on exactly what you are testing at the time). BRJS uses [js-test-driver](https://code.google.com/p/js-test-driver/) to run tests, and the JsTestDriver.conf file – a copy of which resides in the tests folder being used at the time – determines which tests to run. The bundlers are executed by js-test-driver every time tests are run.

See the [Tests](/docs/concepts/testing) concepts page, [Writing Tests](/docs/use/writing_tests/) and [Running Tests](/docs/use/running_tests).

### Scenario 3 - Building a Deployable Application

When deploying an app, the bundlers generate static bundle files (which can optionally be archived in a WAR) and can be deployed to a production environment. BRJS and thus Bundlers are not used in a production environment.

For more information see [Building and Deploying Apps](/docs/use/build_deploy/).

## Where next?

The Bundlers generally rely on the [BRJS Domain Model](/docs/concepts/model/) and [Dependency Analysis](/docs/concepts/dependency_analysis/) in order to build their bundles.

The [BRJS CLI](/docs/use/commandline/) comes with a `bundle-deps` that allows you to visualize the dependencies of a bundle.
