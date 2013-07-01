# Testing this out
Just run 

node runObservableFromStream 

or

node runStreamFromObservable 


Both test-data streams are set to end after 3000 ms

# From Rx to node streams and back
This is just work in progress. My plan is to do use-case by use-case until my brain explodes. The simplest ones are ok, the harder use-cases might require some thinking, and the two different streams implementations might turn out to have inconsistencies that will be hard to smooth out without creating leaky abstractions.

My first attempt was based on previous work(hacks) I had seen on the so-called old-streams in node.js (previous to node.js v0.10). They basically used the fact that sreams are EventEmitters and the way rxjs works with events. The new-streams, or streams2, are a little bit higher-level to provide built-in support for buffering and pausing of streams.

My approach is trying to combine rx with node-streams based on using the new streams API.

The plan is to see how far I can go in merging rx and node-streams with using the APIs the expose properly and not listening to internal data-events atc. The low-level approach by listening to events makes node-streams fall back into old-mode and thus breaks buffering and pausing.

Some things should be simple, such as wrapping rx in streams and the other way around. Merging streams, such as combinelatest, is probably harder. That will have to come later, after the first simples use-cases are implemented.

## Observables to node streams
Implemented proof of concept for transforming rx-obsverable to node stream.
It works by giving the StreamFromObservable constructor an Rx Observable 

### Example 
```javascript
var stream = new StreamFromObservable(obs);
```

### TODO
* Lot's of stuff
* Tests

## Node-streams to observables
Again a proof of concept for transforming node-streams to observables. Instead of the hack of listening to data-events (Listening for data-events turns streams into old mode.). Instead it listens for readable events, then it reads the stream and calls onNext. It only works on streams in objectmode.

### Example 
```javascript
var obs = new ObservableFromStream(stream);
```
This turns a readable stream into an observable so that you for example can do:

```javascript
obs.where(function(navdata) { 
     return navdata && navdata.demo && navdata.demo.altitudeMeters;})
  .select(function(navdata) { 
     return navdata.demo.altitudeMeters;})
  .subscribe(function (x) {
     console.log(x);
  });
```

### TODO
* Tests
* Much more 

## OnError and OnCompleted
This should map fairly well from rx to streams.
End is forwarded in streams, and can be mapped to onCompleted
Errors aren't really forwarded. Must possibly be handled manually by listening to error events and then doing whatever
error handling you want to do, including calling onError...?

## Cold vs hot observables
Hot observables can't be paused. They can be deferred somehow, but not sure if that helps or not, not sure what the defer function does, I've just heard about it. Should at least consider pausing/unsubscribing temporarily from cold observables if downstream buffers are full. Need a deeper understnading of the cold vs. hot stuff.

## IObserver
IObserver interface:

OnCompleted
OnError
OnNext

Calls the IOBservable's subscribe function with 
## IObservable
Subscribe (returns IDisposable): Notifies the provider that an observer is to recieve notifications. 
