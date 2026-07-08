# Migrating from v1 to v2

This guide explains how to migrate your project from `Wot UI v1` to `Wot UI v2`.

`v2` is not just a package name upgrade — it also includes changes to the form validation system, theme variables, some component naming, and project configuration. It is recommended to complete dependency and path replacements first, then handle high-impact components like `Form`, `Dialog`, and `Cascader`, and finally do style and platform regression testing.

## Migration Overview

| Type | v1 | v2 |
| --- | --- | --- |
| npm package | `wot-design-uni` | `@wot-ui/ui` |
| uni_modules directory | `wot-design-uni` | `wot-ui` |
| Composable imports | `@/uni_modules/wot-design-uni` | `@/uni_modules/wot-ui` |
| Dialog component | `wd-message-box` | `wd-dialog` |
| Dialog Hook | `useMessage` | `useDialog` |
| Empty state | `wd-status-tip` | `wd-empty` |
| Multi-column picker | `wd-col-picker` | `wd-cascader` |
| Form validation | `rules` / `FormRules` | `schema` / `FormSchema` |
| Button variants | `plain` / `type="text"` / `type="icon"` | `variant` / icon button |
| Tag variants | `plain` | `variant="plain"` |
| Radio / Checkbox styles | `shape` / `inline` / `cell` | `type` / `direction` / manual `wd-cell` combination |
| Search light style | `light` | `variant="light"` |
| GridItem click event | `itemclick` | `click` |
| Utility function path | `components/common/util` | `common/util` |
| Theme system | CSS variable override | Design Token three-layer variable system |
| Sass | Recommended to lock lower version | Recommended `1.98` and above |

::: warning Note
`v2` component naming, package name, and some APIs are not fully compatible with `v1`. Please do not just upgrade dependency versions — it is recommended to check each item in order as described in this guide.
:::

## Pre-Upgrade Check

Before upgrading, it is recommended to search for old package names and old components in your project:

```bash
rg "wot-design-uni|wd-message-box|useMessage|wd-status-tip|wd-col-picker|wd-number-keyboard|@itemclick|shape=|inline|\\scell\\b|\\slight\\b|type=\"error\"|type=\"icon\"|type=\"text\"|\\splain\\b|classPrefix|components/common/util|hide-label|hide-min-max|autoLineWidth|disabled-color|setRoate|useContentSlot|useMoreSlot|\\bshow="
```

If your project has form pages, also search for:

```bash
rg "wd-form|FormRules|:rules=|rules=|errorType|resetOnChange"
```

Focus on confirming the following:

- Whether the project uses `npm` installation or `uni_modules` installation.
- Whether `easycom` is configured in `pages.json`.
- Whether global component types are configured in `tsconfig.json`.
- Whether `MessageBox`, `StatusTip`, `ColPicker`, `NumberKeyboard` are used.
- Whether `Button` uses `plain`, `type="error"`, `type="text"`, `type="icon"`.
- Whether `Tag` uses `plain`.
- Whether `Radio` / `Checkbox` uses `shape`, `inline`, `cell`, `icon-placement`.
- Whether `Search` uses `light`.
- Whether `wd-grid-item`'s `itemclick` event is being listened to.
- Whether instance methods of `PickerView`, `ImgCropper`, `CountTo`, etc. are called.
- Whether old properties are used on `Badge`, `Slider`, `Tabs`, `Rate`, `SlideVerify`, `Steps`, `Swiper`, etc.
- Whether old show/hide properties or old slot switches are used in `Tooltip`, `Popover`, `Collapse`, etc.
- Whether there are complex forms, dynamic forms, hidden field validation, or custom validation rules.
- Whether component internal styles have been overridden or theme variables customized.

## Installation Migration

### npm Installation

Replace the old package with the new one:

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

Import paths need to be updated accordingly:

```ts
// v1
import { useToast } from 'wot-design-uni'

// v2
import { useToast } from '@wot-ui/ui'
```

### uni_modules Installation

If you use `uni_modules`, you need to replace the plugin directory from `wot-design-uni` to `wot-ui`.

```bash
uni_modules
└── wot-ui
```

Import paths need to be updated accordingly:

```ts
// v1
import { useToast } from '@/uni_modules/wot-design-uni'

// v2
import { useToast } from '@/uni_modules/wot-ui'
```

