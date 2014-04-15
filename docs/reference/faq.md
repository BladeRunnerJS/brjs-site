---
layout: docs
title: FAQ
permalink: /docs/faq/
notice: none
---

<div class="alert alert-warning">
    <p>
        Got a question that's not answered here? Either tweet <a href="//twitter.com/bladerunnerjs">@BladeRunnerJS</a> or <a href="//github.com/BladeRunnerJS/brjs-site">submit a pull request</a> and we'll add the answer.
    </p>
</div>

### Does BladeRunnerJS replace AngularJS/Knockout/Ember/*\<some other MVC or MVVM framework\>*?

**No.**

Right now BladeRunnerJS templates use Knockout by default. But there's no reason why you can't use Angular, Ember, React or any other front-end framework *with BladeRunnerJS*. It's important to remember that BladeRunnerJS is a toolkit that enables the development of large-scale JavaScript apps "out of the box" and only provides a small layer of front-end architecture in the form of [services](/docs/concepts/service_registry).

### How do Blades relate to Web Components?

They represent similar concepts. However, Web Components will potentially be natively supported by web browsers and will offer stronger browser-enforced encapsulation. [Blade](/docs/concepts/blades/) encapsulation is enforced by the BRJS toolkit.

### How big/small should a Blade be?

A Blade can be as big or as small as you want it to be. However, we'd recommend that you split your application functionality up by feature - so each feature is a Blade. If you identify a reusable piece of functionality within a Blade you should consider refactoring in order to move that functionality into a [library](/docs/concepts/libraries/).

### Why is BladeRunnerJS not written in Node.JS?

### Will you do a Webinar to tell me more?

### Can I get support?

### Can you do some training?

### Why is BladeRunnerJS Open Source?

### Can you add support for *<insert-cool-new-feature>*?
