<template>
  <!-- 绘制的图片canvas -->
  <view v-if="modelValue" :class="`wd-img-cropper ${customClass}`" :style="customStyle" @touchmove="preventTouchMove">
    <!-- 展示在用户面前的裁剪框 -->
    <view class="wd-img-cropper__wrapper">
      <!-- 画出裁剪框 -->
      <view class="wd-img-cropper__cut">
        <!-- 上方阴影块 -->
        <view :class="`wd-img-cropper__overlay ${moving ? 'is-highlight' : ''}`" :style="`height: ${cutTop}px;`"></view>
        <view class="wd-img-cropper__cut-middle" :style="`height: ${cutHeight}px;`">
          <!-- 左侧阴影块 -->
          <view :class="`wd-img-cropper__overlay ${moving ? 'is-highlight' : ''}`" :style="`width: ${cutLeft}px; height: ${cutHeight}px;`"></view>
          <!-- 裁剪框 -->
          <view class="wd-img-cropper__cut-body" :style="`width: ${cutWidth}px; height: ${cutHeight}px;`">
            <!-- 内部网格线 -->
            <view class="wd-img-cropper__gridline wd-img-cropper__gridline--x"></view>
            <view class="wd-img-cropper__gridline wd-img-cropper__gridline--y"></view>
            <!-- 裁剪窗体四个对角 -->
            <view class="wd-img-cropper__corner wd-img-cropper__corner--left-top"></view>
            <view class="wd-img-cropper__corner wd-img-cropper__corner--left-bottom"></view>
            <view class="wd-img-cropper__corner wd-img-cropper__corner--right-top"></view>
            <view class="wd-img-cropper__corner wd-img-cropper__corner--right-bottom"></view>
          </view>
          <!-- 右侧阴影块 -->
          <view :class="`wd-img-cropper__overlay wd-img-cropper__overlay-right ${moving ? 'is-highlight' : ''}`"></view>
        </view>

        <!-- 底部阴影块 -->
        <view :class="`wd-img-cropper__overlay wd-img-cropper__overlay-bottom ${moving ? 'is-highlight' : ''}`"></view>
      </view>
      <!-- 展示的传过来的图片: 控制图片的旋转角度(rotate)、缩放程度(imgScale)、移动位置(translate) -->
      <image
        class="wd-img-cropper__img"
        :src="imgSrc"
        :style="imageStyle"
        :lazy-load="false"
        @touchstart="handleImgTouchStart"
        @touchmove="handleImgTouchMove"
        @touchend="handleImgTouchEnd"
        @error="handleImgLoadError"
        @load="handleImgLoaded"
      />
    </view>
    <!-- 绘制的图片canvas -->
    <canvas
      :canvas-id="canvasId"
      :id="canvasId"
      class="wd-img-cropper__canvas"
      :disable-scroll="true"
      :style="`width: ${Number(canvasWidth) * canvasScale}px; height: ${Number(canvasHeight) * canvasScale}px;`"
    />
    <!-- 下方按钮 -->
    <view class="wd-img-cropper__footer">
      <wd-icon custom-class="wd-img-cropper__rotate" v-if="!disabledRotate" name="refresh" @click="handleRotate"></wd-icon>
      <view class="wd-img-cropper__footer-btn">
        <wd-button custom-class="wd-img-cropper__cancel" size="large" type="info" variant="text" @click="handleCancel">
          {{ cancelButtonText || translate('cancel') }}
        </wd-button>

        <wd-button size="large" @click="handleConfirm">{{ confirmButtonText || translate('confirm') }}</wd-button>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-img-cropper',
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
import wdButton from '../wd-button/wd-button.vue'
import { computed, getCurrentInstance, ref, watch } from 'vue'
import { addUnit, getSystemInfo, objToStyle, uuid } from '../../common/util'
import { useTranslate } from '../../composables/useTranslate'
import { imgCropperProps, type ImgCropperExpose } from './types'
// #ifdef H5
import { useLockScroll } from '../../composables/useLockScroll'
// #endif

/** 顶部裁剪框占比 */
const TOP_PERCENT = 0.85
/** 动画过渡时长（毫秒） */
const ANIMATION_DURATION = 300
/** 节流频率（毫秒） */
const THROTTLE_INTERVAL = 1000 / 40

const canvasId = ref<string>(`cropper${uuid()}`) // canvas 组件的唯一标识符

