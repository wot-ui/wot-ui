import { ref, onMounted, inject } from 'vue'
import { wotThemeOptionsKey } from '../options'

export type BannerData = {
  action: string
  title: string
  link: string
}

const data = ref<BannerData[]>([])

export function useBanner() {
  const options = inject(wotThemeOptionsKey)
  const bannerOptions = options?.banner

  onMounted(async () => {
    if (!bannerOptions || data.value.length) {
      return
    }

    // 定义数据源URL列表，按优先级排序
    const urls = bannerOptions.urls || []

    // 尝试从多个数据源获取数据
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

          const result = await response.json()
          return result && result.data ? result.data : []
        } catch (error) {
          console.warn(`Failed to fetch from ${url}`)
        }
      }

      return []
    }

    data.value = await fetchData()
  })

  return {
    data
  }
}
