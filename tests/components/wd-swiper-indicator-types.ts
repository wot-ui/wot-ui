import type WdSwiper from '@/uni_modules/wot-ui/components/wd-swiper/wd-swiper.vue'
import type { SwiperIndicatorProps, SwiperProps } from '@/uni_modules/wot-ui/components/wd-swiper/types'

type Indicator = SwiperProps['indicator']
type ComponentIndicator = InstanceType<typeof WdSwiper>['$props']['indicator']
type Assert<T extends true> = T

// 单独声明时 type 会放宽为 string，这是文档示例在业务代码里的常见写法
const fraction = { type: 'fraction' }
const dotsBar = { type: 'dots-bar' }
const controls = { showControls: true }

export const fractionIndicator: Indicator = fraction
export const dotsBarIndicator: Indicator = dotsBar
export const controlsIndicator: Indicator = controls
export const inlineFraction: Indicator = { type: 'fraction' }
export const inlineDots: Indicator = { type: 'dots' }
export const inlineDotsBar: Indicator = { type: 'dots-bar', minShowNum: 2, showControls: false }
export const indicatorOn: Indicator = true
export const indicatorOff: Indicator = false

export const componentFraction: ComponentIndicator = fraction
export const componentInline: ComponentIndicator = { type: 'fraction' }
export const componentOn: ComponentIndicator = true
export const componentOff: ComponentIndicator = false

// 不能退化为 boolean，也不能放宽成 any
export type IndicatorIsNotBooleanOnly = Assert<[Indicator] extends [boolean] ? never : true>
export type IndicatorIncludesConfig = Assert<SwiperIndicatorProps extends Exclude<Indicator, boolean> ? true : false>
export type ComponentIndicatorIsNotBooleanOnly = Assert<[NonNullable<ComponentIndicator>] extends [boolean] ? never : true>

// @ts-expect-error indicator 不接受数字
export const invalidIndicator: Indicator = 1
