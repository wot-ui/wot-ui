import type { ExtractPropTypes } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeStringProp } from '../../common/props'

/**
 * 排序按钮的排序方向值
 * 可选值: -1 | 0 | 1
 */
export type SortButtonValue = -1 | 0 | 1

export const sortButtonProps = {
  ...baseProps,
  /**
   * 选中的箭头方向，1 表示升序，0 表示重置状态，-1 表示降序
   * 类型: SortButtonValue
   * 可选值: -1 | 0 | 1
   * 默认值: 0
   */
  modelValue: makeNumberProp<SortButtonValue>(0),

  /**
   * 排序按钮展示的文案
   * 类型: string
   * 默认值: ''
   */
  title: makeStringProp(''),

  /**
   * 当展示双箭头时，是否允许手动重置按钮
   * 类型: boolean
   * 默认值: false
   */
  allowReset: makeBooleanProp(false),

  /**
   * 是否优先切换为降序，如果不开启则默认优先切换为升序
   * 类型: boolean
   * 默认值: false
   */
  descFirst: makeBooleanProp(false),

  /**
   * 是否展示下划线，当只有一个排序按钮时，通常不展示下划线
   * 类型: boolean
   * 默认值: false
   */
  line: makeBooleanProp(false)
}

export type SortButtonProps = ExtractPropTypes<typeof sortButtonProps>

/** 排序按钮 change 事件参数 */
export type SortButtonChangeDetail = {
  /** 当前排序方向值 */
  value: SortButtonValue
}

export type SortButtonEmits = {
  /**
   * 更新 modelValue 事件，切换排序方向时触发
   * @param value 排序方向值
   */
  'update:modelValue': [value: SortButtonValue]
  /**
   * 排序方向变化事件
   * @param detail 变化事件参数
   */
  change: [detail: SortButtonChangeDetail]
}
