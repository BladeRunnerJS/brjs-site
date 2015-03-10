---
layout: docs
title: Using the Command Line
permalink: /docs/use/commandline/
---

The `brjs` executable is available to use for Windows, Mac and Linux. It is located in `BRJS_HOME/sdk`.

## Adding BRJS to the `PATH`

The `brjs` executable can either be run by specifying the path to the executable, for example `./brjs <args>` or `../../brjs <args>`, or by adding it to the `PATH` environment variable so it can be run from anywhere by using `brjs <args>`. The current working directory when `brjs` is executed is used to determine the apps' location, see [Custom Apps Location](/docs/use/custom_apps_location/) for more info.

## Help

To get general help execute:

    $ ./brjs help

To get help for a specific command use:

    $ ./brjs help <command-name>

## Start the Development Server

To start the development server run:

    $ brjs serve [(-p|--port) <port>]

This will start the server. The `-p` flag is an optional port number. The default port is 7070. You can also change the port the server starts on by updating the value of the `jettyPort` configuration option in `BRJS_HOME/conf/brjs.conf`.

## Start the Test Server

Start the server used for serving files for test.

```
./brjs test-server [--no-browser]
```

For more information see [running tests](/docs/use/running_tests/).

## Run Tests

Execute tests beneath a given path.

```
./brjs test <path>
```

For more information see [running tests](/docs/use/running_tests/).

## Dependency Analysis Commands

*Note: These commands were introduced in BRJS v0.5
As part of helping the developer debugging experience, BRJS provides the following commands to help visualise dependencies.*


* `app-deps <app> [<aspect>] [-A|--all]`
* `workbench-deps <app> <bladeset> <blade> [-A|--all]`
* `bundle-deps <bundle-dir> [-A|--all]`
* `dep-insight <app> <require-path> [<aspect>] [-p|--prefix] [-a|--alias] [-A|--all]`

The command output have been modelled upon gradle's `dependencies` and `dependencyInsight` commands, and provide output like this:

### brjs app-deps

This command is to analyse the full set of dependencies for a given application aspect (e.g.`<myApp>/default-aspect`)

#### Usage

```
app-deps <app> [<aspect>] [-A|--all]
```

#### Example

```
› ./brjs app-deps brjstodo

Aspect 'default' dependencies found:
    +--- 'default-aspect/index.html' (seed file)
    |    \--- '../../libs/javascript/br-libs/br/src/br/ServiceRegistry.js' (*)
    |    |    \--- '../../libs/javascript/br-libs/br/src/br/Errors.js' (*)
    |    |    |    \--- '../../libs/javascript/br-libs/br/src/br/Core.js' (*)
    |    |    |    |    \--- '../../libs/javascript/thirdparty/topiarist'
    |    |    \--- '../../libs/javascript/br-libs/br/src/br/AliasRegistry.js'
    |    \--- '../../libs/javascript/br-libs/br/src/br/EventHub.js' (*)
    |    |    \--- '../../libs/javascript/thirdparty/emitr'
    |    \--- 'default-aspect/src/brjstodo/App.js'
    |    |    \--- '../../libs/javascript/br-libs/knockout/src/br/knockout/KnockoutComponent.js'
    |    |    |    \--- '../../libs/javascript/thirdparty/ko' (*)
    |    |    |    \--- '../../libs/javascript/br-libs/component/src/br/component/Component.js'
    |    |    |    \--- 'alias!br.html-service' (alias dep.)
    |    |    |    |    \--- '../../libs/javascript/br-libs/services/src/br/services/BRHtmlResourceService.js'
    |    |    |    |    |    \--- '../../libs/javascript/br-libs/services/src/br/services/HtmlResourceService.js'
    |    |    |    |    |    \--- '../../libs/javascript/br-libs/core/src/br/core/File.js'
    |    |    |    |    |    \--- '../../libs/javascript/br-libs/br/src/br/I18n.js' (*)
    |    |    |    |    |    |    \--- '../../libs/javascript/br-libs/i18n/src/br/i18n/I18N.js'
    |    |    |    |    |    |    \--- '../../libs/javascript/br-libs/i18n/src/br/i18n/Translator.js'
    |    |    |    |    |    |    |    \--- '../../libs/javascript/br-libs/i18n/src/br/i18n/LocalisedTime.js'
    |    |    |    |    |    |    |    \--- '../../libs/javascript/br-libs/i18n/src/br/i18n/LocalisedDate.js'
    |    |    |    |    |    |    |    |    \--- '../../libs/javascript/thirdparty/momentjs'
    |    |    |    |    |    |    |    \--- '../../libs/javascript/br-libs/i18n/src/br/i18n/LocalisedNumber.js'
    |    |    \--- 'todo-bladeset/blades/input/src/brjstodo/todo/input/InputViewModel.js'
    |    |    |    \--- 'alias!br.event-hub' (alias dep.) (*)
    |    |    \--- 'todo-bladeset/blades/items/src/brjstodo/todo/items/ItemsViewModel.js'

    (*) - subsequent instances not shown (use -A or --all to show)
```