// 延时动画设置
let animationTimer: any | null = null
// 移动节流定时器
let moveThrottleTimer: any | null = null
// 节流标志
let isThrottleActive: boolean = true
// 记录初始图片宽度
let initImgWidth: null | number | string = null
// 记录初始图片高度
let initImgHeight: null | number | string = null

const props = defineProps(imgCropperProps)
const emit = defineEmits(['imgloaded', 'imgloaderror', 'cancel', 'confirm', 'update:modelValue'])

const { translate } = useTranslate('img-cropper')

// 旋转角度
const imgAngle = ref<number>(0)
// 是否开启动画
const isAnimation = ref<boolean>(false)

// 裁剪框的宽高
const picWidth = ref<number>(0)
const picHeight = ref<number>(0)
const cutWidth = ref<number>(0)
const cutHeight = ref<number>(0)
const offset = ref<number>(20)
// 裁剪框的距顶距左
const cutLeft = ref<number>(0)
const cutTop = ref<number>(0)
// Canvas 最终成像宽高
const canvasWidth = ref<string | number>('')
const canvasHeight = ref<string | number>('')
const canvasScale = ref<number>(2)
// 图片当前缩放比例
const imgScale = ref<number>(1)
// 图片中心轴点距左的距离
const imgLeft = ref<number>(getSystemInfo().windowWidth / 2)
// 图片中心轴点距顶的距离
const imgTop = ref<number>((getSystemInfo().windowHeight / 2) * TOP_PERCENT)

// 获取的原始图片信息
const imgInfo = ref<UniApp.GetImageInfoSuccessData | null>(null)
// 系统信息缓存（窗口大小、平台等）
const info = ref(getSystemInfo())

// 是否处于移动/缩放中，用于控制裁剪框背景是否高亮
const moving = ref<boolean>(false)

/**
 * 记录触摸位置信息
 * [0] 存储第一根手指位置，[1] 预留给第二根手指（缩放时使用）
 */
interface TouchPosition {
  x: string | number
  y: string | number
}
const movingPosRecord = ref<TouchPosition[]>([
  { x: '', y: '' },
  { x: '', y: '' }
])
// 双指缩放时两触点间的距离（用于计算缩放比例）
const fingerDistance = ref<string | number>('')

// Canvas 绘图上下文
const ctx = ref<UniApp.CanvasContext | null>(null)

const { proxy } = getCurrentInstance() as any

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      initImgWidth = props.imgWidth
      initImgHeight = props.imgHeight
      info.value = getSystemInfo()

      // 根据aspectRatio计算裁剪框尺寸
      const [widthRatio, heightRatio] = props.aspectRatio.split(':').map(Number)
      const tempCutWidth = info.value.windowWidth - offset.value * 2
      const tempCutHeight = (tempCutWidth * heightRatio) / widthRatio

      cutWidth.value = tempCutWidth
      cutHeight.value = tempCutHeight
      cutTop.value = (info.value.windowHeight * TOP_PERCENT - tempCutHeight) / 2
      cutLeft.value = offset.value

      canvasScale.value = props.exportScale
      canvasHeight.value = tempCutHeight
      canvasWidth.value = tempCutWidth
      // 根据开发者设置的图片目标尺寸计算实际尺寸
      initImageSize()
      // 初始化canvas
      initCanvas()
      // 加载图片
      props.imgSrc && loadImg()
    } else {
      resetImg()
    }
  },
  {
    deep: true,
    immediate: true
  }
)

watch(
  () => props.imgSrc,
  (newValue) => {
    newValue && loadImg()
  },
  {
    deep: true,
    immediate: true
  }
)

watch(
  () => imgAngle.value,
  (newValue) => {
    if (newValue % 90) {
      imgAngle.value = Math.round(newValue / 90) * 90
    }
  },
  {
    deep: true,
    immediate: true
  }
)
watch(
  () => isAnimation.value,
  (newValue) => {
    // 开启过渡之后自动关闭
    animationTimer && clearTimeout(animationTimer)
    if (newValue) {
      animationTimer = setTimeout(() => {
        revertIsAnimation(false)
        clearTimeout(animationTimer)
      }, ANIMATION_DURATION)
    }
  },
  {
    deep: true,
    immediate: true
  }
)

const imageStyle = computed(() => {
  const style: Record<string, string | number> = {
    width: picWidth.value ? addUnit(picWidth.value) : 'auto',
    height: picHeight.value ? addUnit(picHeight.value) : 'auto',
    transform: `translate(${addUnit(imgLeft.value - picWidth.value / 2)}, ${addUnit(imgTop.value - picHeight.value / 2)}) scale(${
      imgScale.value
    }) rotate(${imgAngle.value}deg)`,
    'transition-duration': (isAnimation.value ? ANIMATION_DURATION : 0) + 'ms'
  }
  return objToStyle(style)
})

