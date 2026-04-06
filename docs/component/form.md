# Form 表单 

用于数据录入、校验，支持输入框、单选框、复选框、文件上传等类型。

表单采用 `wd-form` 和 `wd-form-item` 的结构。`wd-form-item` 内部继承了 `wd-cell` 的布局能力，负责展示标题描述和承载校验提示。各种输入组件（如 `Input`、`Textarea`、`Picker`、`Switch`、`Upload` 等）只需直接放入 `wd-form-item` 的默认插槽中即可。

结合 `wd-form` 组件，可以实现对内部组件的规则校验。如果需要让表单项之间有清晰的边框线分隔，你可以直接在 `wd-form` 上开启 `border` 属性。

## 校验引擎说明

表单组件默认采用接口式校验方案，你可以根据 `FormSchema` 的结构自己编写校验逻辑，详见后文的[自定义校验引擎](#自定义校验引擎)。

同时，我们推荐使用 [Zod](https://zod.dev/) 作为表单校验引擎。Zod 是一个以 TypeScript 为首的模式声明和验证库，你可以非常方便地通过 `z.object()` 等声明组合来构建你的表单验证规则。

### Zod 安装

~~内置了嫌组件库大，不内置又说安装麻烦，真想吊起来这种人来打。~~

出于组件库体积的考虑，我们不内置 Zod，所以在使用 Zod 前，你需要先将其安装到你的项目中：

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

### 结合 zodAdapter 使用

组件库内置了 `zodAdapter` 适配器，你可以直接通过它将 `Zod` 的 schema 转化为组件能够识别的校验规则：

```ts
import { z } from 'zod'
import { zodAdapter } from '@/uni_modules/wot-ui'

// 通过 zodAdapter 转换 zod 的模式对象
const schema = zodAdapter(
  z.object({
    username: z.string().min(1, '请填写用户名'),
    password: z.string().min(6, '密码至少为6位')
  })
)
```

## 自定义校验引擎

如果你不想使用 Zod，你也可以直接编写一个符合 `FormSchema` 结构的校验对象，实现自定义的表单校验引擎。

自定义校验引擎需要提供 `validate` 函数，其接收整个表单数据 `model`，并返回（或异步返回）包含 `path` 和 `message` 字段的错误问题数组。
如果需要控制必填星号（`*`）的显示，你还可以提供 `isRequired` 方法：

```ts
import type { FormSchema } from '@/uni_modules/wot-ui/components/wd-form/types'

const customSchema: FormSchema = {
  // 校验逻辑
  validate(formModel) {
    const issues = []
    if (!formModel.username) {
      issues.push({ path: ['username'], message: '请填写用户名' })
    }
    if (!formModel.password || formModel.password.length < 6) {
      issues.push({ path: ['password'], message: '密码至少为6位' })
    }
    return issues
  },
  // 用于推导必填星号
  isRequired(path: string) {
    return path === 'username' || path === 'password'
  }
}
```

## 组件类型

### 基础用法

在表单中，使用 `model` 指定表单数据对象，每个 `表单项组件` 代表一个表单项，使用 `prop` 指定表单项字段，使用 `schema` 属性定义校验规则。

::: details 查看基础用法示例
::: code-group

```html [vue]
<wd-form ref="form" :model="model" :schema="schema" :title-width="100">
  <wd-form-item title="歪比巴卜" prop="value1">
    <wd-input type="text" v-model="model.value1" placeholder="请输入歪比巴卜" />
  </wd-form-item>

  <wd-form-item title="沙卡拉卡" prop="value2">
    <wd-input type="text" v-model="model.value2" placeholder="请输入沙卡拉卡" />
  </wd-form-item>
  <view class="footer">
    <wd-button type="primary" size="large" @click="handleSubmit" block>提交</wd-button>
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
      value1: z.string().min(1, '请输入歪比巴卜'),
      value2: z.string().min(1, '请输入沙卡拉卡')
    })
    .superRefine((data, ctx) => {
      if (data.value1 === data.value2) return
      const message = '两个输入框的内容必须一致'
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
          msg: '校验通过'
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

## 组件配置

### 校验错误提示方式

1. `message`：默认为输入框下方用文字进行提示
2. `toast`：以"toast"提示的方式弹出错误信息，每次只弹出最前面的那个表单域的错误信息
3. `none`：不会进行任何提示

::: details 错误提示方式
::: code-group

```html [vue]
<wd-form ref="form" :model="model" :schema="activeSchema" :error-type="errorType" :title-width="100" border>
  <wd-cell-group custom-class="group" title="配置切换">
    <wd-form-item title="校验引擎" value-align="left">
      <wd-switch size="20" v-model="useZodSchema" active-text="Zod" inactive-text="自定义" />
    </wd-form-item>
    <wd-form-item title="提示方式" value-align="left">
      <wd-radio-group v-model="errorType" direction="horizontal">
        <wd-radio :value="'toast'">toast</wd-radio>
        <wd-radio :value="'message'">message</wd-radio>
        <wd-radio :value="'none'">none</wd-radio>
      </wd-radio-group>
    </wd-form-item>
  </wd-cell-group>
  <wd-cell-group custom-class="group" title="表单内容">
    <wd-form-item title="歪比巴卜" prop="value1">
      <wd-input clearable v-model="model.value1" placeholder="请输入歪比巴卜" />
    </wd-form-item>
    <wd-form-item title="沙卡拉卡" prop="value2">
      <wd-input show-password clearable v-model="model.value2" placeholder="请输入沙卡拉卡" />
    </wd-form-item>
  </wd-cell-group>
  <view class="footer">
    <wd-button type="primary" size="large" @click="handleSubmit" block>提交</wd-button>
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
      issues.push({ path: ['value1'], message: '请输入歪比巴卜' })
    }
    if (!formModel.value2) {
      issues.push({ path: ['value2'], message: '请输入沙卡拉卡' })
    }
    return issues
  },
  isRequired(path: string) {
    return path === 'value1' || path === 'value2'
  }
}

