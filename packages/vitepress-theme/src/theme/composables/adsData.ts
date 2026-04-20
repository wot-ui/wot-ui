/*
 * @Author: weisheng
 * @Date: 2025-09-23 13:02:59
 * @LastEditTime: 2026-04-20 19:44:29
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-ui/packages/vitepress-theme/src/theme/composables/adsData.ts
 * 记得注释
 */
import { ref, onMounted, inject } from 'vue'
import axios from 'axios'
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

    // 定义数据源URL列表，按优先级排序
    const urls = adsOptions.urls || []

    // 尝试从多个数据源获取数据
    const fetchData = async () => {
      for (const url of urls) {
        try {
          const response = await axios.get(url + '?t=' + Date.now(), {
            timeout: 5000 // 设置5秒超时
          })
          return response.data && response.data.ads ? response.data.ads : [] // 成功获取数据后直接返回
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
