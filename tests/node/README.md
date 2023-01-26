## Test Configuration

```js
{
  "compilerOptions": {
    "allowSyntheticDefaultImports": false,
    "esModuleInterop": false,
    "moduleResolution": "Node"
  }
}
```

This is the very basic configuration for TypeScript when it comes to `module` and `moduleResolution`.

It is served as the baseline for other configurations.

Configurations like `allowSyntheticDefaultImports` and `esModuleInterop` were added later,
trying to solve some of the problem seen here.

## Test Results

[4.9.4](./test-result.4.9.4.md)

[5.0.0-dev.20230103](./test-result.5.0.0-dev.20230103.md)

- `module: CommonJS` working for TypeScript projects compiled to CJS.
  - `param-case` uses `export =` syntax requires `esModuleInterop`\
  - ❌ The `import paramCase from` compiles but the runtime fails?
- ❌ `ES*` compiled success on `cjs` and `es-cjs` but runtime error
- ❌ `module: Node*` compiled to CJS incorrectly
