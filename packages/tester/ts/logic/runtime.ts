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

export async function runProject(project: string, moduleType: string) {
  const projectPath = getProjectPath(project)
  const testSubjects = getTestSubjects(projectPath)
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
