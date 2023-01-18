import { fileSync } from 'find'
import { exec } from 'node:child_process'
import path from 'node:path'
import { getTestSubjects } from './project'

export type RuntimeResult = {
  package: string
  results: {
    filename: string
    importType: string
    error?: Error | undefined
  }[]
}

export async function runProject(ctx: {
  project: string,
  projectPath: string
  packageJson: any,
} & ReturnType<typeof getTestSubjects>, moduleType: string) {
  const base = path.join(ctx.projectPath, moduleType)
  const files = fileSync(base)
  return Promise.all(ctx.subjects.map(async testSubject => {
    const filePrefix = path.join(base, `${testSubject.name}`)
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
            error: error ? error : undefined
          })
        })
      })
      ))
    return {
      package: testSubject.name,
      results
    }
  }))
}
