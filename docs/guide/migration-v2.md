---
version: New
---
# 从 v1 迁移到 v2

本文介绍如何将项目从 `Wot UI v1` 迁移到 `Wot UI v2`。

`v2` 不只是包名升级，也包含表单校验体系、主题变量、部分组件命名和工程配置的调整。迁移时建议先完成依赖和路径替换，再处理 `Form`、`Dialog`、`Cascader` 等高影响组件，最后做样式和平台回归。

## 迁移概览

| 类型 | v1 | v2 |
| --- | --- | --- |
| npm 包名 | `wot-design-uni` | `@wot-ui/ui` |
| uni_modules 目录 | `wot-design-uni` | `wot-ui` |
| 组合式函数导入 | `@/uni_modules/wot-design-uni` | `@/uni_modules/wot-ui` |
| 弹框组件 | `wd-message-box` | `wd-dialog` |
| 弹框 Hook | `useMessage` | `useDialog` |
| 缺省提示 | `wd-status-tip` | `wd-empty` |
| 多列选择器 | `wd-col-picker` | `wd-cascader` |
| 表单校验 | `rules` / `FormRules` | `schema` / `FormSchema` |
| 按钮变体 | `plain` / `type="text"` / `type="icon"` | `variant` / 图标按钮 |
| 标签变体 | `plain` | `variant="plain"` |
| 单选 / 复选形态 | `shape` / `inline` / `cell` | `type` / `direction` / 手动组合 `wd-cell` |
| 搜索框浅色样式 | `light` | `variant="light"` |
| GridItem 点击事件 | `itemclick` | `click` |
| 工具函数路径 | `components/common/util` | `common/util` |
| 主题系统 | CSS 变量覆盖 | Design Token 三层变量体系 |
| Sass | 建议锁定较低版本 | 推荐 `1.98` 及以上版本 |

::: warning 注意
`v2` 的组件命名、包名和部分 API 与 `v1` 不完全兼容。请不要只升级依赖版本，建议按本文的顺序逐项检查。
:::

## 升级前检查

升级前建议先在项目中搜索旧包名和旧组件：

```bash
rg "wot-design-uni|wd-message-box|useMessage|wd-status-tip|wd-col-picker|wd-number-keyboard|@itemclick|shape=|inline|\\scell\\b|\\slight\\b|type=\"error\"|type=\"icon\"|type=\"text\"|\\splain\\b|classPrefix|components/common/util|hide-label|hide-min-max|autoLineWidth|disabled-color|setRoate|useContentSlot|useMoreSlot|\\bshow="
```

如果项目中有表单页面，请额外搜索：

```bash
rg "wd-form|FormRules|:rules=|rules=|errorType|resetOnChange"
```

重点确认以下内容：

- 项目使用 `npm` 安装还是 `uni_modules` 安装。
- 是否在 `pages.json` 中配置了 `easycom`。
- 是否在 `tsconfig.json` 中配置了全局组件类型。
- 是否使用了 `MessageBox`、`StatusTip`、`ColPicker`、`NumberKeyboard`。
- 是否使用了 `Button` 的 `plain`、`type="error"`、`type="text"`、`type="icon"`。
- 是否使用了 `Tag` 的 `plain`。
- 是否使用了 `Radio` / `Checkbox` 的 `shape`、`inline`、`cell`、`icon-placement`。
- 是否使用了 `Search` 的 `light`。
- 是否监听了 `wd-grid-item` 的 `itemclick` 事件。
- 是否调用了 `PickerView`、`ImgCropper`、`CountTo` 等组件实例方法。
- 是否在 `Badge`、`Slider`、`Tabs`、`Rate`、`SlideVerify`、`Steps`、`Swiper` 等组件上使用了旧属性。
- 是否在 `Tooltip`、`Popover`、`Collapse` 等组件中使用了旧显隐属性或旧插槽开关。
- 是否有复杂表单、动态表单、隐藏字段校验或自定义校验规则。
- 是否覆盖过组件内部样式或自定义过主题变量。

## 安装迁移

### npm 安装

将旧包替换为新包：

::: code-group

```bash [npm]
npm remove wot-design-uni
npm i @wot-ui/ui
```

```bash [yarn]
yarn remove wot-design-uni
yarn add @wot-ui/ui
```

```bash [pnpm]
pnpm remove wot-design-uni
pnpm add @wot-ui/ui
```

:::

导入路径需要同步替换：

```ts
// v1
import { useToast } from 'wot-design-uni'

// v2
import { useToast } from '@wot-ui/ui'
```

### uni_modules 安装

如果你使用 `uni_modules`，需要将插件目录从 `wot-design-uni` 替换为 `wot-ui`。

```bash
uni_modules
└── wot-ui
```

导入路径需要同步替换：

