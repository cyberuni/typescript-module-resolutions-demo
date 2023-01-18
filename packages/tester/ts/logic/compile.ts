import cp from 'child_process'
import { EOL } from 'node:os'
import { ResultEntry, copyCommonJSPackageJson, getResultEntry } from './project'

/**
 * { [moduleType]: { [package]: CompileResult[] } }
 */
export type CompileResults = Record<string, PackageCompileResults>

/**
 * { [package]: CompileResult[] } }
 */
export type PackageCompileResults = Record<string, Array<CompileResult>>

export type CompileResult = ResultEntry & {
  code: number,
  messageText: string
}

export async function compileProject(project: string) {
  return new Promise<CompileResults>(a => {
    cp.exec(`pnpm ${project} build`, (_err, stdout) => {
      a(extractCompileResults(stdout))
    })
  })
    .then((results) => {
      copyCommonJSPackageJson(project)
      return results
    })
}

function extractCompileResults(stdout: string) {
  const lines = stdout.split(EOL)
    .map<[moduleType: string, filename: string, code: string, msg: string]>(
      s => /^\[build\:([^\s]*)\s*\] ([^(]*).*error TS(\d*): ([^\n]*)/.exec(s)?.slice(1) as any
    ).filter(Boolean)
  return lines.reduce((p, [moduleType, filename, code, messageText]) => {
    const entry = getResultEntry(filename)
    const m = p[moduleType] = p[moduleType] || {}
    const a = m[entry.packageName] = m[entry.packageName] || []
    if (!a.some(x => x.messageText === messageText))
      a.push({
        ...entry,
        code: Number(code),
        messageText
      })
    return p
  }, {} as CompileResults)
}

// ---- previous implementation ----
// async function compileProject(projectPath: string, moduleType: string) {
//   const tsConfig = readConfigFile(path.join(projectPath, `tsconfig.${moduleType}.json`), p => fs.readFileSync(p, 'utf-8'))

//   const testSubjects = getTestSubjects(projectPath)
//   console.log(tsConfig)
//   const compileResults = testSubjects.map(testSubject => {
//     console.info(`compiling ${projectPath} on ${testSubject.name} in ${moduleType}`)
//     const testFiles = testSubject.files.map(f => f.filepath)
//     const program = createProgram(testFiles, {
//       ...tsConfig.config,
//       outDir: path.join(projectPath, tsConfig.config.compilerOptions.outDir),
//     })
//     return {
//       package: testSubject.name,
//       results: getPreEmitDiagnostics(program)
//         .concat(program.emit().diagnostics).map(d => extractCompileResult(projectPath, d))
//         .filter(Boolean) as Array<CompileResult>,
//     }
//   })
//   if (moduleType === 'commonjs') {
//     copyCommonJSPackageJson(projectPath)
//   }
//   return compileResults
// }

// function extractCompileResult(projectPath: string, diagnostic: Diagnostic): CompileResult | undefined {
//   if (diagnostic.file) {
//     const fileName = diagnostic.file.fileName
//     const transient = !fileName.startsWith(projectPath)
//     const entry = resulen
//     return {
//       code: diagnostic.code,
//       importType: transient ? 'all' : /.+\.(.*)\.(.*).ts/.exec(fileName)?.[1]!,
//       transient,
//       messageText: flattenDiagnosticMessageText(diagnostic.messageText, '\n')
//     }
//   }
//   else {
//     console.error('no file', diagnostic)
//     return undefined
//   }
// }
