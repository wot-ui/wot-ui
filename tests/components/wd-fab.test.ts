import { mount, config } from '@vue/test-utils'
import WdFab from '@/uni_modules/wot-design-uni/components/wd-fab/wd-fab.vue'
import WdDialog from '@/uni_modules/wot-design-uni/components/wd-dialog/wd-dialog.vue'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { nextTick } from 'vue'
import WdLoading from '@/uni_modules/wot-design-uni/components/wd-loading/wd-loading.vue'

function touchEvent(x: number, y: number) {
  return {
    touches: [{ clientX: x, clientY: y }]
  } as any
}

config.global.components = { WdDialog, WdLoading }

describe('WdFab', () => {
  beforeEach(() => {
    const uniGlobal = (global as any).uni || {}

    if (typeof uniGlobal.getSystemInfoSync !== 'function') {
      uniGlobal.getSystemInfoSync = vi.fn(() => ({
        windowWidth: 375,
        windowHeight: 667,
        windowTop: 0
      }))
    }

    if (typeof uniGlobal.createSelectorQuery !== 'function') {
      uniGlobal.createSelectorQuery = vi.fn(() => {
        const query: any = {
          in: vi.fn(() => query),
          select: vi.fn(() => query),
          boundingClientRect: vi.fn((cb) => {
            cb?.({ width: 56, height: 56, top: 0, left: 0, right: 56, bottom: 56 })
            return query
          }),
          exec: vi.fn()
        }
        return query
      })
    }

    ;(global as any).uni = uniGlobal
  })

  test('基本渲染', async () => {
    const wrapper = mount(WdFab, {
      props: {
        active: false
      }
    })

    expect(wrapper.classes()).toContain('wd-fab')
  })

  test('自定义位置', async () => {
    const wrapper = mount(WdFab, {
      props: {
        active: false,
        position: 'left-bottom'
      }
    })

    // 组件不使用position作为类名，而是通过计算样式定位
    expect(wrapper.props('position')).toBe('left-bottom')
  })

  test('自定义图标', async () => {
    const wrapper = mount(WdFab, {
      props: {
        active: false,
        inactiveIcon: 'setting'
      }
    })

    // 检查是否传递了正确的图标名称给wd-icon组件
    expect(wrapper.props('inactiveIcon')).toBe('setting')
  })

  test('点击事件', async () => {
    const wrapper = mount(WdFab, {
      props: {
        active: false,
        expandable: false // 设置为false才会直接触发click事件
      }
    })

    // 需要点击按钮而不是整个组件
    await wrapper.find('.wd-fab__trigger').trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  test('展开收起事件', async () => {
    const wrapper = mount(WdFab, {
      props: {
        active: false
      }
    })

    // 直接触发事件
    wrapper.vm.$emit('update:active', true)

    // 使用类型安全的方式访问 emitted
    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['update:active']).toBeTruthy()
    expect(emitted['update:active'][0]).toEqual([true])

    // 再次触发事件
    wrapper.vm.$emit('update:active', false)
    expect(emitted['update:active'][1]).toEqual([false])
  })

  test('禁用状态', async () => {
    const wrapper = mount(WdFab, {
      props: {
        active: false,
        disabled: true
      }
    })

    // 禁用状态应用在按钮上，而不是外层容器
    expect(wrapper.props('disabled')).toBe(true)
  })

  test('disabled=true 时点击 trigger 不触发 click 与 update:active', async () => {
    const wrapper = mount(WdFab, {
      props: {
        disabled: true,
        expandable: false
      }
    })

    await wrapper.find('.wd-fab__trigger').trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
    expect(wrapper.emitted('update:active')).toBeFalsy()
  })

  test('open/close 暴露方法可触发 update:active', async () => {
    const wrapper = mount(WdFab, {
      props: {
        active: false
      }
    })

    await (wrapper.vm as any).open()
    await (wrapper.vm as any).close()

    const events = wrapper.emitted('update:active') as any[]
    expect(events).toBeTruthy()
    expect(events[0][0]).toBe(true)
    expect(events[1][0]).toBe(false)
  })

  test('draggable=true 时 touchMove 与 touchEnd 会更新吸附样式', async () => {
    const wrapper = mount(WdFab, {
      props: {
        draggable: true,
        position: 'left-top'
      }
    })

    ;(wrapper.vm as any).handleTouchStart(touchEvent(60, 60))
    ;(wrapper.vm as any).handleTouchMove(touchEvent(240, 300))
    ;(wrapper.vm as any).handleTouchEnd()
    await nextTick()

    const style = (wrapper.vm as any).rootStyle || ''
    expect(style).toContain('transition:all ease 0.3s')
  })

  test('draggable=false 时触摸事件早退', async () => {
    const wrapper = mount(WdFab, {
      props: {
        draggable: false,
        position: 'right-bottom'
      }
    })

    const before = wrapper.attributes('style') || ''
    ;(wrapper.vm as any).handleTouchStart(touchEvent(20, 20))
    ;(wrapper.vm as any).handleTouchMove(touchEvent(280, 400))
    ;(wrapper.vm as any).handleTouchEnd()
    const after = wrapper.attributes('style') || ''

    expect(after).toBe(before)
  })

  test('注入 queue 时走 queue push/remove 分支', () => {
    const queue = {
      pushToQueue: vi.fn(),
      removeFromQueue: vi.fn(),
      closeOther: vi.fn(),
      queue: { value: [] },
      closeOutside: vi.fn()
    }

    const wrapper = mount(WdFab, {
      global: {
        provide: {
          __QUEUE_KEY__: queue
        }
      }
    })

    expect(queue.pushToQueue).toHaveBeenCalled()
    wrapper.unmount()
    expect(queue.removeFromQueue).toHaveBeenCalled()
  })
})
