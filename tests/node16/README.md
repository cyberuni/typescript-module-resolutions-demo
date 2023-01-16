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

This is the configuration for creating ESM package.

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

## Test Subjects

Depends on the test configuration, the way to consume a module are different.

In this section we describe each module and how they are consumed within this configuration.

## [assert](../../README.md#assert)

```ts
import { default as assert } from 'assert'
import assert from 'assert'
assert(true)

import * as assert from 'assert'
assert.default(true)
```

## [assertron@7](../../README.md#assertron7)

```ts
import { default as assertron } from 'assertron'
import assertron from 'assertron'
assertron.default.truthy(1)

import * as assertron from 'assertron'
assertron.default.default.truthy(1) // what!?
```

## [param-case@1](../../README.md#param-case1)

```ts
// export =
import { default as paramCase } from 'param-case'
import paramCase from 'param-case'
paramCase('hello world')

import * as paramCase from 'param-case'
paramCase.default('hello world')
```

## [cjs](../../README.md#cjs)

```ts
import { default as m } from 'cjs'
import m from 'cjs'
m.default(1)

import * as m from 'cjs'
m.default.default(1)
```

## [es-cjs](../../README.md#es-cjs)

```ts
import { default as m } from 'es-cjs'
import m from 'es-cjs'
m.default(1)

import * as m from 'es-cjs'
m.default.default(1)
```

## [esm-cjs](../../README.md#esm-cjs)

```ts
import { default as m } from 'esm-cjs'
import m from 'esm-cjs'
m(1)

import * as m from 'esm-cjs'
m.default(1)
```

## [esm](../../README.md#esm)

```ts
import { default as m } from 'esm'
import m from 'esm'
m(1)

import * as m from 'esm'
m.default(1)
```

## Legends

- 🟢: both compile and runtime are working correctly
- 🟡: for compile, it means there is an error, but can be suppressed (e.g. with `skipLibCheck`)\
  for runtime, it means the compile fails, but runtime is working
- 🔴: fails
- ❌: compile success, but runtime fails. Potentially a TypeScript bug.
- ➖: invalid usage in this test configuration

Import Syntax:

- `default`: `import m from 'm'`
- `default as`: `import { default as m } from 'm'`
- `* as`: `import * as m from 'm'`

## Test Result

