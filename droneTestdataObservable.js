var events = require('events');
var toObservable = require('./toObservable');
var drone = new events.EventEmitter();
altitude = 0;
setInterval(function () { altitude += 0.08; drone.emit('navdata', {demo: {altitudeMeters: altitude}});} , 100);

var obsDrone = toObservable.call(drone, 'navdata');
module.exports = obsDrone;
