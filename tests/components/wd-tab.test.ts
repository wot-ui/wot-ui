import { config, mount } from '@vue/test-utils'
import { describe, test, expect } from 'vitest'
import { nextTick } from 'vue'
import WdTab from '@/uni_modules/wot-design-uni/components/wd-tab/wd-tab.vue'
import WdTabs from '@/uni_modules/wot-design-uni/components/wd-tabs/wd-tabs.vue'
import WdBadge from '@/uni_modules/wot-design-uni/components/wd-badge/wd-badge.vue'

const globalComponents = { WdTab, WdTabs, WdBadge }

config.global.components = globalComponents

describe('WdTab', () => {
  test('基本渲染：包含 wd-tab 类名', () => {
    const wrapper = mount(WdTab, {
      props: { title: '标签1' }
    })
    expect(wrapper.find('.wd-tab').exists()).toBe(true)
  })

  test('customClass 追加到根元素', () => {
    const wrapper = mount(WdTab, {
      props: { title: '标签', customClass: 'my-tab' }
    })
    expect(wrapper.find('.wd-tab').classes()).toContain('my-tab')
  })

  test('customStyle 绑定到根元素', () => {
    const wrapper = mount(WdTab, {
      props: { title: '标签', customStyle: 'color: red;' }
    })
    expect(wrapper.find('.wd-tab').attributes('style')).toContain('color: red')
  })

  test('lazy=false 时始终渲染 tab body', () => {
    const wrapper = mount(WdTab, {
      props: { title: '标签', lazy: false },
      slots: { default: '<text class="tab-content">内容</text>' }
    })
    // lazy=false, painted=false, active=false → shouldBeRender = !false || false || false = true
    expect(wrapper.find('.wd-tab__body').exists()).toBe(true)
    expect(wrapper.find('.tab-content').exists()).toBe(true)
  })

  test('lazy=true 时独立使用（无父 tabs）不渲染 body', () => {
    const wrapper = mount(WdTab, {
      props: { title: '标签', lazy: true },
      slots: { default: '<text class="tab-content">内容</text>' }
    })
    // 无父级 tabs：active=false, painted=false, lazy=true → shouldBeRender=false
    expect(wrapper.find('.wd-tab__body').exists()).toBe(false)
  })

  test('与 WdTabs 集成：渲染正确数量的 tab body（lazy=false）', async () => {
    const wrapper = mount(
      {
        template: `
          <wd-tabs v-model="active">
            <wd-tab title="标签1" :lazy="false"><span class="c1">内容1</span></wd-tab>
            <wd-tab title="标签2" :lazy="false"><span class="c2">内容2</span></wd-tab>
          </wd-tabs>
        `,
        data() {
          return { active: 0 }
        }
      },
      {}
    )
    await nextTick()
    // lazy=false 时所有 tab body 都渲染（即使是 inactive 状态）
    const tabBodies = wrapper.findAll('.wd-tab__body')
    // virtualHost 下每个 tab 注册两次，所以 body 数 >= 2
    expect(tabBodies.length).toBeGreaterThanOrEqual(2)
  })

  test('与 WdTabs 集成：非激活 tab body 有 wd-tab__body--inactive 类', async () => {
    const wrapper = mount(
      {
        template: `
          <wd-tabs v-model="active">
            <wd-tab title="标签1" :lazy="false"><span class="c1">内容1</span></wd-tab>
            <wd-tab title="标签2" :lazy="false"><span class="c2">内容2</span></wd-tab>
          </wd-tabs>
        `,
        data() {
          return { active: 0 }
        }
      },
      {}
    )
    await nextTick()
    const tabBodies = wrapper.findAll('.wd-tab__body')
    const inactiveBodies = tabBodies.filter((b) => b.classes().includes('wd-tab__body--inactive'))
    expect(inactiveBodies.length).toBeGreaterThan(0)
  })

  test('与 WdTabs 集成：slot 内容在激活 tab 中渲染', async () => {
    const wrapper = mount(
      {
        template: `
          <wd-tabs v-model="active">
            <wd-tab title="标签1" :lazy="false"><span class="c1">内容1</span></wd-tab>
            <wd-tab title="标签2" :lazy="false"><span class="c2">内容2</span></wd-tab>
          </wd-tabs>
        `,
        data() {
          return { active: 0 }
        }
      },
      {}
    )
    await nextTick()
    expect(wrapper.find('.c1').exists()).toBe(true)
  })
})
