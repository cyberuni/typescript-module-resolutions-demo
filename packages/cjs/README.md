# CommonJS subject package

This is a subject package that distributes in `CommonJS`.

It is written in TypeScript and transpiled to `CommonJS` using `tsc`.

It contains a simple `greet()` function in the default export.

As it is transpiled by `tsc` to `CommonJS`:

- `export.default = greet`
- with `__esModule` flag
- `export default greet` in the typings

## Example in the wild

