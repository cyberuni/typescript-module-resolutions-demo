import { cli, z } from 'clibuilder'
import { compile } from 'handlebars'
import { parse } from 'json5'
import fs from 'node:fs'
import path from 'node:path'
import { context, forEachKey } from 'type-plus'
import { processCompileResults, runCompile } from './logic/compile'
import { getProjectPath, getTestSubjects, readPackageJson } from './logic/project'
import { runRuntime } from './logic/runtime'
import { extractRuntimeErrorMessage, genTestResults } from './testResults'

const projectArg = { name: 'project' as const, description: 'project name', type: z.optional(z.string()) }
const moduleTypesOption = {
  description: 'module types',
  default: ['commonjs', 'es2015', 'es2020', 'es2022', 'esnext', 'node16', 'nodenext'],
  type: z.array(z.string())
}

const rawOption = {
  description: 'emit raw output',
  type: z.boolean()
}

export const app = cli({ name: 'tester', version: '0.0.1' })
  .default({
    arguments: [projectArg],
    options: { moduleTypes: moduleTypesOption },
    async run({ project, moduleTypes }) {
      const projects = project ? [project] : getProjects()
      await Promise.all(projects.map(async project => {
        this.ui.info(`building demo: ${project}`)
        const ctx = context({ project, moduleTypes })
          .extend(getProjectPath)
          .extend(readPackageJson)
          .extend(getTypeScriptInfo)
          .extend(getTestSubjects)
          .extend(runCompile)
          .extend(processCompileResults)
          .extend(runRuntime)
          .build()

        fs.writeFileSync(
          path.join(ctx.projectPath, `test-result.${ctx.tsVersion}.md`),
          [genTitle(ctx),
          genLegends(),
          await genTestResults(ctx),
          genTestSubjects(ctx),
          ].join('\n')
        )
      }))
    }
  })
  .command({
    name: 'compile',
    arguments: [projectArg],
    options: {
      moduleTypes: moduleTypesOption,
      raw: rawOption
    },
    async run({ project, moduleTypes, raw }) {
      const projects = project ? [project] : getProjects()
      await Promise.all(projects.map(async project => {
        this.ui.info(`compile: ${project}`)
        const ctx = context({ project, moduleTypes })
          .extend(getProjectPath)
          .extend(readPackageJson)
          .extend(getTestSubjects)
          .extend(runCompile)
          .extend(processCompileResults)
          .build()

        if (raw) {
          this.ui.info(await ctx.compileRaw)
          return
        }

        const compileResults = await ctx.compile

        const lines: string[][] = []
        compileResults.forEach(result => {
          lines.push([
            result.moduleType.padEnd(8),
            result.subject.padEnd(10),
            result.importType.padEnd(10),
            result.transient ? 'transient' : 'direct   ',
            result.code ? `TS${result.code}` : 'success', result.messageText ?? ''])
        })
        lines.sort((a, b) => a[0] > b[0] ? 1 : (a[0] < b[0] ? -1 : (a[1] > b[1] ? 1 : -1)))
        lines.map(l => this.ui.error(l.join(' | ')))
      }))
    }
  })
  .command({
    name: 'runtime',
    arguments: [projectArg],
    options: { moduleTypes: moduleTypesOption },
    async run({ project, moduleTypes }) {
      const projects = project ? [project] : getProjects()
      await Promise.all(projects.map(async project => {
        this.ui.info(`runtime: ${project}`)
        const ctx = context({ project, moduleTypes })
          .extend(getProjectPath)
          .extend(readPackageJson)
          .extend(getTypeScriptInfo)
          .extend(getTestSubjects)
          .extend(runRuntime)
          .build()

        const results = await ctx.runtime
        const lines: string[][] = []
        await Promise.all(results.map(async moduleResult => {
          const moduleType = moduleResult.moduleType
          const results = await moduleResult.results
          results.forEach(subjectResult => {
            const subject = subjectResult.subject
            subjectResult.results.forEach(result => {
              lines.push([moduleType.padEnd(8), subject.padEnd(10), result.importType.padEnd(10), extractRuntimeErrorMessage(result.error)])
            })
          })
        }))
        lines.sort((a, b) => a[0] > b[0] ? 1 : (a[0] < b[0] ? -1 : (a[1] > b[1] ? 1 : -1)))
        lines.map(l => this.ui.error(l.join(' | ')))
      }))
    }
  })

function getProjects() {
  return fs.readdirSync('tests')
}

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

function genTitle(ctx: { tsVersion: string }) {
  const template = compile(fs.readFileSync(path.join(__dirname, '../templates/title.hbs'), 'utf8'))
  return template(ctx)
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
