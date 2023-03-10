# TypeScript Module System Demo

TypeScript: 4.9.4

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

| module   | Package       | Type      | import: default as | import: default   | import: * as      | import: { named } |
| -------- | ------------- | --------- | ------------------ | ----------------- | ----------------- | ----------------- |
| commonjs | assert        | 💻 compile | 🔴 TS1259-e         | 🔴 TS1259-e        | 🟢                 | ➖                 |
|          |               | 🏃 runtime | 🔴 type-not-fn      | 🔴 type-not-fn     | 🟢                 | ➖                 |
|          | assertron     | 💻 compile | 🟡 TS1259-e-t       | 🟡 TS1259-e-t      | 🟡 TS1259-e-t      | ➖                 |
|          |               | 🏃 runtime | 🟡                  | 🟡                 | 🟡                 | ➖                 |
|          | cjs           | 💻 compile | 🟢                  | 🟢                 | 🟢                 | ➖                 |
|          |               | 🏃 runtime | 🟢                  | 🟢                 | 🟢                 | ➖                 |
|          | es-cjs        | 💻 compile | 🟢                  | 🟢                 | 🟢                 | ➖                 |
|          |               | 🏃 runtime | 🟢                  | 🟢                 | 🟢                 | ➖                 |
|          | esm           | 💻 compile | ➖                  | ➖                 | ➖                 | ➖                 |
|          |               | 🏃 runtime | ➖                  | ➖                 | ➖                 | ➖                 |
|          | esm-cjs       | 💻 compile | 🟢                  | 🟢                 | 🟢                 | ➖                 |
|          |               | 🏃 runtime | 🟢                  | 🟢                 | 🟢                 | ➖                 |
|          | named-cjs     | 💻 compile | ➖                  | ➖                 | 🟢                 | 🟢                 |
|          |               | 🏃 runtime | 🟢                  | ➖                 | 🟢                 | 🟢                 |
|          | named-es-cjs  | 💻 compile | ➖                  | ➖                 | 🟢                 | 🟢                 |
|          |               | 🏃 runtime | 🟢                  | ➖                 | 🟢                 | 🟢                 |
|          | named-esm     | 💻 compile | ➖                  | ➖                 | ➖                 | ➖                 |
|          |               | 🏃 runtime | ➖                  | ➖                 | ➖                 | ➖                 |
|          | named-esm-cjs | 💻 compile | ➖                  | ➖                 | 🟢                 | 🟢                 |
|          |               | 🏃 runtime | 🟢                  | ➖                 | 🟢                 | 🟢                 |
|          | param-case    | 💻 compile | 🔴 TS1259-e-1       | 🔴 TS1259-e-1      | 🔴 TS2497-e        | ➖                 |
|          |               | 🏃 runtime | 🔴 type-not-fn-1    | 🔴 type-not-fn-1   | 🟡                 | ➖                 |
| es2015   | assert        | 💻 compile | 🔴 TS1259-a         | 🔴 TS1259-a        | 🟢                 | ➖                 |
|          |               | 🏃 runtime | 🟡                  | 🟡                 | ❌ type-not-fn-2   | ➖                 |
|          | assertron     | 💻 compile | 🟡 TS1259-a-t       | 🟡 TS1259-a-t      | 🟡 TS1259-a-t      | ➖                 |
|          |               | 🏃 runtime | 🔴 type-not-fn-3    | 🔴 type-not-fn-3   | 🔴 type-not-fn-4   | ➖                 |
|          | cjs           | 💻 compile | 🟢                  | 🟢                 | 🟢                 | ➖                 |
|          |               | 🏃 runtime | ❌ type-not-fn-5    | ❌ type-not-fn-5   | ❌ type-not-fn-6   | ➖                 |
|          | es-cjs        | 💻 compile | 🟢                  | 🟢                 | 🟢                 | ➖                 |
|          |               | 🏃 runtime | ❌ type-not-fn-5    | ❌ type-not-fn-5   | ❌ type-not-fn-6   | ➖                 |
|          | esm           | 💻 compile | ➖                  | ➖                 | ➖                 | ➖                 |
|          |               | 🏃 runtime | ➖                  | ➖                 | ➖                 | ➖                 |
|          | esm-cjs       | 💻 compile | 🟢                  | 🟢                 | 🟢                 | ➖                 |
|          |               | 🏃 runtime | 🟢                  | 🟢                 | 🟢                 | ➖                 |
|          | named-cjs     | 💻 compile | ➖                  | ➖                 | 🟢                 | 🟢                 |
|          |               | 🏃 runtime | 🟢                  | ➖                 | 🟢                 | 🟢                 |
|          | named-es-cjs  | 💻 compile | ➖                  | ➖                 | 🟢                 | 🟢                 |
|          |               | 🏃 runtime | 🟢                  | ➖                 | 🟢                 | 🟢                 |
|          | named-esm     | 💻 compile | ➖                  | ➖                 | ➖                 | ➖                 |
|          |               | 🏃 runtime | ➖                  | ➖                 | ➖                 | ➖                 |
|          | named-esm-cjs | 💻 compile | ➖                  | ➖                 | 🟢                 | 🟢                 |
|          |               | 🏃 runtime | 🟢                  | ➖                 | 🟢                 | 🟢                 |
|          | param-case    | 💻 compile | 🔴 TS1259-a-1       | 🔴 TS1259-a-1      | 🔴 TS2497-a        | ➖                 |
|          |               | 🏃 runtime | 🟡                  | 🟡                 | 🔴 type-not-fn-7   | ➖                 |
| es2020   | assert        | 💻 compile | 🔴 TS1259-a         | 🔴 TS1259-a        | 🟢                 | ➖                 |
|          |               | 🏃 runtime | 🟡                  | 🟡                 | ❌ type-not-fn-2   | ➖                 |
|          | assertron     | 💻 compile | 🟡 TS1259-a-t       | 🟡 TS1259-a-t      | 🟡 TS1259-a-t      | ➖                 |
|          |               | 🏃 runtime | 🔴 type-not-fn-3    | 🔴 type-not-fn-3   | 🔴 type-not-fn-4   | ➖                 |
|          | cjs           | 💻 compile | 🟢                  | 🟢                 | 🟢                 | ➖                 |
|          |               | 🏃 runtime | ❌ type-not-fn-5    | ❌ type-not-fn-5   | ❌ type-not-fn-6   | ➖                 |
|          | es-cjs        | 💻 compile | 🟢                  | 🟢                 | 🟢                 | ➖                 |
|          |               | 🏃 runtime | ❌ type-not-fn-5    | ❌ type-not-fn-5   | ❌ type-not-fn-6   | ➖                 |
|          | esm           | 💻 compile | ➖                  | ➖                 | ➖                 | ➖                 |
|          |               | 🏃 runtime | ➖                  | ➖                 | ➖                 | ➖                 |
|          | esm-cjs       | 💻 compile | 🟢                  | 🟢                 | 🟢                 | ➖                 |
|          |               | 🏃 runtime | 🟢                  | 🟢                 | 🟢                 | ➖                 |
|          | named-cjs     | 💻 compile | ➖                  | ➖                 | 🟢                 | 🟢                 |
|          |               | 🏃 runtime | 🟢                  | ➖                 | 🟢                 | 🟢                 |
|          | named-es-cjs  | 💻 compile | ➖                  | ➖                 | 🟢                 | 🟢                 |
|          |               | 🏃 runtime | 🟢                  | ➖                 | 🟢                 | 🟢                 |
|          | named-esm     | 💻 compile | ➖                  | ➖                 | ➖                 | ➖                 |
|          |               | 🏃 runtime | ➖                  | ➖                 | ➖                 | ➖                 |
|          | named-esm-cjs | 💻 compile | ➖                  | ➖                 | 🟢                 | 🟢                 |
|          |               | 🏃 runtime | 🟢                  | ➖                 | 🟢                 | 🟢                 |
|          | param-case    | 💻 compile | 🔴 TS1259-a-1       | 🔴 TS1259-a-1      | 🔴 TS2497-a        | ➖                 |
|          |               | 🏃 runtime | 🟡                  | 🟡                 | 🔴 type-not-fn-7   | ➖                 |
| es2022   | assert        | 💻 compile | 🔴 TS1259-a         | 🔴 TS1259-a        | 🟢                 | ➖                 |
|          |               | 🏃 runtime | 🟡                  | 🟡                 | ❌ type-not-fn-2   | ➖                 |
|          | assertron     | 💻 compile | 🟡 TS1259-a-t       | 🟡 TS1259-a-t      | 🟡 TS1259-a-t      | ➖                 |
|          |               | 🏃 runtime | 🔴 type-not-fn-3    | 🔴 type-not-fn-3   | 🔴 type-not-fn-4   | ➖                 |
|          | cjs           | 💻 compile | 🟢                  | 🟢                 | 🟢                 | ➖                 |
|          |               | 🏃 runtime | ❌ type-not-fn-5    | ❌ type-not-fn-5   | ❌ type-not-fn-6   | ➖                 |
|          | es-cjs        | 💻 compile | 🟢                  | 🟢                 | 🟢                 | ➖                 |
|          |               | 🏃 runtime | ❌ type-not-fn-5    | ❌ type-not-fn-5   | ❌ type-not-fn-6   | ➖                 |
|          | esm           | 💻 compile | ➖                  | ➖                 | ➖                 | ➖                 |
|          |               | 🏃 runtime | ➖                  | ➖                 | ➖                 | ➖                 |
|          | esm-cjs       | 💻 compile | 🟢                  | 🟢                 | 🟢                 | ➖                 |
|          |               | 🏃 runtime | 🟢                  | 🟢                 | 🟢                 | ➖                 |
|          | named-cjs     | 💻 compile | ➖                  | ➖                 | 🟢                 | 🟢                 |
|          |               | 🏃 runtime | 🟢                  | ➖                 | 🟢                 | 🟢                 |
|          | named-es-cjs  | 💻 compile | ➖                  | ➖                 | 🟢                 | 🟢                 |
|          |               | 🏃 runtime | 🟢                  | ➖                 | 🟢                 | 🟢                 |
|          | named-esm     | 💻 compile | ➖                  | ➖                 | ➖                 | ➖                 |
|          |               | 🏃 runtime | ➖                  | ➖                 | ➖                 | ➖                 |
|          | named-esm-cjs | 💻 compile | ➖                  | ➖                 | 🟢                 | 🟢                 |
|          |               | 🏃 runtime | 🟢                  | ➖                 | 🟢                 | 🟢                 |
|          | param-case    | 💻 compile | 🔴 TS1259-a-1       | 🔴 TS1259-a-1      | 🔴 TS2497-a        | ➖                 |
|          |               | 🏃 runtime | 🟡                  | 🟡                 | 🔴 type-not-fn-7   | ➖                 |
| esnext   | assert        | 💻 compile | 🔴 TS1259-a         | 🔴 TS1259-a        | 🟢                 | ➖                 |
|          |               | 🏃 runtime | 🟡                  | 🟡                 | ❌ type-not-fn-2   | ➖                 |
|          | assertron     | 💻 compile | 🟡 TS1259-a-t       | 🟡 TS1259-a-t      | 🟡 TS1259-a-t      | ➖                 |
|          |               | 🏃 runtime | 🔴 type-not-fn-3    | 🔴 type-not-fn-3   | 🔴 type-not-fn-4   | ➖                 |
|          | cjs           | 💻 compile | 🟢                  | 🟢                 | 🟢                 | ➖                 |
|          |               | 🏃 runtime | ❌ type-not-fn-5    | ❌ type-not-fn-5   | ❌ type-not-fn-6   | ➖                 |
|          | es-cjs        | 💻 compile | 🟢                  | 🟢                 | 🟢                 | ➖                 |
|          |               | 🏃 runtime | ❌ type-not-fn-5    | ❌ type-not-fn-5   | ❌ type-not-fn-6   | ➖                 |
|          | esm           | 💻 compile | ➖                  | ➖                 | ➖                 | ➖                 |
|          |               | 🏃 runtime | ➖                  | ➖                 | ➖                 | ➖                 |
|          | esm-cjs       | 💻 compile | 🟢                  | 🟢                 | 🟢                 | ➖                 |
|          |               | 🏃 runtime | 🟢                  | 🟢                 | 🟢                 | ➖                 |
|          | named-cjs     | 💻 compile | ➖                  | ➖                 | 🟢                 | 🟢                 |
|          |               | 🏃 runtime | 🟢                  | ➖                 | 🟢                 | 🟢                 |
|          | named-es-cjs  | 💻 compile | ➖                  | ➖                 | 🟢                 | 🟢                 |
|          |               | 🏃 runtime | 🟢                  | ➖                 | 🟢                 | 🟢                 |
|          | named-esm     | 💻 compile | ➖                  | ➖                 | ➖                 | ➖                 |
|          |               | 🏃 runtime | ➖                  | ➖                 | ➖                 | ➖                 |
|          | named-esm-cjs | 💻 compile | ➖                  | ➖                 | 🟢                 | 🟢                 |
|          |               | 🏃 runtime | 🟢                  | ➖                 | 🟢                 | 🟢                 |
|          | param-case    | 💻 compile | 🔴 TS1259-a-1       | 🔴 TS1259-a-1      | 🔴 TS2497-a        | ➖                 |
|          |               | 🏃 runtime | 🟡                  | 🟡                 | 🔴 type-not-fn-7   | ➖                 |
| node16   | assert        | 💻 compile | 🔴 TS1259-a         | 🔴 TS1259-a        | 🟢                 | ➖                 |
|          |               | 🏃 runtime | 🔴 ref-not-defined  | 🔴 ref-not-defined | ❌ ref-not-defined | ➖                 |
|          | assertron     | 💻 compile | 🟡 TS1259-a-t       | 🟡 TS1259-a-t      | 🟡 TS1259-a-t      | ➖                 |
|          |               | 🏃 runtime | 🔴 ref-not-defined  | 🔴 ref-not-defined | 🔴 ref-not-defined | ➖                 |
|          | cjs           | 💻 compile | 🟢                  | 🟢                 | 🟢                 | ➖                 |
|          |               | 🏃 runtime | ❌ ref-not-defined  | ❌ ref-not-defined | ❌ ref-not-defined | ➖                 |
|          | es-cjs        | 💻 compile | 🟢                  | 🟢                 | 🟢                 | ➖                 |
|          |               | 🏃 runtime | ❌ ref-not-defined  | ❌ ref-not-defined | ❌ ref-not-defined | ➖                 |
|          | esm           | 💻 compile | ➖                  | ➖                 | ➖                 | ➖                 |
|          |               | 🏃 runtime | ➖                  | ➖                 | ➖                 | ➖                 |
|          | esm-cjs       | 💻 compile | 🟢                  | 🟢                 | 🟢                 | ➖                 |
|          |               | 🏃 runtime | ❌ ref-not-defined  | ❌ ref-not-defined | ❌ ref-not-defined | ➖                 |
|          | named-cjs     | 💻 compile | ➖                  | ➖                 | 🟢                 | 🟢                 |
|          |               | 🏃 runtime | ❌ ref-not-defined  | ➖                 | ❌ ref-not-defined | ❌ ref-not-defined |
|          | named-es-cjs  | 💻 compile | ➖                  | ➖                 | 🟢                 | 🟢                 |
|          |               | 🏃 runtime | ❌ ref-not-defined  | ➖                 | ❌ ref-not-defined | ❌ ref-not-defined |
|          | named-esm     | 💻 compile | ➖                  | ➖                 | ➖                 | ➖                 |
|          |               | 🏃 runtime | ➖                  | ➖                 | ➖                 | ➖                 |
|          | named-esm-cjs | 💻 compile | ➖                  | ➖                 | 🟢                 | 🟢                 |
|          |               | 🏃 runtime | ❌ ref-not-defined  | ➖                 | ❌ ref-not-defined | ❌ ref-not-defined |
|          | param-case    | 💻 compile | 🔴 TS1259-a-1       | 🔴 TS1259-a-1      | 🔴 TS2497-a        | ➖                 |
|          |               | 🏃 runtime | 🔴 ref-not-defined  | 🔴 ref-not-defined | 🔴 ref-not-defined | ➖                 |
| nodenext | assert        | 💻 compile | 🔴 TS1259-a         | 🔴 TS1259-a        | 🟢                 | ➖                 |
|          |               | 🏃 runtime | 🔴 ref-not-defined  | 🔴 ref-not-defined | ❌ ref-not-defined | ➖                 |
|          | assertron     | 💻 compile | 🟡 TS1259-a-t       | 🟡 TS1259-a-t      | 🟡 TS1259-a-t      | ➖                 |
|          |               | 🏃 runtime | 🔴 ref-not-defined  | 🔴 ref-not-defined | 🔴 ref-not-defined | ➖                 |
|          | cjs           | 💻 compile | 🟢                  | 🟢                 | 🟢                 | ➖                 |
|          |               | 🏃 runtime | ❌ ref-not-defined  | ❌ ref-not-defined | ❌ ref-not-defined | ➖                 |
|          | es-cjs        | 💻 compile | 🟢                  | 🟢                 | 🟢                 | ➖                 |
|          |               | 🏃 runtime | ❌ ref-not-defined  | ❌ ref-not-defined | ❌ ref-not-defined | ➖                 |
|          | esm           | 💻 compile | ➖                  | ➖                 | ➖                 | ➖                 |
|          |               | 🏃 runtime | ➖                  | ➖                 | ➖                 | ➖                 |
|          | esm-cjs       | 💻 compile | 🟢                  | 🟢                 | 🟢                 | ➖                 |
|          |               | 🏃 runtime | ❌ ref-not-defined  | ❌ ref-not-defined | ❌ ref-not-defined | ➖                 |
|          | named-cjs     | 💻 compile | ➖                  | ➖                 | 🟢                 | 🟢                 |
|          |               | 🏃 runtime | ❌ ref-not-defined  | ➖                 | ❌ ref-not-defined | ❌ ref-not-defined |
|          | named-es-cjs  | 💻 compile | ➖                  | ➖                 | 🟢                 | 🟢                 |
|          |               | 🏃 runtime | ❌ ref-not-defined  | ➖                 | ❌ ref-not-defined | ❌ ref-not-defined |
|          | named-esm     | 💻 compile | ➖                  | ➖                 | ➖                 | ➖                 |
|          |               | 🏃 runtime | ➖                  | ➖                 | ➖                 | ➖                 |
|          | named-esm-cjs | 💻 compile | ➖                  | ➖                 | 🟢                 | 🟢                 |
|          |               | 🏃 runtime | ❌ ref-not-defined  | ➖                 | ❌ ref-not-defined | ❌ ref-not-defined |
|          | param-case    | 💻 compile | 🔴 TS1259-a-1       | 🔴 TS1259-a-1      | 🔴 TS2497-a        | ➖                 |
|          |               | 🏃 runtime | 🔴 ref-not-defined  | 🔴 ref-not-defined | 🔴 ref-not-defined | ➖                 |

