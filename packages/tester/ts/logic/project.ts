import { fileSync } from 'find'
import { parse } from 'json5'
import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'

export type ResultEntry = {
  packageName: string,
  transient: boolean,
  importType: string,
  scope: string
}

export function copyCommonJSPackageJson(ctx: { projectPath: string }) {
  writeFileSync(path.join(ctx.projectPath, 'commonjs', 'package.json'), `{"type":"commonjs"}`)
}

export function getTestSubjects({
  packageJson, projectPath
}: {
  packageJson: any,
  projectPath: string
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
    .map(filepath => ({
      filename: filepath.slice(base.length + 1),
      filepath,
      filecontent: readFileSync(filepath, 'utf8')
    }))
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

export function getResultEntry(filename: string): ResultEntry {
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

export function toImportMap(results: Array<{
  importType: string,
  notApply?: boolean,
  transient?: boolean
  value?: string,
}> | undefined) {
  return {
    'importDefault': toImportMapEntry(results, 'default'),
    'importDefaultAs': toImportMapEntry(results, 'default-as'),
    'importStarAs': toImportMapEntry(results, 'star'),
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
      icon: '🟢',
      value: ''
    }
  }
}
