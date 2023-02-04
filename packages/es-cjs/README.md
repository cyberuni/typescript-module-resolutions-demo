# ES* - CommonJS subject package

This is a subject package that distributes in `CommonJS` (in the `main` field),
and `ES*` (in the `module` field).

For simplicity, the `jsnext:main` field is not specified as [it is superseded by the `module` field](https://github.com/jsforum/jsforum/issues/5#issue-113078483).

Since it distributes both in `main` and `module`,
make sure you use `module` over `main` if you want to consume the `module` variant.

For example, in `webpack`:

```js
export default {
  resolve: {
    // `module` before `main`
    mainFields: ['module', 'main']
  }
}
```

There are 4 variance of `ES*`: `ES2015`, `ES02020`, `ES02022`, and `ESNext`.

They should be mostly identical,
so currently we have this single repository exposing `ES2015` as a representative.

If we discover that there are variance between them, we can create move subject packages based on this.

It is written in TypeScript and transpiled by `tsc`.

It contains a simple `greet()` function in the default export.

As it is transpiled by `tsc` to `ES*`:

- `export.default = greet`
- with `__esModule` flag
- `export default greet` in the typings
