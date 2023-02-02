## Test Configuration

```js
{
  "compilerOptions": {
    "allowSyntheticDefaultImports": true,
    "moduleResolution": "Node"
  }
}
```

[`allowSyntheticDefaultImports`](https://www.typescriptlang.org/tsconfig/#allowSyntheticDefaultImports) allows

## Test Results

[5.0.0-dev.20230103](./test-result.5.0.0-dev.20230103.md)

- `module: CommonJS` works on basic cases
  - ❌ but failed with `export =` in `param-case` and there is no workable solution
  - ❌ `declare module` only work correctly with `* as`. But other cases pass incorrectly.
- ❌ `module: ES*` is the opposite of `CommonJS` for `declare module`.
  `* as` doesn't work but the other two works.
- ❌ `assertron`/`cjs`/`es-cjs` fails at runtime. Which is the majority case (that's why `esModuleInterop` is needed)
- ❌ `module: Node*` compiled to CJS incorrectly
