import { Logger }			from '@whi/weblogger';
const log				= new Logger("test-basic", process.env.LOG_LEVEL );

import { expect }			from 'chai';
import {
    PromiseTimeout,
    bindNative,
}					from '../../src/index.js';
bindNative();


function basic_tests () {
    it("should resolve before timeout", async () => {
	await new PromiseTimeout( (f,r) => {
	    f();
	}, 100 );
    });

    it("should timeout before resolve", async () => {
	let failed			= false;
	try {
	    await new PromiseTimeout( (f,r) => {
	    }, 10 );
	} catch (err) {
	    failed			= true;

	    expect( err			).to.be.a("TimeoutError");
	    expect( String(err)		).to.have.string("Failed to settle promise within 0.01 second(s)");
	}
	expect( failed			).to.be.true;
    });

    it("should timeout using native binding", async () => {
	let failed			= false;
	try {
	    await Promise.timeout(
		new Promise((f,r) => {
		}),
		10
	    );
	} catch (err) {
	    failed			= true;

	    expect( err			).to.be.a("TimeoutError");
	    expect( String(err)		).to.have.string("Failed to settle promise within 0.01 second(s)");
	}
	expect( failed			).to.be.true;
    });

    it("should resolve before timeout using native binding", async () => {
	await Promise.timeout(
	    new Promise((f,r) => {
		f();
	    }),
	    100
	);
    });

    it("should customize timeout error message", async () => {
	let failed			= false;
	try {
	    await new PromiseTimeout( (f,r) => {
	    }, 10, "get something" );
	} catch (err) {
	    failed			= true;

	    expect( err			).to.be.a("TimeoutError");
	    expect( String(err)		).to.have.string("Failed to get something within 0.01 second(s)");
	}
	expect( failed			).to.be.true;
    });
}

describe("Promise.timeout", () => {

    describe("Basic", basic_tests );
});
