// This turns an EventEmitter into an observable
// Used in this demo to make observable sequences for demodata
var rx = require('rx');
var toObservable = function(eventName) {
    if (!eventName) { var eventName = 'data';}
    var parent = this;
    return rx.Observable.create(function(observer) {
        var handler = function(o) {
            observer.onNext(o);
        };
        setTimeout(function () { observer.onCompleted();}, 1000);
        parent.addListener(eventName, handler);
        // The disposable function
        return function() {
            parent.removeListener(eventName, handler);
        };
    });
};
module.exports = toObservable;
