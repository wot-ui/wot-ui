import type { ExtractPropTypes } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeNumericProp, makeStringProp } from '../../common/props'

/**
 * 水印字体样式
 * 可选值: 'normal' | 'italic' | 'oblique'
 */
export type WatermarkFontStyle = 'normal' | 'italic' | 'oblique'

/**
 * 水印布局
 * 可选值: 'grid' | 'staggered'
 */
export type WatermarkLayout = 'grid' | 'staggered'

export const watermarkProps = {
  ...baseProps,
  /**
   * 显示内容
   * 类型: string
   * 默认值: ''
   */
  content: makeStringProp(''),
  /**
   * 显示图片的地址，支持网络图片和base64（钉钉小程序仅支持网络图片）
   * 类型: string
   * 默认值: ''
   */
  image: makeStringProp(''),
  /**
   * 图片高度
   * 类型: number
   * 默认值: 100
   */
  imageHeight: makeNumberProp(100),
  /**
   * 图片宽度
   * 类型: number
   * 默认值: 100
   */
  imageWidth: makeNumberProp(100),
  /**
   * X轴间距，单位px
   * 类型: number
   * 默认值: 0
   */
  gutterX: makeNumberProp(0),
  /**
   * Y轴间距，单位px
   * 类型: number
   * 默认值: 0
   */
  gutterY: makeNumberProp(0),
  /**
   * canvas画布宽度，单位px
   * 类型: number
   * 默认值: 100
   */
  width: makeNumberProp(100),
  /**
   * canvas画布高度，单位px
   * 类型: number
   * 默认值: 100
   */
  height: makeNumberProp(100),
  /**
   * 是否为全屏水印
   * 类型: boolean
   * 默认值: true
   */
  fullScreen: makeBooleanProp(true),
  /**
   * 水印字体颜色
   * 类型: string
   * 默认值: '#C9CBD4'
   */
  color: makeStringProp('#C9CBD4'),
  /**
   * 水印字体大小，单位px
   * 类型: number
   * 默认值: 14
   */
  size: makeNumberProp(14),
  /**
   * 水印字体样式（仅微信、支付宝和h5支持）
   * 类型: WatermarkFontStyle
   * 可选值: 'normal' | 'italic' | 'oblique'
   * 默认值: 'normal'
   */
  fontStyle: makeStringProp<WatermarkFontStyle>('normal'),
  /**
   * 水印字体的粗细（仅微信、支付宝和h5支持）
   * 类型: string | number
   * 默认值: 'normal'
   */
  fontWeight: makeNumericProp('normal'),
  /**
   * 水印字体系列（仅微信、支付宝和h5支持）
   * 类型: string
   * 默认值: 'PingFang SC'
   */
  fontFamily: makeStringProp('PingFang SC'),
  /**
   * 水印旋转角度
   * 类型: number
   * 默认值: -25
   */
  rotate: makeNumberProp(-25),
  /**
   * 自定义层级
   * 类型: number
   * 默认值: 1100
   */
  zIndex: makeNumberProp(1100),
  /**
   * 自定义透明度，取值 0~1
   * 类型: number
   * 默认值: undefined
   */
  opacity: Number,
  /**
   * 水印布局
   * 类型: WatermarkLayout
   * 可选值: 'grid' | 'staggered'
   * 默认值: 'grid'
   */
  layout: makeStringProp<WatermarkLayout>('grid')
}

export type WatermarkProps = ExtractPropTypes<typeof watermarkProps>