/**
 * 切换图片过渡动画状态
 * @param {boolean | { value: boolean }} animation 动画状态：true 启用，false 禁用，或包含 value 属性的对象
 */
function revertIsAnimation(animation: boolean | { value: boolean }) {
  if (typeof animation === 'boolean') {
    isAnimation.value = animation
  } else {
    isAnimation.value = animation.value
  }
}

/**
 * 旋转图片
 * @param {number} angle 旋转角度（建议使用 90 的倍数）
 */
function setRotate(angle: number) {
  if (!angle || props.disabledRotate) return
  revertIsAnimation(true)
  imgAngle.value = angle

  // 重新计算缩放比例
  let tempPicWidth = picWidth.value
  let tempPicHeight = picHeight.value

  // 旋转后宽高互换
  if ((angle / 90) % 2) {
    tempPicWidth = picHeight.value
    tempPicHeight = picWidth.value
  }

  // 计算新的缩放比例
  const widthRatio = cutWidth.value / tempPicWidth
  const heightRatio = cutHeight.value / tempPicHeight
  imgScale.value = Math.max(widthRatio, heightRatio)

  // 检测边缘位置
  detectImgPosIsEdge()
}

/**
 * 重置图片到初始状态
 * 恢复：缩放比例、旋转角度、位置信息
 */
function resetImg() {
  const { windowHeight, windowWidth } = getSystemInfo()
  imgScale.value = 1
  imgAngle.value = 0
  imgLeft.value = windowWidth / 2
  imgTop.value = (windowHeight / 2) * TOP_PERCENT
}

/**
 * 加载图片资源文件，获取图片基本信息
 */
function loadImg() {
  if (!props.imgSrc) return

  uni.getImageInfo({
    src: props.imgSrc,
    success: (res) => {
      imgInfo.value = res
      computeImgSize()
      resetImg()
    },
    fail: () => {
      emit('imgloaderror', { src: props.imgSrc })
    }
  })
}

/**
 * 计算图片尺寸以填满裁剪框
 */
function computeImgSize() {
  let tempPicWidth: number = picWidth.value
  let tempPicHeight: number = picHeight.value

  if (!initImgHeight && !initImgWidth) {
    // 计算图片与裁剪框的宽高比
    const imgRatio = imgInfo.value!.width / imgInfo.value!.height
    const cropRatio = cutWidth.value / cutHeight.value

    if (imgRatio > cropRatio) {
      // 图片更宽，以高度为准
      tempPicHeight = cutHeight.value
      tempPicWidth = tempPicHeight * imgRatio
    } else {
      // 图片更高，以宽度为准
      tempPicWidth = cutWidth.value
      tempPicHeight = tempPicWidth / imgRatio
    }
  } else if (initImgHeight && !initImgWidth) {
    tempPicHeight = Number(initImgHeight)
    tempPicWidth = (imgInfo.value!.width / imgInfo.value!.height) * tempPicHeight
  } else if ((!initImgHeight && initImgWidth) || (initImgHeight && initImgWidth)) {
    tempPicWidth = Number(initImgWidth)
    tempPicHeight = (imgInfo.value!.height / imgInfo.value!.width) * tempPicWidth
  }

  // 确保计算后的尺寸至少有一边等于裁剪框尺寸
  const widthRatio = cutWidth.value / tempPicWidth
  const heightRatio = cutHeight.value / tempPicHeight
  const scale = Math.max(widthRatio, heightRatio)

  picWidth.value = tempPicWidth
  picHeight.value = tempPicHeight
  // 设置初始缩放以适应裁剪框
  imgScale.value = scale
}

/**
 * 初始化 Canvas 上下文
 */
function initCanvas() {
  if (!ctx.value) {
    ctx.value = uni.createCanvasContext(canvasId.value, proxy)
  }
}

/**
 * 初始化图片尺寸，处理百分比等特殊单位
 */
