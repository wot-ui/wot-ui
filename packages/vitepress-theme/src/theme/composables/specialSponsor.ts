/*
 * @Author: weisheng
 * @Date: 2026-04-17 14:06:42
 * @LastEditTime: 2026-04-20 18:27:24
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-ui/packages/vitepress-theme/src/theme/composables/specialSponsor.ts
 * 记得注释
 */
import { ref, onMounted, inject } from 'vue'
import axios from 'axios'
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
    // 定义数据源URL列表，按优先级排序
    if (!sponsorOptions || data.value.length) {
      return
    }

    // 定义数据源URL列表，按优先级排序
    const urls = sponsorOptions.urls || []

    // 尝试从多个数据源获取数据
    const fetchData = async () => {
      for (const url of urls) {
        try {
          const response = await axios.get(url + '?t=' + Date.now(), {
            timeout: 5000 // 设置5秒超时
          })
          return response?.data?.data // 成功获取数据后直接返回
        } catch (error) {
          console.warn(`Failed to fetch from ${url}`)
          // 继续尝试下一个URL
        }
      }
      return [] // 所有数据源都失败时返回null
    }

    data.value = await fetchData()
  })

  return {
    data
  }
}