const zodSchema = zodAdapter(
  z.object({
    value1: z.string().min(1, '请输入歪比巴卜'),
    value2: z.string().min(1, '请输入沙卡拉卡')
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
          msg: '校验通过'
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

### 动态表单

表单项动态增减。

::: details 查看动态表单示例
::: code-group

```html [vue]
<wd-form ref="form" :model="model">
  <wd-cell-group border>
    <wd-input
      label="用户名"
      label-width="100px"
      prop="name"
      clearable
      v-model="model.name"
      placeholder="请输入用户名"
      :rules="[{ required: true, message: '请填写用户名' }]"
    />
    <wd-input
      v-for="(item, index) in model.phoneNumbers"
      :key="item.key"
      :label="'玛卡巴卡单号' + index"
      :prop="'phoneNumbers.' + index + '.value'"
      label-width="100px"
      clearable
      v-model="item.value"
      placeholder="玛卡巴卡单号"
      :rules="[{ required: true, message: '请填写玛卡巴卡单号' + index }]"
    />

    <wd-cell title-width="0px">
      <view class="footer">
        <wd-button size="small" type="info" plain @click="addPhone">添加</wd-button>
        <wd-button size="small" type="info" plain @click="removePhone">删除</wd-button>
        <wd-button size="small" type="info" plain @click="reset">重置</wd-button>
        <wd-button type="primary" size="small" @click="submit">提交</wd-button>
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
      showSuccess('校验通过')
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

#### 校验触发时机

通过配置 `validate-trigger` 可以指定校验触发时机，可选值为 `change`、`blur`、`submit`。可以在 `wd-form` 上配置全局触发时机，也可以在 `wd-form-item` 上配置覆盖全局设置。

::: details 校验触发时机
::: code-group

```html [vue]
<wd-form ref="form" :model="model" :schema="activeSchema" validate-trigger="change" :reset-on-change="false" :title-width="120">
  <wd-cell-group custom-class="group" title="配置">
    <wd-form-item title="校验引擎" value-align="left">
      <wd-switch v-model="useZodSchema" size="20" active-text="Zod" inactive-text="自定义" />
    </wd-form-item>
    <wd-form-item title="触发说明" value-align="left">
      <text class="tip-text">表单级 change，字段覆盖：blur/change/submit</text>
    </wd-form-item>
  </wd-cell-group>

  <wd-cell-group custom-class="group" title="输入类字段">
    <wd-form-item title="金额（change）" prop="amount">
      <wd-input-number v-model="model.amount" :min="0" :update-on-init="false" :max="9999" />
    </wd-form-item>
    <wd-form-item title="备注（change）" prop="remark">
      <wd-textarea v-model="model.remark" placeholder="请输入至少 4 个字" auto-height :maxlength="50" show-word-limit />
    </wd-form-item>
    <wd-form-item title="账号（blur）" prop="account" validate-trigger="blur">
      <wd-input v-model="model.account" clearable placeholder="失焦后触发校验" />
    </wd-form-item>
    <wd-form-item title="邀请码（change）" prop="inviteCode" validate-trigger="change">
      <wd-input v-model="model.inviteCode" clearable placeholder="值变化后触发校验" />
    </wd-form-item>
    <wd-form-item title="城市（submit）" prop="city" validate-trigger="submit">
      <wd-input v-model="model.city" clearable placeholder="仅提交时触发校验" />
    </wd-form-item>
  </wd-cell-group>

  <wd-cell-group custom-class="group" title="Picker 字段（change）">
    <wd-form-item
      title="推广平台"
      prop="platform"
      is-link
      :value="platformText"
      placeholder="请选择推广平台"
      @click="showPlatformPicker = true"
    />
    <wd-form-item
      title="优惠方式"
      prop="promotion"
      is-link
      :value="promotionText"
      placeholder="请选择优惠方式"
      @click="showPromotionPicker = true"
    />
    <wd-form-item title="时间" prop="time" is-link :value="timeText" placeholder="请选择时间" @click="showTimePicker = true" />
    <wd-form-item title="日期" prop="date" is-link :value="dateText" placeholder="请选择日期" @click="showDatePicker = true" />
  </wd-cell-group>

  <view class="footer">
    <wd-button type="primary" @click="handleSubmit" block>提交并校验</wd-button>
  </view>
</wd-form>

<wd-select-picker v-model="model.platform" v-model:visible="showPlatformPicker" :columns="platformList" placeholder="请选择推广平台" />
<wd-picker v-model="model.promotion" v-model:visible="showPromotionPicker" :columns="promotionList" placeholder="请选择优惠方式" />
<wd-datetime-picker v-model="model.time" v-model:visible="showTimePicker" placeholder="请选择时间" />
<wd-calendar v-model="model.date" v-model:visible="showDatePicker" placeholder="请选择日期" />
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
      issues.push({ path: ['amount'], message: '请输入大于 0 的金额' })
    }
    if (!formModel.remark || String(formModel.remark).trim().length < 4) {
      issues.push({ path: ['remark'], message: '备注至少输入 4 个字' })
    }
    if (!formModel.account || formModel.account.length < 3) {
      issues.push({ path: ['account'], message: '账号至少 3 位' })
    }
    if (!formModel.inviteCode) {
      issues.push({ path: ['inviteCode'], message: '请输入邀请码' })
    }
    if (!formModel.city) {
      issues.push({ path: ['city'], message: '请输入城市' })
    }
    if (!Array.isArray(formModel.platform) || !formModel.platform.length) {
      issues.push({ path: ['platform'], message: '请选择推广平台' })
    }
    if (!Array.isArray(formModel.promotion) || !formModel.promotion.length) {
      issues.push({ path: ['promotion'], message: '请选择优惠方式' })
    }
    if (!formModel.time) {
      issues.push({ path: ['time'], message: '请选择时间' })
    }
    if (!formModel.date) {
      issues.push({ path: ['date'], message: '请选择日期' })
    }
    return issues
  },
  isRequired(path: string) {
    return requiredFields.has(path)
  }
}

