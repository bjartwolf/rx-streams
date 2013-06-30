var StreamToObservable= require('./streamToObservable');
var rx = require('rx');
var droneStream = require('./droneTestdataStream.js');

var testObs = new StreamToObservable(droneStream);
var Serializer = require('./serializer'); 
//droneStream.pipe(new Serializer()).pipe(process.stdout);
testObs.where(function(navdata) { 
     return navdata && navdata.demo && navdata.demo.altitudeMeters;})
  .select(function(navdata) { 
     return navdata.demo.altitudeMeters;})
  .subscribe(function (x) {
     console.log(x);
  });
