// Takes an observable and returns a node-js objectstream
// Can subscribe to the objectstream with the _transform
// as the last call 
var stream = require('stream');

ObjectStream.prototype = Object.create(stream.Transform.prototype, {
  constructor: { value: ObjectStream }
});

function ObjectStream(obs, rxFunction) {
  // Throw if not observables etc, simple checking on type
  var self = this;
  stream.Transform.call(this, {objectMode: true}); 
  var transformedObs = rxFunction.call(obs);
  transformedObs.subscribe(function (x) {
      self._transform(chunk);
  });
}

ObjectStream.prototype._transform = function(chunk, encoding, done) {
  this.push(chunk);
};

module.exports = ObjectStream;

