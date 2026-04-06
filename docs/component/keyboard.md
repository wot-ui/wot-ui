---
version: 1.3.10
---

# Keyboard 虚拟键盘

虚拟数字键盘，用于输入数字、密码、身份证或车牌号等场景。

## 基本用法

可以通过 `v-model:visible` 控制键盘是否展示。

```html
<wd-cell title="默认键盘" is-link @click="showKeyBoard" />

<wd-keyboard v-model:visible="visible" @input="onInput" @delete="onDelete"></wd-keyboard>
```

```ts
const { show: showToast } = useToast()
const visible = ref<boolean>(false)

function showKeyBoard() {
  visible.value = true
}

const onInput = (value) => showToast(`${value}`)
const onDelete = () => showToast('删除')
```

## 组件类型

### 带右侧栏的键盘

将 `mode` 属性设置为 `custom` 来展示键盘的右侧栏，常用于输入金额的场景。

```html
<wd-cell title="带右侧栏的键盘" is-link @click="showKeyBoard" />

<wd-keyboard v-model:visible="visible" mode="custom" extra-key="." close-text="完成" @input="onInput" @delete="onDelete"></wd-keyboard>
```

```ts
const { show: showToast } = useToast()
const visible = ref<boolean>(false)

function showKeyBoard() {
  visible.value = true
}

const onInput = (value) => showToast(`${value}`)
const onDelete = () => showToast('删除')
```

### 身份证键盘

通过 `extra-key` 属性可以设置左下角按键内容，比如需要输入身份证号时，可以将 `extra-key` 设置为 `X`。

```html
<wd-cell title="身份证键盘" is-link @click="showKeyBoard" />

<wd-keyboard v-model:visible="visible" extra-key="X" close-text="完成" @input="onInput" @delete="onDelete" />
```

```ts
const { show: showToast } = useToast()
const visible = ref<boolean>(false)

function showKeyBoard() {
  visible.value = true
}

const onInput = (value) => showToast(`${value}`)
const onDelete = () => showToast('删除')
```

### 车牌号键盘

将 `mode` 属性设置为 `car` 来展示车牌号键盘，常用于输入车牌号的场景。

```html
<wd-cell title="车牌号键盘" is-link @click="showKeyBoard" />

<wd-keyboard v-model:visible="visible" mode="car" @input="onInput" @delete="onDelete"></wd-keyboard>
```

```ts
const { show: showToast } = useToast()
const visible = ref<boolean>(false)

function showKeyBoard() {
  visible.value = true
}

const onInput = (value) => showToast(`${value}`)
const onDelete = () => showToast('删除')
```

## 组件变体

### 车牌号键盘语言控制

通过 `car-lang` 属性可以控制车牌键盘的语言模式，支持中文省份（`zh`）和英文字母（`en`）。通过 `auto-switch-lang` 属性可以控制是否自动切换语言。

```html
<!-- 受控模式：手动控制语言切换 -->
<wd-cell title="车牌号键盘（受控）" :value="value" is-link @click="showKeyBoard" />

<wd-keyboard v-model="value" v-model:visible="visible" v-model:car-lang="lang" mode="car" @input="onInput" @delete="onDelete"></wd-keyboard>

<!-- 非受控模式：启用自动切换 -->
<wd-cell title="车牌号键盘（非受控）" :value="value2" is-link @click="showKeyBoard2" />

<wd-keyboard v-model="value2" v-model:visible="visible2" mode="car" auto-switch-lang @input="onInput" @delete="onDelete"></wd-keyboard>
```

```ts
const { show: showToast } = useToast()
const visible = ref<boolean>(false)
const visible2 = ref<boolean>(false)
const value = ref<string>('')
const value2 = ref<string>('')
const lang = ref<'zh' | 'en'>('zh')

function showKeyBoard() {
  visible.value = true
}

function showKeyBoard2() {
  visible2.value = true
}

const onInput = (value) => showToast(`${value}`)
const onDelete = () => showToast('删除')
```

### 带标题的键盘

通过 `title` 属性可以设置键盘标题。

```html
<wd-cell title="带标题的键盘" is-link @click="showKeyBoard" />

<wd-keyboard v-model:visible="visible" title="输入密码" extra-key="." close-text="完成" @input="onInput" @delete="onDelete" />
```

```ts
const { show: showToast } = useToast()
const visible = ref<boolean>(false)

function showKeyBoard() {
  visible.value = true
}

const onInput = (value) => showToast(`${value}`)
const onDelete = () => showToast('删除')
```

### 使用 slot 自定义标题

```html
<wd-cell title="使用 slot 自定义标题" is-link @click="showKeyBoard" />

<wd-keyboard v-model:visible="visible" extra-key="." close-text="完成" @input="onInput" @delete="onDelete">
  <template #title>
    <text style="color: red">自定义标题</text>
  </template>
</wd-keyboard>
```

```ts
const { show: showToast } = useToast()
const visible = ref<boolean>(false)

function showKeyBoard() {
  visible.value = true
}

const onInput = (value) => showToast(`${value}`)
const onDelete = () => showToast('删除')
```

### 多个额外按键

当 `mode` 为 `custom` 时，支持以数组的形式配置两个 `extra-key`。

