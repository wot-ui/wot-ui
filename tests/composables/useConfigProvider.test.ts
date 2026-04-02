import { describe, test, expect } from 'vitest'
import { ref, reactive, nextTick, defineComponent, inject, h } from 'vue'
import { mount } from '@vue/test-utils'
import { useConfigProvider, USE_CONFIG_PROVIDER_KEY } from '@/uni_modules/wot-ui/composables/useConfigProvider'

const ChildComponent = defineComponent({
  setup() {
    const provider = inject(USE_CONFIG_PROVIDER_KEY) as any
    return { provider }
  },
  render() {
    return h('div', { class: 'child' }, this.provider?.themeStyle?.value)
  }
})

describe('useConfigProvider', () => {
  test('should work with plain object', () => {
    const themeVars = { blue1: 'red' }
    const Wrapper = defineComponent({
      setup() {
        useConfigProvider({ themeVars })
      },
      render() {
        return h(ChildComponent)
      }
    })

    const wrapper = mount(Wrapper)
    expect(wrapper.find('.child').text()).toContain('--wot-blue-1:red')
  })

  test('should work with reactive object', async () => {
    const themeVars = reactive({ blue1: 'red' })
    const Wrapper = defineComponent({
      setup() {
        useConfigProvider({ themeVars })
        return { themeVars }
      },
      render() {
        return h(ChildComponent)
      }
    })

    const wrapper = mount(Wrapper)
    expect(wrapper.find('.child').text()).toContain('--wot-blue-1:red')

    themeVars.blue1 = 'blue'
    await nextTick()
    expect(wrapper.find('.child').text()).toContain('--wot-blue-1:blue')
  })

  test('should work with ref', async () => {
    const themeVars = ref({ blue1: 'red' })
    const Wrapper = defineComponent({
      setup() {
        useConfigProvider({ themeVars })
        return { themeVars }
      },
      render() {
        return h(ChildComponent)
      }
    })

    const wrapper = mount(Wrapper)
    expect(wrapper.find('.child').text()).toContain('--wot-blue-1:red')

    themeVars.value = { blue1: 'green' }
    await nextTick()
    expect(wrapper.find('.child').text()).toContain('--wot-blue-1:green')
  })

  test('should map number suffix keys to kebab css vars', () => {
    const themeVars = {
      blue1: '#111111',
      primary10: '#222222',
      darkColor2: '#333333',
      textMain: '#444444'
    }
    const Wrapper = defineComponent({
      setup() {
        useConfigProvider({ themeVars })
      },
      render() {
        return h(ChildComponent)
      }
    })

    const wrapper = mount(Wrapper)
    const styleText = wrapper.find('.child').text()
    expect(styleText).toContain('--wot-blue-1:#111111')
    expect(styleText).toContain('--wot-primary-10:#222222')
    expect(styleText).toContain('--wot-dark-color-2:#333333')
    expect(styleText).toContain('--wot-text-main:#444444')
  })
})
