var ObservableFromStream= require('./ObservableFromStream');
var rx = require('rx');
var droneStream = require('./droneTestdataStream.js');
var testObs = new ObservableFromStream(droneStream);
var Serializer = require('./serializer'); 
var serializer = new Serializer();
droneStream.pipe(serializer).pipe(process.stdout);
//Errors are caught on pipes. Not trivial to figure out how to propagate errors
//Nodejs does not propagate errors in streams
//setTimeout(function () {droneStream.emit('error', new Error("shit an error"));}, 1000);
//droneStream.on('error', function (err) { console.log(err);});
setTimeout(function () { droneStream.emit('end');}, 1500);
var altitudeObs = testObs.where(function(navdata) { 
     return navdata && navdata.demo && navdata.demo.altitudeMeters;})
  .select(function(navdata) { 
     return navdata.demo.altitudeMeters;});
var subscription = altitudeObs.subscribe(function (x) {
     console.log(x);
   });

// Unpiping the serializer
setTimeout(function () {
    droneStream.unpipe(serializer);
    console.log("PIPECOUNT: " + droneStream._readableState.pipesCount);
    }, 1000);
// Dismissing subscription 
setTimeout(function () {
    subscription.dispose();
    console.log("PIPECOUNT: " + droneStream._readableState.pipesCount);
    }, 2000);
