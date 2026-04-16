import { defineConfig } from '@wot-ui/ci'

function normalizeMultilineSecret(value: string) {
  return value.replace(/\r\n/g, '\n').replace(/\\n/g, '\n')
}

export default defineConfig(({ env, packageJson }) => ({
  version: env.WOTCI_VERSION || packageJson?.version,
  desc: env.WOTCI_DESC || packageJson?.description,
  weixin: env.WEIXIN_APPID
    ? {
        appid: env.WEIXIN_APPID,
        privateKeyPath: env.WEIXIN_PRIVATE_KEY_PATH || 'private.key',
        projectPath: env.WEIXIN_PROJECT_PATH || 'dist/build/mp-weixin',
        robot: env.WEIXIN_ROBOT ? Number(env.WEIXIN_ROBOT) : 1,
        setting: {
          useProjectConfig: true
        }
      }
    : undefined,
  alipay:
    env.ALIPAY_TOOL_ID && env.ALIPAY_APPID && env.ALIPAY_PRIVATE_KEY
      ? {
          toolId: env.ALIPAY_TOOL_ID,
          appid: env.ALIPAY_APPID,
          privateKey: normalizeMultilineSecret(env.ALIPAY_PRIVATE_KEY),
          projectPath: env.ALIPAY_PROJECT_PATH || 'dist/build/mp-alipay',
          autoincrement: env.ALIPAY_AUTOINCREMENT ? env.ALIPAY_AUTOINCREMENT === 'true' : true
        }
      : undefined
}))
