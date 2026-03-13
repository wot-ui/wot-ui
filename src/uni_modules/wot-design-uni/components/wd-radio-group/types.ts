/*
 * @Author: weisheng
 * @Date: 2025-05-08 22:54:27
 * @LastEditTime: 2026-03-03 14:04:13
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-design-uni/src/uni_modules/wot-design-uni/components/wd-radio-group/types.ts
 * 记得注释
 */
import { type ExtractPropTypes, type InjectionKey } from 'vue'
import type { RadioDirection, RadioPlacement, RadioType } from '../wd-radio/types'
import { baseProps, makeBooleanProp, makeStringProp } from '../common/props'

export const radioGroupProps = {
  ...baseProps,
  /**
   * 会自动选中value对应的单选框
   */
  modelValue: [String, Number, Boolean],
  /**
   * 单选框类型
   * 可选值: dot | circle | square | button
   * 默认值: circle
   */
  type: makeStringProp<RadioType>('circle'),
  /**
   * 选中的颜色
   */
  checkedColor: String,
  /**
   * 未选中状态的颜色
   */
  uncheckedColor: String,
  /**
   * 是否禁用
   * 默认值: false
   */
  disabled: makeBooleanProp(false),
  /**
   * 是否只读
   * 默认值: false
   */
  readonly: makeBooleanProp(false),
  /**
   * 设置大小
   * 默认值: 空
   */
  size: makeStringProp(''),
  /**
   * 图标位置
   * 可选值: 'left' | 'right'
   * 默认值: left
   */
  placement: makeStringProp<RadioPlacement>('left'),
  /**
   * 布局方向
   * 可选值: 'horizontal' | 'vertical'
   * 默认值: vertical
   */
  direction: makeStringProp<RadioDirection>('vertical'),
  /**
   * 是否允许取消选中
   * 默认值: false
   */
  allowUncheck: makeBooleanProp(false)
}

export type RadioProps = ExtractPropTypes<typeof radioGroupProps>

export type RadioGroupProvide = {
  props: Partial<RadioProps>
  updateValue: (value: string | number | boolean | null) => void
}

export const RADIO_GROUP_KEY: InjectionKey<RadioGroupProvide> = Symbol('wd-radio-group')