## Sass Migration

`v2` recommends using `sass@^1.98.0`:

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

After upgrading `sass`, business styles in your project may also need adjustment. The new Sass version has stricter compatibility warnings for old syntax and APIs. If your project uses older Sass syntax, you may encounter warnings or errors during compilation.

It is recommended to check the following:

- Whether `@import` is still used to include Sass files; migrate to `@use` or `@forward` where necessary.
- Whether globally visible variables, mixins, or functions are relied upon. After migrating to `@use`, access via namespace or explicitly expand with `as *`.
- Whether the old division syntax `/` is used. For mathematical calculations, migrate to `math.div()`.
- Whether deprecated Sass built-in functions or old APIs are called.
- Whether third-party style libraries lock older Sass syntax and need corresponding dependency upgrades.

For example:

```scss
// Old syntax
@import './variables.scss';

.page {
  width: 100px / 2;
  color: $primary-color;
}
```

Can be gradually migrated to:

```scss
@use 'sass:math';
@use './variables.scss' as *;

.page {
  width: math.div(100px, 2);
  color: $primary-color;
}
```

If you encounter `legacy JS API` related warnings, you can configure in `vite.config.ts`:

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

## Auto Import Migration

### easycom

If you use `npm` installation and auto-import components through `easycom`, you need to change the path to the new package name:

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

If you use `uni_modules` installation, no additional configuration is usually needed; if you manually wrote old directory paths in your project, they also need to be replaced with `@/uni_modules/wot-ui`.

### Vite Plugin Auto Import

If auto-importing components through `@uni-helper/vite-plugin-uni-components`, you can use a custom resolver:

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
          name,
          from: `@wot-ui/ui/components/${compName}/${compName}.vue`
        }
      }
    }
  }
}
```

### Volar Types

For `npm` installation, type declarations in `tsconfig.json` need to be replaced:

```json
{
  "compilerOptions": {
    "types": ["@wot-ui/ui/global"]
  }
}
```

## Form Migration

`Form` is one of the components with the most changes in `v2`. `v1` tends to have form components directly carry validation rules, while `v2` unifies to `wd-form`, `wd-form-item`, and `schema` validation model.

### Basic Structure Migration

In `v1`, input components are usually placed directly inside `wd-form`, with `prop` and `rules` declared on the component:

```vue
<wd-form ref="form" :model="model" :rules="rules">
  <wd-input
    label="Username"
    prop="username"
    v-model="model.username"
    :rules="[{ required: true, message: 'Please enter username' }]"
  />
</wd-form>
```

`v2` recommends using `wd-form-item` to carry the title, layout, validation prompt, and click behavior, while input components only handle input:

```vue
<wd-form ref="form" :model="model" :schema="schema" :title-width="100">
  <wd-form-item title="Username" prop="username">
    <wd-input v-model="model.username" placeholder="Please enter username" />
  </wd-form-item>
</wd-form>
```

::: tip Note
When `wd-form-item` is used with `input` and `textarea`, it automatically enables the `compact` attribute of `input` and `textarea`. If form item height or spacing changes after migration, please check this first.
:::

### Validation Rule Migration

`v1` uses `rules`:

```ts
import type { FormRules } from '@/uni_modules/wot-design-uni/components/wd-form/types'

const rules: FormRules = {
  username: [
    {
      required: true,
      message: 'Please enter username'
    }
  ]
}
```

`v2` uses `schema`. For better type inference, it is recommended to use `zodAdapter`:

```ts
import { z } from 'zod'
import { zodAdapter } from '@/uni_modules/wot-ui'

const schema = zodAdapter(
  z.object({
    username: z.string().min(1, 'Please enter username')
  })
)
```

For `npm` installation, change the import path to:

```ts
import { zodAdapter } from '@wot-ui/ui'
```

`Zod` is not built-in with the component library and needs to be installed separately:

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

If you don't want to introduce `Zod`, you can also write `FormSchema` manually:

```ts
import type { FormSchema } from '@/uni_modules/wot-ui/components/wd-form/types'

