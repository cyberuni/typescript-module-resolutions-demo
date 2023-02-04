# TypeScript Module System Demo

TypeScript: 5.0.0-dev.20230103

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
- `named`: `import { something } from 'm'`

## Test Results

| module   | Package    | Type      | import: default as | import: default   | import: * as      | import: { named } |
| -------- | ---------- | --------- | ------------------ | ----------------- | ----------------- | ----------------- |
| commonjs | assert | 💻 compile | 🟢  | 🟢  | 🟢  | ➖  |
|  |  | 🏃 runtime | 🟢  | 🟢  | 🟢  | ➖  |
|  | assertron | 💻 compile | 🟡 TS1479-t | 🟡 TS1479-t | 🟡 TS1479-t | ➖  |
|  |  | 🏃 runtime | 🔴 type | 🔴 type | 🔴 type | ➖  |
|  | cjs | 💻 compile | 🟢  | 🟢  | 🔴 TS2554 | ➖  |
|  |  | 🏃 runtime | ❌ type-not-fn | ❌ type-not-fn | 🔴 type-not-fn-1 | ➖  |
|  | color-map | 💻 compile | ➖  | ➖  | ➖  | ➖  |
|  |  | 🏃 runtime | ➖  | ➖  | ➖  | ➖  |
|  | es-cjs | 💻 compile | 🟢  | 🟢  | 🔴 TS2554 | ➖  |
|  |  | 🏃 runtime | ❌ type-not-fn-2 | ❌ type-not-fn-2 | 🔴 type-not-fn-1 | ➖  |
|  | esm | 💻 compile | 🟢  | 🟢  | 🟢  | ➖  |
|  |  | 🏃 runtime | ❌ Error | ❌ Error-1 | ❌ Error-2 | ➖  |
|  | esm-cjs | 💻 compile | 🟢  | 🟢  | 🟢  | ➖  |
|  |  | 🏃 runtime | ❌ Error-3 | ❌ Error-4 | ❌ Error-5 | ➖  |
|  | named-cjs | 💻 compile | 🟢  | 🟢  | 🟢  | 🟢  |
|  |  | 🏃 runtime | ❌ type-1 | ❌ type-1 | 🟢  | 🟢  |
|  | named-es-cjs | 💻 compile | 🟢  | 🟢  | 🟢  | 🟢  |
|  |  | 🏃 runtime | ❌ type-1 | ❌ type-1 | 🟢  | 🟢  |
|  | named-esm | 💻 compile | ➖  | ➖  | ➖  | ➖  |
|  |  | 🏃 runtime | ➖  | ➖  | ➖  | ➖  |
|  | named-esm-cjs | 💻 compile | 🔴 TS2305 | 🔴 TS1192 | 🟢  | 🟢  |
|  |  | 🏃 runtime | 🔴 type-1 | 🔴 type-1 | 🟢  | 🟢  |
|  | param-case | 💻 compile | 🟢  | 🟢  | 🔴 TS2497-e | ➖  |
|  |  | 🏃 runtime | 🟢  | 🟢  | 🔴 type-not-fn-3 | ➖  |
| es2015 | assert | 💻 compile | 🟢  | 🟢  | 🟢  | ➖  |
|  |  | 🏃 runtime | 🟢  | 🟢  | 🟢  | ➖  |
|  | assertron | 💻 compile | 🟡 TS1479-t | 🟡 TS1479-t | 🟡 TS1479-t | ➖  |
|  |  | 🏃 runtime | 🟡  | 🟡  | 🟡  | ➖  |
|  | cjs | 💻 compile | 🟢  | 🟢  | 🔴 TS2554 | ➖  |
|  |  | 🏃 runtime | 🟢  | 🟢  | 🟡  | ➖  |
|  | color-map | 💻 compile | ➖  | ➖  | ➖  | ➖  |
|  |  | 🏃 runtime | ➖  | ➖  | ➖  | ➖  |
|  | es-cjs | 💻 compile | 🟢  | 🟢  | 🔴 TS2554 | ➖  |
|  |  | 🏃 runtime | 🟢  | 🟢  | 🟡  | ➖  |
|  | esm | 💻 compile | 🟢  | 🟢  | 🟢  | ➖  |
|  |  | 🏃 runtime | 🟢  | 🟢  | 🟢  | ➖  |
|  | esm-cjs | 💻 compile | 🟢  | 🟢  | 🟢  | ➖  |
|  |  | 🏃 runtime | 🟢  | 🟢  | 🟢  | ➖  |
|  | named-cjs | 💻 compile | 🟢  | 🟢  | 🟢  | 🟢  |
|  |  | 🏃 runtime | 🟢  | 🟢  | 🟢  | 🟢  |
|  | named-es-cjs | 💻 compile | 🟢  | 🟢  | 🟢  | 🟢  |
|  |  | 🏃 runtime | 🟢  | 🟢  | 🟢  | 🟢  |
|  | named-esm | 💻 compile | ➖  | ➖  | ➖  | ➖  |
|  |  | 🏃 runtime | ➖  | ➖  | ➖  | ➖  |
|  | named-esm-cjs | 💻 compile | 🔴 TS2305 | 🔴 TS1192 | 🟢  | 🟢  |
|  |  | 🏃 runtime | 🔴 syntax | 🔴 syntax | 🟢  | 🟢  |
|  | param-case | 💻 compile | 🟢  | 🟢  | 🔴 TS2497-a | ➖  |
|  |  | 🏃 runtime | 🟢  | 🟢  | 🔴 type-not-fn-3 | ➖  |
| es2020 | assert | 💻 compile | 🟢  | 🟢  | 🟢  | ➖  |
|  |  | 🏃 runtime | 🟢  | 🟢  | 🟢  | ➖  |
|  | assertron | 💻 compile | 🟡 TS1479-t | 🟡 TS1479-t | 🟡 TS1479-t | ➖  |
|  |  | 🏃 runtime | 🟡  | 🟡  | 🟡  | ➖  |
|  | cjs | 💻 compile | 🟢  | 🟢  | 🔴 TS2554 | ➖  |
|  |  | 🏃 runtime | 🟢  | 🟢  | 🟡  | ➖  |
|  | color-map | 💻 compile | ➖  | ➖  | ➖  | ➖  |
|  |  | 🏃 runtime | ➖  | ➖  | ➖  | ➖  |
|  | es-cjs | 💻 compile | 🟢  | 🟢  | 🔴 TS2554 | ➖  |
|  |  | 🏃 runtime | 🟢  | 🟢  | 🟡  | ➖  |
|  | esm | 💻 compile | 🟢  | 🟢  | 🟢  | ➖  |
|  |  | 🏃 runtime | 🟢  | 🟢  | 🟢  | ➖  |
|  | esm-cjs | 💻 compile | 🟢  | 🟢  | 🟢  | ➖  |
|  |  | 🏃 runtime | 🟢  | 🟢  | 🟢  | ➖  |
|  | named-cjs | 💻 compile | 🟢  | 🟢  | 🟢  | 🟢  |
|  |  | 🏃 runtime | 🟢  | 🟢  | 🟢  | 🟢  |
|  | named-es-cjs | 💻 compile | 🟢  | 🟢  | 🟢  | 🟢  |
|  |  | 🏃 runtime | 🟢  | 🟢  | 🟢  | 🟢  |
|  | named-esm | 💻 compile | ➖  | ➖  | ➖  | ➖  |
|  |  | 🏃 runtime | ➖  | ➖  | ➖  | ➖  |
|  | named-esm-cjs | 💻 compile | 🔴 TS2305 | 🔴 TS1192 | 🟢  | 🟢  |
|  |  | 🏃 runtime | 🔴 syntax | 🔴 syntax | 🟢  | 🟢  |
|  | param-case | 💻 compile | 🟢  | 🟢  | 🔴 TS2497-a | ➖  |
|  |  | 🏃 runtime | 🟢  | 🟢  | 🔴 type-not-fn-3 | ➖  |
| es2022 | assert | 💻 compile | 🟢  | 🟢  | 🟢  | ➖  |
|  |  | 🏃 runtime | 🟢  | 🟢  | 🟢  | ➖  |
|  | assertron | 💻 compile | 🟡 TS1479-t | 🟡 TS1479-t | 🟡 TS1479-t | ➖  |
|  |  | 🏃 runtime | 🟡  | 🟡  | 🟡  | ➖  |
|  | cjs | 💻 compile | 🟢  | 🟢  | 🔴 TS2554 | ➖  |
|  |  | 🏃 runtime | 🟢  | 🟢  | 🟡  | ➖  |
|  | color-map | 💻 compile | ➖  | ➖  | ➖  | ➖  |
|  |  | 🏃 runtime | ➖  | ➖  | ➖  | ➖  |
|  | es-cjs | 💻 compile | 🟢  | 🟢  | 🔴 TS2554 | ➖  |
|  |  | 🏃 runtime | 🟢  | 🟢  | 🟡  | ➖  |
|  | esm | 💻 compile | 🟢  | 🟢  | 🟢  | ➖  |
|  |  | 🏃 runtime | 🟢  | 🟢  | 🟢  | ➖  |
|  | esm-cjs | 💻 compile | 🟢  | 🟢  | 🟢  | ➖  |
|  |  | 🏃 runtime | 🟢  | 🟢  | 🟢  | ➖  |
|  | named-cjs | 💻 compile | 🟢  | 🟢  | 🟢  | 🟢  |
|  |  | 🏃 runtime | 🟢  | 🟢  | 🟢  | 🟢  |
|  | named-es-cjs | 💻 compile | 🟢  | 🟢  | 🟢  | 🟢  |
|  |  | 🏃 runtime | 🟢  | 🟢  | 🟢  | 🟢  |
|  | named-esm | 💻 compile | ➖  | ➖  | ➖  | ➖  |
|  |  | 🏃 runtime | ➖  | ➖  | ➖  | ➖  |
|  | named-esm-cjs | 💻 compile | 🔴 TS2305 | 🔴 TS1192 | 🟢  | 🟢  |
|  |  | 🏃 runtime | 🔴 syntax | 🔴 syntax | 🟢  | 🟢  |
|  | param-case | 💻 compile | 🟢  | 🟢  | 🔴 TS2497-a | ➖  |
|  |  | 🏃 runtime | 🟢  | 🟢  | 🔴 type-not-fn-3 | ➖  |
| esnext | assert | 💻 compile | 🟢  | 🟢  | 🟢  | ➖  |
|  |  | 🏃 runtime | 🟢  | 🟢  | 🟢  | ➖  |
|  | assertron | 💻 compile | 🟡 TS1479-t | 🟡 TS1479-t | 🟡 TS1479-t | ➖  |
|  |  | 🏃 runtime | 🟡  | 🟡  | 🟡  | ➖  |
|  | cjs | 💻 compile | 🟢  | 🟢  | 🔴 TS2554 | ➖  |
|  |  | 🏃 runtime | 🟢  | 🟢  | 🟡  | ➖  |
|  | color-map | 💻 compile | ➖  | ➖  | ➖  | ➖  |
|  |  | 🏃 runtime | ➖  | ➖  | ➖  | ➖  |
|  | es-cjs | 💻 compile | 🟢  | 🟢  | 🔴 TS2554 | ➖  |
|  |  | 🏃 runtime | 🟢  | 🟢  | 🟡  | ➖  |
|  | esm | 💻 compile | 🟢  | 🟢  | 🟢  | ➖  |
|  |  | 🏃 runtime | 🟢  | 🟢  | 🟢  | ➖  |
|  | esm-cjs | 💻 compile | 🟢  | 🟢  | 🟢  | ➖  |
|  |  | 🏃 runtime | 🟢  | 🟢  | 🟢  | ➖  |
|  | named-cjs | 💻 compile | 🟢  | 🟢  | 🟢  | 🟢  |
|  |  | 🏃 runtime | 🟢  | 🟢  | 🟢  | 🟢  |
|  | named-es-cjs | 💻 compile | 🟢  | 🟢  | 🟢  | 🟢  |
|  |  | 🏃 runtime | 🟢  | 🟢  | 🟢  | 🟢  |
|  | named-esm | 💻 compile | ➖  | ➖  | ➖  | ➖  |
|  |  | 🏃 runtime | ➖  | ➖  | ➖  | ➖  |
|  | named-esm-cjs | 💻 compile | 🔴 TS2305 | 🔴 TS1192 | 🟢  | 🟢  |
|  |  | 🏃 runtime | 🔴 syntax | 🔴 syntax | 🟢  | 🟢  |
|  | param-case | 💻 compile | 🟢  | 🟢  | 🔴 TS2497-a | ➖  |
|  |  | 🏃 runtime | 🟢  | 🟢  | 🔴 type-not-fn-3 | ➖  |
| node16 | assert | 💻 compile | 🟢  | 🟢  | 🟢  | ➖  |
|  |  | 🏃 runtime | 🟢  | 🟢  | 🟢  | ➖  |
|  | assertron | 💻 compile | 🟡 TS1479-t | 🟡 TS1479-t | 🟡 TS1479-t | ➖  |
|  |  | 🏃 runtime | 🟡  | 🟡  | 🟡  | ➖  |
|  | cjs | 💻 compile | 🟢  | 🟢  | 🔴 TS2554 | ➖  |
|  |  | 🏃 runtime | 🟢  | 🟢  | 🟡  | ➖  |
|  | color-map | 💻 compile | ➖  | ➖  | ➖  | ➖  |
|  |  | 🏃 runtime | ➖  | ➖  | ➖  | ➖  |
|  | es-cjs | 💻 compile | 🟢  | 🟢  | 🔴 TS2554 | ➖  |
|  |  | 🏃 runtime | 🟢  | 🟢  | 🟡  | ➖  |
|  | esm | 💻 compile | 🟢  | 🟢  | 🟢  | ➖  |
|  |  | 🏃 runtime | 🟢  | 🟢  | 🟢  | ➖  |
|  | esm-cjs | 💻 compile | 🟢  | 🟢  | 🟢  | ➖  |
|  |  | 🏃 runtime | 🟢  | 🟢  | 🟢  | ➖  |
|  | named-cjs | 💻 compile | 🟢  | 🟢  | 🟢  | 🟢  |
|  |  | 🏃 runtime | 🟢  | 🟢  | 🟢  | 🟢  |
|  | named-es-cjs | 💻 compile | 🟢  | 🟢  | 🟢  | 🟢  |
|  |  | 🏃 runtime | 🟢  | 🟢  | 🟢  | 🟢  |
|  | named-esm | 💻 compile | ➖  | ➖  | ➖  | ➖  |
|  |  | 🏃 runtime | ➖  | ➖  | ➖  | ➖  |
|  | named-esm-cjs | 💻 compile | 🔴 TS2305 | 🔴 TS1192 | 🟢  | 🟢  |
|  |  | 🏃 runtime | 🔴 syntax | 🔴 syntax | 🟢  | 🟢  |
|  | param-case | 💻 compile | 🟢  | 🟢  | 🔴 TS2497-a | ➖  |
|  |  | 🏃 runtime | 🟢  | 🟢  | 🔴 type-not-fn-3 | ➖  |
| nodenext | assert | 💻 compile | 🟢  | 🟢  | 🟢  | ➖  |
|  |  | 🏃 runtime | 🟢  | 🟢  | 🟢  | ➖  |
|  | assertron | 💻 compile | 🟡 TS1479-t | 🟡 TS1479-t | 🟡 TS1479-t | ➖  |
|  |  | 🏃 runtime | 🟡  | 🟡  | 🟡  | ➖  |
|  | cjs | 💻 compile | 🟢  | 🟢  | 🔴 TS2554 | ➖  |
|  |  | 🏃 runtime | 🟢  | 🟢  | 🟡  | ➖  |
|  | color-map | 💻 compile | ➖  | ➖  | ➖  | ➖  |
|  |  | 🏃 runtime | ➖  | ➖  | ➖  | ➖  |
|  | es-cjs | 💻 compile | 🟢  | 🟢  | 🔴 TS2554 | ➖  |
|  |  | 🏃 runtime | 🟢  | 🟢  | 🟡  | ➖  |
|  | esm | 💻 compile | 🟢  | 🟢  | 🟢  | ➖  |
|  |  | 🏃 runtime | 🟢  | 🟢  | 🟢  | ➖  |
|  | esm-cjs | 💻 compile | 🟢  | 🟢  | 🟢  | ➖  |
|  |  | 🏃 runtime | 🟢  | 🟢  | 🟢  | ➖  |
|  | named-cjs | 💻 compile | 🟢  | 🟢  | 🟢  | 🟢  |
|  |  | 🏃 runtime | 🟢  | 🟢  | 🟢  | 🟢  |
|  | named-es-cjs | 💻 compile | 🟢  | 🟢  | 🟢  | 🟢  |
|  |  | 🏃 runtime | 🟢  | 🟢  | 🟢  | 🟢  |
|  | named-esm | 💻 compile | ➖  | ➖  | ➖  | ➖  |
|  |  | 🏃 runtime | ➖  | ➖  | ➖  | ➖  |
|  | named-esm-cjs | 💻 compile | 🔴 TS2305 | 🔴 TS1192 | 🟢  | 🟢  |
|  |  | 🏃 runtime | 🔴 syntax | 🔴 syntax | 🟢  | 🟢  |
|  | param-case | 💻 compile | 🟢  | 🟢  | 🔴 TS2497-a | ➖  |
|  |  | 🏃 runtime | 🟢  | 🟢  | 🔴 type-not-fn-3 | ➖  |

