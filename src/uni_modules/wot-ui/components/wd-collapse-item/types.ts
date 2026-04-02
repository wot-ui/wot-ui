import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeRequiredProp, makeStringProp } from '../../common/props'

export type CollapseItemBeforeExpand = (name: string) => boolean | Promise<boolean>

export const collapseItemProps = {
  ...baseProps,
  /**
   * 自定义折叠栏内容容器样式类名
   * 类型: string
   */
  customBodyClass: makeStringProp(''),
  /**
   * 自定义折叠栏内容容器样式
   * 类型: string
   */
  customBodyStyle: makeStringProp(''),
  /**
   * 标题，可通过 slot 传递自定义内容
   * 类型: string
   */
  title: makeStringProp(''),
  /**
   * 是否禁用
   * 类型: boolean
   * 默认值: false
   */
  disabled: makeBooleanProp(false),
  /**
   * 唯一标识符
   * 类型: string
   * 必填
   */
  name: makeRequiredProp(String),
  /**
   * 展开前的回调函数，返回 false 可以阻止展开，支持返回 Promise
   * 类型: function
   */
  beforeExpend: Function as PropType<CollapseItemBeforeExpand>,
  /**
   * 是否显示边框
   * 类型: boolean
   * 默认值: true
   */
  border: makeBooleanProp(true)
}

export type CollapseItemProps = ExtractPropTypes<typeof collapseItemProps>

export type CollapseItemExpose = {
  /**
   * 获取展开状态
   * @returns boolean
   */
  getExpanded: () => boolean
  /**
   * 更新展开状态
   */
  updateExpand: () => Promise<void>
}

export type CollapseItemInstance = ComponentPublicInstance<CollapseItemProps, CollapseItemExpose>
