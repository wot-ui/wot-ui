import type { ComponentPublicInstance, ExtractPropTypes } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeNumericProp, makeStringProp } from '../../common/props'

export const imgCropperProps = {
  ...baseProps,
  /**
   * 打开图片裁剪组件
   * 类型: boolean
   * 默认值: false
   */
  modelValue: makeBooleanProp(false),
  /**
   * 取消按钮文案
   * 类型: string
   * 默认值: '取消'
   */
  cancelButtonText: String,
  /**
   * 确认按钮文案
   * 类型: string
   * 默认值: '确认'
   */
  confirmButtonText: String,
  /**
   * 是否禁用旋转功能
   * 类型: boolean
   * 默认值: false
   */
  disabledRotate: makeBooleanProp(false),
  /**
   * Canvas 输出文件类型
   * 类型: string
   * 可选值: 'png' | 'jpg' | 'jpeg'
   * 默认值: 'png'
   */
  fileType: makeStringProp('png'),
  /**
   * Canvas 图片输出质量，范围 0-1
   * 类型: number
   * 默认值: 1
   */
  quality: makeNumberProp(1),
  /**
   * 导出图片的缩放倍数
   * 类型: number
   * 默认值: 2
   */
  exportScale: makeNumberProp(2),
  /**
   * 图片源路径
   * 类型: string
   * 默认值: ''
   */
  imgSrc: makeStringProp(''),
  /**
   * 图片初始宽度（支持 px 和 % 单位）
   * 类型: string | number
   * 默认值: ''
   */
  imgWidth: makeNumericProp(''),
  /**
   * 图片初始高度（支持 px 和 % 单位）
   * 类型: string | number
   * 默认值: ''
   */
  imgHeight: makeNumericProp(''),
  /**
   * 图片最大缩放倍数
   * 类型: number
   * 默认值: 3
   */
  maxScale: makeNumberProp(3),
  /**
   * 裁剪框宽高比
   * 类型: string
   * 格式: 'width:height' (如 '1:1', '16:9')
   * 默认值: '1:1'
   */
  aspectRatio: makeStringProp('1:1')
}

export type ImgCropperProps = ExtractPropTypes<typeof imgCropperProps>

export type ImgCropperExpose = {
  /**
   * 切换图片过渡动画效果
   * @param animation 是否启用动画，或包含动画状态的对象
   */
  revertIsAnimation: (animation: boolean | { value: boolean }) => void
  /**
   * 重置图片的大小、角度和位置到初始状态
   */
  resetImg: () => void
  /**
   * 旋转图片
   * @param angle 旋转角度（建议使用 90 的倍数）
   */
  setRotate: (angle: number) => void
}

export type ImgCropperInstance = ComponentPublicInstance<ImgCropperProps, ImgCropperExpose>
