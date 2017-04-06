function StackedEvent() {
	Hashcode.call(this);
	/** the event name. */
	var eventname = null;
	/** flag indicating whether the event still exists. */
	var exist = false;
	/** the IO associated with the event. */
	var io = null;
	/** the event message. */
	var msg = 0;
	/** the event parameters. */
	var params = null;
	/** the event sender. */
	var sender = null;
	/**
	 * Gets the flag indicating whether the event still exists.
	 * @return <code>boolean</code>
	 */
	this.exists = function() {
		return exist;
	}
	/**
	 * Gets the event name.
	 * @return {@link String}
	 */
	this.getEventname = function() {
		return eventname;
	}
	/**
	 * Gets the IO associated with the event.
	 * @return {@link IO}
	 */
	this.getIo = function() {
		return io;
	}
	/**
	 * Gets the event message.
	 * @return {@link int}
	 */
	this.getMsg = function() {
		return msg;
	}
	/**
	 * Gets the event parameters.
	 * @return {@link Object}[]
	 */
	this.getParams = function() {
		return params;
	}
	/**
	 * Gets the event sender.
	 * @return {@link IO}
	 */
	this.getSender = function() {
		return sender;
	}
	/**
	 * Sets the event name.
	 * @param val the eventname to set
	 */
	this.setEventname = function(val) {
		eventname = val;
	}
	/**
	 * Sets the flag indicating whether the event still exists.
	 * @param val the exist to set
	 */
	this.setExist = function(val) {
		exist = val;
	}
	/**
	 * Sets the IO associated with the event.
	 * @param val the io to set
	 */
	this.setIo = function(val) {
		io = val;
	}
	/**
	 * Sets the event message.
	 * @param val the msg to set
	 */
	this.setMsg = function(val) {
		msg = val;
	}
	/**
	 * Sets the event parameters.
	 * @param val the params to set
	 */
	this.setParams = function(val) {
		params = val;
	}
	/**
	 * Sets the event sender.
	 * @param val the sender to set
	 */
	this.setSender = function(val) {
		sender = val;
	}
}
StackedEvent.prototype = Object.create(Hashcode.prototype);
