# From Rx to node streams and back
This is just work in progress. My plan is to do use-case by use-case until my brain explodes. The simplest ones are ok, the harder use-cases might require some thinking, and the two different streams implementations might turn out to have inconsistencies that will be hard to smooth out witout creating leaky abstractions.

My first attempt was based on previous work I had seen on the so-called old-streams in node.js (previous to node.js v0.10). They basically used the fact that sreams are eventemitters and rxjs works with events. The new-streams, or streams2, are a little bit higher-level to provide built-in support for buffering and pausing of streams.

My approach is trying to combine rx with node-streams based on using the new streams API (inheriting from read, write and transform streams, mostly).

The plan is to see how far I can go in merging rx and node-streams with using the APIs the expose properly and not use the fact that they are eventemitters. The low-level approach by listening to events makes node-streams fall back into old-mode and thus breaks buffering and pausing.

Some things should be simple, such as wrapping rx in streams and the other way around. Merging streams, such as combinelatest, is probably harder. That will have to come later, after the first simples use-cases are implemented.

## Observables to node streams
Implemented proof of concept for transforming rx-obsverable to node stream.
It works by giving the ObservableToStream constructor an observable rx-stream and a rx-function that does transformations. This could be something like
```javascript
var rxFunc = function (obs) {
  return obs.where(function(navdata) { return navdata && navdata.demo && navdata.demo.altitudeMeters;})
  .select(function(navdata) { return navdata.demo.altitudeMeters;})
};
```
The constructor takes the obserable stream (in the example: obsDrone) to convert and the rx function (rxFunc) and returns a proper streams2 stream.
```javascript
var testStream = new ObservableToStream(obsDrone, rxFunc);
```

## Cold vs hot observables
Hot observables can't be paused. They can be deferred somehow, but not sure if that helps or not. Should at least consider pausing/unsubscribing temporarily from cold observables if downstream buffers are full.

