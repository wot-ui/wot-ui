import { createHash } from 'node:crypto'

export type Contributor = {
  id: string
  login?: string
  name: string
  avatarUrl?: string
  profileUrl?: string
  contributions: number
}

export type GitAuthor = {
  commitSha: string
  name: string
  email: string
  contributions: number
}

export type GithubAuthor = {
  login: string
  avatar_url: string
  html_url: string
}

const ignoredAuthors = new Set(['dependabot[bot]', 'github-actions[bot]', 'renovate[bot]'])

export function isIgnoredAuthor(author: GitAuthor, login?: string) {
  return [author.name, author.email, login].filter(Boolean).some((value) => /\[bot\]$/i.test(String(value)) || ignoredAuthors.has(String(value)))
}

export function createGithubContributor(login: string, name: string, contributions: number, githubAuthor?: GithubAuthor): Contributor {
  return {
    id: `github:${login.toLowerCase()}`,
    login,
    name,
    avatarUrl: githubAuthor?.avatar_url ?? `https://github.com/${login}.png?size=80`,
    profileUrl: githubAuthor?.html_url ?? `https://github.com/${login}`,
    contributions
  }
}

export function resolveContributorIdentity(author: GitAuthor, githubAuthor: GithubAuthor | null, githubTokenConfigured: boolean): Contributor | null {
  if (githubAuthor) {
    if (isIgnoredAuthor(author, githubAuthor.login)) return null
    return createGithubContributor(githubAuthor.login, author.name, author.contributions, githubAuthor)
  }

  if (isIgnoredAuthor(author)) return null
  const anonymousId = createHash('sha256').update(author.email.toLowerCase()).digest('hex').slice(0, 16)
  if (githubTokenConfigured) {
    console.warn('Unable to resolve a GitHub account; keeping the Git author with a fallback avatar.')
  }
  return {
    id: `git:${anonymousId}`,
    name: author.name,
    contributions: author.contributions
  }
}