const schema: FormSchema = {
  validate(model) {
    const issues = []
    if (!model.username) {
      issues.push({ path: ['username'], message: 'Please enter username' })
    }
    return issues
  },
  isRequired(path: string) {
    return path === 'username'
  }
}
```

### Required Asterisk Migration

In `v2`, required asterisk and validation rules are two separate concepts. You can control the asterisk through:

- Setting `required` on `wd-form-item`.
- Providing `isRequired(path)` in `FormSchema`.
- Providing `isRequired(path)` in the second parameter of `zodAdapter`.

```ts
const schema = zodAdapter(
  z.object({
    username: z.string().min(1, 'Please enter username')
  }),
  {
    isRequired(path: string) {
      return path === 'username'
    }
  }
)
```

If validation works after migration but the asterisk doesn't appear, please check `required` or `isRequired` first.

### Picker Form Item Migration

In `v1`, components like `Input`, `Textarea`, `Picker`, `Calendar`, `DatetimePicker`, `SelectPicker`, `ColPicker` are often used directly as form items, with the component itself supporting form-related attributes like `label`, `label-width`, `prop`, `rules`:

```vue
<wd-col-picker
  label="Address"
  prop="address"
  v-model="model.address"
  :columns="area"
/>
```

In `v2`, the form structure is unified to `wd-form-item`. Input components and popup pickers no longer carry form title, validation display, and trigger entry responsibilities. During migration, configurations like `label`, `label-width`, `prop`, `rules` need to be moved to `wd-form`, `wd-form-item`, or `schema`.

For popup pickers, it is recommended to separate the picker and form display: the picker handles selection, while `wd-form-item` handles displaying the current value, opening the popup, and showing validation status.

```vue
<wd-cascader
  v-model="model.address"
  v-model:visible="showAddressPicker"
  :options="area"
  @confirm="handleAddressConfirm"
/>

<wd-form-item
  title="Address"
  prop="address"
  is-link
  :value="addressText"
  placeholder="Please select address"
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

::: tip Note
For selection component migration, please check whether `model` stores the component value or the display text. `wd-form-item`'s `value` is usually for display text and may not be the same as the field value submitted to the backend.
:::

### Layout Attribute Migration

`v2`'s `Form` and `FormItem` provide more layout capabilities. Layout configurations previously scattered across input components can be moved up to `wd-form` or `wd-form-item`:

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
  <wd-form-item title="Username" prop="username">
    <wd-input v-model="model.username" />
  </wd-form-item>
</wd-form>
```

Common layout attributes include:

| Attribute | Description |
| --- | --- |
| `border` | Whether to show border lines |
| `center` | Whether to vertically center content |
| `size` | Cell size |
| `title-width` | Left title width |
| `layout` | Form item layout, options: `horizontal`, `vertical` |
| `value-align` | Right content alignment |
| `asterisk-position` | Required asterisk position |
| `hide-asterisk` | Whether to hide required asterisk |
| `ellipsis` | Whether to truncate with ellipsis on overflow |

### Validation Trigger Migration

`v2` supports controlling validation trigger timing through `validate-trigger`:

```vue
<wd-form :model="model" :schema="schema" validate-trigger="change">
  <wd-form-item title="Username" prop="username" validate-trigger="blur">
    <wd-input v-model="model.username" />
  </wd-form-item>
</wd-form>
```

The `validate` method still supports validating all fields, a single field, or multiple fields:

```ts
await form.value?.validate()
await form.value?.validate('username')
await form.value?.validate(['username', 'password'])
```

### Form Migration Checklist

- Move `prop`, `rules` directly on input components to `wd-form-item` and `schema`.
- Replace `rules` / `FormRules` / `FormItemRule` with `schema` / `FormSchema`.
- If using `Zod`, install `zod` and convert validation rules through `zodAdapter`.
- Check if required asterisk needs separate control through `required` or `isRequired`.
- Change `errorType` to `error-type`, `resetOnChange` to `reset-on-change`.
- Migrate `ColPicker` scenarios to `Cascader` and confirm display text and submitted values.
- Check dynamic fields, hidden fields, array fields, and async validation.
- Check if `validate()`, `validate(prop)`, `reset()` calls still meet business expectations.

## Component Migration

### Template Attribute Naming

`v2` documentation template examples use kebab-case attribute names uniformly. During migration, it is recommended to adjust camelCase writing in templates, especially code directly copied from old documentation.

```vue
<!-- Common writing in v1 -->
<wd-toast :zIndex="1000" classPrefix="custom" />
<wd-count-to :startVal="0" :endVal="100" />

