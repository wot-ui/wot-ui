import { ref, onMounted, inject } from 'vue'
import axios from 'axios'
import { wotThemeOptionsKey } from '../options.js'

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

    // 定义数据源URL列表，按优先级排序
    const urls = friendlyOptions.urls || []

    // 尝试从多个数据源获取数据
    const fetchData = async () => {
      for (const url of urls) {
        try {
          const response = await axios.get(url + '?t=' + Date.now(), {
            timeout: 5000 // 设置5秒超时
          })
          return response.data && response.data.links ? response.data.links : [] // 成功获取数据后直接返回
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
