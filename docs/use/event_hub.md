---
layout: docs
title: How to Use the EventHub
permalink: /docs/use/event_hub/
---

The EventHub is a messaging system that enables loosely coupled communication between components within a BladeRunnerJS application. It is a [Publish-Subscribe](http://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) solution that can be used to broadcast and subscribe to messages.

The EventHub uses channels as a mechanism for partitioning data. Channels are synonymous with "topics" and "subjects" in other PubSub solutions. Additionally, channels within the EventHub provide an event abstraction allowing finer grained filtering and handling of messages.

## Accessing the EventHub

The EventHub is a service and as such is accessed via the [ServiceRegistry](/docs/concepts/service_registry/). This means that it can be replaces if a better implementation is provided or for the purposes of testing.

```js
var ServiceRegistry = require( 'br/ServiceRegistry' );

function MyClass() {
  var eventHub = ServiceRegistry.getService( 'br.event-hub' );
}
```

## Channels

Channels offer a way of partitioning data and messaging within your application. For example, messaging related to a chat component may be sent over the `chat` channel and data about news sent over a `news` channel.

Channels have a `String` identifier and do not need to be constructed and are dynamically created by the EventHub as required.

```js
EventHub.channel( channelName );
```

The example below demonstrates how to access a channel from the event hub.

```js
var ServiceRegistry = require( 'br/ServiceRegistry' );

function MyClass() {
  var eventHub = ServiceRegistry.getService( 'br.event-hub' );
  /*** new code ***/
  var channel = eventHub.channel( 'my-channel' );
  /*** end of new code ***/
}
```

### Publishing (triggering events)

Messaging are published on channels via the `trigger` function. This terminology ties in with the evented nature of the EventHub.

Events are triggered with either a `String` event name and data payload.

```js
Channel.trigger( eventName, data );
```

Or an object where the event type is identified based on the object type of the event data.

```js
Channel.trigger( Object );
```

The example below demonstrates using the `String` event name and data payload:

```js
var ServiceRegistry = require( 'br/ServiceRegistry' );

function MyClass() {
  var eventHub = ServiceRegistry.getService( 'br.event-hub' );
  var channel = eventHub.channel( 'my-channel' );
  /*** new code ***/
  var data = { 'some': 'data' };
  channel.trigger( 'my-event', data );
  /*** end of new code ***/
}
```

This example shows triggering an event using an object where the event type is identified based on the object type of the event data.

```js
var ServiceRegistry = require( 'br/ServiceRegistry' );
var MouseEvent = require( 'mouse/MouseEvent' );

function MyClass() {
  var eventHub = ServiceRegistry.getService( 'br.event-hub' );
  var channel = eventHub.channel( 'my-channel' );
  /*** new code ***/
  channel.trigger( new MouseEvent( 100, 99 ) );
  /*** end of new code ***/
}
```

### Subscribing

Messaging can be subscribed to using the `on` and `once` notation that commonly associated with event-based messaging systems.

`on` will bind to the event indefinitely or until the event is unbound.

```js
Channel.on( event, handler, context );
```

`once` will bind and auto-unbind the first the event is triggered and the event handler has been invoked.

```js
Channel.once( event, handler, context );
```

In both cases the `context` parameter is optional.

The following example uses `on` to bind to an event identified by a `String`. To use `once` simply replace `on` with `once`:

```js
var ServiceRegistry = require( 'br/ServiceRegistry' );

function MyClass() {
  var eventHub = ServiceRegistry.getService( 'br.event-hub' );
  var channel = eventHub.channel( 'my-channel' );
  /*** new code ***/
  channel.on( 'my-event', this.handleEvent, this );
  /*** end of new code ***/
}

/*** new code ***/
MyClass.prototype.handleEvent = function( data ) {
  // do something with the event data
}
/*** end of new code ***/
```

The following example uses `on` to bind to an event identified by an Object type. To use `once` simply replace `on` with `once`:

```js
var ServiceRegistry = require( 'br/ServiceRegistry' );
var MouseEvent = require( 'mouse/MouseEvent' );

function MyClass() {
  var eventHub = ServiceRegistry.getService( 'br.event-hub' );
  var channel = eventHub.channel( 'my-channel' );
  /*** new code ***/
  channel.on( MouseEvent, this.handleEvent, this );
  /*** end of new code ***/
}

/*** new code ***/
MyClass.prototype.handleEvent = function( data ) {
  // do something with the event data
}
/*** end of new code ***/
```

### Unsubscribing

You can unsubscribe from events using the `off` function.

Using a `String` event identifier:

```js
Channel.off( eventName, handler, context );
```

Or object type references:

```js
Channel.off( Object, handler, context );
```

The event identifier, `handler` and `context` parameters are all optional. The example below shows all the possible uses

```js
var ServiceRegistry = require( 'br/ServiceRegistry' );
var MouseEvent = require( 'mouse/MouseEvent' );

function MyClass() {
  var eventHub = ServiceRegistry.getService( 'br.event-hub' );
  var channel = eventHub.channel( 'my-channel' );

  /*** new code ***/
  // clears all listeners registered on emitter.
  channel.off();

  // clears all listeners for 'my-event'.
  channel.off( 'my-event' );

  // clears all listeners for MouseEvent
  channel.off( MouseEvent );

  // removes the listener added with
  //    channel.on( 'my-event', this.handleEvent );
  channel.off( 'my-event', this.handleEvent );

  // removes the listener added with
  //    channel.on( MouseEvent, this.handleEvent) ;
  channel.off( MouseEvent, this.handleEvent );

  // removes the listener added with
  //    emitter.on('my-event', this.handleEvent, context);
  channel.off('my-event', this.handleEvent, this );

  // removes the listener added with
  //    channel.on( MouseEvent, this.handleEvent, context);
  channel.off( MouseEvent, this.handleEvent, this );
  /*** end of new code ***/
}

MyClass.prototype.handleEvent = function( data ) {
  // do something with the event data
}
```

You can also remove all the listeners for a given context:

```js
Channel.clearListeners( context );
```

Here's an example:

```js
var ServiceRegistry = require( 'br/ServiceRegistry' );
var MouseEvent = require( 'mouse/MouseEvent' );

function MyClass() {
  var eventHub = ServiceRegistry.getService( 'br.event-hub' );
  var channel = eventHub.channel( 'my-channel' );

  /*** new code ***/
  channel.clearListeners( this );
  /*** end of new code ***/
}
```

## Where next?

Read the [JavaScript API documentation](http://apidocs.bladerunnerjs.org/v0.9/js/index.html#br.EventHub.html).

Find out more about the [ServiceRegistry](/docs/concepts/service_registry)  [creating your own services](/docs/use/service_registry).

The EventHub uses our open source [emitr library](https://github.com/BladeRunnerJS/emitr) and each of the channel objects is an `emitr`. You can take a look at the GitHub repo for more information on that library.
