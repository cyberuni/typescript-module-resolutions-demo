import cp from 'child_process'
import { EOL } from 'node:os'
import { inspect } from 'type-plus'
import { copyCommonJSPackageJson, TestSubjectsContext } from './project'


export type CompileResult = {
  moduleType: string,
  code?: number,
  messageText?: string
} & ResultEntry

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

export function processCompileResults({ compileRaw, subjects, moduleTypes }: {
  moduleTypes: string[]
} & RunCompileContext & TestSubjectsContext) {

  return {
    compile: compileRaw
      .then(extractCompileErrors)
      .then(results => results.flatMap(result => result.importType === 'all'
        ? subjects
          .find(s => s.name === result.subject)!.files
          .map(f => ({ ...result, importType: f.importType }))
        : result
      ))
      .then(compileErrors => buildCompileResults({ compileErrors, moduleTypes, subjects }))
  }
}

export type ProcessCompileContext = ReturnType<typeof processCompileResults>

function extractCompileErrors(stdout: string): CompileResult[] {
  return stdout.split(EOL)
    .map<[moduleType: string, filename: string, code: string, msg: string]>(
      s => /^\[build\:([^\s]*)\s*\] ([^(]*).*error TS(\d*): ([^\n]*)/.exec(s)?.slice(1) as any
    )
    .filter(Boolean)
    .map(([moduleType, filename, code, messageText]) => ({
      ...getResultEntry(filename), moduleType, code: Number(code), messageText
    }))
}

export type ResultEntry = {
  subject: string,
  importType: string,
  transient?: boolean,
  scope?: string
}

function getResultEntry(filename: string): ResultEntry {
  const match = /ts\/([^\.]*)\.([^\.]*)\.([^\.]*).ts/.exec(filename)
  return match ? {
    transient: false,
    subject: match[1],
    importType: match[2],
    scope: match[3]
  } : {
    transient: true,
    subject: getSubjectFromTransient(filename) ?? 'unknown',
    importType: 'all',
    scope: 'all'
  }
}

function getSubjectFromTransient(filename: string) {
  if (/assertron/.test(filename)) return 'assertron'
  return undefined
}

function buildCompileResults(
  { compileErrors, moduleTypes, subjects }: {
    compileErrors: CompileResult[],
    moduleTypes: string[]
  } & TestSubjectsContext
): CompileResult[] {
  return moduleTypes.flatMap(moduleType =>
    subjects.flatMap(({ name: subject, files }) => files.flatMap(({ importType }) => {
      const error = compileErrors.find(e => e.moduleType === moduleType && e.subject === subject && e.importType === importType)
      return ({
        moduleType,
        subject,
        importType,
        code: error?.code,
        messageText: error?.messageText,
        transient: error?.transient
      })
    })))
}