<!-- Recommended writing in v2 -->
<wd-toast :z-index="1000" class-prefix="custom" />
<wd-count-to :start-val="0" :end-val="100" />
```

Common attributes include `z-index`, `class-prefix`, `custom-class`, `custom-style`, `safe-area-inset-bottom`, `start-val`, `end-val`, `auto-start`, `use-easing`, etc.

### MessageBox Migration to Dialog

`v1`:

```vue
<wd-message-box />
```

```ts
import { useMessage } from '@/uni_modules/wot-design-uni'

const message = useMessage()
message.confirm({
  title: 'Tip',
  msg: 'Confirm deletion?'
})
```

`v2`:

```vue
<wd-dialog />
```

```ts
import { useDialog } from '@/uni_modules/wot-ui'

const dialog = useDialog()
dialog.confirm({
  title: 'Tip',
  msg: 'Confirm deletion?'
})
```

If there are multiple dialog instances on the page, continue using `selector` to distinguish:

```vue
<wd-dialog selector="delete-dialog" />
```

```ts
const dialog = useDialog('delete-dialog')
```

`Dialog` also has the following behavior differences compared to `MessageBox` that need to be checked:

- `closeOnClickModal` default changed from `true` to `false`. If you still want to close by clicking the mask, you need to set it explicitly.
- `Prompt` return value is `DialogResult`. To read input content, typically use `res.value`.
- Flat configurations like `inputType`, `inputPlaceholder` are recommended to migrate to `inputProps`; for multiline input, use `textareaProps`.
- Advanced configurations for confirm/cancel buttons use `confirmButtonProps`, `cancelButtonProps`; for multi-button scenarios, use `actions`.

```ts
dialog.prompt({
  title: 'Please enter phone number',
  inputProps: {
    type: 'tel',
    placeholder: 'Please enter 11-digit phone number'
  }
}).then((res) => {
  console.log(res.value)
})
```

### Button Migration

`v2` splits button types and variants. During migration, it is recommended to check `type`, `plain`, `round`, and icon buttons.

| v1 | v2 |
| --- | --- |
| `type="error"` | `type="danger"` |
| `plain` | `variant="plain"` |
| `type="text"` | `variant="text"` |
| `type="icon" icon="xxx"` | Only pass `icon="xxx"` |
| `classPrefix` | Recommended to write as `class-prefix` in templates |

```vue
<!-- v1 -->
<wd-button type="error" plain>Delete</wd-button>
<wd-button type="text">Text Button</wd-button>
<wd-button type="icon" icon="picture" />
```

```vue
<!-- v2 -->
<wd-button type="danger" variant="plain">Delete</wd-button>
<wd-button variant="text">Text Button</wd-button>
<wd-button icon="image" />
```

::: tip Note
In `v2`, `Button`'s `round` default is `false`, and button height is controlled by fixed height. If your project relies on `v1`'s rounded appearance or height expanded through padding, visual regression testing is needed.
:::

### Tag Migration

`v2`'s `Tag` uses `variant` to express visual variants. `plain` needs to be migrated to `variant="plain"`.

```vue
<!-- v1 -->
<wd-tag plain>Tag</wd-tag>
<wd-tag mark plain>Tag</wd-tag>
```

```vue
<!-- v2 -->
<wd-tag variant="plain">Tag</wd-tag>
<wd-tag mark variant="plain">Tag</wd-tag>
```

If you maintain tag configuration in data, it also needs to be adjusted:

```ts
// v1
const tag = { type: 'primary', plain: true }

// v2
const tag = { type: 'primary', variant: 'plain' }
```

### Radio and Checkbox Migration

`v2` unifies the styles, arrangements, and list modes of `Radio` and `Checkbox`. Old `shape`, `inline`, `cell` need to be migrated.

| v1 | v2 |
| --- | --- |
| `shape="check"` | `type="circle"` |
| `shape="dot"` | `type="dot"` |
| `shape="button"` | `type="button"` |
| `shape="square"` | `type="square"` |
| `inline` | `direction="horizontal"` |
| `icon-placement="left/right"` | `placement="left/right"` |
| `cell` | Manual `wd-cell` combination |

```vue
<!-- v1 -->
<wd-radio-group v-model="value" shape="button" inline>
  <wd-radio :value="1">Option 1</wd-radio>
  <wd-radio :value="2">Option 2</wd-radio>
