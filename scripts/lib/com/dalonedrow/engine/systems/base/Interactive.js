function Interactive() {
	var instance;
};
Interactive.prototype.constructor = Interactive;
Interactive.getInstance = function() {
	return instance;
}
Interactive.setInstance = function(i) {
	instance = i;
}