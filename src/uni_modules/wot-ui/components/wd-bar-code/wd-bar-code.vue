<template>
  <view :class="rootClass" :style="customStyle">
    <!-- #ifdef MP-WEIXIN -->
    <canvas v-if="canvasVisible" :id="canvasId" :canvas-id="canvasId" type="2d" :style="canvasStyle" />
    <!-- #endif -->
    <!-- #ifndef MP-WEIXIN -->
    <canvas v-if="canvasVisible" :canvas-id="canvasId" :id="canvasId" :style="canvasStyle" />
    <!-- #endif -->
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-bar-code',
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
import { computed, getCurrentInstance, nextTick, onBeforeMount, onMounted, ref, watch } from 'vue'
import { getSystemInfo, isDef, objToStyle, uuid } from '../../common/util'
import JsBarcode from './barCode.js'
import { barCodeProps, isValidBarCodeFormat, MAX_BAR_CODE_VALUE_LENGTH, type BarCodeFormat } from './types'
// #ifdef MP-WEIXIN
import { canvas2dAdapter } from '../../common/canvasHelper'
// #endif

const props = defineProps(barCodeProps)

const emit = defineEmits<{
  error: [error: unknown]
  valid: [valid: boolean]
}>()

const instance = getCurrentInstance()
const proxy = instance?.proxy

const canvasId = ref(`wd-bar-code-${uuid()}`)
const canvasWidth = ref(300)
const canvasHeight = ref(150)
const pixelRatio = ref(1)

let ctx: UniApp.CanvasContext | null = null
// #ifdef MP-WEIXIN
let canvasNode: WechatMiniprogram.Canvas | null = null
// #endif

const rootClass = computed(() => `wd-bar-code ${props.customClass}`)

const canvasStyle = computed(() =>
  objToStyle({
    width: `${canvasWidth.value}px`,
    height: `${canvasHeight.value}px`
  })
)

const canvasVisible = computed(() => hasBarCodeValue(props.value))

watch(
  () => [
    props.value,
    props.format,
    props.width,
    props.height,
    props.text,
    props.font,
    props.fontSize,
    props.fontOptions,
    props.textMargin,
    props.background,
    props.lineColor,
    props.margin,
    props.marginTop,
    props.marginBottom,
    props.marginLeft,
    props.marginRight,
    props.displayValue,
    props.textAlign,
    props.textPosition
  ],
  () => {
    requestDraw()
  }
)

watch(canvasVisible, (visible) => {
  if (visible) {
    resetCanvasContext()
    nextTick(() => {
      requestDraw()
    })
  } else {
    resetCanvasContext()
    canvasWidth.value = 0
    canvasHeight.value = 0
  }
})

onBeforeMount(() => {
  pixelRatio.value = getSystemInfo().pixelRatio || 1
})

onMounted(() => {
  nextTick(() => {
    requestDraw()
  })
})

/**
 * 判断是否存在可绘制的条码内容
 */
function hasBarCodeValue(value: string | number | undefined | null) {
  if (!isDef(value)) return false
  if (typeof value === 'string' && value === '') return false
  return true
}

/**
 * 重置 canvas 上下文，避免节点重建后复用失效上下文
 */
function resetCanvasContext() {
  ctx = null
  // #ifdef MP-WEIXIN
  canvasNode = null
  // #endif
}

let drawTask: Promise<void> = Promise.resolve()

/**
 * 合并同一帧内的重复绘制请求
 */
function requestDraw() {
  drawTask = drawTask
    .catch(() => undefined)
    .then(async () => {
      await nextTick()
      await renderBarCode()
    })
}

/**
 * 获取 canvas 上下文
 */
