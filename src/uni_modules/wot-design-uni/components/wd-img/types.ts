import { type ExtractPropTypes } from 'vue'
import { baseProps, makeBooleanProp, makeStringProp, numericProp } from '../common/props'
export type ImageMode =
  | 'scaleToFill'
  | 'aspectFit'
  | 'aspectFill'
  | 'widthFix'
  | 'heightFix'
  | 'top'
  | 'bottom'
  | 'center'
  | 'left'
  | 'right'
  | 'top left'
  | 'top right'
  | 'bottom left'
  | 'bottom right'

export const imgProps = {
  ...baseProps,
  /**
   * 图片自定义类名
   * 类型: string
   */
  customImage: makeStringProp(''),
  /**
   * 图片链接
   * 类型: string
   */
  src: String,
  /**
   * 预览图片链接
   * 类型: string
   */
  previewSrc: String,
  /**
   * 是否显示为圆形
   * 类型: boolean
   * 默认值: false
   */
  round: makeBooleanProp(false),
  /**
   * 填充模式
   * 类型: string
   * 可选值: 'scaleToFill' | 'aspectFit' | 'aspectFill' | 'widthFix' | 'heightFix' | 'top' | 'bottom' | 'center' | 'left' | 'right' | 'top left' | 'top right' | 'bottom left' | 'bottom right'
   * 默认值: 'scaleToFill'
   */
  mode: makeStringProp<ImageMode>('scaleToFill'),
  /**
   * 是否懒加载
   * 类型: boolean
   * 默认值: false
   */
  lazyLoad: makeBooleanProp(false),
  /**
   * 宽度，默认单位为px
   * 类型: string | number
   */
  width: numericProp,
  /**
   * 高度，默认单位为px
   * 类型: string | number
   */
  height: numericProp,
  /**
   * 圆角大小，默认单位为px
   * 类型: string | number
   */
  radius: numericProp,
  /**
   * 是否允许预览
   * 类型: boolean
   * 默认值: false
   */
  enablePreview: makeBooleanProp(false),
  /**
   * 开启长按图片显示识别小程序码菜单，仅在微信小程序平台有效
   * 类型: boolean
   * 默认值: false
   */
  showMenuByLongpress: makeBooleanProp(false),
  /**
   * 是否展示加载中
   * 类型: boolean
   * 默认值: true
   */
  showLoading: makeBooleanProp(true),
  /**
   * 是否展示错误
   * 类型: boolean
   * 默认值: true
   */
  showError: makeBooleanProp(true)
}

export type ImgProps = ExtractPropTypes<typeof imgProps>
