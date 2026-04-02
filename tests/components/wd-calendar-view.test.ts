import { config, mount } from '@vue/test-utils'
import WdCalendarView from '@/uni_modules/wot-ui/components/wd-calendar-view/wd-calendar-view.vue'
import monthPanel from '@/uni_modules/wot-ui/components/wd-calendar-view/monthPanel/month-panel.vue'
import yearPanel from '@/uni_modules/wot-ui/components/wd-calendar-view/yearPanel/year-panel.vue'
import year from '@/uni_modules/wot-ui/components/wd-calendar-view/year/year.vue'
import month from '@/uni_modules/wot-ui/components/wd-calendar-view/month/month.vue'

import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { nextTick } from 'vue'
import { type CalendarFormatter, type CalendarTimeFilter } from '@/uni_modules/wot-ui/components/wd-calendar-view/types'
import WdIcon from '@/uni_modules/wot-ui/components/wd-icon/wd-icon.vue'
config.global.components = { monthPanel, yearPanel, year, month, WdIcon }
describe('WdCalendarView', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('基本渲染', async () => {
    const wrapper = mount(WdCalendarView, {
      props: {
        modelValue: Date.now()
      },
      global: {
        components: {
          monthPanel,
          yearPanel,
          year,
          month
        }
      }
    })

    await nextTick()

    expect(wrapper.classes()).toContain('wd-calendar-view')
    expect(wrapper.findComponent(monthPanel).exists()).toBe(true)
  })

  test('日期多选', async () => {
    const wrapper = mount(WdCalendarView, {
      props: {
        modelValue: [],
        type: 'dates'
      },
      global: {
        components: {
          monthPanel,
          yearPanel,
          year,
          month
        }
      }
    })

    await nextTick()

    expect(wrapper.props('type')).toBe('dates')
    expect(wrapper.findComponent(monthPanel).exists()).toBe(true)
  })

  test('日期范围选择', async () => {
    const wrapper = mount(WdCalendarView, {
      props: {
        modelValue: [],
        type: 'daterange',
        allowSameDay: true
      },
      global: {
        components: {
          monthPanel,
          yearPanel,
          year,
          month
        }
      }
    })

    await nextTick()

    expect(wrapper.props('type')).toBe('daterange')
    expect(wrapper.props('allowSameDay')).toBe(true)
    expect(wrapper.findComponent(monthPanel).exists()).toBe(true)
  })

  test('周范围选择', async () => {
    const wrapper = mount(WdCalendarView, {
      props: {
        modelValue: [],
        type: 'weekrange',
        firstDayOfWeek: 1
      },
      global: {
        components: {
          monthPanel,
          yearPanel,
          year,
          month
        }
      }
    })

    await nextTick()

    expect(wrapper.props('type')).toBe('weekrange')
    expect(wrapper.props('firstDayOfWeek')).toBe(1)
    expect(wrapper.findComponent(monthPanel).exists()).toBe(true)
  })

  test('月范围选择', async () => {
    const wrapper = mount(WdCalendarView, {
      props: {
        modelValue: [],
        type: 'monthrange'
      },
      global: {
        components: {
          monthPanel,
          yearPanel,
          year,
          month
        }
      }
    })

    await nextTick()

    expect(wrapper.props('type')).toBe('monthrange')
    expect(wrapper.findComponent(yearPanel).exists()).toBe(true)
  })

  test('月选择', async () => {
    const wrapper = mount(WdCalendarView, {
      props: {
        modelValue: Date.now(),
        type: 'month'
      },
      global: {
        components: {
          monthPanel,
          yearPanel,
          year,
          month
        }
      }
    })

    await nextTick()

    expect(wrapper.props('type')).toBe('month')
    expect(wrapper.findComponent(yearPanel).exists()).toBe(true)
  })

  test('日期时间选择', async () => {
    const timeFilter: CalendarTimeFilter = ({ type, values }) => {
      if (type === 'minute') {
        return values.filter((item) => item % 10 === 0)
      }
      return values
    }

    const wrapper = mount(WdCalendarView, {
      props: {
        modelValue: Date.now(),
        type: 'datetime',
        hideSecond: true,
        timeFilter
      },
      global: {
        components: {
          monthPanel,
          yearPanel,
          year,
          month
        }
      }
    })

    await nextTick()

    expect(wrapper.props('type')).toBe('datetime')
    expect(wrapper.props('hideSecond')).toBe(true)
    expect(wrapper.props('timeFilter')).toBeTruthy()
    expect(wrapper.findComponent(monthPanel).exists()).toBe(true)
  })

  test('最大范围限制', async () => {
    const wrapper = mount(WdCalendarView, {
      props: {
        modelValue: [],
        type: 'daterange',
        maxRange: 3
      },
      global: {
        components: {
          monthPanel,
          yearPanel,
          year,
          month
        }
      }
    })

    await nextTick()

    expect(wrapper.props('maxRange')).toBe(3)
  })

  test('自定义格式化', async () => {
    const formatter: CalendarFormatter = (day) => {
      if (day.type === 'start') {
        day.bottomInfo = '开始'
      }
      if (day.type === 'end') {
        day.bottomInfo = '结束'
      }
      return day
    }

    const wrapper = mount(WdCalendarView, {
      props: {
        modelValue: [],
        type: 'daterange',
        formatter
      },
      global: {
        components: {
          monthPanel,
          yearPanel,
          year,
          month
        }
      }
    })

    await nextTick()

    expect(wrapper.props('formatter')).toBeTruthy()
  })

  test('change事件', async () => {
    const wrapper = mount(WdCalendarView, {
      props: {
        modelValue: Date.now(),
        type: 'date'
      },
      global: {
        components: {
          monthPanel,
          yearPanel,
          year,
          month
        }
      }
    })

    await nextTick()

    const monthPanelWrapper = wrapper.findComponent(monthPanel)

    monthPanelWrapper.vm.$emit('change', { value: Date.now() + 86400000 })

    // 验证事件被触发
    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  test('pickstart 和 pickend 事件', async () => {
    const wrapper = mount(WdCalendarView, {
      props: {
        modelValue: [],
        type: 'daterange'
      },
      global: {
        components: {
          monthPanel,
          yearPanel,
          year,
          month
        }
      }
    })

    await nextTick()

    const monthPanelWrapper = wrapper.findComponent(monthPanel)

    // 模拟月面板的 pickstart 事件
    monthPanelWrapper.vm.$emit('pickstart')

    // 验证 pickstart 事件被触发
    expect(wrapper.emitted('pickstart')).toBeTruthy()

    // 模拟月面板的 pickend 事件
    monthPanelWrapper.vm.$emit('pickend')

    // 验证 pickend 事件被触发
    expect(wrapper.emitted('pickend')).toBeTruthy()
  })

  test('scrollIntoView 方法', async () => {
    // 测试月类型
    const monthWrapper = mount(WdCalendarView, {
      props: {
        modelValue: Date.now(),
        type: 'month'
      },
      global: {
        components: {
          monthPanel,
          yearPanel,
          year,
          month
        }
      }
    })

    await nextTick()

    // 调用 scrollIntoView 方法
    monthWrapper.vm.scrollIntoView()

    // 测试日期类型
    const dateWrapper = mount(WdCalendarView, {
      props: {
        modelValue: Date.now(),
        type: 'date'
      },
      global: {
        components: {
          monthPanel,
          yearPanel,
          year,
          month
        }
      }
    })

    await nextTick()

    // 调用 scrollIntoView 方法
    dateWrapper.vm.scrollIntoView()
  })

  test('immediateChange 属性', async () => {
    const wrapper = mount(WdCalendarView, {
      props: {
        modelValue: Date.now(),
        type: 'date',
        immediateChange: true
      },
      global: {
        components: {
          monthPanel,
          yearPanel,
          year,
          month
        }
      }
    })

    await nextTick()

    expect(wrapper.props('immediateChange')).toBe(true)
  })
})

describe('Calendar SubComponents', () => {
  const baseDate = new Date(2026, 2, 1).getTime()
  const minDate = new Date(2026, 0, 1).getTime()
  const maxDate = new Date(2026, 11, 31).getTime()

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
  })

  test('month: daterange 超过 maxRange 时按上限截断并触发 change', async () => {
    const start = new Date(2026, 2, 1).getTime()
    const wrapper = mount(month as any, {
      props: {
        type: 'daterange',
        date: baseDate,
        value: [start, null],
        minDate,
        maxDate,
        firstDayOfWeek: 0,
        maxRange: 3,
        allowSameDay: true
      }
    })

    await nextTick()
    await wrapper.findAll('.wd-month__day')[9].trigger('click')

    const change = wrapper.emitted('change') as any[]
    expect(change).toBeTruthy()
    expect(change[0][0].value[0]).toBe(start)
    expect(change[0][0].value[1]).toBe(new Date(2026, 2, 3).getTime())
    expect(change[0][0].type).toBe('end')
  })

  test('month: daterange 且不允许同天时点击同一天不触发 change', async () => {
    const start = new Date(2026, 2, 1).getTime()
    const wrapper = mount(month as any, {
      props: {
        type: 'daterange',
        date: baseDate,
        value: [start, null],
        minDate,
        maxDate,
        firstDayOfWeek: 0,
        allowSameDay: false
      }
    })

    await nextTick()
    await wrapper.findAll('.wd-month__day')[0].trigger('click')

    expect(wrapper.emitted('change')).toBeFalsy()
  })

  test('month: week 类型点击日期触发周变更', async () => {
    const wrapper = mount(month as any, {
      props: {
        type: 'week',
        date: baseDate,
        value: new Date(2026, 2, 8).getTime(),
        minDate,
        maxDate,
        firstDayOfWeek: 1,
        allowSameDay: true
      }
    })

    await nextTick()
    await wrapper.findAll('.wd-month__day')[10].trigger('click')

    const change = wrapper.emitted('change') as any[]
    expect(change).toBeTruthy()
    expect(change[0][0].value).toBeTypeOf('number')
  })

  test('month: weekrange 不允许同周时点击同周不触发 change', async () => {
    const start = new Date(2026, 2, 2).getTime()
    const wrapper = mount(month as any, {
      props: {
        type: 'weekrange',
        date: baseDate,
        value: [start, null],
        minDate,
        maxDate,
        firstDayOfWeek: 1,
        allowSameDay: false
      }
    })

    await nextTick()
    await wrapper.findAll('.wd-month__day')[1].trigger('click')
    expect(wrapper.emitted('change')).toBeFalsy()
  })

  test('month: formatter 非函数时输出错误', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    mount(month as any, {
      props: {
        type: 'date',
        date: baseDate,
        value: baseDate,
        minDate,
        maxDate,
        firstDayOfWeek: 0,
        formatter: 'invalid'
      }
    })
    expect(errorSpy).toHaveBeenCalledWith('[wot-design] error(wd-calendar-view): the formatter prop of wd-calendar-view should be a function')
    errorSpy.mockRestore()
  })

  test('year: monthrange 超过 maxRange 时按上限截断', async () => {
    const start = new Date(2026, 0, 1).getTime()
    const wrapper = mount(year as any, {
      props: {
        type: 'monthrange',
        date: new Date(2026, 0, 1).getTime(),
        value: [start, null],
        minDate,
        maxDate,
        maxRange: 2,
        allowSameDay: true
      }
    })

    await nextTick()
    await wrapper.findAll('.wd-year__month')[4].trigger('click')

    const change = wrapper.emitted('change') as any[]
    expect(change).toBeTruthy()
    expect(change[0][0].value[0]).toBe(start)
    expect(change[0][0].value[1]).toBe(new Date(2026, 1, 1).getTime())
  })

  test('year: monthrange 且不允许同月时点击同月不触发 change', async () => {
    const start = new Date(2026, 0, 1).getTime()
    const wrapper = mount(year as any, {
      props: {
        type: 'monthrange',
        date: new Date(2026, 0, 1).getTime(),
        value: [start, null],
        minDate,
        maxDate,
        allowSameDay: false
      }
    })

    await nextTick()
    await wrapper.findAll('.wd-year__month')[0].trigger('click')

    expect(wrapper.emitted('change')).toBeFalsy()
  })

  test('month-panel: year-month 模式在边界月份时按钮禁用', async () => {
    const fixedMonth = new Date(2026, 2, 1).getTime()
    const wrapper = mount(monthPanel as any, {
      props: {
        type: 'date',
        value: fixedMonth,
        minDate: fixedMonth,
        maxDate: fixedMonth,
        switchMode: 'year-month'
      }
    })

    await nextTick()
    vi.runAllTimers()
    await nextTick()

    const disabledIcons = wrapper.findAll('.wd-month-panel__control-icon.is-disabled')
    expect(disabledIcons.length).toBeGreaterThanOrEqual(4)
  })

  test('year-panel: year-month 模式在边界年份时按钮禁用', async () => {
    const fixedYear = new Date(2026, 0, 1).getTime()
    const wrapper = mount(yearPanel as any, {
      props: {
        type: 'month',
        value: fixedYear,
        minDate: fixedYear,
        maxDate: fixedYear,
        panelHeight: 320,
        switchMode: 'year-month'
      }
    })

    await nextTick()
    vi.runAllTimers()
    await nextTick()

    const disabledIcons = wrapper.findAll('.wd-year-panel__control-icon.is-disabled')
    expect(disabledIcons.length).toBe(2)
  })

  test('month-panel: datetime 类型 handleTimeChange 触发 change', async () => {
    const value = new Date(2026, 2, 10, 8, 0, 0).getTime()
    const wrapper = mount(monthPanel as any, {
      props: {
        type: 'datetime',
        value,
        minDate,
        maxDate
      }
    })

    await nextTick()
    ;(wrapper.vm as any).handleTimeChange({ value: '12:30:00' })
    vi.advanceTimersByTime(60)
    await nextTick()

    const change = wrapper.emitted('change') as any[]
    expect(change).toBeTruthy()
    expect(change[0][0].value).toBeTypeOf('number')
  })

  test('month-panel: 滚动模式滚动时更新标题索引', async () => {
    const wrapper = mount(monthPanel as any, {
      props: {
        type: 'date',
        value: baseDate,
        minDate: new Date(2026, 0, 1).getTime(),
        maxDate: new Date(2026, 5, 30).getTime(),
        showPanelTitle: true,
        switchMode: 'none'
      }
    })

    await nextTick()
    vi.runAllTimers()
    await nextTick()

    const beforeTitle = wrapper.find('.wd-month-panel__title').text()
    await wrapper.find('.wd-month-panel__container').trigger('scroll', { detail: { scrollTop: 1200 } })
    await nextTick()
    const afterTitle = wrapper.find('.wd-month-panel__title').text()

    expect(beforeTitle).not.toBe('')
    expect(afterTitle).not.toBe('')
  })
})
