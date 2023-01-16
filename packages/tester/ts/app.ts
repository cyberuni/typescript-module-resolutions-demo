import { cli } from 'clibuilder'
import { compile } from 'handlebars'
import { parse } from 'json5'
import fs from 'node:fs'
import path from 'node:path'
import { compileProject } from './logic/compile'
import { getProjectPath, getTestSubjects } from './logic/project'
import { runProject } from './logic/runtime'
import { collectTestResults } from './testResults'

export const app = cli({ name: 'tester', version: '0.0.1' })
  .default({
    arguments: [{ name: 'project', description: 'project name', required: true }],
    async run({ project }) {
      const projectPath = getProjectPath(project)
      const testConfiguration = genTestConfiguration(projectPath)
      const testSubjects = genTestSubjects(projectPath)
      const legends = genLegends()
      const testResults = await genTestResults(project)
      fs.writeFileSync(path.join(projectPath, 'test-result.md'),
        [testConfiguration,
          testSubjects,
          legends,
          testResults].join('\n'))
    }
  })

function genTestConfiguration(projectPath: string) {
  const tsconfigPath = path.join(projectPath, 'tsconfig.base.json')
  const tsconfig = readTSConfig(tsconfigPath)
  const template = compile(fs.readFileSync(path.join(__dirname, '../templates/test-configuration.hbs'), 'utf8'))
  return template(tsconfig.compilerOptions)
}

function readTSConfig(tsconfigPath: string) {
  return parse(fs.readFileSync(tsconfigPath, 'utf8'))
}

function genTestSubjects(projectPath: string) {
  const testSubjects = getTestSubjects(projectPath)
  const template = compile(fs.readFileSync(path.join(__dirname, '../templates/test-subjects.hbs'), 'utf8'), { noEscape: true })
  return template({ testSubjects })
}

function genLegends() {
  const template = compile(fs.readFileSync(path.join(__dirname, '../templates/legends.hbs'), 'utf8'))
  return template({})
}

async function genTestResults(project: string) {
  const compileResults = await compileProject(project)
  const moduleTypes = ['commonjs', 'es2015', 'es2020', 'es2022', 'esnext', 'node16', 'nodenext']
  return Promise.all(
    moduleTypes.map(
      moduleType => runProject(project, moduleType)
        .then(runtimeResults => ({
          moduleType,
          compileResults: compileResults[moduleType],
          runtimeResults
        })))
  ).then(collectTestResults).then(result => {
    const template = compile(fs.readFileSync(path.join(__dirname, '../templates/test-results.hbs'), 'utf8'))
    return template(result)
  })
}