```ts
// v1
import { useToast } from '@/uni_modules/wot-design-uni'

// v2
import { useToast } from '@/uni_modules/wot-ui'
```

## Sass 迁移

`v2` 推荐使用 `sass@^1.98.0`：

::: code-group

```bash [npm]
npm i sass@^1.98.0 -D
```

```bash [yarn]
yarn add sass@^1.98.0 -D
```

```bash [pnpm]
pnpm add sass@^1.98.0 -D
```

:::

升级 `sass` 后，项目中原有的业务样式也可能需要同步调整。新版 Sass 对旧语法和旧 API 的兼容提示更严格，如果你的项目中存在较早期的 Sass 写法，可能会在编译时出现警告或错误。

建议重点检查以下内容：

- 是否仍在使用 `@import` 引入 Sass 文件，必要时迁移为 `@use` 或 `@forward`。
- 是否依赖全局可见的变量、mixin 或 function。迁移到 `@use` 后，需要通过命名空间访问，或使用 `as *` 显式展开。
- 是否使用了旧的除法写法 `/`。如果用于数学计算，建议迁移为 `math.div()`。
- 是否调用了 Sass 废弃的内置函数或旧 API。
- 是否有第三方样式库锁定了较旧的 Sass 语法，需要同步升级对应依赖。

例如：

```scss
// 旧写法
@import './variables.scss';

.page {
  width: 100px / 2;
  color: $primary-color;
}
```

可以逐步迁移为：

```scss
@use 'sass:math';
@use './variables.scss' as *;

.page {
  width: math.div(100px, 2);
  color: $primary-color;
}
```

如果遇到 `legacy JS API` 相关警告，可以在 `vite.config.ts` 中配置：

```ts
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        silenceDeprecations: ['legacy-js-api']
      }
    }
  }
})
```

## 自动导入迁移

### easycom

如果你使用 `npm` 安装，并通过 `easycom` 自动引入组件，需要将路径改为新包名：

```json
{
  "easycom": {
    "autoscan": true,
    "custom": {
      "^wd-(.*)": "@wot-ui/ui/components/wd-$1/wd-$1.vue"
    }
  }
}
```

如果你使用 `uni_modules` 安装，一般不需要额外配置；如果项目中手动写过旧目录路径，也需要替换为 `@/uni_modules/wot-ui`。

### vite 插件自动导入

如果通过 `@uni-helper/vite-plugin-uni-components` 自动导入组件，可以使用项目内自定义 resolver：

```ts
import type { ComponentResolver } from '@uni-helper/vite-plugin-uni-components'
import { kebabCase } from '@uni-helper/vite-plugin-uni-components'

export function WotResolver(): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (name.match(/^Wd[A-Z]/)) {
        const compName = kebabCase(name)
        return {
          from: `@wot-ui/ui/components/${compName}/${compName}.vue`
        }
      }
    }
  }
}
```

### Volar 类型

`npm` 安装时，`tsconfig.json` 中的类型声明需要替换：

```json
{
  "compilerOptions": {
    "types": ["@wot-ui/ui/global"]
  }
}
```

## Form 表单迁移

`Form` 是 `v2` 中变化最大的组件之一。`v1` 更偏向“表单组件直接承载校验规则”，`v2` 则统一为 `wd-form`、`wd-form-item` 和 `schema` 校验模型。

### 基础结构迁移

`v1` 中，输入组件通常直接放在 `wd-form` 内，并在组件上声明 `prop` 和 `rules`：

```vue
<wd-form ref="form" :model="model" :rules="rules">
  <wd-input
    label="用户名"
    prop="username"
    v-model="model.username"
    :rules="[{ required: true, message: '请填写用户名' }]"
  />
</wd-form>
```

`v2` 推荐使用 `wd-form-item` 承载标题、布局、校验提示和点击行为，输入组件只负责输入：

```vue
<wd-form ref="form" :model="model" :schema="schema" :title-width="100">
  <wd-form-item title="用户名" prop="username">
    <wd-input v-model="model.username" placeholder="请填写用户名" />
  </wd-form-item>
</wd-form>
```

::: tip 提醒
`wd-form-item` 与 `input`、`textarea` 结合使用时，会自动开启 `input` 和 `textarea` 的 `compact` 属性。迁移后如果表单项高度或间距有变化，请优先检查这里。
:::

### 校验规则迁移

`v1` 使用 `rules`：

```ts
import type { FormRules } from '@/uni_modules/wot-design-uni/components/wd-form/types'

const rules: FormRules = {
  username: [
    {
      required: true,
      message: '请填写用户名'
    }
  ]
}
```

`v2` 使用 `schema`。如果你希望获得更好的类型推导，推荐使用 `zodAdapter`：

```ts
import { z } from 'zod'
import { zodAdapter } from '@/uni_modules/wot-ui'

const schema = zodAdapter(
  z.object({
    username: z.string().min(1, '请填写用户名')
  })
)
```

