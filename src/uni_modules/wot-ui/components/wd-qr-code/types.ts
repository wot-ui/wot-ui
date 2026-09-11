import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeArrayProp, makeBooleanProp, makeNumberProp, makeStringProp } from '../../common/props'

export type QrCodeCorrectLevel = 'L' | 'M' | 'Q' | 'H'
export type QrCodeDotType = 'square' | 'dots' | 'rounded' | 'liquid'
export type QrCodeGradientDirection = 'diagonal' | 'horizontal' | 'vertical' | number

export const qrCodeProps = {
  ...baseProps,
  /**
   * 二维码内容。
   * 类型: string
   * 默认值: ''
   */
  text: makeStringProp(''),
  /**
   * 二维码大小，单位为 px。
   * 类型: number
   * 默认值: 200
   */
  size: makeNumberProp(200),
  /**
   * 纠错级别。
   * 类型: QrCodeCorrectLevel
   * 可选值: 'L' | 'M' | 'Q' | 'H'
   * 默认值: 'H'
   */
  correctLevel: makeStringProp<QrCodeCorrectLevel>('H'),
  /**
   * 二维码深色部分颜色。
   * 类型: string
   * 默认值: '#000000'
   */
  colorDark: makeStringProp('#000000'),
  /**
   * 二维码浅色部分颜色。
   * 类型: string
   * 默认值: '#FFFFFF'
   */
  colorLight: makeStringProp('#FFFFFF'),
  /**
   * 二维码外边距，单位为 px。
   * 类型: number
   * 默认值: 0
   */
  margin: makeNumberProp(0),
  /**
   * Logo 图片地址。
   * 类型: string
   * 默认值: ''
   */
  logo: makeStringProp(''),
  /**
   * Logo 宽度，单位为 px。
   * 类型: number
   * 默认值: 70
   */
  logoWidth: makeNumberProp(70),
  /**
   * Logo 高度，单位为 px。
   * 类型: number
   * 默认值: 70
   */
  logoHeight: makeNumberProp(70),
  /**
   * Canvas ID，不传时自动生成。
   * 类型: string
   * 默认值: ''
   */
  canvasId: makeStringProp(''),
  /**
   * 码点类型。
   * 类型: QrCodeDotType
   * 可选值: 'square' | 'dots' | 'rounded' | 'liquid'
   * 默认值: 'square'
   */
  dotType: makeStringProp<QrCodeDotType>('square'),
  /**
   * 码点缩放比例。
   * 类型: number
   * 默认值: 1
   */
  dotScale: makeNumberProp(1),
  /**
   * 是否启用渐变。
   * 类型: boolean
   * 默认值: false
   */
  enableGradient: makeBooleanProp(false),
  /**
   * 渐变结束色。
   * 类型: string
   * 默认值: '#000000'
   */
  gradientColor: makeStringProp('#000000'),
  /**
   * 多色渐变颜色列表，优先级高于 `colorDark` 和 `gradientColor`。
   * 类型: string[]
   * 默认值: []
   */
  gradientColors: makeArrayProp<string>(),
  /**
   * 渐变方向。
   * 类型: QrCodeGradientDirection
   * 可选值: 'diagonal' | 'horizontal' | 'vertical' | number
   * 默认值: 'diagonal'
   */
  gradientDirection: {
    type: [String, Number] as PropType<QrCodeGradientDirection>,
    default: 'diagonal'
  },
  /**
   * Logo 背景色。
   * 类型: string
   * 默认值: '#FFFFFF'
   */
  logoBackgroundColor: makeStringProp('#FFFFFF'),
  /**
   * Logo 圆角，单位为 px。
   * 类型: number
   * 默认值: 0
   */
  logoRadius: makeNumberProp(0),
  /**
   * Logo 边框颜色。
   * 类型: string
   * 默认值: ''
   */
  logoBorderColor: makeStringProp(''),
  /**
   * Logo 边框宽度，单位为 px。
   * 类型: number
   * 默认值: 0
   */
  logoBorderWidth: makeNumberProp(0),
  /**
   * 背景图片地址。
   * 类型: string
   * 默认值: ''
   */
  backgroundImage: makeStringProp('')
}

export type QrCodeProps = ExtractPropTypes<typeof qrCodeProps>

export type QrCodeExpose = {
  /**
   * 导出二维码图片。
   */
  exportImage: () => Promise<string>
}

export type QrCodeInstance = ComponentPublicInstance<QrCodeProps, QrCodeExpose>
