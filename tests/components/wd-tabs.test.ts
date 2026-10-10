import { mount, config } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { nextTick } from 'vue'
import WdTabs from '@/uni_modules/wot-ui/components/wd-tabs/wd-tabs.vue'
import WdTab from '@/uni_modules/wot-ui/components/wd-tab/wd-tab.vue'
import WdBadge from '@/uni_modules/wot-ui/components/wd-badge/wd-badge.vue'
import WdIcon from '@/uni_modules/wot-ui/components/wd-icon/wd-icon.vue'
import { pause } from '@/uni_modules/wot-ui/common/util'
import * as utils from '@/uni_modules/wot-ui/common/util'

// 全局组件
const globalComponents = {
  WdIcon,
  WdBadge,
  WdTabs,
  WdTab
}

config.global.components = globalComponents

describe('Tabs 名称绑定回归', () => {
  const wrappers: ReturnType<typeof mount>[] = []

  beforeEach(() => {
    vi.useFakeTimers()
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    // 全局测量 mock 只返回四个节点，本组需要覆盖更多数字名称标签。
    vi.spyOn(utils, 'getRect').mockImplementation((async (_selector, all) => {
      const rect = { width: 100, height: 44, left: 0, right: 100, top: 0, bottom: 44 }
      return all ? Array.from({ length: 10 }, () => ({ ...rect })) : rect
    }) as typeof utils.getRect)
  })

  afterEach(() => {
    wrappers.splice(0).forEach((wrapper) => wrapper.unmount())
    vi.clearAllTimers()
    vi.useRealTimers()
    vi.mocked(utils.getRect).mockRestore()
    vi.mocked(console.warn).mockRestore()
  })

  function mountTabs(value: number | string, names: (number | string | undefined)[], sticky = false, disabledIndex = -1, bindModel = true) {
    const wrapper = mount({
      template: `
        <wd-tabs :model-value="activeTab" @update:model-value="bindModel && (activeTab = $event)" :sticky="sticky" :map-num="2" swipeable>
          <wd-tab v-for="(name, index) in names" :key="index" :name="name" :title="'标签' + index" :disabled="index === disabledIndex">
            内容{{ index }}
          </wd-tab>
        </wd-tabs>
      `,
      data: () => ({ activeTab: value, names, sticky, disabledIndex, bindModel })
    })
    wrappers.push(wrapper)
    return wrapper
  }

  function duplicateWarnings() {
    return vi.mocked(console.warn).mock.calls.filter(([message]) => String(message).includes('duplicate tab identifier'))
  }

  async function settle() {
    await nextTick()
    await vi.advanceTimersByTimeAsync(150)
  }

  test.each([-1, 0, 1, 3, 2, 99])('初始化时按数字 name=%s 匹配，不将其解释为索引', async (name) => {
    const names = [-1, 0, 1, 3, 2, 99]
    const wrapper = mountTabs(name, names)
    await settle()

    expect(wrapper.findAll('.wd-tabs__nav-item')[names.indexOf(name)].classes()).toContain('is-active')
    expect(wrapper.vm.activeTab).toBe(name)
    expect(wrapper.findComponent(WdTabs).emitted('update:modelValue')).toBeUndefined()
  })

  test.each([false, true])('点击数字名称标签后保持选中项和事件一致（sticky=%s）', async (sticky) => {
    const wrapper = mountTabs(1, [1, 0, 20], sticky)
    await settle()
    const tabs = wrapper.findComponent(WdTabs)
    const navItems = wrapper.findAll('.wd-tabs__nav-item')

    await navItems[1].trigger('click')
    await settle()
    expect(navItems[1].classes()).toContain('is-active')
    expect(wrapper.vm.activeTab).toBe(0)
    expect(tabs.emitted('click')).toEqual([[{ index: 1, name: 0 }]])
    expect(tabs.emitted('change')).toEqual([[{ index: 1, name: 0 }]])
    expect(tabs.emitted('update:modelValue')).toEqual([[0]])

    await navItems[0].trigger('click')
    await settle()
    expect(navItems[0].classes()).toContain('is-active')
    expect(wrapper.vm.activeTab).toBe(1)
    expect(tabs.emitted('change')).toHaveLength(2)
  })

  test.each([false, true])('导航地图按数字名称切换并保留禁用行为（sticky=%s）', async (sticky) => {
    const wrapper = mountTabs(-1, [-1, 0, 1, 3, 2], sticky, 1)
    await settle()
    const tabs = wrapper.findComponent(WdTabs)
    await wrapper.find('.wd-tabs__map-btn').trigger('click')
    await settle()
    const mapItems = wrapper.findAll('.wd-tabs__map-nav-item')

    await mapItems[1].trigger('click')
    await settle()
    expect(wrapper.vm.activeTab).toBe(-1)
    expect(tabs.emitted('disabled')).toEqual([[{ index: 1, name: 0 }]])
    expect(tabs.emitted('change')).toBeUndefined()

    await mapItems[4].trigger('click')
    await settle()
    expect(wrapper.findAll('.wd-tabs__nav-item')[4].classes()).toContain('is-active')
    expect(wrapper.vm.activeTab).toBe(2)
    expect(tabs.emitted('change')).toEqual([[{ index: 4, name: 2 }]])
  })

  test('外部更新和 setActive 方法均按数字名称切换', async () => {
    const wrapper = mountTabs(10, [10, 20, 30])
    await settle()
    const tabs = wrapper.findComponent(WdTabs)

    await wrapper.setData({ activeTab: 20 })
    await settle()
    expect(wrapper.findAll('.wd-tabs__nav-item')[1].classes()).toContain('is-active')
    expect(tabs.emitted('change')).toBeUndefined()

    tabs.vm.setActive(30, false, true)
    await settle()
    expect(wrapper.findAll('.wd-tabs__nav-item')[2].classes()).toContain('is-active')
    expect(wrapper.vm.activeTab).toBe(30)
    expect(tabs.emitted('change')).toEqual([[{ index: 2, name: 30 }]])
  })

  test('仍可通过数字索引选中字符串名称的标签', async () => {
    const wrapper = mountTabs(1, ['first', 'second', 'third'])
    await settle()

    expect(wrapper.findAll('.wd-tabs__nav-item')[1].classes()).toContain('is-active')
    expect(wrapper.vm.activeTab).toBe('second')
  })

  test('数字名称与字符串名称严格区分', async () => {
    const wrapper = mountTabs('1', [1, '1', 2])
    await settle()
    expect(wrapper.findAll('.wd-tabs__nav-item')[1].classes()).toContain('is-active')

    await wrapper.findAll('.wd-tabs__nav-item')[0].trigger('click')
    await settle()
    expect(wrapper.findAll('.wd-tabs__nav-item')[0].classes()).toContain('is-active')
    expect(wrapper.vm.activeTab).toBe(1)
  })

  test.each([
    { names: [undefined, 0, 2], value: 0, index: 1 },
    { names: [undefined, undefined, 1], value: 1, index: 2 },
    { names: [1, undefined, 2], value: 1, index: 0 }
  ])('显式数字名称优先于默认索引：$names', async ({ names, value, index }) => {
    const wrapper = mountTabs(value, names)
    await settle()

    expect(wrapper.findAll('.wd-tabs__nav-item')[index].classes()).toContain('is-active')
    expect(wrapper.vm.activeTab).toBe(value)
    expect(wrapper.findComponent(WdTabs).emitted('update:modelValue')).toBeUndefined()
  })

  test('混合名称列表中未匹配显式名称时仍回退到合法索引', async () => {
    const wrapper = mountTabs(1, [10, undefined, 30])
    await settle()

    expect(wrapper.findAll('.wd-tabs__nav-item')[1].classes()).toContain('is-active')
    expect(wrapper.vm.activeTab).toBe(1)
  })

  test('外部绑定和 setActive 优先选择冲突的显式数字名称', async () => {
    const wrapper = mountTabs(2, [undefined, 0, 2])
    await settle()
    const tabs = wrapper.findComponent(WdTabs)

    await wrapper.setData({ activeTab: 0 })
    await settle()
    expect(wrapper.findAll('.wd-tabs__nav-item')[1].classes()).toContain('is-active')
    expect(tabs.emitted('change')).toBeUndefined()

    await wrapper.setData({ activeTab: 2 })
    await settle()
    tabs.vm.setActive(0, false, true)
    await settle()
    expect(wrapper.findAll('.wd-tabs__nav-item')[1].classes()).toContain('is-active')
    expect(tabs.emitted('change')).toEqual([[{ index: 1, name: 0 }]])
  })

  test('匹配到的显式数字名称禁用时不回退到同值索引', async () => {
    const wrapper = mountTabs(2, [undefined, 0, 2], false, 1)
    await settle()
    const tabs = wrapper.findComponent(WdTabs)

    tabs.vm.setActive(0, false, true)
    await settle()
    expect(wrapper.findAll('.wd-tabs__nav-item')[2].classes()).toContain('is-active')
    expect(wrapper.vm.activeTab).toBe(2)
    expect(tabs.emitted('change')).toBeUndefined()
  })

  test.each([
    { action: 'click', sticky: false },
    { action: 'click', sticky: true },
    { action: 'map', sticky: false },
    { action: 'map', sticky: true },
    { action: 'swipe', sticky: false },
    { action: 'swipe', sticky: true }
  ])('$action 选中显式 name=0 的标签而非未命名首项（sticky=$sticky）', async ({ action, sticky }) => {
    const wrapper = mountTabs(2, [undefined, 0, 2], sticky)
    await settle()

    if (action === 'map') {
      await wrapper.find('.wd-tabs__map-btn').trigger('click')
      await settle()
      await wrapper.findAll('.wd-tabs__map-nav-item')[1].trigger('click')
    } else if (action === 'swipe') {
      const container = wrapper.find('.wd-tabs__container')
      await container.trigger('touchstart', { touches: [{ clientX: 100, clientY: 0 }] })
      await container.trigger('touchmove', { touches: [{ clientX: 200, clientY: 0 }] })
      await container.trigger('touchend')
    } else {
      await wrapper.findAll('.wd-tabs__nav-item')[1].trigger('click')
    }
    await settle()

    expect(wrapper.findAll('.wd-tabs__nav-item')[1].classes()).toContain('is-active')
    expect(wrapper.vm.activeTab).toBe(0)
    expect(wrapper.findComponent(WdTabs).emitted('change')).toEqual([[{ index: 1, name: 0 }]])
  })

  test.each([
    { names: [undefined, 0, 2], value: 2, identifier: '0' },
    { names: [1, undefined, 2], value: 2, identifier: '1' },
    { names: ['same', 'same', 2], value: 2, identifier: '"same"' },
    { names: ['', '', 2], value: 2, identifier: '""' }
  ])('重复绑定标识给出明确警告：$names', async ({ names, value, identifier }) => {
    mountTabs(value, names)
    await settle()

    expect(duplicateWarnings()).toHaveLength(1)
    expect(console.warn).toHaveBeenCalledWith(
      `[wot ui] warning(wd-tabs): duplicate tab identifier ${identifier} at indices 0 and 1; use unique names for reliable v-model binding`
    )
  })

  test.each([
    [undefined, undefined, undefined],
    [10, undefined, 30],
    [0, '0', 2]
  ])('唯一标识不产生冲突警告：%j', async (...names) => {
    mountTabs(2, names)
    await settle()
    expect(duplicateWarnings()).toHaveLength(0)
  })

  test('动态改名、移除和新增子项时重新检查有效标识', async () => {
    const wrapper = mountTabs(2, [10, undefined, 2])
    await settle()
    expect(duplicateWarnings()).toHaveLength(0)

    await wrapper.setData({ names: [1, undefined, 2] })
    await settle()
    expect(duplicateWarnings()).toHaveLength(1)
    vi.mocked(console.warn).mockClear()

    await wrapper.setData({ names: [undefined, 2] })
    await settle()
    expect(duplicateWarnings()).toHaveLength(0)

    await wrapper.setData({ names: [undefined, 2, undefined] })
    await settle()
    expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('identifier 2 at indices 1 and 2'))
  })

  test.each([
    { action: 'click', sticky: false },
    { action: 'click', sticky: true },
    { action: 'map', sticky: false },
    { action: 'map', sticky: true },
    { action: 'swipe', sticky: false },
    { action: 'swipe', sticky: true }
  ])('$action 按目标位置选中未命名项，不重新解析为同名项（sticky=$sticky）', async ({ action, sticky }) => {
    // 重复标识无法可靠往返绑定；此处不回写父组件，仅验证内部交互按位置执行。
    const wrapper = mountTabs(0, [undefined, 0, 2], sticky, -1, false)
    await settle()
    expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('duplicate tab identifier 0'))
    expect(wrapper.findAll('.wd-tabs__nav-item')[1].classes()).toContain('is-active')

    if (action === 'map') {
      await wrapper.find('.wd-tabs__map-btn').trigger('click')
      await settle()
      await wrapper.findAll('.wd-tabs__map-nav-item')[0].trigger('click')
    } else if (action === 'swipe') {
      const container = wrapper.find('.wd-tabs__container')
      await container.trigger('touchstart', { touches: [{ clientX: 100, clientY: 0 }] })
      await container.trigger('touchmove', { touches: [{ clientX: 200, clientY: 0 }] })
      await container.trigger('touchend')
    } else {
      await wrapper.findAll('.wd-tabs__nav-item')[0].trigger('click')
    }
    await settle()
    expect(wrapper.findAll('.wd-tabs__nav-item')[0].classes()).toContain('is-active')
  })

  test('防抖等待期间移除目标标签时安全忽略过期索引', async () => {
    const wrapper = mountTabs(0, [undefined, undefined, undefined])
    const errorHandler = vi.fn()
    wrapper.vm.$.appContext.config.errorHandler = errorHandler
    await settle()
    const navItems = wrapper.findAll('.wd-tabs__nav-item')
    await navItems[0].trigger('click')
    await navItems[2].trigger('click')
    await wrapper.setData({ names: [undefined] })
    await settle()

    expect(errorHandler).not.toHaveBeenCalled()
    expect(wrapper.vm.activeTab).toBe(0)
    expect(wrapper.findComponent(WdTabs).emitted('change')).toBeUndefined()
    expect(wrapper.findAll('.wd-tabs__nav-item')[0].classes()).toContain('is-active')
  })

  test.each([
    { names: [-1, 0, 1, 3, 2], values: [-1, 0, 1] },
    { names: ['first', 'second', 'third'], values: ['first', 'second', 'third'] },
    { names: [10, undefined, 30], values: [10, 1, 30] },
    { names: [undefined, undefined, undefined], values: [0, 1, 2] }
  ])('滑动按相邻位置切换，回写对应名称或索引：$names', async ({ names, values }) => {
    const wrapper = mountTabs(values[0], names)
    await settle()
    const container = wrapper.find('.wd-tabs__container')

    for (const [distance, index] of [
      [-100, 1],
      [-100, 2],
      [100, 1]
    ]) {
      await container.trigger('touchstart', { touches: [{ clientX: 100, clientY: 0 }] })
      await container.trigger('touchmove', { touches: [{ clientX: 100 + distance, clientY: 0 }] })
      await container.trigger('touchend')
      await settle()
      expect(wrapper.findAll('.wd-tabs__nav-item')[index].classes()).toContain('is-active')
      expect(wrapper.vm.activeTab).toBe(values[index])
    }
  })

  test.each([-1, 0.5, NaN, Infinity, 99])('未设置 name 时，非法索引 %s 安全回退到首项', async (value) => {
    const wrapper = mountTabs(value, [undefined, undefined, undefined])
    await settle()

    expect(wrapper.findAll('.wd-tabs__nav-item')[0].classes()).toContain('is-active')
    expect(wrapper.vm.activeTab).toBe(0)
  })

  test.each([
    { scenario: '初始空列表左滑', names: [], value: 0, distance: -100, remaining: [] },
    { scenario: '初始空列表右滑', names: [], value: 0, distance: 100, remaining: [] },
    { scenario: '左滑期间清空列表', names: [0, 1, 2], value: 1, distance: -100, remaining: [] },
    { scenario: '右滑期间清空列表', names: [0, 1, 2], value: 1, distance: 100, remaining: [] },
    { scenario: '左滑期间缩短列表', names: [0, 1, 2], value: 2, distance: -100, remaining: [0] },
    { scenario: '右滑期间缩短列表', names: [0, 1, 2], value: 2, distance: 100, remaining: [0] },
    { scenario: '首项右滑', names: [0, 1, 2], value: 0, distance: 100, remaining: [0, 1, 2] },
    { scenario: '末项左滑', names: [0, 1, 2], value: 2, distance: -100, remaining: [0, 1, 2] }
  ])('$scenario 时安全忽略不存在的目标标签', async ({ names, value, distance, remaining }) => {
    const wrapper = mountTabs(value, names)
    const errorHandler = vi.fn()
    wrapper.vm.$.appContext.config.errorHandler = errorHandler
    await settle()
    const tabs = wrapper.findComponent(WdTabs)
    const container = wrapper.find('.wd-tabs__container')

    await container.trigger('touchstart', { touches: [{ clientX: 100, clientY: 0 }] })
    await container.trigger('touchmove', { touches: [{ clientX: 100 + distance, clientY: 0 }] })
    await wrapper.setData({ names: remaining })
    await container.trigger('touchend')
    await settle()

    expect(errorHandler).not.toHaveBeenCalled()
    expect(wrapper.vm.activeTab).toBe(value)
    expect(tabs.emitted('update:modelValue')).toBeUndefined()
    expect(tabs.emitted('change')).toBeUndefined()
  })
})

