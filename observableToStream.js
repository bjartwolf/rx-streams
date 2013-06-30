// Takes an observable and returns a node-js objectstream
// Can subscribe to the objectstream with the _transform
// as the last call 
// Should call rx dispose on unpipe
var stream = require('stream');

ObjectStream.prototype = Object.create(stream.Readable.prototype, {
  constructor: { value: ObjectStream }
});

function ObjectStream(obs, rxFunction) {
  // Throw if not observables etc, simple checking on type
  var self = this;
  stream.Readable.call(this, {objectMode: true}); 
  var transformedObs = rxFunction.call(this, obs);
  transformedObs.subscribe(function (x) {
      self.push(x);
  });
}

ObjectStream.prototype._read = function(chunk, encoding, done) {
};

module.exports = ObjectStream;

