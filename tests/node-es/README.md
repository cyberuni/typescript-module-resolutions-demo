## Test Configuration

```js
{
  "compilerOptions": {
    "esModuleInterop": true,
    "moduleResolution": "Node"
  }
}
```

The `esModuleInterop` tries to solve the very problem about `export =` and `export default`.

## Test Results

[5.0.0-dev.20230103](./test-result.5.0.0-dev.20230103.md)

- `module: CommonJS` works on most cases.
  This is expected as that is the majority case for many years.
  - for `* as assert` case, while `esModuleInterop` tries to solve that problem,
    and the consumer should use the other forms. The compiler passing it is a bug IMO.
- ❌ `module: ES*` fails with CJS is suprising, and if the test is correct, it's disturbing.
- ❌ `module: Node*` compiled to CJS incorrectly
