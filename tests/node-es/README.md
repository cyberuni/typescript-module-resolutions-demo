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
This is typically the setting to use for when you want to produce a `CommonJS` package.

## Test Results

[4.9.4](./test-result.4.9.4.md)

[5.0.0-dev.20230103](./test-result.5.0.0-dev.20230103.md)

- `module: CommonJS` works on most cases.
  The `import * as` for `param-case` error is fine,\
  as it correctly points out that is not a supported usage.
- ❌ `module: ES*` fails with CJS is suprising.\
  🚧 Will need to do more investigation.
- ❌ `module: Node*` compiled to CJS incorrectly.\
  We can argue that this is not a supported case,\
  which if you are planning to distribute your code as `Node*`,\
  you probably should use `moduleResolution: Node16|NodeNext`.\
  But since the result is incorrect,\
  TypeScript should prohibit such config and fail the compilation instead.
