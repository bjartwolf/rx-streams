This is just work in progress.
Trying to go from the hack of merging streams and rx based on eventemitter interface up to streams2 interface.
The idea is to see how far I can go in merging rx and node-streams with using the APIs the expose properly and not use the fact that they are eventemitters. The low-level approach by hacking into events makes node-streams fall back into old-mode and thus breaks buffering and pausing.

Some things should be simple, such as wrapping rx in streams and the other way around. Merging , such as combinelatest, is probably harder. That will have to come later, after the first proof of concepts are implemented.

Implemented proof of concept for transforming rx-obsverable to node stream.
It works by giving the ObservableToStream constructor an observable rx-stream and a rx-function that does transformations. This could be something like
```javascript
var rxFunc = function (obs) {
  return obs.where(function(navdata) { return navdata && navdata.demo && navdata.demo.altitudeMeters;})
  .select(function(navdata) { return navdata.demo.altitudeMeters;})
};
```
The constructor takes the obserable stream to convert and the rx function and returns a proper streams2 stream.
```javascript
var testStream = new ObservableToStream(obsDrone, rxFunc);
```
