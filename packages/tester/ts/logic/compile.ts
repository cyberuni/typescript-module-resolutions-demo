import cp from 'child_process'
import { EOL } from 'node:os'
import { ResultEntry, copyCommonJSPackageJson } from './project'

/**
 * { [moduleType]: { [package]: CompileResult[] } }
 */
export type CompileResults = Record<string, PackageCompileResults>

/**
 * { [package]: CompileResult[] } }
 */
export type PackageCompileResults = Record<string, Array<CompileResult>>

export type CompileResult = ResultEntry & {
  code: number,
  messageText: string
}

export function runCompile(ctx: {
  project: string,
  projectPath: string,
}) {
  return {
    compileRaw: compileProject(ctx)
  }
}

export type RunCompileContext = ReturnType<typeof runCompile>

async function compileProject(ctx: { project: string, projectPath: string }) {
  return new Promise<string>(a => {
    cp.exec(`pnpm ${ctx.project} build`, (_err, stdout) => {
      a(stdout)
    })
  })
    .then((raw) => {
      copyCommonJSPackageJson(ctx)
      return raw
    })
}

export function processCompileResults({ compileRaw }: RunCompileContext) {

  return {
    compile: compileRaw.then(extractCompileResults)
  }
}

export type ProcessCompileContext = ReturnType<typeof processCompileResults>

function extractCompileResults(stdout: string) {
  const lines = stdout.split(EOL)
    .map<[moduleType: string, filename: string, code: string, msg: string]>(
      s => /^\[build\:([^\s]*)\s*\] ([^(]*).*error TS(\d*): ([^\n]*)/.exec(s)?.slice(1) as any
    ).filter(Boolean)
  return lines.reduce((p, [moduleType, filename, code, messageText]) => {
    const entry = getResultEntry(filename)
    const m = p[moduleType] = p[moduleType] || {}
    const a = m[entry.packageName] = m[entry.packageName] || []
    a.push({ ...entry, code: Number(code), messageText })
    return p
  }, {} as CompileResults)
}

function getResultEntry(filename: string): ResultEntry {
  const match = /ts\/([^\.]*)\.([^\.]*)\.([^\.]*).ts/.exec(filename)
  return match ? {
    transient: false,
    packageName: match[1],
    importType: match[2],
    scope: match[3]
  } : {
    transient: true,
    packageName: getPackageNameFromTransient(filename) ?? 'unknown',
    importType: 'all',
    scope: 'all'
  }
}

function getPackageNameFromTransient(filename: string) {
  if (/assertron/.test(filename)) return 'assertron'
  return undefined
}
