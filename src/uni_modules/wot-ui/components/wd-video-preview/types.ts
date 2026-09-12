/*
 * @Author: weisheng
 * @Date: 2026-03-13 17:20:03
 * @LastEditTime: 2026-04-06 21:50:37
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-ui/src/uni_modules/wot-ui/components/wd-video-preview/types.ts
 * 记得注释
 */
import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseProps } from '../../common/props'

import { makeBooleanProp, makeNumberProp, makeStringProp } from '../../common/props'

export type VideoPreviewClosePosition = 'left-top' | 'right-top'

export const videoPreviewProps = {
  ...baseProps,
  /**
   * 区分视频预览和组件自身实例
   */
  selector: makeStringProp(''),
  /**
   * 层级
   * 类型: number
   * 默认值: 1000
   */
  zIndex: makeNumberProp(1000),
  /**
   * 是否全屏预览
   * 类型: boolean
   * 默认值: false
   */
  fullScreen: makeBooleanProp(false),
  /**
   * 是否显示原生全屏按钮
   * 类型: boolean
   * 默认值: true
   */
  showFullscreenBtn: makeBooleanProp(true),
  /**
   * 关闭按钮位置
   * 类型: VideoPreviewClosePosition
   * 可选值: 'left-top' | 'right-top'
   * 默认值: 'left-top'
   */
  closePosition: makeStringProp<VideoPreviewClosePosition>('left-top'),
  /**
   * 打开时的回调
   */
  onOpen: Function as PropType<() => void>,
  /**
   * 关闭时的回调
   */
  onClose: Function as PropType<() => void>
}

export type PreviewVideo = {
  url: string // 视频资源地址
  poster?: string // 视频封面
  title?: string // 视频标题
}

export type VideoPreviewProps = ExtractPropTypes<typeof videoPreviewProps>

export interface VideoPreviewOptions extends PreviewVideo {
  show?: boolean
  zIndex?: number
  /** 是否全屏预览 */
  fullScreen?: boolean
  /** 是否显示原生全屏按钮 */
  showFullscreenBtn?: boolean
  /** 关闭按钮位置 */
  closePosition?: VideoPreviewClosePosition
  /** 打开时的回调 */
  onOpen?: () => void
  /** 关闭时的回调 */
  onClose?: () => void
}

export type VideoPreview = {
  previewVideo: (options: VideoPreviewOptions | PreviewVideo) => void
  closeVideoPreview: () => void
}

export type VideoPreviewExpose = {
  /** 打开预览 */
  open: (video: VideoPreviewOptions) => void
  /** 关闭预览 */
  close: () => void
}

export type VideoPreviewInstance = ComponentPublicInstance<VideoPreviewExpose, VideoPreviewProps>
