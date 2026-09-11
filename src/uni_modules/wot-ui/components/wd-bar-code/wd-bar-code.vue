<template>
  <view :class="rootClass" :style="customStyle">
    <!-- #ifdef MP-WEIXIN -->
    <canvas v-if="canvasVisible" :id="canvasId" :canvas-id="canvasId" type="2d" :style="canvasStyle" />
    <!-- #endif -->
    <!-- #ifndef MP-WEIXIN -->
    <canvas v-if="canvasVisible" :canvas-id="canvasId" :id="canvasId" :width="canvasRealWidth" :height="canvasRealHeight" :style="canvasStyle" />
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
import { computed, getCurrentInstance, nextTick, onBeforeMount, onMounted, ref, toRaw, watch } from 'vue'
import { getSystemInfo, isDef, objToStyle, uuid } from '../../common/util'
import JsBarcode from './barCode'
import { drawBarCodeToCanvas, resolveBarCodeRenderSize, type BarCodeRenderEncoding, type BarCodeRenderOptions } from './barCodeRender'
import {
  barCodeProps,
  DEFAULT_BAR_CODE_LINE_WIDTH,
  isValidBarCodeFormat,
  MAX_BAR_CODE_VALUE_LENGTH,
  type BarCodeExpose,
  type BarCodeFormat
} from './types'
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

const canvasRealWidth = computed(() => {
  return canvasWidth.value
})

const canvasRealHeight = computed(() => {
  return canvasHeight.value
})

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
    requestDraw()
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
  requestDraw()
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

// #ifdef MP-WEIXIN
function barcodeCanvas2dAdapter(rawCtx: CanvasRenderingContext2D) {
  const context = canvas2dAdapter(rawCtx) as UniApp.CanvasContext & { font?: string }

  context.setFontSize = (fontSize: number | string) => {
    const size = typeof fontSize === 'number' ? `${fontSize}px` : fontSize
    const font = rawCtx.font || ''
    rawCtx.font = /\d+(?:\.\d+)?px/.test(font) ? font.replace(/\d+(?:\.\d+)?px/, size) : `${size} sans-serif`
  }

  return context
}
// #endif

let drawTask: Promise<void> = Promise.resolve()
let drawQueued = false

type ResolvedBarCodeOptions = {
  format: BarCodeFormat
  width: number
  height: number
  text?: string
  font: string
  fontSize: number
  fontOptions: string
  textMargin: number
  background: string
  lineColor: string
  margin: number
  marginTop: number
  marginBottom: number
  marginLeft: number
  marginRight: number
  displayValue: boolean
  textAlign: string
  textPosition: string
  valid: (valid: boolean) => void
}

/**
 * 合并同一帧内的重复绘制请求
 */
function requestDraw() {
  if (drawQueued) return

  drawQueued = true
  drawTask = drawTask
    .catch(() => undefined)
    .then(async () => {
      await nextTick()
      drawQueued = false
      await renderBarCode()
    })
}

function flushCanvas(context: UniApp.CanvasContext) {
  return new Promise<void>((resolve) => {
    let settled = false
    const done = () => {
      if (settled) return
      settled = true
      resolve()
    }

    try {
      context.draw?.(false, done)
    } catch (error) {
      void error
      context.draw?.(false)
    }

    setTimeout(done, 16)
  })
}

/**
 * 获取 canvas 上下文
 */
