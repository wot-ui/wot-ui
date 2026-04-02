# Sidebar 侧边导航

垂直展示的导航栏，用于在不同内容区域之间进行切换。

## 组件类型

### 基础用法

通过 `v-model` 绑定当前选中项的值。

```html
<wd-sidebar v-model="active">
  <wd-sidebar-item :value="0" label="标签名称" />
  <wd-sidebar-item :value="1" label="标签名称" />
  <wd-sidebar-item :value="2" label="标签名称" />
</wd-sidebar>
```

```ts
const active = ref(0)
```

## 组件状态

### 徽标提示

设置 `is-dot` 可展示红点徽标；设置 `badge` 或 `badge-props` 可展示数字徽标。

```html
<wd-sidebar v-model="active">
  <wd-sidebar-item :value="0" label="标签名称" is-dot />
  <wd-sidebar-item :value="1" label="标签名称" badge="5" />
  <wd-sidebar-item :value="2" label="标签名称" :badge-props="{ type: 'warning', value: 55, max: 99 }" />
</wd-sidebar>
```

### 禁用与异步切换

设置 `disabled` 可禁用当前选项；设置 `before-change` 可在切换前执行同步或异步逻辑。

```html
<wd-sidebar v-model="active" :before-change="beforeChange">
  <wd-sidebar-item :value="0" label="标签名称" />
  <wd-sidebar-item :value="1" label="标签名称" disabled />
  <wd-sidebar-item :value="2" label="标签名称" />
</wd-sidebar>
```

```ts
import type { SidebarBeforeChange } from '@/uni_modules/wot-design-uni/components/wd-sidebar/types'

const beforeChange: SidebarBeforeChange = (value) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 2000)
  })
}
```

## 特殊样式

### 锚点用法示例

sidebar 可以与 `scroll-view` 结合，实现长内容页的锚点切换。仓库中的示例可参考 `src/subPages/sidebar/demo1.vue`。

### 切换页面用法示例

sidebar 也可以作为左侧目录，右侧内容区按当前选中项整屏切换。仓库中的示例可参考 `src/subPages/sidebar/demo2.vue`。

### 自定义图标示例

设置 `wd-sidebar-item` 的 `icon` 属性，可在导航项中显示不同图标。仓库中的示例可参考 `src/subPages/sidebar/demo3.vue`。

## Sidebar Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 当前激活项的值 | `string \| number` | `0` |
| before-change ^(1.4.0) | 切换前钩子，接收目标值，返回 `boolean` 或 `Promise<boolean>` | `function` | - |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## Sidebar Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 激活项切换时触发 | `{ value, label }` |

## Sidebar Slots

| name | 说明 |
| --- | --- |
| default | SidebarItem 列表 |

## Sidebar 外部样式类

| 类名 | 说明 |
| --- | --- |
| custom-class | 根节点样式 |

## SidebarItem Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 当前选项标题 | `string` | - |
| value | 当前选项值，唯一标识 | `string \| number` | - |
| badge | 徽标显示值 | `string \| number` | - |
| badge-props ^(0.1.50) | 自定义徽标属性，会透传给 Badge 组件 | `Partial<BadgeProps>` | - |
| icon | 图标名称 | `string` | - |
| is-dot | 是否显示点状徽标 | `boolean` | `false` |
| max | 徽标最大值 | `number` | `99` |
| disabled | 是否禁用当前选项 | `boolean` | `false` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## SidebarItem Slots

| name | 说明 |
| --- | --- |
| icon | 自定义图标内容 |

