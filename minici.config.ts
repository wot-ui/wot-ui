import { defineConfig } from '@wot-ui/ci'

function resolveOptionalString(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined
  const v = value.trim()
  return v ? v : undefined
}

function resolveBoolean(value: unknown): boolean | undefined {
  const v = resolveOptionalString(value)
  if (!v) return undefined
  if (v === 'true') return true
  if (v === 'false') return false
  return undefined
}

function resolveWeixinRobot(value: unknown): number | undefined {
  const v = resolveOptionalString(value)
  if (!v) return 1
  const n = Number(v)
  return Number.isFinite(n) && n >= 1 && n <= 30 ? n : 1
}

function resolvePlaygroundPath(value: unknown, fallback: string): string {
  return resolveOptionalString(value) ?? fallback
}

export default defineConfig(({ env, packageJson }) => ({
  weixin: {
    appid: env.WEIXIN_APPID!,
    privateKeyPath: resolvePlaygroundPath(env.WEIXIN_PRIVATE_KEY_PATH, 'private.key'),
    projectPath: resolvePlaygroundPath(env.WEIXIN_PROJECT_PATH, 'dist/build/mp-weixin'),
    robot: resolveWeixinRobot(env.WEIXIN_ROBOT),
    setting: {
      useProjectConfig: true,
      minify: true,
      minifyJS: true,
      minifyWXML: true,
      minifyWXSS: true
    }
  },
  alipay: {
    toolId: env.ALIPAY_TOOL_ID!,
    appid: env.ALIPAY_APPID!,
    privateKey: env.ALIPAY_PRIVATE_KEY!,
    projectPath: resolvePlaygroundPath(env.ALIPAY_PROJECT_PATH, 'dist/build/mp-alipay'),
    autoincrement: true
  }
}))
