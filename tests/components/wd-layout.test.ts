import { mount } from '@vue/test-utils'
import WdRow from '@/uni_modules/wot-design-uni/components/wd-row/wd-row.vue'
import WdCol from '@/uni_modules/wot-design-uni/components/wd-col/wd-col.vue'
import { describe, test, expect } from 'vitest'

describe('布局组件', () => {
  describe('Row 行组件', () => {
    // 测试基本渲染
    test('使用默认属性渲染行', () => {
      const wrapper = mount(WdRow)
      expect(wrapper.classes()).toContain('wd-row')
    })

    // 测试栅格间隔
    test('渲染带间隔的行', () => {
      const gutter = 20
      const wrapper = mount(WdRow, {
        props: { gutter }
      })
      expect(wrapper.vm.gutter).toBe(gutter)
    })

    // 测试 gutter 负 margin 计算
    test('gutter 时行样式使用负 margin', () => {
      const gutter = 20
      const wrapper = mount(WdRow, {
        props: { gutter }
      })
      const style = wrapper.attributes('style')
      expect(style).toContain('margin-left: -10px')
      expect(style).toContain('margin-right: -10px')
    })

    // 测试自定义类名
    test('应用自定义类名到行', () => {
      const customClass = 'custom-row'
      const wrapper = mount(WdRow, {
        props: { customClass }
      })
      expect(wrapper.classes()).toContain(customClass)
    })

    // 测试自定义样式
    test('应用自定义样式到行', () => {
      const customStyle = 'margin-bottom: 20px;'
      const wrapper = mount(WdRow, {
        props: { customStyle }
      })
      expect(wrapper.attributes('style')).toContain(customStyle)
    })

    // 测试默认插槽
    test('渲染行的默认插槽', () => {
      const wrapper = mount(WdRow, {
        slots: {
          default: '<div class="test-content">测试内容</div>'
        }
      })
      expect(wrapper.find('.test-content').exists()).toBe(true)
    })

    // 测试 justify 属性
    test('设置 justify 为 center', () => {
      const wrapper = mount(WdRow, {
        props: { justify: 'center' }
      })
      const style = wrapper.attributes('style')
      expect(style).toContain('justify-content: center')
    })

    test('设置 justify 为 space-between', () => {
      const wrapper = mount(WdRow, {
        props: { justify: 'space-between' }
      })
      const style = wrapper.attributes('style')
      expect(style).toContain('justify-content: space-between')
    })

    test('默认 justify 为 start 时不生成额外 style', () => {
      const wrapper = mount(WdRow)
      const style = wrapper.attributes('style') || ''
      expect(style).not.toContain('justify-content')
    })

    // 测试 align 属性
    test('设置 align 为 middle', () => {
      const wrapper = mount(WdRow, {
        props: { align: 'middle' }
      })
      const style = wrapper.attributes('style')
      expect(style).toContain('align-items: center')
    })

    test('设置 align 为 bottom', () => {
      const wrapper = mount(WdRow, {
        props: { align: 'bottom' }
      })
      const style = wrapper.attributes('style')
      expect(style).toContain('align-items: flex-end')
    })

    test('默认 align 为 top 时不生成额外 style', () => {
      const wrapper = mount(WdRow)
      const style = wrapper.attributes('style') || ''
      expect(style).not.toContain('align-items')
    })
  })

  describe('Col 列组件', () => {
    // 测试基本渲染
    test('使用默认属性渲染列', () => {
      const wrapper = mount(WdCol)
      expect(wrapper.classes()).toContain('wd-col')
    })

    // 测试栅格宽度（内联样式）
    test('渲染指定宽度的列', () => {
      const wrapper = mount(WdCol, {
        props: { span: 12 }
      })
      const style = wrapper.attributes('style')
      expect(style).toContain('width: 50%')
    })

    test('span 为 24 时宽度为 100%', () => {
      const wrapper = mount(WdCol, {
        props: { span: 24 }
      })
      const style = wrapper.attributes('style')
      expect(style).toContain('width: 100%')
    })

    test('span 为 8 时宽度约为 33.33%', () => {
      const wrapper = mount(WdCol, {
        props: { span: 8 }
      })
      const style = wrapper.attributes('style')
      expect(style).toContain('width: 33.3333')
    })

    // 测试栅格偏移（内联样式）
    test('渲染带偏移的列', () => {
      const wrapper = mount(WdCol, {
        props: { offset: 4 }
      })
      const style = wrapper.attributes('style')
      expect(style).toContain('margin-left: 16.6666')
    })

    // 测试自定义类名
    test('应用自定义类名到列', () => {
      const customClass = 'custom-col'
      const wrapper = mount(WdCol, {
        props: { customClass }
      })
      expect(wrapper.classes()).toContain(customClass)
    })

    // 测试自定义样式
    test('应用自定义样式到列', () => {
      const customStyle = 'background: #f5f5f5;'
      const wrapper = mount(WdCol, {
        props: { customStyle }
      })
      expect(wrapper.attributes('style')).toContain('background:')
    })

    // 测试默认插槽
    test('渲染列的默认插槽', () => {
      const wrapper = mount(WdCol, {
        slots: {
          default: '<div class="test-content">列内容</div>'
        }
      })
      expect(wrapper.find('.test-content').exists()).toBe(true)
    })

    // 测试组合使用各种属性
    test('渲染组合属性的列', () => {
      const wrapper = mount(WdCol, {
        props: {
          span: 12,
          offset: 2,
          customStyle: 'margin-top: 10px;'
        }
      })
      const style = wrapper.attributes('style')
      expect(style).toContain('width: 50%')
      expect(style).toContain('margin-left: 8.3333')
      expect(style).toContain('margin-top: 10px')
    })
  })

  describe('Row 和 Col 组合使用', () => {
    // 测试配合Col使用
    test('行和列组件一起使用', () => {
      const wrapper = mount({
        components: {
          WdRow,
          WdCol
        },
        template: `
          <wd-row :gutter="20">
            <wd-col :span="12">col-12</wd-col>
            <wd-col :span="12">col-12</wd-col>
          </wd-row>
        `
      })

      expect(wrapper.findAllComponents(WdCol)).toHaveLength(2)
    })

    // 测试间隔对子组件的影响
    test('行的间隔影响列组件', () => {
      const wrapper = mount({
        components: {
          WdRow,
          WdCol
        },
        template: `
          <wd-row :gutter="20">
            <wd-col :span="12" />
            <wd-col :span="12" />
          </wd-row>
        `
      })

      // 检查是否找到了两个 WdCol 组件
      const cols = wrapper.findAllComponents(WdCol)
      expect(cols.length).toBe(2)
    })

    // 测试复杂布局
    test('渲染复杂布局', () => {
      const wrapper = mount({
        components: {
          WdRow,
          WdCol
        },
        template: `
          <wd-row :gutter="20">
            <wd-col :span="6">col-6</wd-col>
            <wd-col :span="6">col-6</wd-col>
            <wd-col :span="6">col-6</wd-col>
            <wd-col :span="6">col-6</wd-col>
          </wd-row>
          <wd-row :gutter="20">
            <wd-col :span="8">col-8</wd-col>
            <wd-col :span="8">col-8</wd-col>
            <wd-col :span="8">col-8</wd-col>
          </wd-row>
          <wd-row :gutter="20">
            <wd-col :span="12">col-12</wd-col>
            <wd-col :span="12">col-12</wd-col>
          </wd-row>
        `
      })

      const rows = wrapper.findAllComponents(WdRow)
      expect(rows.length).toBe(3)

      const cols = wrapper.findAllComponents(WdCol)
      expect(cols.length).toBe(9)
    })

    // 测试 justify 和 align 在组合使用中生效
    test('justify 和 align 在组合布局中生效', () => {
      const wrapper = mount({
        components: {
          WdRow,
          WdCol
        },
        template: `
          <wd-row justify="center" align="middle">
            <wd-col :span="8">col-8</wd-col>
            <wd-col :span="8">col-8</wd-col>
          </wd-row>
        `
      })

      const row = wrapper.findComponent(WdRow)
      const style = row.attributes('style')
      expect(style).toContain('justify-content: center')
      expect(style).toContain('align-items: center')
    })
  })
})
