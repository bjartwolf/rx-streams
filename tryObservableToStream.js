var ObservableToStream = require('./observableToStream');
var rx = require('rx');
var obsDrone = require('./droneTestdataObservable.js');

var rxFunc = function (obs) {
  return obs.where(function(navdata) { return navdata && navdata.demo && navdata.demo.altitudeMeters;})
  .select(function(navdata) { return navdata.demo.altitudeMeters;})
};

var testStream = new ObservableToStream(obsDrone, rxFunc);
var Serializer = require('./serializer'); 
testStream.pipe(new Serializer()).pipe(process.stdout);
