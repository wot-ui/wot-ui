import type { PropType } from 'vue'
import { baseProps, makeBooleanProp } from '../../common/props'
import type { LoadingProps } from '../wd-loading/types'

/**
 * loadmore 组件的加载状态
 * - loading: 加载中
 * - error: 加载失败
 * - finished: 加载完成
 */
export type LoadMoreState = 'loading' | 'error' | 'finished'

export const loadmoreProps = {
  ...baseProps,
  /**
   * 加载状态
   * 可选值: 'loading' | 'error' | 'finished'
   * 默认值: undefined
   */
  state: String as PropType<LoadMoreState>,
  /**
   * 加载中的提示文案
   * 默认值: 国际化文案
   */
  loadingText: String,
  /**
   * 加载完成的提示文案
   * 默认值: 国际化文案
   */
  finishedText: String,
  /**
   * 加载失败的提示文案
   * 默认值: 国际化文案
   */
  errorText: String,
  /**
   * Loading 组件配置属性
   * 类型: Partial<LoadingProps>
   * 默认值: {}
   */
  loadingProps: Object as PropType<Partial<LoadingProps>>,
  /**
   * 是否启用玻璃（glassmorphism）样式
   * 类型: boolean
   * 默认值: false
   */
  glass: makeBooleanProp(false)
}
