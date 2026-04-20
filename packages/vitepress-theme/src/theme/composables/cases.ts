import { ref, onMounted, inject } from 'vue'
import { wotThemeOptionsKey } from '../options'

export type CaseData = {
  name: string
  image: string
  description?: string
}

const data = ref<CaseData[]>([])

export function useCaseData() {
  const options = inject(wotThemeOptionsKey)
  const casesOptions = options?.cases

  onMounted(async () => {
    if (!casesOptions || data.value.length) {
      return
    }

    const urls = casesOptions.urls || []

    const getFullImageUrl = (image: string, baseUrl: string): string => {
      if (!image) return ''
      if (image.startsWith('http://') || image.startsWith('https://')) {
        return image
      }
      try {
        const { origin } = new URL(baseUrl)
        return origin + image
      } catch {
        return baseUrl + image
      }
    }

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
          const caseData: CaseData[] = result && result.data ? result.data : []

          return caseData.map((item) => ({
            name: item.name,
            image: getFullImageUrl(item.image, url),
            description: item.description
          }))
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
