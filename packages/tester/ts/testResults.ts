import { compile } from 'handlebars'
import fs from 'node:fs'
import path from 'node:path'
import { AwaitedProp, record } from 'type-plus'
import { CompileResult, PackageCompileResults, compileProject } from './logic/compile'
import { getTestSubjects, toImportMap } from './logic/project'
import { RuntimeResult, runProject } from './logic/runtime'
import { reduceFlatMessage } from './logic/utils'

export function runCompile(ctx: {
  project: string,
  projectPath: string,
}) {
  return {
    compile: compileProject(ctx)
  }
}

export function runRuntime(ctx: {
  project: string,
  moduleTypes: string[],
  projectPath: string,
  packageJson: any
} & ReturnType<typeof getTestSubjects>) {
  return {
    runtime: Promise.all(ctx.moduleTypes.map(moduleType => ({
      moduleType,
      results: runProject(ctx, moduleType)
    })))
  }
}

export function runCompileAndRuntimeTests(ctx: {
  project: string,
  moduleTypes: string[],
  projectPath: string,
  packageJson: any
} & ReturnType<typeof getTestSubjects>) {
  return {
    results: compileProject(ctx)
      .then(compileResults => Promise.all(
        ctx.moduleTypes.map(moduleType =>
          runProject(ctx, moduleType).then(runtimeResults => ({
            moduleType,
            compileResults: compileResults[moduleType],
            runtimeResults
          }))))
      )
  }
}

type TestSubjectsContext = ReturnType<typeof getTestSubjects>
type TestResultsContext = AwaitedProp<ReturnType<typeof runCompileAndRuntimeTests>, 'results'>

export function genTestResults(
  ctx: TestSubjectsContext & TestResultsContext) {
  const results = collectTestResults(ctx)
  const template = compile(fs.readFileSync(path.join(__dirname, '../templates/test-results.hbs'), 'utf8'))
  return template(results)
}

function collectTestResults({ subjects, results }: TestSubjectsContext & TestResultsContext) {
  const errors = toErrorRecord(results)
  return {
    results: results.flatMap(({ moduleType, compileResults, runtimeResults }) => {
      return subjects.flatMap((s, i) => {
        const compileResult = compileResults[s.name]
        const runtimeResult = runtimeResults.find(r => r.name === s.name)
        return [{
          moduleType: i === 0 ? moduleType : undefined,
          package: s.name,
          type: '💻 compile',
          ...toImportMap(compileResult ? compileResult.map(c => {
            const error = errors.compile.find(e => e.message === c.messageText)
            return {
              importType: c.importType,
              transient: c.transient,
              value: error?.key ?? ''
            }
          }) : (s.files.length === 0 ? [
            { importType: 'default', notApply: true },
            { importType: 'default-as', notApply: true },
            { importType: 'star', notApply: true },
          ] : [
            { importType: 'default', },
            { importType: 'default-as' },
            { importType: 'star' },
          ]))
        }, {
          type: '🏃 runtime',
          ...toImportMap(runtimeResult ? runtimeResult.results.map(r => {
            const error = errors.runtime.find(e => e.message === extractRuntimeErrorMessage(r.error))
            return {
              importType: r.importType,
              transient: false,
              value: error?.key ?? ''
            }
          }) : (s.files.length === 0 ? [
            { importType: 'default', notApply: true },
            { importType: 'default-as', notApply: true },
            { importType: 'star', notApply: true },
          ] : [
            { importType: 'default', },
            { importType: 'default-as' },
            { importType: 'star' },
          ]))
        }]
      })
      // return runtimeResults.flatMap((r, i) => {
      //   return [{
      //     moduleType: i === 0 ? moduleType : undefined,
      //     package: r.name,
      //     type: '💻 compile',
      //     ...toImportMap(compileResults[r.name]?.map(c => {
      //       const error = errors.compile.find(e => e.message === c.messageText)
      //       return {
      //         importType: c.importType,
      //         transient: c.transient,
      //         value: error?.key ?? ''
      //       }
      //     }))
      //   }, {
      //     moduleType: undefined,
      //     package: r.name,
      //     type: '🏃 runtime',
      //     ...toImportMap(r.results.map(r => {
      //       const error = errors.runtime.find(e => e.message === extractRuntimeErrorMessage(r.error))
      //       return {
      //         importType: r.importType,
      //         transient: false,
      //         value: error?.key ?? ''
      //       }
      //     }))
      //   }]
      // })
    }),
    errors: [...errors.compile, ...errors.runtime]
  }
}

function toErrorRecord(results: Array<{
  moduleType: string
  compileResults: PackageCompileResults,
  runtimeResults: Array<RuntimeResult>
}>) {
  return {
    compile: toErrorListForCompile(results),
    runtime: toErrorListForRuntime(results)
  }
}
function toErrorListForCompile(results: Array<{ compileResults: PackageCompileResults }>) {
  return reduceFlatMessage(results.map(r => r.compileResults)
    .reduce((p, packageCompileResults) => {
      for (let key in packageCompileResults) {
        p.push(...packageCompileResults[key])
      }
      return p
    }, [] as CompileResult[])
    .reduce((p, value) => {
      const key = extractCompileErrorKey(value)
      const e = p[key] = p[key] ?? []
      if (e.indexOf(value.messageText) === -1)
        e.push(value.messageText)
      return p
    }, record<string, string[]>()))
    .sort((a, b) => a.key > b.key ? 1 : -1)
}

function extractCompileErrorKey(result: CompileResult) {
  const e = result.messageText.includes('esModuleInterop')
  const a = result.messageText.includes('allowSyntheticDefaultImports')
  return `TS${result.code}${e ? '-e' : ''}${a ? '-a' : ''}${result.transient ? '-t' : ''}`
}

function toErrorListForRuntime(results: Array<{ runtimeResults: Array<RuntimeResult> }>) {
  return reduceFlatMessage(results.flatMap(r => r.runtimeResults)
    .flatMap(r => r.results)
    .filter(r => r.error)
    .reduce((p, r) => {
      const key = extractRuntimeErrorKey(r.error!)
      const message = extractRuntimeErrorMessage(r.error!)

      const e = p[key] = p[key] ?? []
      if (!e.some(e => e === message))
        e.push(message)
      return p
    }, record<string, string[]>()))
    .sort((a, b) => a.key > b.key ? 1 : -1)
}

/**
 * @param error from exec(). Generic Error.
 */
function extractRuntimeErrorKey(error: Error) {
  const message = error.message
  if (/TypeError: /.test(message)) {
    if (error.message.includes('is not a function')) {
      return `type-not-fn`
    }
    return 'type'
  }
  if (/ReferenceError: /.test(message)) {
    if (error.message.includes('is not defined')) {
      return `ref-not-defined`
    }
    return 'ref'
  }
  return error.name
}

export function extractRuntimeErrorMessage(error?: Error) {
  if (!error) return ''
  const match = /\n\n([^\n]*)/.exec(error.message)
  return match ? match[1] : error.message
}
