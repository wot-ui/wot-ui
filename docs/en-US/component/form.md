# Form

Used for data entry and validation, supports input fields, radio buttons, checkboxes, file uploads, and other types.

The form adopts the structure of `wd-form` and `wd-form-item`. `wd-form-item` internally inherits the layout capabilities of `wd-cell`, responsible for displaying title descriptions and carrying validation prompts. Various input components (such as `Input`, `Textarea`, `Picker`, `Switch`, `Upload`, etc.) only need to be directly placed into the default slot of `wd-form-item`.

Combined with the `wd-form` component, rule validation of internal components can be achieved. If you need clear border lines between form items, you can directly enable the `border` property on `wd-form`.

## Validation Engine Description

The form component adopts an interface-based validation scheme by default. You can write your own validation logic according to the `FormSchema` structure. See [Custom Validation Engine](#custom-validation-engine) for details.

At the same time, we recommend using [Zod](https://zod.dev/) as the form validation engine. Zod is a TypeScript-first schema declaration and validation library. You can easily build your form validation rules through `z.object()` and other declaration combinations.

### Zod Installation

~~Built-in makes the component library large, not built-in and people complain about installation trouble. Really want to hang such people up and beat them.~~

Considering the component library size, we do not include Zod by default. So before using Zod, you need to install it in your project:

::: code-group

```bash [npm]
npm install zod
```

```bash [yarn]
yarn add zod
```

```bash [pnpm]
pnpm add zod
```

:::

### Using with zodAdapter

The component library includes a built-in `zodAdapter`. You can directly convert Zod's schema objects into validation rules recognized by the component:

```ts
import { z } from 'zod'
import { zodAdapter } from '@/uni_modules/wot-ui'

// Convert zod schema object through zodAdapter
const schema = zodAdapter(
  z.object({
    username: z.string().min(1, 'Please enter username'),
    password: z.string().min(6, 'Password must be at least 6 characters')
  })
)
```

## Custom Validation Engine

If you don't want to use Zod, you can also directly write a validation object that conforms to the `FormSchema` structure to implement a custom form validation engine.

The custom validation engine needs to provide a `validate` function that receives the entire form data `model` and returns (or asynchronously returns) an array of error issues containing `path` and `message` fields.
If you need to control the display of required asterisks (`*`), you can also provide an `isRequired` method:

```ts
import type { FormSchema } from '@/uni_modules/wot-ui/components/wd-form/types'

const customSchema: FormSchema = {
  // Validation logic
  validate(formModel) {
    const issues = []
    if (!formModel.username) {
      issues.push({ path: ['username'], message: 'Please enter username' })
    }
    if (!formModel.password || formModel.password.length < 6) {
      issues.push({ path: ['password'], message: 'Password must be at least 6 characters' })
    }
    return issues
  },
  // Used to derive required asterisks
  isRequired(path: string) {
    return path === 'username' || path === 'password'
  }
}
```

## Component Type

### Basic Usage

In the form, use `model` to specify the form data object, each `form item component` represents a form item, use `prop` to specify the form item field, and use the `schema` property to define validation rules.

::: details View Basic Usage Example
::: code-group

```html [vue]
<wd-form ref="form" :model="model" :schema="schema" :title-width="100">
  <wd-form-item title="Wabi-sabi" prop="value1">
    <wd-input type="text" v-model="model.value1" placeholder="Please enter wabi-sabi" />
  </wd-form-item>

  <wd-form-item title="Shakalaka" prop="value2">
    <wd-input type="text" v-model="model.value2" placeholder="Please enter shakalaka" />
  </wd-form-item>
  <view class="footer">
    <wd-button type="primary" size="large" @click="handleSubmit" block>Submit</wd-button>
  </view>
</wd-form>
```

```typescript [typescript]
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { z } from 'zod'
import { useToast, zodAdapter } from '@/uni_modules/wot-ui'
import type { FormInstance } from '@/uni_modules/wot-ui/components/wd-form/types'

const { success: showSuccess } = useToast()

const model = reactive<{
  value1: string
  value2: string
}>({
  value1: '',
  value2: ''
})

const form = ref<FormInstance>()
const schema = zodAdapter(
  z
    .object({
      value1: z.string().min(1, 'Please enter wabi-sabi'),
      value2: z.string().min(1, 'Please enter shakalaka')
    })
    .superRefine((data, ctx) => {
      if (data.value1 === data.value2) return
      const message = 'The content of the two input boxes must be consistent'
      ctx.addIssue({ code: 'custom', message, path: ['value1'] })
      ctx.addIssue({ code: 'custom', message, path: ['value2'] })
    })
)

function handleSubmit() {
  form.value
    ?.validate()
    .then(({ valid, errors }) => {
      if (valid) {
        showSuccess({
          msg: 'Validation passed'
        })
      }
    })
    .catch((error) => {
      console.log(error, 'error')
    })
}
</script>
```

```css [css]
.footer {
  padding: 16px;
}
```

:::

## Component Configuration

### Validation Error Prompt Method

1. `message`: Default is text prompt below the input box
2. `toast`: Displays error messages in "toast" prompt format, only pops up the first form field error message each time
3. `none`: No prompt will be given

::: details Error Prompt Method
::: code-group

```html [vue]
<wd-form ref="form" :model="model" :schema="activeSchema" :error-type="errorType" :title-width="100" border>
  <wd-cell-group custom-class="group" title="Configuration Switch">
    <wd-form-item title="Validation Engine" value-align="left">
      <wd-switch size="20" v-model="useZodSchema" active-text="Zod" inactive-text="Custom" />
    </wd-form-item>
    <wd-form-item title="Prompt Method" value-align="left">
      <wd-radio-group v-model="errorType" direction="horizontal">
        <wd-radio :value="'toast'">toast</wd-radio>
        <wd-radio :value="'message'">message</wd-radio>
        <wd-radio :value="'none'">none</wd-radio>
      </wd-radio-group>
    </wd-form-item>
  </wd-cell-group>
  <wd-cell-group custom-class="group" title="Form Content">
    <wd-form-item title="Wabi-sabi" prop="value1">
      <wd-input clearable v-model="model.value1" placeholder="Please enter wabi-sabi" />
    </wd-form-item>
    <wd-form-item title="Shakalaka" prop="value2">
      <wd-input show-password clearable v-model="model.value2" placeholder="Please enter shakalaka" />
    </wd-form-item>
  </wd-cell-group>
  <view class="footer">
    <wd-button type="primary" size="large" @click="handleSubmit" block>Submit</wd-button>
  </view>
</wd-form>
```

```typescript [typescript]
<script lang="ts" setup>
import { computed, reactive, ref, watch } from 'vue'
import { z } from 'zod'
import { useToast, zodAdapter } from '@/uni_modules/wot-ui'
import type { FormInstance, FormSchema } from '@/uni_modules/wot-ui/components/wd-form/types'

const { success: showSuccess } = useToast()
const model = reactive<{
  value1: string
  value2: string
}>({
  value1: '',
  value2: ''
})

const useZodSchema = ref(true)
const errorType = ref<'toast' | 'message' | 'none'>('toast')

const customSchema: FormSchema = {
  validate(formModel) {
    const issues = []
    if (!formModel.value1) {
      issues.push({ path: ['value1'], message: 'Please enter wabi-sabi' })
    }
    if (!formModel.value2) {
      issues.push({ path: ['value2'], message: 'Please enter shakalaka' })
    }
    return issues
  },
  isRequired(path: string) {
    return path === 'value1' || path === 'value2'
  }
}

const zodSchema = zodAdapter(
  z.object({
    value1: z.string().min(1, 'Please enter wabi-sabi'),
    value2: z.string().min(1, 'Please enter shakalaka')
  }),
  {
    isRequired(path: string) {
      return path === 'value1' || path === 'value2'
    }
  }
)

const activeSchema = computed<FormSchema>(() => {
  return useZodSchema.value ? zodSchema : customSchema
})

const form = ref<FormInstance>()

watch(
  () => errorType.value,
  () => {
    form.value?.reset()
  }
)

function handleSubmit() {
  form
    .value!.validate()
    .then(({ valid, errors }) => {
      if (valid) {
        showSuccess({
          msg: 'Validation passed'
        })
      }
    })
    .catch((error) => {
      console.log(error, 'error')
    })
}
</script>
```

```css [css]
.footer {
  padding: 16px;
}

:deep(.group) {
  &:not(:first-child) {
    margin-top: 12px;
  }
}
```

:::

### Dynamic Form

Dynamic addition and removal of form items.

::: details View Dynamic Form Example
::: code-group

```html [vue]
<wd-form ref="form" :model="model">
  <wd-cell-group border>
    <wd-input
      label="Username"
      label-width="100px"
      prop="name"
      clearable
      v-model="model.name"
      placeholder="Please enter username"
      :rules="[{ required: true, message: 'Please enter username' }]"
    />
    <wd-input
      v-for="(item, index) in model.phoneNumbers"
      :key="item.key"
      :label="'Makabaka Order' + index"
      :prop="'phoneNumbers.' + index + '.value'"
      label-width="100px"
      clearable
      v-model="item.value"
      placeholder="Makabaka order number"
      :rules="[{ required: true, message: 'Please enter Makabaka order number' + index }]"
    />

    <wd-cell title-width="0px">
      <view class="footer">
        <wd-button size="small" type="info" plain @click="addPhone">Add</wd-button>
        <wd-button size="small" type="info" plain @click="removePhone">Delete</wd-button>
        <wd-button size="small" type="info" plain @click="reset">Reset</wd-button>
        <wd-button type="primary" size="small" @click="submit">Submit</wd-button>
      </view>
    </wd-cell>
  </wd-cell-group>
</wd-form>
```

```typescript [typescript]
<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-ui'
import { reactive, ref } from 'vue'

interface PhoneItem {
  key: number
  value: string
}

const model = reactive<{
  name: string
  phoneNumbers: PhoneItem[]
}>({
  name: '',
  phoneNumbers: [
    {
      key: Date.now(),
      value: ''
    }
  ]
})

const { success: showSuccess } = useToast()
const form = ref()

const removePhone = () => {
  model.phoneNumbers.splice(model.phoneNumbers.length - 1, 1)
}

const addPhone = () => {
  model.phoneNumbers.push({
    key: Date.now(),
    value: ''
  })
}

const reset = () => {
  form.value.reset()
}

const submit = () => {
  form.value.validate().then(({ valid, errors }) => {
    if (valid) {
      showSuccess('Validation passed')
    }
  })
}
</script>
```

```css [css]
.footer {
  text-align: left;
  :deep(.wd-button) {
    &:not(:last-child) {
      margin-right: 12px;
    }
  }
}
```

:::

#### Validation Trigger Timing

By configuring `validate-trigger`, you can specify the validation trigger timing. Optional values are `change`, `blur`, `submit`. You can configure the global trigger timing on `wd-form`, or configure it on `wd-form-item` to override the global setting.

::: details Validation Trigger Timing
::: code-group

```html [vue]
<wd-form ref="form" :model="model" :schema="activeSchema" validate-trigger="change" :reset-on-change="false" :title-width="120">
  <wd-cell-group custom-class="group" title="Configuration">
    <wd-form-item title="Validation Engine" value-align="left">
      <wd-switch v-model="useZodSchema" size="20" active-text="Zod" inactive-text="Custom" />
    </wd-form-item>
    <wd-form-item title="Trigger Description" value-align="left">
      <text class="tip-text">Form-level change, field override: blur/change/submit</text>
    </wd-form-item>
  </wd-cell-group>

  <wd-cell-group custom-class="group" title="Input Fields">
    <wd-form-item title="Amount (change)" prop="amount">
      <wd-input-number v-model="model.amount" :min="0" :update-on-init="false" :max="9999" />
    </wd-form-item>
    <wd-form-item title="Remark (change)" prop="remark">
      <wd-textarea v-model="model.remark" placeholder="Please enter at least 4 characters" auto-height :maxlength="50" show-word-limit />
    </wd-form-item>
    <wd-form-item title="Account (blur)" prop="account" validate-trigger="blur">
      <wd-input v-model="model.account" clearable placeholder="Trigger validation on blur" />
    </wd-form-item>
    <wd-form-item title="Invite Code (change)" prop="inviteCode" validate-trigger="change">
      <wd-input v-model="model.inviteCode" clearable placeholder="Trigger validation on value change" />
    </wd-form-item>
    <wd-form-item title="City (submit)" prop="city" validate-trigger="submit">
      <wd-input v-model="model.city" clearable placeholder="Only trigger validation on submit" />
    </wd-form-item>
  </wd-cell-group>

  <wd-cell-group custom-class="group" title="Picker Fields (change)">
    <wd-form-item
      title="Promotion Platform"
      prop="platform"
      is-link
      :value="platformText"
      placeholder="Please select promotion platform"
      @click="showPlatformPicker = true"
    />
    <wd-form-item
      title="Promotion Method"
      prop="promotion"
      is-link
      :value="promotionText"
      placeholder="Please select promotion method"
      @click="showPromotionPicker = true"
    />
    <wd-form-item title="Time" prop="time" is-link :value="timeText" placeholder="Please select time" @click="showTimePicker = true" />
    <wd-form-item title="Date" prop="date" is-link :value="dateText" placeholder="Please select date" @click="showDatePicker = true" />
  </wd-cell-group>

  <view class="footer">
    <wd-button type="primary" @click="handleSubmit" block>Submit and Validate</wd-button>
  </view>
</wd-form>

<wd-select-picker v-model="model.platform" v-model:visible="showPlatformPicker" :columns="platformList" placeholder="Please select promotion platform" />
<wd-picker v-model="model.promotion" v-model:visible="showPromotionPicker" :columns="promotionList" placeholder="Please select promotion method" />
<wd-datetime-picker v-model="model.time" v-model:visible="showTimePicker" placeholder="Please select time" />
<wd-calendar v-model="model.date" v-model:visible="showDatePicker" placeholder="Please select date" />
```

```typescript [typescript]
<script lang="ts" setup>
import { useToast, zodAdapter } from '@/uni_modules/wot-ui'
import type { FormInstance, FormSchema } from '@/uni_modules/wot-ui/components/wd-form/types'
import dayjs from 'dayjs'
import { computed, reactive, ref, watch } from 'vue'
import { z } from 'zod'

const { success: showSuccess } = useToast()

const form = ref<FormInstance>()
const useZodSchema = ref(true)
const showPlatformPicker = ref(false)
const showPromotionPicker = ref(false)
const showTimePicker = ref(false)
const showDatePicker = ref(false)

const model = reactive<{
  amount: number | string
  remark: string
  account: string
  inviteCode: string
  city: string
  platform: string[]
  promotion: string[]
  time: number | string
  date: number | null
}>({
  amount: '',
  remark: '',
  account: '',
  inviteCode: '',
  city: '',
  platform: [],
  promotion: [],
  time: '',
  date: null
})

const requiredFields = new Set(['amount', 'remark', 'account', 'inviteCode', 'city', 'platform', 'promotion', 'time', 'date'])

const customSchema: FormSchema = {
  validate(formModel) {
    const issues = []
    if (formModel.amount === '' || Number(formModel.amount) <= 0) {
      issues.push({ path: ['amount'], message: 'Please enter an amount greater than 0' })
    }
    if (!formModel.remark || String(formModel.remark).trim().length < 4) {
      issues.push({ path: ['remark'], message: 'Remark must be at least 4 characters' })
    }
    if (!formModel.account || formModel.account.length < 3) {
      issues.push({ path: ['account'], message: 'Account must be at least 3 characters' })
    }
    if (!formModel.inviteCode) {
      issues.push({ path: ['inviteCode'], message: 'Please enter invite code' })
    }
    if (!formModel.city) {
      issues.push({ path: ['city'], message: 'Please enter city' })
    }
    if (!Array.isArray(formModel.platform) || !formModel.platform.length) {
      issues.push({ path: ['platform'], message: 'Please select promotion platform' })
    }
    if (!Array.isArray(formModel.promotion) || !formModel.promotion.length) {
      issues.push({ path: ['promotion'], message: 'Please select promotion method' })
    }
    if (!formModel.time) {
      issues.push({ path: ['time'], message: 'Please select time' })
    }
    if (!formModel.date) {
      issues.push({ path: ['date'], message: 'Please select date' })
    }
    return issues
  },
  isRequired(path: string) {
    return requiredFields.has(path)
  }
}

const zodSchema: FormSchema = zodAdapter(
  z.object({
    amount: z.union([z.string(), z.number()]).refine((value) => value !== '' && Number(value) > 0, 'Please enter an amount greater than 0'),
    remark: z.string().refine((value) => value.trim().length >= 4, 'Remark must be at least 4 characters'),
    account: z.string().min(3, 'Account must be at least 3 characters'),
    inviteCode: z.string().min(1, 'Please enter invite code'),
    city: z.string().min(1, 'Please enter city'),
    platform: z.array(z.string()).min(1, 'Please select promotion platform'),
    promotion: z.array(z.string()).min(1, 'Please select promotion method'),
    time: z.union([z.string(), z.number()]).refine((value) => !!value, 'Please select time'),
    date: z.union([z.number(), z.null()]).refine((value) => !!value, 'Please select date')
  }),
  {
    isRequired(path: string) {
      return requiredFields.has(path)
    }
  }
)

const activeSchema = computed<FormSchema>(() => {
  return useZodSchema.value ? zodSchema : customSchema
})

const platformList = ref([
  { value: '1', label: 'JD.com' },
  { value: '2', label: 'WeChat' },
  { value: '3', label: 'Douyin' }
])

const promotionList = ref([
  { value: '1', label: 'Full Reduction' },
  { value: '2', label: 'No Threshold' }
])

const platformText = computed(() => {
  if (!model.platform.length) return ''
  return model.platform
    .map((value) => {
      const item = platformList.value.find((option) => option.value === value)
      return item ? item.label : value
    })
    .join(', ')
})

const promotionText = computed(() => {
  if (!model.promotion.length) return ''
  return model.promotion
    .map((value) => {
      const item = promotionList.value.find((option) => option.value === value)
      return item ? item.label : value
    })
    .join(', ')
})

const timeText = computed(() => {
  if (!model.time) return ''
  if (typeof model.time === 'number') {
    return dayjs(model.time).format('YYYY-MM-DD HH:mm')
  }
  return model.time
})

const dateText = computed(() => {
  if (!model.date) return ''
  return dayjs(model.date).format('YYYY-MM-DD')
})

watch(
  () => useZodSchema.value,
  () => {
    form.value?.reset()
  }
)

function handleSubmit() {
  form.value?.validate().then(({ valid }) => {
    if (valid) {
      showSuccess('Validation passed')
    }
  })
}
</script>
```

```css [css]
.footer {
  padding: 16px;
}

.tip-text {
  color: #666;
  font-size: 14px;
}

:deep(.group) {
  &:not(:first-child) {
    margin-top: 12px;
  }
}
```

:::

## Specify Field Validation

The `validate` method can accept a `prop` parameter to specify the field to validate. This can be used to validate the field when the form component's `blur`, `change` and other events are triggered. The `prop` parameter can also be an array of fields to specify multiple fields for validation.

::: details View Specify Field Validation Example
::: code-group

```html [vue]
<wd-form ref="form" :model="model" errorType="toast">
  <wd-cell-group border>
    <wd-input
      label="Username"
      label-width="100px"
      prop="value1"
      clearable
      v-model="model.value1"
      placeholder="Please enter username"
      :rules="[{ required: true, message: 'Please enter username' }]"
    />
    <wd-input
      label="Password"
      label-width="100px"
      prop="value2"
      show-password
      clearable
      v-model="model.value2"
      placeholder="Please enter password"
      :rules="[{ required: true, message: 'Please enter password' }]"
    />
  </wd-cell-group>
  <view class="footer">
    <wd-button type="primary" size="large" @click="handleSubmit" block>Submit</wd-button>
    <wd-button type="primary" size="large" @click="handleValidate" block>Validate Username and Password</wd-button>
  </view>
</wd-form>
```

```typescript [typescript]
<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-ui'
import type { FormInstance } from '@/uni_modules/wot-ui/components/wd-form/types'
import { reactive, ref } from 'vue'

const { success: showSuccess } = useToast()
const model = reactive<{
  value1: string
  value2: string
}>({
  value1: '',
  value2: ''
})

const form = ref<FormInstance>()

function handleSubmit() {
  form
    .value!.validate()
    .then(({ valid, errors }) => {
      if (valid) {
        showSuccess({
          msg: 'Validation passed'
        })
      }
    })
    .catch((error) => {
      console.log(error, 'error')
    })
}

function handleValidate() {
  form.value?.validate(['value1', 'value2'])
}
</script>
```

```css [css]
.footer {
  padding: 16px;
}
```

:::

## Attributes

| Parameter | Description | Type | Default Value |
| ------------- | ----------------------------------------------------------------------------------- | --------------------- | --------- |
| model | Form data object | `Record<string, any>` | - |
| schema | Form validation object | `FormSchema` | - |
| validate-trigger | Validation trigger timing, optional values are `change`, `blur`, `submit` | `string \| string[]` | `submit` |
| reset-on-change | Whether to reset form prompt information when form data changes (when set to `false`, the developer needs to separately validate the changed item) | `boolean` | `true` |
| error-type | Validation error prompt method, optional values are `toast`, `message`, `none` | `string` | `message` |
| border | Whether to show border lines | `boolean` | `false` |
| center | Whether to vertically center content | `boolean` | `false` |
| size | Cell size, optional value is `large` | `string` | - |
| title-width | Left title width | `string \| number` | - |
| layout | Cell layout method, optional values are `horizontal`, `vertical` | `string` | - |
| value-align | Right content alignment method, optional values are `left`, `right`, `center` | `string` | - |
| asterisk-position | Required asterisk position, optional values are `start`, `end` | `string` | - |
| hide-asterisk | Whether to hide required asterisk | `boolean` | `false` |
| ellipsis | Whether to hide overflow and show ellipsis | `boolean` | `false` |

## Methods

| Method Name | Description | Parameters | Return Value |
| -------- | ------------------------------------------------------------------------------ | --------------- | --------------- |
| validate | Validate form, supports passing a prop to validate a single form item. When no prop is passed, all form items will be validated. Version 1.6.0 and above supports passing an array | `prop?: string \| string[]` | `Promise<{ valid: boolean, errors: ErrorMessage[] }>` |
| reset | Reset validation prompts for form items | - | - |

### FormItem Attributes

All properties of this component, in addition to supporting specific form item configurations, also inherit from the common configurations of the `Form` component (such as `border`, `center`, `size`, `title-width`, etc.).

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| prop | Form field model name | `string` | - |
| title | Title | `string` | - |
| value | Right display value, used with placeholder to determine whether to show placeholder text | `string \| number` | - |
| placeholder | Placeholder text displayed when value is empty, needs to be used with value | `string` | - |
| prefix-icon | Prefix icon class name | `string` | - |
| icon-size | Icon size | `string \| number` | - |
| icon-prefix | Class name prefix, used for custom icons | `string` | - |
| label | Description information | `string` | - |
| clickable | Whether to enable click feedback | `boolean` | `false` |
| is-link | Whether to show right arrow and enable click feedback | `boolean` | `false` |
| required | Whether required | `boolean` | - |
| validate-trigger | Validation trigger timing, optional values are `change`, `blur`, `submit` | `string \| string[]` | - |

### FormSchema Data Structure

| Key Name | Description | Type |
| ---------- | ------------------------------ | ------------------------------------------------------------- |
| validate | Validation function, returns array of issues | `(model) => FormSchemaIssue[] \| Promise<FormSchemaIssue[]>` |
| isRequired | Optional, used to derive required asterisk | `(path: string) => boolean \| undefined` |

## FormItem Events

| Event Name | Description | Parameters |
| -------- | ------------------------------------------------------------------------------ | --------------- |
| click | Triggered when clicking form item | - |

## External Style Classes

### FormItem External Style Classes

| Class Name | Description |
| ------------ | ---------- |
| custom-class | Root node style |
| custom-prefix-class | Prefix icon custom style class |
| custom-label-class | Custom style when label uses slot |
| custom-value-class | Custom style when value uses slot |
| custom-title-class | Custom style when title uses slot |
