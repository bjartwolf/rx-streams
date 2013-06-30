var ObservableToStream = require('./observableToStream');
var toObservable = require('./toObservable');
var rx = require('rx');
var events = require('events');
var drone = new events.EventEmitter();

altitude = 0;
setInterval(function () { altitude += 0.08; drone.emit('navdata', {demo: {altitudeMeters: altitude}});} , 100);

var obsDrone = toObservable.call(drone, 'navdata');

var rxFunc = function (obs) {
  return obs.where(function(navdata) { return navdata && navdata.demo && navdata.demo.altitudeMeters;})
  .select(function(navdata) { return navdata.demo.altitudeMeters;})
};

var testStream = new ObservableToStream(obsDrone, rxFunc);
var Serializer = require('./serializer'); 
testStream.pipe(new Serializer()).pipe(process.stdout);