使用 `npm` 安装时，导入路径改为：

```ts
import { zodAdapter } from '@wot-ui/ui'
```

`Zod` 不会随组件库内置安装，需要自行安装：

::: code-group

```bash [npm]
npm i zod
```

```bash [yarn]
yarn add zod
```

```bash [pnpm]
pnpm add zod
```

:::

如果你不想引入 `Zod`，也可以手写 `FormSchema`：

```ts
import type { FormSchema } from '@/uni_modules/wot-ui/components/wd-form/types'

const schema: FormSchema = {
  validate(model) {
    const issues = []
    if (!model.username) {
      issues.push({ path: ['username'], message: '请填写用户名' })
    }
    return issues
  },
  isRequired(path: string) {
    return path === 'username'
  }
}
```

### 必填星号迁移

`v2` 中，必填星号和校验规则是两个概念。你可以通过以下方式控制星号：

- 在 `wd-form-item` 上设置 `required`。
- 在 `FormSchema` 中提供 `isRequired(path)`。
- 在 `zodAdapter` 的第二个参数中提供 `isRequired(path)`。

```ts
const schema = zodAdapter(
  z.object({
    username: z.string().min(1, '请填写用户名')
  }),
  {
    isRequired(path: string) {
      return path === 'username'
    }
  }
)
```

如果迁移后校验正常但星号没有显示，请优先检查 `required` 或 `isRequired`。

### 选择器表单项迁移

`v1` 中，`Input`、`Textarea`、`Picker`、`Calendar`、`DatetimePicker`、`SelectPicker`、`ColPicker` 等组件经常直接作为表单项使用，组件自身支持 `label`、`label-width`、`prop`、`rules` 等表单相关属性：

```vue
<wd-col-picker
  label="地址"
  prop="address"
  v-model="model.address"
  :columns="area"
/>
```

`v2` 中，表单结构统一收口到 `wd-form-item`。输入组件和弹层选择器不再承担表单标题、校验展示和触发入口的职责，迁移时需要将 `label`、`label-width`、`prop`、`rules` 等配置迁移到 `wd-form`、`wd-form-item` 或 `schema`。

对于弹层选择器，推荐将选择器和表单展示拆开：选择器负责选择，`wd-form-item` 负责展示当前值、打开弹层和显示校验状态。

```vue
<wd-cascader
  v-model="model.address"
  v-model:visible="showAddressPicker"
  :options="area"
  @confirm="handleAddressConfirm"
/>

<wd-form-item
  title="地址"
  prop="address"
  is-link
  :value="addressText"
  placeholder="请选择地址"
  @click="showAddressPicker = true"
/>
```

```ts
import type { CascaderOption } from '@/uni_modules/wot-ui/components/wd-cascader/types'

const showAddressPicker = ref(false)
const addressText = ref('')

function handleAddressConfirm({ selectedOptions }: { selectedOptions: CascaderOption[] }) {
  addressText.value = selectedOptions.map((item) => item.text).join('/')
}
```

::: tip 提醒
选择类组件迁移后，请检查 `model` 保存的是组件值，还是用于展示的文本。`wd-form-item` 的 `value` 通常用于展示文本，不一定等同于提交给后端的字段值。
:::

### 布局属性迁移

`v2` 的 `Form` 和 `FormItem` 提供了更多布局能力，原来散落在各输入组件上的布局配置，可以优先上移到 `wd-form` 或 `wd-form-item`：

```vue
<wd-form
  :model="model"
  :schema="schema"
  :title-width="100"
  layout="horizontal"
  value-align="left"
  border
  asterisk-position="end"
>
  <wd-form-item title="用户名" prop="username">
    <wd-input v-model="model.username" />
  </wd-form-item>
</wd-form>
```

常用布局属性包括：

| 属性 | 说明 |
| --- | --- |
| `border` | 是否展示边框线 |
| `center` | 是否使内容垂直居中 |
| `size` | 单元格大小 |
| `title-width` | 左侧标题宽度 |
| `layout` | 表单项布局，可选 `horizontal`、`vertical` |
| `value-align` | 右侧内容对齐方式 |
| `asterisk-position` | 必填星号位置 |
| `hide-asterisk` | 是否隐藏必填星号 |
| `ellipsis` | 是否超出隐藏显示省略号 |

### 校验触发迁移

`v2` 支持通过 `validate-trigger` 控制校验触发时机：

```vue
<wd-form :model="model" :schema="schema" validate-trigger="change">
  <wd-form-item title="用户名" prop="username" validate-trigger="blur">
    <wd-input v-model="model.username" />
  </wd-form-item>
</wd-form>
```

`validate` 方法仍然支持校验全部字段、单个字段或多个字段：

```ts
await form.value?.validate()
await form.value?.validate('username')
await form.value?.validate(['username', 'password'])
```

