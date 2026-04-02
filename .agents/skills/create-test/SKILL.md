---
name: create-test
description: 为组件创建单元测试的标准流程
---

# 创建测试技能

本技能用于为 `wot-ui` 项目中的组件创建单元测试。测试框架使用 `vitest` 和 `@vue/test-utils`。

## 目录结构

所有组件测试位于 `tests/components/` 目录下，命名格式为 `wd-{组件名}.test.ts`。

## 创建步骤

### 1. 确认组件信息

- **组件名称**: 例如 `icon`, `button`
- **组件路径**: `src/uni_modules/wot-ui/components/wd-{组件名}/wd-{组件名}.vue`
- **Props 定义**: `src/uni_modules/wot-ui/components/wd-{组件名}/types.ts`

### 2. 创建测试文件

在 `tests/components/` 目录下创建 `wd-{组件名}.test.ts` 文件。

### 3. 使用测试模板

将以下模板复制到测试文件中，并根据组件实际情况进行修改。

```typescript
import { mount } from '@vue/test-utils'
import Wd{组件名帕斯卡} from '@/uni_modules/wot-ui/components/wd-{组件名}/wd-{组件名}.vue'
import { describe, test, expect, vi, beforeEach } from 'vitest'

describe('Wd{组件名帕斯卡}', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // 1. 基本渲染测试
  test('基本渲染', () => {
    const wrapper = mount(Wd{组件名帕斯卡})
    // 检查根类名
    expect(wrapper.classes()).toContain('wd-{组件名}')
    // 检查是否有 snapshot (可选)
    // expect(wrapper.element).toMatchSnapshot()
  })

  // 2. Props 测试
  // 遍历 types.ts 中定义的所有 props，测试其效果
  test('Props: propName', () => {
    const wrapper = mount(Wd{组件名帕斯卡}, {
      props: {
        propName: 'value'
      }
    })
    // 断言 props 生效，例如检查样式、类名或 DOM 结构
    expect(wrapper.classes()).toContain('is-some-state')
  })

  // 3. Events 测试
  test('Events: click', async () => {
    const wrapper = mount(Wd{组件名帕斯卡})
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  // 4. Slots 测试
  test('Slots: default', () => {
    const content = 'Slot Content'
    const wrapper = mount(Wd{组件名帕斯卡}, {
      slots: {
        default: content
      }
    })
    expect(wrapper.text()).toContain(content)
  })
})
```

### 4. 编写具体测试用例

根据 `types.ts` 中的 Props 定义和组件逻辑，完善测试用例。

- **Boolean Props**: 测试 `true` 和 `false` (默认) 的情况。通常对应类名变化 `is-{prop}`。
- **String/Number Props**: 测试不同值对组件显示的影响。
- **Events**: 测试交互是否触发了正确的事件，并携带了正确的参数。
- **Expose**: 如果组件暴露了方法 (Expose)，需要测试这些方法调用后的效果。
- **External Classes/Styles**: 测试 `customClass` 和 `customStyle` 是否生效。

### 5. 运行测试

使用以下命令运行测试，确保通过：

```bash
# 运行所有测试
npm run test

# 运行特定文件测试 (推荐)
npx vitest tests/components/wd-{组件名}.test.ts
```

### 6. 提升覆盖率技巧

为了确保高测试覆盖率，请关注以下方面：

- **分支覆盖 (Branch Coverage)**: 确保 `if/else`、`switch` 语句的所有分支都被执行。
- **边界条件 (Boundary Conditions)**: 测试最小值、最大值、空值、超长文本等极端情况。
- **交互状态 (Interactive States)**: 测试禁用 (`disabled`)、加载中 (`loading`)、只读 (`readonly`) 等状态下的行为。
- **异步操作 (Async Operations)**: 确保测试了 `setTimeout`、`nextTick` 或 Promise 相关的异步逻辑。
- **插槽内容 (Slot Content)**: 测试默认插槽和具名插槽在有无内容时的渲染表现。

## 最佳实践

- **描述清晰**: `test` 的描述应该清晰表达测试的目的。
- **功能覆盖**: 尽量覆盖组件的所有 Props、Events 和 Slots。
- **mocks**: 如果组件依赖外部环境或 API，使用 `vi.mock` 或 `vi.spyOn` 进行模拟。
- **cleanup**: `beforeEach` 中清理 mocks，保证测试独立性。
