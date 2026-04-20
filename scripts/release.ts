import inquirer from 'inquirer'
import type { DistinctQuestion } from 'inquirer'
import { execSync } from 'child_process'
import { writeFileSync, readFileSync, readdirSync, statSync } from 'fs'
import path from 'path'

const src = path.resolve(__dirname, '../src/uni_modules/wot-ui')
const oldVersion = require('../package.json').version
const LOWEST_VERSION = '$LOWEST_VERSION$'

const STABLE_RELEASE_COMMANDS = {
  '🐛 patch 小版本': 'pnpm release-patch',
  '✨ minor 中版本': 'pnpm release-minor',
  '🚀 major 大版本': 'pnpm release-major'
} as const

const PREVIEW_RELEASE_TYPES = {
  '🧪 prepatch 预览小版本': 'patch',
  '🧪 preminor 预览中版本': 'minor',
  '🧪 premajor 预览大版本': 'major',
  '🔁 prerelease 继续迭代当前预览版': 'prerelease'
} as const

const PREVIEW_CHANNELS = ['alpha', 'beta', 'rc'] as const

type StableReleaseChoice = keyof typeof STABLE_RELEASE_COMMANDS
type PreviewReleaseChoice = keyof typeof PREVIEW_RELEASE_TYPES
type PreviewChannel = (typeof PREVIEW_CHANNELS)[number]
type ReleaseVersionChoice = StableReleaseChoice | PreviewReleaseChoice

type ReleaseAnswers = {
  version: ReleaseVersionChoice
  previewChannel?: PreviewChannel
  release: 'Y' | 'N'
}

function runCommand(command: string) {
  execSync(command, { stdio: 'inherit' })
}

function runRelease(versionType: string, previewChannel?: PreviewChannel) {
  if (versionType in STABLE_RELEASE_COMMANDS) {
    runCommand(STABLE_RELEASE_COMMANDS[versionType as StableReleaseChoice])
    return
  }

  const previewReleaseType = PREVIEW_RELEASE_TYPES[versionType as PreviewReleaseChoice]
  if (!previewReleaseType || !previewChannel) {
    throw new Error('预览版参数缺失')
  }

  if (previewReleaseType === 'prerelease') {
    runCommand(`pnpm exec standard-version --prerelease ${previewChannel}`)
    return
  }

  runCommand(`pnpm exec standard-version --release-as ${previewReleaseType} --prerelease ${previewChannel}`)
}

const handleLowestVersion = (dir: string, version: string) => {
  const files = readdirSync(dir)

  for (const item of files) {
    const itemPath = path.resolve(dir, item)
    const stat = statSync(itemPath)

    if (stat.isFile()) {
      if (item.endsWith('.md')) {
        let content = readFileSync(itemPath, 'utf-8')

        if (content.includes(LOWEST_VERSION)) {
          content = content.replace(/\$LOWEST_VERSION\$/g, version)
          writeFileSync(itemPath, content)
        }
      }
    } else {
      handleLowestVersion(itemPath, version)
    }
  }
}

const versionQuestion: DistinctQuestion<ReleaseAnswers> = {
  type: 'list',
  name: 'version',
  message: '请选择发版类型（默认值：✨ minor)',
  choices: [
    '🐛 patch 小版本',
    '✨ minor 中版本',
    '🚀 major 大版本',
    '🧪 prepatch 预览小版本',
    '🧪 preminor 预览中版本',
    '🧪 premajor 预览大版本',
    '🔁 prerelease 继续迭代当前预览版'
  ],
  default: '✨ minor 中版本'
}

const previewChannelQuestion: DistinctQuestion<ReleaseAnswers> = {
  type: 'list',
  name: 'previewChannel',
  message: '请选择预览版标识（默认值：alpha）',
  choices: [...PREVIEW_CHANNELS],
  default: 'alpha',
  when: (answers: Partial<ReleaseAnswers>) => !!answers.version && answers.version in PREVIEW_RELEASE_TYPES
}

const releaseQuestion: DistinctQuestion<ReleaseAnswers> = {
  type: 'list',
  name: 'release',
  message: '确认发布？',
  choices: ['Y', 'N'],
  default: 'Y'
}

const questions: DistinctQuestion<ReleaseAnswers>[] = [versionQuestion, previewChannelQuestion, releaseQuestion]

inquirer
  .prompt(questions)
  .then((answers: ReleaseAnswers) => {
    if (!answers['release'] || answers['release'].toLowerCase() != 'y') {
      console.log('🚨 操作取消')
      return
    }
    const isPreviewRelease = answers['version'] in PREVIEW_RELEASE_TYPES

    // 项目版本更新
    runRelease(answers['version'], answers['previewChannel'])
    // 生成日志
    runCommand('pnpm build:changelog')
    // 更新版本
    const file = readFileSync(path.resolve(__dirname, '../package.json'))
    const packageJson = JSON.parse(file.toString())
    const newVersion = packageJson.version

    // 处理文档中的最低版本标识
    if (!isPreviewRelease) {
      handleLowestVersion(path.resolve(__dirname, '../docs'), newVersion)
    }

    console.log(`√ bumping version in package.json from ${oldVersion} to ${newVersion}`)
    const tarfetPackageJson = require('../src/uni_modules/wot-ui/package.json')
    tarfetPackageJson.version = newVersion
    writeFileSync(path.resolve(src, 'package.json'), JSON.stringify(tarfetPackageJson))

    // 同步更新 @wot-ui/vitepress-theme 的版本号
    const themePackageJsonPath = path.resolve(__dirname, '../packages/vitepress-theme/package.json')
    const themePackageJson = require(themePackageJsonPath)
    themePackageJson.version = newVersion
    writeFileSync(themePackageJsonPath, JSON.stringify(themePackageJson, null, 2) + '\n')

    // 生成制品
    runCommand('pnpm build:theme-vars')
    runCommand('pnpm lint')
    runCommand('git add -A')
    runCommand(`git commit -am "build: compile ${newVersion}"`)
    runCommand(`git tag -a v${newVersion} -am "chore(release): ${newVersion}"`)
    console.log('√ committing changes')
    const branch = execSync('git branch --show-current').toString().replace(/\*/g, '').replace(/ /g, '')
    console.log('🎉 版本发布成功')
    const tip = 'Run `git push --follow-tags origin ' + branch + '` ' + 'to publish'
    console.log(tip.replace(/\n/g, ''))
  })
  .catch((error: any) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  })
