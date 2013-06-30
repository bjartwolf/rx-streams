// Takes a node-stream in objectmode and returns an Observable
// Stream should be writable so you can pipe to it
// Should take a writable stream as input
var rx = require('rx');
var toObservable = function(stream) {
	// throw or something if not input is readable object stream
	var parent = this;
	return rx.Observable.create(function(observer) {
		var handler = function () {
			observer.onNext(stream.read());// object stream should only emit single object
		};
		stream.addListener('readable', handler);
		// should do some unpipe or something maybe... Not thought of this yet
		return function() {
			parent.removeListener(eventName, handler);
		};
	});
};
module.exports = toObservable;
