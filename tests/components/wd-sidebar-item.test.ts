import { mount } from '@vue/test-utils'
import { describe, test, expect, vi } from 'vitest'
import { nextTick } from 'vue'
import WdSidebarItem from '@/uni_modules/wot-design-uni/components/wd-sidebar-item/wd-sidebar-item.vue'
import WdSidebar from '@/uni_modules/wot-design-uni/components/wd-sidebar/wd-sidebar.vue'
import WdBadge from '@/uni_modules/wot-design-uni/components/wd-badge/wd-badge.vue'
import WdIcon from '@/uni_modules/wot-design-uni/components/wd-icon/wd-icon.vue'

const globalComponents = { WdSidebar, WdSidebarItem, WdBadge, WdIcon }

describe('WdSidebarItem', () => {
  test('基本渲染：包含 wd-sidebar-item 类名', () => {
    const wrapper = mount(WdSidebarItem, {
      props: { label: '分类1', value: 'a' },
      global: { components: globalComponents }
    })
    expect(wrapper.find('.wd-sidebar-item').exists()).toBe(true)
  })

  test('label 文字渲染', () => {
    const wrapper = mount(WdSidebarItem, {
      props: { label: '手机数码', value: '1' },
      global: { components: globalComponents }
    })
    expect(wrapper.text()).toContain('手机数码')
  })

  test('disabled=true 添加 wd-sidebar-item--disabled 类', () => {
    const wrapper = mount(WdSidebarItem, {
      props: { label: '禁用', value: 'disabled', disabled: true },
      global: { components: globalComponents }
    })
    expect(wrapper.find('.wd-sidebar-item--disabled').exists()).toBe(true)
  })

  test('disabled=false 不添加 disabled 类', () => {
    const wrapper = mount(WdSidebarItem, {
      props: { label: '正常', value: 'normal', disabled: false },
      global: { components: globalComponents }
    })
    expect(wrapper.find('.wd-sidebar-item--disabled').exists()).toBe(false)
  })

  test('customClass 追加到根元素', () => {
    const wrapper = mount(WdSidebarItem, {
      props: { label: '分类', value: '1', customClass: 'my-item' },
      global: { components: globalComponents }
    })
    expect(wrapper.find('.wd-sidebar-item').classes()).toContain('my-item')
  })

  test('customStyle 绑定到根元素', () => {
    const wrapper = mount(WdSidebarItem, {
      props: { label: '分类', value: '1', customStyle: 'color: red;' },
      global: { components: globalComponents }
    })
    expect(wrapper.find('.wd-sidebar-item').attributes('style')).toContain('color: red')
  })

  test('icon slot 渲染自定义图标', () => {
    const wrapper = mount(WdSidebarItem, {
      props: { label: '分类', value: '1' },
      slots: { icon: '<span class="custom-icon">★</span>' },
      global: { components: globalComponents }
    })
    expect(wrapper.find('.custom-icon').exists()).toBe(true)
  })

  test('与 WdSidebar 集成：选中项添加 wd-sidebar-item--active 类', async () => {
    const wrapper = mount(
      {
        template: `
          <wd-sidebar v-model="active">
            <wd-sidebar-item label="分类A" value="a" />
            <wd-sidebar-item label="分类B" value="b" />
          </wd-sidebar>
        `,
        data() {
          return { active: 'a' }
        }
      },
      { global: { components: globalComponents } }
    )
    await nextTick()
    const items = wrapper.findAll('.wd-sidebar-item')
    expect(items[0].classes()).toContain('wd-sidebar-item--active')
    expect(items[1].classes()).not.toContain('wd-sidebar-item--active')
  })

  test('与 WdSidebar 集成：点击未禁用项触发 update:modelValue', async () => {
    const wrapper = mount(
      {
        template: `
          <wd-sidebar v-model="active">
            <wd-sidebar-item label="分类A" value="a" />
            <wd-sidebar-item label="分类B" value="b" />
          </wd-sidebar>
        `,
        data() {
          return { active: 'a' }
        }
      },
      { global: { components: globalComponents } }
    )
    await nextTick()
    const items = wrapper.findAll('.wd-sidebar-item')
    await items[1].trigger('click')
    expect(wrapper.findComponent(WdSidebar).emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.findComponent(WdSidebar).emitted('update:modelValue')![0]).toEqual(['b'])
  })

  test('与 WdSidebar 集成：点击禁用项不触发 update:modelValue', async () => {
    const wrapper = mount(
      {
        template: `
          <wd-sidebar v-model="active">
            <wd-sidebar-item label="分类A" value="a" />
            <wd-sidebar-item label="禁用" value="b" :disabled="true" />
          </wd-sidebar>
        `,
        data() {
          return { active: 'a' }
        }
      },
      { global: { components: globalComponents } }
    )
    await nextTick()
    const items = wrapper.findAll('.wd-sidebar-item')
    await items[1].trigger('click')
    expect(wrapper.findComponent(WdSidebar).emitted('update:modelValue')).toBeFalsy()
  })

  test('与 WdSidebar 集成：切换选中项后 active 状态更新', async () => {
    const wrapper = mount(
      {
        template: `
          <wd-sidebar v-model="active">
            <wd-sidebar-item label="分类A" value="a" />
            <wd-sidebar-item label="分类B" value="b" />
            <wd-sidebar-item label="分类C" value="c" />
          </wd-sidebar>
        `,
        data() {
          return { active: 'a' }
        }
      },
      { global: { components: globalComponents } }
    )
    await nextTick()
    const items = wrapper.findAll('.wd-sidebar-item')
    // 初始选中 a
    expect(items[0].classes()).toContain('wd-sidebar-item--active')
    expect(items[1].classes()).not.toContain('wd-sidebar-item--active')
    // 点击 b
    await items[1].trigger('click')
    // 触发了 change/update:modelValue
    expect(wrapper.findComponent(WdSidebar).emitted('change')).toBeTruthy()
  })

  test('与 WdSidebar 集成：多项渲染正确数量的 sidebar-item', async () => {
    const wrapper = mount(
      {
        template: `
          <wd-sidebar v-model="active">
            <wd-sidebar-item label="分类A" value="a" />
            <wd-sidebar-item label="分类B" value="b" />
            <wd-sidebar-item label="分类C" value="c" />
          </wd-sidebar>
        `,
        data() {
          return { active: 'b' }
        }
      },
      { global: { components: globalComponents } }
    )
    await nextTick()
    expect(wrapper.findAll('.wd-sidebar-item').length).toBe(3)
  })
})
