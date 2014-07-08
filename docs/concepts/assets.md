---
layout: docs
title: Assets
permalink: /docs/concepts/assets/
---

# Assets

This is the generic word we use to describe all of the different types of content that can comprise an application. Assets includes:

- JavaScript Source
- HTML Templates
- CSS Stylesheets
- CSS Resources (e.g. Images, Typefaces, etc)
- I18N Properties Files
- XML Configuration

## Assets - HTML Templates

HTML templates are used to build user interfaces. The HTML bundler enforces a namespacing convention, to ensure that someone working in a blade cannot accidently overwrite an HTML template in another blade. An error is reported if a template violates the namespacing convention.
The bundler verifies that the first top-level element in each file has an id attribute, and that the attribute complies with the namespacing convention.
For example, say you have an HTML template (a "View" in Presenter parlance) with a top level element like this:

```html
<div id="myapp.mybladeset.myblade.viewname">

...

</div>
```

We could tell that the name of the app it belongs to is `myapp`, the bladeset is called `mybladeset`, the blade is called `myblade` and the template has the unique identifier of `viewname`.

## Assets - CSS Stylesheets

An application may support a set of themes.  All the CSS associated with a particular theme is found within the themes directory of the aspect, bladeset or blade to which it belongs, in a folder dedicated to that theme.   For example: CSS that applies to the steampunk theme of an application’s default aspect would be located in: `default-aspect/themes/steampunk/`

BRJS determines the theme and locale to be [bundled](/docs/concepts/bundlers). The CSS bundle will therefore only contain CSS files from the appropriate theme directory.

To create locale-specific variants, create stylesheets using the following naming conventions inside the appropriate theme directory:

For locale-specific CSS: <name>_<locale>.css

<name> in this instance, is whatever name you want to give to your CSS file, so if your default stylesheet was called styles.css, a locale-specific version for French could be: `styles_fr_FR.css`

## Assets - i18n (internationalisation) properties files

Each i18n file is a simple properties file with one property per line and the syntax `name=value` , and contains label values appropriate for a particular locale.

For example:

The file `en_GB.properties` might contain the following definition for a greeting: `myapp.welcome=Hello`
Whilst the file `fr_FR.properties` would contain: `myapp.welcome=Bonjour`.

In most circumstances, the i18n bundler only loads the properties files appropriate for the requested locale. When a deployable application is being generated however, a separate i18n bundle will be generated for every locale for which properties files exist. The localised labels are sent to the browser as a single JSON map of key/label pairs.

The i18n bundler enforces a namespacing convention, which ensures that someone working in a blade cannot accidentally overwrite a label in another blade. An error is reported if a template violates the namespacing convention. The bundler verifies that the label identifier key follows the namespacing convention.

For example:

```
myapp.mybladset.myblade.title=My Blade Title
```

In this example, the properties file must reside in a blade for which the app name is `myapp`; the bladeset name is `mybladeset`, and the blade is called `myblade`.

## Where Next?

Find out more about the [bundling process](/docs/concepts/bundling/) and how bundles are determined via [Dependency Analysis](/docs/concepts/dependency_analysis/).
