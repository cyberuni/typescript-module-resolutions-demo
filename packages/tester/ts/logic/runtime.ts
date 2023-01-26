import { fileSync } from 'find'
import { exec } from 'node:child_process'
import path from 'node:path'
import type { TestSubjectsContext } from './project'

export type RuntimeResult = {
  subject: string
  results: {
    filename: string
    importType: string
    error?: Error | undefined
  }[]
}

export function runRuntime(ctx: {
  project: string,
  moduleTypes: string[],
  projectPath: string,
  packageJson: any
} & TestSubjectsContext) {
  return {
    runtime: ctx.moduleTypes.map(moduleType => ({
      moduleType,
      results: runProject(ctx, moduleType)
    }))
  }
}

export type RunRuntimeContext = ReturnType<typeof runRuntime>

async function runProject(ctx: {
  project: string,
  projectPath: string
  packageJson: any,
} & TestSubjectsContext, moduleType: string) {
  const base = path.join(ctx.projectPath, moduleType)
  const files = fileSync(base)
  return Promise.all(ctx.subjects.map(async testSubject => {
    const filePrefix = path.join(base, `${testSubject.name}.`)
    const results = await Promise.all(files.filter(f => f.startsWith(filePrefix) && f.endsWith('.js'))
      .map(file => file.slice(base.length + 1))
      .map(filename => new Promise<{
        filename: string,
        importType: string,
        error?: Error
      }>((a) => {
        exec(`node ${filename}`, { cwd: base }, (error) => {
          a({
            filename,
            importType: /.+\.(.*)\.(.*).js/.exec(filename)?.[1]!,
            error: error ?? undefined
          })
        })
      })))
    return {
      subject: testSubject.name,
      results
    }
  })).then(r => r.filter(r => r.results.length > 0))
}
