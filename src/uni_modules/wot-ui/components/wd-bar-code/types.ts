import type { ExtractPropTypes } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeRequiredProp, makeStringProp, numericProp } from '../../common/props'

export type BarCodeFormat =
  | 'auto'
  | 'CODE128'
  | 'CODE128A'
  | 'CODE128B'
  | 'CODE128C'
  | 'EAN13'
  | 'EAN8'
  | 'UPC'
  | 'UPCE'
  | 'CODE39'
  | 'ITF14'
  | 'MSI'
  | 'MSI10'
  | 'MSI11'
  | 'MSI1010'
  | 'MSI1110'
  | 'pharmacode'
  | 'codabar'

export type BarCodeTextAlign = 'left' | 'center' | 'right'

export type BarCodeTextPosition = 'bottom' | 'top'

export const MAX_BAR_CODE_VALUE_LENGTH = 128

export const BAR_CODE_FORMATS = [
  'auto',
  'CODE128',
  'CODE128A',
  'CODE128B',
  'CODE128C',
  'EAN13',
  'EAN8',
  'UPC',
  'UPCE',
  'CODE39',
  'ITF14',
  'MSI',
  'MSI10',
  'MSI11',
  'MSI1010',
  'MSI1110',
  'pharmacode',
  'codabar'
] as const

export function isValidBarCodeFormat(format: string): format is BarCodeFormat {
  return (BAR_CODE_FORMATS as readonly string[]).includes(format)
}

export const barCodeProps = {
  ...baseProps,
  /**
   * 条形码内容
   * 类型: string | number
   */
  value: makeRequiredProp(numericProp),
  /**
   * 条形码格式
   * 类型: string
   * 可选值: auto、CODE128、CODE128A、CODE128B、CODE128C、EAN13、EAN8、UPC、UPCE、CODE39、ITF14、MSI、MSI10、MSI11、MSI1010、MSI1110、pharmacode、codabar
   * 默认值: auto
   */
  format: makeStringProp('auto'),
  /**
   * 单条竖线宽度
   * 类型: number
   * 默认值: 2
   */
  width: makeNumberProp(2),
  /**
   * 条形码高度
   * 类型: number
   * 默认值: 100
   */
  height: makeNumberProp(100),
  /**
   * 显示的文本，默认显示 value
   * 类型: string
   * 默认值: ''
   */
  text: makeStringProp(''),
  /**
   * 字体
   * 类型: string
   * 默认值: monospace
   */
  font: makeStringProp('monospace'),
  /**
   * 字体大小
   * 类型: number
   * 默认值: 20
   */
  fontSize: makeNumberProp(20),
  /**
   * 字体样式
   * 类型: string
   * 可选值: bold、italic、bold italic
   * 默认值: ''
   */
  fontOptions: makeStringProp(''),
  /**
   * 文本与条码的间距
   * 类型: number
   * 默认值: 2
   */
  textMargin: makeNumberProp(2),
  /**
   * 背景色
   * 类型: string
   * 默认值: #ffffff
   */
  background: makeStringProp('#ffffff'),
  /**
   * 线条颜色
   * 类型: string
   * 默认值: #000000
   */
  lineColor: makeStringProp('#000000'),
  /**
   * 边距
   * 类型: number
   * 默认值: 10
   */
  margin: makeNumberProp(10),
  /**
   * 上边距
   * 类型: number
   */
  marginTop: Number,
  /**
   * 下边距
   * 类型: number
   */
  marginBottom: Number,
  /**
   * 左边距
   * 类型: number
   */
  marginLeft: Number,
  /**
   * 右边距
   * 类型: number
   */
  marginRight: Number,
  /**
   * 是否显示文本
   * 类型: boolean
   * 默认值: true
   */
  displayValue: makeBooleanProp(true),
  /**
   * 文本对齐方式
   * 类型: string
   * 可选值: left、center、right
   * 默认值: center
   */
  textAlign: makeStringProp('center'),
  /**
   * 文本位置
   * 类型: string
   * 可选值: bottom、top
   * 默认值: bottom
   */
  textPosition: makeStringProp('bottom')
}

export type BarCodeProps = ExtractPropTypes<typeof barCodeProps>
