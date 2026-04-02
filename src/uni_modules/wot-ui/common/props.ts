/*
 * @Author: weisheng
 * @Date: 2025-05-08 22:54:27
 * @LastEditTime: 2026-01-31 23:03:27
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-design-uni/src/uni_modules/wot-ui/common/props.ts
 * 记得注释
 */
import type { PropType } from 'vue'

export type Numeric = number | string

export const unknownProp = null as unknown as PropType<unknown>

export const numericProp = [Number, String]

export const truthProp = {
  type: Boolean,
  default: true as const
}

export const makeRequiredProp = <T>(type: T) => ({
  type,
  required: true as const
})

export const makeArrayProp = <T>() => ({
  type: Array as PropType<T[]>,
  default: () => []
})

export const makeBooleanProp = <T>(defaultVal: T) => ({
  type: Boolean,
  default: defaultVal
})

export const makeNumberProp = <T>(defaultVal: T) => ({
  type: Number,
  default: defaultVal
})

export const makeNumericProp = <T>(defaultVal: T) => ({
  type: numericProp,
  default: defaultVal
})

export const makeStringProp = <T>(defaultVal: T) => ({
  type: String as unknown as PropType<T>,
  default: defaultVal
})

export const baseProps = {
  /**
   * 自定义根节点样式
   */
  customStyle: makeStringProp(''),
  /**
   * 自定义根节点样式类
   */
  customClass: makeStringProp('')
}