### Form 迁移清单

- 将直接挂在输入组件上的 `prop`、`rules` 迁移到 `wd-form-item` 和 `schema`。
- 将 `rules` / `FormRules` / `FormItemRule` 替换为 `schema` / `FormSchema`。
- 如果使用 `Zod`，安装 `zod` 并通过 `zodAdapter` 转换校验规则。
- 检查必填星号是否需要通过 `required` 或 `isRequired` 单独控制。
- 将 `errorType` 改为 `error-type`，`resetOnChange` 改为 `reset-on-change`。
- 将 `ColPicker` 场景迁移为 `Cascader`，并确认回显文本和提交值。
- 检查动态字段、隐藏字段、数组字段和异步校验。
- 检查 `validate()`、`validate(prop)`、`reset()` 的调用是否仍符合业务预期。

## 组件迁移

### 模板属性命名

`v2` 文档中的模板示例统一使用 kebab-case 属性名。迁移时建议将模板中的 camelCase 写法同步调整，尤其是直接从旧文档复制过来的代码。

```vue
<!-- v1 中常见写法 -->
<wd-toast :zIndex="1000" classPrefix="custom" />
<wd-count-to :startVal="0" :endVal="100" />

<!-- v2 推荐写法 -->
<wd-toast :z-index="1000" class-prefix="custom" />
<wd-count-to :start-val="0" :end-val="100" />
```

常见属性包括 `z-index`、`class-prefix`、`custom-class`、`custom-style`、`safe-area-inset-bottom`、`start-val`、`end-val`、`auto-start`、`use-easing` 等。

### MessageBox 迁移为 Dialog

`v1`：

```vue
<wd-message-box />
```

```ts
import { useMessage } from '@/uni_modules/wot-design-uni'

const message = useMessage()
message.confirm({
  title: '提示',
  msg: '确认删除？'
})
```

`v2`：

```vue
<wd-dialog />
```

```ts
import { useDialog } from '@/uni_modules/wot-ui'

const dialog = useDialog()
dialog.confirm({
  title: '提示',
  msg: '确认删除？'
})
```

如果页面中存在多个弹框实例，请继续使用 `selector` 区分：

```vue
<wd-dialog selector="delete-dialog" />
```

```ts
const dialog = useDialog('delete-dialog')
```

`Dialog` 相比 `MessageBox` 还有以下行为差异需要检查：

- `closeOnClickModal` 默认值从 `true` 调整为 `false`，如果仍希望点击遮罩关闭，需要显式设置。
- `Prompt` 的返回值是 `DialogResult`，读取输入内容时通常使用 `res.value`。
- `inputType`、`inputPlaceholder` 等扁平配置推荐迁移到 `inputProps`；多行输入可以使用 `textareaProps`。
- 确认、取消按钮的高级配置使用 `confirmButtonProps`、`cancelButtonProps`，多按钮场景使用 `actions`。

```ts
dialog.prompt({
  title: '请输入手机号',
  inputProps: {
    type: 'tel',
    placeholder: '请输入 11 位手机号'
  }
}).then((res) => {
  console.log(res.value)
})
```

### Button 迁移

`v2` 对按钮类型和变体做了拆分。迁移时建议重点检查 `type`、`plain`、`round` 和图标按钮。

| v1 | v2 |
| --- | --- |
| `type="error"` | `type="danger"` |
| `plain` | `variant="plain"` |
| `type="text"` | `variant="text"` |
| `type="icon" icon="xxx"` | 只传 `icon="xxx"` |
| `classPrefix` | 模板中推荐写作 `class-prefix` |

```vue
<!-- v1 -->
<wd-button type="error" plain>删除</wd-button>
<wd-button type="text">文字按钮</wd-button>
<wd-button type="icon" icon="picture" />
```

```vue
<!-- v2 -->
<wd-button type="danger" variant="plain">删除</wd-button>
<wd-button variant="text">文字按钮</wd-button>
<wd-button icon="image" />
```

::: tip 提醒
`v2` 中 `Button` 的 `round` 默认值为 `false`，并且按钮高度由固定高度控制。如果项目依赖 `v1` 的圆角外观或通过内边距撑开的高度，需要做视觉回归。
:::

### Tag 迁移

`v2` 的 `Tag` 使用 `variant` 表达视觉变体，`plain` 需要迁移为 `variant="plain"`。

```vue
<!-- v1 -->
<wd-tag plain>标签</wd-tag>
<wd-tag mark plain>标签</wd-tag>
```

```vue
<!-- v2 -->
<wd-tag variant="plain">标签</wd-tag>
<wd-tag mark variant="plain">标签</wd-tag>
```

如果你在数据中维护标签配置，也需要同步调整：

```ts
// v1
const tag = { type: 'primary', plain: true }

// v2
const tag = { type: 'primary', variant: 'plain' }
```

