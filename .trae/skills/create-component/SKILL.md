---
name: create-component
description: 在 wot-ui 项目中创建新组件的标准流程
---

# 创建新组件技能

本技能用于在 wot-ui 项目中创建新的 UI 组件。

## 组件目录结构

每个组件位于 `src/uni_modules/wot-design-uni/components/wd-{组件名}/` 目录下，包含以下文件：

```
wd-{组件名}/
├── types.ts           # 类型定义文件
├── wd-{组件名}.vue    # 组件主文件
└── index.scss         # 样式文件
```

---

## 创建步骤

### 1. 创建组件目录

```bash
mkdir -p src/uni_modules/wot-design-uni/components/wd-{组件名}
```

---

### 2. 创建类型定义文件 (`types.ts`)

```typescript
import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeNumericProp, makeStringProp } from '../common/props'

// 如果需要定义枚举类型
export type {组件名}Type = 'primary' | 'success' | 'warning' | 'danger'

export const {组件名驼峰}Props = {
  // 继承基础 props (customStyle, customClass)
  ...baseProps,
  /**
   * 属性描述
   * 类型: string
   * 默认值: ''
   */
  prop1: makeStringProp(''),
  /**
   * 布尔属性描述
   * 类型: boolean
   * 默认值: false
   */
  disabled: makeBooleanProp(false),
  /**
   * 数字属性描述
   * 类型: number
   * 默认值: 0
   */
  count: makeNumberProp(0),
  /**
   * 数字或字符串属性
   * 类型: string | number
   * 默认值: ''
   */
  value: makeNumericProp('')
}

// Props 类型导出
export type {组件名}Props = ExtractPropTypes<typeof {组件名驼峰}Props>

// 如果组件暴露方法，定义 Expose 类型
export type {组件名}Expose = {
  /** 方法描述 */
  methodName: () => void
}

// 组件实例类型
export type {组件名}Instance = ComponentPublicInstance<{组件名}Expose, {组件名}Props>
```

#### Props 工具函数说明

| 工具函数 | 用途 | 示例 |
|---------|------|------|
| `makeStringProp(default)` | 字符串属性 | `makeStringProp('')` |
| `makeBooleanProp(default)` | 布尔属性 | `makeBooleanProp(false)` |
| `makeNumberProp(default)` | 数字属性 | `makeNumberProp(0)` |
| `makeNumericProp(default)` | 数字或字符串属性 | `makeNumericProp('')` |
| `makeArrayProp<T>()` | 数组属性 | `makeArrayProp<string>()` |
| `makeRequiredProp(type)` | 必填属性 | `makeRequiredProp(String)` |

---

### 3. 创建组件文件 (`wd-{组件名}.vue`)

```vue
<template>
  <view :class="rootClass" :style="customStyle">
    <!-- 组件内容 -->
    <slot></slot>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-{组件名}',
  options: {
    addGlobalClass: true,
    // #ifndef MP-TOUTIAO
    virtualHost: true,
    // #endif
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed } from 'vue'
import { {组件名驼峰}Props, type {组件名}Expose } from './types'

const props = defineProps({组件名驼峰}Props)

// Emits 定义
const emit = defineEmits<{
  click: [event: Event]
  change: [value: string]
}>()

// 计算根节点类名
const rootClass = computed(() => {
  return `wd-{组件名} ${props.customClass}`
})

// 组件方法
function handleClick(event: Event) {
  emit('click', event)
}

// 暴露给父组件的方法
defineExpose<{组件名}Expose>({
  methodName: () => {
    // 实现
  }
})
</script>

<style lang="scss">
@use './index.scss';
</style>
```

#### 组件选项说明

- `addGlobalClass: true` - 允许使用全局样式类
- `virtualHost: true` - 开启虚拟节点模式
- `styleIsolation: 'shared'` - 样式共享模式

---

### 4. 创建样式文件 (`index.scss`)

