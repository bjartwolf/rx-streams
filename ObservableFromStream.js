/*
  Takes a node-stream in objectmode and returns an Observable
  Seems to be simplest to achieve this by making a dummy throughstream
  because pipe takes care of things
*/

var rx = require('rx');
var streams = require('stream');
var ObservableFromStream = function(stream) {
    if (!stream._readableState.objectMode){
        throw new Error("Stream should be in object mode");
    };
    var self = this;
    var throughStream = new streams.PassThrough({objectMode: true});
    return rx.Observable.create(function(observer) {
        var readHandler = function () {
            // Object streams emit single object at a time when calling read
            observer.onNext(throughStream.read());
        };
        var errorHandler = function (err) {
            // Assuming errorevent has error parameter
            observer.onError(err); 
        };
        var endHandler = function () {
            observer.onCompleted();
        };
        throughStream.addListener('readable', readHandler);
        throughStream.addListener('error', errorHandler);
        throughStream.addListener('end', endHandler);
        stream.pipe(throughStream);
        // Create returns the dispose-function for the Observable 
        return function() {
            throughStream.removeListener('readable', readHandler);
            throughStream.removeListener('error', errorHandler);
            throughStream.removeListener('end', endHandler);
            stream.unpipe(throughStream);
        };
    });
};
module.exports = ObservableFromStream;
