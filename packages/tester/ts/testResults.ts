import { compile } from 'handlebars'
import fs from 'node:fs'
import path from 'node:path'
import { forEachKey, record } from 'type-plus'
import { CompileResult, ProcessCompileContext } from './logic/compile'
import { TestSubjectsContext } from './logic/project'
import { RunRuntimeContext, RuntimeResult } from './logic/runtime'
import { reduceFlatMessage } from './logic/utils'


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
    compileResults: compileResults.filter(c => c.moduleType === moduleType),
    runtimeResults: runtimeResults.find(r => r.moduleType === moduleType)!.results
  }))
  const errors = toErrorRecord(results)
  return {
    results: results.flatMap(({ moduleType, compileResults, runtimeResults }) => {
      return subjects.flatMap((s, i) => {
        const compileResult: Array<CompileResult> = compileResults.filter(c => c.subject === s.name)
        const runtimeResult = runtimeResults.find(r => r.subject === s.name)
        const compileImportMap = toImportMap(compileResult
          ? compileResult.map(c => ({
            importType: c.importType,
            transient: c.transient,
            value: errors.compile.find(e => e.message === c.messageText)?.key ?? ''
          }))
          : s.files.map(f => ({ importType: f.importType })))
        const runtimeImportMap = toImportMap(runtimeResult
          ? runtimeResult.results.map((r) => ({
            importType: r.importType,
            transient: false,
            value: errors.runtime.find(e => e.message === extractRuntimeErrorMessage(r.error))?.key ?? ''
          }))
          : s.files.map(f => ({ importType: f.importType })))
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
  compileResults: CompileResult[],
  runtimeResults: Array<RuntimeResult>
}>) {
  return {
    compile: toErrorListForCompile(results),
    runtime: toErrorListForRuntime(results)
  }
}
function toErrorListForCompile(results: Array<{ compileResults: CompileResult[] }>) {
  return reduceFlatMessage(results.flatMap(r => r.compileResults)
    .reduce((p, value) => {
      if (value.messageText) {
        const key = extractCompileErrorKey(value)
        const e = p[key] = p[key] ?? []
        if (e.indexOf(value.messageText) === -1)
          e.push(value.messageText)
      }
      return p
    }, record<string, string[]>()))
    .sort((a, b) => a.key > b.key ? 1 : -1)
}

function extractCompileErrorKey(result: CompileResult) {
  const e = result?.messageText?.includes('esModuleInterop')
  const a = result?.messageText?.includes('allowSyntheticDefaultImports')
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
  if (/SyntaxError: /.test(message)) {
    return 'syntax'
  }
  return error.name
}

export function extractRuntimeErrorMessage(error?: Error) {
  if (!error) return ''
  const match = error.message.split('\n').map(line => /Error: (.*)$/.exec(line)).find(x => x)
  return match ? match[1] : error.message
}

function toImportMap(results: Array<{
  importType: string,
  notApply?: boolean,
  transient?: boolean
  value?: string,
}> | undefined) {
  return {
    'importDefault': toImportMapEntry(results, 'default'),
    'importDefaultAs': toImportMapEntry(results, 'default-as'),
    'importStarAs': toImportMapEntry(results, 'star'),
    'importNamed': toImportMapEntry(results, 'named'),
  }
}

function toImportMapEntry(results: Array<{
  importType: string,
  notApply?: boolean,
  value?: string,
  transient?: boolean
}> | undefined, importType: string) {
  const entry = results?.find(r => r.importType === importType || r.importType === 'all')
  if (entry) {
    if (entry.notApply) {
      return {
        icon: '➖'
      }
    }
    return {
      icon: entry.value ? entry.transient ? '🟡' : '🔴' : '🟢',
      value: entry.value
    }
  }
  else {
    return {
      icon: '➖', //'🟢',
      value: ''
    }
  }
}
