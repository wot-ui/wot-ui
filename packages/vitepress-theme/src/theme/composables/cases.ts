/*
 * @Author: weisheng
 * @Date: 2025-11-04 17:17:20
 * @LastEditTime: 2026-04-20 19:44:00
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-ui/packages/vitepress-theme/src/theme/composables/cases.ts
 * 记得注释
 */
import { ref, onMounted, inject } from 'vue'
import axios from 'axios'
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

    // 定义数据源URL列表，按优先级排序
    const urls = casesOptions.urls || []

    // 尝试从多个数据源获取数据
    const fetchData = async () => {
      for (const url of urls) {
        try {
          const response = await axios.get(url + '?t=' + Date.now(), {
            timeout: 5000 // 设置5秒超时
          })
          const data: CaseData[] = response.data && response.data.data ? response.data.data : []
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
          return data.map((item) => {
            return {
              name: item.name,
              image: getFullImageUrl(item.image, url),
              description: item.description
            }
          }) // 成功获取数据后直接返回
        } catch (error) {
          console.warn(`Failed to fetch from ${url}`)
          // 继续尝试下一个URL
        }
      }
      return [] // 所有数据源都失败时返回空数组
    }

    data.value = await fetchData()
  })

  return {
    data
  }
}
