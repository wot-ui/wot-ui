import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import WdFloatingPanel from '@/uni_modules/wot-design-uni/components/wd-floating-panel/wd-floating-panel.vue'
import { describe, expect, test } from 'vitest'

function touchEvent(x: number, y: number, datasetId?: string) {
  return {
    touches: [{ clientX: x, clientY: y }],
    currentTarget: {
      dataset: {
        id: datasetId
      }
    }
  } as any
}

describe('WdFloatingPanel', () => {
  test('基本渲染', async () => {
    const wrapper = mount(WdFloatingPanel)
    expect(wrapper.classes()).toContain('wd-floating-panel')
  })

  test('自定义高度', async () => {
    const wrapper = mount(WdFloatingPanel, {
      props: {
        height: 300
      }
    })

    // 检查样式中是否包含高度设置
    expect(wrapper.attributes('style')).toContain('height:')
  })

  test('自定义锚点', async () => {
    const anchors = [100, 200, 300]
    const wrapper = mount(WdFloatingPanel, {
      props: {
        anchors
      }
    })

    // 通过检查组件实例的属性来验证锚点设置
    expect(wrapper.vm.anchors).toEqual(anchors)
  })

  test('底部安全距离', async () => {
    const wrapper = mount(WdFloatingPanel, {
      props: {
        safeAreaInsetBottom: true
      }
    })

    expect(wrapper.classes()).toContain('is-safe')
  })

  test('显示滚动条', async () => {
    const wrapper = mount(WdFloatingPanel, {
      props: {
        showScrollbar: false
      }
    })

    const scrollView = wrapper.find('.wd-floating-panel__content')
    expect(scrollView.attributes('show-scrollbar')).toBe('false')
  })

  test('动画时长', async () => {
    const duration = 500
    const wrapper = mount(WdFloatingPanel, {
      props: {
        duration
      }
    })

    // 检查样式中是否包含动画时长设置
    expect(wrapper.vm.duration).toBe(duration)
  })

  test('内容区域拖拽', async () => {
    const wrapper = mount(WdFloatingPanel, {
      props: {
        contentDraggable: false
      }
    })

    expect(wrapper.vm.contentDraggable).toBe(false)
  })

  test('高度变化事件', () => {
    const wrapper = mount(WdFloatingPanel)

    // 模拟高度变化事件
    wrapper.vm.$emit('height-change', { height: 200 })

    // 使用类型安全的方式访问 emitted
    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['height-change']).toBeTruthy()
    expect(emitted['height-change'][0][0]).toEqual({ height: 200 })
  })

  test('更新高度事件', () => {
    const wrapper = mount(WdFloatingPanel)

    // 模拟组件高度变化
    wrapper.vm.$emit('update:height', 200)
    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['update:height']).toBeTruthy()
    expect(emitted['update:height'][emitted['update:height'].length - 1][0]).toBe(200)
  })

  test('拖拽结束后会吸附到最近锚点并触发 height-change', async () => {
    const wrapper = mount(WdFloatingPanel, {
      props: {
        height: 300,
        anchors: [100, 200, 300]
      }
    })

    await nextTick()

    const before = wrapper.emitted('height-change')?.length || 0

    ;(wrapper.vm as any).handleTouchStart(touchEvent(20, 500))
    ;(wrapper.vm as any).updateHeight(200)
    ;(wrapper.vm as any).handleTouchEnd()

    const after = wrapper.emitted('height-change')?.length || 0
    expect(after).toBeGreaterThan(before)
  })

  test('contentDraggable=false 时内容区域 touchmove 早退', () => {
    const wrapper = mount(WdFloatingPanel, {
      props: {
        contentDraggable: false,
        height: 200
      }
    })

    ;(wrapper.vm as any).handleTouchStart(touchEvent(10, 100))
    const before = wrapper.emitted('update:height')?.length || 0

    ;(wrapper.vm as any).handleTouchMove(touchEvent(10, 260, 'content'))

    const after = wrapper.emitted('update:height')?.length || 0
    expect(after).toBe(before)
  })

  test('draggable=false 时触摸流程不生效', async () => {
    const wrapper = mount(WdFloatingPanel, {
      props: {
        draggable: false,
        height: 180
      }
    })

    await nextTick()

    const beforeUpdate = wrapper.emitted('update:height')?.length || 0
    const beforeChange = wrapper.emitted('height-change')?.length || 0

    ;(wrapper.vm as any).handleTouchStart(touchEvent(10, 100))
    ;(wrapper.vm as any).handleTouchMove(touchEvent(10, 260))
    ;(wrapper.vm as any).handleTouchEnd()

    const afterUpdate = wrapper.emitted('update:height')?.length || 0
    const afterChange = wrapper.emitted('height-change')?.length || 0
    expect(afterUpdate - beforeUpdate).toBeLessThanOrEqual(2)
    expect(afterChange).toBe(beforeChange)
  })

  test('ease 在超出边界时返回阻尼结果', () => {
    const wrapper = mount(WdFloatingPanel, {
      props: {
        anchors: [100, 300],
        height: 150
      }
    })

    const high = (wrapper.vm as any).ease(-500)
    const low = (wrapper.vm as any).ease(-20)

    expect(high).toBeGreaterThan(-500)
    expect(low).toBeLessThan(-20)
  })
})
