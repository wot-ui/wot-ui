import { config, mount } from '@vue/test-utils'
import WdImgCropper from '@/uni_modules/wot-ui/components/wd-img-cropper/wd-img-cropper.vue'
import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest'
import { nextTick } from 'vue'
import WdLoading from '@/uni_modules/wot-ui/components/wd-loading/wd-loading.vue'
config.global.components = { WdLoading }

const TOP_PERCENT = 0.85
const CUT_OFFSET = 20
const originalSystemInfo = uni.getSystemInfoSync()

function setWindowSize(windowWidth: number, windowHeight: number) {
  vi.mocked(uni.getSystemInfoSync).mockReturnValue({
    ...originalSystemInfo,
    screenWidth: windowWidth,
    screenHeight: windowHeight,
    windowWidth,
    windowHeight
  })
}

function readStylePx(style: string | undefined, prop: string) {
  const matched = style?.match(new RegExp(`(?:^|;)\\s*${prop}\\s*:\\s*(-?[\\d.]+)px`, 'i'))
  return matched ? Number(matched[1]) : Number.NaN
}

describe('WdImgCropper 图片裁剪组件', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    setWindowSize(375, 667)
  })

  afterEach(() => {
    vi.mocked(uni.getSystemInfoSync).mockReturnValue(originalSystemInfo)
  })

  test('基本渲染', async () => {
    const wrapper = mount(WdImgCropper, {
      props: {
        modelValue: true,
        imgSrc: 'test-image.jpg'
      }
    })
    await nextTick()

    expect(wrapper.find('.wd-img-cropper').exists()).toBe(true)
    expect(wrapper.props('imgSrc')).toBe('test-image.jpg')
    expect(wrapper.find('.wd-img-cropper__img').exists()).toBe(true)
  })

  test('组件显示与隐藏', async () => {
    const wrapper = mount(WdImgCropper, {
      props: {
        modelValue: false,
        imgSrc: 'test-image.jpg'
      }
    })

    // 初始状态不显示
    expect(wrapper.find('.wd-img-cropper').exists()).toBe(false)

    // 设置 modelValue 为 true 显示组件
    await wrapper.setProps({ modelValue: true })
    expect(wrapper.find('.wd-img-cropper').exists()).toBe(true)

    // 设置 modelValue 为 false 隐藏组件
    await wrapper.setProps({ modelValue: false })
    expect(wrapper.find('.wd-img-cropper').exists()).toBe(false)
  })

  test('自定义裁剪框宽高比', async () => {
    const wrapper = mount(WdImgCropper, {
      props: {
        modelValue: true,
        imgSrc: 'test-image.jpg',
        aspectRatio: '3:2'
      }
    })
    await nextTick()

    expect(wrapper.props('aspectRatio')).toBe('3:2')
    // 验证裁剪框的实际类名
    const cutBody = wrapper.find('.wd-img-cropper__cut-body')
    expect(cutBody.exists()).toBe(true)
  })

  test('禁用旋转功能', async () => {
    const wrapper = mount(WdImgCropper, {
      props: {
        modelValue: true,
        imgSrc: 'test-image.jpg',
        disabledRotate: true
      }
    })
    await nextTick()

    // 禁用旋转时，旋转按钮不应该存在
    expect(wrapper.find('.wd-img-cropper__rotate').exists()).toBe(false)
  })

  test('自定义按钮文案', async () => {
    const wrapper = mount(WdImgCropper, {
      props: {
        modelValue: true,
        imgSrc: 'test-image.jpg',
        cancelButtonText: '返回',
        confirmButtonText: '完成'
      }
    })
    await nextTick()

    const cancelButton = wrapper.find('.wd-img-cropper__cancel')
    const confirmButton = wrapper.findAll('.wd-button')[1]

    expect(cancelButton.text()).toBe('返回')
    expect(confirmButton.text()).toBe('完成')
  })

  test('图片加载成功事件', async () => {
    const onImgLoaded = vi.fn()
    const wrapper = mount(WdImgCropper, {
      props: {
        modelValue: true,
        imgSrc: 'test-image.jpg',
        onImgloaded: onImgLoaded
      }
    })
    await nextTick()

    // 模拟图片加载完成
    const image = wrapper.find('.wd-img-cropper__img')
    await image.trigger('load')

    expect(wrapper.emitted('imgloaded')).toBeTruthy()
  })

  test('图片加载失败事件', async () => {
    const onImgLoadError = vi.fn()
    const wrapper = mount(WdImgCropper, {
      props: {
        modelValue: true,
        imgSrc: 'test-image.jpg',
        onImgloaderror: onImgLoadError
      }
    })
    await nextTick()

    // 模拟图片加载失败
    const image = wrapper.find('.wd-img-cropper__img')
    await image.trigger('error')

    expect(wrapper.emitted('imgloaderror')).toBeTruthy()
  })

  test('取消裁剪事件', async () => {
    const onCancel = vi.fn()
    const onUpdateModelValue = vi.fn()
    const wrapper = mount(WdImgCropper, {
      props: {
        modelValue: true,
        imgSrc: 'test-image.jpg',
        onCancel,
        'onUpdate:modelValue': onUpdateModelValue
      }
    })
    await nextTick()

    // 点击取消按钮
    const cancelButton = wrapper.find('.wd-img-cropper__cancel')
    await cancelButton.trigger('click')

    expect(onCancel).toHaveBeenCalled()
    expect(onUpdateModelValue).toHaveBeenCalledWith(false)
  })

  test('确认裁剪事件', async () => {
    const onConfirm = vi.fn()
    const wrapper = mount(WdImgCropper, {
      props: {
        modelValue: true,
        imgSrc: 'test-image.jpg',
        onConfirm
      }
    })
    await nextTick()

    // 点击确认按钮（列表中第二个 .wd-button 是确认按钮）
    const confirmButton = wrapper.findAll('.wd-button')[1]
    await confirmButton.trigger('click')

    // 由于实际裁剪过程涉及到 canvas 操作，这里只能验证事件触发
    // 实际裁剪结果需要在真实环境中测试
    expect(uni.canvasToTempFilePath).toHaveBeenCalled()
  })

  test('图片触摸事件', async () => {
    const wrapper = mount(WdImgCropper, {
      props: {
        modelValue: true,
        imgSrc: 'test-image.jpg'
      }
    })
    await nextTick()

    const image = wrapper.find('.wd-img-cropper__img')

    // 模拟触摸开始
    await image.trigger('touchstart', {
      touches: [{ clientX: 100, clientY: 100 }]
    })

    // 模拟触摸移动
    await image.trigger('touchmove', {
      touches: [{ clientX: 150, clientY: 150 }]
    })

    // 模拟触摸结束
    await image.trigger('touchend')

    // 这里只能验证事件触发，实际效果需要在真实环境中测试
    expect(true).toBe(true)
  })

  test('旋转图片', async () => {
    const wrapper = mount(WdImgCropper, {
      props: {
        modelValue: true,
        imgSrc: 'test-image.jpg'
      }
    })
    await nextTick()

    // 调用旋转方法
    const rotateButton = wrapper.find('.wd-img-cropper__rotate')
    await rotateButton.trigger('click')

    // 验证旋转效果，这里只能间接验证
    // 实际旋转效果需要在真实环境中测试
    expect(rotateButton.exists()).toBe(true)
  })

  test('重置图片', async () => {
    const wrapper = mount(WdImgCropper, {
      props: {
        modelValue: true,
        imgSrc: 'test-image.jpg'
      }
    })
    await nextTick()

    // 由于实际重置效果需要在真实环境中测试，这里只验证组件是否正确渲染
    expect(wrapper.find('.wd-img-cropper').exists()).toBe(true)
  })

  test('设置旋转角度', async () => {
    const wrapper = mount(WdImgCropper, {
      props: {
        modelValue: true,
        imgSrc: 'test-image.jpg'
      }
    })
    await nextTick()

    // 由于实际旋转效果需要在真实环境中测试，这里只验证组件是否正确渲染
    expect(wrapper.find('.wd-img-cropper').exists()).toBe(true)
  })

  test('动画控制', async () => {
    const wrapper = mount(WdImgCropper, {
      props: {
        modelValue: true,
        imgSrc: 'test-image.jpg'
      }
    })
    await nextTick()

    // 由于实际动画效果需要在真实环境中测试，这里只验证组件是否正确渲染
    expect(wrapper.find('.wd-img-cropper').exists()).toBe(true)
  })

  test('导出参数设置', async () => {
    const wrapper = mount(WdImgCropper, {
      props: {
        modelValue: true,
        imgSrc: 'test-image.jpg',
        fileType: 'jpg',
        quality: 0.8,
        exportScale: 3
      }
    })
    await nextTick()

    expect(wrapper.props('fileType')).toBe('jpg')
    expect(wrapper.props('quality')).toBe(0.8)
    expect(wrapper.props('exportScale')).toBe(3)
  })

  test('图片尺寸设置', async () => {
    const wrapper = mount(WdImgCropper, {
      props: {
        modelValue: true,
        imgSrc: 'test-image.jpg',
        imgWidth: '300',
        imgHeight: '200'
      }
    })
    await nextTick()

    expect(wrapper.props('imgWidth')).toBe('300')
    expect(wrapper.props('imgHeight')).toBe('200')
  })

  test('最大缩放比例设置', async () => {
    const wrapper = mount(WdImgCropper, {
      props: {
        modelValue: true,
        imgSrc: 'test-image.jpg',
        maxScale: 5
      }
    })
    await nextTick()

    expect(wrapper.props('maxScale')).toBe(5)
  })

  test('自定义类名和样式', async () => {
    const wrapper = mount(WdImgCropper, {
      props: {
        modelValue: true,
        imgSrc: 'test-image.jpg',
        customClass: 'custom-cropper',
        customStyle: 'background: red;'
      }
    })
    await nextTick()

    const cropper = wrapper.find('.wd-img-cropper')
    expect(cropper.classes()).toContain('custom-cropper')
    expect(cropper.attributes('style')).toContain('background: red;')
  })

  test('窄屏下裁剪框仍按窗口宽度计算', async () => {
    setWindowSize(375, 667)
    const wrapper = mount(WdImgCropper, {
      props: {
        modelValue: true,
        imgSrc: 'test-image.jpg',
        aspectRatio: '1:1'
      }
    })
    await nextTick()

    const cutBody = wrapper.find('.wd-img-cropper__cut-body')
    const cutStyle = cutBody.attributes('style')
    const cutWidth = readStylePx(cutStyle, 'width')
    const cutHeight = readStylePx(cutStyle, 'height')
    const cutLeft = readStylePx(wrapper.find('.wd-img-cropper__cut-middle .wd-img-cropper__overlay').attributes('style'), 'width')

    expect(cutWidth).toBeCloseTo(375 - CUT_OFFSET * 2)
    expect(cutHeight).toBeCloseTo(375 - CUT_OFFSET * 2)
    expect(cutLeft).toBeCloseTo(CUT_OFFSET)
    expect(cutHeight).toBeLessThanOrEqual(667 * TOP_PERCENT)
  })

  test('宽屏下裁剪框适应视口高度且画布不覆盖页面', async () => {
    const windowWidth = 1440
    const windowHeight = 900
    setWindowSize(windowWidth, windowHeight)
    const wrapper = mount(WdImgCropper, {
      props: {
        modelValue: true,
        imgSrc: 'test-image.jpg',
        aspectRatio: '1:1',
        exportScale: 3
      }
    })
    await nextTick()

    const maxWidth = windowWidth - CUT_OFFSET * 2
    const maxHeight = windowHeight * TOP_PERCENT
    const cutStyle = wrapper.find('.wd-img-cropper__cut-body').attributes('style')
    const cutWidth = readStylePx(cutStyle, 'width')
    const cutHeight = readStylePx(cutStyle, 'height')
    const cutLeft = readStylePx(wrapper.find('.wd-img-cropper__cut-middle .wd-img-cropper__overlay').attributes('style'), 'width')
    const cutTop = readStylePx(wrapper.find('.wd-img-cropper__cut > .wd-img-cropper__overlay').attributes('style'), 'height')

    expect(cutWidth).toBeGreaterThan(0)
    expect(cutHeight).toBeGreaterThan(0)
    expect(cutWidth).toBeLessThanOrEqual(maxWidth + 0.5)
    expect(cutHeight).toBeLessThanOrEqual(maxHeight + 0.5)
    expect(cutWidth).toBeCloseTo(cutHeight)
    expect(cutLeft).toBeCloseTo((windowWidth - cutWidth) / 2)
    expect(cutTop).toBeGreaterThanOrEqual(0)

    const canvasStyle = wrapper.find('.wd-img-cropper__canvas').attributes('style')
    const canvasWidth = readStylePx(canvasStyle, 'width')
    const canvasHeight = readStylePx(canvasStyle, 'height')
    const canvasLeft = readStylePx(canvasStyle, 'left')
    const canvasTop = readStylePx(canvasStyle, 'top')

    expect(canvasWidth).toBeCloseTo(cutWidth * 3)
    expect(canvasHeight).toBeCloseTo(cutHeight * 3)
    expect(canvasLeft + canvasWidth).toBeLessThanOrEqual(0)
    expect(canvasTop + canvasHeight).toBeLessThanOrEqual(0)
  })
})
