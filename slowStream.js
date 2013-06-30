var stream = require('stream');

SlowStream.prototype = Object.create(stream.Transform.prototype, {
  constructor: { value: SlowStream }
});

function SlowStream(rxFunction) {
  this.rxFunction = rxFunction;// consider adding default identity
  stream.Transform.call(this, {objectMode: true}); 
 
}

SlowStream.prototype._transform = function(chunk, encoding, done) {
  this.push(chunk);
  done();
};

module.exports = SlowStream;

