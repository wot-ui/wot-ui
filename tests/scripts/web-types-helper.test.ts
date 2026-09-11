import { describe, test, expect } from 'vitest'
import { resolvePropName } from '../../scripts/web-types-helper'

describe('resolvePropName - 文档「参数」列的各种写法', () => {
  test('裸 v-model 落成 model-value', () => {
    expect(resolvePropName('v-model')).toBe('model-value')
  })

  test('v-model / modelValue 落成 model-value', () => {
    expect(resolvePropName('v-model / modelValue')).toBe('model-value')
  })

  test('model-value / v-model 落成 model-value（真实名写在前面时不能被丢弃）', () => {
    expect(resolvePropName('model-value / v-model')).toBe('model-value')
  })

  test('具名 model 取修饰符本身', () => {
    expect(resolvePropName('v-model:visible')).toBe('visible')
    expect(resolvePropName('visible / v-model:visible')).toBe('visible')
    expect(resolvePropName('value / v-model:value')).toBe('value')
  })

  test('具名 model 的修饰符含连字符时不能被截断（回归：car-lang 曾被截成 car）', () => {
    expect(resolvePropName('v-model:car-lang')).toBe('car-lang')
  })

  test('具名 model 的修饰符含连字符时不能被截断（回归：file-list 曾被截成 file）', () => {
    expect(resolvePropName('file-list / v-model:file-list')).toBe('file-list')
  })

  test('驼峰修饰符转成短横线', () => {
    expect(resolvePropName('v-model:carLang')).toBe('car-lang')
  })

  test('普通属性名原样透传', () => {
    expect(resolvePropName('close-on-click-modal')).toBe('close-on-click-modal')
    expect(resolvePropName('z-index')).toBe('z-index')
    expect(resolvePropName('title')).toBe('title')
  })

  test('驼峰普通属性名转成短横线', () => {
    expect(resolvePropName('customClass')).toBe('custom-class')
  })

  test('剥掉版本标记后仍能解析出正确 prop 名', () => {
    expect(resolvePropName('visible ^(1.2.0) / v-model:visible')).toBe('visible')
    expect(resolvePropName('v-model ^(1.2.0)')).toBe('model-value')
  })
})

describe('resolvePropName - markdown 装饰不能让字面量 v-model 复活', () => {
  test('反引号包裹的 v-model', () => {
    expect(resolvePropName('`v-model`')).toBe('model-value')
  })

  test('加粗的 v-model', () => {
    expect(resolvePropName('**v-model**')).toBe('model-value')
  })

  test('反引号包裹的具名 model 不能产出 v-modelcar-lang 这种垃圾名', () => {
    expect(resolvePropName('`v-model:car-lang`')).toBe('car-lang')
  })

  test('任何合法写法都不允许解析出以 v-model 开头的属性名', () => {
    const inputs = ['v-model', '`v-model`', '**v-model**', 'v-model:visible', '`v-model:car-lang`', 'v-model / modelValue']

    for (const input of inputs) {
      expect(resolvePropName(input).startsWith('v-model')).toBe(false)
    }
  })
})

describe('resolvePropName - 兜底护栏', () => {
  test('无法识别的 v-model 写法直接抛错，而不是静默产出坏属性名', () => {
    // 修饰符缺失 / 带 directive 修饰符，都不是「参数」列的合法写法
    expect(() => resolvePropName('v-model:')).toThrow(/非法属性名/)
    expect(() => resolvePropName('v-model.trim')).toThrow(/非法属性名/)
  })

  test('抛错信息里带上原始单元格内容，便于定位是哪行文档', () => {
    expect(() => resolvePropName('v-model.trim')).toThrow(/v-model\.trim/)
  })
})