- `TS1192`: `Module '"/home/homa/code/cyberuni/ts-esm-interop/packages/named-esm-cjs/node16/index"' has no default export.`
- `TS1479-t`: `The current file is a CommonJS module whose imports will produce 'require' calls; however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import("tersify")' call instead.`
- `TS2305`: `Module '"named-esm-cjs"' has no exported member 'default'.`
- `TS2497-a`: `This module can only be referenced with ECMAScript imports/exports by turning on the 'allowSyntheticDefaultImports' flag and referencing its default export.`
- `TS2497-e`: `This module can only be referenced with ECMAScript imports/exports by turning on the 'esModuleInterop' flag and referencing its default export.`
- `TS2554`: `Expected 0 arguments, but got 1.`
- `Error`: `Command failed: node esm.default-as.all.js
node:internal/modules/cjs/loader:535
      throw e;
      ^

Error [ERR_PACKAGE_PATH_NOT_EXPORTED]: No "exports" main defined in /home/homa/code/cyberuni/ts-esm-interop/tests/node16-es/node_modules/esm-cjs/package.json
    at new NodeError (node:internal/errors:393:5)
    at throwExportsNotFound (node:internal/modules/esm/resolve:358:9)
    at packageExportsResolve (node:internal/modules/esm/resolve:612:7)
    at resolveExports (node:internal/modules/cjs/loader:529:36)
    at Module._findPath (node:internal/modules/cjs/loader:569:31)
    at Module._resolveFilename (node:internal/modules/cjs/loader:981:27)
    at Module._load (node:internal/modules/cjs/loader:841:27)
    at Module.require (node:internal/modules/cjs/loader:1061:19)
    at require (node:internal/modules/cjs/helpers:103:18)
    at Object.<anonymous> (/home/homa/code/cyberuni/ts-esm-interop/tests/node16-es/commonjs/esm.default-as.all.js:6:35) {
  code: 'ERR_PACKAGE_PATH_NOT_EXPORTED'
}

Node.js v18.12.1
`
- `Error-1`: `Command failed: node esm.default.all.js
node:internal/modules/cjs/loader:535
      throw e;
      ^

Error [ERR_PACKAGE_PATH_NOT_EXPORTED]: No "exports" main defined in /home/homa/code/cyberuni/ts-esm-interop/tests/node16-es/node_modules/esm-cjs/package.json
    at new NodeError (node:internal/errors:393:5)
    at throwExportsNotFound (node:internal/modules/esm/resolve:358:9)
    at packageExportsResolve (node:internal/modules/esm/resolve:612:7)
    at resolveExports (node:internal/modules/cjs/loader:529:36)
    at Module._findPath (node:internal/modules/cjs/loader:569:31)
    at Module._resolveFilename (node:internal/modules/cjs/loader:981:27)
    at Module._load (node:internal/modules/cjs/loader:841:27)
    at Module.require (node:internal/modules/cjs/loader:1061:19)
    at require (node:internal/modules/cjs/helpers:103:18)
    at Object.<anonymous> (/home/homa/code/cyberuni/ts-esm-interop/tests/node16-es/commonjs/esm.default.all.js:6:35) {
  code: 'ERR_PACKAGE_PATH_NOT_EXPORTED'
}

Node.js v18.12.1
`
- `Error-2`: `Command failed: node esm.star.all.js
node:internal/modules/cjs/loader:535
      throw e;
      ^

Error [ERR_PACKAGE_PATH_NOT_EXPORTED]: No "exports" main defined in /home/homa/code/cyberuni/ts-esm-interop/tests/node16-es/node_modules/esm-cjs/package.json
    at new NodeError (node:internal/errors:393:5)
    at throwExportsNotFound (node:internal/modules/esm/resolve:358:9)
    at packageExportsResolve (node:internal/modules/esm/resolve:612:7)
    at resolveExports (node:internal/modules/cjs/loader:529:36)
    at Module._findPath (node:internal/modules/cjs/loader:569:31)
    at Module._resolveFilename (node:internal/modules/cjs/loader:981:27)
    at Module._load (node:internal/modules/cjs/loader:841:27)
    at Module.require (node:internal/modules/cjs/loader:1061:19)
    at require (node:internal/modules/cjs/helpers:103:18)
    at Object.<anonymous> (/home/homa/code/cyberuni/ts-esm-interop/tests/node16-es/commonjs/esm.star.all.js:26:24) {
  code: 'ERR_PACKAGE_PATH_NOT_EXPORTED'
}

Node.js v18.12.1
`
- `Error-3`: `Command failed: node esm-cjs.default-as.all.js
node:internal/modules/cjs/loader:535
      throw e;
      ^

Error [ERR_PACKAGE_PATH_NOT_EXPORTED]: No "exports" main defined in /home/homa/code/cyberuni/ts-esm-interop/tests/node16-es/node_modules/esm-cjs/package.json
    at new NodeError (node:internal/errors:393:5)
    at throwExportsNotFound (node:internal/modules/esm/resolve:358:9)
    at packageExportsResolve (node:internal/modules/esm/resolve:612:7)
    at resolveExports (node:internal/modules/cjs/loader:529:36)
    at Module._findPath (node:internal/modules/cjs/loader:569:31)
    at Module._resolveFilename (node:internal/modules/cjs/loader:981:27)
    at Module._load (node:internal/modules/cjs/loader:841:27)
    at Module.require (node:internal/modules/cjs/loader:1061:19)
    at require (node:internal/modules/cjs/helpers:103:18)
    at Object.<anonymous> (/home/homa/code/cyberuni/ts-esm-interop/tests/node16-es/commonjs/esm-cjs.default-as.all.js:6:35) {
  code: 'ERR_PACKAGE_PATH_NOT_EXPORTED'
}

Node.js v18.12.1
`
- `Error-4`: `Command failed: node esm-cjs.default.all.js
node:internal/modules/cjs/loader:535
      throw e;
      ^

Error [ERR_PACKAGE_PATH_NOT_EXPORTED]: No "exports" main defined in /home/homa/code/cyberuni/ts-esm-interop/tests/node16-es/node_modules/esm-cjs/package.json
    at new NodeError (node:internal/errors:393:5)
    at throwExportsNotFound (node:internal/modules/esm/resolve:358:9)
    at packageExportsResolve (node:internal/modules/esm/resolve:612:7)
    at resolveExports (node:internal/modules/cjs/loader:529:36)
    at Module._findPath (node:internal/modules/cjs/loader:569:31)
    at Module._resolveFilename (node:internal/modules/cjs/loader:981:27)
    at Module._load (node:internal/modules/cjs/loader:841:27)
    at Module.require (node:internal/modules/cjs/loader:1061:19)
    at require (node:internal/modules/cjs/helpers:103:18)
    at Object.<anonymous> (/home/homa/code/cyberuni/ts-esm-interop/tests/node16-es/commonjs/esm-cjs.default.all.js:6:35) {
  code: 'ERR_PACKAGE_PATH_NOT_EXPORTED'
}

Node.js v18.12.1
`
- `Error-5`: `Command failed: node esm-cjs.star.all.js
node:internal/modules/cjs/loader:535
      throw e;
      ^

Error [ERR_PACKAGE_PATH_NOT_EXPORTED]: No "exports" main defined in /home/homa/code/cyberuni/ts-esm-interop/tests/node16-es/node_modules/esm-cjs/package.json
    at new NodeError (node:internal/errors:393:5)
    at throwExportsNotFound (node:internal/modules/esm/resolve:358:9)
    at packageExportsResolve (node:internal/modules/esm/resolve:612:7)
    at resolveExports (node:internal/modules/cjs/loader:529:36)
    at Module._findPath (node:internal/modules/cjs/loader:569:31)
    at Module._resolveFilename (node:internal/modules/cjs/loader:981:27)
    at Module._load (node:internal/modules/cjs/loader:841:27)
    at Module.require (node:internal/modules/cjs/loader:1061:19)
    at require (node:internal/modules/cjs/helpers:103:18)
    at Object.<anonymous> (/home/homa/code/cyberuni/ts-esm-interop/tests/node16-es/commonjs/esm-cjs.star.all.js:26:24) {
  code: 'ERR_PACKAGE_PATH_NOT_EXPORTED'
}

Node.js v18.12.1
`
- `syntax`: `The requested module 'named-esm-cjs' does not provide an export named 'default'`
- `type`: `Cannot read properties of undefined (reading 'truthy')`
- `type-1`: `Cannot read properties of undefined (reading 'greet')`
- `type-not-fn`: `cjs_1.default.default is not a function`
- `type-not-fn-1`: `m.default.default is not a function`
- `type-not-fn-2`: `es_cjs_1.default.default is not a function`
- `type-not-fn-3`: `paramCase is not a function`

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