### Radio 和 Checkbox 迁移

`v2` 对 `Radio`、`Checkbox` 的形态、排列和列表模式做了统一，旧的 `shape`、`inline`、`cell` 需要迁移。

| v1 | v2 |
| --- | --- |
| `shape="check"` | `type="circle"` |
| `shape="dot"` | `type="dot"` |
| `shape="button"` | `type="button"` |
| `shape="square"` | `type="square"` |
| `inline` | `direction="horizontal"` |
| `icon-placement="left/right"` | `placement="left/right"` |
| `cell` | 手动组合 `wd-cell` |

```vue
<!-- v1 -->
<wd-radio-group v-model="value" shape="button" inline>
  <wd-radio :value="1">选项一</wd-radio>
  <wd-radio :value="2">选项二</wd-radio>
</wd-radio-group>

<!-- v2 -->
<wd-radio-group v-model="value" type="button" direction="horizontal">
  <wd-radio :value="1">选项一</wd-radio>
  <wd-radio :value="2">选项二</wd-radio>
</wd-radio-group>
```

`v1` 的 `cell` 模式在 `v2` 中不再作为 `RadioGroup` / `CheckboxGroup` 的内置属性提供。需要整行点击时，请将选项放入 `wd-cell` 中，并在 `wd-cell` 的点击事件里更新值或调用组件实例方法。

```vue
<wd-radio-group v-model="value">
  <wd-cell-group border>
    <wd-cell title="选项一" clickable @click="value = 1">
      <template #right-icon>
        <wd-radio :value="1" />
      </template>
    </wd-cell>
  </wd-cell-group>
</wd-radio-group>
```

`Checkbox` 迁移时还需要注意：在 `CheckboxGroup` 中选项值使用 `name` 表达，单独使用 `wd-checkbox` 时才使用 `v-model`、`true-value`、`false-value` 管理选中和未选中值。

### Search 迁移

`v1` 的 `light` 布尔属性在 `v2` 中迁移为 `variant="light"`。

```vue
<!-- v1 -->
<wd-search light />

<!-- v2 -->
<wd-search variant="light" />
```

如果使用了右侧输入框插槽，`v2` 推荐直接使用 `input-suffix`、`suffix` 等具名插槽，不再通过已废弃的 `use-suffix-slot` 控制。

### Cell、Input 和 Textarea 迁移

`v1` 中 `Cell`、`Input`、`Textarea` 曾承担一部分表单项职责，常见属性包括 `prop`、`rules`、`label`、`label-width`、`required`、`marker-side`、`no-border` 等。`v2` 中这些职责需要迁移到 `wd-form-item`、`wd-form` 或 `schema`。

```vue
<!-- v1 -->
<wd-input label="用户名" prop="username" v-model="model.username" required />

<!-- v2 -->
<wd-form-item title="用户名" prop="username" required>
  <wd-input v-model="model.username" />
</wd-form-item>
```

`Cell` 自身的图标和布局属性也有调整：

| v1 | v2 |
| --- | --- |
| `icon` | `prefix-icon` |
| `custom-icon-class` | `custom-prefix-class` 或 `custom-suffix-class` |
| `vertical` | `layout="vertical"` |
| `marker-side` | `asterisk-position` |

`Input`、`Textarea` 放入 `wd-cell` 或 `wd-form-item` 时，建议使用 `compact` 移除组件自身的内边距和背景；在 `wd-form-item` 中会自动开启。

### Fab 迁移

`Fab` 的主题类型与 `Button` 保持一致，旧的 `type="error"` 需要改为 `type="danger"`。

```vue
<!-- v1 -->
<wd-fab type="error" :zIndex="99" inactiveIcon="plus" activeIcon="close" />

<!-- v2 -->
<wd-fab type="danger" :z-index="99" inactive-icon="plus" active-icon="close" />
```

如果 `Fab` 插槽内的按钮仍使用 `type="error"`，也需要同步迁移为 `type="danger"`。

### Grid 迁移

`wd-grid-item` 的点击事件从 `itemclick` 调整为 `click`。

```vue
<!-- v1 -->
<wd-grid clickable>
  <wd-grid-item text="开始" icon="play-circle-stroke" @itemclick="start" />
</wd-grid>
```

```vue
<!-- v2 -->
<wd-grid clickable>
  <wd-grid-item text="开始" icon="play-circle-stroke" @click="start" />
</wd-grid>
```

::: tip 提醒
`wd-grid-item` 需要配合父级 `wd-grid` 的 `clickable` 使用，未开启 `clickable` 时不会触发点击逻辑。
:::

### StatusTip 迁移为 Empty

`v2` 使用 `wd-empty` 表达空状态、网络异常、无结果等场景：

