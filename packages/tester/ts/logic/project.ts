import { fileSync } from 'find'
import { parse } from 'json5'
import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'

export function copyCommonJSPackageJson(ctx: { projectPath: string }) {
  writeFileSync(path.join(ctx.projectPath, 'commonjs', 'package.json'), `{"type":"commonjs"}`)
}

export function getTestSubjects({ packageJson, projectPath }: {
  packageJson: any, projectPath: string
}) {
  const dependencies = getDependencies(packageJson)
  // `assert` is not a package
  dependencies.unshift('assert')
  return {
    subjects: dependencies.map(name => ({
      name,
      files: getTestFiles(projectPath, name)
    }))
  }
}

export type TestSubjectsContext = ReturnType<typeof getTestSubjects>

export function readPackageJson(ctx: { projectPath: string }) {
  const packageJsonPath = path.join(ctx.projectPath, 'package.json')
  return { packageJson: parse(readFileSync(packageJsonPath, 'utf8')) }
}

function getTestFiles(projectPath: string, dependencyName: string) {
  const base = path.join(projectPath, 'ts')
  // the `.` at the end makes sure it match the exact package name.
  const filePrefix = path.join(base, `${dependencyName}.`)
  return fileSync(base)
    .filter(f => f.startsWith(filePrefix))
    .map(filepath => {
      const filename = filepath.slice(base.length + 1)
      const filecontent = readFileSync(filepath, 'utf8')
      const match = /^([^\.]*)\.([^\.]*)\.([^\.]*).ts$/.exec(filename)
      if (!match) {
        throw new Error(`not conforming filename: ${filename}`)
      }
      const [, packageName, importType, scope] = match

      return ({
        filename,
        filepath,
        filecontent,
        packageName,
        importType,
        scope
      })
    })
}

function getDependencies(packageJson: any) {
  return Object.keys(packageJson.dependencies).reduce(
    (p: string[], k: string) => {
      p.push(k)
      return p
    }, [])
}


export function getProjectPath(ctx: { project: string }) {
  return { projectPath: path.join(`tests`, ctx.project) }
}
