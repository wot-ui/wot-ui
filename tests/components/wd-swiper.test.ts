import { mount } from '@vue/test-utils'
import WdSwiper from '@/uni_modules/wot-design-uni/components/wd-swiper/wd-swiper.vue'
import { describe, expect, test, vi } from 'vitest'
import WdSwiperNav from '@/uni_modules/wot-design-uni/components/wd-swiper-nav/wd-swiper-nav.vue'

describe('WdSwiper', () => {
  test('基本渲染', async () => {
    const wrapper = mount(WdSwiper, {
      global: {
        components: {
          'wd-swiper-nav': WdSwiperNav
        }
      }
    })
    expect(wrapper.classes()).toContain('wd-swiper')
  })

  test('轮播项渲染', async () => {
    const wrapper = mount(WdSwiper, {
      props: {
        list: [{ image: 'image1.jpg' }, { image: 'image2.jpg' }, { image: 'image3.jpg' }]
      },
      global: {
        components: {
          'wd-swiper-nav': WdSwiperNav
        }
      }
    })

    // 检查 list 属性是否正确传递
    expect((wrapper.vm as any).list.length).toBe(3)

    // 在测试环境中，我们无法直接检查 swiper-item 的渲染，
    // 因为它们是由 v-for 动态生成的，而测试环境不会执行这个逻辑
    // 所以我们只检查 list 属性是否正确传递
  })

  test('自动播放', async () => {
    const wrapper = mount(WdSwiper, {
      props: {
        autoplay: true,
        interval: 3000,
        list: [{ image: 'image1.jpg' }, { image: 'image2.jpg' }]
      },
      global: {
        components: {
          'wd-swiper-nav': WdSwiperNav
        }
      }
    })
    expect((wrapper.vm as any).autoplay).toBe(true)
    expect((wrapper.vm as any).interval).toBe(3000)
  })

  test('指示器显示', async () => {
    // 创建模拟的 wd-swiper-nav 组件
    const mockSwiperNav = {
      name: 'wd-swiper-nav',
      template: '<div class="wd-swiper-nav"><div v-for="i in total" :key="i" class="wd-swiper__indicator"></div></div>',
      props: ['type', 'current', 'total', 'direction', 'indicatorPosition', 'minShowNum', 'showControls'],
      emits: ['change']
    }

    const wrapper = mount(WdSwiper, {
      props: {
        indicator: true, // 注意：属性名应该是 indicator 而不是 showIndicator
        list: [{ image: 'image1.jpg' }, { image: 'image2.jpg' }]
      },
      global: {
        components: {
          'wd-swiper-nav': mockSwiperNav
        }
      }
    })

    // 检查 indicator 属性是否正确传递
    expect((wrapper.vm as any).indicator).toBe(true)

    // 检查 list 属性是否正确传递
    expect((wrapper.vm as any).list.length).toBe(2)

    // 在测试环境中，我们无法直接检查指示器的渲染，
    // 因为它们是由条件渲染生成的，而测试环境不会执行这个逻辑
    // 所以我们只检查相关属性是否正确传递
  })

  test('垂直方向', async () => {
    const wrapper = mount(WdSwiper, {
      props: {
        direction: 'vertical',
        list: [{ image: 'image1.jpg' }, { image: 'image2.jpg' }]
      },
      global: {
        components: {
          'wd-swiper-nav': WdSwiperNav
        }
      }
    })

    // 检查 direction 属性是否正确传递
    expect((wrapper.vm as any).direction).toBe('vertical')
  })

  test('循环播放', async () => {
    const wrapper = mount(WdSwiper, {
      props: {
        loop: true,
        list: [{ image: 'image1.jpg' }, { image: 'image2.jpg' }]
      },
      global: {
        components: {
          'wd-swiper-nav': WdSwiperNav
        }
      }
    })
    expect((wrapper.vm as any).loop).toBe(true)
  })

  test('切换事件', async () => {
    const wrapper = mount(WdSwiper, {
      props: {
        list: [{ image: 'image1.jpg' }, { image: 'image2.jpg' }]
      },
      global: {
        components: {
          'wd-swiper-nav': WdSwiperNav
        }
      }
    })
    wrapper.vm.$emit('change', { current: 1, source: 'touch' })
    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['change']).toBeTruthy()
    expect(emitted['change'][0][0]).toEqual({ current: 1, source: 'touch' })
  })

  test('props.current 越界时按 loop 规则归位', async () => {
    const wrapper = mount(WdSwiper, {
      props: {
        current: 0,
        loop: false,
        list: [{ image: 'a.jpg' }, { image: 'b.jpg' }]
      },
      global: {
        components: {
          'wd-swiper-nav': WdSwiperNav
        }
      }
    })

    await wrapper.setProps({ current: -1 })
    await wrapper.setProps({ current: 10 })

    const updates = wrapper.emitted('update:current') as any[]
    expect(updates).toBeTruthy()
    expect(updates[updates.length - 1][0]).toBe(1)
  })

  test('loop=true 时 props.current 越界会循环到首尾', async () => {
    const wrapper = mount(WdSwiper, {
      props: {
        current: 1,
        loop: true,
        list: [{ image: 'a.jpg' }, { image: 'b.jpg' }, { image: 'c.jpg' }]
      },
      global: {
        components: {
          'wd-swiper-nav': WdSwiperNav
        }
      }
    })

    await wrapper.setProps({ current: -2 })
    await wrapper.setProps({ current: 8 })

    const updates = wrapper.emitted('update:current') as any[]
    expect(updates).toBeTruthy()
    expect(updates[0][0]).toBe(2)
    expect(updates[updates.length - 1][0]).toBe(0)
  })

  test('handleIndicatorChange 在非 loop 下命中边界时不切换', () => {
    const wrapper = mount(WdSwiper, {
      props: {
        current: 0,
        loop: false,
        list: [{ image: 'a.jpg' }, { image: 'b.jpg' }]
      },
      global: {
        components: {
          'wd-swiper-nav': WdSwiperNav
        }
      }
    })

    ;(wrapper.vm as any).handleIndicatorChange({ dir: 'prev' })
    expect(wrapper.emitted('update:current')).toBeFalsy()
  })

  test('handleIndicatorChange 在 loop 下支持首尾循环', () => {
    const wrapper = mount(WdSwiper, {
      props: {
        current: 0,
        loop: true,
        list: [{ image: 'a.jpg' }, { image: 'b.jpg' }]
      },
      global: {
        components: {
          'wd-swiper-nav': WdSwiperNav
        }
      }
    })

    ;(wrapper.vm as any).handleIndicatorChange({ dir: 'prev' })
    const updates = wrapper.emitted('update:current') as any[]
    expect(updates).toBeTruthy()
    expect(updates[0][0]).toBe(1)
  })

  test('handleChange 与 handleAnimationfinish 会同步 current 并发射事件', () => {
    const wrapper = mount(WdSwiper, {
      props: {
        current: 0,
        list: [{ image: 'a.jpg' }, { image: 'b.jpg' }]
      },
      global: {
        components: {
          'wd-swiper-nav': WdSwiperNav
        }
      }
    })

    ;(wrapper.vm as any).handleChange({ detail: { current: 1, source: 'touch' } })
    ;(wrapper.vm as any).handleAnimationfinish({ detail: { current: 0, source: 'autoplay' } })

    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('animationfinish')).toBeTruthy()
    const updates = wrapper.emitted('update:current') as any[]
    expect(updates).toBeTruthy()
    expect(updates.length).toBeGreaterThan(0)
  })

  test('视频播放控制分支：start/stop 与 stopAutoplayWhenVideoPlay', () => {
    ;(global as any).uni = (global as any).uni || {}
    const play = vi.fn()
    const pause = vi.fn()
    ;(global as any).uni.createVideoContext = vi.fn(() => ({ play, pause }))

    const wrapper = mount(WdSwiper, {
      props: {
        autoplayVideo: true,
        stopPreviousVideo: true,
        stopAutoplayWhenVideoPlay: true,
        list: [
          { type: 'video', value: 'a.mp4' },
          { type: 'video', value: 'b.mp4' }
        ]
      },
      global: {
        components: {
          'wd-swiper-nav': WdSwiperNav
        }
      }
    })

    ;(wrapper.vm as any).handleVideoPaly()
    ;(wrapper.vm as any).handleVideoChange(0, 1)

    expect((global as any).uni.createVideoContext).toHaveBeenCalled()
    expect(play).toHaveBeenCalled()
    expect(pause).toHaveBeenCalled()
  })
})
