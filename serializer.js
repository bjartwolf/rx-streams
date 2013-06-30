// Stringifies a JSON stream
// var Serializer = require('./serializer') 
// jsonObjectsExampleStream.pipe(new Serializer()).pipe(...
// Remember to create a new stream for each serializer, they can't
// be shared

var stream = require('stream');

serializer.prototype = Object.create(stream.Transform.prototype, {
  constructor: { value: serializer}
});

function serializer() {
   stream.Transform.call(this, {objectMode: true}); 
}

serializer.prototype._transform = function(chunk, enc, done) { 
   this.push(JSON.stringify(chunk)); 
   done();
};
module.exports = serializer; 
