<template>
  <view :class="rootClass" @click="click" :style="rootStyle">
    <view :class="contentClass" :style="contentStyle" :hover-class="hoverClass">
      <slot>
        <view class="wd-grid-item__wrapper" v-if="icon || $slots.icon">
          <wd-badge v-bind="customBadgeProps" custom-class="wd-grid-item__badge">
            <slot name="icon">
              <wd-icon
                :name="icon"
                :size="iconSize"
                :color="iconColor"
                :class-prefix="iconPrefix"
                :custom-class="`wd-grid-item__icon ${customIcon}`"
              />
            </slot>
          </wd-badge>
        </view>
        <slot name="text">
          <view v-if="text" :class="`wd-grid-item__text ${ellipsis ? 'is-ellipsis' : ''} ${customText}`">{{ text }}</view>
        </slot>
      </slot>
    </view>
  </view>
</template>
<script lang="ts">
export default {
  name: 'wd-grid-item',
  options: {
    // #ifndef MP-TOUTIAO
    virtualHost: true,
    // #endif
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import wdIcon from '../wd-icon/wd-icon.vue'
import wdBadge from '../wd-badge/wd-badge.vue'
import { computed, type CSSProperties } from 'vue'
import { useParent } from '../../composables/useParent'
import { GRID_KEY } from '../wd-grid/types'
import { addUnit, deepAssign, isDef, isUndefined, omitBy } from '../../common/util'
import { gridItemProps } from './types'
import type { BadgeProps } from '../wd-badge/types'

/** GridItem 组件 Props 定义 */
const props = defineProps(gridItemProps)
/** GridItem 组件事件定义 */
const emit = defineEmits(['click'])

/** 获取父级 Grid 组件实例及当前项在子组件中的索引 */
const { parent: grid, index } = useParent(GRID_KEY)

/** 格子间距（从父级 Grid 组件继承） */
const gutter = computed(() => Number(grid.value?.props.gutter || 0))
/** 是否为正方形（从父级 Grid 组件继承） */
const square = computed(() => Boolean(grid.value?.props.square))
/** 是否显示边框（从父级 Grid 组件继承） */
const border = computed(() => Boolean(grid.value?.props.border))
/** 背景颜色（从父级 Grid 组件继承） */
const bgColor = computed(() => grid.value?.props.bgColor || '')
/** 列数（从父级 Grid 组件继承，0 表示自动计算） */
const column = computed(() => grid.value?.props.column || 0)
/** 子组件总数 */
const childCount = computed(() => grid.value?.children?.length || 0)

/** 图标大小（从父级 Grid 组件继承） */
const iconSize = computed(() => grid.value?.props.iconSize)

/**
 * 边框 CSS 类名计算
 * 根据当前项的位置和列数计算是否需要应用边框相关的类名
 * @returns {string} 包含边框相关的 CSS 类名，多个类名间使用空格分隔
 */
const borderClass = computed(() => {
  if (!border.value || gutter.value) return ''
  const classes: string[] = []
  const col = column.value
  const idx = index.value
  const total = childCount.value

  if (col) {
    const isRightItem = total - 1 === idx || (idx + 1) % col === 0
    const isFirstLine = idx + 1 <= col
    if (isFirstLine) classes.push('is-first')
    if (isRightItem) classes.push('is-right')
    if (!isFirstLine) classes.push('is-border')
  } else {
    classes.push('is-first')
  }

  if (total - 1 === idx) classes.push('is-last')

  return classes.join(' ')
})

/**
 * 根节点样式计算
 * 计算当前格子的宽度、flex 属性及额外样式（如正方形、间距）
 * @returns {CSSProperties | string} 组合后的 CSS 样式对象或字符串
 */
const rootStyle = computed(() => {
  if (!grid) return props.customStyle || ''

  const columnNum = column.value || childCount.value
  const percent = `${100 / columnNum}%`
  const style: CSSProperties = {
    flexBasis: percent,
    width: percent
  }

  if (square.value) {
    // 正方形格子
    style.paddingTop = percent
    style.paddingBottom = '0'

    if (gutter.value) {
      style.paddingRight = addUnit(gutter.value)
    }
  } else if (gutter.value) {
    // 非正方形但有间距
    const gutterValue = addUnit(gutter.value)
    style.paddingRight = gutterValue

    // 第二行及以后的元素添加上边距
    if (index.value >= columnNum) {
      style.marginTop = gutterValue
    }
  }

  // 添加自定义样式
  if (props.customStyle) {
    return `${objToStyle(style)} ${props.customStyle}`
  }

  return style
})

/**
 * 内容区域样式计算
 * 当存在间距且为正方形时，调整位置及尺寸；否则只设置背景颜色
 * @returns {CSSProperties | string} 内容区域的 CSS 样式对象或字符串
 */
const contentStyle = computed(() => {
  if (!grid) return ''

  const style: CSSProperties = {}

  if (bgColor.value) {
    style.background = bgColor.value
  }

  if (square.value && gutter.value) {
    const gutterValue = addUnit(gutter.value)
    style.right = gutterValue
    style.bottom = gutterValue
    style.height = 'auto'
  }

  return style
})

/**
 * 将样式对象转换为字符串
 * @param {CSSProperties} obj - 样式对象
 * @returns {string} 样式字符串
 */
function objToStyle(obj: CSSProperties): string {
  return Object.entries(obj)
    .map(([key, value]) => {
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
      return `${cssKey}: ${value};`
    })
    .join('')
}

/**
 * 根节点 CSS 类名计算
 * 包含边框、正方形、自定义类名等样式类
 * @returns {string} 组合后的 CSS 类名字符串
 */
const rootClass = computed(() => {
  const classes = ['wd-grid-item']
  if (borderClass.value) {
    classes.push(borderClass.value)
  }
  if (square.value) {
    classes.push('is-square')
  }
  if (props.customClass) {
    classes.push(props.customClass)
  }
  return classes.join(' ')
})

/**
 * 内容区域 CSS 类名计算
 * 根据是否为正方形、是否有圆角、排列方向等计算类名
 * @returns {string} 组合后的 CSS 类名字符串
 */
const contentClass = computed(() => {
  const classes = ['wd-grid-item__content']
  if (square.value) {
    classes.push('is-square')
  }
  if (border.value && gutter.value > 0) {
    classes.push('is-around')
  }
  if (grid.value) {
    const { center, direction, reverse } = grid.value.props
    if (center) {
      classes.push('is-center')
    }
    if (direction === 'horizontal') {
      classes.push('is-horizontal')
    }
    if (reverse) {
      classes.push('is-reverse')
    }
  }
  return classes.join(' ')
})

/**
 * Badge 组件属性计算
 * 合并用户传入的徽标属性与从 GridItem Props 中提取的值
 * @returns {Partial<BadgeProps>} 最终的 Badge 组件属性对象
 */
const customBadgeProps = computed(() => {
  const badgeProps: Partial<BadgeProps> = deepAssign(
    isDef(props.badgeProps) ? omitBy(props.badgeProps, isUndefined) : {},
    omitBy(
      {
        max: props.max,
        isDot: props.isDot,
        value: props.value
      },
      isUndefined
    )
  )
  if (!isDef(badgeProps.max)) {
    badgeProps.max = 99
  }
  return badgeProps
})

/**
 * hover 类名计算
 * 仅当格子启用点击反馈时才返回对应的 hover 类名
 * @returns {string} hover 类名，如果不启用点击反馈则返回空字符串
 */
const hoverClass = computed(() => {
  if (grid.value?.props.clickable) {
    return grid.value.props.hoverClass ? grid.value.props.hoverClass : 'wd-grid-item__content--hover'
  }
  return ''
})

/**
 * 处理格子点击事件
 * 1. 检查父级 Grid 组件是否启用了点击反馈
 * 2. 触发 click 事件
 * 3. 如果绑定了 url，则根据 linkType 进行路由跳转
 */
function click() {
  if (grid.value && !grid.value.props.clickable) return
  const { url, linkType } = props
  emit('click')
  if (url) {
    switch (linkType) {
      case 'navigateTo':
        uni.navigateTo({ url })
        break
      case 'reLaunch':
        uni.reLaunch({ url })
        break
      case 'redirectTo':
        uni.redirectTo({ url })
        break
      case 'switchTab':
        uni.switchTab({ url })
        break
      default:
        console.error(`[wot-design] warning(wd-grid-item): linkType can not be ${linkType}`)
        break
    }
  }
}
</script>

<style lang="scss">
@use './index.scss';
</style>
