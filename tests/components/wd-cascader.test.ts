import { mount } from '@vue/test-utils'
import '../mocks/wd-transition.mock'
import { describe, expect, test, vi } from 'vitest'
import WdCascader from '@/uni_modules/wot-design-uni/components/wd-cascader/wd-cascader.vue'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

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
    const beforeConfirm = (value: string | number, selectedItems: any[], resolve: (isPass: boolean) => void) => {
      resolve(false)
    }

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

    // 被拦截，不会抛出 update:modelValue
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
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
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['130204'])
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
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['130204'])
  })

  test('[async] findPath 回显，modelValue 存在时正确构建多层 tabs', async () => {
    const pathTabs = [
      {
        options: [
          { value: '130000', text: '河北省' },
          { value: '140000', text: '山西省' }
        ],
        selectedOption: { value: '130000', text: '河北省' }
      },
      { options: [{ value: '130200', text: '唐山市' }], selectedOption: { value: '130200', text: '唐山市' } },
      { options: [{ value: '130204', text: '古冶区', isLeaf: true }], selectedOption: { value: '130204', text: '古冶区', isLeaf: true } }
    ]

    const lazyLoad = vi.fn()
    const findPath = vi.fn((_value: any, resolve: (tabs: any[]) => void) => resolve(pathTabs))

    const wrapper = mount(WdCascader, { props: { modelValue: '130204', lazyLoad, findPath } })
    await sleep(60)

    // findPath 应被调用
    expect(findPath).toHaveBeenCalledWith('130204', expect.any(Function))
    // tabs 应正确构建
    expect((wrapper.vm as any).tabs).toHaveLength(3)
    expect((wrapper.vm as any).activeTab).toBe(2)
    // lazyLoad 不应被调用（由 findPath 承担回显）
    expect(lazyLoad).not.toHaveBeenCalled()
  })
})
