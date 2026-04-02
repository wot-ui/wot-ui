/*
 * @Author: weisheng
 * @Date: 2024-03-15 11:36:12
 * @LastEditTime: 2026-03-03 12:57:28
 * @LastEditors: weisheng
 * @Description: ImagePreview 图片预览
 * @FilePath: /wot-design-uni/src/uni_modules/wot-ui/components/wd-image-preview/types.ts
 * 记得注释
 */
import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeStringProp } from '../../common/props'

/**
 * 关闭图标位置
 */
export type ImagePreviewCloseIconPosition = 'top-left' | 'top-right'

/**
 * 函数式调用选项
 */
export type ImagePreviewOptions = {
  /** 图片 URL 数组 */
  images?: string[]
  /** 起始位置索引 */
  startPosition?: number
  /** 是否显示页码 */
  showIndex?: boolean
  /** 是否循环播放 */
  loop?: boolean
  /** 是否显示关闭按钮 */
  closeable?: boolean
  /** 关闭图标名称 */
  closeIcon?: string
  /** 关闭图标位置 */
  closeIconPosition?: ImagePreviewCloseIconPosition
  /** 是否点击图片或遮罩时关闭 */
  closeOnClick?: boolean
  /** 开启长按图片显示识别小程序码菜单 */
  showMenuByLongpress?: boolean
  /** 是否显示 */
  show?: boolean
  /** zIndex 层级 */
  zIndex?: number
  /** 打开时的回调 */
  onOpen?: () => void
  /** 关闭时的回调 */
  onClose?: () => void
  /** 切换图片时的回调 */
  onChange?: (index: number) => void
  /** 长按图片时的回调 */
  onLongPress?: (image: string) => void
}

/**
 * ImagePreview 接口
 */
export interface ImagePreview {
  /** 打开图片预览 */
  previewImage: (options: ImagePreviewOptions | string[]) => void
  /** 关闭图片预览 */
  closeImagePreview: () => void
}

export const imagePreviewProps = {
  ...baseProps,
  /**
   * 选择器
   * 类型: string
   * 默认值: ''
   */
  selector: makeStringProp(''),
  /**
   * 图片 URL 数组
   * 类型: string[]
   * 默认值: []
   */
  images: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  /**
   * 起始位置索引
   * 类型: number
   * 默认值: 0
   */
  startPosition: makeNumberProp(0),
  /**
   * 是否显示页码
   * 类型: boolean
   * 默认值: true
   */
  showIndex: makeBooleanProp(true),
  /**
   * 是否循环播放
   * 类型: boolean
   * 默认值: true
   */
  loop: makeBooleanProp(true),
  /**
   * 是否显示关闭按钮
   * 类型: boolean
   * 默认值: true
   */
  closeable: makeBooleanProp(true),
  /**
   * 关闭图标名称
   * 类型: string
   * 默认值: 'close'
   */
  closeIcon: makeStringProp('close'),
  /**
   * 关闭图标位置
   * 类型: string
   * 可选值: 'top-left' | 'top-right'
   * 默认值: 'top-right'
   */
  closeIconPosition: makeStringProp<ImagePreviewCloseIconPosition>('top-right'),
  /**
   * 是否点击图片或遮罩时关闭
   * 类型: boolean
   * 默认值: true
   */
  closeOnClick: makeBooleanProp(true),
  /**
   * 开启长按图片显示识别小程序码菜单
   * 类型: boolean
   * 默认值: true
   */
  showMenuByLongpress: makeBooleanProp(true),
  /**
   * 打开时的回调
   */
  onOpen: Function as PropType<() => void>,
  /**
   * 关闭时的回调
   */
  onClose: Function as PropType<() => void>,
  /**
   * 切换图片时的回调
   */
  onChange: Function as PropType<(index: number) => void>,
  /**
   * 长按图片时的回调
   */
  onLongPress: Function as PropType<(image: string) => void>,
  /**
   * 层级
   * 类型: number
   * 默认值: 1000
   */
  zIndex: makeNumberProp(1000)
}

export type ImagePreviewProps = ExtractPropTypes<typeof imagePreviewProps>

export type ImagePreviewExpose = {
  /** 打开图片预览 */
  open: (options?: ImagePreviewOptions | string[]) => void
  /** 关闭图片预览 */
  close: () => void
  /** 切换到指定图片 */
  setActive: (index: number) => void
}

export type ImagePreviewInstance = ComponentPublicInstance<ImagePreviewExpose, ImagePreviewProps>
