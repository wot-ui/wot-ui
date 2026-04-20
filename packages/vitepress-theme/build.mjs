import { execFileSync } from 'node:child_process'
import { rmSync, readdirSync, statSync, mkdirSync, copyFileSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import esbuild from 'esbuild'

const packageRoot = fileURLToPath(new URL('.', import.meta.url))
const srcDir = join(packageRoot, 'src')
const distDir = join(packageRoot, 'dist')

// 1. Clean dist
rmSync(distDir, { recursive: true, force: true })

try {
  execFileSync('pnpm', ['exec', 'tsc', '-p', 'tsconfig.build.json'], {
    cwd: packageRoot,
    stdio: 'ignore' // 隐藏类型编译时的 node_modules 杂音报错
  })
} catch (e) {
  // 静默忽略类型生成的错误，继续构建 JS
}

// 2. 用 esbuild 编译 TS 到 JS (CommonJS / ESM, 暂定输出 ESM，因为 VitePress 支持 ESM)
function findTsFiles(dir, fileList = []) {
  const files = readdirSync(dir)
  for (const file of files) {
    const fullPath = join(dir, file)
    if (statSync(fullPath).isDirectory()) {
      findTsFiles(fullPath, fileList)
    } else if (fullPath.endsWith('.ts') && !fullPath.endsWith('.d.ts')) {
      fileList.push(fullPath)
    }
  }
  return fileList
}

const tsFiles = findTsFiles(srcDir)
esbuild.buildSync({
  entryPoints: tsFiles,
  format: 'esm',
  target: 'esnext',
  outdir: distDir,
  outbase: srcDir,
  logLevel: 'info'
})

// 2.5 为生成的 JS 文件补充 .js 后缀（ESM 需要）
function addJsExtension(dir) {
  const files = readdirSync(dir)
  for (const file of files) {
    const fullPath = join(dir, file)
    if (statSync(fullPath).isDirectory()) {
      addJsExtension(fullPath)
    } else if (fullPath.endsWith('.js')) {
      let content = readFileSync(fullPath, 'utf8')
      content = content.replace(/(from\s+['"]\..*?)(?<!\.js)(?<!\.css)(?<!\.vue)(?<!\.json)(['"])/g, '$1.js$2')
      content = content.replace(/(import\s+['"]\..*?)(?<!\.js)(?<!\.css)(?<!\.vue)(?<!\.json)(['"])/g, '$1.js$2')
      writeFileSync(fullPath, content)
    }
  }
}
addJsExtension(distDir)

function copyAssets(currentDir) {
  for (const entry of readdirSync(currentDir)) {
    const fullPath = join(currentDir, entry)
    const stat = statSync(fullPath)

    if (stat.isDirectory()) {
      copyAssets(fullPath)
    } else if (fullPath.endsWith('.vue') || fullPath.endsWith('.css') || fullPath.endsWith('.scss')) {
      const relPath = relative(srcDir, fullPath)
      const targetPath = join(distDir, relPath)
      mkdirSync(dirname(targetPath), { recursive: true })
      copyFileSync(fullPath, targetPath)
    }
  }
}

copyAssets(srcDir)
