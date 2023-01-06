## Project Setup

```js
{
  "compilerOptions": {
    "allowSyntheticDefaultImports": false,
    "esModuleInterop": false,
    "moduleResolution": "Node"
  }
}
```

## Legends

- ✅: compile success
- ✔️: runtime success
- ⚠️: expected failure
- ❌: Something is wrong

Package:

- `assert`: `module declaration` with `export =` as in DefinitelyTyped
- `assertron`: `export default`
- `param-case`: `export =`

Import Syntax:

- `default`: `import x from 'x'`
- `default as`: `import { default as x } from 'x'`
- `* as`: `import * as x from 'x'`

## Test Result

```ts
// dt
import assert from 'assert'
import { default as assert } from 'assert'
import * as assert from 'assert'
assert(true)

// export default
import assertron from 'assertron'
import { default as assertron } from 'assertron'
assertron.truthy(1)

import * as assertron from 'assertron'
assertron.default.truthy(1)

// export =
import paramCase from 'param-case'
import { default as paramCase } from 'param-case'
import * as paramCase from 'param-case'
paramCase('hello world')
```

| type    | module   | Package    | import: default | import: default as | import: * as |
| ------- | -------- | ---------- | --------------- | ------------------ | ------------ |
| compile | CommonJS | assert     | ⚠️ c1            | ⚠️ c1               | ✅            |
|         | CommonJS | assertron  | ✅               | ✅                  | ✅            |
|         | CommonJS | param-case | ⚠️ c1            | ⚠️ c1               | ⚠️ c2         |
|         | ES*      | assert     | ⚠️ c3            | ⚠️ c3               | ✅            |
|         | ES*      | assertron  | ⚠️ c3            | ⚠️ c3               | ⚠️ c3         |
|         | ES*      | param-case | ⚠️ c3            | ⚠️ c3               | ⚠️ c2         |
|         | Node*    | assert     | ❌ c4            | ❌ c4               | ❌ c4         |
|         | Node*    | assertron  | ❌ c4 c5         | ❌ c4 c5            | ❌ c4 c5      |
|         | Node*    | param-case | ❌ c4            | ❌ c4               | ❌ c4         |
| ------- | -------- | ---------- | --------------- | ------------------ | ------------ |
| runtime | CommonJS | assert     | ⚠️ r1            | ⚠️ r1               | ✔️            |
|         | CommonJS | assertron  | ✔️               | ✔️                  | ✔️            |
|         | CommonJS | param-case | ⚠️ r1            | ⚠️ r1               | ✔️            |
|         | ES*      | assert     | ✔️               | ✔️                  | ⚠️ r1         |
|         | ES*      | assertron  | ⚠️ r1            | ⚠️ r1               | ⚠️ r1         |
|         | ES*      | param-case | ✔️               | ✔️                  | ⚠️ r1         |
|         | Node*    | assert     | ❌ r2            | ❌ r2               | ❌ r2         |
|         | Node*    | assertron  | ❌ r2            | ❌ r2               | ❌ r2         |
|         | Node*    | param-case | ❌ r2            | ❌ r2               | ❌ r2          |

- c1: `TS1259: needs esModuleInterop`
- c2: `TS2497: needs esModuleInterop and referencing its default export`
- c3: `TS1259: needs allowSyntheticDefaultImports`
- c4: Code are compiled to CJS incorrectly
- c5: `TS1259: ...node_modules/assertion-error can only be default-imported using the 'allowSyntheticDefaultImports' flag`\
  `export = AssertionError`\
  `This module is declared with 'export =', and can only be used with a default import when using the 'allowSyntheticDefaultImports' flag.`
- r1: `TypeError: not a function`
- r2: `ReferenceError: exports is not defined in ES module scope` (due to c4)

## Conclusion

- `module: CommonJS` is the only "barely usable" one.
  - Cannot support `export =` type definition
- `module: Node*` compiled to CJS incorrectly
