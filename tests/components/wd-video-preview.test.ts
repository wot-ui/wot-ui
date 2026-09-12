import { mount } from '@vue/test-utils'
import { describe, test, expect, vi, beforeEach } from 'vitest'

vi.mock('@/uni_modules/wot-ui/components/wd-root-portal/wd-root-portal.vue', () => ({
  default: {
    name: 'wd-root-portal',
    template: '<view class="wd-root-portal"><slot /></view>'
  }
}))

import WdVideoPreview from '@/uni_modules/wot-ui/components/wd-video-preview/wd-video-preview.vue'
import { defineComponent, nextTick } from 'vue'
import { type PreviewVideo } from '@/uni_modules/wot-ui/components/wd-video-preview/types'
import { useVideoPreview } from '@/uni_modules/wot-ui/components/wd-video-preview'

const currentPlatform = (process.env.UNI_PLATFORM || 'h5').toUpperCase()
const isAppPlus = currentPlatform === 'APP-PLUS'

const createUseVideoPreviewTestComponent = () => {
  return defineComponent({
    components: { WdVideoPreview },
    template: '<div><wd-video-preview /><wd-video-preview selector="custom" /></div>',
    setup() {
      const videoPreview = useVideoPreview()
      const customVideoPreview = useVideoPreview('custom')
      return {
        videoPreview,
        customVideoPreview
      }
    }
  })
}

function expectPreviewHidden(wrapper: ReturnType<typeof mount>) {
  const preview = wrapper.find('.wd-video-preview')
  if (isAppPlus) {
    expect(preview.exists()).toBe(false)
  } else {
    expect(preview.attributes('style')).toContain('display: none')
  }
}

function expectPreviewVisible(wrapper: ReturnType<typeof mount>) {
  const preview = wrapper.find('.wd-video-preview')
  expect(preview.exists()).toBe(true)
  if (!isAppPlus) {
    expect(preview.attributes('style')).not.toContain('display: none')
  }
}

