import { cli } from 'clibuilder'
import { compile } from 'handlebars'
import { parse } from 'json5'
import fs from 'node:fs'
import path from 'node:path'
import { context } from 'type-plus'
import { getProjectPath, getTestSubjects, readPackageJson } from './logic/project'
import { getTestResults } from './testResults'

export const app = cli({ name: 'tester', version: '0.0.1' })
  .default({
    arguments: [{ name: 'project', description: 'project name', required: true }],
    async run({ project }) {
      const projectPath = getProjectPath(project)
      const ctx = context({
        project,
        moduleTypes: ['commonjs', 'es2015', 'es2020', 'es2022', 'esnext', 'node16', 'nodenext']
      })
        .extend(({ project }) => ({ projectPath: getProjectPath(project) }))
        .extend(({ projectPath }) => ({ tsconfig: getTSConfig(projectPath) }))
        .extend(({ projectPath }) => ({ packageJson: readPackageJson(projectPath) }))
        .extend(({ packageJson, projectPath }) => ({ subjects: getTestSubjects({ packageJson, projectPath }) }))
        .extend((ctx) => ({ results: getTestResults(ctx) }))
        .build()

      fs.writeFileSync(
        path.join(projectPath, 'test-result.md'),
        await render(ctx)
      )
    }
  })

async function render(ctx: any) {
  return [genTestConfiguration(ctx),
  genTestSubjects(ctx),
  genLegends(),
  genTestResults(await ctx.results)].join('\n')
}

function getTSConfig(projectPath: string) {
  const tsconfigPath = path.join(projectPath, 'tsconfig.base.json')
  return readTSConfig(tsconfigPath)
}

function readTSConfig(tsconfigPath: string) {
  return parse(fs.readFileSync(tsconfigPath, 'utf8'))
}

function genTestConfiguration({ tsconfig }: { tsconfig: any }) {
  const template = compile(fs.readFileSync(path.join(__dirname, '../templates/test-configuration.hbs'), 'utf8'))
  return template(tsconfig.compilerOptions)
}

function genTestSubjects({ subjects }: { subjects: ReturnType<typeof getTestSubjects> }) {
  const template = compile(fs.readFileSync(path.join(__dirname, '../templates/test-subjects.hbs'), 'utf8'), { noEscape: true })
  return template({ subjects })
}

function genLegends() {
  const template = compile(fs.readFileSync(path.join(__dirname, '../templates/legends.hbs'), 'utf8'))
  return template({})
}

function genTestResults(ctx: { results: Awaited<ReturnType<typeof getTestResults>> }) {
  const template = compile(fs.readFileSync(path.join(__dirname, '../templates/test-results.hbs'), 'utf8'))
  return template(ctx)
}
