import { type ComponentPublicInstance, type ExtractPropTypes, type InjectionKey, type PropType } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeStringProp } from '../../common/props'

export type CollapseToggleAllOptions =
  | boolean
  | {
      expanded?: boolean
      skipDisabled?: boolean
    }

export type CollapseProvide = {
  props: Partial<CollapseProps>
  toggle: (name: string, expanded: boolean) => void
}

export const COLLAPSE_KEY: InjectionKey<CollapseProvide> = Symbol('wd-collapse')

export const collapseProps = {
  ...baseProps,
  /**
   * 查看更多模式下的插槽外部自定义样式类
   * 类型: string
   */
  customMoreSlotClass: makeStringProp(''),
  /**
   * 绑定值，手风琴模式下为 string，普通模式下为 array，查看更多模式下为 boolean
   * 类型: string | string[] | boolean
   */
  modelValue: {
    type: [String, Array, Boolean] as PropType<string | string[] | boolean>
  },
  /**
   * 是否开启手风琴模式
   * 类型: boolean
   * 默认值: false
   */
  accordion: makeBooleanProp(false),
  /**
   * 是否开启查看更多模式
   * 类型: boolean
   * 默认值: false
   */
  viewmore: makeBooleanProp(false),
  /**
   * 查看更多模式下，是否使用自定义插槽
   * 类型: boolean
   * 默认值: false
   */
  useMoreSlot: makeBooleanProp(false),
  /**
   * 查看更多模式下，收起时的显示行数
   * 类型: number
   * 默认值: 2
   */
  lineNum: makeNumberProp(2)
}

export type CollapseProps = ExtractPropTypes<typeof collapseProps>

export type CollapseExpose = {
  /**
   * 切换所有面板展开状态，传 true 为全部展开，false 为全部收起，不传参为全部切换
   * @param options 面板状态
   */
  toggleAll: (options?: CollapseToggleAllOptions) => void
}

export type CollapseInstance = ComponentPublicInstance<CollapseProps, CollapseExpose>
