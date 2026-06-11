<template>
  <view :class="rootClass" :style="props.customStyle" @click="handleClick">
    <!-- #ifdef MP-WEIXIN -->
    <canvas type="2d" :id="canvasId" :style="canvasStyle" />
    <!-- #endif -->
    <!-- #ifndef MP-WEIXIN -->
    <canvas :canvas-id="canvasId" :style="canvasStyle" />
    <!-- #endif -->
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-qr-code',
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
import { computed, getCurrentInstance, nextTick, onMounted, ref, toRaw, watch } from 'vue'
import { addUnit, uuid } from '../../common/util'
import { canvas2dAdapter } from '../../common/canvasHelper'
import { generateQRCode, QRErrorCorrectLevel } from './qrcode'
import { qrCodeProps, type QrCodeExpose } from './types'

const props = defineProps(qrCodeProps)
const emit = defineEmits<{
  click: [event: Event]
  error: [error: unknown]
}>()

const instance = getCurrentInstance()
const rootClass = computed(() => `wd-qr-code ${props.customClass}`)
const canvasStyle = computed(() => ({
  width: addUnit(props.size),
  height: addUnit(props.size)
}))

const canvasId = ref(props.canvasId || `wd-qr-code-${uuid()}`)
const canvasNode = ref<any>(null)
const canvasCtx = ref<UniApp.CanvasContext | null>(null)
const pixelRatio = ref(1)
const isCanvasReady = ref(false)
let drawTask: Promise<void> = Promise.resolve()

watch(
  [
    () => props.text,
    () => props.size,
    () => props.correctLevel,
    () => props.colorDark,
    () => props.colorLight,
    () => props.margin,
    () => props.logo,
    () => props.logoWidth,
    () => props.logoHeight,
    () => props.dotType,
    () => props.dotScale,
    () => props.enableGradient,
    () => props.gradientColor,
    () => props.gradientColors,
    () => props.gradientDirection,
    () => props.logoBackgroundColor,
    () => props.logoRadius,
    () => props.logoBorderColor,
    () => props.logoBorderWidth,
    () => props.backgroundImage
  ],
  () => {
    if (isCanvasReady.value) {
      requestDraw()
    }
  },
  { deep: true }
)

onMounted(() => {
  nextTick(() => {
    initCanvas()
  })
})

function initCanvas() {
  // #ifdef MP-WEIXIN
  uni
    .createSelectorQuery()
    .in(instance)
    .select(`#${canvasId.value}`)
    .node((res) => {
      if (!res?.node) {
        emit('error', new Error('Canvas node not found'))
        return
      }

      const canvas = res.node
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        emit('error', new Error('Failed to get canvas context'))
        return
      }

      const dpr = uni.getWindowInfo ? uni.getWindowInfo().pixelRatio : uni.getSystemInfoSync().pixelRatio
      pixelRatio.value = dpr

      canvasNode.value = canvas
      canvasCtx.value = canvas2dAdapter(ctx as CanvasRenderingContext2D)
      isCanvasReady.value = true
      requestDraw()
    })
    .exec()
  // #endif

  // #ifndef MP-WEIXIN
  isCanvasReady.value = true
  requestDraw()
  // #endif
}

function requestDraw() {
  drawTask = draw()
}

