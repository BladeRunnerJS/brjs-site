---
layout: docs
title: User Templates
permalink: /docs/use/user_templates/
---

## Template Structure

A template represents a collection of files and folders that will be created for the requested entity or node.

Templates exist in two locations:

- `conf/templates`: user-defined templates. This is where you may add your own templates for use when creating new nodes.
- `sdk/templates`: default templates provided by BladerunnerJS. **These should not be changed by the developer**

Within these locations, the templates are organised into *template groups*. A template group represents the name by which the templates therein will be referenced when creating new nodes.

If the requested template exists in both `conf/templates` and `sdk/templates`, the template from `conf/templates` will be used. If present, the default templates in `conf/templates/default` will override the default templates in `sdk/conf/templates/default`.

If no template is specified, the default template will be used.

If the template for an implicitly created node does not exist, an empty folder will be created. For example when creating a new `aspect` using the `foo` template group, if the `aspect-test-acceptance-default` template does not exist in that group an empty `test-acceptance` folder will be created.

## Tokens
Tokens are aliases for namings that are automatically replaced when creating an node. You may include the following tokens in each of these templates, prefixed by `@`, which will then be replaced with the appropriate value:

- `app`:
	- `appns`
	- `appname`
- `aspect`:
	- `aspectRequirePrefix`
	- `aspectNamespace`
	- `aspectTitle`
- `aspect-test-acceptance-default`:
	- `aspectRequirePrefix`
	- `aspectNamespace`
	- `aspectTitle`
- `aspect-test-unit-default`:
	- `aspectRequirePrefix`
	- `aspectNamespace`
	- `aspectTitle`
- `blade`:
	- `bladeRequirePrefix`
	- `bladeNamespace`
	- `blade`
	- `bladeTitle`
- `bladeset`:
	- `bladesetRequirePrefix`
	- `bladesetNamespace`
	- `bladeset`
	- `bladesetTitle`
- `bladeset-test-unit-default`:
	- `bladesetRequirePrefix`
	- `bladesetNamespace`
	- `bladeset`
	- `bladesetTitle`
- `bladesetworkbench`:
	- `bladesetRequirePrefix`
	- `bladesetNamespace`
	- `bladeset`
	- `bladesetTitle`
- `blade-test-acceptance-default`:
	- `bladeRequirePrefix`
	- `bladeNamespace`
	- `blade`
	- `bladeTitle`
- `blade-test-unit-default`:
	- `bladeRequirePrefix`
	- `bladeNamespace`
	- `blade`
	- `bladeTitle`
- `bladeworkbench`:
	- `bladeRequirePrefix`
	- `bladeNamespace`
	- `blade`
	- `bladeTitle`
- `brjs`
- `brjsconformantjslibrootassetlocation`:
	- `lib`
	- `libns`
- `brjsconformantrootassetlocation`:
	- `lib`
	- `libns`
- `thirdpartyassetlocation`:
	- `lib`
	- `libns`

## Usage

Templates may be used for all the `create` commands by adding the flag `--template` or `-T` followed by the name of the template e.g. `create-app myApp --template myTemplate`. For this example, the templates must be located under `conf/templates/myTemplate`, and the app templates under `conf/templates/myTemplate/app`.
