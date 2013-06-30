var StreamToObservable= require('./streamToObservable');
var rx = require('rx');
var droneStream = require('./droneTestdataStream.js');
var testObs = new StreamToObservable(droneStream);
var Serializer = require('./serializer'); 
var serializer = new Serializer();
droneStream.pipe(serializer).pipe(process.stdout);

var altitudeObs = testObs.where(function(navdata) { 
     return navdata && navdata.demo && navdata.demo.altitudeMeters;})
  .select(function(navdata) { 
     return navdata.demo.altitudeMeters;});
var subscription = altitudeObs.subscribe(function (x) {
     console.log(x);
  });

// Unpiping the serializer
setTimeout(function () {serializer.unpipe();}, 1000);
// Dismissing subscription 
setTimeout(function () {subscription.dispose();}, 2000);
