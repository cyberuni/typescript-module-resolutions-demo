## Test Configuration

```js
{
  "compilerOptions": {
    "allowSyntheticDefaultImports": ,
    "esModuleInterop": ,
    "moduleResolution": "Node16"
  }
}
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

| module   | Package    | Type      | import: default as | import: default | import: * as    |
| -------- | ---------- | --------- | ------------------ | --------------- | --------------- |
| commonjs | assert     | 💻 compile | 🔴 TS1259-e         | 🟢               | 🔴 TS2339-1      |
|          |            | 🏃 runtime | 🔴 type-not-fn      | ❌ type-not-fn   | 🔴 type-not-fn-1 |
|          | assertron  | 💻 compile | 🟡 TS1259-e-t       | 🟡 TS1259-e-t    | 🟡 TS1259-e-t    |
|          |            | 🏃 runtime | 🔴 type             | 🔴 type          | 🔴 type          |
|          | cjs        | 💻 compile | 🟢                  | 🟢               | 🔴 TS2339-2      |
|          |            | 🏃 runtime | ❌ type-not-fn-2    | ❌ type-not-fn-2 | 🔴 type-not-fn-3 |
|          | color-map  | 💻 compile | ➖                  | ➖               | ➖               |
|          |            | 🏃 runtime | ➖                  | ➖               | ➖               |
|          | es-cjs     | 💻 compile | 🟢                  | 🟢               | 🔴 TS2339-2      |
|          |            | 🏃 runtime | ❌ type-not-fn-4    | ❌ type-not-fn-4 | 🔴 type-not-fn-3 |
|          | esm        | 💻 compile | 🟢                  | 🟢               | 🟢               |
|          |            | 🏃 runtime | 🟢                  | 🟢               | 🟢               |
|          | esm-cjs    | 💻 compile | 🟢                  | 🟢               | 🟢               |
|          |            | 🏃 runtime | 🟢                  | 🟢               | 🟢               |
|          | param-case | 💻 compile | 🟢                  | 🟢               | 🔴 TS2497-e      |
|          |            | 🏃 runtime | ❌ type-not-fn-5    | ❌ type-not-fn-5 | 🟡               |
| es2015   | assert     | 💻 compile | 🔴 TS1259-a         | 🟢               | 🔴 TS2339-1      |
|          |            | 🏃 runtime | 🟡                  | 🟢               | 🟡               |
|          | assertron  | 💻 compile | 🟡 TS1259-a-t       | 🟡 TS1259-a-t    | 🟡 TS1259-a-t    |
|          |            | 🏃 runtime | 🟡                  | 🟡               | 🟡               |
|          | cjs        | 💻 compile | 🟢                  | 🟢               | 🔴 TS2339-2      |
|          |            | 🏃 runtime | 🟢                  | 🟢               | 🟡               |
|          | color-map  | 💻 compile | ➖                  | ➖               | ➖               |
|          |            | 🏃 runtime | ➖                  | ➖               | ➖               |
|          | es-cjs     | 💻 compile | 🟢                  | 🟢               | 🔴 TS2339-2      |
|          |            | 🏃 runtime | 🟢                  | 🟢               | 🟡               |
|          | esm        | 💻 compile | 🟢                  | 🟢               | 🟢               |
|          |            | 🏃 runtime | 🟢                  | 🟢               | 🟢               |
|          | esm-cjs    | 💻 compile | 🟢                  | 🟢               | 🟢               |
|          |            | 🏃 runtime | 🟢                  | 🟢               | 🟢               |
|          | param-case | 💻 compile | 🟢                  | 🟢               | 🔴 TS2497-a      |
|          |            | 🏃 runtime | 🟢                  | 🟢               | 🔴 type-not-fn-6 |
| es2020   | assert     | 💻 compile | 🔴 TS1259-a         | 🟢               | 🔴 TS2339-1      |
|          |            | 🏃 runtime | 🟡                  | 🟢               | 🟡               |
|          | assertron  | 💻 compile | 🟡 TS1259-a-t       | 🟡 TS1259-a-t    | 🟡 TS1259-a-t    |
|          |            | 🏃 runtime | 🟡                  | 🟡               | 🟡               |
|          | cjs        | 💻 compile | 🟢                  | 🟢               | 🔴 TS2339-2      |
|          |            | 🏃 runtime | 🟢                  | 🟢               | 🟡               |
|          | color-map  | 💻 compile | ➖                  | ➖               | ➖               |
|          |            | 🏃 runtime | ➖                  | ➖               | ➖               |
|          | es-cjs     | 💻 compile | 🟢                  | 🟢               | 🔴 TS2339-2      |
|          |            | 🏃 runtime | 🟢                  | 🟢               | 🟡               |
|          | esm        | 💻 compile | 🟢                  | 🟢               | 🟢               |
|          |            | 🏃 runtime | 🟢                  | 🟢               | 🟢               |
|          | esm-cjs    | 💻 compile | 🟢                  | 🟢               | 🟢               |
|          |            | 🏃 runtime | 🟢                  | 🟢               | 🟢               |
|          | param-case | 💻 compile | 🟢                  | 🟢               | 🔴 TS2497-a      |
|          |            | 🏃 runtime | 🟢                  | 🟢               | 🔴 type-not-fn-6 |
| es2022   | assert     | 💻 compile | 🔴 TS1259-a         | 🟢               | 🔴 TS2339-1      |
|          |            | 🏃 runtime | 🟡                  | 🟢               | 🟡               |
|          | assertron  | 💻 compile | 🟡 TS1259-a-t       | 🟡 TS1259-a-t    | 🟡 TS1259-a-t    |
|          |            | 🏃 runtime | 🟡                  | 🟡               | 🟡               |
|          | cjs        | 💻 compile | 🟢                  | 🟢               | 🔴 TS2339-2      |
|          |            | 🏃 runtime | 🟢                  | 🟢               | 🟡               |
|          | color-map  | 💻 compile | ➖                  | ➖               | ➖               |
|          |            | 🏃 runtime | ➖                  | ➖               | ➖               |
|          | es-cjs     | 💻 compile | 🟢                  | 🟢               | 🔴 TS2339-2      |
|          |            | 🏃 runtime | 🟢                  | 🟢               | 🟡               |
|          | esm        | 💻 compile | 🟢                  | 🟢               | 🟢               |
|          |            | 🏃 runtime | 🟢                  | 🟢               | 🟢               |
|          | esm-cjs    | 💻 compile | 🟢                  | 🟢               | 🟢               |
|          |            | 🏃 runtime | 🟢                  | 🟢               | 🟢               |
|          | param-case | 💻 compile | 🟢                  | 🟢               | 🔴 TS2497-a      |
|          |            | 🏃 runtime | 🟢                  | 🟢               | 🔴 type-not-fn-6 |
| esnext   | assert     | 💻 compile | 🔴 TS1259-a         | 🟢               | 🔴 TS2339-1      |
|          |            | 🏃 runtime | 🟡                  | 🟢               | 🟡               |
|          | assertron  | 💻 compile | 🟡 TS1259-a-t       | 🟡 TS1259-a-t    | 🟡 TS1259-a-t    |
|          |            | 🏃 runtime | 🟡                  | 🟡               | 🟡               |
|          | cjs        | 💻 compile | 🟢                  | 🟢               | 🔴 TS2339-2      |
|          |            | 🏃 runtime | 🟢                  | 🟢               | 🟡               |
|          | color-map  | 💻 compile | ➖                  | ➖               | ➖               |
|          |            | 🏃 runtime | ➖                  | ➖               | ➖               |
|          | es-cjs     | 💻 compile | 🟢                  | 🟢               | 🔴 TS2339-2      |
|          |            | 🏃 runtime | 🟢                  | 🟢               | 🟡               |
|          | esm        | 💻 compile | 🟢                  | 🟢               | 🟢               |
|          |            | 🏃 runtime | 🟢                  | 🟢               | 🟢               |
|          | esm-cjs    | 💻 compile | 🟢                  | 🟢               | 🟢               |
|          |            | 🏃 runtime | 🟢                  | 🟢               | 🟢               |
|          | param-case | 💻 compile | 🟢                  | 🟢               | 🔴 TS2497-a      |
|          |            | 🏃 runtime | 🟢                  | 🟢               | 🔴 type-not-fn-6 |
| node16   | assert     | 💻 compile | 🟢                  | 🟢               | 🟢               |
|          |            | 🏃 runtime | 🟢                  | 🟢               | 🟢               |
|          | assertron  | 💻 compile | 🟢                  | 🟢               | 🟢               |
|          |            | 🏃 runtime | 🟢                  | 🟢               | 🟢               |
|          | cjs        | 💻 compile | 🟢                  | 🟢               | 🟢               |
|          |            | 🏃 runtime | 🟢                  | 🟢               | 🟢               |
|          | color-map  | 💻 compile | ➖                  | ➖               | ➖               |
|          |            | 🏃 runtime | ➖                  | ➖               | ➖               |
|          | es-cjs     | 💻 compile | 🟢                  | 🟢               | 🟢               |
|          |            | 🏃 runtime | 🟢                  | 🟢               | 🟢               |
|          | esm        | 💻 compile | 🟢                  | 🟢               | 🟢               |
|          |            | 🏃 runtime | 🟢                  | 🟢               | 🟢               |
|          | esm-cjs    | 💻 compile | 🟢                  | 🟢               | 🟢               |
|          |            | 🏃 runtime | 🟢                  | 🟢               | 🟢               |
|          | param-case | 💻 compile | 🟢                  | 🟢               | 🔴 TS2497-a      |
|          |            | 🏃 runtime | 🟢                  | 🟢               | 🔴 type-not-fn-6 |
| nodenext | assert     | 💻 compile | 🟢                  | 🟢               | 🟢               |
|          |            | 🏃 runtime | 🟢                  | 🟢               | 🟢               |
|          | assertron  | 💻 compile | 🟢                  | 🟢               | 🟢               |
|          |            | 🏃 runtime | 🟢                  | 🟢               | 🟢               |
|          | cjs        | 💻 compile | 🟢                  | 🟢               | 🟢               |
|          |            | 🏃 runtime | 🟢                  | 🟢               | 🟢               |
|          | color-map  | 💻 compile | ➖                  | ➖               | ➖               |
|          |            | 🏃 runtime | ➖                  | ➖               | ➖               |
|          | es-cjs     | 💻 compile | 🟢                  | 🟢               | 🟢               |
|          |            | 🏃 runtime | 🟢                  | 🟢               | 🟢               |
|          | esm        | 💻 compile | 🟢                  | 🟢               | 🟢               |
|          |            | 🏃 runtime | 🟢                  | 🟢               | 🟢               |
|          | esm-cjs    | 💻 compile | 🟢                  | 🟢               | 🟢               |
|          |            | 🏃 runtime | 🟢                  | 🟢               | 🟢               |
|          | param-case | 💻 compile | 🟢                  | 🟢               | 🔴 TS2497-a      |
|          |            | 🏃 runtime | 🟢                  | 🟢               | 🔴 type-not-fn-6 |

- `TS1259-a`: `Module '"assert"' can only be default-imported using the 'allowSyntheticDefaultImports' flag`
- `TS1259-a-t`: `Module '"/home/homa/code/cyberuni/ts-esm-interop/node_modules/.pnpm/assertion-error@1.1.0/node_modules/assertion-error/index"' can only be default-imported using the 'allowSyntheticDefaultImports' flag`
- `TS1259-e`: `Module '"assert"' can only be default-imported using the 'esModuleInterop' flag`
- `TS1259-e-t`: `Module '"/home/homa/code/cyberuni/ts-esm-interop/node_modules/.pnpm/assertion-error@1.1.0/node_modules/assertion-error/index"' can only be default-imported using the 'esModuleInterop' flag`
- `TS1479-t`: `The current file is a CommonJS module whose imports will produce 'require' calls; however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import("tersify")' call instead.`
- `TS2339`: `Property 'default' does not exist on type '{ false(value: any): void; falsy: (value: any) => void; pathEqual: (actual: string, expected: string) => void; rejects: (promise: Promise<any>) => Promise<void>; ... 5 more ...; truthy: (value: any) => void; }'.`
- `TS2339-1`: `Property 'default' does not exist on type 'typeof assert'.`
- `TS2339-2`: `Property 'default' does not exist on type '(v: number) => number'.`
- `TS2497-a`: `This module can only be referenced with ECMAScript imports/exports by turning on the 'allowSyntheticDefaultImports' flag and referencing its default export.`
- `TS2497-e`: `This module can only be referenced with ECMAScript imports/exports by turning on the 'esModuleInterop' flag and referencing its default export.`
- `type`: `TypeError: Cannot read properties of undefined (reading 'truthy')`
- `type-not-fn`: `TypeError: (0 , assert_1.default) is not a function`
- `type-not-fn-1`: `TypeError: assert.default is not a function`
- `type-not-fn-2`: `TypeError: cjs_1.default.default is not a function`
- `type-not-fn-3`: `TypeError: m.default.default is not a function`
- `type-not-fn-4`: `TypeError: es_cjs_1.default.default is not a function`
- `type-not-fn-5`: `TypeError: (0 , param_case_1.default) is not a function`
- `type-not-fn-6`: `TypeError: paramCase is not a function`

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