```scss
@use '../styles/mixin/mixin.scss' as *;
@use '../styles/variable.scss' as *;

// 定义组件级 CSS 变量（支持主题定制）
${组件名}-bg: var(--wot-{组件名}-bg, $filled-oppo);
${组件名}-padding: var(--wot-{组件名}-padding, $padding-loose);
${组件名}-border-radius: var(--wot-{组件名}-border-radius, $radius-main);

@include b({组件名}) {
  display: flex;
  padding: ${组件名}-padding;
  background: ${组件名}-bg;
  border-radius: ${组件名}-border-radius;

  // 定义元素 (Element)
  @include e(header) {
    // .wd-{组件名}__header
  }

  @include e(content) {
    // .wd-{组件名}__content
  }

  @include e(footer) {
    // .wd-{组件名}__footer
  }

  // 定义状态修饰符 (Modifier)
  @include when(disabled) {
    // .wd-{组件名}.is-disabled
    opacity: $opacity-disabled;
  }

  @include when(active) {
    // .wd-{组件名}.is-active
  }

  // 定义变体修饰符
  @include m(primary) {
    // .wd-{组件名}--primary
  }

  @include m(large) {
    // .wd-{组件名}--large
  }
}
```

#### BEM 命名规范

| Mixin | 生成选择器 | 说明 |
|-------|-----------|------|
| `@include b(name)` | `.wd-name` | 定义块 (Block) |
| `@include e(elem)` | `.wd-name__elem` | 定义元素 (Element) |
| `@include m(mod)` | `.wd-name--mod` | 定义修饰符 (Modifier) |
| `@include when(state)` | `.wd-name.is-state` | 定义状态 |
| `@include edeep(elem)` | `:deep(.wd-name__elem)` | 穿透子组件样式 |
| `@include me(elem)` | 嵌套在 m 下的 e | 修饰符下的元素 |

#### 常用样式变量

| 类别 | 变量示例 | 说明 |
|------|---------|------|
| 颜色 | `$primary-6`, `$danger-main`, `$text-main` | 语义化颜色 |
| 间距 | `$padding-loose`, `$spacing-tight` | 内边距/间距 |
| 圆角 | `$radius-main`, `$radius-large` | 边框圆角 |
| 字体 | `$typography-body-size-main` | 字号 |
| 边框 | `$border-main`, `$stroke-main` | 边框 |

---

## 常用 Composables

项目提供了多个可复用的组合式函数：

| Composable | 用途 |
|------------|------|
| `useParent` | 获取父组件实例 |
| `useChildren` | 管理子组件 |
| `useLockScroll` | 锁定页面滚动 |
| `useClickAway` | 点击外部区域检测 |
| `useQueue` | Toast/Notify 队列管理 |
| `useTranslate` | 国际化 |

使用示例：

```typescript
import { useLockScroll } from '../composables/useLockScroll'

// #ifdef H5
useLockScroll(() => showPopup.value)
// #endif
```

---

## 条件编译

uni-app 支持跨平台条件编译：

```vue
<!-- 仅 H5 平台 -->
// #ifdef H5
<view>H5 专用内容</view>
// #endif

<!-- 仅微信小程序 -->
// #ifdef MP-WEIXIN
<view>微信小程序专用</view>
// #endif

<!-- 非 App 平台 -->
// #ifndef APP
<view>非 App 内容</view>
// #endif
```

---

### 5. 注册全局类型声明 (`global.d.ts`)

在 `src/uni_modules/wot-design-uni/global.d.ts` 中添加组件类型声明：

```typescript
declare module 'vue' {
  export interface GlobalComponents {
    // ... 已有组件
    Wd{组件名帕斯卡}: typeof import('./components/wd-{组件名}/wd-{组件名}.vue')['default']
  }
}
```

> **命名规则**：组件名使用帕斯卡命名法（PascalCase），如 `WdVideoPreview`、`WdIndexBar`

---

### 6. 创建中文文档 (`docs/component/{组件名}.md`)

文档遵循以下结构：

```markdown
# {组件名} {中文名}

组件简介描述。

## 基本用法

基本使用说明。

\`\`\`html
<wd-{组件名}>示例内容</wd-{组件名}>
\`\`\`

## 其他功能

<!-- 按功能分节介绍 -->

## Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|------|------|------|--------|--------|----------|
| type | 类型 | string | primary / success | primary | - |

## Events

| 事件名称 | 说明 | 参数 | 最低版本 |
|----------|------|------|----------|
| click | 点击事件 | `event` | - |

## Slots

| 名称 | 说明 | 最低版本 |
|------|------|----------|
| default | 默认插槽 | - |

## 外部样式类

| 类名 | 说明 | 最低版本 |
|------|------|----------|
| custom-class | 根节点样式 | - |
```

---

### 7. 创建英文文档 (`docs/en-US/component/{组件名}.md`)