async function draw() {
  if (!isCanvasReady.value) return

  // #ifdef MP-WEIXIN
  syncWechatCanvas()
  // #endif

  let ctx = canvasCtx.value
  // #ifndef MP-WEIXIN
  if (!ctx) {
    ctx = uni.createCanvasContext(canvasId.value, instance)
    canvasCtx.value = ctx
  }
  // #endif

  if (!ctx) {
    emit('error', new Error('Canvas context not available'))
    return
  }

  try {
    ctx.clearRect(0, 0, props.size, props.size)
    ctx.fillStyle = props.colorLight
    ctx.fillRect(0, 0, props.size, props.size)

    if (!props.text) {
      // #ifndef MP-WEIXIN
      await flushCanvas(ctx)
      // #endif
      return
    }

    let modules: boolean[][]
    try {
      const errorCorrectLevel = QRErrorCorrectLevel[props.correctLevel as keyof typeof QRErrorCorrectLevel] || QRErrorCorrectLevel.H
      modules = generateQRCode(props.text, { errorCorrectLevel }).modules
    } catch (error) {
      emit('error', error)
      return
    }

    const tileW = (props.size - props.margin * 2) / modules.length
    const tileH = (props.size - props.margin * 2) / modules.length

    if (props.backgroundImage) {
      try {
        await drawImage(ctx, props.backgroundImage, 0, 0, props.size, props.size)
      } catch (error) {
        emit('error', error)
      }
    }

    if (props.enableGradient) {
      const gradient = createGradient(ctx)
      ctx.fillStyle = gradient as unknown as string
    } else {
      ctx.fillStyle = props.colorDark
    }

    const hasModule = (row: number, col: number) => {
      return row >= 0 && row < modules.length && col >= 0 && col < modules[row].length && modules[row][col]
    }

    for (let row = 0; row < modules.length; row++) {
      for (let col = 0; col < modules[row].length; col++) {
        if (!modules[row][col]) continue

        const x = Math.ceil(col * tileW) + props.margin
        const y = Math.ceil(row * tileH) + props.margin
        const width = Math.ceil((col + 1) * tileW) - Math.ceil(col * tileW)
        const height = Math.ceil((row + 1) * tileH) - Math.ceil(row * tileH)
        const scaledWidth = width * props.dotScale
        const scaledHeight = height * props.dotScale
        const scaledX = x + (width - scaledWidth) / 2
        const scaledY = y + (height - scaledHeight) / 2

        if (props.dotType === 'dots') {
          ctx.beginPath()
          ctx.arc(scaledX + scaledWidth / 2, scaledY + scaledHeight / 2, scaledWidth / 2, 0, Math.PI * 2)
          ctx.fill()
          continue
        }

        if (props.dotType === 'rounded') {
          drawRoundedRect(ctx, scaledX, scaledY, scaledWidth, scaledHeight, scaledWidth * 0.25)
          ctx.fill()
          continue
        }

        if (props.dotType === 'liquid') {
          const radius = scaledWidth * 0.5
          const top = hasModule(row - 1, col)
          const bottom = hasModule(row + 1, col)
          const left = hasModule(row, col - 1)
          const right = hasModule(row, col + 1)
          const tl = !top && !left ? radius : 0
          const tr = !top && !right ? radius : 0
          const br = !bottom && !right ? radius : 0
          const bl = !bottom && !left ? radius : 0
          drawRoundedRect(ctx, scaledX, scaledY, scaledWidth, scaledHeight, [tl, tr, br, bl])
          ctx.fill()
          continue
        }

        ctx.fillRect(scaledX, scaledY, scaledWidth, scaledHeight)
      }
    }

    if (props.logo) {
      await drawLogo(ctx)
    }

    // #ifndef MP-WEIXIN
    await flushCanvas(ctx)
    // #endif
  } catch (error) {
    emit('error', error)
  }
}

// #ifndef MP-WEIXIN
function flushCanvas(ctx: UniApp.CanvasContext) {
  return new Promise<void>((resolve) => {
    let settled = false
    const done = () => {
      if (settled) return
      settled = true
      resolve()
    }

    try {
      ctx.draw(true, done)
    } catch (error) {
      void error
      ctx.draw(true)
    }

    // H5 上部分实现不会触发 draw 回调，兜底在下一帧后继续流程。
    setTimeout(done, 16)
  })
}
// #endif

// #ifdef MP-WEIXIN
function syncWechatCanvas() {
  const canvas = toRaw(canvasNode.value)
  const ctx = canvasCtx.value as unknown as CanvasRenderingContext2D | null
  if (!canvas || !ctx) return

  const dpr = uni.getWindowInfo ? uni.getWindowInfo().pixelRatio : uni.getSystemInfoSync().pixelRatio
  const width = props.size * dpr
  const height = props.size * dpr
  pixelRatio.value = dpr

  if (canvas.width !== width) {
    canvas.width = width
  }
  if (canvas.height !== height) {
    canvas.height = height
  }

  if (typeof ctx.setTransform === 'function') {
    ctx.setTransform(1, 0, 0, 1, 0, 0)
  } else if (typeof ctx.resetTransform === 'function') {
    ctx.resetTransform()
  } else {
    canvas.width = width
    canvas.height = height
  }

  ctx.scale(dpr, dpr)
}
// #endif