m.default()

```

[cjs.default.all.ts](./ts/cjs.default.all.ts):

```ts
import m from 'cjs'

m.default()

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

m.default()

```

[es-cjs.default.all.ts](./ts/es-cjs.default.all.ts):

```ts
import m from 'es-cjs'

m.default()

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

m()

```

[esm.default.all.ts](./ts/esm.default.all.ts):

```ts
import m from 'esm-cjs'

m()

```

[esm.star.all.ts](./ts/esm.star.all.ts):

```ts
import * as m from 'esm-cjs'

m.default()

```

### [esm-cjs](../../README.md#esm-cjs)

[esm-cjs.default-as.all.ts](./ts/esm-cjs.default-as.all.ts):

```ts
import { default as m } from 'esm-cjs'

m()

```

[esm-cjs.default.all.ts](./ts/esm-cjs.default.all.ts):

```ts
import m from 'esm-cjs'

m()

```

[esm-cjs.star.all.ts](./ts/esm-cjs.star.all.ts):

```ts
import * as m from 'esm-cjs'

m.default()

```

### [named-cjs](../../README.md#named-cjs)

[named-cjs.default-as.all.ts](./ts/named-cjs.default-as.all.ts):

```ts
import { default as m } from 'named-cjs'

m.greet()

```

[named-cjs.default.all.ts](./ts/named-cjs.default.all.ts):

```ts
import m from 'named-cjs'