assertron.default.truthy(true)

```

[assertron.default.all.ts](./ts/assertron.default.all.ts):

```ts
import assertron from 'assertron'

assertron.default.truthy(true)

```

[assertron.star.all.ts](./ts/assertron.star.all.ts):

```ts
import * as assertron from 'assertron'

assertron.default.default.truthy(true)

```

### [cjs](../../README.md#cjs)

[cjs.default-as.all.ts](./ts/cjs.default-as.all.ts):

```ts
import { default as m } from 'cjs'

m.default(1)

```

[cjs.default.all.ts](./ts/cjs.default.all.ts):

```ts
import m from 'cjs'

m.default(1)

```

[cjs.star.all.ts](./ts/cjs.star.all.ts):

```ts
import * as m from 'cjs'

m.default.default(1)


```

### [color-map](../../README.md#color-map)

### [es-cjs](../../README.md#es-cjs)

[es-cjs.default-as.all.ts](./ts/es-cjs.default-as.all.ts):

```ts
import { default as m } from 'es-cjs'

m.default(1)

```

[es-cjs.default.all.ts](./ts/es-cjs.default.all.ts):

```ts
import m from 'es-cjs'

m.default(1)

```

[es-cjs.star.all.ts](./ts/es-cjs.star.all.ts):

```ts
import * as m from 'es-cjs'

m.default.default(1)

```

### [esm](../../README.md#esm)

[esm.default-as.all.ts](./ts/esm.default-as.all.ts):

```ts
import { default as m } from 'esm-cjs'

m(1)

```

[esm.default.all.ts](./ts/esm.default.all.ts):

```ts
import m from 'esm-cjs'

m(1)

```

[esm.star.all.ts](./ts/esm.star.all.ts):

```ts
import * as m from 'esm-cjs'

m.default(1)

```

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
