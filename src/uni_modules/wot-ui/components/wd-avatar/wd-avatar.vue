<!--
 * @Author: North
 * @Date: 2026-01-01
 * @LastEditTime: 2026-03-03 14:07:06
 * @LastEditors: weisheng
 * @Description: Avatar 头像组件，支持图片、文本或图标展示
 * @FilePath: /wot-design-uni/src/uni_modules/wot-ui/components/wd-avatar/wd-avatar.vue
-->
<template>
  <view v-if="isShow" :class="rootClass" :style="rootStyle" @click="handleClick">
    <!-- 默认插槽优先 -->
    <slot v-if="hasDefaultSlot"></slot>
    <!-- 图片 -->
    <wd-img v-else-if="src" :src="src" :mode="mode" custom-class="wd-avatar__img" @error="handleError" />
    <!-- 文本 -->
    <text v-else-if="text" class="wd-avatar__text">{{ text }}</text>
    <!-- 图标 -->
    <wd-icon v-else-if="icon" :name="icon" custom-class="wd-avatar__icon" />
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-avatar',
  options: {
    addGlobalClass: true,
    // #ifndef MP-TOUTIAO
    virtualHost: true,
    // #endif
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed, useSlots, type CSSProperties, ref } from 'vue'
import wdIcon from '../wd-icon/wd-icon.vue'
import wdImg from '../wd-img/wd-img.vue'
import { addUnit, getPropByPath, isDef, isString, objToStyle } from '../../common/util'
import { avatarProps, type AvatarShape, type AvatarSize } from './types'
import { useParent } from '../../composables/useParent'
import { AVATAR_GROUP_KEY } from '../wd-avatar-group/types'

const props = defineProps(avatarProps)

/**
 * Avatar 组件事件定义
 * - error: 图片加载失败时触发
 * - click: 点击头像时触发
 */
const emit = defineEmits(['error', 'click'])
const slots = useSlots()

// 父组件上下文：_internal 用于 avatar-group 内部的溢出计数头像，跳过父组件上下文
const { parent: avatarGroup, index } = props._internal ? { parent: ref(null), index: ref(-1) } : useParent(AVATAR_GROUP_KEY)

/**
 * 计算头像是否应该显示
 * 在 avatar-group 中根据 maxCount 判断是否超出数量限制
 */
const isShow = computed(() => {
  if (!avatarGroup.value) {
    return true
  }
  // 在 avatar-group 中，根据 maxCount 判断
  const maxCount = avatarGroup.value.props.maxCount
  if (!isDef(maxCount)) {
    return true
  }
  const count = typeof maxCount === 'number' ? maxCount : parseInt(maxCount, 10)
  // 检查 count 是否为有效数字
  if (isNaN(count) || count <= 0) {
    return true
  }
  return index.value < count
})

/**
 * 获取头像尺寸
 * 优先级: Props > avatarGroup Props > 默认值
 */
const sizeValue = computed(() => {
  return props.size || (getPropByPath(avatarGroup.value, 'props.size') as string | number | AvatarSize) || 'normal'
})

/**
 * 判断是否使用内置尺寸(large/medium/normal/small)
 */
const isBuiltInSize = computed(() => {
  return isString(sizeValue.value) && ['large', 'medium', 'normal', 'small'].includes(sizeValue.value)
})

/**
 * 获取头像形状
 * 优先级: Props > avatarGroup Props > 默认值
 */
const shapeValue = computed(() => {
  return props.shape || (getPropByPath(avatarGroup.value, 'props.shape') as AvatarShape) || 'round'
})

/**
 * 判断是否存在默认插槽
 */
const hasDefaultSlot = computed(() => !!slots.default)

const rootClass = computed(() => {
  const classes = ['wd-avatar', props.customClass]
  classes.push(`is-${shapeValue.value}`)

  // 尺寸类仅预设尺寸
  if (isBuiltInSize.value) {
    classes.push(`wd-avatar--${sizeValue.value}`)
  }
  // 在 avatar-group 中时，添加 item 类
  if (avatarGroup.value) {
    classes.push('wd-avatar__group-item')
    if (avatarGroup.value.props.vertical) {
      classes.push('wd-avatar__group-item--vertical')
    }
  }
  return classes.join(' ')
})

/**
 * 根节点样式
 */
const rootStyle = computed(() => {
  const style: CSSProperties = {}
  if (isDef(sizeValue.value) && !isBuiltInSize.value) {
    style.width = addUnit(sizeValue.value)
    style.height = addUnit(sizeValue.value)
    style.fontSize = `calc(${addUnit(sizeValue.value)} * 0.45)`
    if (avatarGroup.value) {
      style['--wot-avatar-overlap' as any] = `calc(${addUnit(sizeValue.value)} * -0.25)`
    }
  }

  // 处理层叠效果的 z-index
  if (avatarGroup.value) {
    const cascading = avatarGroup.value.props.cascading
    if (cascading === 'left-up') {
      // 左侧在上，越后面越大
      style.zIndex = index.value + 1
    } else if (cascading === 'right-up') {
      // 右侧在上，越前面越大
      const maxCount = avatarGroup.value.props.maxCount
      let count = avatarGroup.value.children?.length ?? 0

      if (isDef(maxCount)) {
        const parsedCount = typeof maxCount === 'number' ? maxCount : parseInt(maxCount, 10)
        if (!isNaN(parsedCount) && parsedCount > 0) {
          count = parsedCount
        }
      }
      style.zIndex = count - index.value
    }
  }

  if (props.color) {
    style.color = props.color
  }

  if (props.bgColor) {
    style.background = props.bgColor
    // 有背景色但无文字色时，默认白色
    if (!props.color) {
      style.color = '#fff'
    }
  }

  return `${objToStyle(style)} ${props.customStyle}`
})

/**
 * 处理图片加载失败事件
 * @param {Event} event 失败事件对象
 */
const handleError = (event: Event) => {
  emit('error', event)
}

/**
 * 处理点击事件
 */
const handleClick = () => {
  emit('click')
}
</script>

<style lang="scss">
@use './index.scss';
</style>
