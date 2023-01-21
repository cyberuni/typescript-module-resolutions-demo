## Test Configuration

```js
{
  "compilerOptions": {
    "allowSyntheticDefaultImports": ,
    "esModuleInterop": true,
    "moduleResolution": "Node"
  }
}
```

## Test Subjects

Depends on the test configuration, the way to consume a module are different.

In this section we describe each module and how they are consumed within this configuration.

### [assert](../../README.md#assert)

[assert.default-as.all.ts](./ts/assert.default-as.all.ts):

```ts
import { default as assert } from 'assert'

assert(true)

```

[assert.default.all.ts](./ts/assert.default.all.ts):

```ts
import assert from 'assert'

assert(true)

```

[assert.star.all.ts](./ts/assert.star.all.ts):

```ts
import * as assert from 'assert'

assert.default(true)

```

### [assertron](../../README.md#assertron)

[assertron.default-as.all.ts](./ts/assertron.default-as.all.ts):

```ts
import { default as assertron } from 'assertron'

assertron.truthy(true)

```

[assertron.default.all.ts](./ts/assertron.default.all.ts):

```ts
import assertron from 'assertron'

assertron.truthy(true)

```

[assertron.star.all.ts](./ts/assertron.star.all.ts):

```ts
import * as assertron from 'assertron'

assertron.default.truthy(true)

```

### [cjs](../../README.md#cjs)

[cjs.default-as.all.ts](./ts/cjs.default-as.all.ts):

```ts
import { default as m } from 'cjs'

m(1)

```

[cjs.default.all.ts](./ts/cjs.default.all.ts):

```ts
import m from 'cjs'

m(1)

```

[cjs.star.all.ts](./ts/cjs.star.all.ts):

```ts
import * as m from 'cjs'

m.default(1)


```

### [color-map](../../README.md#color-map)

### [es-cjs](../../README.md#es-cjs)

[es-cjs.default-as.all.ts](./ts/es-cjs.default-as.all.ts):

```ts
import { default as m } from 'es-cjs'

m(1)

```

[es-cjs.default.all.ts](./ts/es-cjs.default.all.ts):

```ts
import m from 'es-cjs'

m(1)

```

[es-cjs.star.all.ts](./ts/es-cjs.star.all.ts):

```ts
import * as m from 'es-cjs'

m.default(1)

```

### [esm](../../README.md#esm)

### [esm-cjs](../../README.md#esm-cjs)

[esm-cjs.default-as.all.ts](./ts/esm-cjs.default-as.all.ts):

```ts
import { default as m } from 'esm-cjs'

m(1)

```

[esm-cjs.default.all.ts](./ts/esm-cjs.default.all.ts):

```ts
import m from 'esm-cjs'

m(1)

```

[esm-cjs.star.all.ts](./ts/esm-cjs.star.all.ts):

```ts
import * as m from 'esm-cjs'

m.default(1)

```

### [param-case](../../README.md#param-case)

[param-case.default-as.all.ts](./ts/param-case.default-as.all.ts):

```ts
import { default as paramCase } from 'param-case'

paramCase('hello world')

```

[param-case.default.all.ts](./ts/param-case.default.all.ts):

```ts
import paramCase from 'param-case'

paramCase('hello world')

```

[param-case.star.all.ts](./ts/param-case.star.all.ts):

```ts
import * as paramCase from 'param-case'

paramCase('hello world')

```

## Legends

- 🟢: both compile and runtime are working correctly
- 🟡: for compile, it means there is an error, but can be suppressed (e.g. with `skipLibCheck`)\
  for runtime, it means the compile fails, but runtime is working
- 🔴: compile and/or runtime fails
- ❌: compile success, but runtime fails. Potentially a TypeScript bug.
- ➖: invalid usage in this test configuration

Import Syntax:

- `default as`: `import { default as m } from 'm'`
- `default`: `import m from 'm'`
- `* as`: `import * as m from 'm'`

## Test Results

