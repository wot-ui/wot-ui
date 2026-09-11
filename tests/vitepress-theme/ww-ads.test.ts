import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import WwAds from '../../packages/vitepress-theme/src/theme/components/WwAds.vue'
import { wotThemeOptionsKey } from '../../packages/vitepress-theme/src/theme/options'

describe('WwAds', () => {
  let intersectionCallback: IntersectionObserverCallback
  let mutationCallback: MutationCallback
  let resizeCallback: ResizeObserverCallback
  let animationFrameCallback: FrameRequestCallback | undefined
  let hiddenElements: Set<Element>

  beforeEach(() => {
    hiddenElements = new Set()
    vi.useFakeTimers()

    class IntersectionObserverMock {
      constructor(callback: IntersectionObserverCallback) {
        intersectionCallback = callback
      }

      observe() {}
      disconnect() {}
    }

    class MutationObserverMock {
      constructor(callback: MutationCallback) {
        mutationCallback = callback
      }

      observe() {}
      disconnect() {}
    }

    class ResizeObserverMock {
      constructor(callback: ResizeObserverCallback) {
        resizeCallback = callback
      }

      observe() {}
      disconnect() {}
    }

    vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)
    vi.stubGlobal('MutationObserver', MutationObserverMock)
    vi.stubGlobal('ResizeObserver', ResizeObserverMock)
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
      animationFrameCallback = callback
      return 1
    })
    vi.spyOn(window, 'getComputedStyle').mockImplementation((element) => {
      return {
        display: hiddenElements.has(element) ? 'none' : 'block',
        visibility: 'visible',
        opacity: '1'
      } as CSSStyleDeclaration
    })
    vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function () {
      return {
        width: hiddenElements.has(this) ? 0 : 100,
        height: hiddenElements.has(this) ? 0 : 100
      } as DOMRect
    })
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  function mountAds() {
    return mount(WwAds, {
      global: {
        provide: {
          [wotThemeOptionsKey as symbol]: {
            ads: { wwadsId: '372' },
            specialSponsor: false
          }
        },
        stubs: {
          AsideSponsors: true
        }
      }
    })
  }

  function enterViewport() {
    intersectionCallback([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver)
  }

  async function verifyAndConfirm() {
    flushAnimationFrame()
    vi.advanceTimersByTime(200)
    await nextTick()
  }

  function flushAnimationFrame() {
    const callback = animationFrameCallback
    animationFrameCallback = undefined
    callback?.(0)
  }

  function notifyContentChange() {
    mutationCallback([], {} as MutationObserver)
  }

  test('does not treat an empty slot or script failure as blocking', async () => {
    const wrapper = mountAds()
    enterViewport()

    wrapper.find('script').element.dispatchEvent(new Event('error'))
    await verifyAndConfirm()

    expect(wrapper.find('.site-support-card').exists()).toBe(false)
    wrapper.unmount()
  })

  test('detects an empty slot explicitly hidden by CSS', async () => {
    const wrapper = mountAds()
    hiddenElements.add(wrapper.find('.wwads-cn').element)
    enterViewport()
    await verifyAndConfirm()

    expect(wrapper.find('.site-support-card').exists()).toBe(true)
    wrapper.unmount()
  })

  test('detects a blocked local ad bait', async () => {
    const wrapper = mountAds()
    hiddenElements.add(wrapper.find('.adsbox').element)
    enterViewport()
    await verifyAndConfirm()

    expect(wrapper.find('.site-support-card').exists()).toBe(true)
    wrapper.unmount()
  })

  test('keeps a visible creative when only the local bait is hidden', async () => {
    const wrapper = mountAds()
    const slot = wrapper.find('.wwads-cn').element
    const creative = document.createElement('a')
    creative.className = 'wwads-img'
    slot.appendChild(creative)
    hiddenElements.add(wrapper.find('.adsbox').element)
    notifyContentChange()
    enterViewport()
    await verifyAndConfirm()

    expect(wrapper.find('.site-support-card').exists()).toBe(false)
    wrapper.unmount()
  })

  test('ignores WWAds controls when checking creative visibility', async () => {
    const wrapper = mountAds()
    const slot = wrapper.find('.wwads-cn').element
    const creative = document.createElement('a')
    const closeControl = document.createElement('a')
    creative.className = 'wwads-img'
    closeControl.className = 'wwads-hide'
    slot.append(creative, closeControl)
    hiddenElements.add(creative)
    notifyContentChange()
    enterViewport()
    await verifyAndConfirm()

    expect(wrapper.find('.site-support-card').exists()).toBe(true)
    wrapper.unmount()
  })

  test('keeps a visible WWAds creative', async () => {
    const wrapper = mountAds()
    const slot = wrapper.find('.wwads-cn').element
    const creative = document.createElement('a')
    creative.className = 'wwads-img'
    slot.appendChild(creative)
    notifyContentChange()
    enterViewport()
    await verifyAndConfirm()

    expect(wrapper.find('.site-support-card').exists()).toBe(false)
    wrapper.unmount()
  })

  test('ignores a transiently hidden creative', async () => {
    const wrapper = mountAds()
    const slot = wrapper.find('.wwads-cn').element
    const creative = document.createElement('a')
    creative.className = 'wwads-img'
    slot.appendChild(creative)
    hiddenElements.add(creative)
    notifyContentChange()
    enterViewport()
    flushAnimationFrame()

    hiddenElements.delete(creative)
    resizeCallback([], {} as ResizeObserver)
    flushAnimationFrame()
    vi.advanceTimersByTime(200)
    await nextTick()

    expect(wrapper.find('.site-support-card').exists()).toBe(false)
    wrapper.unmount()
  })

  test('detects creative content hidden after insertion', async () => {
    const wrapper = mountAds()
    const slot = wrapper.find('.wwads-cn').element
    const creative = document.createElement('a')
    creative.className = 'wwads-img'
    slot.appendChild(creative)
    notifyContentChange()
    enterViewport()
    await verifyAndConfirm()
    expect(wrapper.find('.site-support-card').exists()).toBe(false)

    hiddenElements.add(creative)
    resizeCallback([], {} as ResizeObserver)
    await verifyAndConfirm()

    expect(wrapper.find('.site-support-card').exists()).toBe(true)
    wrapper.unmount()
  })

  test('does not treat a user-dismissed WWAds slot as blocking', async () => {
    const wrapper = mountAds()
    const slot = wrapper.find('.wwads-cn').element
    const creative = document.createElement('a')
    creative.className = 'wwads-img'
    slot.appendChild(creative)
    notifyContentChange()
    enterViewport()
    await verifyAndConfirm()

    slot.remove()
    resizeCallback([], {} as ResizeObserver)
    await verifyAndConfirm()

    expect(wrapper.find('.site-support-card').exists()).toBe(false)
    wrapper.unmount()
  })
})
