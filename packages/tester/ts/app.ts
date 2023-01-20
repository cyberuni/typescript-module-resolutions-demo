import { cli } from 'clibuilder'
import { compile } from 'handlebars'
import { parse } from 'json5'
import fs from 'node:fs'
import path from 'node:path'
import { context, forEachKey } from 'type-plus'
import { getProjectPath, getTestSubjects, readPackageJson } from './logic/project'
import { genTestResults, runCompile, runCompileAndRuntimeTests } from './testResults'

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
        .extend(runCompileAndRuntimeTests)
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
  .command({
    name: 'compile',
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
        .extend(runCompile)
        .build()

      const result = await ctx.compile

      const lines: string[][] = []
      forEachKey(result, (moduleType) => {
        const moduleResults = result[moduleType]
        forEachKey(moduleResults, (subject) => {
          const compileResults = moduleResults[subject]
          compileResults.forEach(result => {
            lines.push([moduleType.padEnd(8), subject.padEnd(10), result.importType.padEnd(10), result.transient ? 'transient' : 'direct   ', `TS${result.code}`, result.messageText])
          })
        })
      })
      lines.sort((a, b) => a[0] > b[0] ? 1 : (a[0] < b[0] ? -1 : (a[1] > b[1] ? 1 : -1)))
      lines.map(l => this.ui.error(l.join(' | ')))
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