function createGradient(ctx: UniApp.CanvasContext) {
  if (props.gradientDirection === 'horizontal') {
    return createGradientWithStops(ctx.createLinearGradient(0, 0, props.size, 0))
  }
  if (props.gradientDirection === 'vertical') {
    return createGradientWithStops(ctx.createLinearGradient(0, 0, 0, props.size))
  }
  if (typeof props.gradientDirection === 'number') {
    const angle = (props.gradientDirection * Math.PI) / 180
    const center = props.size / 2
    const radius = (Math.abs(Math.cos(angle)) + Math.abs(Math.sin(angle))) * center
    const x0 = center - Math.cos(angle) * radius
    const y0 = center - Math.sin(angle) * radius
    const x1 = center + Math.cos(angle) * radius
    const y1 = center + Math.sin(angle) * radius
    return createGradientWithStops(ctx.createLinearGradient(x0, y0, x1, y1))
  }

  return createGradientWithStops(ctx.createLinearGradient(0, 0, props.size, props.size))
}

function createGradientWithStops(gradient: CanvasGradient) {
  if (props.gradientColors.length > 0) {
    const lastIndex = Math.max(props.gradientColors.length - 1, 1)
    props.gradientColors.forEach((color, index) => {
      gradient.addColorStop(index / lastIndex, color)
    })
    return gradient
  }

  gradient.addColorStop(0, props.colorDark)
  gradient.addColorStop(1, props.gradientColor)
  return gradient
}

function drawRoundedRect(ctx: UniApp.CanvasContext, x: number, y: number, width: number, height: number, radius: number | number[]) {
  const [tl, tr, br, bl] = Array.isArray(radius) ? radius : [radius, radius, radius, radius]
  ctx.beginPath()
  ctx.moveTo(x + tl, y)
  ctx.lineTo(x + width - tr, y)
  ctx.arc(x + width - tr, y + tr, tr, 1.5 * Math.PI, 0)
  ctx.lineTo(x + width, y + height - br)
  ctx.arc(x + width - br, y + height - br, br, 0, 0.5 * Math.PI)
  ctx.lineTo(x + bl, y + height)
  ctx.arc(x + bl, y + height - bl, bl, 0.5 * Math.PI, Math.PI)
  ctx.lineTo(x, y + tl)
  ctx.arc(x + tl, y + tl, tl, Math.PI, 1.5 * Math.PI)
  ctx.closePath()
}

async function drawImage(ctx: UniApp.CanvasContext, src: string, x: number, y: number, width: number, height: number) {
  // #ifdef MP-WEIXIN
  if (canvasNode.value?.createImage) {
    try {
      await drawImageWithCreateImage(ctx, src, x, y, width, height)
      return
    } catch (error) {
      console.warn('[wot ui] warning(wd-qr-code): createImage failed, fallback to getImageInfo', error)
    }
  }
  // #endif

  try {
    await drawImageWithGetImageInfo(ctx, src, x, y, width, height)
  } catch (error) {
    ctx.drawImage(src, x, y, width, height)
    // #ifndef MP-WEIXIN
    ctx.draw(true)
    // #endif
    void error
  }
}

function drawImageWithCreateImage(ctx: UniApp.CanvasContext, src: string, x: number, y: number, width: number, height: number) {
  return new Promise<void>((resolve, reject) => {
    const canvas = toRaw(canvasNode.value)
    const image = canvas.createImage()
    image.crossOrigin = 'anonymous'
    image.onload = () => {
      ctx.drawImage(image, x, y, width, height)
      resolve()
    }
    image.onerror = (error: unknown) => reject(error)
    setImageSource(image, src)
  })
}

function drawImageWithGetImageInfo(ctx: UniApp.CanvasContext, src: string, x: number, y: number, width: number, height: number) {
  return new Promise<void>((resolve, reject) => {
    uni.getImageInfo({
      src,
      success: (res) => {
        ctx.drawImage(res.path, x, y, width, height)
        // #ifndef MP-WEIXIN
        ctx.draw(true)
        // #endif
        resolve()
      },
      fail: reject
    })
  })
}

function setImageSource(image: any, src: string) {
  if (src.startsWith('wxfile://') || src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) {
    image.src = src
    return
  }

  // #ifdef MP-WEIXIN
  const fs = wx.getFileSystemManager()
  try {
    fs.accessSync(src)
  } catch (error) {
    void error
  }
  // #endif

  image.src = src
}

