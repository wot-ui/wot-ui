# Navbar 导航栏

为页面提供导航功能，常用于页面顶部。

::: tip 常见问题

**右图标被小程序胶囊挡住？**

在小程序平台开启自定义顶部导航时，右上角会固定显示胶囊，所以此时右侧插槽及选项是不建议使用。

**如何设置为背景透明？**

通过 `custom-style` 设置组件 `background-color` 为 `transparent`。

```html
<wd-navbar title="标题" custom-style="background-color: transparent !important;"></wd-navbar>
```

**组件会被 `video` 覆盖？**

`video` 为原生组件，层级较高，目前无法遮盖，需要具体平台具体分析。
:::

## 组件类型

### 基础用法

通过 `title` 属性设置导航栏标题。

```html
<wd-navbar title="标题"></wd-navbar>
```

### 返回上级

在导航栏实现返回上级功能。

::: code-group

```html
<wd-navbar title="标题" left-text="返回" left-arrow @click-left="handleClickLeft"></wd-navbar>
```

```ts
function handleClickLeft() {
  uni.navigateBack()
}
```

:::

### 右侧按钮

在导航栏右侧添加可点击的按钮。

::: code-group

```html
<wd-navbar title="标题" left-text="返回" left-arrow right-text="按钮" @click-left="handleClickLeft" @click-right="handleClickRight"></wd-navbar>
```

```ts
import { useToast } from '@/uni_modules/wot-design-uni'

const { show: showToast } = useToast()

function handleClickRight() {
  showToast('按钮')
}
```

:::

## 组件状态

### 禁用按钮

通过 `left-disabled` 或 `right-disabled` 属性来禁用两侧的按钮。按钮被禁用时透明度降低，且无法点击。

```html
<wd-navbar title="标题" left-text="返回" right-text="按钮" left-arrow left-disabled right-disabled></wd-navbar>
```

## 组件样式

### 固定在顶部

通过 `fixed` 属性设置导航栏固定在页面顶部，通过 `placeholder` 在顶部生成占位空间，通过 `safeAreaInsetTop` 开启顶部安全区的适配。

```html
<wd-navbar fixed placeholder title="Navbar 导航栏" left-arrow safeAreaInsetTop></wd-navbar>
```

## 内容形态

### 使用插槽

可以通过 `left` 和 `right` 插槽自定义导航栏两侧的内容。

```html
<wd-navbar title="标题">
  <template #left>
    <wd-icon name="left" size="24px" class="wd-navbar__arrow" />
  </template>
  <template #right>
    <wd-icon name="search-line" size="18" />
  </template>
</wd-navbar>
```

### 胶囊样式

通过 `capsule` 插槽和 `wd-navbar-capsule` 组件定制返回胶囊。

::: code-group

```html
<wd-navbar title="标题" left-text="返回" right-text="设置" left-arrow>
  <template #capsule>
    <wd-navbar-capsule @back="handleBack" @back-home="handleBackHome" />
  </template>
</wd-navbar>
```

```ts
function handleBack() {
  uni.navigateBack({})
}

function handleBackHome() {
  uni.reLaunch({ url: '/pages/index/Index' })
}
```

:::

### 带搜索栏

通过 `title` 插槽自定义标题区域。

::: code-group

```html
<wd-navbar left-text="返回" right-text="设置" left-arrow>
  <template #title>
    <view class="search-box">
      <wd-search v-model="keyword" hide-cancel placeholder-left></wd-search>
    </view>
  </template>
</wd-navbar>
```

```scss
.search-box {
  display: flex;
  height: 100%;
  align-items: center;
  --wot-search-padding: 0;
  --wot-search-side-padding: 0;
  :deep() {
    .wd-search {
      background: transparent;
    }
  }
}
```

:::

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题文字 | `string` | - |
| left-text | 左侧文案 | `string` | - |
| right-text | 右侧文案 | `string` | - |
| left-arrow | 是否显示左侧箭头 | `boolean` | `false` |
| bordered | 是否显示下边框 | `boolean` | `false` |
| fixed | 是否固定到顶部 | `boolean` | `false` |
| placeholder | 固定在顶部时，在标签位置生成一个等高的占位元素 | `boolean` | `false` |
| z-index | 导航栏 z-index | `number` | `10` |
| safe-area-inset-top | 是否开启顶部安全区适配 | `boolean` | `false` |
| left-disabled | 是否禁用左侧按钮，禁用时透明度降低，且无法点击 | `boolean` | `false` |
| right-disabled | 是否禁用右侧按钮，禁用时透明度降低，且无法点击 | `boolean` | `false` |
| custom-class | 根节点样式类名 | `string` | - |
| custom-style | 根节点样式 | `string` | - |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| click-left | 点击左侧按钮时触发 | - |
| click-right | 点击右侧按钮时触发 | - |

## Slots

| name | 说明 |
| --- | --- |
| capsule | 自定义胶囊（当存在胶囊时，left 不生效） |
| left | 左侧内容 |
| title | 标题内容 |
| right | 右侧内容 |

## NavbarCapsule Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| custom-class | 根节点样式类名 | `string` | - |
| custom-style | 根节点样式 | `string` | - |

## NavbarCapsule Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| back | 点击返回按钮时触发 | - |
| back-home | 点击返回首页按钮时触发 | - |
