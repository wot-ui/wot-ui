import { ref, onMounted, inject } from 'vue'
import { wotThemeOptionsKey } from '../options'

const data = ref()

export function useSponsor() {
  const options = inject(wotThemeOptionsKey)
  const sponsorOptions = options?.sponsors

  onMounted(async () => {
    if (!sponsorOptions || data.value) {
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

          return await response.json()
        } catch (error) {
          console.warn(`Failed to fetch from ${url}`)
        }
      }
      return null
    }

    data.value = await fetchData()
  })

  return {
    data
  }
}