function initImageSize() {
  // 处理宽度：支持百分比和像素值
  if (initImgWidth && typeof initImgWidth === 'string' && initImgWidth.indexOf('%') !== -1) {
    const width: string = initImgWidth.replace('%', '')
    initImgWidth = (info.value.windowWidth / 100) * Number(width)
    picWidth.value = initImgWidth as number
  } else if (initImgWidth && typeof initImgWidth === 'number') {
    picWidth.value = initImgWidth
  }
  // 处理高度：支持百分比和像素值
  if (initImgHeight && typeof initImgHeight === 'string' && initImgHeight.indexOf('%') !== -1) {
    const height = (props.imgHeight as string).replace('%', '')
    initImgHeight = (info.value.windowHeight / 100) * Number(height)
    picHeight.value = initImgHeight as number
  } else if (initImgHeight && typeof initImgHeight === 'number') {
    picHeight.value = Number(initImgHeight)
  }
}

/**
 * 检测图片位置是否已到达裁剪框边缘
 * @param {number} [scale] 缩放比例，默认使用当前 imgScale.value
 */
function detectImgPosIsEdge(scale?: number) {
  const currentScale = scale || imgScale.value
  let currentImgLeft = imgLeft.value
  let currentImgTop = imgTop.value
  let currentPicWidth = picWidth.value
  let currentPicHeight = picHeight.value

  // 翻转后宽高切换
  if ((imgAngle.value / 90) % 2) {
    currentPicWidth = picHeight.value
    currentPicHeight = picWidth.value
  }
  // 左
  currentImgLeft =
    (currentPicWidth * currentScale) / 2 + cutLeft.value >= currentImgLeft ? currentImgLeft : (currentPicWidth * imgScale.value) / 2 + cutLeft.value
  // 右
  currentImgLeft =
    cutLeft.value + cutWidth.value - (currentPicWidth * currentScale) / 2 <= currentImgLeft
      ? currentImgLeft
      : cutLeft.value + cutWidth.value - (currentPicWidth * currentScale) / 2
  // 上
  currentImgTop =
    (currentPicHeight * currentScale) / 2 + cutTop.value >= currentImgTop ? currentImgTop : (currentPicHeight * currentScale) / 2 + cutTop.value
  // 下
  currentImgTop =
    cutTop.value + cutHeight.value - (currentPicHeight * currentScale) / 2 <= currentImgTop
      ? currentImgTop
      : cutTop.value + cutHeight.value - (currentPicHeight * currentScale) / 2

  imgScale.value = currentScale
  imgTop.value = currentImgTop
  imgLeft.value = currentImgLeft
}

/**
 * 检测并校正图片缩放，防止缩放后露出背景
 */
function detectImgScaleIsEdge() {
  let tempPicWidth = picWidth.value
  let tempPicHeight = picHeight.value
  let tempImgScale = imgScale.value

  // 翻转后宽高切换
  if ((imgAngle.value / 90) % 2) {
    tempPicWidth = picHeight.value
    tempPicHeight = picWidth.value
  }
  if (tempPicWidth * tempImgScale < cutWidth.value) {
    tempImgScale = cutWidth.value / tempPicWidth
  }
  if (tempPicHeight * tempImgScale < cutHeight.value) {
    tempImgScale = cutHeight.value / tempPicHeight
  }
  detectImgPosIsEdge(tempImgScale)
}

/**
 * 节流处理，用于优化移动事件的处理频率
 */
function throttle() {
  if (info.value.platform === 'android') {
    moveThrottleTimer && clearTimeout(moveThrottleTimer)
    moveThrottleTimer = setTimeout(() => {
      isThrottleActive = true
    }, THROTTLE_INTERVAL)
  } else {
    !isThrottleActive && (isThrottleActive = true)
  }
}

/**
 * 处理图片触摸开始事件，支持单指拖动和双指缩放
 * @param {TouchEvent} event 触摸事件
 */
function handleImgTouchStart(event: any) {
  // 如果处于在拖动中，背景为淡色展示全部，拖动结束则为 0.85 透明度
  moving.value = true
  if (event.touches.length === 1) {
    // 单指拖动
    movingPosRecord.value[0] = {
      x: event.touches[0].clientX - imgLeft.value,
      y: event.touches[0].clientY - imgTop.value
    }
  } else {
    // 以两指为坐标点 做直角三角形 a2 + b2 = c2
    const width = Math.abs(event.touches[1].clientX - event.touches[0].clientX)
    const height = Math.abs(event.touches[1].clientY - event.touches[0].clientY)
    fingerDistance.value = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2))
  }
}

/**
 * 处理图片触摸移动事件，实现单指拖动和双指缩放功能
 * @param {TouchEvent} event 触摸事件
 */