</wd-radio-group>

<!-- v2 -->
<wd-radio-group v-model="value" type="button" direction="horizontal">
  <wd-radio :value="1">Option 1</wd-radio>
  <wd-radio :value="2">Option 2</wd-radio>
</wd-radio-group>
```

`v1`'s `cell` mode is no longer provided as a built-in attribute of `RadioGroup` / `CheckboxGroup` in `v2`. When you need full-row click, place options inside `wd-cell` and update the value or call component instance methods in `wd-cell`'s click event.

```vue
<wd-radio-group v-model="value">
  <wd-cell-group border>
    <wd-cell title="Option 1" clickable @click="value = 1">
      <template #right-icon>
        <wd-radio :value="1" />
      </template>
    </wd-cell>
  </wd-cell-group>
</wd-radio-group>
```

`Checkbox` migration also needs attention: in `CheckboxGroup`, option values use `name`; when using `wd-checkbox` alone, use `v-model`, `true-value`, `false-value` to manage checked and unchecked values.

### Search Migration

`v1`'s `light` boolean attribute is migrated to `variant="light"` in `v2`.

```vue
<!-- v1 -->
<wd-search light />

<!-- v2 -->
<wd-search variant="light" />
```

If using the right input slot, `v2` recommends directly using `input-suffix`, `suffix` and other named slots, instead of controlling through the deprecated `use-suffix-slot`.

### Cell, Input and Textarea Migration

In `v1`, `Cell`, `Input`, `Textarea` once carried some form item responsibilities, with common attributes including `prop`, `rules`, `label`, `label-width`, `required`, `marker-side`, `no-border`, etc. In `v2`, these responsibilities need to be migrated to `wd-form-item`, `wd-form`, or `schema`.

```vue
<!-- v1 -->
<wd-input label="Username" prop="username" v-model="model.username" required />

<!-- v2 -->
<wd-form-item title="Username" prop="username" required>
  <wd-input v-model="model.username" />
</wd-form-item>
```

`Cell`'s icon and layout attributes also have adjustments:

| v1 | v2 |
| --- | --- |
| `icon` | `prefix-icon` |
| `custom-icon-class` | `custom-prefix-class` or `custom-suffix-class` |
| `vertical` | `layout="vertical"` |
| `marker-side` | `asterisk-position` |

When `Input`, `Textarea` are placed in `wd-cell` or `wd-form-item`, it is recommended to use `compact` to remove the component's own padding and background; it is automatically enabled in `wd-form-item`.

### Fab Migration

`Fab`'s theme type is consistent with `Button`. Old `type="error"` needs to be changed to `type="danger"`.

```vue
<!-- v1 -->
<wd-fab type="error" :zIndex="99" inactiveIcon="plus" activeIcon="close" />

<!-- v2 -->
<wd-fab type="danger" :z-index="99" inactive-icon="plus" active-icon="close" />
```

If buttons inside `Fab` slot still use `type="error"`, they also need to be migrated to `type="danger"`.

### Grid Migration

`wd-grid-item`'s click event is adjusted from `itemclick` to `click`.

```vue
<!-- v1 -->
<wd-grid clickable>
  <wd-grid-item text="Start" icon="play-circle-stroke" @itemclick="start" />
</wd-grid>
```

```vue
<!-- v2 -->
<wd-grid clickable>
  <wd-grid-item text="Start" icon="play-circle-stroke" @click="start" />
</wd-grid>
```

::: tip Note
`wd-grid-item` needs to be used with parent `wd-grid`'s `clickable`. When `clickable` is not enabled, click logic will not be triggered.
:::

### StatusTip Migration to Empty

`v2` uses `wd-empty` to express empty states, network errors, no results, and other scenarios:

```vue
<wd-empty icon="no-result" tip="No results found" />
<wd-empty icon="no-wifi" tip="Network unavailable, please check your network settings" />
<wd-empty icon="no-content" tip="No content" />
```

If custom images or bottom action areas were used in `v1`, they can be migrated to `wd-empty`'s slots:

```vue
<wd-empty icon="no-content" tip="No content">
  <wd-button type="primary">Reload</wd-button>
