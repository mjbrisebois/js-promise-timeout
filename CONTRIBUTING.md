[back to README.md](README.md)

# Contributing

## Overview
This is a micro-package designed to be light-weight and provide a simple timeout interface that is
compatibile with the native Promise (async/await) architecture.


## Development

See [docs/API.md](docs/API.md) for detailed API References

### Environment

- Developed using Node.js `v14.17.3`

### Building
No build required.  Vanilla JS only.

### Testing

To run all tests with logging
```
make test-debug
```

- `make test-unit-debug` - **Unit tests only**
- `make test-integration-debug` - **Integration tests only**

> **NOTE:** remove `-debug` to run tests without logging
