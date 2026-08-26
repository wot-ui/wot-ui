import { execFileSync } from 'node:child_process'
import { mkdirSync, readdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import {
  type Contributor,
  type GitAuthor,
  type GithubAuthor,
  createGithubContributor,
  isIgnoredAuthor,
  resolveContributorIdentity
} from './componentContributorIdentity'

const root = process.cwd()
const docsComponentRoot = path.join(root, 'docs/component')
const outputPath = path.join(root, 'docs/public/data/component-contributors.json')
const repository = 'wot-ui/wot-ui'
const githubToken = process.env.GITHUB_TOKEN
const githubAuthorCache = new Map<string, Promise<GithubAuthor | null>>()

function ensureFullGitHistory() {
  try {
    const isShallow =
      execFileSync('git', ['rev-parse', '--is-shallow-repository'], {
        cwd: root,
        encoding: 'utf8'
      }).trim() === 'true'
    if (!isShallow) return true

    console.log('Shallow Git history detected; fetching the full history before generating contributors.')
    execFileSync('git', ['fetch', '--unshallow', '--tags', 'origin'], {
      cwd: root,
      stdio: 'inherit',
      timeout: 60_000
    })
    return true
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.warn(`Unable to access the full Git history; keeping the existing contributor manifest. ${message}`)
    return false
  }
}

const gitHistoryReady = ensureFullGitHistory()

// Git author 信息通常是昵称或邮箱，使用仓库已有 GitHub 身份做归一化。
// 新增贡献者时可在这里补充映射，也可以在后续 CI 版本中通过 GitHub API 自动解析。
const authorAliases: Record<string, { login: string; name?: string }> = {
  '不如摸鱼去 <1780903673@qq.com>': { login: 'Moonofweisheng', name: '不如摸鱼去' },
  'weisheng <1780903673@qq.com>': { login: 'Moonofweisheng', name: 'weisheng' },
  'xiaohe0601 <xiaohe0601@outlook.com>': { login: 'xiaohe0601' },
  'dodu2014 <dodu@live.cn>': { login: 'dodu2014' }
}

const componentSourceMap: Record<string, string[]> = {
  avatar: ['wd-avatar', 'wd-avatar-group'],
  cell: ['wd-cell', 'wd-cell-group'],
  checkbox: ['wd-checkbox', 'wd-checkbox-group'],
  collapse: ['wd-collapse', 'wd-collapse-item'],
  'drop-menu': ['wd-drop-menu', 'wd-drop-menu-item'],
  form: ['wd-form', 'wd-form-item'],
  grid: ['wd-grid', 'wd-grid-item'],
  'index-bar': ['wd-index-bar', 'wd-index-anchor'],
  layout: ['wd-row', 'wd-col'],
  navbar: ['wd-navbar', 'wd-navbar-capsule'],
  radio: ['wd-radio', 'wd-radio-group'],
  sidebar: ['wd-sidebar', 'wd-sidebar-item'],
  steps: ['wd-steps', 'wd-step'],
  sticky: ['wd-sticky', 'wd-sticky-box'],
  swiper: ['wd-swiper', 'wd-swiper-nav'],
  tabbar: ['wd-tabbar', 'wd-tabbar-item'],
  table: ['wd-table', 'wd-table-column'],
  tabs: ['wd-tabs', 'wd-tab']
}

function getComponentPaths(slug: string) {
  // 贡献者展示对齐“组件代码贡献者”的语义，默认仅统计组件源码目录。
  // 文档、Demo 和测试经常有批量迁移提交，合并统计会放大非组件实现贡献。
  return (componentSourceMap[slug] ?? [`wd-${slug}`]).map((name) => `src/uni_modules/wot-ui/components/${name}`)
}

function readAuthors(paths: string[]) {
  const output = execFileSync('git', ['log', '--format=%H%x09%an%x09%ae', '--', ...paths], { cwd: root, encoding: 'utf8' })
  const authors = new Map<string, GitAuthor>()
  output
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .forEach((line) => {
      const [commitSha, name, email] = line.split('\t')
      if (!commitSha || !name || !email) return
      const signature = `${name} <${email}>`
      const existing = authors.get(signature)
      if (existing) existing.contributions += 1
      else authors.set(signature, { commitSha, name, email, contributions: 1 })
    })
  return authors
}

function parseGithubNoreplyEmail(email: string) {
  const match = email.match(/^(?:\d+\+)?([^@<>]+)@users\.noreply\.github\.com$/)
  return match?.[1]
}

async function resolveGithubAuthor(commitSha: string, cacheKey = commitSha): Promise<GithubAuthor | null> {
  if (!githubToken) return null

  const cached = githubAuthorCache.get(cacheKey)
  if (cached) return cached

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10_000)
  const request = fetch(`https://api.github.com/repos/${repository}/commits/${commitSha}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${githubToken}`,
      'User-Agent': 'wot-ui-component-contributors'
    },
    signal: controller.signal
  })
    .then(async (response) => {
      if (!response.ok) return null
      const data = (await response.json()) as { author?: GithubAuthor | null }
      return data.author ?? null
    })
    .catch(() => null)
    .finally(() => clearTimeout(timeout))

  githubAuthorCache.set(cacheKey, request)
  return request
}

async function toContributor(signature: string, author: GitAuthor): Promise<Contributor | null> {
  const alias = authorAliases[signature]
  const noreplyLogin = parseGithubNoreplyEmail(author.email)

  if (alias) {
    if (isIgnoredAuthor(author, alias.login)) return null
    return createGithubContributor(alias.login, alias.name ?? author.name, author.contributions)
  }

  if (noreplyLogin) {
    if (isIgnoredAuthor(author, noreplyLogin)) return null
    return createGithubContributor(noreplyLogin, author.name, author.contributions)
  }

  const githubAuthor = await resolveGithubAuthor(author.commitSha, author.email.toLowerCase())
  return resolveContributorIdentity(author, githubAuthor, Boolean(githubToken))
}

async function generate() {
  if (!gitHistoryReady) return

  const components: Record<string, Contributor[]> = {}
  for (const file of readdirSync(docsComponentRoot)) {
    if (!file.endsWith('.md')) continue
    const slug = file.slice(0, -3)
    if (slug.startsWith('use-')) continue

    const authors = Array.from(readAuthors(getComponentPaths(slug)).entries()).sort(
      ([, authorA], [, authorB]) => authorB.contributions - authorA.contributions
    )
    const contributors = (await Promise.all(authors.map(([signature, author]) => toContributor(signature, author)))).filter(
      (item): item is Contributor => Boolean(item)
    )

    // 同一 GitHub 账号可能对应多个本地 Git author，合并贡献次数。
    const merged = new Map<string, Contributor>()
    contributors.forEach((item) => {
      const existing = merged.get(item.id)
      if (existing) existing.contributions += item.contributions
      else merged.set(item.id, item)
    })
    components[slug] = Array.from(merged.values()).sort((a, b) => b.contributions - a.contributions)
  }

  mkdirSync(path.dirname(outputPath), { recursive: true })
  writeFileSync(outputPath, `${JSON.stringify({ repository, components }, null, 2)}\n`, 'utf8')
  console.log(`Generated ${Object.keys(components).length} component contributor entries at ${path.relative(root, outputPath)}`)
}

generate().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