function handleImgTouchMove(event: any) {
  if (event.touches.length === 1) {
    // 单指拖动
    const { x, y } = movingPosRecord.value[0]
    const left = event.touches[0].clientX - Number(x)
    const top = event.touches[0].clientY - Number(y)
    imgLeft.value = left
    imgTop.value = top
    detectImgPosIsEdge()
  } else {
    // 以两指为坐标点 做直角三角形 a2 + b2 = c2
    const width = Math.abs(event.touches[1].clientX - event.touches[0].clientX)
    const height = Math.abs(event.touches[1].clientY - event.touches[0].clientY)
    const hypotenuse = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2))
    const scale = imgScale.value * (hypotenuse / Number(fingerDistance.value))
    imgScale.value = Math.min(scale, props.maxScale)
    detectImgScaleIsEdge()
    fingerDistance.value = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2))
  }
}

/**
 * 处理图片触摸结束事件
 */
function handleImgTouchEnd() {
  moving.value = false
}

/**
 * 处理图片加载完成事件
 * @param {any} res 图片加载结果
 */
function handleImgLoaded(res: any) {
  emit('imgloaded', res)
}

/**
 * 处理图片加载失败事件
 * @param {any} err 错误信息
 */
function handleImgLoadError(err: any) {
  emit('imgloaderror', err)
}

/**
 * 处理旋转按钮点击，逆时针旋转 90 度
 */
function handleRotate() {
  setRotate(imgAngle.value - 90)
}

/**
 * 处理取消按钮点击
 */
function handleCancel() {
  emit('cancel')
  emit('update:modelValue', false)
}

/**
 * 处理确认按钮点击，触发图片裁剪和导出流程
 */
function handleConfirm() {
  draw()
}

/**
 * 将 Canvas 画布转换为图片文件
 */
function canvasToImage() {
  const { fileType, quality, exportScale } = props
  uni.canvasToTempFilePath(
    {
      width: cutWidth.value * exportScale,
      height: Math.round(cutHeight.value * exportScale),
      destWidth: cutWidth.value * exportScale,
      destHeight: Math.round(cutHeight.value * exportScale),
      fileType,
      quality,
      canvasId: canvasId.value,
      success: (res: any) => {
        const result = { tempFilePath: res.tempFilePath, width: cutWidth.value * exportScale, height: cutHeight.value * exportScale }
        // #ifdef MP-DINGTALK
        result.tempFilePath = res.filePath
        // #endif
        emit('confirm', result)
      },
      complete: () => {
        emit('update:modelValue', false)
      }
    },
    proxy
  )
}

/**
 * 使用 Canvas 绘制裁剪后的图片
 *
 * 流程：
 * 1. 计算导出图片的实际像素尺寸（考虑缩放倍数）
 * 2. 计算图片在 Canvas 中的位置（相对于裁剪框）
 * 3. 应用几何变换：位移 + 旋转
 * 4. 绘制图片，自动裁剪超出部分
 */
function draw() {
  if (!props.imgSrc) return
  const draw = () => {
    // 计算导出时的图片实际像素尺寸（考虑 exportScale 倍数）
    const width = picWidth.value * imgScale.value * props.exportScale
    const height = picHeight.value * imgScale.value * props.exportScale
    // 计算图片左上角在 Canvas 中的位置（裁剪框坐标系内）
    const x = imgLeft.value - cutLeft.value
    const y = imgTop.value - cutTop.value
    // Canvas 绘图：位移变换（设置绘制原点到裁剪框中心）
    ctx.value!.translate(x * props.exportScale, y * props.exportScale)
    // Canvas 绘图：旋转变换（如未禁用旋转功能）
    if (!props.disabledRotate) {
      ctx.value!.rotate((imgAngle.value * Math.PI) / 180)
    }
    // drawImage 的 旋转是根据以当前图片的图片水平垂直方向为x、y轴，并在x y轴上移动
    ctx.value!.drawImage(props.imgSrc, -width / 2, -height / 2, width, height)

    ctx.value!.restore()

    // 绘制图片
    ctx.value!.draw(false, () => {
      canvasToImage()
    })
  }

  canvasHeight.value = cutHeight.value
  canvasWidth.value = cutWidth.value
  draw()
}

/**
 * 阻止裁剪区域外的页面滚动
 * 仅在裁剪框内触摸移动时禁用页面滚动
 */
function preventTouchMove() {}

// #ifdef H5
useLockScroll(() => props.modelValue)
// #endif

defineExpose<ImgCropperExpose>({
  revertIsAnimation,
  setRotate,
  resetImg
})
</script>

<style lang="scss" scoped>
@use './index.scss';
</style>
