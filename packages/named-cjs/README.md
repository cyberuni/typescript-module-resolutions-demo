# CommonJS with named export subject package

This is a subject package distributing:

```json
{
  "main": "./commonjs/index.js",
  "types": "./commonjs/index.d.ts"
}
```

It is written in TypeScript and transpiled to `CommonJS` using `tsc`.

It exports a simple `greet()` function.

Key characteristics:

- `export.greet = greet`
- with `__esModule` flag
- `export greet` in the typings

## Example in the wild

- [make-error-cause@2](https://github.com/blakeembrey/make-error-cause)
