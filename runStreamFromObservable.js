var StreamFromObservable = require('./StreamFromObservable');
var rx = require('rx');
var obsDrone = require('./droneTestdataObservable.js');
var testStream = new StreamFromObservable(obsDrone);
var Serializer = require('./serializer'); 
testStream.pipe(new Serializer()).pipe(process.stdout);