const zodSchema: FormSchema = zodAdapter(
  z.object({
    amount: z.union([z.string(), z.number()]).refine((value) => value !== '' && Number(value) > 0, '请输入大于 0 的金额'),
    remark: z.string().refine((value) => value.trim().length >= 4, '备注至少输入 4 个字'),
    account: z.string().min(3, '账号至少 3 位'),
    inviteCode: z.string().min(1, '请输入邀请码'),
    city: z.string().min(1, '请输入城市'),
    platform: z.array(z.string()).min(1, '请选择推广平台'),
    promotion: z.array(z.string()).min(1, '请选择优惠方式'),
    time: z.union([z.string(), z.number()]).refine((value) => !!value, '请选择时间'),
    date: z.union([z.number(), z.null()]).refine((value) => !!value, '请选择日期')
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
  { value: '1', label: '京东' },
  { value: '2', label: '微信' },
  { value: '3', label: '抖音' }
])

const promotionList = ref([
  { value: '1', label: '满减' },
  { value: '2', label: '无门槛' }
])

const platformText = computed(() => {
  if (!model.platform.length) return ''
  return model.platform
    .map((value) => {
      const item = platformList.value.find((option) => option.value === value)
      return item ? item.label : value
    })
    .join('、')
})

const promotionText = computed(() => {
  if (!model.promotion.length) return ''
  return model.promotion
    .map((value) => {
      const item = promotionList.value.find((option) => option.value === value)
      return item ? item.label : value
    })
    .join('、')
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
      showSuccess('校验通过')
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

## 指定字段校验

`validate` 方法可以传入一个 `prop` 参数，指定校验的字段，可以实现在表单组件的`blur`、`change`等事件触发时对该字段的校验。`prop` 参数也可以是一个字段数组，指定多个字段进行校验。

::: details 查看指定字段校验示例
::: code-group

```html [vue]
<wd-form ref="form" :model="model" errorType="toast">
  <wd-cell-group border>
    <wd-input
      label="用户名"
      label-width="100px"
      prop="value1"
      clearable
      v-model="model.value1"
      placeholder="请输入用户名"
      :rules="[{ required: true, message: '请填写用户名' }]"
    />
    <wd-input
      label="密码"
      label-width="100px"
      prop="value2"
      show-password
      clearable
      v-model="model.value2"
      placeholder="请输入密码"
      :rules="[{ required: true, message: '请填写密码' }]"
    />
  </wd-cell-group>
  <view class="footer">
    <wd-button type="primary" size="large" @click="handleSubmit" block>提交</wd-button>
    <wd-button type="primary" size="large" @click="handleValidate" block>校验用户名和密码</wd-button>
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
          msg: '校验通过'
        })
      }
    })
    .catch((error) => {
      console.log(error, 'error')
    })
}

function handleValidate() {
  form
    .value!.validate(['value1', 'value2'])
    .then(({ valid, errors }) => {
      if (valid) {
        showSuccess({
          msg: '校验通过'
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
  padding: 12px;
}
```

:::

### 复杂表单

结合`Input 输入框`、`Textarea 输入框`、`Picker 选择器`、 `Calendar 日历选择器`、 `Cascader 级联选择器`、`SelectPicker 单复选选择器`、`Cell 单元格` 和 `DatetimePicker 日期时间选择器`实现一个复杂表单。

::: details 查看复杂表单示例
::: code-group

```html [vue/html]
<wd-select-picker
  v-model="model.platform"
  v-model:visible="showPlatformPicker"
  :columns="platformList"
  placeholder="请选择推广平台"
/>
<wd-picker
  v-model="model.promotion"
  v-model:visible="showPromotionPicker"
  :columns="promotionlist"
  placeholder="请选择优惠方式"
/>
<wd-datetime-picker v-model="model.time" v-model:visible="showTimePicker" placeholder="请选择时间" />
<wd-calendar v-model="model.date" v-model:visible="showDatePicker" placeholder="请选择日期" />
<wd-cascader
  v-model="model.address"
  v-model:visible="showAddressPicker"
  placeholder="请选择地址"
  :options="area"
  @confirm="handleAddressConfirm"
/>
<wd-dialog />
<wd-form ref="form" :model="model" :schema="activeSchema" :title-width="100" :layout="formItemLayout" border asterisk-position="end">
  <wd-cell-group custom-class="group" title="布局切换示例">
    <wd-form-item title="表单项布局" value-align="left">
      <wd-switch size="20" v-model="isVerticalLayout" />
      <text class="layout-tip">{{ isVerticalLayout ? '上下布局' : '左右布局' }}</text>
    </wd-form-item>
    <wd-form-item title="校验引擎" value-align="left">
      <wd-switch size="20" v-model="useZodSchema" active-text="Zod" inactive-text="自定义" />
    </wd-form-item>
  </wd-cell-group>
  <wd-cell-group custom-class="group" title="基础信息">
    <wd-form-item title="优惠券名称" prop="couponName" required>
      <wd-input
        :maxlength="20"
        show-word-limit
        suffix-icon="question-circle"
        v-model="model.couponName"
        placeholder="请输入优惠券名称"
        @clicksuffixicon="handleIconClick"
        compact
      />
    </wd-form-item>
    <wd-form-item
      ellipsis
      title="推广平台"
      prop="platform"
      is-link
      :value="platformText"
      placeholder="请选择推广平台"
      @click="showPlatformPicker = true"
    />
    <wd-form-item
      title="优惠方式"
      prop="promotion"
      is-link
      :value="promotionText"
      placeholder="请选择优惠方式"
      @click="showPromotionPicker = true"
    />
    <wd-form-item prop="threshold" title="券面额" required title-width="100px" custom-value-class="cell-left">
      <view style="text-align: left">
        <view class="inline-txt" style="margin-left: 0">满</view>
        <wd-input
          compact
          custom-style="display: inline-block; width: 70px; vertical-align: middle"
          placeholder="请输入金额"
          v-model="model.threshold"
        />
        <view class="inline-txt">减</view>
        <wd-input
          compact
          custom-style="display: inline-block; width: 70px; vertical-align: middle"
          placeholder="请输入金额"
          v-model="model.price"
        />
      </view>
    </wd-form-item>
  </wd-cell-group>
  <wd-cell-group custom-class="group" title="时间和地址">
    <wd-form-item
      title="时间"
      prop="time"
      is-link
      :value="timeText"
      placeholder="请选择时间"
      @click="showTimePicker = true"
    />
    <wd-form-item
      title="日期"
      prop="date"
      is-link
      :value="dateText"
      placeholder="请选择日期"
      @click="showDatePicker = true"
    />
    <wd-form-item
      title="地区"
      prop="address"
      is-link
      :value="addressText"
      placeholder="请选择地区"
      @click="showAddressPicker = true"
    />
  </wd-cell-group>
  <wd-cell-group custom-class="group" title="其他信息">
    <wd-form-item title="活动细则" prop="content">
      <wd-textarea
        type="textarea"
        v-model="model.content"
        :maxlength="300"
        show-word-limit
        placeholder="请输入活动细则信息"
        clearable
        auto-height
        compact
      />
    </wd-form-item>
    <wd-form-item title="发货数量" title-width="100px" prop="count" value-align="left">
      <wd-input-number v-model="model.count" />
    </wd-form-item>
    <wd-form-item title="开启折扣" title-width="100px" prop="switchVal" value-align="left" center>
      <wd-switch v-model="model.switchVal" size="20" />
    </wd-form-item>
    <wd-form-item v-if="model.switchVal" title="折扣" prop="discount">
      <wd-input placeholder="请输入优惠金额" clearable v-model="model.discount" compact />
    </wd-form-item>
    <wd-form-item title="歪比巴卜" prop="cardId">
      <wd-input suffix-icon="camera" placeholder="请输入歪比巴卜" clearable v-model="model.cardId" compact />
    </wd-form-item>
    <wd-form-item title="玛卡巴卡" prop="phone">
      <wd-input placeholder="请输入玛卡巴卡" clearable v-model="model.phone" compact />
    </wd-form-item>
    <wd-form-item title="活动图片" title-width="100px" prop="fileList">
      <wd-upload
        :file-list="model.fileList"
        action="https://69bd04402bc2a25b22ad0a49.mockapi.io/upload"
        @change="handleFileChange"
      ></wd-upload>
    </wd-form-item>
  </wd-cell-group>
  <wd-cell-group custom-class="group" title="组合示例">
    <wd-form-item title="投放优先级" prop="priority">
      <wd-radio-group v-model="model.priority" direction="horizontal">
        <wd-radio :value="1">高</wd-radio>
        <wd-radio :value="2">中</wd-radio>
        <wd-radio :value="3">低</wd-radio>
      </wd-radio-group>
    </wd-form-item>
    <wd-form-item title="投放标签" prop="tags">
      <wd-checkbox-group v-model="model.tags" direction="horizontal">
        <wd-checkbox :name="1">新品</wd-checkbox>
        <wd-checkbox :name="2">爆款</wd-checkbox>
        <wd-checkbox :name="3">清仓</wd-checkbox>
      </wd-checkbox-group>
    </wd-form-item>
    <wd-form-item title="活动评分" prop="rate">
      <wd-rate v-model="model.rate" allow-half clearable />
    </wd-form-item>
    <wd-form-item title="预算强度" prop="budget">
      <wd-slider ref="sliderRef" v-model="model.budget" show-extreme-value />
    </wd-form-item>
    <wd-form-item title="滑块验证" prop="verified">
      <wd-slide-verify ref="slideVerifyRef" @success="handleVerifySuccess" @fail="handleVerifyFail" />
    </wd-form-item>
  </wd-cell-group>
  <view class="tip">
    <wd-form-item prop="read" title-width="0px" :border="false">
      <wd-checkbox v-model="model.read">
        已阅读并同意
        <text style="color: #4d80f0">《巴拉巴拉吧啦协议》</text>
      </wd-checkbox>
    </wd-form-item>
  </view>
  <view class="footer">
    <wd-button type="primary" size="large" @click="handleSubmit" block>提交</wd-button>
  </view>
</wd-form>
```

```ts [typescript]
<script lang="ts" setup>
import { useToast, zodAdapter } from '@/uni_modules/wot-ui'
import { isArray } from '@/uni_modules/wot-ui/common/util'
import { useCascaderAreaData } from '@vant/area-data'
import { type FormInstance, type FormSchema, type FormSchemaIssue } from '@/uni_modules/wot-ui/components/wd-form/types'
import type { SliderInstance } from '@/uni_modules/wot-ui/components/wd-slider/types'
import type { SlideVerifyInstance } from '@/uni_modules/wot-ui/components/wd-slide-verify/types'
import type { UploadFileItem } from '@/uni_modules/wot-ui/components/wd-upload/types'
import type { CascaderOption } from '@/uni_modules/wot-ui/components/wd-cascader/types'

import dayjs from 'dayjs'
import { computed, nextTick, reactive, ref, watch } from 'vue'
import { z } from 'zod'

const showPlatformPicker = ref(false)
const showPromotionPicker = ref(false)
const showTimePicker = ref(false)
const showDatePicker = ref(false)
const showAddressPicker = ref(false)
const addressText = ref('')
const isVerticalLayout = ref(false)
const useZodSchema = ref(true)
const formItemLayout = computed(() => (isVerticalLayout.value ? 'vertical' : 'horizontal'))
const sliderRef = ref<SliderInstance>()
const slideVerifyRef = ref<SlideVerifyInstance>()

const model = reactive<{
  couponName: string
  platform: any[]
  promotion: any[]
  threshold: string
  price: string
  time: number | string
  date: null | number
  address: string
  count: number
  content: string
  switchVal: boolean
  cardId: string
  phone: string
  read: boolean
  fileList: UploadFileItem[]
  discount: number
  priority: number
  tags: number[]
  rate: number
  budget: number
  verified: boolean
}>({
  couponName: '',
  platform: [],
  promotion: [],
  threshold: '',
  price: '',
  date: null,
  time: '',
  address: '',
  count: 1,
  content: '',
  switchVal: true,
  cardId: '',
  phone: '',
  read: false,
  fileList: [],
  discount: 1,
  priority: 2,
  tags: [],
  rate: 3.5,
  budget: 35,
  verified: false
})

const requiredFields = new Set([
  'couponName',
  'content',
  'threshold',
  'platform',
  'promotion',
  'time',
  'date',
  'address',
  'count',
  'cardId',
  'phone',
  'fileList',
  'discount',
  'priority',
  'tags',
  'rate',
  'budget',
  'verified'
])

const customSchema: FormSchema = {
  async validate(formModel) {
    const issues: FormSchemaIssue[] = []
    const pushIssue = (path: string, message: string) => {
      issues.push({ path: [path], message })
    }
    if (!formModel.couponName) {
      pushIssue('couponName', '请输入优惠券名称')
    } else if (!/\d{6}/.test(formModel.couponName)) {
      pushIssue('couponName', '优惠券名称6个字以上')
    }
    if (!formModel.content || formModel.content.length <= 2) {
      pushIssue('content', '请输入活动细则信息')
    }
    if (!formModel.threshold || !formModel.price) {
      pushIssue('threshold', '请输入满减金额')
    }
    if (!isArray(formModel.platform) || !formModel.platform.length) {
      pushIssue('platform', '请选择推广平台')
    }
    if (!isArray(formModel.promotion) || !formModel.promotion.length) {
      pushIssue('promotion', '请选择优惠方式')
    }
    if (!formModel.time) {
      pushIssue('time', '请选择时间')
    }
    if (!formModel.date) {
      pushIssue('date', '请选择日期')
    }
    if (!formModel.address) {
      pushIssue('address', '请选择地址')
    }
    if (formModel.count === '' || formModel.count === undefined || formModel.count === null) {
      pushIssue('count', '发货数量需要大于1')
    } else if (Number(formModel.count) <= 1) {
      pushIssue('count', '发货数量需要大于1')
    }
    if (!formModel.cardId) {
      pushIssue('cardId', '请输入歪比巴卜')
    }
    if (!formModel.phone) {
      pushIssue('phone', '请输入玛卡巴卡')
    }
    if (!isArray(formModel.fileList) || !formModel.fileList.length) {
      pushIssue('fileList', '请选择活动图片')
    }
    if (!formModel.discount) {
      pushIssue('discount', '请输入优惠金额')
    }
    if (formModel.priority === '' || formModel.priority === undefined || formModel.priority === null) {
      pushIssue('priority', '请选择投放优先级')
    }
    if (!isArray(formModel.tags) || !formModel.tags.length) {
      pushIssue('tags', '请至少选择一个投放标签')
    }
    if (formModel.rate === '' || formModel.rate === undefined || formModel.rate === null) {
      pushIssue('rate', '请完成活动评分')
    }
    if (formModel.budget === '' || formModel.budget === undefined || formModel.budget === null) {
      pushIssue('budget', '请设置预算强度')
    }
    if (!formModel.verified) {
      pushIssue('verified', '请完成滑块验证')
    }
    return issues
  },
  isRequired(path: string) {
    return requiredFields.has(path)
  }
}

const zodSchema: FormSchema = zodAdapter(
  z.object({
    couponName: z.string().regex(/\d{6}/, '优惠券名称6个字以上'),
    content: z.string().min(3, '请输入活动细则信息'),
    threshold: z.string().min(1, '请输入满减金额'),
    price: z.string().optional(),
    platform: z.array(z.any()).min(1, '请选择推广平台'),
    promotion: z.array(z.any()).min(1, '请选择优惠方式'),
    time: z.union([z.string(), z.number()]).refine((value) => !!value, '请选择时间'),
    date: z.union([z.number(), z.null()]).refine((value) => !!value, '请选择日期'),
    address: z.string().min(1, '请选择地址'),
    count: z.number().gt(1, '发货数量需要大于1'),
    switchVal: z.boolean().optional(),
    discount: z.number().optional(),
    cardId: z.string().min(1, '请输入歪比巴卜'),
    phone: z.string().min(1, '请输入玛卡巴卡'),
    fileList: z.array(z.any()).min(1, '请选择活动图片'),
    priority: z.number(),
    tags: z.array(z.number()).min(1, '请至少选择一个投放标签'),
    rate: z.number(),
    budget: z.number(),
    verified: z.boolean().refine((value) => value, '请完成滑块验证')
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

const platformList = ref<any>([
  { value: '1', label: '京东' },
  { value: '2', label: '开普勒' },
  { value: '3', label: '手Q' },
  { value: '4', label: '微信' },
  { value: '5', label: '1号店' },
  { value: '6', label: '十元街' },
  { value: '7', label: '京东极速版' }
])
const promotionlist = ref<any[]>([
  { value: '1', label: '满减' },
  { value: '2', label: '无门槛' }
])

const area = ref<any[]>([
  useCascaderAreaData().map((item) => {
    return {
      value: item.value,
      label: item.text
    }
  })
])

const toast = useToast()
const form = ref<FormInstance>()

watch(
  () => isVerticalLayout.value,
  async () => {
    await nextTick()
    sliderRef.value?.initSlider()
    await slideVerifyRef.value?.init()
    slideVerifyRef.value?.reset()
  }
)

const platformText = computed(() => {
  if (!isArray(model.platform) || !model.platform.length) return ''
  return model.platform
    .map((val: string) => {
      const item = platformList.value.find((option: any) => option.value === val)
      return item ? item.label : val
    })
    .join('、')
})

const promotionText = computed(() => {
  if (!isArray(model.promotion) || !model.promotion.length) return ''
  return model.promotion
    .map((val: string) => {
      const item = promotionlist.value.find((option: any) => option.value === val)
      return item ? item.label : val
    })
    .join('、')
})

const timeText = computed(() => {
  if (!model.time) return ''
  if (typeof model.time === 'number') return dayjs(model.time).format('YYYY-MM-DD HH:mm')
  return model.time
})

const dateText = computed(() => {
  if (!model.date) return ''
  return dayjs(model.date).format('YYYY-MM-DD')
})

function handleAddressConfirm({ selectedOptions }: { selectedOptions: CascaderOption[] }) {
  addressText.value = selectedOptions.map((item) => item.text).join('/')
}

function handleVerifySuccess() {
  model.verified = true
}

function handleVerifyFail() {
  model.verified = false
}

function handleFileChange({ fileList }: any) {
  model.fileList = fileList
}

function handleSubmit() {
  form
    .value!.validate()
    .then(({ valid, errors }) => {
      if (valid) {
        toast.success('提交成功')
      }
      console.log(valid)
      console.log(errors)
    })
    .catch((error) => {
      console.log(error, 'error')
    })
}

function handleIconClick() {
  toast.info('优惠券提示信息')
}
</script>
```

```css [css]
.inline-txt {
  display: inline-block;
  font-size: 14px;
  margin: 0 8px;
  color: rgba(0, 0, 0, 0.45);
  vertical-align: middle;
}
:deep(.group) {
  &:not(:first-child) {
    margin-top: 12px;
  }
}
.tip {
  margin: 12px 0 12px;
  color: #999;
  font-size: 12px;
}
.footer {
  padding: 0 24px 20px;
}
.layout-tip {
  margin-left: 8px;
  color: #666;
  font-size: 14px;
}
:deep(.label-class) {
  color: #999 !important;
  font-size: 12px !important;
}
```
:::

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| ------------- | ----------------------------------------------------------------------------------- | --------------------- | --------- |
| model | 表单数据对象 | `Record<string, any>` | - |
| schema | 表单校验对象 | `FormSchema` | - |
| validate-trigger | 校验触发时机，可选值为 `change`、`blur`、`submit` | `string \| string[]` | `submit` |
| reset-on-change | 表单数据变化时是否重置表单提示信息（设置为 `false` 时需要开发者单独对变更项进行校验） | `boolean` | `true` |
| error-type | 校验错误提示方式，可选值为 `toast`、`message`、`none` | `string` | `message` |
| border | 是否展示边框线 | `boolean` | `false` |
| center | 是否使内容垂直居中 | `boolean` | `false` |
| size | 单元格大小，可选值为 `large` | `string` | - |
| title-width | 左侧标题宽度 | `string \| number` | - |
| layout | 单元格布局方式，可选值为 `horizontal`、`vertical` | `string` | - |
| value-align | 右侧内容对齐方式，可选值为 `left`、`right`、`center` | `string` | - |
| asterisk-position | 必填星号位置，可选值为 `start`、`end` | `string` | - |
| hide-asterisk | 是否隐藏必填星号 | `boolean` | `false` |
| ellipsis | 是否超出隐藏显示省略号 | `boolean` | `false` |

## Methods

| 方法名称 | 说明 | 参数 | 返回值 |
| -------- | ------------------------------------------------------------------------------ | --------------- | --------------- |
| validate | 验证表单，支持传入一个 prop 来验证单个表单项，不传入 prop 时，会验证所有表单项，1.6.0 版本起支持传入数组 | `prop?: string \| string[]` | `Promise<{ valid: boolean, errors: ErrorMessage[] }>` |
| reset | 重置表单项的验证提示 | - | - |


### FormItem Attributes

该组件的所有属性除了支持特定表单项配置外，同时也继承自 `Form` 组件的公共配置（如 `border`、`center`、`size`、`title-width` 等）。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| prop | 表单域 model 字段名 | `string` | - |
| title | 标题 | `string` | - |
| value | 右侧展示值，用于配合 placeholder 判断是否显示占位文字 | `string \| number` | - |
| placeholder | 值为空时显示的占位文字，需与 value 配合使用 | `string` | - |
| prefix-icon | 前置图标类名 | `string` | - |
| icon-size | 图标大小 | `string \| number` | - |
| icon-prefix | 类名前缀，用于使用自定义图标 | `string` | - |
| label | 描述信息 | `string` | - |
| clickable | 是否开启点击反馈 | `boolean` | `false` |
| is-link | 是否展示右侧箭头并开启点击反馈 | `boolean` | `false` |
| required | 是否必填 | `boolean` | - |
| validate-trigger | 校验触发时机，可选值为 `change`、`blur`、`submit` | `string \| string[]` | - |

### FormSchema 数据结构

| 键名       | 说明                           | 类型                                                          |
| ---------- | ------------------------------ | ------------------------------------------------------------- |
| validate   | 校验函数，返回问题数组         | `(model) => FormSchemaIssue[] \| Promise<FormSchemaIssue[]>` |
| isRequired | 可选，用于推导必填星号         | `(path: string) => boolean \| undefined`                     |

## FormItem Events

| 事件名称 | 说明 | 参数 |
| -------- | ------------------------------------------------------------------------------ | --------------- |
| click | 点击表单项时触发 | - |


## 外部样式类

### FormItem 外部样式类

| 类名 | 说明 |
| ------------ | ---------- |
| custom-class | 根节点样式 |
| custom-prefix-class | 前置图标自定义样式类 |
| custom-label-class | label 使用 slot 时的自定义样式 |
| custom-value-class | value 使用 slot 时的自定义样式 |
| custom-title-class | title 使用 slot 时的自定义样式 |
