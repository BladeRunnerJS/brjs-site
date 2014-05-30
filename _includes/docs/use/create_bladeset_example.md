Running the following command will create a `todo` bladeset for the `brjstodo` app:

    $ ./brjs create-bladeset brjstodo todo

The `todo` bladeset is represented on disk by a directory called `todo-bladeset`
that resides under the `brjstodo` app directory.

<div class="alert alert-info github">
  <p>
    In future:
  </p>
  <ul>
    <li><a href="https://github.com/BladeRunnerJS/brjs/issues/2">BladeSets will be optional</a>. Right now a Blade must reside within a BladeSet</li>
    <li><a href="https://github.com/BladeRunnerJS/brjs/issues/1">The CLI will be context-aware</a> so you can run <code>brjs create-bladeset</code> from within an application directory to create a BladeSet for an app.</li>
  </ul>
</div>
