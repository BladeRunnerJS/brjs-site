---
layout: docs
title: Aspects
permalink: /docs/concepts/aspects/
---

##What are Aspects?

Aspects take multiple blades and use them to compose a view. There are lots of reasons you might want to use an aspect. These could include the following:
1.	Different aspects for defined steps in an application workflow e.g. Login and Main

2. 	Composing aspects out of application blades for different devices such as tablets or mobiles.

3.	Aspects for different service levels or user permissions, for example aspects containing more blades providing access to more features for premium customers.

4.	Of course, you may not have any special requirements at this stage. In which case, you don’t need to do anything. Simply use the default aspect provided.

## Benefits of Aspects
Using aspects enables the deployment process to specify the particular blades that it wishes to deploy. This creates a bundle which contains only the required views. This means that you can reuse the same blades across multiple aspects.

For example, the below diagram shows three separate aspects: desktop, tablet and device.  It also shows the blades for a web page email search. All three aspects use the search blade. However, the desktop and tablet aspects both use the rich email list blade whereas the mobile blade uses the simple email list blade. This provides a more tailored service to mobile devices and their users.


![BladeRunnerJS Aspects example](https://docs.google.com/drawings/d/1zRaOTlTQ26t3n6vRRvSvo3KCtggQeP7DVpUlhFi7JD0/pub?w=1440&h=1080)

##How to Use Aspects

An aspect consists of an entry index.html page and a set of required resources. Each aspect potentially has access to all the resources and blades in its parent application, but it may be set up only to deliver a fraction of that to the end-users.

You can create new aspects via the command line interface by executing the following instruction:

`brjs create-aspect <app-name> <new-aspect-name>brjs create-aspect <app-name> <new-aspect-name>`

for example:

`brjs create-aspect example-app login`

Note: This is only done through the command line at the moment. We will be adding this on the the dashboard at a later date. [Details are on GitHUb](https://github.com/BladeRunnerJS/brjs/issues/748)

## Where Next?

For further information, see How to [Create an Aspect](http://bladerunnerjs.org/docs/concepts/aspects/)

Once you have created aspects, see this page to start [Adding blades to aspects](http://bladerunnerjs.org/docs/use/add_blade_to_aspect/).

Visit the relevant component pages for more information on [blades](http://bladerunnerjs.org/docs/concepts/blades/) and [bladesets](http://bladerunnerjs.org/docs/concepts/bladesets/).

