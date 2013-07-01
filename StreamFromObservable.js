/*
  Takes an observable and returns a node-js objectstream
  Can subscribe to the objectstream with the _transform
  as the last call 
  Should call rx dispose on unpipe
*/
var stream = require('stream');

ObjectStream.prototype = Object.create(stream.Readable.prototype, {
  constructor: { value: ObjectStream }
});

function ObjectStream(obs) {
  if((typeof obs._subscribe) !== "function") {
    throw new Error("Must be an rx observable");
  };
  var self = this;
  stream.Readable.call(this, {objectMode: true}); 
  // The stream is the observer
  // And should implement the IObserver interface (should have an onError, onNext and onCompleted)
  var subscription = obs.subscribe(self);
  self.onNext = function (x) {
    self.push(x);
  };
  // Not sure if errors should be propagated into streams.
  self.onError = function (err) { 
    self.emit('error', err);
  };
  self.onCompleted = function () { 
    self.emit('end');
    subscription.dispose()
  };
  // Need to somehow keep the subscription to be able to dispose it, for know tying it to onCompleted
  // Maybe tie it to unpipe or something also or instead?
  // Then, when something unpipes, it could call the dispose function and dismiss the subscription
}

ObjectStream.prototype._read = function(chunk, encoding, done) {
// do nothing when trying to read from underlying source
// rx observables are pushed based 
// However, cold observables might be pull based (not sure yet) and could possibly go into here
};

module.exports = ObjectStream;
