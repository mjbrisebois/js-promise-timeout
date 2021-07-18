[back to README.md](../README.md)

# API Reference

### Module exports
```javascript
{
    PromiseTimeout,
    TimeoutError,
}
```

## `bindNative()`
Attempts to define `timeout` on the native `Promise` properties.  Returns the module exports so that
this can be called on the same line as `require`.

Example
```javascript
const { PromiseTimeout } = require('@whi/promise-timeout').bindNative();
```

## `new PromiseTimeout( executor, timeout = 1000, error_context )`
Create a Promise that will trigger a timeout rejection if it is not settled within the timeout
window.

Example usage
```javascript
await new PromiseTimeout( (f,r) => {
    f( true );
}, 100 );
// true

await new PromiseTimeout( (f,r) => {
}, 100 );
// throw TimeoutError("Failed to settle promise within 0.1 second(s)")
```

Example usage with custom error context
```javascript
await new PromiseTimeout( (f,r) => {
}, 100, "do something" );
// throw TimeoutError("Failed to do something within 0.1 second(s)")
```


## `Promise.timeout( promise, timeout, error_context )`
Schedule a timeout trigger on an existing Promise object.

Example usage
```javascript
await Promise.timeout(
    new Promise((f,r) => {
        f( true );
    }),
    100
);
// true

await Promise.timeout(
    new Promise((f,r) => {
    }),
    100
);
// throw TimeoutError("Failed to settle promise within 0.1 second(s)")
```