```vue
<wd-empty icon="no-result" tip="当前搜索无结果" />
<wd-empty icon="no-wifi" tip="当前网络不可用，请检查你的网络设置" />
<wd-empty icon="no-content" tip="暂无内容" />
```

如果 `v1` 中使用了自定义图片或底部操作区，可以迁移到 `wd-empty` 的插槽：

```vue
<wd-empty icon="no-content" tip="暂无内容">
  <wd-button type="primary">重新加载</wd-button>
</wd-empty>
```

### ColPicker 迁移为 Cascader

`v2` 使用 `wd-cascader` 替代 `wd-col-picker`。迁移时需要重点检查数据结构、异步加载和回显逻辑。

```vue
<wd-cascader
  v-model="model.address"
  v-model:visible="showAddressPicker"
  :options="area"
  @confirm="handleAddressConfirm"
/>
```

`Cascader` 的选项支持通过 `value-key`、`text-key`、`children-key` 等属性适配自定义字段。迁移 `ColPicker` 的 `column-change` 逻辑时，可以改用 `lazy-load`。

### Picker、Calendar 和 DatetimePicker 触发方式

`v2` 中，`Picker`、`SelectPicker`、`Calendar`、`DatetimePicker` 等弹层选择器更偏向纯选择器职责，不再把外层触发单元格作为主要结构。旧代码中如果直接依赖这些组件的 `label`、`label-width`、`prop`、`rules` 等表单项能力，建议迁移为 `wd-cell` 或 `wd-form-item` 负责触发和展示。

```vue
<wd-picker v-model="model.type" v-model:visible="showTypePicker" :columns="typeList" />

<wd-form-item
  title="类型"
  prop="type"
  is-link
  :value="typeText"
  placeholder="请选择类型"
  @click="showTypePicker = true"
/>
```

### CountTo 迁移

`v2` 中 `CountTo` 的主题类型为 `default`、`primary`、`success`、`warning`、`error`。如果旧代码使用了 `type="info"`，需要替换为其他主题或通过 `color` 自定义颜色。

```vue
<!-- v1 -->
<wd-count-to type="info" :startVal="0" :endVal="888888" :autoplay="false" fontSize="24px" />

<!-- v2 -->
<wd-count-to type="primary" :start-val="0" :end-val="888888" :auto-start="false" custom-style="font-size: 24px;" />
```

在模板中也建议统一使用 kebab-case 属性，如 `start-val`、`end-val`、`auto-start`。如果旧代码使用 `fontSize` 控制字号，`v2` 可改为 `custom-style`、`custom-class` 或外层样式控制。

### Segmented 迁移

`v2` 的 `Segmented` 使用 `theme` 控制样式，不再提供 `size`。如果旧代码使用 `size="large"` 或 `size="small"`，需要按设计稿通过外层样式、`custom-class` 或组件变量调整尺寸。

```vue
<!-- v1 -->
<wd-segmented :options="list" v-model:value="current" size="large" />

<!-- v2 -->
<wd-segmented :options="list" v-model:value="current" theme="card" />
```

`vibrateShort` 在模板中建议改为 `vibrate-short`。

### PickerView 迁移

`PickerView` 的级联模型变化较大。`v1` 常通过 `column-change` 和实例方法 `setColumnData` 动态修改列数据，`v2` 推荐使用 `cascade` 和树形 `columns` 数据。

```vue
<!-- v2 -->
<wd-picker-view v-model="value" :columns="columns" cascade />
```

实例方法也有命名调整：

| v1 | v2 |
| --- | --- |
| `getLabels()` | `getSelectedLabels()` |
| `setColumnData()` | 使用 `cascade` 树形数据，或通过 `resetColumns()` 重置列数据 |
| `getColumnData()` | `getColumnData()` 保留 |
| `resetColumns()` | `resetColumns()` 保留 |

`v2` 的 `v-model` 推荐始终使用数组形式保存选中值，单列选择也建议写成 `['value']`。

### ImgCropper 迁移

如果项目中通过组件实例调用图片裁剪方法，需要将拼写错误的 `setRoate` 改为 `setRotate`。

```ts
// v1
cropper.value?.setRoate(90)

// v2
cropper.value?.setRotate(90)
```

### 更多组件迁移补充

下面这些组件的变化相对分散，但如果项目中用到对应旧属性，也需要一起调整。

| 组件 | v1 | v2 |
| --- | --- | --- |
| `Badge` | `v-model` / `modelValue` | `value` |
| `Slider` | 数组值自动双滑块 | 需要显式设置 `range` |
| `Slider` | `hide-label` | 使用 `popover-visible="never"` 隐藏气泡 |
| `Slider` | `hide-min-max` | 使用 `show-extreme-value` 控制是否展示极值 |
| `Tabs` | `autoLineWidth` | `line-theme="text"` |
| `Rate` | `disabled-color` | 通过 `color`、`active-color` 或自定义样式处理禁用态视觉 |
| `SlideVerify` | `width` / `height` | 通过外层容器、`custom-style` 或样式类控制尺寸 |
| `Steps` | `title-slot` / `description-slot` / `icon-slot` | 直接使用 `title`、`description`、`icon` 插槽 |
| `Swiper` | `pagination-position` | `indicator-position` |
| `DatetimePickerView` | `columns-height` | `item-height` / `visible-item-count` |

