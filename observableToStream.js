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
  obs.subscribe(function (x) {
      self.push(x);
  });
}

ObjectStream.prototype._read = function(chunk, encoding, done) {
// do nothing when trying to read from underlying source
// rx observables are pushed based 
};

module.exports = ObjectStream;

