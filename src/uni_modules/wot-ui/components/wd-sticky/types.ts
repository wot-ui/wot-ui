import { baseProps, makeBooleanProp, makeNumberProp } from '../../common/props'

export const stickyProps = {
  ...baseProps,
  /**
   * 层级
   */
  zIndex: makeNumberProp(1),
  /**
   * 吸顶距离
   */
  offsetTop: makeNumberProp(0),
  /**
   * 是否启用玻璃（glassmorphism）样式
   * 类型: boolean
   * 默认值: false
   */
  glass: makeBooleanProp(false)
}