function getContext() {
  return new Promise<UniApp.CanvasContext | null>((resolve) => {
    if (ctx) {
      resolve(ctx)
      return
    }

    // #ifndef MP-WEIXIN
    if (!proxy) {
      resolve(null)
      return
    }
    const alipay = (globalThis as any).my
    ctx = alipay?.createCanvasContext ? alipay.createCanvasContext(canvasId.value) : uni.createCanvasContext(canvasId.value, proxy)
    resolve(ctx)
    // #endif

    // #ifdef MP-WEIXIN
    const query = uni.createSelectorQuery()
    const scopedQuery = proxy && query.in ? query.in(proxy) : query

    scopedQuery
      .select(`#${canvasId.value}`)
      .node((res) => {
        if (!res?.node) {
          resolve(null)
          return
        }

        const node = res.node as WechatMiniprogram.Canvas
        canvasNode = node
        const rawCtx = node.getContext('2d') as unknown as CanvasRenderingContext2D
        if (!rawCtx) {
          resolve(null)
          return
        }

        const dpr = uni.getWindowInfo ? uni.getWindowInfo().pixelRatio : uni.getSystemInfoSync().pixelRatio
        pixelRatio.value = dpr || 1
        ctx = barcodeCanvas2dAdapter(rawCtx)
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
  const node = canvasNode
  if (!node) return

  const width = canvasWidth.value
  const height = canvasHeight.value
  if (width <= 0 || height <= 0) return

  const ratio = pixelRatio.value
  node.width = Math.ceil(width * ratio)
  node.height = Math.ceil(height * ratio)

  const rawCtx = node.getContext('2d') as unknown as CanvasRenderingContext2D
  rawCtx.setTransform(ratio, 0, 0, ratio, 0, 0)
  ctx = barcodeCanvas2dAdapter(rawCtx)
  // #endif
}

/**
 * 等待 canvas 节点尺寸更新。
 */
function waitCanvasUpdated() {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, 0)
  })
}

function getResolvedMargin(value: number | undefined) {
  return value ?? props.margin
}

function getDisplayText() {
  return props.text || String(props.value)
}

function createBarCodeEncodings(barcodeValue: string, options: ResolvedBarCodeOptions) {
  const encoded: { encodings?: BarCodeRenderEncoding[] } = {}
  const encodeOptions: Record<string, unknown> = { ...options, width: DEFAULT_BAR_CODE_LINE_WIDTH }

  JsBarcode(encoded, barcodeValue, encodeOptions)

  return encoded.encodings || []
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

  const options: ResolvedBarCodeOptions = {
    format,
    width: DEFAULT_BAR_CODE_LINE_WIDTH,
    height: props.height,
    text: props.text || undefined,
    font: props.font,
    fontSize: props.fontSize,
    fontOptions: props.fontOptions,
    textMargin: props.textMargin,
    background: props.background,
    lineColor: props.lineColor,
    margin: props.margin,
    marginTop: getResolvedMargin(props.marginTop),
    marginBottom: getResolvedMargin(props.marginBottom),
    marginLeft: getResolvedMargin(props.marginLeft),
    marginRight: getResolvedMargin(props.marginRight),
    displayValue: props.displayValue,
    textAlign: props.textAlign,
    textPosition: props.textPosition,
    valid: (valid: boolean) => {
      emit('valid', valid)
    }
  }

  try {
    const encodings = createBarCodeEncodings(barcodeValue, options)
    const renderOptions = options as BarCodeRenderOptions
    const size = resolveBarCodeRenderSize(encodings, renderOptions, props.width)
    canvasWidth.value = size.width
    canvasHeight.value = size.height
    applyCanvasNodeSize()
    await nextTick()
    await waitCanvasUpdated()
    drawBarCodeToCanvas(context, encodings, renderOptions, size, getDisplayText())
    await flushCanvas(context)
  } catch (error) {
    console.error('JsBarcode render error:', error)
    emit('error', error)
  }
}

async function exportImage(): Promise<string> {
  await drawTask

  return new Promise((resolve, reject) => {
    const sourceWidth = Math.ceil(canvasWidth.value * pixelRatio.value)
    const sourceHeight = Math.ceil(canvasHeight.value * pixelRatio.value)
    const options: UniApp.CanvasToTempFilePathOptions = {
      canvasId: canvasId.value,
      width: sourceWidth,
      height: sourceHeight,
      destWidth: sourceWidth,
      destHeight: sourceHeight,
      success: (res) => {
        let tempFilePath = res.tempFilePath
        // #ifdef MP-DINGTALK
        tempFilePath = (res as any).filePath
        // #endif
        resolve(tempFilePath)
      },
      fail: reject
    }

    // #ifdef MP-WEIXIN
    if (canvasNode) {
      ;(options as any).canvas = toRaw(canvasNode)
    }
    // #endif

    const exportArgs: [UniApp.CanvasToTempFilePathOptions, any?] = [options]
    // #ifndef MP-ALIPAY
    exportArgs.push(proxy)
    // #endif
    uni.canvasToTempFilePath(...exportArgs)
  })
}

defineExpose<BarCodeExpose>({
  exportImage
})
</script>

<style lang="scss">
@use './index.scss';
</style>
