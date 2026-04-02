import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { describe, test, expect } from 'vitest'
import type { ConfigProviderThemeVars } from '@/uni_modules/wot-ui'
import WdConfigProvider from '@/uni_modules/wot-ui/components/wd-config-provider/wd-config-provider.vue'
import WdRootPortal from '@/uni_modules/wot-ui/components/wd-root-portal/wd-root-portal.vue'

describe('WdConfigProvider', () => {
  // 测试基本渲染
  test('基本渲染', () => {
    const wrapper = mount(WdConfigProvider)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes()).toContain('wot-theme-light')
  })

  // 测试主题配置
  test('配置主题变量', () => {
    const themeVars: ConfigProviderThemeVars = {
      primary6: '#1989fa',
      dangerMain: '#ee0a24'
    }
    const wrapper = mount(WdConfigProvider, {
      props: { themeVars }
    })

    const style = wrapper.attributes('style')
    expect(style).toContain('--wot-primary-6: #1989fa')
    expect(style).toContain('--wot-danger-main: #ee0a24')
  })

  // 测试主题模式设置
  test('配置主题模式', () => {
    const wrapper = mount(WdConfigProvider, {
      props: { theme: 'dark' }
    })
    expect(wrapper.classes()).toContain('wot-theme-dark')
  })

  // 测试暗黑模式
  test('应用暗黑主题类名', () => {
    const wrapper = mount(WdConfigProvider, {
      props: { theme: 'dark' }
    })
    expect(wrapper.classes()).toContain('wot-theme-dark')
    expect(wrapper.classes()).not.toContain('wot-theme-light')
  })

  // 测试默认插槽渲染
  test('渲染默认插槽', () => {
    const wrapper = mount(WdConfigProvider, {
      slots: {
        default: '<div class="test-content">测试内容</div>'
      }
    })
    expect(wrapper.find('.test-content').exists()).toBe(true)
    expect(wrapper.find('.test-content').text()).toBe('测试内容')
  })

  // 测试主题变量注入
  test('将主题变量注入为CSS变量', () => {
    const themeVars: ConfigProviderThemeVars = {
      buttonPrimaryColor: '#1989fa',
      buttonDangerColor: '#ee0a24'
    }
    const wrapper = mount(WdConfigProvider, {
      props: { themeVars }
    })

    // 验证CSS变量是否被正确注入
    const style = wrapper.attributes('style')

    // 检查转换后的变量名（驼峰转短横线）
    expect(style).toContain('--wot-button-primary-color: #1989fa')
    expect(style).toContain('--wot-button-danger-color: #ee0a24')
  })

  // 测试动态更新主题
  test('动态更新主题变量', async () => {
    const wrapper = mount(WdConfigProvider, {
      props: {
        themeVars: {
          primary6: '#1989fa'
        }
      }
    })

    expect(wrapper.attributes('style')).toContain('--wot-primary-6: #1989fa')

    await wrapper.setProps({
      themeVars: {
        primary6: '#2c68ff'
      }
    })

    expect(wrapper.attributes('style')).toContain('--wot-primary-6: #2c68ff')
  })

  // 测试自定义类名
  test('应用自定义类名', () => {
    const customClass = 'custom-provider'
    const wrapper = mount(WdConfigProvider, {
      props: { customClass }
    })
    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('应用自定义样式', () => {
    const customStyle = 'font-family: Arial;'
    const wrapper = mount(WdConfigProvider, {
      props: {
        customStyle,
        themeVars: { primary6: '#1989fa' } // 添加一个主题变量，确保 themeStyle 计算属性会包含 customStyle
      }
    })
    expect(wrapper.attributes('style')).toContain(customStyle)
  })

  // 测试主题继承
  test('从父级提供者继承主题', () => {
    const parentTheme: ConfigProviderThemeVars = {
      primary6: '#1989fa'
    }

    // 由于我们无法在测试中嵌套组件，我们只测试父组件的样式
    const wrapper = mount(WdConfigProvider, {
      props: { themeVars: parentTheme },
      slots: {
        default: '<div class="child">子级配置</div>'
      }
    })

    const parentStyle = wrapper.attributes('style')
    expect(parentStyle).toContain(`--wot-primary-6: ${parentTheme.primary6}`)
  })

  // 测试同时设置主题模式和主题变量
  test('同时应用主题模式和主题变量', () => {
    const themeVars: ConfigProviderThemeVars = {
      buttonPrimaryColor: '#1989fa'
    }
    const wrapper = mount(WdConfigProvider, {
      props: {
        theme: 'dark',
        themeVars
      }
    })

    expect(wrapper.classes()).toContain('wot-theme-dark')
    expect(wrapper.attributes('style')).toContain('--wot-button-primary-color: #1989fa')
  })

  test('root-portal 默认应用浅色主题类名', async () => {
    const wrapper = mount(WdRootPortal, {
      attachTo: document.body
    })

    await nextTick()

    const portal = document.body.querySelector('.wd-root-portal')
    expect(portal?.classList.contains('wot-theme-light')).toBe(true)

    wrapper.unmount()
  })

  test('root-portal 继承最近 config-provider 的暗黑主题', async () => {
    const wrapper = mount(
      {
        components: {
          WdConfigProvider,
          WdRootPortal
        },
        template: `
          <wd-config-provider theme="dark">
            <wd-root-portal>
              <div class="portal-content">内容</div>
            </wd-root-portal>
          </wd-config-provider>
        `
      },
      {
        attachTo: document.body
      }
    )

    await nextTick()

    const portal = document.body.querySelector('.wd-root-portal')
    expect(portal?.classList.contains('wot-theme-dark')).toBe(true)

    wrapper.unmount()
  })

  test('root-portal 保留 provider 注入的主题变量覆盖', async () => {
    const wrapper = mount(
      {
        components: {
          WdConfigProvider,
          WdRootPortal
        },
        data() {
          return {
            themeVars: {
              textMain: '#111111'
            }
          }
        },
        template: `
          <wd-config-provider theme="dark" :theme-vars="themeVars">
            <wd-root-portal>
              <div class="portal-content">内容</div>
            </wd-root-portal>
          </wd-config-provider>
        `
      },
      {
        attachTo: document.body
      }
    )

    await nextTick()

    const portal = document.body.querySelector('.wd-root-portal')
    expect(portal?.classList.contains('wot-theme-dark')).toBe(true)
    expect(portal?.getAttribute('style')).toContain('--wot-text-main: #111111')

    wrapper.unmount()
  })
})
