import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeStringProp } from '../common/props'

/**
 * 滑块值类型 - 单滑块为数字，双滑块为数组
 */
export type SliderValue = number | number[]

/**
 * 滑块风格类型
 */
export type SliderTheme = 'default' | 'capsule'

/**
 * 气泡显示模式
 */
export type SliderPopoverVisible = 'always' | 'normal' | 'never'

/**
 * 刻度标记类型
 * - 数组形式: [0, 25, 50, 75, 100]
 * - 对象形式: { 0: '0%', 25: '25%', 50: '50%', 75: '75%', 100: '100%' }
 */
export type SliderMarks = number[] | Record<number, string>

export const sliderProps = {
  ...baseProps,

  /**
   * 绑定的值
   * 类型: number | number[]
   * 默认值: 0
   */
  modelValue: {
    type: [Number, Array] as PropType<SliderValue>,
    default: 0
  },

  /**
   * 最小值
   * 类型: number
   * 默认值: 0
   */
  min: makeNumberProp(0),

  /**
   * 最大值
   * 类型: number
   * 默认值: 100
   */
  max: makeNumberProp(100),

  /**
   * 步长
   * 类型: number
   * 默认值: 1
   */
  step: makeNumberProp(1),

  /**
   * 是否为双向滑块模式
   * 类型: boolean
   * 默认值: false
   */
  range: makeBooleanProp(false),

  /**
   * 是否垂直展示
   * 类型: boolean
   * 默认值: false
   */
  vertical: makeBooleanProp(false),

  /**
   * 滑块风格
   * 类型: 'default' | 'capsule'
   * 可选值: 'default' | 'capsule'
   * 默认值: 'default'
   */
  theme: makeStringProp<SliderTheme>('default'),

  /**
   * 是否禁用滑块
   * 类型: boolean
   * 默认值: false
   */
  disabled: makeBooleanProp(false),

  /**
   * 是否显示最大最小值文本
   * 类型: boolean
   * 默认值: false
   */
  showExtremeValue: makeBooleanProp(false),

  /**
   * 气泡显示模式
   * 类型: 'always' | 'normal' | 'never'
   * 可选值: 'always' | 'normal' | 'never'
   * 默认值: 'normal'
   */
  popoverVisible: makeStringProp<SliderPopoverVisible>('normal'),

  /**
   * 刻度标记
   * 类型: number[] | Record<number, string>
   * 默认值: -
   */
  marks: [Array, Object] as PropType<SliderMarks>,

  /**
   * 进度条激活态颜色
   * 类型: string
   * 默认值: ''
   */
  activeColor: makeStringProp(''),

  /**
   * 进度条未激活态颜色
   * 类型: string
   * 默认值: ''
   */
  inactiveColor: makeStringProp('')
}

/**
 * 滑块拖动事件参数
 */
export interface SliderDragEvent {
  /** 当前滑块的值 */
  value: SliderValue
}

/**
 * 滑块组件事件类型定义
 */
export type SliderEmits = {
  /** 开始拖动滑块时触发 */
  dragstart: [event: SliderDragEvent]
  /** 拖动滑块过程中触发 */
  dragmove: [event: SliderDragEvent]
  /** 结束拖动滑块时触发 */
  dragend: [event: SliderDragEvent]
  /** 值变化时触发（拖动结束或点击轨道后） */
  change: [value: SliderValue]
  /** 更新滑块值时触发，用于 v-model 绑定 */
  'update:modelValue': [value: SliderValue]
}

/**
 * 滑块组件暴露的方法
 */
export type SliderExpose = {
  /** 初始化 slider 尺寸 */
  initSlider: () => void
}

/**
 * 滑块组件 Props
 */
export type SliderProps = ExtractPropTypes<typeof sliderProps>

/**
 * 滑块组件实例
 */
export type SliderInstance = ComponentPublicInstance<SliderProps, SliderExpose>
