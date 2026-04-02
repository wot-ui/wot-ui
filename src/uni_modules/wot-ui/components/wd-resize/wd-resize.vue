<template>
  <view :class="`wd-resize ${customClass}`" :style="rootStyle">
    <!--插槽需要脱离父容器文档流，防止父容器固宽固高，进而导致插槽大小被被父容器限制-->
    <view :id="resizeId" :class="`wd-resize__container ${customContainerClass}`">
      <!--被监听的插槽-->
      <slot />
      <!--监听插槽变大-->
      <scroll-view
        class="wd-resize__wrapper"
        :scroll-y="true"
        :scroll-top="expandScrollTop"
        :scroll-x="true"
        :scroll-left="expandScrollLeft"
        @scroll="onScrollHandler"
      >
        <view class="wd-resize__wrapper--placeholder" style="height: 100000px; width: 100000px"></view>
      </scroll-view>
      <!--监听插槽变小-->
      <scroll-view
        class="wd-resize__wrapper"
        :scroll-y="true"
        :scroll-top="shrinkScrollTop"
        :scroll-x="true"
        :scroll-left="shrinkScrollLeft"
        @scroll="onScrollHandler"
      >
        <view class="wd-resize__wrapper--placeholder" style="height: 250%; width: 250%"></view>
      </scroll-view>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-resize',
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
import { computed, getCurrentInstance, onMounted, ref } from 'vue'
import { addUnit, objToStyle, uuid } from '../../common/util'
import { resizeProps } from './types'

const props = defineProps(resizeProps)
/**
 * resize 事件，容器尺寸变化时触发
 * 事件参数: { top, bottom, left, right, height, width }
 */
const emit = defineEmits(['resize'])

const expandScrollTop = ref<number>(0) // 监听容器变大时的纵向滚动距离
const shrinkScrollTop = ref<number>(0) // 监听容器变小时的纵向滚动距离
const expandScrollLeft = ref<number>(0) // 监听容器变大时的横向滚动距离
const shrinkScrollLeft = ref<number>(0) // 监听容器变小时的横向滚动距离
const height = ref<number>(0) // 容器当前高度
const width = ref<number>(0) // 容器当前宽度
const scrollEventCount = ref<number>(0) // 滚动事件计数

const rootStyle = computed(() => {
  const style: Record<string, string | number> = {
    width: addUnit(width.value),
    height: addUnit(height.value)
  }
  return `${objToStyle(style)}${props.customStyle}`
})
let onScrollHandler = () => {} // 滚动事件处理函数，动态定义用于闭包记录容器尺寸
const { proxy } = getCurrentInstance() as any

const resizeId = ref<string>(`resize${uuid()}`) // 容器唯一标识符

onMounted(() => {
  // 初始化数据获取，获取容器的初始尺寸
  const query = uni.createSelectorQuery().in(proxy).select(`#${resizeId.value}`).boundingClientRect()
  query.exec(([res]) => {
    // 闭包记录容器高度和宽度，用于监听容器尺寸变化
    let lastHeight = res.height
    let lastWidth = res.width
    // 立即填充父容器高宽
    height.value = lastHeight
    width.value = lastWidth
    // 监听滚动事件，当容器尺寸变化时，scroll-view 会触发滚动事件
    onScrollHandler = () => {
      const query = uni.createSelectorQuery().in(proxy).select(`#${resizeId.value}`).boundingClientRect()
      query.exec(([res]) => {
        // 前两次滚动事件被触发，说明初始化修改已渲染，通知用户代码当前容器大小
        if (scrollEventCount.value++ === 0) {
          const result: Record<string, string | number> = {}
          ;['bottom', 'top', 'left', 'right', 'height', 'width'].forEach((propName) => {
            result[propName] = res[propName]
          })
          emit('resize', result)
        }
        // 滚动条拉到底部会触发多余的事件，前 3 次事件需要屏蔽掉初始化事件
        if (scrollEventCount.value < 3) return
        // 手动设置父容器高宽，防止父容器坍塌
        // 滚动完，重新获取容器新的高度和宽度
        const newHeight = res.height
        const newWidth = res.width
        // 立即填充父容器高宽
        height.value = newHeight
        width.value = newWidth
        // 宽高都改变时，只需要触发一次 resize 事件
        const emitStack: number[] = []
        if (newHeight !== lastHeight) {
          lastHeight = newHeight
          emitStack.push(1)
        }
        if (newWidth !== lastWidth) {
          lastWidth = newWidth
          emitStack.push(1)
        }
        if (emitStack.length !== 0) {
          const result: Record<string, any> = {}
          ;['bottom', 'top', 'left', 'right', 'height', 'width'].forEach((propName) => {
            result[propName] = res[propName]
          })
          emit('resize', result)
        }
        // 滚动条拉到底部进行新一轮的尺寸监听（如果使用 nextTick 效果更佳）
        scrollToBottom({
          lastWidth: lastWidth,
          lastHeight: lastHeight
        })
      })
    }
    // 滚动条拉到底部进行初始化的尺寸监听（如果使用 nextTick 效果更佳）
    scrollToBottom({
      lastWidth: lastWidth,
      lastHeight: lastHeight
    })
  })
})

/**
 * 滚动条拉到底部，重置两个 scroll-view 的滚动位置
 * 用于检测容器尺寸变化
 * @param {Object} params 参数对象
 * @param {number} params.lastWidth 上一次记录的宽度
 * @param {number} params.lastHeight 上一次记录的高度
 */
function scrollToBottom({ lastWidth, lastHeight }: { lastWidth: number; lastHeight: number }) {
  expandScrollTop.value = 100000 + lastHeight
  shrinkScrollTop.value = 3 * height.value + lastHeight
  expandScrollLeft.value = 100000 + lastWidth
  shrinkScrollLeft.value = 3 * width.value + lastWidth
}
</script>
<style lang="scss">
@use './index.scss';
</style>
