---
layout: docs
title: Using the Command Line
permalink: /docs/use/commandline/
---

The `brjs` executable is available to use for Windows, Mac and Linux. It is located in `BRJS_HOME/sdk`.

## Help

To get general help execute:

    $ ./brjs help

To get help for a specific command use:

    $ ./brjs help <command-name>

## Start the Development Server

To start the development server run:

    $ ./brjs serve

This will start the server on port 7070. If you wish to change the port the server starts on you can update the value of the `jettyPort` configuration option in `BRJS_HOME/conf/bladerunner.conf`.

<div class="doc-feedback alert alert-info">
  <p>In future versions of BRJS:</p>
  <ul>
    <li>The <a href="https://github.com/BladeRunnerJS/brjs/issues/281">port number should be configurable as a flag passed to the <code>serve</code> command</a></li>
    <li><a href="https://github.com/BladeRunnerJS/brjs/issues/280"><code>bladerunner.conf</code> will be renamed to <code>brjs.conf</code></a></li>
  </ul>
</div>

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
Aspect 'default' dependencies found:
    +--- 'default-aspect/index.html' (seed file)
    |    \--- 'novox/Class1'
    |    |    +--- 'novox/Class2'
    +--- 'resources/xml/config.xml' (seed file)
    |    \--- 'novox/Class1' (*)

    (*) - dependencies omitted (listed previously)
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
Workbench dependencies found:
    +--- 'widget-bladeset/blades/clock/workbench/index.html' (seed file)
    |    \--- 'default-aspect/src/novox/Class1.js'
    |    \--- 'widget-bladeset/blades/clock/src/novox/widget/clock/Clock.js'

    (*) - dependencies omitted (listed previously)
```

### brjs bundle-deps

This command gives you exactly the same functionality as provided by `aspect-deps` and `workbench-deps`, but does so in a more generic manner by requiring you to provide the path to a bundlable directory, rather than providing context specific arguments for this. This means you can also use this command to inspect the bundles that would be generated for library, aspect, blade-set, blade and workbench tests.

#### Usage

```
bundle-deps <bundle-dir> [-A|--all]
```

#### Example

For example, to see the bundle dependencies for the unit tests within a blade 'myblade', within the blade-set 'mybladeset', within the app 'myapp', you would need to run:

    ./brjs bundle-deps ../apps/myapp/mybladeset-bladeset/blades/myblade/tests/test-unit/js-test-driver

### dep-insight (requirePath)

#### Usage

This command allows you track your dependency in reverse and is useful to see why a specific class is being bundled that you don't expect.

```
dep-insight <app> <require-path> [<aspect>] [-p|--prefix] [-a|--alias] [-A|--all]
```

#### Example

```
Source module 'novox/Class1' dependencies found:
    +--- 'novox/Class2'
    |    \--- 'index.html'
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
