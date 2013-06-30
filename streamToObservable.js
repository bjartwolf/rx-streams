// Takes a node-stream in objectmode and returns an Observable
// Stream should be writable so you can pipe to it
// Should take a writable stream as input
var rx = require('rx');
var streams = require('stream');
var toObservable = function(stream) {
	// throw or something if not input is readable object stream
	var self = this;
    var throughStream = new streams.PassThrough({objectMode: true});
	return rx.Observable.create(function(observer) {
		var handler = function () {
			observer.onNext(throughStream.read());// object stream should only emit single object
		};
		throughStream.addListener('readable', handler);
        stream.pipe(throughStream);
		return function() {
			throughStream.removeListener('readable', handler);
            stream.unpipe(throughStream);
		};
	});
};
module.exports = toObservable;