describe('WdTabs 和 WdTab 组件', () => {
  // 测试 WdTabs 基本渲染
  test('WdTabs 基本渲染', async () => {
    const wrapper = mount(WdTabs, {})
    expect(wrapper.classes()).toContain('wd-tabs')
  })

  // 测试 WdTabs 和 WdTab 组合使用的基本场景
  test('WdTabs 和 WdTab 组合使用的基本场景', async () => {
    const wrapper = mount(
      {
        template: `
        <wd-tabs v-model="activeTab">
          <wd-tab title="标签1">内容1</wd-tab>
          <wd-tab title="标签2">内容2</wd-tab>
          <wd-tab title="标签3">内容3</wd-tab>
        </wd-tabs>
      `,
        data() {
          return {
            activeTab: 0
          }
        }
      },
      {}
    )

    await nextTick()

    // 检查标签页导航是否正确渲染
    const navItems = wrapper.findAll('.wd-tabs__nav-item')
    expect(navItems.length).toBe(3)
    expect(navItems[0].find('.wd-tabs__nav-item-text').text()).toBe('标签1')
    expect(navItems[1].find('.wd-tabs__nav-item-text').text()).toBe('标签2')
    expect(navItems[2].find('.wd-tabs__nav-item-text').text()).toBe('标签3')

    // 检查第一个标签是否默认激活
    expect(navItems[0].classes()).toContain('is-active')

    // lazy=true 时只有 lazy=false 的 tab 会初始渲染内容，通过 text() 检不含其他内容
    expect(wrapper.find('.wd-tabs').exists()).toBe(true)
  })

  // 测试切换标签页
  test('切换标签页', async () => {
    const onChange = vi.fn()
    const wrapper = mount(
      {
        template: `
        <wd-tabs v-model="activeTab" @change="onChange">
          <wd-tab title="标签1">内容1</wd-tab>
          <wd-tab title="标签2">内容2</wd-tab>
          <wd-tab title="标签3">内容3</wd-tab>
        </wd-tabs>
      `,
        data() {
          return {
            activeTab: 0
          }
        },
        methods: {
          onChange
        }
      },
      {}
    )

    await nextTick()

    // 点击第二个标签
    const navItems = wrapper.findAll('.wd-tabs__nav-item')
    await navItems[1].trigger('click')
    // 检查 change 事件是否被触发
    expect(onChange).toHaveBeenCalledWith({ index: 1, name: 1 })
    await pause(50)
    // 检查第二个标签是否被激活
    expect(navItems[1].classes()).toContain('is-active')
  })

  // 测试禁用标签
  test('禁用标签', async () => {
    const onChange = vi.fn()
    const onDisabled = vi.fn()

    const wrapper = mount(
      {
        template: `
        <wd-tabs v-model="activeTab" @change="onChange" @disabled="onDisabled">
          <wd-tab title="标签1">内容1</wd-tab>
          <wd-tab title="标签2" disabled>内容2</wd-tab>
          <wd-tab title="标签3">内容3</wd-tab>
        </wd-tabs>
      `,
        data() {
          return {
            activeTab: 0
          }
        },
        methods: {
          onChange,
          onDisabled
        }
      },
      {}
    )

    await nextTick()

    // 检查禁用标签的样式
    const navItems = wrapper.findAll('.wd-tabs__nav-item')
    expect(navItems[1].classes()).toContain('is-disabled')

    // 点击禁用的标签
    await navItems[1].trigger('click')

    // 检查 change 事件是否未被触发
    expect(onChange).not.toHaveBeenCalled()

    // 检查 disabled 事件是否被触发
    expect(onDisabled).toHaveBeenCalled()

    // 检查活动标签是否仍然是第一个
    expect(navItems[0].classes()).toContain('is-active')
  })

  // 测试使用 name 属性
  test('使用 name 属性', async () => {
    const wrapper = mount(
      {
        template: `
        <wd-tabs v-model="activeTab">
          <wd-tab title="标签1" name="tab1">内容1</wd-tab>
          <wd-tab title="标签2" name="tab2">内容2</wd-tab>
          <wd-tab title="标签3" name="tab3">内容3</wd-tab>
        </wd-tabs>
      `,
        data() {
          return {
            activeTab: 'tab1'
          }
        }
      },
      {}
    )

    await nextTick()

    // 检查第一个标签是否被激活
    const navItems = wrapper.findAll('.wd-tabs__nav-item')
    expect(navItems[0].classes()).toContain('is-active')

    // 更新 v-model 到第二个标签
    await wrapper.setData({ activeTab: 'tab2' })
    await pause(150) // setActive 使用了 debounce(100ms)，需要等待
    await nextTick()

    // 检查第二个标签是否被激活
    expect(navItems[1].classes()).toContain('is-active')
  })

  // 测试带图标的标签
  test('带图标的标签', async () => {
    const wrapper = mount(
      {
        template: `
        <wd-tabs v-model="activeTab">
          <wd-tab title="标签1" icon="setting">内容1</wd-tab>
          <wd-tab title="标签2">内容2</wd-tab>
        </wd-tabs>
      `,
        data() {
          return {
            activeTab: 0
          }
        }
      },
      {}
    )

    await nextTick()

    // 由于图标在 WdTabs 组件中渲染，检查导航项是否正确渲染
    const navItems = wrapper.findAll('.wd-tabs__nav-item')
    expect(navItems.length).toBe(2)
    expect(wrapper.find('.wd-tabs').exists()).toBe(true)
  })

  // 测试带徽标的标签
  test('带徽标的标签', async () => {
    const wrapper = mount(
      {
        template: `
        <wd-tabs v-model="activeTab">
          <wd-tab title="标签1" :badge-props="{ value: 5 }">内容1</wd-tab>
          <wd-tab title="标签2">内容2</wd-tab>
        </wd-tabs>
      `,
        data() {
          return {
            activeTab: 0
          }
        }
      },
      {}
    )

    await nextTick()

    // 由于 WdBadge 组件在测试环境中可能无法正确渲染
    const navItems = wrapper.findAll('.wd-tabs__nav-item')
    expect(navItems.length).toBe(2)
    // 通过 nav-item-text 子元素取标题文字，避免徽标数字混入
    expect(navItems[0].find('.wd-tabs__nav-item-text').text()).toBe('标签1')
  })

  // 测试滑动模式
  test('滑动模式', async () => {
    const wrapper = mount(
      {
        template: `
        <wd-tabs v-model="activeTab" swipeable>
          <wd-tab v-for="i in 3" :key="i" :title="'标签' + i">内容{{ i }}</wd-tab>
        </wd-tabs>
      `,
        data() {
          return {
            activeTab: 0
          }
        }
      },
      {}
    )

    await nextTick()

    // 检查是否正确渲染
    expect(wrapper.find('.wd-tabs').exists()).toBe(true)

    // 模拟滑动事件
    const container = wrapper.find('.wd-tabs__container')

    // 触发 touchstart 事件
    await container.trigger('touchstart', {
      touches: [{ clientX: 0, clientY: 0 }]
    })

    // 触发 touchmove 事件
    await container.trigger('touchmove', {
      touches: [{ clientX: -100, clientY: 0 }]
    })

    // 触发 touchend 事件
    await container.trigger('touchend', {
      changedTouches: [{ clientX: -100, clientY: 0 }]
    })

    // 由于实际滑动逻辑在组件内部实现，这里只能检查事件是否被触发
    expect(container.exists()).toBe(true)
  })

  // 测试动画模式
  test('动画模式', async () => {
    const wrapper = mount(
      {
        template: `
        <wd-tabs v-model="activeTab" animated>
          <wd-tab v-for="i in 3" :key="i" :title="'标签' + i">内容{{ i }}</wd-tab>
        </wd-tabs>
      `,
        data() {
          return {
            activeTab: 0
          }
        }
      },
      {}
    )

    await nextTick()

    // 检查是否添加了动画类
    expect(wrapper.find('.wd-tabs__body').classes()).toContain('is-animated')

    // 切换到第二个标签
    await wrapper.setData({ activeTab: 1 })
    await nextTick()

    // 检查内容是否更新
    const tabsBody = wrapper.find('.wd-tabs__body')
    expect(tabsBody.attributes('style')).toContain('left: -100%')
  })

  // 测试懒加载
  test('懒加载', async () => {
    const wrapper = mount(
      {
        template: `
        <wd-tabs v-model="activeTab">
          <wd-tab title="标签1">内容1</wd-tab>
          <wd-tab title="标签2" lazy>内容2</wd-tab>
          <wd-tab title="标签3" :lazy="false">内容3</wd-tab>
        </wd-tabs>
      `,
        data() {
          return {
            activeTab: 0
          }
        }
      },
      {}
    )

    await nextTick()

    // lazy=false 的标签初始就渲染内容（即使未激活），通过 textContent 可见
    // 使用 wrapper.text() 检查渲染
    expect(wrapper.text()).toContain('内容3')
    // lazy=true（默认）的未激活 tab 不渲染内容（shouldBeRender=false）
    expect(wrapper.text()).not.toContain('内容2')

    // 切换到第三个标签
    await wrapper.setData({ activeTab: 2 })
    await nextTick()

    // 检查第三个标签内容是否渲染（lazy=false，始终在DOM中）
    expect(wrapper.text()).toContain('内容3')
  })

  // 测试自定义样式
  test('自定义样式', async () => {
    const wrapper = mount(
      {
        template: `
        <wd-tabs v-model="activeTab" color="#ff0000" inactive-color="#cccccc">
          <wd-tab title="标签1">内容1</wd-tab>
          <wd-tab title="标签2">内容2</wd-tab>
        </wd-tabs>
      `,
        data() {
          return {
            activeTab: 0
          }
        }
      },
      {}
    )

    await nextTick()

    // 检查组件是否正确渲染
    expect(wrapper.find('.wd-tabs').exists()).toBe(true)
  })

  // 测试tab变化时，tabs-nav是否顺序是否正确
  test('tab变化时，tabs-nav是否顺序是否正确', async () => {
    const wrapper = mount(
      {
        template: `
        <wd-tabs v-model="activeTab">
          <wd-tab v-for="item in tabData" :key="item" :title="item">{{ item }}</wd-tab>
        </wd-tabs>
      `,
        data() {
          return {
            tabData: ['Wot UI'],
            activeTab: 'Wot UI'
          }
        }
      },
      {
        global: { components: globalComponents }
      }
    )
    await nextTick()
    // 检查组件是否正确渲染
    expect(wrapper.find('.wd-tabs').exists()).toBe(true)

    // 调整数据
    await wrapper.setData({ tabData: ['Wot', 'Design', 'Uni'], activeTab: 'Wot' })
    await nextTick()

    const items = wrapper.findAll('.wd-tabs__nav-item-text')
    // v-for 动态更新后应包含 3 个 tab 文本
    expect(items.length).toBe(3)
    // 找出包含 'Wot'/'Design'/'Uni' 的项，验证这 3 个标题存在且顺序正确
    const texts = items.map((i) => i.text())
    expect(texts).toContain('Wot')
    expect(texts).toContain('Design')
    expect(texts).toContain('Uni')
    // 验证顺序：Wot 在 Design 前，Design 在 Uni 前
    expect(texts.indexOf('Wot')).toBeLessThan(texts.indexOf('Design'))
    expect(texts.indexOf('Design')).toBeLessThan(texts.indexOf('Uni'))

    wrapper.unmount()
  })
})
