import { compile } from 'handlebars'
import fs from 'node:fs'
import path from 'node:path'
import { forEachKey, record } from 'type-plus'
import { CompileResult, PackageCompileResults, ProcessCompileContext } from './logic/compile'
import { TestSubjectsContext, getTestSubjects, toImportMap } from './logic/project'
import { RuntimeResult, runProject } from './logic/runtime'
import { reduceFlatMessage } from './logic/utils'

export function runRuntime(ctx: {
  project: string,
  moduleTypes: string[],
  projectPath: string,
  packageJson: any
} & ReturnType<typeof getTestSubjects>) {
  return {
    runtime: ctx.moduleTypes.map(moduleType => ({
      moduleType,
      results: runProject(ctx, moduleType)
    }))
  }
}

type RunRuntimeContext = ReturnType<typeof runRuntime>

export async function genTestResults(
  ctx: { moduleTypes: string[] } & TestSubjectsContext & ProcessCompileContext & RunRuntimeContext) {
  const results = await collectTestResults(ctx)
  const template = compile(fs.readFileSync(path.join(__dirname, '../templates/test-results.hbs'), 'utf8'))
  return template(results)
}

async function collectTestResults({ moduleTypes, subjects, compile, runtime }:
  { moduleTypes: string[] } & TestSubjectsContext & ProcessCompileContext & RunRuntimeContext) {
  const compileResults = await compile
  const runtimeResults = await Promise.all(runtime.map(async r => ({
    moduleType: r.moduleType,
    results: await r.results
  })))
  const results = moduleTypes.map(moduleType => ({
    moduleType,
    compileResults: compileResults[moduleType],
    runtimeResults: runtimeResults.find(r => r.moduleType === moduleType)!.results
  }))
  const errors = toErrorRecord(results)
  return {
    results: results.flatMap(({ moduleType, compileResults, runtimeResults }) => {
      return subjects.flatMap((s, i) => {
        const compileResult: Array<CompileResult> = compileResults[s.name]
        const runtimeResult = runtimeResults.find(r => r.subject === s.name)
        const compileImportMap = toImportMap(compileResult ? compileResult.map(c => {
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
        const runtimeImportMap = toImportMap(runtimeResult ? runtimeResult.results.map((r, i) => {
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
        forEachKey(runtimeImportMap, (k) => {
          if (!compileImportMap[k].value && runtimeImportMap[k].value) {
            runtimeImportMap[k].icon = '❌'
          }
          if (compileImportMap[k].value && !runtimeImportMap[k].value) {
            runtimeImportMap[k].icon = '🟡'
          }
        })
        return [{
          moduleType: i === 0 ? moduleType : undefined,
          package: s.name,
          type: '💻 compile',
          ...compileImportMap
        }, {
          type: '🏃 runtime',
          ...runtimeImportMap
        }]
      })
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
