/*
  Takes a node-stream in objectmode and returns an Observable
  Should take a readble stream in objectmode as input
  Seems to be simplest when making a dummy throughstream, using
  the pipe interface takes care of stuff I don't want to implement myself
*/

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
        var errorHandler = function (err) {
            observer.onError(err); // Assuming errorevent has error parameter
        };
        var endHandler = function () {
            observer.onCompleted();
        };
        throughStream.addListener('readable', handler);
        throughStream.addListener('error', errorHandler);
        throughStream.addListener('end', endHandler);
        stream.pipe(throughStream);
        return function() {
            // This is the dispose function, should clean up
            throughStream.removeListener('readable', handler);
            throughStream.removeListener('error', errorHandler);
            throughStream.removeListener('end', endHandler);
            stream.unpipe(throughStream);
        };
    });
};
module.exports = StreamToObservable;
