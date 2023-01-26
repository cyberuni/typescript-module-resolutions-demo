import cp from 'child_process'
import { EOL } from 'node:os'
import { ResultEntry, copyCommonJSPackageJson, getResultEntry } from './project'

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

export async function compileProject(ctx: { project: string, projectPath: string }) {
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
    compile: compileRaw.then(raw => extractCompileResults(raw))
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
    if (!a.some(x => x.messageText === messageText))
      a.push({
        ...entry,
        code: Number(code),
        messageText
      })
    return p
  }, {} as CompileResults)
}
