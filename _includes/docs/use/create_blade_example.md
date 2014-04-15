```bash
$ BRJS_HOME/sdk/brjs create-blade brjstodo todo input
```

This creates a `input` directory within `BRJS_HOME/apps/brjstodo/todo-bladeset/blades/` containing the following sub-directories:

* `src` - for the JavaScript for the Blade
* `tests` - for the blade tests
* `themes` - for CSS and images
* `workbench` - for the [Workbench](/docs/concepts/workbenches) for the Blade we're developing
* `resources` - for everything else

<div class="alert alert-info github">
<p>
In future:
</p>
<ul>
<li><a href="https://github.com/BladeRunnerJS/brjs/issues/3">A default blade will be created when an application is created</a></li>
<li>The <a href="https://github.com/BladeRunnerJS/brjs/issues/1">CLI will be context aware</a> so you can run <code>brjs create-blade</code> from within an application directory to create a blade for an app; you won't need to supply an app name, app namespace and BladeSet name</li>
</ul>
</div>