</wd-empty>
```

### ColPicker Migration to Cascader

`v2` uses `wd-cascader` to replace `wd-col-picker`. During migration, focus on checking data structure, async loading, and display logic.

```vue
<wd-cascader
  v-model="model.address"
  v-model:visible="showAddressPicker"
  :options="area"
  @confirm="handleAddressConfirm"
/>
```

`Cascader`'s options support adapting custom fields through `value-key`, `text-key`, `children-key`, etc. When migrating `ColPicker`'s `column-change` logic, you can use `lazy-load` instead.

### Picker, Calendar and DatetimePicker Trigger Methods

In `v2`, popup pickers like `Picker`, `SelectPicker`, `Calendar`, `DatetimePicker` lean more towards pure picker responsibilities, no longer making the outer trigger cell the main structure. If old code directly relies on these components' `form item` capabilities like `label`, `label-width`, `prop`, `rules`, it is recommended to migrate to `wd-cell` or `wd-form-item` for trigger and display.

```vue
<wd-picker v-model="model.type" v-model:visible="showTypePicker" :columns="typeList" />

<wd-form-item
  title="Type"
  prop="type"
  is-link
  :value="typeText"
  placeholder="Please select type"
  @click="showTypePicker = true"
/>
```

### CountTo Migration

In `v2`, `CountTo`'s theme types are `default`, `primary`, `success`, `warning`, `error`. If old code uses `type="info"`, it needs to be replaced with other themes or custom color through `color`.

```vue
<!-- v1 -->
<wd-count-to type="info" :startVal="0" :endVal="888888" :autoplay="false" fontSize="24px" />

<!-- v2 -->
<wd-count-to type="primary" :start-val="0" :end-val="888888" :auto-start="false" custom-style="font-size: 24px;" />
```

In templates, it is also recommended to use kebab-case attributes uniformly, such as `start-val`, `end-val`, `auto-start`. If old code uses `fontSize` to control font size, `v2` can use `custom-style`, `custom-class`, or outer style control.

### Segmented Migration

`v2`'s `Segmented` uses `theme` to control styles, no longer providing `size`. If old code uses `size="large"` or `size="small"`, adjust size through outer styles, `custom-class`, or component variables according to design specs.

```vue
<!-- v1 -->
<wd-segmented :options="list" v-model:value="current" size="large" />

<!-- v2 -->
<wd-segmented :options="list" v-model:value="current" theme="card" />
```

`vibrateShort` in templates is recommended to change to `vibrate-short`.

### PickerView Migration

`PickerView`'s cascade model has significant changes. `v1` often dynamically modifies column data through `column-change` and instance method `setColumnData`, while `v2` recommends using `cascade` and tree-structured `columns` data.

```vue
<!-- v2 -->
<wd-picker-view v-model="value" :columns="columns" cascade />
```

Instance methods also have naming adjustments:

| v1 | v2 |
| --- | --- |
| `getLabels()` | `getSelectedLabels()` |
| `setColumnData()` | Use `cascade` tree data, or reset column data through `resetColumns()` |
| `getColumnData()` | `getColumnData()` retained |
| `resetColumns()` | `resetColumns()` retained |

`v2`'s `v-model` recommends always using array form to store selected values. For single-column selection, it is also recommended to write as `['value']`.

### ImgCropper Migration

If the project calls image cropping methods through component instances, the misspelled `setRoate` needs to be changed to `setRotate`.

```ts
// v1
cropper.value?.setRoate(90)

// v2
cropper.value?.setRotate(90)
```

### Additional Component Migration

The following components have relatively scattered changes, but if corresponding old attributes are used in the project, they also need to be adjusted together.

| Component | v1 | v2 |
| --- | --- | --- |
| `Badge` | `v-model` / `modelValue` | `value` |
| `Slider` | Array value auto dual slider | Need to explicitly set `range` |
| `Slider` | `hide-label` | Use `popover-visible="never"` to hide bubble |
| `Slider` | `hide-min-max` | Use `show-extreme-value` to control whether to show extreme values |
| `Tabs` | `autoLineWidth` | `line-theme="text"` |
| `Rate` | `disabled-color` | Handle disabled state visual through `color`, `active-color`, or custom styles |
| `SlideVerify` | `width` / `height` | Control size through outer container, `custom-style`, or style class |
| `Steps` | `title-slot` / `description-slot` / `icon-slot` | Directly use `title`, `description`, `icon` slots |
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

`DatetimePickerView`'s `loading`, `loading-color` are no longer provided as view component attributes. If old pages rely on loading state, it is recommended to control loading display externally, then render the picker.

`Swiper`'s indicator capability is also consolidated. Number, dot, dot-bar styles are prioritized through `indicator` configuration, and position uses `indicator-position`:

```vue
<wd-swiper
  v-model:current="current"
  :list="list"
  :indicator="{ type: 'fraction' }"
  indicator-position="bottom-right"
