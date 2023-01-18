import { fileSync } from 'find'
import { exec } from 'node:child_process'
import path from 'node:path'
import { getProjectPath, getTestSubjects } from './project'

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
}, moduleType: string) {
  const projectPath = getProjectPath(ctx.project)
  const testSubjects = getTestSubjects(ctx)
  const base = path.join(projectPath, moduleType)
  const files = fileSync(base)
  return Promise.all(testSubjects.map(async testSubject => {
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
