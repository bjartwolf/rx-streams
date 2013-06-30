// Takes a node-stream in objectmode and returns an Observable
// Stream should be writable so you can pipe to it
// Should take a writable stream as input
// Seems to be simplest when making a dummy throughstream, using
// the pipe interface takes care of stuff I don't want to implement myself

var rx = require('rx');
var streams = require('stream');
var StreamToObservable = function(stream) {
    if (!stream._readableState.objectMode){
        throw new Error("Stream should be in object mode");
    };
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
module.exports = StreamToObservable;
