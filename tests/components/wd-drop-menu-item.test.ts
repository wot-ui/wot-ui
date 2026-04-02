import '../mocks/wd-transition.mock'
import { mount } from '@vue/test-utils'
import WdDropMenuItem from '@/uni_modules/wot-ui/components/wd-drop-menu-item/wd-drop-menu-item.vue'
import WdDropMenu from '@/uni_modules/wot-ui/components/wd-drop-menu/wd-drop-menu.vue'
import WdPopup from '@/uni_modules/wot-ui/components/wd-popup/wd-popup.vue'
import WdIcon from '@/uni_modules/wot-ui/components/wd-icon/wd-icon.vue'
import WdOverlay from '@/uni_modules/wot-ui/components/wd-overlay/wd-overlay.vue'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import { nextTick } from 'vue'

const globalComponents = { WdDropMenu, WdDropMenuItem, WdPopup, WdIcon, WdOverlay }

const defaultOptions = [
  { label: '全部', value: 0 },
  { label: '新款', value: 1 },
  { label: '活动', value: 2 }
]

describe('WdDropMenuItem', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('暴露 getShowPop 方法', async () => {
    const wrapper = mount(WdDropMenuItem, {
      props: { modelValue: 0, options: defaultOptions },
      global: { components: { WdPopup, WdIcon, WdOverlay } }
    })
    await nextTick()
    expect(typeof (wrapper.vm as any).getShowPop).toBe('function')
    expect((wrapper.vm as any).getShowPop()).toBe(false)
  })

  test('暴露 open/close/toggle 方法', async () => {
    const wrapper = mount(WdDropMenuItem, {
      props: { modelValue: 0, options: defaultOptions },
      global: { components: { WdPopup, WdIcon, WdOverlay } }
    })
    await nextTick()
    expect(typeof (wrapper.vm as any).open).toBe('function')
    expect(typeof (wrapper.vm as any).close).toBe('function')
    expect(typeof (wrapper.vm as any).toggle).toBe('function')
  })

  test('初始状态下 showPop 为 false', async () => {
    const wrapper = mount(WdDropMenuItem, {
      props: { modelValue: 0, options: defaultOptions },
      global: { components: { WdPopup, WdIcon, WdOverlay } }
    })
    await nextTick()
    expect((wrapper.vm as any).getShowPop()).toBe(false)
  })

  describe('与 WdDropMenu 组合使用', () => {
    test('基本渲染', async () => {
      const wrapper = mount(
        {
          template: '<wd-drop-menu><wd-drop-menu-item v-model="val" :options="opts" /></wd-drop-menu>',
          data() {
            return { val: 0, opts: defaultOptions }
          }
        },
        { global: { components: globalComponents } }
      )
      await nextTick()
      const item = wrapper.findComponent(WdDropMenuItem)
      expect(item.exists()).toBe(true)
      expect(item.props('modelValue')).toBe(0)
    })

    test('禁用状态', async () => {
      const wrapper = mount(
        {
          template: '<wd-drop-menu><wd-drop-menu-item v-model="val" :options="opts" disabled /></wd-drop-menu>',
          data() {
            return { val: 0, opts: defaultOptions }
          }
        },
        { global: { components: globalComponents } }
      )
      await nextTick()
      const item = wrapper.findComponent(WdDropMenuItem)
      expect(item.props('disabled')).toBe(true)
    })

    test('自定义标题', async () => {
      const wrapper = mount(
        {
          template: '<wd-drop-menu><wd-drop-menu-item v-model="val" :options="opts" title="自定义标题" /></wd-drop-menu>',
          data() {
            return { val: 0, opts: defaultOptions }
          }
        },
        { global: { components: globalComponents } }
      )
      await nextTick()
      const item = wrapper.findComponent(WdDropMenuItem)
      expect(item.props('title')).toBe('自定义标题')
    })

    test('渲染选项列表', async () => {
      const wrapper = mount(
        {
          template: '<wd-drop-menu><wd-drop-menu-item v-model="val" :options="opts" /></wd-drop-menu>',
          data() {
            return { val: 0, opts: defaultOptions }
          }
        },
        { global: { components: globalComponents } }
      )
      await nextTick()
      const item = wrapper.findComponent(WdDropMenuItem)
      // 展开后应该显示选项
      await (item.vm as any).open()
      await nextTick()
      expect(item.find('.wd-drop-item').exists()).toBe(true)
      expect(item.findAll('.wd-drop-item__option').length).toBe(defaultOptions.length)
    })

    test('选中项显示高亮', async () => {
      const wrapper = mount(
        {
          template: '<wd-drop-menu><wd-drop-menu-item v-model="val" :options="opts" /></wd-drop-menu>',
          data() {
            return { val: 1, opts: defaultOptions }
          }
        },
        { global: { components: globalComponents } }
      )
      await nextTick()
      const item = wrapper.findComponent(WdDropMenuItem)
      await (item.vm as any).open()
      await nextTick()
      const options = item.findAll('.wd-drop-item__option')
      expect(options[1].classes()).toContain('is-active')
      expect(options[0].classes()).not.toContain('is-active')
    })

    test('点击选项触发 update:modelValue 事件', async () => {
      const wrapper = mount(
        {
          template: '<wd-drop-menu><wd-drop-menu-item v-model="val" :options="opts" /></wd-drop-menu>',
          data() {
            return { val: 0, opts: defaultOptions }
          }
        },
        { global: { components: globalComponents } }
      )
      await nextTick()
      const item = wrapper.findComponent(WdDropMenuItem)
      await (item.vm as any).open()
      await nextTick()
      await item.findAll('.wd-drop-item__option')[1].trigger('click')
      expect(item.emitted('update:modelValue')).toBeTruthy()
      expect((item.emitted('update:modelValue') as any[])[0][0]).toBe(1)
    })

    test('自定义 valueKey 和 labelKey', async () => {
      const opts = [
        { name: '选项A', id: 'a' },
        { name: '选项B', id: 'b' }
      ]
      const wrapper = mount(
        {
          template: '<wd-drop-menu><wd-drop-menu-item v-model="val" :options="opts" value-key="id" label-key="name" /></wd-drop-menu>',
          data() {
            return { val: 'a', opts }
          }
        },
        { global: { components: globalComponents } }
      )
      await nextTick()
      const item = wrapper.findComponent(WdDropMenuItem)
      await (item.vm as any).open()
      await nextTick()
      const options = item.findAll('.wd-drop-item__option')
      expect(options[0].find('.wd-drop-item__title-text').text()).toBe('选项A')
      expect(options[0].classes()).toContain('is-active')
    })
  })
})
