import { ref, onMounted, inject } from 'vue'
import { wotThemeOptionsKey } from '../options'

export type EcosystemItem = {
  text: string
  link: string
  desc?: string
}

export type EcosystemGroup = {
  text: string
  items: EcosystemItem[]
}

type EcosystemPayload = {
  groups?: EcosystemGroup[]
}

// 开发阶段本地兜底；配置远程 urls 成功后优先用远程
const MOCK_ECOSYSTEM_GROUPS: EcosystemGroup[] = [
  {
    text: '官方生态',
    items: [
      { text: 'wot-starter', link: 'https://starter.wot-ui.cn/' },
      { text: '@wot-ui/router', link: 'https://my-uni.wot-ui.cn/' },
      { text: '@wot-ui/cli', link: 'https://github.com/wot-ui/open-wot' },
      { text: '@wot-ui/unocss-preset', link: 'https://github.com/wot-ui/unocss-preset' },
      {
        text: 'VS Code 插件',
        link: 'https://marketplace.visualstudio.com/items?itemName=wot-ui.wot-ui-intellisense'
      },
      { text: '小程序 CI 工具', link: 'https://github.com/Moonofweisheng/uni-mini-ci' },
      { text: 'wot-starter-retail', link: 'https://github.com/wot-ui/wot-starter-retail' },
      { text: '@wot-ui/oiyo-starter', link: 'https://github.com/wot-ui/oiyo-starter' }
    ]
  },
  {
    text: '开发资源',
    items: [
      { text: 'Uni Helper', link: 'https://uni-helper.js.org/' },
      { text: 'uni-ku', link: 'https://github.com/uni-ku' },
      { text: 'uni-echarts', link: 'https://uni-echarts.xiaohe.ink/' },
      { text: 'Oiyo', link: 'https://oiyo.js.org' }
    ]
  },
  {
    text: '模板方案',
    items: [
      { text: 'vitesse-uni-app', link: 'https://vitesse-docs.netlify.app/' },
      { text: 'unibest', link: 'https://unibest.tech/' }
    ]
  }
]

const data = ref<EcosystemGroup[]>([])

function normalizeGroups(groups: EcosystemGroup[]): EcosystemGroup[] {
  return groups
    .filter((group) => group && typeof group.text === 'string' && Array.isArray(group.items))
    .map((group) => ({
      text: group.text,
      items: group.items
        .filter((item) => item && typeof item.text === 'string' && typeof item.link === 'string')
        .map((item) => ({
          text: item.text,
          link: item.link,
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
