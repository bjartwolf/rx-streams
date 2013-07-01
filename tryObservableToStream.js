var ObservableToStream = require('./observableToStream');
var rx = require('rx');
var obsDrone = require('./droneTestdataObservable.js');

var testStream = new ObservableToStream(obsDrone);
var Serializer = require('./serializer'); 
testStream.pipe(new Serializer()).pipe(process.stdout);
setTimeout(function () { testStream.dispose();}, 1000);
