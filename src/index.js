
const { TimeoutError }			= require('./errors.js');


class PromiseTimeout { // extends Promise

    constructor ( executor, timeout = 1000, error_context = undefined ) {
	// Create the Timeout Error now to preserve the original stack trace
	const to_err			= new TimeoutError( timeout, error_context );

	return new Promise( ( resolve, reject ) => {
	    const toid			= setTimeout( () => {
		reject( to_err );
	    }, timeout );

	    executor(
		value => {
		    clearTimeout( toid );
		    resolve( value );
		},
		error => {
		    clearTimeout( toid );
		    reject( error );
		},
	    );
	});
    }
}


let base_exports = {
    PromiseTimeout,
    TimeoutError,
};

module.exports = {
    bindNative() {
	if ( Promise.timeout !== undefined )
	    throw new Error(`Promise.timeout is already defined as type: ${typeof Promise.timeout}`);

	Object.defineProperty(Promise, "timeout", {
	    "value": ( promise, timeout, error_context ) => {
		if ( !promise || typeof promise.then !== "function" )
		    throw new TypeError(`Promise.timeout exepects a Promise object; not typeof ${typeof promise}`);

		return new PromiseTimeout( promise.then.bind( promise ), timeout, error_context );
	    },
	    "writable": false,
	});

	return base_exports;
    },
    ...base_exports
};
