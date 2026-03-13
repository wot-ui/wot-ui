/*
 * @Author: weisheng
 * @Date: 2024-06-30 23:09:08
 * @LastEditTime: 2026-03-03 12:50:12
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-design-uni/src/uni_modules/wot-design-uni/components/wd-video-preview/types.ts
 * 记得注释
 */
import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseProps } from '../common/props'

import { makeStringProp, makeNumberProp } from '../common/props'

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
  open: (video: PreviewVideo) => void
  /** 关闭预览 */
  close: () => void
}

export type VideoPreviewInstance = ComponentPublicInstance<VideoPreviewExpose, VideoPreviewProps>