```html
<wd-cell title="多个额外按键" is-link @click="showKeyBoard" />

<wd-keyboard v-model:visible="visible" mode="custom" :extra-key="['00', '.']" close-text="完成" @input="onInput" @delete="onDelete" />
```

```ts
const { show: showToast } = useToast()
const visible = ref<boolean>(false)

function showKeyBoard() {
  visible.value = true
}

const onInput = (value) => showToast(`${value}`)
const onDelete = () => showToast('删除')
```

### 随机数字键盘

通过 `random-key-order` 属性可以随机排序数字键盘，常用于安全等级较高的场景。

```html
<wd-cell title="随机数字键盘" is-link @click="showKeyBoard" />

<wd-keyboard v-model:visible="visible" random-key-order @input="onInput" @delete="onDelete" />
```

```ts
const { show: showToast } = useToast()
const visible = ref<boolean>(false)

function showKeyBoard() {
  visible.value = true
}

const onInput = (value) => showToast(`${value}`)
const onDelete = () => showToast('删除')
```

## 特殊用法

### 双向绑定

可以通过 `v-model` 绑定键盘当前输入值，并通过 `maxlength` 属性来限制输入长度。

```html
<wd-cell title="双向绑定" :value="value1" is-link @click="showKeyBoard" />
<wd-keyboard
  v-model="value1"
  :maxlength="6"
  v-model:visible="visible"
  title="键盘标题"
  extra-key="."
  close-text="完成"
  @input="onInput"
  @delete="onDelete"
></wd-keyboard>
```

```ts
const { show: showToast } = useToast()
const visible = ref<boolean>(false)
const value1 = ref<string>('')

function showKeyBoard() {
  visible.value = true
}

const onInput = (value) => showToast(`${value}`)
const onDelete = () => showToast('删除')
```

### 展示蒙层遮罩

`hideOnClickOutside`控制键盘弹窗是否有遮罩，通过`modal`控制遮罩是否为透明。

::: tip 提示
当前`modal`仅控制遮罩是否为透明，`hideOnClickOutside`控制弹窗是否有遮罩，当存在遮罩时，点击遮罩就可以关闭键盘，但是键盘展开时必须点击遮罩关闭当前键盘后才可以再点击别的按钮。也可以关闭`hideOnClickOutside`，手动控制键盘是否展示来实现点击外部时收起键盘，这样更灵活。
:::

```html
<wd-cell title="双向绑定" :value="value1" is-link @click="showKeyBoard" />
<wd-keyboard :modal="true" :hide-on-click-outside="true" v-model:visible="visible" @input="onInput" @delete="onDelete" />
```

```ts
const { show: showToast } = useToast()
const visible = ref<boolean>(false)
const value1 = ref<string>('')

function showKeyBoard() {
  visible.value = true
}

const onInput = (value) => showToast(`${value}`)
const onDelete = () => showToast('删除')
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model:visible | 是否展开 | `boolean` | `false` |
| v-model | 当前输入值 | `string` | `''` |
| title | 键盘标题 | `string` | - |
| mode | 键盘模式，可选值为 `default`、`custom`、`car` | `KeyboardMode` | `default` |
| z-index | 层级 | `number` | `100` |
| maxlength | 最大输入长度 | `number` | `Infinity` |
| show-delete-key | 是否显示删除键；仅对默认数字键盘与右侧栏键盘生效 | `boolean` | `true` |
| random-key-order | 是否随机排序数字按键 | `boolean` | `false` |
| close-text | 关闭按钮文本；在默认/车牌模式中显示在头部，在 `custom` 模式中显示在右侧大按钮上 | `string` | - |
| delete-text | 删除按钮文本 | `string` | - |
| close-button-loading | 关闭按钮是否显示加载状态 | `boolean` | `false` |
| modal | 是否显示蒙层；设为 `false` 时蒙层透明 | `boolean` | `false` |
| hide-on-click-outside | 是否允许点击外部关闭键盘，同时控制是否渲染遮罩 | `boolean` | `true` |
| lock-scroll | 是否锁定背景滚动 | `boolean` | `true` |
| safe-area-inset-bottom | 是否适配底部安全区 | `boolean` | `true` |
| extra-key | 额外按键，可传单个字符串或字符串数组；`custom` 模式下支持两个额外按键 | `string \| string[]` | - |
| root-portal | 是否从页面中脱离出来，用于解决 fixed 失效问题 | `boolean` | `false` |
| v-model:car-lang | 车牌键盘语言模式，当 `mode=car` 时生效，可选值为 `zh`、`en` | `CarKeyboardLang` | - |
| auto-switch-lang | 是否自动切换车牌键盘语言，当 `mode=car` 且 `car-lang` 为非受控状态时生效 | `boolean` | `false` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## Slots

| 名称 | 说明 |
| --- | --- |
| title | 自定义标题内容 |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| input | 点击可输入按键时触发 | `key: string` |
| delete | 点击删除键时触发 | - |
| close | 点击关闭按钮或遮罩关闭时触发 | - |
| update:visible | 键盘显隐状态变化时触发 | `visible: boolean` |
| update:modelValue | 当前输入值变化时触发 | `value: string` |
| update:carLang | 车牌键盘语言变化时触发 | `lang: 'zh' \| 'en'` |

## 外部样式类

| 类名 | 说明 |
| --- | --- |
| custom-class | 根节点样式类 |
| custom-style | 根节点样式 |