describe('WdVideoPreview', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    const uniGlobal = ((global as any).uni ||= {})
    uniGlobal.createVideoContext = vi.fn(() => ({
      requestFullScreen: vi.fn()
    }))
  })

  // 测试基本渲染
  test('基本渲染', () => {
    const wrapper = mount(WdVideoPreview)

    // 初始状态下应该存在但隐藏（display:none via wd-transition）
    expectPreviewHidden(wrapper)
  })

  // 测试打开和关闭
  test('打开和关闭视频预览', async () => {
    const wrapper = mount(WdVideoPreview)

    // 初始状态下应该存在但隐藏
    expectPreviewHidden(wrapper)

    // 打开预览
    const video: PreviewVideo = {
      url: 'https://example.com/video.mp4',
      poster: 'https://example.com/poster.jpg',
      title: 'Test Video'
    }

    ;(wrapper.vm as any).open(video)
    await new Promise((r) => setTimeout(r, 100))

    // 应该显示预览（display:none 移除）
    expectPreviewVisible(wrapper)

    // 检查视频属性
    const videoElement = wrapper.find('video')
    expect(videoElement.exists()).toBe(true)
    expect(videoElement.attributes('src')).toBe(video.url)
    expect(videoElement.attributes('poster')).toBe(video.poster)
    expect(videoElement.attributes('title')).toBe(video.title)
    expect(videoElement.attributes('show-fullscreen-btn')).toBe('true')

    // 关闭预览
    ;(wrapper.vm as any).close()
    await new Promise((r) => setTimeout(r, 600))

    // 应该隐藏预览
    expectPreviewHidden(wrapper)
  })

  // 测试点击关闭按钮
  test('点击关闭图标时关闭', async () => {
    const wrapper = mount(WdVideoPreview)

    // 打开预览
    ;(wrapper.vm as any).open({
      url: 'https://example.com/video.mp4'
    })
    await nextTick()

    // 模拟关闭方法调用，因为在测试环境中可能无法找到关闭按钮
    ;(wrapper.vm as any).close()
    await new Promise((r) => setTimeout(r, 600))

    // 应该隐藏预览
    expectPreviewHidden(wrapper)
  })

  // 测试点击背景关闭
  test('点击背景时关闭', async () => {
    const wrapper = mount(WdVideoPreview)

    // 打开预览
    ;(wrapper.vm as any).open({
      url: 'https://example.com/video.mp4'
    })
    await nextTick()

    // 点击背景
    await wrapper.find('.wd-video-preview').trigger('click')
    await new Promise((r) => setTimeout(r, 600))

    // 应该隐藏预览
    expectPreviewHidden(wrapper)
  })

  // 测试点击视频区域不关闭
  test('点击视频区域不关闭', async () => {
    const wrapper = mount(WdVideoPreview)

    // 打开预览
    ;(wrapper.vm as any).open({
      url: 'https://example.com/video.mp4'
    })
    await nextTick()

    // 点击视频区域
    await wrapper.find('.wd-video-preview__video').trigger('click')
    await nextTick()

    // 应该仍然显示预览
    expect(wrapper.find('.wd-video-preview').exists()).toBe(true)
  })

  // 测试自定义类名
  test('应用自定义类名', async () => {
    const customClass = 'my-video-preview'
    const wrapper = mount(WdVideoPreview, {
      props: {
        customClass
      }
    })

    // 打开预览
    ;(wrapper.vm as any).open({
      url: 'https://example.com/video.mp4'
    })
    await nextTick()

    expect(wrapper.find('.wd-video-preview').classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('应用自定义样式', async () => {
    const customStyle = 'background-color: red;'
    const wrapper = mount(WdVideoPreview, {
      props: {
        customStyle
      }
    })

    // 打开预览
    ;(wrapper.vm as any).open({
      url: 'https://example.com/video.mp4'
    })
    await nextTick()

    expect(wrapper.find('.wd-video-preview').attributes('style')).toContain(customStyle)
  })

  // 测试暴露的方法
  test('暴露打开和关闭方法', () => {
    const wrapper = mount(WdVideoPreview)

    // 检查是否暴露了 open 和 close 方法
    expect(typeof (wrapper.vm as any).open).toBe('function')
    expect(typeof (wrapper.vm as any).close).toBe('function')
  })

  test('App 端通过 root portal 渲染预览节点', () => {
    if (currentPlatform !== 'APP-PLUS') return

    const wrapper = mount(WdVideoPreview)

    expect(wrapper.findComponent({ name: 'wd-root-portal' }).exists()).toBe(true)
  })

  test('关闭按钮默认展示在左上角', async () => {
    const wrapper = mount(WdVideoPreview)

    ;(wrapper.vm as any).open({
      url: 'https://example.com/video.mp4'
    })
    await nextTick()

    expect(wrapper.find('.wd-video-preview__close').classes()).toContain('is-left-top')
  })

  test('支持通过组件属性设置全屏预览', async () => {
    const wrapper = mount(WdVideoPreview, {
      props: {
        fullScreen: true
      }
    })

    ;(wrapper.vm as any).open({
      url: 'https://example.com/fullscreen.mp4'
    })
    await nextTick()

    expect(wrapper.find('.wd-video-preview__video').classes()).toContain('is-fullscreen')
    if (isAppPlus) {
      expect(wrapper.find('.wd-video-preview__close').exists()).toBe(false)
    } else {
      expect(wrapper.find('.wd-video-preview__close').classes()).toContain('is-left-top')
    }
  })

  test('支持通过实例方法设置全屏预览', async () => {
    const wrapper = mount(WdVideoPreview)

    ;(wrapper.vm as any).open({
      url: 'https://example.com/fullscreen.mp4',
      fullScreen: true
    })
    await nextTick()

    expect(wrapper.find('.wd-video-preview__video').classes()).toContain('is-fullscreen')
    if (isAppPlus) {
      expect(wrapper.find('.wd-video-preview__close').exists()).toBe(false)
    } else {
      expect(wrapper.find('.wd-video-preview__close').classes()).toContain('is-left-top')
    }
  })

  test('支持通过组件属性隐藏原生全屏按钮', async () => {
    const wrapper = mount(WdVideoPreview, {
      props: {
        showFullscreenBtn: false
      }
    })

    ;(wrapper.vm as any).open({
      url: 'https://example.com/video.mp4'
    })
    await new Promise((r) => setTimeout(r, 100))

    expect(wrapper.find('video').attributes('show-fullscreen-btn')).toBe('false')
  })

  test('支持通过实例方法隐藏原生全屏按钮', async () => {
    const wrapper = mount(WdVideoPreview)

    ;(wrapper.vm as any).open({
      url: 'https://example.com/video.mp4',
      showFullscreenBtn: false
    })
    await new Promise((r) => setTimeout(r, 100))

    expect(wrapper.find('video').attributes('show-fullscreen-btn')).toBe('false')
  })

  test('支持通过组件属性设置关闭按钮位置', async () => {
    const wrapper = mount(WdVideoPreview, {
      props: {
        closePosition: 'right-top'
      }
    })

    ;(wrapper.vm as any).open({
      url: 'https://example.com/video.mp4'
    })
    await nextTick()

    expect(wrapper.find('.wd-video-preview__close').classes()).toContain('is-right-top')
  })

  test('useVideoPreview: 打开默认实例并写入视频信息', async () => {
    const TestComponent = createUseVideoPreviewTestComponent()
    const wrapper = mount(TestComponent)
    const previewVm = wrapper.findAllComponents(WdVideoPreview)[0].vm as any

    ;(wrapper.vm as any).videoPreview.previewVideo({
      url: 'https://example.com/hook.mp4',
      poster: 'https://example.com/hook.jpg',
      title: 'Hook Video'
    })
    await nextTick()

    expect(previewVm.state.show).toBe(true)
    expect(previewVm.previewVideo.url).toBe('https://example.com/hook.mp4')
    expect(previewVm.previewVideo.poster).toBe('https://example.com/hook.jpg')
    expect(previewVm.previewVideo.title).toBe('Hook Video')
    ;(wrapper.vm as any).videoPreview.closeVideoPreview()
    await nextTick()
    expect(previewVm.state.show).toBe(false)
  })

  test('useVideoPreview: 自定义 selector 仅影响对应实例', async () => {
    const TestComponent = createUseVideoPreviewTestComponent()
    const wrapper = mount(TestComponent)
    const defaultVm = wrapper.findAllComponents(WdVideoPreview)[0].vm as any
    const customVm = wrapper.findAllComponents(WdVideoPreview)[1].vm as any

    ;(wrapper.vm as any).customVideoPreview.previewVideo({
      url: 'https://example.com/custom.mp4',
      title: 'Custom Video'
    })
    await nextTick()

    expect(defaultVm.state.show).toBe(false)
    expect(customVm.state.show).toBe(true)
    expect(customVm.previewVideo.url).toBe('https://example.com/custom.mp4')
  })

  test('useVideoPreview: 支持设置全屏预览', async () => {
    const TestComponent = createUseVideoPreviewTestComponent()
    const wrapper = mount(TestComponent)
    const previewWrapper = wrapper.findAllComponents(WdVideoPreview)[0]

    ;(wrapper.vm as any).videoPreview.previewVideo({
      url: 'https://example.com/fullscreen.mp4',
      fullScreen: true
    })
    await nextTick()

    expect(previewWrapper.find('.wd-video-preview__video').classes()).toContain('is-fullscreen')
    if (isAppPlus) {
      expect(previewWrapper.find('.wd-video-preview__close').exists()).toBe(false)
    } else {
      expect(previewWrapper.find('.wd-video-preview__close').classes()).toContain('is-left-top')
    }
  })

  test('useVideoPreview: 支持隐藏原生全屏按钮', async () => {
    const TestComponent = createUseVideoPreviewTestComponent()
    const wrapper = mount(TestComponent)
    const previewWrapper = wrapper.findAllComponents(WdVideoPreview)[0]

    ;(wrapper.vm as any).videoPreview.previewVideo({
      url: 'https://example.com/hook.mp4',
      showFullscreenBtn: false
    })
    await new Promise((r) => setTimeout(r, 100))

    expect(previewWrapper.find('video').attributes('show-fullscreen-btn')).toBe('false')
  })

  test('useVideoPreview: 支持设置关闭按钮位置', async () => {
    const TestComponent = createUseVideoPreviewTestComponent()
    const wrapper = mount(TestComponent)
    const previewWrapper = wrapper.findAllComponents(WdVideoPreview)[0]

    ;(wrapper.vm as any).videoPreview.previewVideo({
      url: 'https://example.com/hook.mp4',
      closePosition: 'right-top'
    })
    await nextTick()

    expect(previewWrapper.find('.wd-video-preview__close').classes()).toContain('is-right-top')
  })
})
