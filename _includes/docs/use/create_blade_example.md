```bash
$ ./brjs create-blade brjstodo default input
```

This creates a `input` directory within `BRJS_HOME/apps/brjstodo/blades/` containing the following sub-directories:

* `src` - for the JavaScript for the Blade
* `test-unit` - blade unit tests
* `test-acceptance` - blade acceptance tests
* `themes` - for CSS and images
* `workbench` - for the [Workbench](/docs/concepts/workbenches) for the Blade we're developing
* `resources` - for everything else

<div class="alert alert-info">
  <p>The <code>default</code> parameter ensures that the blade is created within the <code>blades</code> directory. The format of this command will change when we add support for <a href="https://github.com/BladeRunnerJS/brjs/issues/885">context aware commands</a>.</p>
</div>
