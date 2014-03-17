---
layout: docs
title: EventHub
permalink: /docs/concepts/event_hub/
---

The EventHub is a core BRJS JavaScript [Service](/docs/concepts/services) available in any BRJS application. It is a publish-subscribe event service that decouples the communication between blades and provides a primary way for them to communicate with each other.

The EventHub is accessed from the [Service Registry](/docs/concepts/service_registry):

```javascript
var ServiceRegistry = require( 'br/ServiceRegistry' );

function MyClass() {
  this.eventHub = ServiceRegistry.getService( 'br.event-hub' );
}
```

Channels can be accessed from the EventHub service:

```javascript
function MyClass() {
  this.eventHub = ServiceRegistry.getService( 'br.event-hub' );

  /*** new code ***/
  this.channel = eventHub.channel( 'my-channel' );
  /*** end of new code ***/
}
```

Events can be bound to on a channel:

```javascript
function MyClass() {
  this.eventHub = ServiceRegistry.getService( 'br.event-hub' );

  this.channel = eventHub.channel( 'my-channel' );

  /*** new code ***/
  this.channel.on( 'my-event', this.handleEvent, this );
  /*** end of new code ***/
}

/*** new code ***/
MyClass.prototype.handleEvent = function( eventData ) {
  // do something with the data
}
/*** end of new code ***/
```

And events can be triggered on channels:

```javascript
function MyClass() {
  this.eventHub = ServiceRegistry.getService( 'br.event-hub' );

  this.channel = eventHub.channel( 'my-channel' );

  this.channel.on( 'my-event', this.handleEvent, this );

  /*** new code ***/
  this.channel.trigger( 'my-event', { some: 'event' } );
  /*** end of new code ***/
}
```

Each channel is an `Emitr` object. For more information see the [emitr github repo](https://github.com/BladeRunnerJS/emitr).
