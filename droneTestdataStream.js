var events = require('events');
var drone = new events.EventEmitter();
altitude = 0;
var interval = setInterval(function () { altitude += 0.08; drone.emit('navdata', {demo: {altitudeMeters: altitude}});} , 100);
setTimeout(function () { clearInterval(interval);}, 3000);
var stream = require('stream');

var navDataStream = new stream.Readable(
  {objectMode: true}); 

navDataStream._read = function () {};

drone.on('navdata', function (chunk) {
  navDataStream.push(chunk);
});

module.exports = navDataStream;
