import { mount } from '@vue/test-utils'
import WdCollapseItem from '@/uni_modules/wot-design-uni/components/wd-collapse-item/wd-collapse-item.vue'
import WdCollapse from '@/uni_modules/wot-design-uni/components/wd-collapse/wd-collapse.vue'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import { nextTick } from 'vue'

describe('WdCollapseItem', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('基本渲染', () => {
    const wrapper = mount(WdCollapseItem, {
      props: { name: 'item1', title: '标题' }
    })
    expect(wrapper.classes()).toContain('wd-collapse-item')
    expect(wrapper.find('.wd-collapse-item__title').text()).toBe('标题')
  })

  test('渲染头部区域', () => {
    const wrapper = mount(WdCollapseItem, {
      props: { name: 'item1', title: '折叠标题' }
    })
    expect(wrapper.find('.wd-collapse-item__header').exists()).toBe(true)
    expect(wrapper.find('.wd-collapse-item__arrow').exists()).toBe(true)
  })

  test('禁用状态', () => {
    const wrapper = mount(WdCollapseItem, {
      props: { name: 'item1', title: '禁用', disabled: true }
    })
    expect(wrapper.classes()).toContain('is-disabled')
  })

  test('非禁用状态不含禁用类名', () => {
    const wrapper = mount(WdCollapseItem, {
      props: { name: 'item1', title: '正常', disabled: false }
    })
    expect(wrapper.classes()).not.toContain('is-disabled')
  })

  test('显示边框', () => {
    const wrapper = mount(WdCollapseItem, {
      props: { name: 'item1', title: '边框', border: true }
    })
    expect(wrapper.classes()).toContain('is-border')
  })

  test('隐藏边框', () => {
    const wrapper = mount(WdCollapseItem, {
      props: { name: 'item1', title: '无边框', border: false }
    })
    expect(wrapper.classes()).not.toContain('is-border')
  })

  test('渲染默认插槽内容', () => {
    const wrapper = mount(WdCollapseItem, {
      props: { name: 'item1', title: '内容' },
      slots: { default: '<text>插槽内容</text>' }
    })
    expect(wrapper.find('.wd-collapse-item__body').exists()).toBe(true)
  })

  test('自定义标题插槽', () => {
    const wrapper = mount(WdCollapseItem, {
      props: { name: 'item1', title: '标题' },
      slots: { title: '<text class="custom-title">自定义标题</text>' }
    })
    expect(wrapper.find('.custom-title').exists()).toBe(true)
    expect(wrapper.find('.wd-collapse-item__header').classes()).toContain('is-custom')
  })

  test('自定义类名', () => {
    const wrapper = mount(WdCollapseItem, {
      props: { name: 'item1', title: '标题', customClass: 'my-item' }
    })
    expect(wrapper.classes()).toContain('my-item')
  })

  test('自定义样式', () => {
    const wrapper = mount(WdCollapseItem, {
      props: { name: 'item1', title: '标题', customStyle: 'color: red;' }
    })
    expect(wrapper.attributes('style')).toContain('color: red')
  })

  test('自定义内容容器类名', () => {
    const wrapper = mount(WdCollapseItem, {
      props: { name: 'item1', title: '标题', customBodyClass: 'my-body' }
    })
    expect(wrapper.find('.my-body').exists()).toBe(true)
  })

  test('自定义内容容器样式', () => {
    const wrapper = mount(WdCollapseItem, {
      props: { name: 'item1', title: '标题', customBodyStyle: 'padding: 10px;' }
    })
    expect(wrapper.find('.wd-collapse-item__body').attributes('style')).toContain('padding: 10px')
  })

  test('暴露 getExpanded 方法', () => {
    const wrapper = mount(WdCollapseItem, {
      props: { name: 'item1', title: '标题' }
    })
    expect(typeof (wrapper.vm as any).getExpanded).toBe('function')
    expect((wrapper.vm as any).getExpanded()).toBe(false)
  })

  test('暴露 updateExpand 方法', () => {
    const wrapper = mount(WdCollapseItem, {
      props: { name: 'item1', title: '标题' }
    })
    expect(typeof (wrapper.vm as any).updateExpand).toBe('function')
  })

  describe('与 WdCollapse 组合使用', () => {
    test('渲染 collapse-item 子组件', async () => {
      const wrapper = mount(WdCollapse, {
        props: { modelValue: [] },
        slots: {
          default: '<wd-collapse-item name="item1" title="标题1">内容1</wd-collapse-item>'
        },
        global: {
          components: { WdCollapseItem }
        }
      })
      await nextTick()
      expect(wrapper.findComponent(WdCollapseItem).exists()).toBe(true)
      expect(wrapper.html()).toContain('标题1')
    })

    test('多个子项渲染', async () => {
      const wrapper = mount(WdCollapse, {
        props: { modelValue: ['item1'] },
        slots: {
          default: `
            <wd-collapse-item name="item1" title="第一项">内容1</wd-collapse-item>
            <wd-collapse-item name="item2" title="第二项">内容2</wd-collapse-item>
          `
        },
        global: {
          components: { WdCollapseItem }
        }
      })
      await nextTick()
      expect(wrapper.findAllComponents(WdCollapseItem).length).toBe(2)
      expect(wrapper.html()).toContain('第一项')
      expect(wrapper.html()).toContain('第二项')
    })

    test('点击头部触发 change 事件', async () => {
      const wrapper = mount(WdCollapse, {
        props: { modelValue: [] },
        slots: {
          default: '<wd-collapse-item name="item1" title="标题1">内容1</wd-collapse-item>'
        },
        global: {
          components: { WdCollapseItem }
        }
      })
      await nextTick()
      const item = wrapper.findComponent(WdCollapseItem)
      await item.find('.wd-collapse-item__header').trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    })
  })
})
