var FFInteractive = (function () {
	Interactive.call(this);
	this.setInstance(this);
	FFInteractive.prototype = Object.create(Interactive.prototype);
	FFInteractive.prototype.constructor = FFInteractive;
})();