```vue
<!-- Badge -->
<wd-badge :value="12" />

<!-- Slider -->
<wd-slider v-model="rangeValue" range show-extreme-value popover-visible="never" />

<!-- Tabs -->
<wd-tabs v-model="tab" line-theme="text" />
```

`DatetimePickerView` 的 `loading`、`loading-color` 不再作为视图组件属性提供；如果旧页面依赖加载态，建议在外层自行控制 loading 展示，再渲染选择器。

`Swiper` 的指示器能力也做了收口，数字、点状、点条状等样式优先通过 `indicator` 配置，位置使用 `indicator-position`：

```vue
<wd-swiper
  v-model:current="current"
  :list="list"
  :indicator="{ type: 'fraction' }"
  indicator-position="bottom-right"
/>
```

### Tooltip、Popover 和 Collapse 迁移

`Tooltip` 的受控显隐从旧的 `show` 属性收口到 `v-model` / `model-value`。

```vue
<!-- v1 -->
<wd-tooltip :show="show" content="提示内容">
  <wd-button>提示</wd-button>
</wd-tooltip>

<!-- v2 -->
<wd-tooltip v-model="show" content="提示内容">
  <wd-button>提示</wd-button>
</wd-tooltip>
```

`Tooltip`、`Popover` 使用 `content` 插槽时，不再需要旧的 `useContentSlot` 开关。迁移后如果插槽内容尺寸会动态变化，可以通过实例方法 `updatePosition()` 重新计算定位。

```vue
<wd-popover v-model="showPopover" ref="popoverRef">
  <template #content>
    <view>自定义内容</view>
  </template>
  <wd-button>打开</wd-button>
</wd-popover>
```

`Collapse` 的绑定值从旧的 `value` 属性迁移为 `v-model`。如果使用查看更多模式，自定义 `more` 插槽时模板属性推荐写作 `use-more-slot`。

```vue
<!-- v1 -->
<wd-collapse :value="active" useMoreSlot>
  ...
</wd-collapse>

<!-- v2 -->
<wd-collapse v-model="active" use-more-slot>
  ...
</wd-collapse>
```

### NumberKeyboard

`v2` 不再提供独立的 `wd-number-keyboard`。如果项目中依赖该组件，可以优先评估迁移到 `wd-keyboard`：

```vue
<wd-keyboard v-model="value" v-model:visible="visible" mode="custom" extra-key="." close-text="完成" />
```

车牌号、身份证、随机数字键盘等场景也由 `wd-keyboard` 承载。迁移时请重点检查 `visible`、`v-model`、`extra-key`、`close-text`、`random-key-order`、`safe-area-inset-bottom` 等属性和事件。

### 新增预览组件

`v2` 新增了图片和视频预览能力：

- [ImagePreview 图片预览](/component/image-preview)
- [VideoPreview 视频预览](/component/video-preview)
- [useImagePreview](/component/use-image-preview)
- [useVideoPreview](/component/use-video-preview)

如果项目中原来直接调用 `uni.previewImage` 或维护自定义视频预览层，可以按需迁移到这些组件。

## 工具函数和类型导入迁移

如果项目中直接引用了组件库内部工具函数，路径需要同步调整：

```ts
// v1
import { isArray, getRect, pause } from '@/uni_modules/wot-design-uni/components/common/util'

// v2
import { isArray, getRect, pause } from '@/uni_modules/wot-ui/common/util'
```

`npm` 安装时，可以从包内路径导入：

```ts
import { isArray, getRect, pause } from '@wot-ui/ui/common/util'
```

也可以从包入口使用 `CommonUtil` 命名空间：

```ts
import { CommonUtil } from '@wot-ui/ui'

CommonUtil.isArray([])
```

组件类型导入也需要替换包名或目录名：

```ts
// v1
import type { UploadFileItem } from '@/uni_modules/wot-design-uni/components/wd-upload/types'

// v2
import type { UploadFileItem } from '@/uni_modules/wot-ui/components/wd-upload/types'
```

## 图标迁移

`v2` 对图标示例和部分组件默认图标做了调整。迁移后如果页面出现空图标、图标名称不匹配或视觉含义不一致，请优先检查 `icon`、`prefix-icon`、`suffix-icon`、`class-prefix`、`css-icon` 等配置。

常见场景包括：

