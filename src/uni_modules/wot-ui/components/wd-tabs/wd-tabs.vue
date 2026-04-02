<template>
  <template v-if="sticky">
    <wd-sticky-box>
      <view
        :class="`wd-tabs ${customClass} ${innerSlidable ? 'is-slide' : ''} ${mapNum < children.length && mapNum !== 0 ? 'is-map' : ''} ${
          !showScrollbar ? 'is-hide-scrollbar' : ''
        }`"
        :style="customStyle"
      >
        <wd-sticky :offset-top="offsetTop">
          <view class="wd-tabs__nav wd-tabs__nav--sticky">
            <view class="wd-tabs__nav--wrap">
              <scroll-view :scroll-x="innerSlidable" scroll-with-animation :scroll-left="state.scrollLeft">
                <view class="wd-tabs__nav-container">
                  <view
                    @click="handleSelect(index)"
                    v-for="(item, index) in children"
                    :key="index"
                    :class="`wd-tabs__nav-item  ${state.activeIndex === index ? 'is-active' : ''} ${item.disabled ? 'is-disabled' : ''}`"
                    :style="getTabItemStyle(index)"
                  >
                    <wd-badge v-if="item.badgeProps" v-bind="item.badgeProps">
                      <text class="wd-tabs__nav-item-text">{{ item.title }}</text>
                    </wd-badge>
                    <text v-else class="wd-tabs__nav-item-text">{{ item.title }}</text>

                    <view
                      :class="`wd-tabs__line ${state.activeIndex === index && state.useInnerLine ? 'is-' + lineTheme : ''} wd-tabs__line--inner`"
                      v-if="state.activeIndex === index && state.useInnerLine"
                    ></view>
                  </view>
                  <view :class="`wd-tabs__line ${'is-' + lineTheme}`" :style="state.lineStyle"></view>
                </view>
              </scroll-view>
            </view>
            <view class="wd-tabs__map" v-if="mapNum < children.length && mapNum !== 0">
              <view :class="`wd-tabs__map-btn  ${state.animating ? 'is-open' : ''}`" @click="toggleMap">
                <view :class="`wd-tabs__map-arrow  ${state.animating ? 'is-open' : ''}`">
                  <wd-icon name="down" custom-class="wd-tabs__map-arrow-icon" />
                </view>
              </view>
              <view class="wd-tabs__map-header" :style="mapHeaderStyle">
                {{ mapTitle || translate('all') }}
              </view>
              <view :class="`wd-tabs__map-body  ${state.animating ? 'is-open' : ''}`" :style="state.mapShow ? '' : 'display:none'">
                <view class="wd-tabs__map-nav-item" v-for="(item, index) in children" :key="index" @click="handleSelect(index)">
                  <view
                    :class="`wd-tabs__map-nav-btn ${state.activeIndex === index ? 'is-active' : ''}  ${item.disabled ? 'is-disabled' : ''}`"
                    :style="getMapTabStyle(index)"
                  >
                    {{ item.title }}
                  </view>
                </view>
              </view>
            </view>
          </view>
        </wd-sticky>

        <view class="wd-tabs__container" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd" @touchcancel="onTouchEnd">
          <view :class="['wd-tabs__body', animated ? 'is-animated' : '']" :style="bodyStyle">
            <slot />
          </view>
        </view>

        <view class="wd-tabs__mask" :style="mapHeaderStyle" @click="toggleMap"></view>
      </view>
    </wd-sticky-box>
  </template>

  <template v-else>
    <view
      :class="`wd-tabs ${customClass} ${innerSlidable ? 'is-slide' : ''} ${mapNum < children.length && mapNum !== 0 ? 'is-map' : ''} ${
        !showScrollbar ? 'is-hide-scrollbar' : ''
      }`"
    >
      <view class="wd-tabs__nav">
        <view class="wd-tabs__nav--wrap">
          <scroll-view :scroll-x="innerSlidable" scroll-with-animation :scroll-left="state.scrollLeft">
            <view class="wd-tabs__nav-container">
              <view
                v-for="(item, index) in children"
                @click="handleSelect(index)"
                :key="index"
                :class="`wd-tabs__nav-item ${state.activeIndex === index ? 'is-active' : ''} ${item.disabled ? 'is-disabled' : ''}`"
                :style="getTabItemStyle(index)"
              >
                <wd-badge custom-class="wd-tabs__nav-item-badge" v-if="item.badgeProps" v-bind="item.badgeProps">
                  <text class="wd-tabs__nav-item-text">{{ item.title }}</text>
                </wd-badge>
                <text v-else class="wd-tabs__nav-item-text">{{ item.title }}</text>
                <view
                  :class="`wd-tabs__line ${state.activeIndex === index && state.useInnerLine ? 'is-' + lineTheme : ''} wd-tabs__line--inner`"
                  v-if="state.activeIndex === index && state.useInnerLine"
                ></view>
              </view>
              <view :class="`wd-tabs__line ${'is-' + lineTheme}`" :style="state.lineStyle"></view>
            </view>
          </scroll-view>
        </view>
        <view class="wd-tabs__map" v-if="mapNum < children.length && mapNum !== 0">
          <view class="wd-tabs__map-btn" @click="toggleMap">
            <view :class="`wd-tabs__map-arrow ${state.animating ? 'is-open' : ''}`">
              <wd-icon name="down" custom-class="wd-tabs__map-arrow-icon" />
            </view>
          </view>
          <view class="wd-tabs__map-header" :style="mapHeaderStyle">
            {{ mapTitle || translate('all') }}
          </view>
          <view :class="`wd-tabs__map-body ${state.animating ? 'is-open' : ''}`" :style="state.mapShow ? '' : 'display:none'">
            <view class="wd-tabs__map-nav-item" v-for="(item, index) in children" :key="index" @click="handleSelect(index)">
              <view :class="`wd-tabs__map-nav-btn ${state.activeIndex === index ? 'is-active' : ''}  ${item.disabled ? 'is-disabled' : ''}`">
                {{ item.title }}
              </view>
            </view>
          </view>
        </view>
      </view>

      <view class="wd-tabs__container" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd" @touchcancel="onTouchEnd">
        <view :class="['wd-tabs__body', animated ? 'is-animated' : '']" :style="bodyStyle">
          <slot />
        </view>
      </view>

      <view class="wd-tabs__mask" :style="mapHeaderStyle" @click="toggleMap"></view>
    </view>
  </template>
</template>
<script lang="ts">
export default {
  name: 'wd-tabs',
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
import wdIcon from '../wd-icon/wd-icon.vue'
import wdSticky from '../wd-sticky/wd-sticky.vue'
import wdStickyBox from '../wd-sticky-box/wd-sticky-box.vue'
import { computed, getCurrentInstance, onMounted, watch, nextTick, reactive, type CSSProperties, type ComponentInstance } from 'vue'
import { addUnit, checkNumRange, debounce, getRect, isDef, isNumber, isString, objToStyle } from '../../common/util'
import { useTouch } from '../../composables/useTouch'
import { TABS_KEY, tabsProps, type TabsExpose } from './types'
import { useChildren } from '../../composables/useChildren'
import { useTranslate } from '../../composables/useTranslate'

const $item = '.wd-tabs__nav-item'
const $itemText = '.wd-tabs__nav-item-text'
const $container = '.wd-tabs__nav-container'

const props = defineProps(tabsProps)
const emit = defineEmits(['change', 'disabled', 'click', 'update:modelValue'])

const { translate } = useTranslate('tabs')

const state = reactive({
  /** 选中值的索引，默认第一个 */
  activeIndex: 0,
  /** 激活项边框线样式 */
  lineStyle: 'display:none;',
  /** 是否使用内部激活项边框线，当外部激活下划线未成功渲染时显示内部定位的 */
  useInnerLine: false,
  /** 是否初始化 */
  inited: false,
  /** 是否动画中 */
  animating: false,
  /** map的开关 */
  mapShow: false,
  /** scroll-view偏移量 */
  scrollLeft: 0
})

const { children, linkChildren } = useChildren(TABS_KEY)
linkChildren({ state, props })

const { proxy } = getCurrentInstance() as any

const touch = useTouch()

/**
 * 内部是否可滑动
 */
const innerSlidable = computed(() => {
  return props.slidable === 'always' || children.length > props.slidableNum
})

/**
 * map 动画样式
 */
const mapHeaderStyle = computed(() => {
  const style: CSSProperties = {}
  if (!state.mapShow) {
    style.display = 'none'
  }
  if (state.animating) {
    style.opacity = 1
  }
  return objToStyle(style)
})

/**
 * body 样式
 */
const bodyStyle = computed(() => {
  if (!props.animated) {
    return ''
  }

  return objToStyle({
    left: -100 * state.activeIndex + '%',
    'transition-duration': props.duration + 'ms',
    '-webkit-transition-duration': props.duration + 'ms'
  })
})

/**
 * 获取 tab 的 name
 * @param tab tab实例
 * @param index 索引
 */
const getTabName = (tab: ComponentInstance<any>, index: number) => {
  return isDef(tab.name) ? tab.name : index
}

/**
 * 获取 tab item 的样式
 * @param index 索引
 */
const getTabItemStyle = (index: number) => {
  const { color, inactiveColor } = props
  const style: CSSProperties = {}
  if (state.activeIndex === index) {
    if (color) {
      style.color = color
    }
  } else {
    if (inactiveColor) {
      style.color = inactiveColor
    }
  }
  return objToStyle(style)
}

/**
 * 获取 map tab 的样式
 * @param index 索引
 */
const getMapTabStyle = (index: number) => {
  const { color, inactiveColor } = props
  const style: CSSProperties = {}
  if (state.activeIndex === index) {
    if (color) {
      style.color = color
      style.borderColor = color
    }
  } else {
    if (inactiveColor) {
      style.color = inactiveColor
    }
  }
  return objToStyle(style)
}

/**
 * 更新激活项
 * @param value 激活值
 * @param init 是否已初始化
 * @param setScroll 是否设置scroll-view滚动
 */
const updateActive = (value: number | string = 0, init: boolean = false, setScroll: boolean = true) => {
  // 没有tab子元素，不执行任何操作
  if (children.length === 0) return

  value = getActiveIndex(value)
  // 被禁用，不执行任何操作
  if (children[value].disabled) return
  state.activeIndex = value
  if (setScroll) {
    updateLineStyle(init === false)
    scrollIntoView()
  }
  setActiveTab()
}

/**
 * 修改选中的 tab Index
 * @param {string | number} value 绑定值或 tab 索引，默认值 0
 * @param {boolean} init 是否伴随初始化操作
 */
const setActive = debounce(updateActive, 100, { leading: true })

watch(
  () => props.modelValue,
  (newValue) => {
    const index = getActiveIndex(newValue)
    setActive(newValue, false, index !== state.activeIndex)
  },
  {
    immediate: false,
    deep: true
  }
)

// watch(
//   () => children.length,
//   () => {
//     if (state.inited) {
//       nextTick(() => {
//         // setActive(props.modelValue)
//       })
//     }
//   }
// )

watch(
  () => props.slidableNum,
  (newValue) => {
    checkNumRange(newValue, 'slidableNum')
  }
)

watch(
  () => props.mapNum,
  (newValue) => {
    checkNumRange(newValue, 'mapNum')
  }
)

onMounted(() => {
  state.inited = true
  nextTick(() => {
    updateActive(props.modelValue, true)
    state.useInnerLine = true
  })
})

/**
 * 切换 map 显示状态
 */
function toggleMap() {
  if (state.mapShow) {
    state.animating = false
    setTimeout(() => {
      state.mapShow = false
    }, 300)
  } else {
    state.mapShow = true
    setTimeout(() => {
      state.animating = true
    }, 100)
  }
}

/**
 * 更新 underline 的偏移量
 * @param {boolean} animation 是否开启动画
 */
async function updateLineStyle(animation: boolean = true) {
  if (!state.inited) return
  const { lineWidth, lineHeight, lineTheme } = props
  try {
    const lineStyle: CSSProperties = {}
    if (isDef(lineWidth)) {
      lineStyle.width = addUnit(lineWidth)
    } else {
      if (lineTheme === 'text') {
        const textRects = await getRect($itemText, true, proxy)
        const textWidth = Number(textRects[state.activeIndex].width)
        lineStyle.width = addUnit(textWidth)
      } else if (lineTheme === 'underline') {
        const rects = await getRect($item, true, proxy)
        const rectWidth = Number(rects[state.activeIndex].width)
        lineStyle.width = addUnit(rectWidth)
      }
    }
    if (isDef(lineHeight)) {
      lineStyle.height = addUnit(lineHeight)
      lineStyle.borderRadius = `calc(${addUnit(lineHeight)} / 2)`
    }
    const rects = await getRect($item, true, proxy)
    const rect = rects[state.activeIndex]
    let left = rects.slice(0, state.activeIndex).reduce((prev, curr) => prev + Number(curr.width), 0) + Number(rect.width) / 2
    if (left) {
      lineStyle.transform = `translateX(${left}px) translateX(-50%)`
      if (animation) {
        lineStyle.transition = 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);'
      }
      state.useInnerLine = false
      state.lineStyle = objToStyle(lineStyle)
    }
  } catch (error) {
    console.error('[wot ui] error(wd-tabs): update line style failed', error)
  }
}

/**
 * 设置激活的 tab
 */
function setActiveTab() {
  if (!state.inited) return
  const name = getTabName(children[state.activeIndex], state.activeIndex)
  if (name !== props.modelValue) {
    emit('change', {
      index: state.activeIndex,
      name: name
    })
    emit('update:modelValue', name)
  }
}

/**
 * 滚动到视图
 */
function scrollIntoView() {
  if (!state.inited) return
  Promise.all([getRect($item, true, proxy), getRect($container, false, proxy)]).then(([navItemsRects, navRect]) => {
    // 选中元素
    const selectItem = navItemsRects[state.activeIndex]
    // 选中元素之前的节点的宽度总和
    const offsetLeft = (navItemsRects as any).slice(0, state.activeIndex).reduce((prev: any, curr: any) => prev + curr.width, 0)
    // scroll-view滑动到selectItem的偏移量
    const left = offsetLeft - ((navRect as any).width - Number(selectItem.width)) / 2
    if (left === state.scrollLeft) {
      state.scrollLeft = left + Math.random() / 10000
    } else {
      state.scrollLeft = left
    }
  })
}

/**
 * 单击 tab 的处理
 * @param index 索引
 */
function handleSelect(index: number) {
  if (index === undefined) return
  const { disabled } = children[index]
  const name = getTabName(children[index], index)

  if (disabled) {
    emit('disabled', {
      index,
      name
    })
    return
  }
  state.mapShow && toggleMap()
  setActive(index)
  emit('click', {
    index,
    name
  })
}
function onTouchStart(event: any) {
  if (!props.swipeable) return
  touch.touchStart(event)
}
function onTouchMove(event: any) {
  if (!props.swipeable) return
  touch.touchMove(event)
}
function onTouchEnd() {
  if (!props.swipeable) return
  const { direction, deltaX, offsetX } = touch
  const minSwipeDistance = 50
  if (direction.value === 'horizontal' && offsetX.value >= minSwipeDistance) {
    if (deltaX.value > 0 && state.activeIndex !== 0) {
      setActive(state.activeIndex - 1)
    } else if (deltaX.value < 0 && state.activeIndex !== children.length - 1) {
      setActive(state.activeIndex + 1)
    }
  }
}

/**
 * 获取激活的索引
 * @param {number | string} value 绑定值
 */
function getActiveIndex(value: number | string) {
  // name代表的索引超过了children长度的边界，自动用0兜底
  if (isNumber(value) && value >= children.length) {
    // eslint-disable-next-line prettier/prettier
    console.error('[wot ui] warning(wd-tabs): the type of tabs\' value is Number shouldn\'t be less than its children')
    value = 0
  }
  // 如果是字符串直接匹配，匹配不到用0兜底
  if (isString(value)) {
    const index = children.findIndex((item) => item.name === value)
    value = index === -1 ? 0 : index
  }

  return value
}

defineExpose<TabsExpose>({
  setActive,
  scrollIntoView,
  updateLineStyle
})
</script>
<style lang="scss">
@use './index.scss';
</style>
