var rx = require('rx');
var toObservable = function(eventName) {
    if (!eventName) { var eventName = 'data';}
	var parent = this;
	return rx.Observable.create(function(observer) {
		var handler = function(o) {
			observer.onNext(o);
		};
		parent.addListener(eventName, handler);
		return function() {
			parent.removeListener(eventName, handler);
		};
	});
};
module.exports = toObservable;