- `TS1259-a`: `Module '"assert"' can only be default-imported using the 'allowSyntheticDefaultImports' flag`
- `TS1259-a-1`: `Module '"/home/homa/code/cyberuni/ts-esm-interop/node_modules/.pnpm/param-case@1.1.2/node_modules/param-case/param-case"' can only be default-imported using the 'allowSyntheticDefaultImports' flag`
- `TS1259-a-t`: `Module '"/home/homa/code/cyberuni/ts-esm-interop/node_modules/.pnpm/assertion-error@1.1.0/node_modules/assertion-error/index"' can only be default-imported using the 'allowSyntheticDefaultImports' flag`
- `TS1259-e`: `Module '"assert"' can only be default-imported using the 'esModuleInterop' flag`
- `TS1259-e-1`: `Module '"/home/homa/code/cyberuni/ts-esm-interop/node_modules/.pnpm/param-case@1.1.2/node_modules/param-case/param-case"' can only be default-imported using the 'esModuleInterop' flag`
- `TS1259-e-t`: `Module '"/home/homa/code/cyberuni/ts-esm-interop/node_modules/.pnpm/assertion-error@1.1.0/node_modules/assertion-error/index"' can only be default-imported using the 'esModuleInterop' flag`
- `TS2497-a`: `This module can only be referenced with ECMAScript imports/exports by turning on the 'allowSyntheticDefaultImports' flag and referencing its default export.`
- `TS2497-e`: `This module can only be referenced with ECMAScript imports/exports by turning on the 'esModuleInterop' flag and referencing its default export.`
- `ref-not-defined`: `exports is not defined in ES module scope`
- `type-not-fn`: `(0 , assert_1.default) is not a function`
- `type-not-fn-1`: `(0 , param_case_1.default) is not a function`
- `type-not-fn-2`: `assert is not a function`
- `type-not-fn-3`: `assertron.truthy is not a function`
- `type-not-fn-4`: `assertron.default.truthy is not a function`
- `type-not-fn-5`: `m is not a function`
- `type-not-fn-6`: `m.default is not a function`
- `type-not-fn-7`: `paramCase is not a function`

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

assert(true)

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

m()

```

[cjs.default.all.ts](./ts/cjs.default.all.ts):

```ts
import m from 'cjs'

m()

```

[cjs.star.all.ts](./ts/cjs.star.all.ts):

```ts
import * as m from 'cjs'

m.default()


```

### [es-cjs](../../README.md#es-cjs)

[es-cjs.default-as.all.ts](./ts/es-cjs.default-as.all.ts):

```ts
import { default as m } from 'es-cjs'

m()

```

[es-cjs.default.all.ts](./ts/es-cjs.default.all.ts):

```ts
import m from 'es-cjs'

m()

```

[es-cjs.star.all.ts](./ts/es-cjs.star.all.ts):

```ts
import * as m from 'es-cjs'

m.default()

```

### [esm](../../README.md#esm)

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
