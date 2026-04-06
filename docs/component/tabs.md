# Tab 标签页

标签页组件，用于在不同内容区域之间进行切换。

## 组件类型

### 基本用法

`v-model` 可以使用数字下标，也可以使用字符串名称。

```html
<wd-tabs v-model="tab1" @change="handleChange">
  <block v-for="item in 4" :key="item">
    <wd-tab :title="`标签${item}`">
      <view class="content">内容{{ tab1 + 1 }}</view>
    </wd-tab>
  </block>
</wd-tabs>
```

```ts
const tab1 = ref(0)

function handleChange(event) {
  console.log(event)
}
```

### name 匹配

为 `wd-tab` 设置 `name` 后，可通过字符串值匹配当前激活项。

```html
<wd-tabs v-model="tab">
  <wd-tab v-for="item in tabs" :key="item" :title="item" :name="item">
    <view class="content">内容{{ tab }}</view>
  </wd-tab>
</wd-tabs>
```

```ts
const tabs = ref(['this', 'is', 'a', 'individual', 'example'])
const tab = ref('a')
```

### 使用徽标

通过 `badge-props` 为标签添加徽标。

```html
<wd-tabs v-model="tabWithBadge">
  <wd-tab v-for="(item, index) in tabsWithBadge" :key="index" :title="item.title" :badge-props="item.badgeProps">
    <view class="content">{{ item.title }}徽标</view>
  </wd-tab>
</wd-tabs>
```

## 组件状态

### 粘性布局

设置 `sticky` 开启吸顶布局，可配合 `offset-top` 控制吸顶偏移量。

```html
<wd-tabs v-model="tab2" sticky>
  <wd-tab v-for="item in 4" :key="item" :title="`标签${item}`">
    <view class="content">内容{{ tab2 + 1 }}</view>
  </wd-tab>
</wd-tabs>
```

### 禁用 Tab

通过 `wd-tab` 的 `disabled` 属性禁用单个页签。

```html
<wd-tabs v-model="tab3">
  <wd-tab v-for="item in 4" :key="item" :title="`标签${item}`" :disabled="item === 1">
    <view class="content">内容{{ tab3 + 1 }}</view>
  </wd-tab>
</wd-tabs>
```

## 组件样式

### 底部条样式

通过 `line-theme` 调整底部条表现，支持 `normal`、`text`、`underline`、`dot`。

```html
<wd-tabs v-model="tabLineTheme.normal" line-theme="normal">
  <wd-tab v-for="item in 4" :key="item" :title="`normal ${item}`">
    <view class="content">内容{{ item }}</view>
  </wd-tab>
</wd-tabs>
```

## 特殊样式

### 点击事件

监听 `click` 获取当前点击的页签信息。

```html
<wd-tabs v-model="tab4" @click="handleClick" @change="handleChange">
  <wd-tab v-for="item in 4" :key="item" :title="`标签${item}`">
    <view class="content">内容{{ tab4 + 1 }}</view>
  </wd-tab>
</wd-tabs>
```

```ts
function handleClick({ index, name }) {
  console.log(index, name)
}
```

### 切换动画

设置 `animated` 开启内容切换动画。

```html
<wd-tabs v-model="tab8" animated>
  <wd-tab v-for="item in 4" :key="item" :title="`标签${item}`">
    <view class="content">内容{{ tab8 + 1 }}</view>
  </wd-tab>
</wd-tabs>
```

### 手势滑动

设置 `swipeable` 开启手势滑动，常与 `animated` 组合使用。

```html
<wd-tabs v-model="tab5" swipeable animated>
  <wd-tab v-for="item in 4" :key="item" :title="`标签${item}`">
    <view class="content">内容{{ tab5 + 1 }}</view>
  </wd-tab>
</wd-tabs>
```

### 超出滚动与导航地图

标签数量超过 `slidable-num` 后可滑动，超过 `map-num` 后会显示导航地图；将 `slidable` 设为 `always` 时可始终左对齐滚动。

```html
<wd-tabs v-model="tab6">
  <wd-tab v-for="item in 7" :key="item" :title="`标签${item}`">
    <view class="content">内容{{ tab6 + 1 }}</view>
  </wd-tab>
</wd-tabs>

<wd-tabs v-model="tab9" slidable="always">
  <wd-tab v-for="item in 5" :key="item" :title="`超大标签${item}`">
    <view class="content">内容{{ tab9 + 1 }}</view>
  </wd-tab>
</wd-tabs>
```

### 在弹出框中使用

在微信小程序等场景中，弹出层打开后可调用 `updateLineStyle` 更新激活项样式。

::: code-group

```html [vue]
<wd-button @click="handleOpenClick">打开弹窗</wd-button>
<wd-popup v-model="showPopup" position="bottom" @after-enter="handlePopupShow" closable>
  <wd-tabs v-model="tab10" ref="tabsRef">
    <wd-tab v-for="item in tabs" :key="item" :title="item" :name="item">
      <view class="content">内容{{ tab10 }}</view>
    </wd-tab>
  </wd-tabs>
</wd-popup>
```

```ts [ts]
import type { TabsInstance } from '@/uni_modules/wot-ui/components/wd-tabs/types'

const showPopup = ref(false)
const tabsRef = ref<TabsInstance>()

function handleOpenClick() {
  showPopup.value = true
}

function handlePopupShow() {
  tabsRef.value?.updateLineStyle(false)
}
```

:::

## Tabs Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 当前激活项，可为索引或名称 | `number | string` | `0` |
| slidable-num | 自动开启滚动的标签数量阈值 | `number` | `6` |
| map-num | 显示导航地图的标签数量阈值 | `number` | `10` |
| map-title | 导航地图标题 | `string` | - |
| sticky | 是否开启粘性布局 | `boolean` | `false` |
| offset-top | 吸顶偏移量 | `number` | `0` |
| swipeable | 是否开启手势滑动 | `boolean` | `false` |
| line-theme | 底部条样式，可选值为 `normal`、`text`、`underline`、`dot` | `TabsLineTheme` | `normal` |
| line-width | 底部条宽度 | `number | string` | - |
| line-height | 底部条高度 | `number | string` | - |
| color | 激活项文字颜色 | `string` | `''` |
| inactive-color | 非激活项文字颜色 | `string` | `''` |
| animated | 是否开启切换动画 | `boolean` | `false` |
| duration | 动画时长，单位毫秒 | `number` | `300` |
| slidable | 是否开启滚动导航，可选值为 `auto`、`always` | `TabsSlidable` | `auto` |
| show-scrollbar | 滚动时是否显示滚动条 | `boolean` | `false` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## Tabs Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 激活项变化时触发 | `{ index, name }` |
| click | 点击页签标题时触发 | `{ index, name }` |
| disabled | 点击禁用页签时触发 | `{ index, name }` |
| update:modelValue | 激活项变化时触发 | `number | string` |

## Tabs Methods

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| setActive | 设置激活项 | `(value: number \| string, init: boolean, setScroll: boolean)` | - |
| scrollIntoView | 使选中项滚动到可视区域 | - | - |
| updateLineStyle | 更新激活项底部条样式 | `(animation?: boolean)` | - |

## Tabs Slots

| 名称 | 说明 |
| --- | --- |
| default | Tab 内容 |

## Tab Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 标签唯一标识，默认取索引 | `number | string` | - |
| title | 标签标题 | `string` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| lazy | 是否懒加载内容 | `boolean` | `true` |
| badge-props | 徽标属性，透传给 Badge 组件 | `Partial<BadgeProps>` | - |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## Tab Slots

| 名称 | 说明 |
| --- | --- |
| default | 页签内容 |