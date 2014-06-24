---
layout: docs
title: EventHub
permalink: /docs/concepts/event_hub/
---

#What is the EventHub?

The EventHub enables blades to communicate with other.

It is available by default in any BladeRunnerJS application and is a publish-subscribe event service. Publish-subscribe is the best choice for BladeRunnerJS as it supports our model of Separation of Concerns., The publishers are loosely coupled to the subscribers allowing separate processes to run in isolation.

Blades access EventHub using the [Service Registry](http://bladerunnerjs.org/docs/concepts/service_registry/).

##Benefits of the EventHub

Blades can't directly access functionality exposed by other blades. Communicating via the EventHub allows them to do this.

Using EventHub to ensure that blades do not directly interact with each other has resulted in us being able to offer Workbench. There is more information on what it can do on the Workbench page.

##How to use the EventHub

The EventHub is accessed from the [Service Registry](http://bladerunnerjs.org/docs/concepts/service_registry/):

```js
var ServiceRegistry = require( 'br/ServiceRegistry' );

  function MyClass() {

  this.eventHub = ServiceRegistry.getService( 'br.event-hub' );
  
}```

###Channels
Channels can be accessed from the EventHub service:

```js
function MyClass() {

  this.eventHub = ServiceRegistry.getService( 'br.event-hub' );
  
  /*** new code ***/

  this.channel = eventHub.channel( 'my-channel' );
  
   /*** end of new code ***/
} ```

###Events
Events can be bound to on a channel:

```js
function MyClass() {

  this.eventHub = ServiceRegistry.getService( 'br.event-hub' );

  this.channel = eventHub.channel( 'my-channel' );

  this.channel.on( 'my-event', this.handleEvent, this );
}```

```js
MyClass.prototype.handleEvent = function( eventData ) {

 // do something with the data
}```

And events can be triggered on channels:

```js
function MyClass() {

  this.eventHub = ServiceRegistry.getService( 'br.event-hub' );

  this.channel = eventHub.channel( 'my-channel' );

  this.channel.on( 'my-event', this.handleEvent, this );

  this.channel.trigger( 'my-event', { some: 'event' } );
}```

##Where Next

To find out more about Workbenches, see the [Workbenches ](http://bladerunnerjs.org/docs/concepts/workbenches/)page

To understand how the Service Registry works, see the [Service Registry](http://bladerunnerjs.org/docs/concepts/service_registry/) page