async function drawLogo(ctx: UniApp.CanvasContext) {
  const logoWidth = props.logoWidth || props.size * 0.2
  const logoHeight = props.logoHeight || logoWidth
  const logoX = (props.size - logoWidth) / 2
  const logoY = (props.size - logoHeight) / 2

  // #ifdef MP-WEIXIN
  if (canvasNode.value?.createImage) {
    try {
      await drawLogoWithCreateImage(ctx, logoX, logoY, logoWidth, logoHeight)
      return
    } catch (error) {
      console.warn('[wot ui] warning(wd-qr-code): logo createImage failed, fallback to getImageInfo', error)
    }
  }
  // #endif

  try {
    await drawLogoWithGetImageInfo(ctx, logoX, logoY, logoWidth, logoHeight)
  } catch (error) {
    drawLogoContent(ctx, props.logo, logoX, logoY, logoWidth, logoHeight)
    // #ifndef MP-WEIXIN
    ctx.draw(true)
    // #endif
    void error
  }
}

function drawLogoWithCreateImage(ctx: UniApp.CanvasContext, x: number, y: number, width: number, height: number) {
  return new Promise<void>((resolve, reject) => {
    const canvas = toRaw(canvasNode.value)
    const image = canvas.createImage()
    image.crossOrigin = 'anonymous'
    image.onload = () => {
      try {
        drawLogoContent(ctx, image, x, y, width, height)
        resolve()
      } catch (error) {
        reject(error)
      }
    }
    image.onerror = (error: unknown) => reject(error)
    setImageSource(image, props.logo)
  })
}

function drawLogoWithGetImageInfo(ctx: UniApp.CanvasContext, x: number, y: number, width: number, height: number) {
  return new Promise<void>((resolve, reject) => {
    uni.getImageInfo({
      src: props.logo,
      success: (res) => {
        try {
          drawLogoContent(ctx, res.path, x, y, width, height)
          // #ifndef MP-WEIXIN
          ctx.draw(true)
          // #endif
          resolve()
        } catch (error) {
          reject(error)
        }
      },
      fail: reject
    })
  })
}

function drawLogoContent(ctx: UniApp.CanvasContext, image: any, x: number, y: number, width: number, height: number) {
  const padding = 4
  const boxX = x - padding
  const boxY = y - padding
  const boxWidth = width + padding * 2
  const boxHeight = height + padding * 2
  const radius = props.logoRadius || 0
  const borderWidth = props.logoBorderWidth || 0
  const backgroundColor = props.logoBackgroundColor || '#ffffff'
  const borderColor = props.logoBorderColor || 'transparent'

  if (backgroundColor || borderWidth > 0) {
    drawRoundedRect(ctx, boxX, boxY, boxWidth, boxHeight, radius)
    if (backgroundColor) {
      ctx.fillStyle = backgroundColor
      ctx.fill()
    }
    if (borderWidth > 0) {
      ctx.lineWidth = borderWidth
      ctx.strokeStyle = borderColor
      ctx.stroke()
    }
  }

  ctx.save()
  if (radius > 0) {
    const innerRadius = Math.max(0, radius - padding)
    drawRoundedRect(ctx, x, y, width, height, innerRadius)
    ctx.clip()
  }
  ctx.drawImage(image, x, y, width, height)
  ctx.restore()
}

async function exportImage(): Promise<string> {
  await drawTask

  return new Promise((resolve, reject) => {
    const options: UniApp.CanvasToTempFilePathOptions = {
      canvasId: canvasId.value,
      width: props.size,
      height: props.size,
      destWidth: props.size * pixelRatio.value,
      destHeight: props.size * pixelRatio.value,
      success: (res) => {
        resolve(res.tempFilePath)
      },
      fail: reject
    }

    // #ifdef MP-WEIXIN
    if (canvasNode.value) {
      ;(options as any).canvas = toRaw(canvasNode.value)
    }
    // #endif

    uni.canvasToTempFilePath(options, instance)
  })
}

function handleClick(event: Event) {
  emit('click', event)
}

defineExpose<QrCodeExpose>({
  exportImage
})
</script>

<style lang="scss">
@use './index.scss';
</style>