The `-p` prefix command-flag is powerful in that it will take the given `<require-path>` and find all dependencies for classes with that as it's prefix, E.g. 'novox'.

### brjs workbench-deps

This command is similar to `aspect-deps` but allows you inspect dependencies for your blade's workbench.

#### Usage

```
workbench-deps <app> <bladeset> <blade> [-A|--all]
```

#### Example

```
› ./brjs workbench-deps brjstodo todo input

Workbench dependencies found:
    +--- 'todo-bladeset/blades/input/workbench/index.html' (seed file)
    |    \--- '../../libs/javascript/br-libs/br/src/br/ServiceRegistry.js' (*)
    |    |    \--- '../../libs/javascript/br-libs/br/src/br/Errors.js' (*)
    |    |    |    \--- '../../libs/javascript/br-libs/br/src/br/Core.js' (*)
    |    |    |    |    \--- '../../libs/javascript/thirdparty/topiarist'
    |    |    \--- '../../libs/javascript/br-libs/br/src/br/AliasRegistry.js' (*)
    |    \--- '../../libs/javascript/br-libs/br/src/br/EventHub.js' (*)
    |    |    \--- '../../libs/javascript/thirdparty/emitr' (*)
    |    \--- '../../libs/javascript/br-libs/workbench/src/br/workbench/tools/EventHubViewer.js'
    |    |    \--- '../../libs/javascript/br-libs/knockout/src/br/knockout/KnockoutComponent.js' (*)
    |    |    |    \--- '../../libs/javascript/thirdparty/ko' (*)
    |    |    |    \--- '../../libs/javascript/br-libs/component/src/br/component/Component.js' (*)
    |    |    |    \--- 'alias!br.html-service' (alias dep.) (*)
    |    |    |    |    \--- '../../libs/javascript/br-libs/services/src/br/services/JSTDHtmlResourceService.js'
    |    |    |    |    |    \--- '../../libs/javascript/br-libs/services/src/br/services/BRHtmlResourceService.js'
    |    |    |    |    |    |    \--- '../../libs/javascript/br-libs/services/src/br/services/HtmlResourceService.js'
    |    |    |    |    |    |    \--- '../../libs/javascript/br-libs/core/src/br/core/File.js'
    |    |    |    |    |    |    \--- '../../libs/javascript/br-libs/br/src/br/I18n.js' (*)
    |    |    |    |    |    |    |    \--- '../../libs/javascript/br-libs/i18n/src/br/i18n/I18N.js'
    |    |    |    |    |    |    |    \--- '../../libs/javascript/br-libs/i18n/src/br/i18n/Translator.js'
    |    |    |    |    |    |    |    |    \--- '../../libs/javascript/br-libs/i18n/src/br/i18n/LocalisedTime.js'
    |    |    |    |    |    |    |    |    \--- '../../libs/javascript/br-libs/i18n/src/br/i18n/LocalisedDate.js'
    |    |    |    |    |    |    |    |    |    \--- '../../libs/javascript/thirdparty/momentjs' (*)
    |    |    |    |    |    |    |    |    \--- '../../libs/javascript/br-libs/i18n/src/br/i18n/LocalisedNumber.js'
    |    |    \--- '../../libs/javascript/br-libs/workbench/src/br/workbench/ui/WorkbenchComponent.js' (*)
    |    \--- '../../libs/javascript/br-libs/knockout/src/br/knockout/workbench/KnockoutModelTree.js'

    lines removed for brevity

    |    \--- 'todo-bladeset/blades/input/src/brjstodo/todo/input/InputViewModel.js'
    |    |    \--- 'alias!br.event-hub' (alias dep.) (*)

    (*) - subsequent instances not shown (use -A or --all to show)
```

