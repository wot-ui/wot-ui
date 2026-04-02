import type { ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeStringProp, numericProp } from '../../common/props'
import { type LoadingProps } from '../wd-loading/types'

export type SwitchShape = 'round' | 'square'

export type SwitchBeforeChange = (value: number | string | boolean) => boolean | Promise<boolean>

export const switchProps = {
  ...baseProps,
  /**
   * 绑定值
   */
  modelValue: {
    type: [Boolean, String, Number] as PropType<boolean | string | number>,
    default: false
  },
  /**
   * 是否禁用
   */
  disabled: makeBooleanProp(false),
  /**
   * 非激活状态操作按钮图标
   */
  inactiveActionIcon: String,
  /**
   * 激活状态操作按钮图标
   */
  activeActionIcon: String,
  /**
   * 激活状态图标，设置后将忽略 `activeText`
   */
  activeIcon: String,
  /**
   * 非激活状态图标，设置后将忽略 `inactiveText`
   */
  inactiveIcon: String,
  /**
   * 激活状态文本
   */
  activeText: makeStringProp(''),
  /**
   * 非激活状态文本
   */
  inactiveText: makeStringProp(''),
  /**
   * 激活值
   */
  activeValue: {
    type: [Boolean, String, Number] as PropType<boolean | string | number>,
    default: true
  },
  /**
   * 非激活值
   */
  inactiveValue: {
    type: [Boolean, String, Number] as PropType<boolean | string | number>,
    default: false
  },
  /**
   * 激活颜色
   */
  activeColor: String,
  /**
   * 非激活颜色
   */
  inactiveColor: String,
  /**
   * 大小
   */
  size: numericProp,
  /**
   * 形状
   */
  shape: makeStringProp<SwitchShape>('round'),
  /**
   * 是否显示加载中
   */
  loading: Boolean,
  /**
   * 加载配置项
   */
  loadingProps: Object as PropType<Partial<LoadingProps>>,
  /**
   * 在改变前执行的函数
   */
  beforeChange: Function as PropType<SwitchBeforeChange>,
  /**
   * 自定义类名
   */
  classPrefix: makeStringProp('wd-icon')
}
export type SwitchProps = ExtractPropTypes<typeof switchProps>
