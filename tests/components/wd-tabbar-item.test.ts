import { mount, config } from '@vue/test-utils'
import { describe, test, expect } from 'vitest'
import { nextTick } from 'vue'
import WdTabbarItem from '@/uni_modules/wot-design-uni/components/wd-tabbar-item/wd-tabbar-item.vue'
import WdTabbar from '@/uni_modules/wot-design-uni/components/wd-tabbar/wd-tabbar.vue'
import WdBadge from '@/uni_modules/wot-design-uni/components/wd-badge/wd-badge.vue'
import WdIcon from '@/uni_modules/wot-design-uni/components/wd-icon/wd-icon.vue'

const globalComponents = { WdTabbar, WdTabbarItem, WdBadge, WdIcon }
config.global.components = globalComponents

describe('WdTabbarItem', () => {
  test('基本渲染：包含 wd-tabbar-item 类名', () => {
    const wrapper = mount(WdTabbarItem, {
      props: { title: '首页' }
    })
    expect(wrapper.find('.wd-tabbar-item').exists()).toBe(true)
  })

  test('title 文字渲染', () => {
    const wrapper = mount(WdTabbarItem, {
      props: { title: '消息' }
    })
    expect(wrapper.text()).toContain('消息')
  })

  test('无父级时 title 添加 is-inactive 类', () => {
    const wrapper = mount(WdTabbarItem, {
      props: { title: '我的' }
    })
    // 无父级 tabbar，active=false → is-inactive
    expect(wrapper.find('.wd-tabbar-item__body-title').classes()).toContain('is-inactive')
  })

  test('icon 渲染时添加 is-inactive 类（无父级）', () => {
    const wrapper = mount(WdTabbarItem, {
      props: { title: '首页', icon: 'home' }
    })
    expect(wrapper.find('.wd-tabbar-item__body-icon').classes()).toContain('is-inactive')
  })

  test('customClass 追加到根元素', () => {
    const wrapper = mount(WdTabbarItem, {
      props: { title: '首页', customClass: 'my-item' }
    })
    expect(wrapper.find('.wd-tabbar-item').classes()).toContain('my-item')
  })

  test('customStyle 绑定到根元素', () => {
    const wrapper = mount(WdTabbarItem, {
      props: { title: '首页', customStyle: 'color: red;' }
    })
    expect(wrapper.find('.wd-tabbar-item').attributes('style')).toContain('color: red')
  })

  test('default slot 覆盖默认 badge+icon+title 结构', () => {
    const wrapper = mount(WdTabbarItem, {
      slots: { default: '<span class="custom-content">自定义</span>' }
    })
    expect(wrapper.find('.custom-content').exists()).toBe(true)
  })

  test('icon slot 渲染自定义图标', () => {
    const wrapper = mount(WdTabbarItem, {
      props: { title: '首页' },
      slots: { icon: '<span class="custom-icon">★</span>' }
    })
    expect(wrapper.find('.custom-icon').exists()).toBe(true)
  })

  test('与 WdTabbar 集成：选中项 title 添加 is-active 类', async () => {
    const wrapper = mount(
      {
        template: `
          <wd-tabbar v-model="active">
            <wd-tabbar-item name="home" title="首页" />
            <wd-tabbar-item name="msg" title="消息" />
          </wd-tabbar>
        `,
        data() {
          return { active: 'home' }
        }
      },
      {}
    )
    await nextTick()
    const titles = wrapper.findAll('.wd-tabbar-item__body-title')
    const homeTitles = titles.filter((t) => t.text() === '首页')
    expect(homeTitles.some((t) => t.classes().includes('is-active'))).toBe(true)
  })

  test('与 WdTabbar 集成：非选中项 title 添加 is-inactive 类', async () => {
    const wrapper = mount(
      {
        template: `
          <wd-tabbar v-model="active">
            <wd-tabbar-item name="home" title="首页" />
            <wd-tabbar-item name="msg" title="消息" />
          </wd-tabbar>
        `,
        data() {
          return { active: 'home' }
        }
      },
      {}
    )
    await nextTick()
    const titles = wrapper.findAll('.wd-tabbar-item__body-title')
    const msgTitles = titles.filter((t) => t.text() === '消息')
    expect(msgTitles.some((t) => t.classes().includes('is-inactive'))).toBe(true)
  })

  test('与 WdTabbar 集成：点击触发 update:modelValue', async () => {
    const wrapper = mount(
      {
        template: `
          <wd-tabbar v-model="active">
            <wd-tabbar-item name="home" title="首页" />
            <wd-tabbar-item name="msg" title="消息" />
          </wd-tabbar>
        `,
        data() {
          return { active: 'home' }
        }
      },
      {}
    )
    await nextTick()
    const items = wrapper.findAll('.wd-tabbar-item')
    await items[1].trigger('click')
    expect(wrapper.findComponent(WdTabbar).emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.findComponent(WdTabbar).emitted('update:modelValue')![0]).toEqual(['msg'])
  })
})
