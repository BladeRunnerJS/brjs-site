Executing the following will create a new application called `brjstodo` within
the `BRJS_HOME/apps` directory.

    $ ./brjs create-app brjstodo

<div class="alert alert-info">
  <p>
    BRJS apps presently have to reside within an <code>apps</code> folder in the unzip directory. Future releases will allow for <a href="https://github.com/BladeRunnerJS/brjs/issues/1">apps to be located anywhere on disk</a>.
  </p>
</div>

In the main directory, which represents your main view or aspect, you'll find an `index.html` entry point a `src` directory for your JavaScript, a `themes` directory for your CSS and images, and a `resources` directory for everything else. You can view this by starting the BRJS development server:

    $ ./brjs serve

This will start the development web server running on localhost port 7070. You can view the aspect by navigating to `http://localhost:7070/brjstodo`.

![](/docs/use/img/brjstodo_app_first_load.png)
