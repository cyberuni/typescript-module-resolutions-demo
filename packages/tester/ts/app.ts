import { cli } from 'clibuilder'
import { compile } from 'handlebars'
import { parse } from 'json5'
import fs from 'node:fs'
import path from 'node:path'
import { context } from 'type-plus'
import { getProjectPath, getTestSubjects, readPackageJson } from './logic/project'
import { genTestResults, getTestResults } from './testResults'

export const app = cli({ name: 'tester', version: '0.0.1' })
  .default({
    arguments: [{ name: 'project', description: 'project name', required: true }],
    async run({ project }) {
      const ctx = context({
        project,
        moduleTypes: ['commonjs', 'es2015', 'es2020', 'es2022', 'esnext', 'node16', 'nodenext']
      })
        .extend(getProjectPath)
        .extend(readPackageJson)
        .extend(getTypeScriptInfo)
        .extend(getTestSubjects)
        .extend(getTestResults)
        .build()

      fs.writeFileSync(
        path.join(ctx.projectPath, `test-result.${ctx.tsVersion}.md`),
        [genTestConfiguration(ctx),
        genTestSubjects(ctx),
        genLegends(),
        genTestResults({ ...ctx, results: await ctx.results })].join('\n')
      )
    }
  })

function getTypeScriptInfo(ctx: { packageJson: any, projectPath: string }) {
  const tsconfigPath = path.join(ctx.projectPath, 'tsconfig.base.json')
  return {
    tsconfig: parse(fs.readFileSync(tsconfigPath, 'utf8')),
    tsVersion: getTSVersion(ctx.packageJson)
  }
}

function getTSVersion(packageJson: any) {
  const version = packageJson.devDependencies['typescript']
  return /^[0-9]/.test(version) ? version : version.slice(1)
}

function genTestConfiguration({ tsconfig }: { tsconfig: any }) {
  const template = compile(fs.readFileSync(path.join(__dirname, '../templates/test-configuration.hbs'), 'utf8'))
  return template(tsconfig.compilerOptions)
}

function genTestSubjects({ subjects }: ReturnType<typeof getTestSubjects>) {
  const template = compile(fs.readFileSync(path.join(__dirname, '../templates/test-subjects.hbs'), 'utf8'), { noEscape: true })
  return template({ subjects })
}

function genLegends() {
  const template = compile(fs.readFileSync(path.join(__dirname, '../templates/legends.hbs'), 'utf8'))
  return template({})
}