### brjs bundle-deps

This command gives you exactly the same functionality as provided by `app-deps` and `workbench-deps`, but does so in a more generic manner by requiring you to provide the path to a bundlable directory, rather than providing context specific arguments for this. This means you can also use this command to inspect the bundles that would be generated for library, aspect, blade-set, blade and workbench tests.

#### Usage

```
bundle-deps <bundle-dir> [-A|--all]
```

#### Example

For example, to see the bundle dependencies for the unit tests within a blade 'input',
within the blade-set 'todo', within the app 'brjstodo', you would need to run:

```
› ./brjs bundle-deps ../apps/brjstodo/todo-bladeset/blades/input/tests/test-unit/js-test-driver/

Bundle 'apps/brjstodo/todo-bladeset/blades/input/tests/test-unit/js-test-driver' dependencies found:
    +--- 'todo-bladeset/blades/input/tests/test-unit/js-test-driver/tests/InputViewModelTest.js' (seed file)
    |    \--- 'todo-bladeset/blades/input/src/brjstodo/todo/input/InputViewModel.js'
    |    |    \--- '../../libs/javascript/thirdparty/ko'
    |    |    \--- '../../libs/javascript/br-libs/br/src/br/ServiceRegistry.js' (*)
    |    |    |    \--- '../../libs/javascript/br-libs/br/src/br/Errors.js' (*)
    |    |    |    |    \--- '../../libs/javascript/br-libs/br/src/br/Core.js' (*)
    |    |    |    |    |    \--- '../../libs/javascript/thirdparty/topiarist'
    |    |    |    \--- '../../libs/javascript/br-libs/br/src/br/AliasRegistry.js'
    |    |    \--- 'alias!br.event-hub' (alias dep.)
    |    |    |    \--- '../../libs/javascript/br-libs/br/src/br/EventHub.js'
    |    |    |    |    \--- '../../libs/javascript/thirdparty/emitr'

    (*) - subsequent instances not shown (use -A or --all to show)
```

### dep-insight (requirePath)

This command allows you track your dependency in reverse and is useful to see why
a specific class is being bundled that you don't expect.

#### Usage

```
dep-insight <app> <require-path> [<aspect>] [-p|--prefix] [-a|--alias] [-A|--all]
```

#### Example

```
› ./brjs dep-insight brjstodo brjstodo/todo/input/InputViewModel

Source module 'brjstodo/todo/input/InputViewModel' dependencies found:
    +--- 'todo-bladeset/blades/input/src/brjstodo/todo/input/InputViewModel.js'
    |    \--- 'default-aspect/src/brjstodo/App.js'
    |    |    \--- 'default-aspect/index.html' (seed file)
```

### dep-insight (alias)

This command when used with the `-a` flag allows you to pass in an alias where you want dependency insight as to why/where it is being bundled from.

#### Usage

```
dep-insight <app> <alias> -a [<aspect>] [-p|--prefix] [-A|--all]
```

#### Example

```
	Alias 'br.foo.the-alias' composition:
	    name: 'br.foolib.the-alias' (defined in 'br/foolib/resources/aliasDefinitions.xml')
	    interface: 'br.foolib.TheInterface' (defined in 'br/foolib/resources/aliasDefinitions.xml')
	    class: 'acme.MegaClass' (defined in 'helperlib/resources/aliasDefinitions.xml' within group 'helperlib.g1')
	         -- (selected for use within 'default-aspect/resources/aliases.xml')

	Alias 'br.foo.the-alias' dependencies found:
	    +--- 'novox/pkg/SomeClass'
	    |    \--- 'novox/pkg/SomeUnusedClass'
	    |    |    \--- 'index.html'
```

The above commands are still quite new and we're considering making improvements/flags to help developers further. All usage feedback is welcome!
