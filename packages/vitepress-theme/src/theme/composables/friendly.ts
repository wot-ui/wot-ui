import { ref, onMounted, inject } from 'vue'
import { wotThemeOptionsKey } from '../options'

export type FriendlyLink = {
  icon: string
  title: string
  details: string
  link: string
}

const data = ref<FriendlyLink[]>([])

export function useFriendly() {
  const options = inject(wotThemeOptionsKey)
  const friendlyOptions = options?.friendly

  onMounted(async () => {
    if (!friendlyOptions || data.value.length) {
      return
    }

    const urls = friendlyOptions.urls || []

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
          return result && result.links ? result.links : []
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
