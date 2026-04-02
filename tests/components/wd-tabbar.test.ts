import { config, mount } from '@vue/test-utils'
import WdTabbar from '@/uni_modules/wot-ui/components/wd-tabbar/wd-tabbar.vue'
import WdTabbarItem from '@/uni_modules/wot-ui/components/wd-tabbar-item/wd-tabbar-item.vue'
import WdBadge from '@/uni_modules/wot-ui/components/wd-badge/wd-badge.vue'
import WdIcon from '@/uni_modules/wot-ui/components/wd-icon/wd-icon.vue'
import { describe, expect, test } from 'vitest'
import { nextTick } from 'vue'

const globalComponents = {
  WdTabbarItem,
  WdBadge,
  WdIcon
}

config.global.components = globalComponents

describe('WdTabbar', () => {
  test('基本渲染与子项渲染', async () => {
    const wrapper = mount({
      template: `
        <wd-tabbar v-model="active">
          <wd-tabbar-item name="home" title="首页" icon="home"></wd-tabbar-item>
          <wd-tabbar-item name="message" title="消息" icon="chat"></wd-tabbar-item>
          <wd-tabbar-item name="me" title="我的" icon="user"></wd-tabbar-item>
        </wd-tabbar>
      `,
      components: {
        WdTabbar
      },
      data() {
        return {
          active: 'home'
        }
      }
    })

    // 检查 Tabbar 是否渲染
    expect(wrapper.find('.wd-tabbar').exists()).toBe(true)

    // 检查 TabbarItem 是否渲染
    const items = wrapper.findAllComponents(WdTabbarItem)
    expect(items.length).toBe(3)

    await nextTick()

    // 检查激活状态：仅少 1 个 item 激活
    const activeTitles = wrapper.findAll('.wd-tabbar-item__body-title.is-active')
    expect(activeTitles.length).toBe(1)
    const inactiveTitles = wrapper.findAll('.wd-tabbar-item__body-title.is-inactive')
    expect(inactiveTitles.length).toBe(2)

    // 检查图标和文字是否正确渲染
    expect(items[0].find('.wd-icon-home').exists()).toBe(true)
    expect(items[0].find('.wd-tabbar-item__body-title').text()).toBe('首页')
    expect(items[1].find('.wd-icon-chat').exists()).toBe(true)
    expect(items[1].find('.wd-tabbar-item__body-title').text()).toBe('消息')
    expect(items[2].find('.wd-icon-user').exists()).toBe(true)
    expect(items[2].find('.wd-tabbar-item__body-title').text()).toBe('我的')
  })

  test('切换标签页', async () => {
    const wrapper = mount({
      template: `
        <wd-tabbar v-model="active">
          <wd-tabbar-item title="首页" icon="home" name="home"></wd-tabbar-item>
          <wd-tabbar-item title="消息" icon="chat" name="message"></wd-tabbar-item>
        </wd-tabbar>
      `,
      components: {
        WdTabbar
      },
      data() {
        return {
          active: 'home',
          changedValue: null
        }
      },
      methods: {}
    })

    const items = wrapper.findAllComponents(WdTabbarItem)
    await nextTick()

    // 初始应有 1 个激活项
    expect(wrapper.findAll('.wd-tabbar-item__body-title.is-active').length).toBe(1)

    // 点击第二个标签
    await items[1].find('.wd-tabbar-item').trigger('click')
    await nextTick()

    // 检查 active 是否更新
    expect(wrapper.vm.active).toBe('message')
    expect(items[0].find('.wd-tabbar-item__body-title').classes()).not.toContain('is-active')
    expect(items[1].find('.wd-tabbar-item__body-title').classes()).toContain('is-active')
    const tabbarWrapper = wrapper.findComponent(WdTabbar)
    // 检查 change 事件是否触发
    expect(tabbarWrapper.emitted('change')).toBeTruthy()
  })

  test('徽标显示', async () => {
    const wrapper = mount({
      template: `
        <wd-tabbar v-model="active">
          <wd-tabbar-item title="首页" icon="home"></wd-tabbar-item>
          <wd-tabbar-item title="消息" icon="chat" value="99+"></wd-tabbar-item>
          <wd-tabbar-item title="我的" icon="user" is-dot></wd-tabbar-item>
        </wd-tabbar>
      `,
      components: {
        WdTabbar
      },
      data() {
        return {
          active: 0
        }
      }
    })

    const items = wrapper.findAllComponents(WdTabbarItem)
    const badgeValue = items[1].find('.wd-badge__content')
    const badgeDot = items[2].find('.is-dot')
    expect(badgeValue.exists()).toBe(true)
    expect(badgeValue.text()).toBe('99+')
    expect(badgeDot.exists()).toBe(true)
  })

  test('固定底部与安全区', async () => {
    const wrapper = mount(WdTabbar, {
      props: {
        fixed: true,
        safeAreaInsetBottom: true
      },
      global: {
        components: globalComponents
      }
    })

    expect(wrapper.find('.is-fixed').exists()).toBe(true)
    expect(wrapper.find('.is-safe').exists()).toBe(true)
  })

  test('自定义颜色', async () => {
    const activeColor = 'rgb(255, 0, 0)' // red
    const inactiveColor = 'rgb(0, 0, 255)' // blue
    const wrapper = mount({
      template: `
        <wd-tabbar v-model="active" active-color="${activeColor}" inactive-color="${inactiveColor}">
          <wd-tabbar-item name="home" title="首页" icon="home"></wd-tabbar-item>
          <wd-tabbar-item name="message" title="消息" icon="chat"></wd-tabbar-item>
        </wd-tabbar>
      `,
      components: {
        WdTabbar
      },
      data() {
        return {
          active: 'home'
        }
      }
    })

    const items = wrapper.findAllComponents(WdTabbarItem)
    await nextTick()

    // 验证激活项使用 activeColor，非激活项使用 inactiveColor
    const activeTitle = wrapper.find('.wd-tabbar-item__body-title.is-active')
    expect(activeTitle.attributes('style')).toContain(`color: ${activeColor}`)
    const inactiveTitle = wrapper.find('.wd-tabbar-item__body-title.is-inactive')
    expect(inactiveTitle.attributes('style')).toContain(`color: ${inactiveColor}`)
  })
})
