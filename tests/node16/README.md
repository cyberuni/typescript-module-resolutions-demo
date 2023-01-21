## Test Configuration

```js
{
  "compilerOptions": {
    "allowSyntheticDefaultImports": false,
    "esModuleInterop": false,
    "moduleResolution": "Node16"
  }
}
```

This is the configuration for creating Node.js ESM package.

Note that the package must supply the `require` field when exposing dual ESM/CommonJS.
i.e.:

```json
{
  "type": "module",
  "exports": {
    "import": "./dist/index.mjs",
    "require": "./dist/index.js",
  }
}
```

Package only supplying `main` field does not work:

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

This is required by Node.js

## Test Results

[5.0.0-dev.20230103](./test-result.5.0.0-dev.20230103.md)

- `module: CommonJS` can only work with package with `exports: { require: ... }`???
  - ❌ Does not work with dual package that does not have `exports.require` field (`ava` issue?)
  - 🔍 Unable to import CJS directly is a huge barrier for ESM adoption.
- `module: ES*`
  - ❌ Does not support `declare module` with `export =`.
  - 💡 `import * as` should be avoided. Most cases failed with `TS2339`.
  - 🔍 `skipLibCheck` is needed to avoid transient `TS1259` error.\
    For importing CJS package with CJS dependency.\
    TypeScript may investigate about on improving this, or wait for all CJS code to die.
- `module: Node*`
  - 💡 `import * as` should be avoided. Specific case failed with `TS2339`.
  - 🔍 `skipLibCheck` is needed to avoid transient `TS1259` error.\
    For importing CJS package with CJS dependency.\
    TypeScript may investigate about on improving this, or wait for all CJS code to die.
