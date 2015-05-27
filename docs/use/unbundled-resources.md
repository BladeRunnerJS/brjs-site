---
layout: docs
title: Using the Unbundled Resources
permalink: /docs/use/unbundled-resources/
---

Unbundled Resources are assets that shouldn't be minified and bundled, meaning that they will not be processed by any of the BRJS [bundlers](/docs/concepts/bundlers/). This feature could be used, for example, when adding inline images to your apps.

The `<@unbundled-resources@/>` tag allows you to load resources local to where the tag has been used, e.g.:

-	within an aspect index page, it loads unbundled-resources from the aspect.
-	within a bladeset workbench page, it loads unbundled-resources from the bladeset workbench.
-	within a blade workbench page, it loads unbundled-resources from the blade workbench.

Unbundled Resources need to be placed in a `unbundled-resources` folder on the level where you would like to use them (aspect, bladeset, bladeset workbench or blade workbench) and may be a file of any type.

Unbundled Resources may be versioned or unversioned.

## Example

For adding a `typography.css` file located in your entity's `unbundled-resources/standard-theme` folder, add the following:

`<link type="text/css" rel="stylesheet" media="screen" href="<@unbundled-resources@/>/standard-theme/typography.css" />`

Note that for navigating to upper entities' resources, you may do so command level style, e.g. `../../../<@unbundled-resources@/>`.