m.greet()

```

[named-cjs.named.all.ts](./ts/named-cjs.named.all.ts):

```ts
import { greet } from 'named-cjs'

greet()

```

[named-cjs.star.all.ts](./ts/named-cjs.star.all.ts):

```ts
import * as m from 'named-cjs'

m.greet()


```

### [named-es-cjs](../../README.md#named-es-cjs)

[named-es-cjs.default-as.all.ts](./ts/named-es-cjs.default-as.all.ts):

```ts
import { default as m } from 'named-es-cjs'

m.greet()

```

[named-es-cjs.default.all.ts](./ts/named-es-cjs.default.all.ts):

```ts
import m from 'named-es-cjs'

m.greet()

```

[named-es-cjs.named.all.ts](./ts/named-es-cjs.named.all.ts):

```ts
import { greet } from 'named-es-cjs'

greet()

```

[named-es-cjs.star.all.ts](./ts/named-es-cjs.star.all.ts):

```ts
import * as m from 'named-es-cjs'

m.greet()


```

### [named-esm](../../README.md#named-esm)

### [named-esm-cjs](../../README.md#named-esm-cjs)

[named-esm-cjs.default-as.all.ts](./ts/named-esm-cjs.default-as.all.ts):

```ts
import { default as m } from 'named-esm-cjs'

m.greet()

```

[named-esm-cjs.default.all.ts](./ts/named-esm-cjs.default.all.ts):

```ts
import m from 'named-esm-cjs'

m.greet()

```

[named-esm-cjs.named.all.ts](./ts/named-esm-cjs.named.all.ts):

```ts
import { greet } from 'named-esm-cjs'

greet()

```

[named-esm-cjs.star.all.ts](./ts/named-esm-cjs.star.all.ts):

```ts
import * as m from 'named-esm-cjs'

m.greet()

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