| module   | Package    | Type      | import: default as | import: default   | import: * as      |
| -------- | ---------- | --------- | ------------------ | ----------------- | ----------------- |
| commonjs | assert     | 💻 compile | 🟢                  | 🟢                 | 🟢                 |
|          |            | 🏃 runtime | 🟢                  | 🟢                 | 🟢                 |
|          | assertron  | 💻 compile | 🟢                  | 🟢                 | 🟢                 |
|          |            | 🏃 runtime | 🟢                  | 🟢                 | 🟢                 |
|          | cjs        | 💻 compile | 🟢                  | 🟢                 | 🟢                 |
|          |            | 🏃 runtime | 🟢                  | 🟢                 | 🟢                 |
|          | color-map  | 💻 compile | ➖                  | ➖                 | ➖                 |
|          |            | 🏃 runtime | ➖                  | ➖                 | ➖                 |
|          | es-cjs     | 💻 compile | 🟢                  | 🟢                 | 🟢                 |
|          |            | 🏃 runtime | 🟢                  | 🟢                 | 🟢                 |
|          | esm        | 💻 compile | ➖                  | ➖                 | ➖                 |
|          |            | 🏃 runtime | ➖                  | ➖                 | ➖                 |
|          | esm-cjs    | 💻 compile | 🟢                  | 🟢                 | 🟢                 |
|          |            | 🏃 runtime | 🟢                  | 🟢                 | 🟢                 |
|          | param-case | 💻 compile | 🟢                  | 🟢                 | 🔴 TS2497-e        |
|          |            | 🏃 runtime | 🟢                  | 🟢                 | 🔴 type-not-fn     |
| es2015   | assert     | 💻 compile | 🟢                  | 🟢                 | 🟢                 |
|          |            | 🏃 runtime | 🟢                  | 🟢                 | 🟢                 |
|          | assertron  | 💻 compile | 🟢                  | 🟢                 | 🟢                 |
|          |            | 🏃 runtime | ❌ type-not-fn-1    | ❌ type-not-fn-1   | ❌ type-not-fn-2   |
|          | cjs        | 💻 compile | 🟢                  | 🟢                 | 🟢                 |
|          |            | 🏃 runtime | ❌ type-not-fn-3    | ❌ type-not-fn-3   | ❌ type-not-fn-4   |
|          | color-map  | 💻 compile | ➖                  | ➖                 | ➖                 |
|          |            | 🏃 runtime | ➖                  | ➖                 | ➖                 |
|          | es-cjs     | 💻 compile | 🟢                  | 🟢                 | 🟢                 |
|          |            | 🏃 runtime | ❌ type-not-fn-3    | ❌ type-not-fn-3   | ❌ type-not-fn-4   |
|          | esm        | 💻 compile | ➖                  | ➖                 | ➖                 |
|          |            | 🏃 runtime | ➖                  | ➖                 | ➖                 |
|          | esm-cjs    | 💻 compile | 🟢                  | 🟢                 | 🟢                 |
|          |            | 🏃 runtime | 🟢                  | 🟢                 | 🟢                 |
|          | param-case | 💻 compile | 🟢                  | 🟢                 | 🔴 TS2497-a        |
|          |            | 🏃 runtime | 🟢                  | 🟢                 | 🔴 type-not-fn     |
| es2020   | assert     | 💻 compile | 🟢                  | 🟢                 | 🟢                 |
|          |            | 🏃 runtime | 🟢                  | 🟢                 | 🟢                 |
|          | assertron  | 💻 compile | 🟢                  | 🟢                 | 🟢                 |
|          |            | 🏃 runtime | ❌ type-not-fn-1    | ❌ type-not-fn-1   | ❌ type-not-fn-2   |
|          | cjs        | 💻 compile | 🟢                  | 🟢                 | 🟢                 |
|          |            | 🏃 runtime | ❌ type-not-fn-3    | ❌ type-not-fn-3   | ❌ type-not-fn-4   |
|          | color-map  | 💻 compile | ➖                  | ➖                 | ➖                 |
|          |            | 🏃 runtime | ➖                  | ➖                 | ➖                 |
|          | es-cjs     | 💻 compile | 🟢                  | 🟢                 | 🟢                 |
|          |            | 🏃 runtime | ❌ type-not-fn-3    | ❌ type-not-fn-3   | ❌ type-not-fn-4   |
|          | esm        | 💻 compile | ➖                  | ➖                 | ➖                 |
|          |            | 🏃 runtime | ➖                  | ➖                 | ➖                 |
|          | esm-cjs    | 💻 compile | 🟢                  | 🟢                 | 🟢                 |
|          |            | 🏃 runtime | 🟢                  | 🟢                 | 🟢                 |
|          | param-case | 💻 compile | 🟢                  | 🟢                 | 🔴 TS2497-a        |
|          |            | 🏃 runtime | 🟢                  | 🟢                 | 🔴 type-not-fn     |
| es2022   | assert     | 💻 compile | 🟢                  | 🟢                 | 🟢                 |
|          |            | 🏃 runtime | 🟢                  | 🟢                 | 🟢                 |
|          | assertron  | 💻 compile | 🟢                  | 🟢                 | 🟢                 |
|          |            | 🏃 runtime | ❌ type-not-fn-1    | ❌ type-not-fn-1   | ❌ type-not-fn-2   |
|          | cjs        | 💻 compile | 🟢                  | 🟢                 | 🟢                 |
|          |            | 🏃 runtime | ❌ type-not-fn-3    | ❌ type-not-fn-3   | ❌ type-not-fn-4   |
|          | color-map  | 💻 compile | ➖                  | ➖                 | ➖                 |
|          |            | 🏃 runtime | ➖                  | ➖                 | ➖                 |
|          | es-cjs     | 💻 compile | 🟢                  | 🟢                 | 🟢                 |
|          |            | 🏃 runtime | ❌ type-not-fn-3    | ❌ type-not-fn-3   | ❌ type-not-fn-4   |
|          | esm        | 💻 compile | ➖                  | ➖                 | ➖                 |
|          |            | 🏃 runtime | ➖                  | ➖                 | ➖                 |
|          | esm-cjs    | 💻 compile | 🟢                  | 🟢                 | 🟢                 |
|          |            | 🏃 runtime | 🟢                  | 🟢                 | 🟢                 |
|          | param-case | 💻 compile | 🟢                  | 🟢                 | 🔴 TS2497-a        |
|          |            | 🏃 runtime | 🟢                  | 🟢                 | 🔴 type-not-fn     |
| esnext   | assert     | 💻 compile | 🟢                  | 🟢                 | 🟢                 |
|          |            | 🏃 runtime | 🟢                  | 🟢                 | 🟢                 |
|          | assertron  | 💻 compile | 🟢                  | 🟢                 | 🟢                 |
|          |            | 🏃 runtime | ❌ type-not-fn-1    | ❌ type-not-fn-1   | ❌ type-not-fn-2   |
|          | cjs        | 💻 compile | 🟢                  | 🟢                 | 🟢                 |
|          |            | 🏃 runtime | ❌ type-not-fn-3    | ❌ type-not-fn-3   | ❌ type-not-fn-4   |
|          | color-map  | 💻 compile | ➖                  | ➖                 | ➖                 |
|          |            | 🏃 runtime | ➖                  | ➖                 | ➖                 |
|          | es-cjs     | 💻 compile | 🟢                  | 🟢                 | 🟢                 |
|          |            | 🏃 runtime | ❌ type-not-fn-3    | ❌ type-not-fn-3   | ❌ type-not-fn-4   |
|          | esm        | 💻 compile | ➖                  | ➖                 | ➖                 |
|          |            | 🏃 runtime | ➖                  | ➖                 | ➖                 |
|          | esm-cjs    | 💻 compile | 🟢                  | 🟢                 | 🟢                 |
|          |            | 🏃 runtime | 🟢                  | 🟢                 | 🟢                 |
|          | param-case | 💻 compile | 🟢                  | 🟢                 | 🔴 TS2497-a        |
|          |            | 🏃 runtime | 🟢                  | 🟢                 | 🔴 type-not-fn     |
| node16   | assert     | 💻 compile | 🟢                  | 🟢                 | 🟢                 |
|          |            | 🏃 runtime | ❌ ref-not-defined  | ❌ ref-not-defined | ❌ ref-not-defined |
|          | assertron  | 💻 compile | 🟢                  | 🟢                 | 🟢                 |
|          |            | 🏃 runtime | ❌ ref-not-defined  | ❌ ref-not-defined | ❌ ref-not-defined |
|          | cjs        | 💻 compile | 🟢                  | 🟢                 | 🟢                 |
|          |            | 🏃 runtime | ❌ ref-not-defined  | ❌ ref-not-defined | ❌ ref-not-defined |
|          | color-map  | 💻 compile | ➖                  | ➖                 | ➖                 |
|          |            | 🏃 runtime | ➖                  | ➖                 | ➖                 |
|          | es-cjs     | 💻 compile | 🟢                  | 🟢                 | 🟢                 |
|          |            | 🏃 runtime | ❌ ref-not-defined  | ❌ ref-not-defined | ❌ ref-not-defined |
|          | esm        | 💻 compile | ➖                  | ➖                 | ➖                 |
|          |            | 🏃 runtime | ➖                  | ➖                 | ➖                 |
|          | esm-cjs    | 💻 compile | 🟢                  | 🟢                 | 🟢                 |
|          |            | 🏃 runtime | ❌ ref-not-defined  | ❌ ref-not-defined | ❌ ref-not-defined |
|          | param-case | 💻 compile | 🟢                  | 🟢                 | 🔴 TS2497-a        |
|          |            | 🏃 runtime | ❌ ref-not-defined  | ❌ ref-not-defined | 🔴 ref-not-defined |
| nodenext | assert     | 💻 compile | 🟢                  | 🟢                 | 🟢                 |
|          |            | 🏃 runtime | ❌ ref-not-defined  | ❌ ref-not-defined | ❌ ref-not-defined |
|          | assertron  | 💻 compile | 🟢                  | 🟢                 | 🟢                 |
|          |            | 🏃 runtime | ❌ ref-not-defined  | ❌ ref-not-defined | ❌ ref-not-defined |
|          | cjs        | 💻 compile | 🟢                  | 🟢                 | 🟢                 |
|          |            | 🏃 runtime | ❌ ref-not-defined  | ❌ ref-not-defined | ❌ ref-not-defined |
|          | color-map  | 💻 compile | ➖                  | ➖                 | ➖                 |
|          |            | 🏃 runtime | ➖                  | ➖                 | ➖                 |
|          | es-cjs     | 💻 compile | 🟢                  | 🟢                 | 🟢                 |
|          |            | 🏃 runtime | ❌ ref-not-defined  | ❌ ref-not-defined | ❌ ref-not-defined |
|          | esm        | 💻 compile | ➖                  | ➖                 | ➖                 |
|          |            | 🏃 runtime | ➖                  | ➖                 | ➖                 |
|          | esm-cjs    | 💻 compile | 🟢                  | 🟢                 | 🟢                 |
|          |            | 🏃 runtime | ❌ ref-not-defined  | ❌ ref-not-defined | ❌ ref-not-defined |
|          | param-case | 💻 compile | 🟢                  | 🟢                 | 🔴 TS2497-a        |
|          |            | 🏃 runtime | ❌ ref-not-defined  | ❌ ref-not-defined | 🔴 ref-not-defined |

- `TS2497-a`: `This module can only be referenced with ECMAScript imports/exports by turning on the 'allowSyntheticDefaultImports' flag and referencing its default export.`
- `TS2497-e`: `This module can only be referenced with ECMAScript imports/exports by turning on the 'esModuleInterop' flag and referencing its default export.`
- `ref-not-defined`: `ReferenceError: exports is not defined in ES module scope`
- `type-not-fn`: `TypeError: paramCase is not a function`
- `type-not-fn-1`: `TypeError: assertron.truthy is not a function`
- `type-not-fn-2`: `TypeError: assertron.default.truthy is not a function`
- `type-not-fn-3`: `TypeError: m is not a function`
- `type-not-fn-4`: `TypeError: m.default is not a function`