- `Button` 旧的 `type="icon"` 需要改为直接传 `icon`。
- 自定义图标类名前缀在模板中推荐使用 `class-prefix`。
- 旧示例中的部分图标名可能需要替换为 `v2` 图标文档中存在的名称。

## 主题与深色模式迁移

`v2` 的主题系统基于 Design Token，推荐优先覆盖语义变量，再按需覆盖组件变量。

如果使用深色模式或主题变量，需要在入口样式中引入主题文件：

::: code-group

```scss [npm]
@use '@wot-ui/ui/styles/theme/index.scss' as *;
```

```scss [uni_modules]
@use '@/uni_modules/wot-ui/styles/theme/index.scss' as *;
```

:::

全局品牌色建议覆盖语义变量：

```scss
page,
.wd-root-portal {
  --wot-primary-5: #4096ff;
  --wot-primary-6: #1677ff;
  --wot-primary-7: #0958d9;
}
```

局部主题建议使用 [ConfigProvider 全局配置](/component/config-provider)：

```vue
<wd-config-provider :theme-vars="themeVars">
  <wd-button type="primary">提交</wd-button>
</wd-config-provider>
```

更多主题说明请参考 [定制主题](/guide/custom-theme) 和 [深色模式](/guide/dark-mode)。

## 样式覆盖迁移

`v2` 推荐按以下优先级覆盖样式：

1. 优先使用组件提供的 `custom-class`、`custom-style`。
2. 需要统一品牌视觉时，优先覆盖 CSS 变量。
3. 页面内覆盖组件样式时，普通样式可以直接使用 `.wd-*` 类名。
4. 在 `scoped` 样式中覆盖组件内部样式时，使用 `:deep()`。
5. 在自定义组件内覆盖小程序组件样式时，检查 `styleIsolation: 'shared'`。

```css
:deep(.wd-button) {
  font-weight: 600;
}
```

更多说明请参考 [样式覆盖](/guide/custom-style)。

## 国际化迁移

如果使用 `npm` 安装，并配置过 Vite 预构建排除，需要将旧包名替换为新包名：

```ts
export default defineConfig({
  optimizeDeps: {
    exclude: ['@wot-ui/ui']
  }
})
```

导入路径同步替换：

```ts
import { Locale } from '@wot-ui/ui'
import enUS from '@wot-ui/ui/locale/lang/en-US'
```

`uni_modules` 安装时：

```ts
import { Locale } from '@/uni_modules/wot-ui/locale'
import enUS from '@/uni_modules/wot-ui/locale/lang/en-US'
```

## 回归测试清单

迁移完成后，建议至少检查以下内容：

- `H5` 和目标小程序端是否能正常编译。
- `easycom` 是否能正确解析所有 `wd-*` 组件。
- `Toast`、`Dialog`、`Notify` 等函数式调用组件是否已经在页面中声明实例。
- 表单提交、单字段校验、重置、隐藏字段和异步校验是否正常。
- 选择器类表单项的回显文本和提交值是否正确。
- `Button` 的 `type`、`variant`、`round` 和高度是否符合预期。
- `Tag` 的 `variant` 是否已从旧的 `plain` 迁移。
- `Radio` / `Checkbox` 的 `shape`、`inline`、`cell` 是否已迁移。
- `Search` 的 `light` 是否已迁移为 `variant="light"`。
- `GridItem` 点击事件是否已从 `itemclick` 迁移到 `click`。
- `Cell`、`Input`、`Textarea` 的表单相关属性是否已迁移到 `wd-form-item`。
- `PickerView`、`ImgCropper`、`CountTo` 等实例方法是否仍可正常调用。
- `Badge`、`Slider`、`Tabs`、`Steps`、`Swiper` 等旧属性是否已迁移。
- `Dialog` 点击遮罩关闭、Prompt 返回值和按钮配置是否符合预期。
- 深色模式、主题变量、品牌色覆盖是否生效。
- 弹层、遮罩、`Popup`、`DropMenu`、`ActionSheet` 在小程序端是否存在样式隔离问题。
- 自定义覆盖样式是否仍然生效。
- 图标名称是否仍然存在，按钮高度变化是否影响页面布局。

## 推荐迁移顺序

1. 升级依赖和 `sass`。
2. 替换包名、目录名和导入路径。
3. 更新 `easycom`、Volar、国际化配置。
4. 优先迁移 `Form` 页面。
5. 替换 `MessageBox`、`StatusTip`、`ColPicker`、`NumberKeyboard` 等组件。
6. 检查 `Button`、`Tag`、`Radio`、`Checkbox`、`Search`、`GridItem`、`CountTo`、`Slider`、`Tabs` 等 API 变化。
7. 迁移主题变量和样式覆盖。
8. 在 `H5` 和目标小程序端做完整回归。

如果你的项目表单页面很多，建议先挑一个复杂表单完成迁移样板，再批量迁移其他页面。
