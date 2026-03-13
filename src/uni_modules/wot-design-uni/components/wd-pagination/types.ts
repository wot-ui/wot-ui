import { type PropType } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeRequiredProp } from '../common/props'
import { type ButtonVariant } from '../wd-button/types'

export const paginationProps = {
  ...baseProps,
  /**
   * 当前页
   * 类型: number
   * 默认值: 必填
   */
  modelValue: makeRequiredProp(Number),
  /**
   * 总页数，如果有total，则优先使用total计算页数
   * 类型: number
   * 默认值: 1
   */
  totalPage: makeNumberProp(1),
  /**
   * 是否展示分页为Icon图标
   * 类型: boolean
   * 默认值: false
   */
  showIcon: makeBooleanProp(false),
  /**
   * 按钮的variant
   * 类型: ButtonVariant
   * 可选值: 'base' | 'plain' | 'dashed' | 'text'
   * 默认值: 'text'
   */
  buttonVariant: {
    type: String as PropType<ButtonVariant>,
    default: 'text'
  },
  /**
   * 是否展示总条数
   * 类型: boolean
   * 默认值: false
   */
  showMessage: makeBooleanProp(false),
  /**
   * 总条数
   * 类型: number
   * 默认值: 0
   */
  total: makeNumberProp(0),
  /**
   * 每页条数
   * 类型: number
   * 默认值: 10
   */
  pageSize: makeNumberProp(10),
  /**
   * 上一页文本
   * 类型: string
   */
  prevText: String,
  /**
   * 下一页文本
   * 类型: string
   */
  nextText: String,
  /**
   * 总页数只有一页时是否隐藏
   * 类型: boolean
   * 默认值: false
   */
  hideIfOnePage: makeBooleanProp(false)
}
