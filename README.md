[![](https://img.shields.io/npm/v/@whi/promise-timeout/latest?style=flat-square)](http://npmjs.com/package/@whi/promise-timeout)

# `new PromiseTimeout( executor, timeout )`
This micro-package is intended to help with scheduling timeout rejection on a Promise.

[![](https://img.shields.io/github/issues-raw/mjbrisebois/js-promise-timeout?style=flat-square)](https://github.com/mjbrisebois/js-promise-timeout/issues)
[![](https://img.shields.io/github/issues-closed-raw/mjbrisebois/js-promise-timeout?style=flat-square)](https://github.com/mjbrisebois/js-promise-timeout/issues?q=is%3Aissue+is%3Aclosed)
[![](https://img.shields.io/github/issues-pr-raw/mjbrisebois/js-promise-timeout?style=flat-square)](https://github.com/mjbrisebois/js-promise-timeout/pulls)


## Overview


## Install

```bash
npm i @whi/promise-timeout
```

## Usage

```javascript
const { PromiseTimeout } = require('@whi/promise-timeout');

await new PromiseTimeout( (f,r) => {
}, 1000 );
// throw TimeoutError
```

Optionally, attach `timeout` to the native `Promise` as a method so that you can add timeouts to
existing Promises.

```javascript
require('@whi/promise-timeout').bindNative();

await Promise.timeout(
    new Promise( () => null ), // Promise that will never settle
    1000,
);
// throw TimeoutError
```

### API Reference

See [docs/API.md](docs/API.md)

### Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)
