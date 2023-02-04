# ESM - CommonJS subject package

This is a subject package distributing:

```json
{
  "type": "module",
  "exports": {
    "types": "./node16/index.d.ts",
    "import": "./node16/index.js"
  },
  "main": "./commonjs/index.js",
  "types": "./commonjs/index.d.ts"
}
```

It is written in TypeScript and transpiled by `tsc`.

It contains a simple `greet()` function in the default export.

Key characteristics:

- Compliant with Node.js ESM specification
- `export default greet` in the typings

Examples of actual packages in the wild:

- [chalk@6](https://github.com/chalk/ansi-styles)