| module   | Package    | Type      | import: default as   | import: default      | import: * as                |
| -------- | ---------- | --------- | -------------------- | -------------------- | --------------------------- |
| CommonJS | assert     | 💻 Compile | 🔴 TS1259-e           | 🔴 TS1259-e           | 🔴 TS2339                    |
|          |            | 🏃 Runtime | 🔴                    | 🔴                    | 🔴                           |
|          | assertron  | 💻 Compile | 🟡 TS1259-te TS1479-t | 🟡 TS1259-te TS1479-t | 🔴 TS1259-te TS1479 TS2339   |
|          |            | 🏃 Runtime | 🔴                    | 🔴                    | 🔴                           |
|          | param-case | 💻 Compile | 🟢                    | 🟢                    | 🔴 TS2497-e TS2339           |
|          |            | 🏃 Runtime | 🔴                    | 🔴                    | 🔴                           |
|          | cjs        | 💻 Compile | 🟢                    | 🟢                    | 🔴 TS2339                    |
|          |            | 🏃 Runtime | 🔴                    | 🔴                    | 🔴                           |
|          | es-cjs     | 💻 Compile | 🟢                    | 🟢                    | 🔴 TS2339                    |
|          |            | 🏃 Runtime | 🔴                    | 🔴                    | 🔴                           |
|          | esm        | 💻 Compile | 🟢                    | 🟢                    | 🟢                           |
|          |            | 🏃 Runtime | 🟢                    | 🟢                    | 🟢                           |
|          | esm-cjs    | 💻 Compile | 🟢                    | 🟢                    | 🟢                           |
|          |            | 🏃 Runtime | 🟢                    | 🟢                    | 🟢                           |
| ES*      | assert     | 💻 Compile | 🔴 TS1259-a           | 🔴 TS1259-a           | 🔴 TS2339                    |
|          |            | 🏃 Runtime | 🟡                    | 🟡                    | 🟡                           |
|          | assertron  | 💻 Compile | 🟡 TS1259-ta TS1479-t | 🟡 TS1259-ta TS1479-t | 🔴 TS1259-ta TS1479-t TS2339 |
|          |            | 🏃 Runtime | 🟡                    | 🟡                    | 🟡                           |
|          | param-case | 💻 Compile | 🟢                    | 🟢                    | 🔴 TS2339 TS2497-a           |
|          |            | 🏃 Runtime | 🟢                    | 🟢                    | 🟡                           |
|          | cjs        | 💻 Compile | 🟢                    | 🟢                    | 🔴 TS2339                    |
|          |            | 🏃 Runtime | 🟢                    | 🟢                    | 🟡                           |
|          | es-cjs     | 💻 Compile | 🟢                    | 🟢                    | 🔴 TS2339                    |
|          |            | 🏃 Runtime | 🟢                    | 🟢                    | 🟡                           |
|          | esm        | 💻 Compile | 🟢                    | 🟢                    | 🟢                           |
|          |            | 🏃 Runtime | 🟢                    | 🟢                    | 🟢                           |
|          | esm-cjs    | 💻 Compile | 🟢                    | 🟢                    | 🟢                           |
|          |            | 🏃 Runtime | 🟢                    | 🟢                    | 🟢                           |
| Node*    | assert     | 💻 Compile | 🟢                    | 🟢                    | 🟢                           |
|          |            | 🏃 Runtime | 🟢                    | 🟢                    | 🟢                           |
|          | assertron  | 💻 Compile | 🟡 TS1479-t           | 🟡 TS1479-t           | 🟡 TS1479-t                  |
|          |            | 🏃 Runtime | 🟡                    | 🟡                    | 🟡                           |
|          | param-case | 💻 Compile | 🟢                    | 🟢                    | 🔴 TS2339 TS2497-a           |
|          |            | 🏃 Runtime | 🟢                    | 🟢                    | 🟡                           |
|          | cjs        | 💻 Compile | 🟢                    | 🟢                    | 🟢                           |
|          |            | 🏃 Runtime | 🟢                    | 🟢                    | 🟢                           |
|          | es-cjs     | 💻 Compile | 🟢                    | 🟢                    | 🟢                           |
|          |            | 🏃 Runtime | 🟢                    | 🟢                    | 🟢                           |
|          | esm        | 💻 Compile | 🟢                    | 🟢                    | 🟢                           |
|          |            | 🏃 Runtime | 🟢                    | 🟢                    | 🟢                           |
|          | esm-cjs    | 💻 Compile | 🟢                    | 🟢                    | 🟢                           |
|          |            | 🏃 Runtime | 🟢                    | 🟢                    | 🟢                           |

- to-cjs: Code are compiled to CJS incorrectly
- TS1259-e: `TS1259: needs esModuleInterop`
- TS1259-a: `TS1259: needs allowSyntheticDefaultImports`
- TS1259-t: (transient) `TS1259: ...node_modules/assertion-error can only be default-imported using the 'allowSyntheticDefaultImports' flag`\
  `export = AssertionError`\
  `This module is declared with 'export =', and can only be used with a default import when using the 'allowSyntheticDefaultImports' flag.`
- TS1259-te: `TS1259: ...node_modules/assertion-error can only be default-imported using the 'esModuleInterop' flag`\
- TS1259-te: `TS1259: ...node_modules/assertion-error can only be default-imported using the 'esModuleInterop' flag`\
- TS1479-t: `TS1479: ...node_modules/satisfier The current file is a CommonJS module whose imports will produce 'require' calls`
- TS2339: `TS2339: Property 'default' does not exist on type`
- TS2497-a: `TS2497: needs allowSyntheticDefaultImports and referencing its default export`
- TS2497-e: `TS2497: needs esModuleInterop and referencing its default export`
- not-fn: `TypeError: not a function`
- ref-err: `ReferenceError: exports is not defined in ES module scope` (due to to-cjs)
- no-exports

## Conclusion

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