英文文档结构与中文一致，表格标题列使用英文：

| 中文表头 | 英文表头 |
|----------|----------|
| 参数 | Parameter |
| 说明 | Description |
| 类型 | Type |
| 可选值 | Accepted Values |
| 默认值 | Default |
| 最低版本 | Min Version |

---

### 8. 配置文档侧边栏

需要在以下两个文件中添加侧边栏配置：

#### 中文侧边栏 (`docs/.vitepress/locales/zh-CN.ts`)

```typescript
// 在对应分类的 items 数组中添加
{
  link: '/component/{组件名}',
  text: '{组件名帕斯卡} {中文名}'
}
```

#### 英文侧边栏 (`docs/.vitepress/locales/en-US.ts`)

```typescript
{
  link: '/en-US/component/{组件名}',
  text: '{组件名帕斯卡} {英文名}'
}
```

**分类参考**：
- 基础：Button、Icon、Popup、Transition 等
- 导航：Pagination、Tabs、Tabbar、Navbar 等
- 数据输入：Input、Picker、Calendar、Form 等
- 反馈：Toast、Loading、ActionSheet 等
- 数据展示：Badge、Card、Cell、Tag 等

---

### 9. 创建演示页面 (`src/subPages/{组件名驼峰}/Index.vue`)

```vue
<template>
  <page-wraper>
    <view class="page-{组件名}">
      <demo-block :title="$t('jiBenYongFa')">
        <wd-{组件名}>基本用法</wd-{组件名}>
      </demo-block>

      <demo-block :title="$t('otherFeature')">
        <!-- 其他功能演示 -->
      </demo-block>
    </view>
  </page-wraper>
</template>

<script lang="ts" setup>
// 组件逻辑
</script>

<style lang="scss" scoped>
.page-{组件名} {
  // 页面样式
}
</style>
```

> **注意**：使用 `page-wraper` 组件包裹页面，使用 `demo-block` 组件分块展示功能

---

### 10. 配置演示页面路由 (`src/pages.json`)

在 `subPackages` 的 `pages` 数组中添加：

```json
{
  "path": "{组件名驼峰}/Index",
  "name": "{组件名驼峰}",
  "style": {
    "mp-alipay": {
      "allowsBounceVertical": "NO"
    },
    // #ifdef MP
    "navigationBarTitleText": "{组件名帕斯卡} {中文名}",
    // #endif
    // #ifndef MP
    "navigationBarTitleText": "%{组件名小写}-title%"
    // #endif
  }
}
```

---

### 11. 配置首页入口 (`src/pages/index/Index.vue`)

在对应分类的 `pages` 数组中添加演示页面入口：

```typescript
// 在对应分类（如 show 数据展示）的 pages 数组中添加
{
  id: '{组件名驼峰}',
  name: t('{组件名小写}-{中文名}')
}
```

**分类对应关系**：
| 分类 ID | 说明 | 示例组件 |
|---------|------|----------|
| `widget` | 基础 | Button、Icon、Popup |
| `nav` | 导航 | Tabs、Tabbar、Navbar |
| `form` | 数据输入 | Input、Picker、Calendar |
| `feedback` | 反馈 | Toast、Loading、ActionSheet |
| `show` | 数据展示 | Badge、Card、Cell、Img |

---

## 检查清单

创建组件后，确保完成以下事项：

**组件代码**
- [ ] `types.ts` 中所有 props 都有中文注释
- [ ] 组件支持 `customClass` 和 `customStyle` 属性
- [ ] 样式使用 BEM 命名规范
- [ ] CSS 变量使用 `--wot-{组件名}-*` 格式命名
- [ ] 如有暴露方法，定义正确的 `Expose` 类型
- [ ] 组件设置了正确的 `name` 选项

**类型声明**
- [ ] 在 `global.d.ts` 中添加组件类型声明

**文档**
- [ ] 创建中文文档 `docs/component/{组件名}.md`
- [ ] 创建英文文档 `docs/en-US/component/{组件名}.md`
- [ ] 在 `zh-CN.ts` 中添加侧边栏配置
- [ ] 在 `en-US.ts` 中添加侧边栏配置

**演示页面**
- [ ] 创建演示页面 `src/subPages/{组件名驼峰}/Index.vue`
- [ ] 在 `pages.json` 中配置页面路由
- [ ] 在 `src/pages/index/Index.vue` 中添加首页入口

