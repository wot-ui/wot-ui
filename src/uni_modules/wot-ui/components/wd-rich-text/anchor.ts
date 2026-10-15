import type { ComponentPublicInstance } from 'vue'
import type { RichTextAnchorRect } from './types'

/** 在节点所属组件内查询生成的 ID，不把内容中的 ID 拼入选择器。 */
export function measureAnchor(domId: string, instance: ComponentPublicInstance): Promise<RichTextAnchorRect> {
  return new Promise((resolve, reject) => {
    let query = uni.createSelectorQuery()
    // 支付宝不支持 in(component)，生成的 DOM ID 在页面内保持唯一。
    // #ifndef MP-ALIPAY
    query = query.in(instance)
    // #endif
    query
      .select(`#${domId}`)
      .boundingClientRect((rect) => {
        if (!rect || Array.isArray(rect) || !Number.isFinite(rect.top) || (!rect.width && !rect.height)) {
          reject(new Error('Anchor is not visible or has not been rendered'))
          return
        }
        resolve({ top: rect.top!, left: rect.left!, width: rect.width!, height: rect.height! })
      })
      .exec()
  })
}

/** 页面滚动与容器滚动分开处理，此方法只读取页面滚动量。 */
export function getPageScrollTop(): Promise<number> {
  return new Promise((resolve, reject) => {
    uni
      .createSelectorQuery()
      .selectViewport()
      .scrollOffset((result) => {
        if (!result || Array.isArray(result) || !Number.isFinite(result.scrollTop)) reject(new Error('Page scroll position is unavailable'))
        else resolve(result.scrollTop!)
      })
      .exec()
  })
}