/>
```

### Tooltip, Popover and Collapse Migration

`Tooltip`'s controlled show/hide is consolidated from the old `show` attribute to `v-model` / `model-value`.

```vue
<!-- v1 -->
<wd-tooltip :show="show" content="Tooltip content">
  <wd-button>Tooltip</wd-button>
</wd-tooltip>

<!-- v2 -->
<wd-tooltip v-model="show" content="Tooltip content">
  <wd-button>Tooltip</wd-button>
</wd-tooltip>
```

When `Tooltip`, `Popover` use the `content` slot, the old `useContentSlot` switch is no longer needed. If slot content size changes dynamically after migration, you can recalculate positioning through instance method `updatePosition()`.

```vue
<wd-popover v-model="showPopover" ref="popoverRef">
  <template #content>
    <view>Custom content</view>
  </template>
  <wd-button>Open</wd-button>
</wd-popover>
```

`Collapse`'s bound value is migrated from the old `value` attribute to `v-model`. When using "view more" mode, template attribute for custom `more` slot is recommended to write as `use-more-slot`.

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

`v2` no longer provides independent `wd-number-keyboard`. If the project relies on this component, you can prioritize evaluating migration to `wd-keyboard`:

```vue
<wd-keyboard v-model="value" v-model:visible="visible" mode="custom" extra-key="." close-text="Done" />
```

License plate, ID card, random number keyboard scenarios are also handled by `wd-keyboard`. During migration, please check `visible`, `v-model`, `extra-key`, `close-text`, `random-key-order`, `safe-area-inset-bottom`, and other attributes and events.

### New Preview Components

`v2` adds image and video preview capabilities:

- [ImagePreview](/component/image-preview)
- [VideoPreview](/component/video-preview)
- [useImagePreview](/component/use-image-preview)
- [useVideoPreview](/component/use-video-preview)

If the project originally called `uni.previewImage` directly or maintained a custom video preview layer, you can migrate to these components as needed.

## Utility Function and Type Import Migration

If the project directly references component library internal utility functions, paths need to be adjusted accordingly:

```ts
// v1
import { isArray, getRect, pause } from '@/uni_modules/wot-design-uni/components/common/util'

// v2
import { isArray, getRect, pause } from '@/uni_modules/wot-ui/common/util'
```

For `npm` installation, you can import from within the package:

```ts
import { isArray, getRect, pause } from '@wot-ui/ui/common/util'
```

Or use `CommonUtil` namespace from package entry:

```ts
import { CommonUtil } from '@wot-ui/ui'

CommonUtil.isArray([])
```

Component type imports also need to replace package name or directory name:

```ts
// v1
import type { UploadFileItem } from '@/uni_modules/wot-design-uni/components/wd-upload/types'

// v2
import type { UploadFileItem } from '@/uni_modules/wot-ui/components/wd-upload/types'
```

## Icon Migration

`v2` adjusts icon examples and some component default icons. If empty icons, icon name mismatches, or inconsistent visual meanings appear on the page after migration, please check `icon`, `prefix-icon`, `suffix-icon`, `class-prefix`, `css-icon`, and other configurations first.

Common scenarios include:

- `Button`'s old `type="icon"` needs to be changed to directly passing `icon`.
- Custom icon class name prefix in templates is recommended to use `class-prefix`.
- Some icon names in old examples may need to be replaced with names that exist in `v2` icon documentation.

## Theme and Dark Mode Migration

`v2`'s theme system is based on Design Token. It is recommended to prioritize overriding semantic variables, then override component variables as needed.

If using dark mode or theme variables, you need to include the theme file in entry styles:

::: code-group

```scss [npm]
@use '@wot-ui/ui/styles/theme/index.scss' as *;
```

```scss [uni_modules]
@use '@/uni_modules/wot-ui/styles/theme/index.scss' as *;
```

:::

Global brand colors are recommended to override semantic variables:

```scss
page,
.wd-root-portal {
  --wot-primary-5: #4096ff;
  --wot-primary-6: #1677ff;
  --wot-primary-7: #0958d9;
}
```

Local themes are recommended to use [ConfigProvider](/component/config-provider):

```vue
<wd-config-provider :theme-vars="themeVars">
  <wd-button type="primary">Submit</wd-button>
