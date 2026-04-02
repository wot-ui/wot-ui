/*
 * @Author: weisheng
 * @Date: 2026-01-21 16:28:20
 * @LastEditTime: 2026-03-03 11:51:46
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-design-uni/src/uni_modules/wot-ui/components/wd-image-preview/index.ts
 * 记得注释
 */
import { inject, provide, ref } from 'vue'
import type { ImagePreview, ImagePreviewOptions } from './types'
import { deepMerge, isArray, isString } from '../../common/util'
import { type SwiperItem } from '../wd-swiper/types'

/**
 * useImagePreview 用到的 key
 */
const imagePreviewDefaultOptionKey = '__IMAGE_PREVIEW_OPTION__'

/**
 * 默认选项
 */
export const defaultOptions: ImagePreviewOptions = {
  images: [],
  startPosition: 0,
  showIndex: true,
  loop: true,
  closeable: true,
  closeIcon: 'close',
  closeIconPosition: 'top-right',
  closeOnClick: true,
  showMenuByLongpress: true,
  show: false,
  zIndex: 1000
}

const None = Symbol('None')

/**
 * 图片预览 Hook
 * @param selector 选择器，用于区分多个实例
 */
export function useImagePreview(selector: string = ''): ImagePreview {
  const imagePreviewOptionKey = getImagePreviewOptionKey(selector)
  const imagePreviewOption = inject(imagePreviewOptionKey, ref<ImagePreviewOptions | typeof None>(None))

  if (imagePreviewOption.value === None) {
    imagePreviewOption.value = defaultOptions
    provide(imagePreviewOptionKey, imagePreviewOption)
  }

  /**
   * 打开图片预览
   * @param options 预览选项或图片数组
   */
  const open = (options: ImagePreviewOptions | string[]) => {
    let mergedOptions: ImagePreviewOptions

    if (isArray(options)) {
      mergedOptions = deepMerge(defaultOptions, { images: options }) as ImagePreviewOptions
    } else {
      mergedOptions = deepMerge(defaultOptions, options) as ImagePreviewOptions
    }

    imagePreviewOption.value = deepMerge(mergedOptions, { show: true }) as ImagePreviewOptions
  }

  /**
   * 关闭图片预览
   */
  const close = () => {
    imagePreviewOption.value = { show: false }
  }

  return {
    previewImage: open,
    closeImagePreview: close
  }
}

/**
 * 获取图片预览选项的 key
 * @param selector 选择器
 */
export const getImagePreviewOptionKey = (selector: string) => {
  return selector ? `${imagePreviewDefaultOptionKey}${selector}` : imagePreviewDefaultOptionKey
}

/**
 * 获取图片 url
 * @param image 图片
 */
export function getImageUrl(image: string | SwiperItem) {
  return isString(image) ? image : image.url
}
