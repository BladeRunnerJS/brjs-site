---
layout: docs
title: User Templates
permalink: /docs/use/user_templates/
---

## Template Structure

A template represents a collection of files and folder that will be created for the requested entity.

Templates exist in two locations:

- `conf/templates`: user-defined templates. This is where you may add your own templates for use when creating entities.
- `sdk/templates`: default templates provided by BladerunnerJS. **_These are not to be changed by the user._**

Within these locations, the templates are organized in _template groups_. A template group represents the name by which the templates therein will be referenced when creating new entities. 

If the requested template exists in both `conf/templates` and `sdk/templates`, the template from `conf/templates` will be used.

If present, the default templates in `conf/templates/default` will override the default templates in `sdk/conf/templates/default`.

If no template is specified, the default template will be used.

If the template for an implicitly created entity does not exist, an empty folder will be created (e.g. test-unit for bladeset).

## Tokens
Tokens are aliases for namings that are automatically replaced when creating an entity. You may include the following tokens in each of these templates, prefixed by `@`, which will then be replaced with the appropriate value:

- `app`: 
	- `appns`
	- `appname`
- `aspect`: *Please note that this entity is also created implicitly when creating a new app.*
	- `aspectRequirePrefix`
	- `aspectNamespace`
	- `aspectTitle`
- `aspect-test-acceptance-default`: *Please note that this entity is created implicitly when creating a new app or aspect.*
	- `aspectRequirePrefix`
	- `aspectNamespace`
	- `aspectTitle`
- `aspect-test-unit-default`: *Please note that this entity is created implicitly when creating a new app or aspect.*
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
- `bladeset-test-unit-default`: *Please note that this entity is created implicitly when creating a new bladeset.*
	- `bladesetRequirePrefix`
	- `bladesetNamespace`
	- `bladeset`
	- `bladesetTitle`
- `bladesetworkbench`: *Please note that this entity is created implicitly when creating a new bladeset.*
	- `bladesetRequirePrefix`
	- `bladesetNamespace`
	- `bladeset`
	- `bladesetTitle`
- `blade-test-acceptance-default`: *Please note that this entity is created implicitly when creating a new bladeset.*
	- `bladeRequirePrefix`
	- `bladeNamespace`
	- `blade`
	- `bladeTitle`
- `blade-test-unit-default`: *Please note that this entity is created implicitly when creating a new blade.*
	- `bladeRequirePrefix`
	- `bladeNamespace`
	- `blade`
	- `bladeTitle`
- `bladeworkbench`: *Please note that this entity is created implicitly when creating a new blade.*
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

Templates may be used for all the `create` commands by adding the flag `--template` or `-T` followed by the name of the template e.g. `create-app myApp --template myTemplate`. For this example, the templates must be located under `conf/templates/myTemplate`, and the app template under `conf/templates/myTemplate/app`. 
