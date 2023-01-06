## Project Setup

```js
{
  "compilerOptions": {
    "allowSyntheticDefaultImports": false,
    "esModuleInterop": true,
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
assert(true)

import * as assert from 'assert'
assert.default(true)

// export default
import assertron from 'assertron'
import { default as assertron } from 'assertron'
assertron.truthy(1)

import * as assertron from 'assertron'
assertron.default.truthy(1)

// export =
import paramCase from 'param-case'
import { default as paramCase } from 'param-case'
paramCase('hello world')

import * as paramCase from 'param-case'
paramCase.default('hello world')
```

| type    | module   | Package    | import: default | import: default as | import: * as |
| ------- | -------- | ---------- | --------------- | ------------------ | ------------ |
| compile | CommonJS | assert     | ✅               | ✅                  | ✅            |
|         | CommonJS | assertron  | ✅               | ✅                  | ✅            |
|         | CommonJS | param-case | ✅               | ✅                  | ⚠️ c6         |
|         | ES*      | assert     | ✅               | ✅                  | ✅            |
|         | ES*      | assertron  | ✅               | ✅                  | ✅            |
|         | ES*      | param-case | ✅               | ✅                  | ⚠️ c6         |
|         | Node*    | assert     | ✅               | ✅                  | ✅            |
|         | Node*    | assertron  | ✅               | ✅                  | ✅            |
|         | Node*    | param-case | ✅               | ✅                  | ⚠️ c6         |
| ------- | -------- | ---------- | --------------- | ------------------ | ------------ |
| runtime | CommonJS | assert     | ✔️               | ✔️                  | ✔️            |
|         | CommonJS | assertron  | ✔️               | ✔️                  | ✔️            |
|         | CommonJS | param-case | ✔️               | ✔️                  | ✔️            |
|         | ES*      | assert     | ✔️               | ✔️                  | ✔️            |
|         | ES*      | assertron  | ❌ r1            | ❌ r1               | ❌ r1         |
|         | ES*      | param-case | ✔️               | ✔️                  | ✔️            |
|         | Node*    | assert     | ❌ r2            | ❌ r2               | ❌ r2         |
|         | Node*    | assertron  | ❌ r2            | ❌ r2               | ❌ r2         |
|         | Node*    | param-case | ❌ r2            | ❌ r2               | ❌ r2         |

- c1: `TS1259: needs esModuleInterop`
- c2: `TS2497: needs esModuleInterop and referencing its default export`
- c3: `TS1259: needs allowSyntheticDefaultImports`
- c4: Code are compiled to CJS incorrectly
- c5: `TS1259: ...node_modules/assertion-error can only be default-imported using the 'allowSyntheticDefaultImports' flag`\
  `export = AssertionError`\
  `This module is declared with 'export =', and can only be used with a default import when using the 'allowSyntheticDefaultImports' flag.`
- c6: `TS2497: needs allowSyntheticDefaultImports and referencing its default export`\
  `Property 'default' does not exist on type '(value: string, locale?: string | undefined) => string'`
- r1: `TypeError: not a function`
- r2: `ReferenceError: exports is not defined in ES module scope` (due to c4)

## Conclusion

- `module: CommonJS` is useable
  - should not use the `import * as` syntax (as least for `export =` case)
- `module: ES*` compiles but CJS with default export is not useable\
  This is really due to the type definition of CJS output is "incorrect"\
  And it demonstrates there is no way to "fix" it on the consuming side.
- `module: Node*` continue to be completely broken
