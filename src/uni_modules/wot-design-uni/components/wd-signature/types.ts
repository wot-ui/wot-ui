import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseProps, numericProp } from '../common/props'

export const signatureProps = {
  ...baseProps,

  /**
   * 签名笔颜色
   * 类型: string
   * 默认值: '#000'
   */
  penColor: {
    type: String,
    default: '#000'
  },

  /**
   * 签名笔宽度
   * 类型: number
   * 默认值: 3
   */
  lineWidth: {
    type: Number,
    default: 3
  },

  /**
   * 保存按钮的文本
   * 类型: string
   * 默认值: 内置翻译 '确定'
   */
  confirmText: String,

  /**
   * 清除按钮的文本
   * 类型: string
   * 默认值: 内置翻译 '清除'
   */
  clearText: String,

  /**
   * 撤回按钮的文本
   * 类型: string
   * 默认值: 内置翻译 '撤回'
   */
  revokeText: String,

  /**
   * 恢复按钮的文本
   * 类型: string
   * 默认值: 内置翻译 '恢复'
   */
  restoreText: String,
  /**
   * 导出图片的类型
   * 类型: 'png' | 'jpg'
   * 可选值: 'png' | 'jpg'
   * 默认值: 'png'
   */
  fileType: {
    type: String as PropType<'png' | 'jpg'>,
    default: 'png'
  },

  /**
   * 导出图片的质量
   * 类型: number
   * 可选值: 0 ~ 1
   * 默认值: 1
   */
  quality: {
    type: Number,
    default: 1
  },

  /**
   * 导出图片的缩放比例
   * 类型: number
   * 默认值: 1
   */
  exportScale: {
    type: Number,
    default: 1
  },

  /**
   * 是否禁用签名板
   * 类型: boolean
   * 默认值: false
   */
  disabled: {
    type: Boolean,
    default: false
  },

  /**
   * 画布高度
   * 类型: string | number
   * 默认值: -
   */
  height: numericProp,

  /**
   * 画布宽度
   * 类型: string | number
   * 默认值: -
   */
  width: numericProp,

  /**
   * 画板背景色
   * 类型: string
   * 默认值: -
   */
  backgroundColor: String,

  /**
   * 是否禁用画布滚动
   * 类型: boolean
   * 默认值: true
   */
  disableScroll: {
    type: Boolean,
    default: true
  },

  /**
   * 是否开启历史记录
   * 类型: boolean
   * 默认值: false
   */
  enableHistory: {
    type: Boolean,
    default: false
  },

  /**
   * 撤回和恢复的步长
   * 类型: number
   * 默认值: 1
   */
  step: {
    type: Number,
    default: 1
  },

  /**
   * 撤销按钮文本
   * 类型: string
   * 默认值: 内置翻译 '撤销'
   */
  undoText: String,

  /**
   * 恢复按钮文本
   * 类型: string
   * 默认值: 内置翻译 '恢复'
   */
  redoText: String,

  /**
   * 是否开启压感模式
   * 类型: boolean
   * 默认值: false
   */
  pressure: {
    type: Boolean,
    default: false
  },

  /**
   * 压感模式下的最大笔触宽度
   * 类型: number
   * 默认值: 6
   */
  maxWidth: {
    type: Number,
    default: 6
  },

  /**
   * 压感模式下的最小笔触宽度
   * 类型: number
   * 默认值: 2
   */
  minWidth: {
    type: Number,
    default: 2
  },

  /**
   * 最小速度阈值
   * 类型: number
   * 默认值: 1.5
   */
  minSpeed: {
    type: Number,
    default: 1.5
  }
}

/**
 * 签名结果
 */
export type SignatureResult = {
  /** 生成图片的临时路径 */
  tempFilePath: string
  /** 是否成功生成图片 */
  success: boolean
  /** 生成图片的宽度 */
  width: number
  /** 生成图片的高度 */
  height: number
}

/**
 * 签名线条
 */
export interface Line {
  /** 线条轨迹点序列 */
  points: Point[]
  /** 线条颜色 */
  color: string
  /** 线条宽度 */
  width: number
  /** 线条背景色 */
  backgroundColor?: string
  /** 是否为压感笔迹 */
  isPressure?: boolean
}

/**
 * 签名点位坐标
 */
export interface Point {
  /** X 轴坐标 */
  x: number
  /** Y 轴坐标 */
  y: number
  /** 时间戳 (ms) */
  t: number
  /** 移动速度 (px/ms) */
  speed?: number
  /** 与前一点距离 (px) */
  distance?: number
  /** 当前点线宽 */
  lineWidth?: number
  /** 贝塞尔控制点 lastX1 */
  lastX1?: number
  /** 贝塞尔控制点 lastY1 */
  lastY1?: number
  /** 贝塞尔控制点 lastX2 */
  lastX2?: number
  /** 贝塞尔控制点 lastY2 */
  lastY2?: number
  /** 是否为线条起点 */
  isFirstPoint?: boolean
}

/**
 * 签名组件暴露的方法
 */
export type SignatureExpose = {
  /**
   * 初始化签名板
   * @param forceUpdate 是否强制重新获取 dom 节点计算尺寸，默认 false
   */
  init: (forceUpdate?: boolean) => void
  /**
   * 清空签名内容
   */
  clear: () => void
  /**
   * 确认签名，生成图片临时路径并触发 'confirm' 事件
   */
  confirm: () => void
  /**
   * 恢复一次撤销的操作 (需启用历史记录)
   */
  restore: () => void
  /**
   * 撤销一次签笔记录 (需启用历史记录)
   */
  revoke: () => void
}

/**
 * 签名组件 Props
 */
export type SignatureProps = ExtractPropTypes<typeof signatureProps>

/**
 * 签名组件实例
 */
export type SignatureInstance = ComponentPublicInstance<SignatureProps, SignatureExpose>
