# TypeScirpt Module Behavior Test

This repository demostrate the behavior of TypeScript module system.

## Objectives

This repository tries to answer the following questions:

- How to write your code when using certain settings?
- Does the code compile?
- Is the compile result correct?
- Which setting should you use in different situations?

It is currently tests against TypeScript 5.0.0-dev.20230103

## Design

This repository is organized as a monorepo.
Each project contains a specific `tsconfig.json` setting:

| project                                  | `moduleResolution` | `esModuleInterop` | `allowSyntheticDefaultImports` |
| ---------------------------------------- | ------------------ | ----------------- | ------------------------------ |
| [node](./node/README.md)                 | `Node`             | `false`           | `false`                        |
| [node-es](./node-es/README.md)           | `Node`             | `true`            | `(true)`                       |
| [node-syn](./node-syn/README.md)         | `Node`             | `false`           | `true`                         |
| [node16](./node16/README.md)             | `Node16`           | `false`           | `false`                        |
| [node16-es](./node16-es/README.md)       | `Node16`           | `true`            | `(true)`                       |
| [node16-syn](./node16-syn/README.md)     | `Node16`           | `false`           | `true`                         |
| [nodenext](./nodenext/README.md)         | `NodeNext`         | `false`           | `false`                        |
| [nodenext-es](./nodenext-es/README.md)   | `NodeNext`         | `true`            | `(true)`                       |
| [nodenext-syn](./nodenext-syn/README.md) | `NodeNext`         | `false`           | `true`                         |

Note that when `esModuleInterop` is `true`, `allowSyntheticDefaultImports` will automatically be `true`.

Within each project, there are `tsconfig.*.json` for different `module` setting:

- `CommonJS`
- `ES2015`
- `ES2020`
- `ES2022`
- `ESNext`
- `Node16`
- `NodeNext`

The other `module` values are not tested.

Every project references 3 packages:

- `assert`: represents a module with `declare module` + `export =` declaration
- `param-case`: represents a package with `export =` declaration
- `assertron`: represents a package compiled by `tsc` to CJS with `export default` declaration

Each project will be compiled with `tsc` (`build`), and tested with `ava` (`test`).

## Running the tests

- `pnpm build`: build all projects
- `pnpm test`: test all projects (after build)
- `pnpm clean`: delete all build results
- `pnpm build:<x>`: build all project with specific `module` setting.\
  e.g. `build:cjs` to build all projects with `CommonJS`
- `pnpm test:<x>`: test all project with specific `module` setting.\
  e.g. `test:node16` to build all projects with `Node16`
- `pnpm <project> <command>`: run command in specific project.\
  e.g. `pnpm node16-syn build` to build the `node16-syn` project.

## TODO

- need to clean up the c* error list one more time
