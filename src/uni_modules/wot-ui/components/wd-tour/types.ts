import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeArrayProp } from '../../common/props'

/** 缺失目标元素时的处理策略 */
export type MissingStrategy = 'skip' | 'stop' | 'hide'
/** 引导提示框位置 */
export type TourPlacement = 'auto' | 'top' | 'bottom' | 'left' | 'right'

/** 单个引导步骤配置 */
export type TourStep = {
  /**
   * 需要高亮的元素选择器
   */
  element: string
  /**
   * 引导文字内容
   */
  content: string
  /**
   * 覆盖当前步骤的内边距
   */
  padding?: number
  /**
   * 覆盖当前步骤的提示与高亮间距
   */
  offset?: number
  /**
   * 强制提示位置
   * 可选值: 'auto' | 'top' | 'bottom' | 'left' | 'right'
   */
  placement?: TourPlacement
}

export const tourProps = {
  ...baseProps,

  /**
   * 是否显示引导组件，使用 v-model 绑定
   * 类型: boolean
   * 默认值: false
   */
  modelValue: makeBooleanProp(false),

  /**
   * 引导步骤列表
   * 类型: TourStep[]
   * 默认值: []
   */
  steps: makeArrayProp<TourStep>(),
  /**
   * 引导框的当前步骤索引
   * 类型: number
   * 默认值: 0
   */
  current: makeNumberProp(0),

  /**
   * 蒙版是否显示
   * 类型: boolean
   * 默认值: true
   */
  mask: makeBooleanProp(true),

  /**
   * 蒙版颜色（支持 rgba 格式）
   * 类型: string
   */
  maskColor: String,
  /**
   * 引导框与高亮元素之间的间距，单位 px
   * 类型: number
   * 默认值: 20
   */
  offset: makeNumberProp(20),

  /**
   * 动画持续时间（毫秒）
   * 类型: number
   * 默认值: 300
   */
  duration: makeNumberProp(300),
  /**
   * 高亮区域的圆角大小
   * 类型: number
   * 默认值: 4
   */
  borderRadius: makeNumberProp(4),
  /**
   * 高亮区域的内边距
   * 类型: number
   * 默认值: 8
   */
  padding: makeNumberProp(8),
  /**
   * 上一步按钮文字
   * 类型: string
   */
  prevText: String,

  /**
   * 下一步按钮文字
   * 类型: string
   */
  nextText: String,

  /**
   * 跳过按钮文字
   * 类型: string
   */
  skipText: String,

  /**
   * 完成按钮文字
   * 类型: string
   */
  finishText: String,

  /**
   * 安全偏移量，用于滚动计算时确保元素周围有足够的空间
   * 类型: number
   * 默认值: 100
   */
  bottomSafetyOffset: makeNumberProp(100),

  /**
   * 顶部安全偏移量，用于滚动计算时确保元素周围有足够的空间
   * 类型: number
   * 默认值: 0
   */
  topSafetyOffset: makeNumberProp(0),

  /**
   * 是否自定义顶部导航栏
   * 类型: boolean
   * 默认值: false
   */
  customNav: makeBooleanProp(false),

  /**
   * 点击蒙版是否可以下一步
   * 类型: boolean
   * 默认值: false
   */
  clickMaskNext: makeBooleanProp(false),
  /**
   * 高亮区域样式
   * 类型: CSSProperties
   * 默认值: {}
   */
  highlightStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => ({})
  },
  /**
   * 引导框的层级
   * 类型: number
   */
  zIndex: Number,
  /**
   * 是否显示引导按钮
   * 类型: boolean
   * 默认值: true
   */
  showTourButtons: makeBooleanProp(true),
  /**
   * 查询作用域，限定选择器范围
   * 类型: unknown
   */
  scope: {
    type: Object as PropType<unknown>
  },
  /**
   * 缺失元素处理策略
   * 类型: MissingStrategy
   * 可选值: 'skip' | 'stop' | 'hide'
   * 默认值: 'stop'
   */
  missingStrategy: {
    type: String as PropType<MissingStrategy>,
    default: 'stop'
  }
}

export type TourProps = ExtractPropTypes<typeof tourProps>

export type TourChangeDetail = {
  /** 当前步骤的索引 */
  current: number
}

export type TourSwitchDetail = {
  /** 上一步的索引 */
  prevCurrent: number
  /** 当前步骤的索引 */
  current: number
  /** 总步骤数 */
  total: number
  /** 目标元素是否在屏幕上半部分 */
  isElementInTop: boolean
}

export type TourFinishDetail = {
  /** 当前步骤的索引 */
  current: number
  /** 总步骤数 */
  total: number
}

export type TourErrorDetail = {
  /** 错误信息 */
  message: string
  /** 目标元素选择器 */
  element: string
}

export type TourEmits = {
  /**
   * 更新 modelValue 事件，用于更新是否显示引导组件
   * @param value 是否显示引导组件
   */
  'update:modelValue': [value: boolean]
  /**
   * 更新 current 事件，用于更新当前步骤索引
   * @param value 当前步骤索引
   */
  'update:current': [value: number]
  /**
   * 切换事件，用于切换到上一步或下一步
   * @param detail 切换事件参数
   */
  change: [detail: TourChangeDetail]
  /**
   * 上一步事件，用于切换到上一步
   * @param detail 上一步事件参数
   */
  prev: [detail: TourSwitchDetail]
  /**
   * 下一步事件，用于切换到下一步
   * @param detail 下一步事件参数
   */
  next: [detail: TourSwitchDetail]
  /**
   * 完成事件，用于完成引导
   * @param detail 完成事件参数
   */
  finish: [detail: TourFinishDetail]
  /**
   * 跳过事件，用于跳过引导
   * @param detail 跳过事件参数
   */
  skip: [detail: TourFinishDetail]
  /**
   * 错误事件，用于处理引导过程中出现的错误
   * @param detail 错误事件参数
   */
  error: [detail: TourErrorDetail]
}

export type TourExpose = {
  /** 切换到上一步 */
  handlePrev: () => void
  /** 切换到下一步 */
  handleNext: () => void
  /** 结束引导流程 */
  handleFinish: () => void
  /** 跳过引导流程 */
  handleSkip: () => void
}
