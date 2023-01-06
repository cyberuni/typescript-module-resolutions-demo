## Test Setup

```js
{
  "compilerOptions": {
    "allowSyntheticDefaultImports": false,
    "esModuleInterop": true,
    "moduleResolution": "Node"
  }
}
```

## Test Result

### module declaration with export =

```ts
import assert from 'assert'
import { default as assert } from 'assert'

assert(true)

import * as assert from 'assert'

assert.default(true)
```

| type    | module   | import x from 'x' | import { default as x } from 'x' | import * as x from 'x' |
| ------- | -------- | ----------------- | -------------------------------- | ---------------------- |
| compile | CommonJS | ✅                 | ✅                                | ✅                      |
|         | ES*      | ✅                 | ✅                                | ✅                      |
|         | Node*    | ✅                 | ✅                                | ✅                      |
| runtime | CommonJS | ✅                 | ✅                                | ✅                      |
|         | ES*      | ✅                 | ✅                                | ✅                      |
|         | Node*    | ✅                 | ✅                                | ✅                      |

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

| type    | module   | import x from 'x' | import { default as x } from 'x' | import * as x from 'x'                                      |
| ------- | -------- | ----------------- | -------------------------------- | ----------------------------------------------------------- |
| compile | CommonJS | ✅                 | ✅                                | ⚠️ `TS2497: 'allowSyntheticDefaultImports' + default export` |
|         | ES*      | ✅                 | ✅                                | ⚠️ `TS2497: 'allowSyntheticDefaultImports' + default export` |
|         | Node*    | ✅                 | ✅                                | ⚠️ `TS2497: 'allowSyntheticDefaultImports' + default export` |
| runtime | CommonJS | ✔️                 | ✔️                                | ⚠️                                                           |
|         | ES*      | ✔️                 | ✔️                                | ⚠️                                                           |
|         | Node*    | ✔️                 | ✔️                                | ⚠️                                                           |

take-aways:

- `Node*` compiles to CJS is wrong
- Others are expected

### CJS with export default

```ts
import assertron from 'assertron'
import { default as assertron } from 'assertron'

assertron.truthy(1)

import * as assertron from 'assertron'

assertron.default.truthy(1)
```

| type    | module   | import x from 'x'             | import { default as x } from 'x' | import * as x from 'x' |
| ------- | -------- | ----------------------------- | -------------------------------- | ---------------------- |
| compile | CommonJS | ✅                             | ✅                                | ✅                      |
|         | ES*      | ✅                             | ✅                                | ✅                      |
|         | Node*    | ✅                             | ✅                                | ✅                      |
| runtime | CommonJS | ✅                             | ✅ same                           | ✅ same                 |
|         | ES*      | ❌ `TypeError: not a function` | ❌ same                           | ❌ same                 |
|         | Node16   | ❌ `exports not defined`       | ❌ same                           | ❌ same                 |
|         | NodeNext | ❌ `exports not defined`       | ❌ same                           | ❌ same                 |

take-aways:

- `Node*` compiles to CJS is wrong
- The transient errors can be suppressed by `skipLibCheck`, but the result is not usable.
