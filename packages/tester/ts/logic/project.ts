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

export function copyCommonJSPackageJson(project: string) {
  const projectPath = getProjectPath(project)
  writeFileSync(path.join(projectPath, 'commonjs', 'package.json'), `{"type":"commonjs"}`)
}

export function getTestSubjects({
  packageJson, projectPath
}: {
  packageJson: any,
  projectPath: string
}) {
  const dependencies = getDependencies(packageJson)
  return dependencies.map(name => ({
    packageJson,
    name,
    files: getTestFiles(projectPath, name)
  }))
}

export function readPackageJson(projectPath: string) {
  const packageJsonPath = path.join(projectPath, 'package.json')
  return parse(readFileSync(packageJsonPath, 'utf8'))
}



function getTestFiles(projectPath: string, dependencyName: string) {
  const base = path.join(projectPath, 'ts')
  const filePrefix = path.join(base, `${dependencyName}`)
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


export function getProjectPath(project: string) {
  return path.join(`tests`, project)
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

export function toImportMap(results: Array<{ importType: string, value: string, transient: boolean }> | undefined) {
  return {
    'importDefault': toImportMapEntry(results, 'default'),
    'importDefaultAs': toImportMapEntry(results, 'default-as'),
    'importStarAs': toImportMapEntry(results, 'star'),
  }
}

function toImportMapEntry(results: Array<{ importType: string, value: string, transient: boolean }> | undefined, importType: string) {
  const entry = results?.find(r => r.importType === importType)
  if (entry) {
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
