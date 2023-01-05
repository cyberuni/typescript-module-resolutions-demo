## Test Setup

```js
{
  "compilerOptions": {
    "allowSyntheticDefaultImports": false,
    "esModuleInterop": false,
    "moduleResolution": "Node"
  }
}
```

## Test Result

### module declaration with export =

```ts
import assert from 'assert'
import { default as assert } from 'assert'
import * as assert from 'assert'
```

| type    | module   | import x from 'x'                                                  | import { default as x } from 'x' | import * as x from 'x'       |
| ------- | -------- | ------------------------------------------------------------------ | -------------------------------- | ---------------------------- |
| compile | CommonJS | ⚠️ `TS1259: esModuleInterop`                                        | ⚠️ same                           | ✅ compile success            |
|         | ES*      | ⚠️ `TS1259: allowSyntheticDefaultImports`                           | ⚠️ same                           | ✅ compile success            |
|         | Node*    | ❌ compile to CJS incorrectly `TS1259: allowSyntheticDefaultImport` | ❌ same                           | ❌ compile to CJS incorrectly |
| runtime | CommonJS | ⚠️ `TypeError: not a function`                                      | ⚠️ same                           | ✔️ test success               |
|         | ES*      | ⚠️ `TypeError: not a function`                                      | ⚠️ same                           | ⚠️ same                       |
|         | Node*    | ❌  `ReferenceError: exports is not defined in ES module scope`     | ❌ same                           | ❌ same                       |

take-aways:

- `Node*` compiles to CJS is wrong
- `ES*` compiles `* as x` but result is not usable
- Others are expected

#### export =

```ts
import paramCase from 'param-case'
import { default as paramCase } from 'param-case'
import * as paramCase from 'param-case'
```

| type    | module   | import x from 'x'                                             | import { default as x } from 'x' | import * as x from 'x' |
| ------- | -------- | ------------------------------------------------------------- | -------------------------------- | ---------------------- |
| compile | CommonJS | ⚠️ `TS1259: esModuleInterop`                                   | ⚠️ same                           | ⚠️ same                 |
|         | ES*      | ⚠️ `TS1259: allowSyntheticDefaultImports`                      | ⚠️ same                           | ⚠️ same                 |
|         | Node*    | ⚠️ `TS1259: allowSyntheticDefaultImport`                       | ⚠️ same                           | ⚠️ same                 |
| runtime | CommonJS | ⚠️ `TypeError: not a function`                                 | ⚠️ same                           | ⚠️ same                 |
|         | ES*      | ⚠️ `TypeError: not a function`                                 | ⚠️ same                           | ⚠️ same                 |
|         | Node*    | ❌ `ReferenceError: exports is not defined in ES module scope` | ❌ same                           | ❌ same                 |

take-aways:

- `Node*` compiles to CJS is wrong
- Others are expected

### CJS with export default

```ts
import assertron from 'assertron'
import { default as assertron } from 'assertron'

assertron.truthy(1)
```

```ts
import * as assertron from 'assertron'

assertron.default.truthy(1)
```

| type    | module   | import x from 'x'                                                                     | import { default as x } from 'x' | import * as x from 'x' |
| ------- | -------- | ------------------------------------------------------------------------------------- | -------------------------------- | ---------------------- |
| compile | CommonJS | ⚠️ transient `TS1259: esModuleInterop` (on `assertion-error`: `export =`)              | ⚠️ same                           | ⚠️ same                 |
|         | ES*      | ⚠️ transient `TS1259: allowSyntheticDefaultImports` (on `assertion-error`: `export =`) | ⚠️ same                           | ⚠️ same                 |
|         | Node16   | ⚠️ transient `TS1259: allowSyntheticDefaultImport`  (on `assertion-error`: `export =`) | ⚠️ same                           | ⚠️ same                 |
|         |          | ⚠️ transient `TS1479: The current file is a CommonJS module`                           | ⚠️ same                           | ⚠️ same                 |
|         | NodeNext | ⚠️ transient `TS1259: allowSyntheticDefaultImports` (on `assertion-error`: `export =`) | ⚠️ same                           | ⚠️ same                 |
| runtime | CommonJS | ✅                                                                                     | ✅ same                           | ✅ same                 |
|         | ES*      | ❌ `TypeError: not a function`                                                         | ❌ same                           | ❌ same                 |
|         | Node16   | ❌ `exports not defined`                                                               | ❌ same                           | ❌ same                 |
|         | NodeNext | ❌ `exports not defined`                                                               | ❌ same                           | ❌ same                 |

take-aways:

- `Node*` compiles to CJS is wrong
- The transient errors can be suppressed by `skipLibCheck`, but the result is not usable.
