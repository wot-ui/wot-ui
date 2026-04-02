import { type ComponentPublicInstance, type ExtractPropTypes, type InjectionKey } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeNumericProp, makeStringProp, numericProp } from '../../common/props'

export type TabsProvide = {
  state: {
    /** 当前激活的 tab 索引 */
    activeIndex: number
    /** 激活项边框线样式 */
    lineStyle: string
    /** 组件是否已初始化 */
    inited: boolean
    /** 是否正在进行切换动画 */
    animating: boolean
    /** 导航地图是否显示 */
    mapShow: boolean
    /** 滚动条位置 */
    scrollLeft: number
  }
  props: Partial<TabsProps>
}

export type TabsSlidable = 'auto' | 'always'

/**
 * 底部条位置样式
 * normal: 默认宽度，不设置 lineWidth 时 宽度为 24px
 * text: 宽度跟随文字，不设置 lineWidth 时 宽度等于文字宽度
 * underline: 下划线，宽度等于 tab 宽度
 * dot: 点状，宽度等于 6px
 */
export type TabsLineTheme = 'normal' | 'text' | 'underline' | 'dot'

export const TABS_KEY: InjectionKey<TabsProvide> = Symbol('wd-tabs')

export const tabsProps = {
  ...baseProps,
  /**
   * 绑定值，选中选项卡的 name
   * 类型: number | string
   * 默认值: 0
   */
  modelValue: makeNumericProp(0),
  /**
   * 标签数超过阈值可滑动
   * 类型: number
   * 默认值: 6
   */
  slidableNum: makeNumberProp(6),
  /**
   * 标签数超过阈值显示导航地图
   * 类型: number
   * 默认值: 10
   */
  mapNum: makeNumberProp(10),
  /**
   * 导航地图的标题
   * 类型: string
   */
  mapTitle: String,
  /**
   * 粘性布局
   * 类型: boolean
   * 默认值: false
   */
  sticky: makeBooleanProp(false),
  /**
   * 粘性布局吸顶位置
   * 类型: number
   * 默认值: 0
   */
  offsetTop: makeNumberProp(0),
  /**
   * 开启手势滑动
   * 类型: boolean
   * 默认值: false
   */
  swipeable: makeBooleanProp(false),
  /**
   * 底部条位置样式
   * 类型: string
   * 可选值: 'normal' | 'text' | 'underline' | 'dot'
   * 默认值: 'normal'
   */
  lineTheme: makeStringProp<TabsLineTheme>('normal'),
  /**
   * 底部条宽度，单位像素
   * 类型: number | string
   */
  lineWidth: numericProp,
  /**
   * 底部条高度，单位像素
   * 类型: number | string
   */
  lineHeight: numericProp,
  /**
   * 颜色
   * 类型: string
   * 默认值: ''
   */
  color: makeStringProp(''),
  /**
   * 非活动状态颜色
   * 类型: string
   * 默认值: ''
   */
  inactiveColor: makeStringProp(''),
  /**
   * 是否开启切换标签内容时的过渡动画
   * 类型: boolean
   * 默认值: false
   */
  animated: makeBooleanProp(false),
  /**
   * 切换动画过渡时间，单位毫秒
   * 类型: number
   * 默认值: 300
   */
  duration: makeNumberProp(300),
  /**
   * 是否开启滚动导航
   * 类型: string
   * 可选值：'auto' | 'always'
   * 默认值: 'auto'
   */
  slidable: makeStringProp<TabsSlidable>('auto'),
  /**
   * 标签可滑动时是否显示滚动条
   * 类型: boolean
   * 默认值: false
   */
  showScrollbar: makeBooleanProp(false)
}

export type TabsExpose = {
  /**
   * 设置激活项
   * @param {number | string} value 激活值
   * @param {boolean} init 是否已初始化
   * @param {boolean} setScroll 是否设置scroll-view滚动
   */
  setActive: (value: number | string, init: boolean, setScroll: boolean) => void
  /**
   * 使选中项滚动到可视区域
   */
  scrollIntoView: () => void
  /**
   * 更新激活项边框线样式
   * @param {boolean} animation 是否开启动画，默认开启
   */
  updateLineStyle: (animation?: boolean) => void
}

export type TabsProps = ExtractPropTypes<typeof tabsProps>

export type TabsInstance = ComponentPublicInstance<TabsProps, TabsExpose>
