import { ref, onMounted, inject } from 'vue'
import { wotThemeOptionsKey } from '../options'

export type EcosystemItem = {
  text: string
  link: string
  icon: string
  desc?: string
}

export type EcosystemGroup = {
  text: string
  items: EcosystemItem[]
}

type EcosystemPayload = {
  groups?: EcosystemGroup[]
}

const OFFICIAL_ECOSYSTEM_GROUP_TEXT = '官方生态'

// 开发阶段本地兜底；配置远程 urls 成功后优先用远程
const MOCK_ECOSYSTEM_GROUPS: EcosystemGroup[] = [
  {
    text: OFFICIAL_ECOSYSTEM_GROUP_TEXT,
    items: [
      {
        text: 'wot-starter',
        link: 'https://starter.wot-ui.cn/',
        icon: 'https://starter.wot-ui.cn/favicon.ico',
        desc: 'Wot UI 官方快速起手项目'
      },
      {
        text: '@wot-ui/router',
        link: 'https://my-uni.wot-ui.cn/',
        icon: 'https://my-uni.wot-ui.cn/favicon.ico',
        desc: 'Wot UI 官方路由与工程能力扩展'
      },
      {
        text: '@wot-ui/cli',
        link: 'https://github.com/wot-ui/open-wot',
        icon: 'https://github.com/favicon.ico',
        desc: 'Wot UI 官方 AI 工具链与 CLI'
      },
      {
        text: '@wot-ui/unocss-preset',
        link: 'https://github.com/wot-ui/unocss-preset',
        icon: 'https://github.com/favicon.ico',
        desc: 'Wot UI 官方 UnoCSS 预设'
      },
      {
        text: 'VS Code 插件',
        link: 'https://marketplace.visualstudio.com/items?itemName=wot-ui.wot-ui-intellisense',
        icon: 'https://wot-ui.cn/logo.svg',
        desc: 'Wot UI 官方 VS Code 智能提示插件'
      },
      {
        text: '小程序 CI 工具',
        link: 'https://github.com/Moonofweisheng/uni-mini-ci',
        icon: 'https://github.com/favicon.ico',
        desc: '小程序自动化构建与发布工具'
      },
      {
        text: 'wot-starter-retail',
        link: 'https://github.com/wot-ui/wot-starter-retail',
        icon: 'https://github.com/favicon.ico',
        desc: '基于 Wot UI 的零售行业模板'
      },
      {
        text: '@wot-ui/oiyo-starter',
        link: 'https://github.com/wot-ui/oiyo-starter',
        icon: 'https://oiyo-starter.wot-ui.cn/static/logo.png',
        desc: '基于 Oiyo 的 Wot UI 起手模板'
      }
    ]
  }
]

const data = ref<EcosystemGroup[]>([])

function normalizeGroups(groups: EcosystemGroup[]): EcosystemGroup[] {
  return groups
    .filter((group) => group && group.text === OFFICIAL_ECOSYSTEM_GROUP_TEXT && Array.isArray(group.items))
    .map((group) => ({
      text: group.text,
      items: group.items
        .filter(
          (item) => item && typeof item.text === 'string' && typeof item.link === 'string' && typeof item.icon === 'string' && item.icon.length > 0
        )
        .map((item) => ({
          text: item.text,
          link: item.link,
          icon: item.icon,
          desc: item.desc
        }))
    }))
    .filter((group) => group.items.length > 0)
}

export function useEcosystem() {
  const options = inject(wotThemeOptionsKey)
  const ecosystemOptions = options?.ecosystem

  onMounted(async () => {
    if (!ecosystemOptions || data.value.length) {
      return
    }

    console.log(ecosystemOptions)

    const urls = ecosystemOptions.urls || []

    const fetchData = async () => {
      for (const url of urls) {
        try {
          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), 5000)

          const response = await fetch(url + '?t=' + Date.now(), {
            signal: controller.signal
          })
          clearTimeout(timeoutId)

          if (!response.ok) continue

          const result = (await response.json()) as EcosystemPayload
          const groups = result && Array.isArray(result.groups) ? result.groups : []
          const normalizedGroups = normalizeGroups(groups)

          if (normalizedGroups.length) {
            return normalizedGroups
          }
        } catch {
          console.warn('Failed to fetch ecosystem from ' + url)
        }
      }

      return normalizeGroups(MOCK_ECOSYSTEM_GROUPS)
    }

    data.value = await fetchData()
  })

  return { data }
}
