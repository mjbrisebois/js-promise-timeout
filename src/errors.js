
class TimeoutError extends Error {
    [Symbol.toStringTag]		= "TimeoutError";

    constructor( timeout, context = "settle promise" ) {
	super(`Failed to ${context} within ${timeout/1000} second(s)`);

	if (Error.captureStackTrace) {
	    Error.captureStackTrace(this, this.constructor);
	}

	this.name			= this.constructor.name;
    }

    toString () {
	return `[${this.constructor.name}( ${this.message} )]`;
    }

    toJSON () {
	return {
	    "error":	this.name,
	    "message":	this.message,
	    "stack":	this.stack.split("\n"),
	};
    }
}


module.exports = {
    TimeoutError,
};