</wd-config-provider>
```

For more theme information, please refer to [Custom Theme](/guide/custom-theme) and [Dark Mode](/guide/dark-mode).

## Style Override Migration

`v2` recommends overriding styles in the following priority:

1. Prioritize using `custom-class`, `custom-style` provided by components.
2. When unified brand visuals are needed, prioritize overriding CSS variables.
3. When overriding component styles within a page, normal styles can directly use `.wd-*` class names.
4. When overriding component internal styles in `scoped`, use `:deep()`.
5. When overriding mini-program component styles in custom components, check `styleIsolation: 'shared'`.

```css
:deep(.wd-button) {
  font-weight: 600;
}
```

For more information, please refer to [Style Override](/guide/custom-style).

## Internationalization Migration

If using `npm` installation and configured Vite pre-build exclusion, you need to replace the old package name with the new one:

```ts
export default defineConfig({
  optimizeDeps: {
    exclude: ['@wot-ui/ui']
  }
})
```

Import paths are replaced accordingly:

```ts
import { Locale } from '@wot-ui/ui'
import enUS from '@wot-ui/ui/locale/lang/en-US'
```

For `uni_modules` installation:

```ts
import { Locale } from '@/uni_modules/wot-ui/locale'
import enUS from '@/uni_modules/wot-ui/locale/lang/en-US'
```

## Regression Test Checklist

After migration, it is recommended to check at least the following:

- Whether `H5` and target mini-program platforms can compile normally.
- Whether `easycom` can correctly parse all `wd-*` components.
- Whether functionally-called components like `Toast`, `Dialog`, `Notify` have instance declarations on the page.
- Whether form submission, single-field validation, reset, hidden fields, and async validation work correctly.
- Whether picker form items' display text and submitted values are correct.
- Whether `Button`'s `type`, `variant`, `round`, and height meet expectations.
- Whether `Tag`'s `variant` has been migrated from old `plain`.
- Whether `Radio` / `Checkbox`'s `shape`, `inline`, `cell` have been migrated.
- Whether `Search`'s `light` has been migrated to `variant="light"`.
- Whether `GridItem` click event has been migrated from `itemclick` to `click`.
- Whether `Cell`, `Input`, `Textarea`'s form-related attributes have been migrated to `wd-form-item`.
- Whether instance methods of `PickerView`, `ImgCropper`, `CountTo`, etc. can still be called normally.
- Whether old attributes on `Badge`, `Slider`, `Tabs`, `Steps`, `Swiper`, etc. have been migrated.
- Whether `Dialog`'s mask click to close, Prompt return value, and button configuration meet expectations.
- Whether dark mode, theme variables, brand color overrides take effect.
- Whether popups, masks, `Popup`, `DropMenu`, `ActionSheet` have style isolation issues on mini-program platforms.
- Whether custom override styles still take effect.
- Whether icon names still exist, and whether button height changes affect page layout.

## Recommended Migration Order

1. Upgrade dependencies and `sass`.
2. Replace package names, directory names, and import paths.
3. Update `easycom`, Volar, internationalization configuration.
4. Prioritize migrating `Form` pages.
5. Replace `MessageBox`, `StatusTip`, `ColPicker`, `NumberKeyboard`, and other components.
6. Check `Button`, `Tag`, `Radio`, `Checkbox`, `Search`, `GridItem`, `CountTo`, `Slider`, `Tabs`, and other API changes.
7. Migrate theme variables and style overrides.
8. Do complete regression testing on `H5` and target mini-program platforms.

If your project has many form pages, it is recommended to first complete a migration sample with a complex form, then batch migrate other pages.
