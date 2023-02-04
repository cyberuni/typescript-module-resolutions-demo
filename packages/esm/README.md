# ESM subject package

This is a subject package that distributes in `Node*` (in the `exports` field).

There are 2 variances of `Node*`: `Node16`, and `NodeNext`:

- `Node16` supports Node.js ESM introduced in [v16](https://nodejs.org/docs/latest-v16.x/api/packages.html#type)
- `NodeNext` supports the latest Node.js ESM. Currently identical to `Node16`

Since `NodeNext` is a moving target,
most library should use `Node16` to ensure consistency.

Currently, this repository exposes `Node16` as a representative.

Since this package is used for testing ESM only,
it does not specify the `main` field.

It is written in TypeScript and transpiled by `tsc`.

It contains a simple `greet()` function in the default export.

Key characteristics:

- Compliant with Node.js ESM specification
- `export default greet` in the typings

Examples of actual packages in the wild:

- [ansi-styles@6](https://github.com/chalk/ansi-styles)
