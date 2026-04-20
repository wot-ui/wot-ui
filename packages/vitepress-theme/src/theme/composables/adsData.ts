import { ref, onMounted, inject } from 'vue'
import { wotThemeOptionsKey } from '../options'

export type AdData = {
  image: string
  title?: string
  link?: string
}

const data = ref<AdData[]>([])

export function useAds() {
  const options = inject(wotThemeOptionsKey)
  const adsOptions = options?.ads

  onMounted(async () => {
    if (!adsOptions || data.value.length) {
      return
    }

    const urls = adsOptions.urls || []

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
          return result && result.ads ? result.ads : []
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