function getContext() {
  return new Promise<UniApp.CanvasContext | null>((resolve) => {
    if (!proxy) {
      resolve(null)
      return
    }

    if (ctx) {
      resolve(ctx)
      return
    }

    // #ifndef MP-WEIXIN
    ctx = uni.createCanvasContext(canvasId.value, proxy)
    resolve(ctx)
    // #endif

    // #ifdef MP-WEIXIN
    uni
      .createSelectorQuery()
      .in(proxy)
      .select(`#${canvasId.value}`)
      .node((res) => {
        if (!res?.node) {
          resolve(null)
          return
        }

        canvasNode = res.node
        const rawCtx = canvasNode.getContext('2d') as CanvasRenderingContext2D
        if (!rawCtx) {
          resolve(null)
          return
        }

        ctx = canvas2dAdapter(rawCtx)
        resolve(ctx)
      })
      .exec()
    // #endif
  })
}

/**
 * 同步 canvas 节点尺寸
 */
function applyCanvasNodeSize() {
  // #ifdef MP-WEIXIN
  if (!canvasNode) return

  const width = canvasWidth.value
  const height = canvasHeight.value
  if (width <= 0 || height <= 0) return

  const ratio = pixelRatio.value
  canvasNode.width = Math.ceil(width * ratio)
  canvasNode.height = Math.ceil(height * ratio)

  const rawCtx = canvasNode.getContext('2d') as CanvasRenderingContext2D
  rawCtx.setTransform(ratio, 0, 0, ratio, 0, 0)
  ctx = canvas2dAdapter(rawCtx)
  // #endif
}

/**
 * 构建 JsBarcode 所需的 canvas 包装对象
 */
function createCanvasWrapper(context: UniApp.CanvasContext) {
  return {
    getContext: () => {
      // #ifdef MP-WEIXIN
      if (canvasNode) {
        const rawCtx = canvasNode.getContext('2d') as CanvasRenderingContext2D
        return canvas2dAdapter(rawCtx)
      }
      // #endif
      return context
    },
    set width(width: number) {
      canvasWidth.value = width
      applyCanvasNodeSize()
    },
    set height(height: number) {
      canvasHeight.value = height
      applyCanvasNodeSize()
    },
    get width() {
      return canvasWidth.value
    },
    get height() {
      return canvasHeight.value
    }
  }
}

/**
 * 解析并校验条码格式
 */
function resolveFormat(format: string): BarCodeFormat | null {
  if (format === 'auto') {
    return 'auto'
  }

  if (!isValidBarCodeFormat(format)) {
    return null
  }

  return format
}

/**
 * 绘制条形码到 canvas
 */
async function renderBarCode() {
  if (!canvasVisible.value) {
    return
  }

  const barcodeValue = String(props.value)
  if (barcodeValue.length > MAX_BAR_CODE_VALUE_LENGTH) {
    emit('error', new Error(`Barcode value exceeds max length ${MAX_BAR_CODE_VALUE_LENGTH}`))
    return
  }

  const format = resolveFormat(props.format)
  if (!format) {
    emit('error', new Error(`Unsupported barcode format: ${props.format}`))
    return
  }

  const context = await getContext()
  if (!context) {
    emit('error', new Error('Canvas context is not ready'))
    return
  }

  const options: Record<string, unknown> = {
    format,
    width: props.width,
    height: props.height,
    text: props.text || undefined,
    font: props.font,
    fontSize: props.fontSize,
    fontOptions: props.fontOptions,
    textMargin: props.textMargin,
    background: props.background,
    lineColor: props.lineColor,
    margin: props.margin,
    marginTop: props.marginTop,
    marginBottom: props.marginBottom,
    marginLeft: props.marginLeft,
    marginRight: props.marginRight,
    displayValue: props.displayValue,
    textAlign: props.textAlign,
    textPosition: props.textPosition,
    valid: (valid: boolean) => {
      emit('valid', valid)
    }
  }

  Object.keys(options).forEach((key) => {
    if (options[key] === undefined) {
      delete options[key]
    }
  })

  const canvasWrapper = createCanvasWrapper(context)

  try {
    JsBarcode(canvasWrapper, barcodeValue, options)
    // #ifndef MP-WEIXIN
    context.draw()
    // #endif
  } catch (error) {
    console.error('JsBarcode render error:', error)
    emit('error', error)
  }
}
</script>

<style lang="scss">
@use './index.scss';
</style>
