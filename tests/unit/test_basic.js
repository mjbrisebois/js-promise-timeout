const path				= require('path');
const log				= require('@whi/stdlog')(path.basename( __filename ), {
    level: process.env.LOG_LEVEL || 'fatal',
});

const expect				= require('chai').expect;
const { PromiseTimeout }		= require('../../src/index.js').bindNative();


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

    it("should resolve with async executor", async () => {
	await new PromiseTimeout( async () => {
	    await new Promise(f => setTimeout(f, 100));
	    return true;
	});
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
