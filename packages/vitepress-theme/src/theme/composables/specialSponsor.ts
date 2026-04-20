import { ref, onMounted, inject } from 'vue'
import { wotThemeOptionsKey } from '../options'

export type GridSize = 'xmini' | 'mini' | 'small' | 'medium' | 'big'

export interface Sponsor {
  name: string
  img: string
  url: string
}
export interface Sponsors {
  tier?: string
  size?: GridSize
  items: Sponsor[]
}

const data = ref<Sponsors[]>([])

export function useSpecialSponsor() {
  const options = inject(wotThemeOptionsKey)

  onMounted(async () => {
    const sponsorOptions = options?.specialSponsor
    if (!sponsorOptions || data.value.length) {
      return
    }

    const urls = sponsorOptions.urls || []

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
          return result?.data
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
