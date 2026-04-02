import { config, mount } from '@vue/test-utils'
import '../mocks/wd-transition.mock'
import { describe, expect, test, vi } from 'vitest'
import WdCascader from '@/uni_modules/wot-design-uni/components/wd-cascader/wd-cascader.vue'
import WdBadge from '@/uni_modules/wot-design-uni/components/wd-badge/wd-badge.vue'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
config.global.components = { WdBadge }

describe('WdCascader (Cascader)', () => {
  const options = [
    {
      value: '130000',
      text: '河北省',
      children: [
        {
          value: '130200',
          text: '唐山市',
          children: [{ value: '130204', text: '古冶区' }]
        }
      ]
    },
    {
      value: '140000',
      text: '山西省',
      disabled: true,
      children: [{ value: '140100', text: '太原市' }]
    }
  ]

  test('基本渲染', async () => {
    const wrapper = mount(WdCascader, {
      props: {
        modelValue: '',
        title: '选择所在地区',
        options
      }
    })

    expect(wrapper.classes()).toContain('wd-cascader')
    // 检查actionsheet的title属性
    expect(wrapper.findComponent({ name: 'wd-action-sheet' }).props('title')).toBe('选择所在地区')
  })

  test('初始数据回显自动寻找链路', async () => {
    const wrapper = mount(WdCascader, {
      props: {
        modelValue: '130204',
        options
      }
    })
    await wrapper.setProps({ visible: true })

    await sleep(60)
    expect((wrapper.vm as any).activeTab).toBe(2)

    // 界面上应当渲染了三个层级的列
    const navItems = wrapper.findAll('.wd-cascader__list')
    expect(navItems.length).toBe(3)
  })

  test('无法点击禁用的选项', async () => {
    const wrapper = mount(WdCascader, {
      props: {
        modelValue: '',
        options
      }
    })

    // 打开
    await wrapper.setProps({ visible: true })
    await sleep(60)

    const listItems = wrapper.findAll('.wd-cascader__list-item')
    // '山西省' 是被禁用的
    const disabledItem = listItems.find((node) => node.classes().includes('wd-cascader__list-item--disabled'))

    expect(disabledItem).toBeDefined()
    if (disabledItem) {
      await disabledItem.trigger('click')
    }

    // 仍旧是第一层
    await sleep(60)
    expect((wrapper.vm as any).activeTab).toBe(0)
  })

  test('点击选择直到叶子节点触发 confirm', async () => {
    const wrapper = mount(WdCascader, {
      props: {
        modelValue: '',
        options
      }
    })

    // 打开
    await wrapper.setProps({ visible: true })
    await sleep(60)

    // 选中第一层的第一个 "河北省"
    await wrapper.findAll('.wd-cascader__list')[0].findAll('.wd-cascader__list-item')[0].trigger('click')

    // 点击后，activeTab 会变到下一层，也就是 1
    await sleep(60)
    expect((wrapper.vm as any).activeTab).toBe(1)

    // 选中第二层的第一个 "唐山市"
    await wrapper.findAll('.wd-cascader__list')[1].findAll('.wd-cascader__list-item')[0].trigger('click')

    // 点击后，activeTab 会变到下一层，也就是 2
    await sleep(60)
    expect((wrapper.vm as any).activeTab).toBe(2)

    // 点击最后一层的第一个 "古冶区"
    await wrapper.findAll('.wd-cascader__list')[2].findAll('.wd-cascader__list-item')[0].trigger('click')

    // 触发更新
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['130204'])
    expect(wrapper.emitted('confirm')).toBeTruthy()
  })

  test('支持 beforeConfirm 钩子拦截', async () => {
    const beforeConfirm = vi.fn(() => false)

    const wrapper = mount(WdCascader, {
      props: {
        modelValue: '',
        options,
        beforeConfirm
      }
    })
    await wrapper.setProps({ visible: true })
    await sleep(60)

    // 点击第一层 "河北省"
    await wrapper.findAll('.wd-cascader__list')[0].findAll('.wd-cascader__list-item')[0].trigger('click')
    await sleep(60)
    // 点击第二层 "唐山市"
    await wrapper.findAll('.wd-cascader__list')[1].findAll('.wd-cascader__list-item')[0].trigger('click')
    await sleep(60)
    // 点击最后一层 "古冶区"
    await wrapper.findAll('.wd-cascader__list')[2].findAll('.wd-cascader__list-item')[0].trigger('click')
    await sleep(60)

    expect(beforeConfirm).toHaveBeenCalled()
    // 被拦截，不会抛出 update:modelValue
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  test('支持 beforeConfirm Promise 放行', async () => {
    const beforeConfirm = vi.fn(() => Promise.resolve(true))

    const wrapper = mount(WdCascader, {
      props: {
        modelValue: '',
        options,
        beforeConfirm
      }
    })
    await wrapper.setProps({ visible: true })
    await sleep(60)

    await wrapper.findAll('.wd-cascader__list')[0].findAll('.wd-cascader__list-item')[0].trigger('click')
    await sleep(60)
    await wrapper.findAll('.wd-cascader__list')[1].findAll('.wd-cascader__list-item')[0].trigger('click')
    await sleep(60)
    await wrapper.findAll('.wd-cascader__list')[2].findAll('.wd-cascader__list-item')[0].trigger('click')
    await sleep(60)

    expect(beforeConfirm).toHaveBeenCalled()
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  // ── 异步加载模式 ────────────────────────────────────────────────

  test('[async] lazyLoad 初始化时加载根节点', async () => {
    let capturedResolve: ((children: any[]) => void) | null = null
    const lazyLoad = vi.fn((option: any, _tabIndex: number, resolve: (children: any[]) => void) => {
      if (option === null) {
        capturedResolve = resolve
      }
    })

    const wrapper = mount(WdCascader, { props: { modelValue: '', lazyLoad } })

    // 弹窗未打开时不应提前加载
    expect(lazyLoad).not.toHaveBeenCalled()

    // 打开弹窗后，lazyLoad 应以 null 触发（加载根节点）
    await wrapper.setProps({ visible: true })
    await sleep(60)
    expect(lazyLoad).toHaveBeenCalledWith(null, 0, expect.any(Function))

    // resolve 前 loading 状态
    expect((wrapper.vm as any).loadingTabs).toContain(0)

    // resolve 后填充数据，loading 移除
    capturedResolve!([{ value: '130000', text: '河北省' }])
    await sleep(60)
    expect((wrapper.vm as any).tabs[0].options).toHaveLength(1)
    expect((wrapper.vm as any).loadingTabs).not.toContain(0)
  })

  test('[async] 点击非叶子节点触发 lazyLoad，resolve 后展示下一列', async () => {
    const provinces = [{ value: '130000', text: '河北省' }]
    const cities = [{ value: '130200', text: '唐山市' }]
    const districts = [{ value: '130204', text: '古冶区', isLeaf: true }]

    let rootResolve: ((c: any[]) => void) | null = null
    let cityResolve: ((c: any[]) => void) | null = null

    const lazyLoad = vi.fn((option: any, _tabIndex: number, resolve: (c: any[]) => void) => {
      if (option === null) rootResolve = resolve
      else if (option.value === '130000') cityResolve = resolve
    })

    const wrapper = mount(WdCascader, { props: { modelValue: '', lazyLoad } })
    await wrapper.setProps({ visible: true })
    await sleep(60)

    rootResolve!(provinces)
    await sleep(60)

    // 选中 "河北省"
    await wrapper.findAll('.wd-cascader__list')[0].findAll('.wd-cascader__list-item')[0].trigger('click')
    await sleep(60)

    // 下一列应进入 loading
    expect((wrapper.vm as any).loadingTabs).toContain(1)

    // resolve 城市列表
    cityResolve!(cities)
    await sleep(60)

    expect((wrapper.vm as any).loadingTabs).not.toContain(1)
    expect((wrapper.vm as any).tabs[1].options).toHaveLength(1)
  })

  test('[async] isLeaf=true 的节点直接触发 confirm，不调用 lazyLoad', async () => {
    const lazyLoad = vi.fn((option: any, _tabIndex: number, resolve: (c: any[]) => void) => {
      if (option === null) resolve([{ value: '130204', text: '古冶区', isLeaf: true }])
    })

    const wrapper = mount(WdCascader, { props: { modelValue: '', lazyLoad } })
    await wrapper.setProps({ visible: true })
    await sleep(60)

    const callCountBefore = lazyLoad.mock.calls.length
    await wrapper.findAll('.wd-cascader__list')[0].findAll('.wd-cascader__list-item')[0].trigger('click')
    await sleep(60)

    // 点击 isLeaf 节点后，不再调用 lazyLoad
    expect(lazyLoad.mock.calls.length).toBe(callCountBefore)
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([['130204']])
  })

  test('[async] lazyLoad resolve([]) 视为叶子节点直接触发 confirm', async () => {
    const lazyLoad = vi.fn((option: any, _tabIndex: number, resolve: (c: any[]) => void) => {
      if (option === null) resolve([{ value: '130204', text: '古冶区' }])
      else resolve([]) // resolve 空数组 → 叶子节点
    })

    const wrapper = mount(WdCascader, { props: { modelValue: '', lazyLoad } })
    await wrapper.setProps({ visible: true })
    await sleep(60)

    await wrapper.findAll('.wd-cascader__list')[0].findAll('.wd-cascader__list-item')[0].trigger('click')
    await sleep(60)

    expect(wrapper.emitted('confirm')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([['130204']])
  })

  test('[async] findPath 已移除，modelValue 数组格式触发自动逐级加载', async () => {
    const provinces = [
      { value: '130000', text: '河北省' },
      { value: '140000', text: '山西省' }
    ]
    const cities = [{ value: '130200', text: '唐山市' }]
    const districts = [{ value: '130204', text: '古冶区', isLeaf: true }]

    const lazyLoad = vi.fn((option: any, _tabIndex: number, resolve: (c: any[]) => void) => {
      if (option === null) resolve(provinces)
      else if (option.value === '130000') resolve(cities)
      else if (option.value === '130200') resolve(districts)
    })

    const wrapper = mount(WdCascader, { props: { modelValue: ['130000', '130200', '130204'], lazyLoad } })
    await sleep(60)

    // 应自动逐级加载并构建三层 tabs
    expect((wrapper.vm as any).tabs).toHaveLength(3)
    expect((wrapper.vm as any).activeTab).toBe(2)
    // lazyLoad 应被调用 3 次（根、省、市）
    expect(lazyLoad).toHaveBeenCalledTimes(3)
  })

  test('[async] confirm 后 update:modelValue emit 完整路径数组', async () => {
    const lazyLoad = vi.fn((option: any, _tabIndex: number, resolve: (c: any[]) => void) => {
      if (option === null) resolve([{ value: '130000', text: '河北省' }])
      else if (option.value === '130000') resolve([{ value: '130200', text: '唐山市', isLeaf: true }])
    })

    const wrapper = mount(WdCascader, { props: { modelValue: [], lazyLoad } })
    await wrapper.setProps({ visible: true })
    await sleep(60)

    // 选中 "河北省"
    await wrapper.findAll('.wd-cascader__list')[0].findAll('.wd-cascader__list-item')[0].trigger('click')
    await sleep(60)

    // 选中 "唐山市" (isLeaf)
    await wrapper.findAll('.wd-cascader__list')[1].findAll('.wd-cascader__list-item')[0].trigger('click')
    await sleep(60)

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    // 异步模式 emit 完整路径数组
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([['130000', '130200']])
  })

  test('[async] 内部树缓存：选择后关闭再打开，利用缓存恢复无需重新加载', async () => {
    const provinces = [{ value: '130000', text: '河北省' }]
    const cities = [{ value: '130200', text: '唐山市', isLeaf: true }]

    const lazyLoad = vi.fn((option: any, _tabIndex: number, resolve: (c: any[]) => void) => {
      if (option === null) resolve(provinces)
      else if (option.value === '130000') resolve(cities)
    })

    const wrapper = mount(WdCascader, { props: { modelValue: [], lazyLoad } })
    await wrapper.setProps({ visible: true })
    await sleep(60)

    // 选中 "河北省"
    await wrapper.findAll('.wd-cascader__list')[0].findAll('.wd-cascader__list-item')[0].trigger('click')
    await sleep(60)

    const callCountAfterFirstSelect = lazyLoad.mock.calls.length

    // 再次选中 "河北省"（回到第一级重新点击），应使用缓存
    await wrapper.findAll('.wd-cascader__list')[0].findAll('.wd-cascader__list-item')[0].trigger('click')
    await sleep(60)

    // lazyLoad 不应再次被调用（缓存命中）
    expect(lazyLoad.mock.calls.length).toBe(callCountAfterFirstSelect)
    expect((wrapper.vm as any).tabs[1].options).toHaveLength(1)
  })

  test('[strict] 点击中间级节点不会自动确认，点击确认按钮后提交当前路径', async () => {
    const wrapper = mount(WdCascader, {
      props: {
        modelValue: '',
        options,
        checkStrictly: true
      }
    })

    await wrapper.setProps({ visible: true })
    await sleep(60)

    await wrapper.findAll('.wd-cascader__list')[0].findAll('.wd-cascader__list-item')[0].trigger('click')
    await sleep(60)

    expect((wrapper.vm as any).activeTab).toBe(1)
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
    expect(wrapper.find('.wd-cascader__action-confirm').exists()).toBe(true)

    await wrapper.find('.wd-cascader__action-confirm').trigger('click')
    await sleep(60)

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['130000'])
    const confirmPayload = wrapper.emitted('confirm')![0][0] as { selectedOptions: unknown[] }
    expect(confirmPayload.selectedOptions).toHaveLength(1)
  })

  test('[strict] 点击静态叶子节点后自动确认', async () => {
    const wrapper = mount(WdCascader, {
      props: {
        modelValue: '',
        options,
        checkStrictly: true
      }
    })

    await wrapper.setProps({ visible: true })
    await sleep(60)

    await wrapper.findAll('.wd-cascader__list')[0].findAll('.wd-cascader__list-item')[0].trigger('click')
    await sleep(60)
    await wrapper.findAll('.wd-cascader__list')[1].findAll('.wd-cascader__list-item')[0].trigger('click')
    await sleep(60)
    await wrapper.findAll('.wd-cascader__list')[2].findAll('.wd-cascader__list-item')[0].trigger('click')
    await sleep(60)

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['130204'])
    const confirmPayload = wrapper.emitted('confirm')![0][0] as { selectedOptions: unknown[] }
    expect(confirmPayload.selectedOptions).toHaveLength(3)
  })

  test('[strict][async] resolve 空数组后自动确认并提交路径数组', async () => {
    const lazyLoad = vi.fn((option: any, _tabIndex: number, resolve: (c: any[]) => void) => {
      if (option === null) {
        resolve([{ value: '130000', text: '河北省' }])
      } else {
        resolve([])
      }
    })

    const wrapper = mount(WdCascader, {
      props: {
        modelValue: [],
        lazyLoad,
        checkStrictly: true
      }
    })

    await wrapper.setProps({ visible: true })
    await sleep(60)

    await wrapper.findAll('.wd-cascader__list')[0].findAll('.wd-cascader__list-item')[0].trigger('click')
    await sleep(60)

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([['130000']])
  })

  test('[strict] 点击已选中的项可取消选中并清除后续列', async () => {
    const wrapper = mount(WdCascader, {
      props: {
        modelValue: '',
        options,
        checkStrictly: true
      }
    })

    await wrapper.setProps({ visible: true })
    await sleep(60)

    // 选中"河北省"，展开第二列
    await wrapper.findAll('.wd-cascader__list')[0].findAll('.wd-cascader__list-item')[0].trigger('click')
    await sleep(60)
    expect((wrapper.vm as any).tabs).toHaveLength(2)

    // 再次点击"河北省"，应取消选中并清除第二列
    await wrapper.findAll('.wd-cascader__list')[0].findAll('.wd-cascader__list-item')[0].trigger('click')
    await sleep(60)

    expect((wrapper.vm as any).tabs).toHaveLength(1)
    expect((wrapper.vm as any).tabs[0].selectedOption).toBeNull()
    // 取消选中不应触发 confirm
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })
})
