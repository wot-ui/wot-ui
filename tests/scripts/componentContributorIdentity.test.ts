import { beforeEach, describe, expect, test, vi } from 'vitest'
import { resolveContributorIdentity, type GitAuthor, type GithubAuthor } from '../../scripts/componentContributorIdentity'

const author: GitAuthor = {
  commitSha: 'commit-sha',
  name: 'Automation user',
  email: 'automation@example.com',
  contributions: 2
}

const githubAuthor: GithubAuthor = {
  login: 'octocat',
  avatar_url: 'https://github.com/octocat.png',
  html_url: 'https://github.com/octocat'
}

describe('resolveContributorIdentity', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  test('已识别的机器人不会回退为 Git 作者', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
    const result = resolveContributorIdentity(author, { ...githubAuthor, login: 'dependabot[bot]' }, true)

    expect(result).toBeNull()
    expect(warn).not.toHaveBeenCalled()
  })

  test('GitHub 账号解析失败且配置 token 时保留回退作者并记录警告', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
    const result = resolveContributorIdentity(author, null, true)

    expect(result?.id).toMatch(/^git:/)
    expect(warn).toHaveBeenCalledOnce()
  })

  test('未配置 token 时静默保留回退作者', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
    const result = resolveContributorIdentity(author, null, false)

    expect(result?.id).toMatch(/^git:/)
    expect(warn).not.toHaveBeenCalled()
  })
})
