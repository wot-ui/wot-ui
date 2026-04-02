# Steps 步骤条

用于引导用户按照流程完成任务，或向用户展示当前所处的步骤状态。

:::tip 提示
`wd-step` 已直接支持 `title`、`icon` 和 `description` 插槽，无需再设置旧版的 `*-slot` 控制字段。
:::

## 组件类型

### 基本用法

`active` 为当前步骤进度，对应步骤下标。

```html
<wd-steps :active="0">
  <wd-step />
  <wd-step />
  <wd-step />
</wd-steps>
```

### 标题和描述信息

通过 `title` 和 `description` 设置每个步骤的标题和描述。

```html
<wd-steps :active="active" align-center>
  <wd-step title="步骤1" description="注册1个账号" />
  <wd-step title="步骤2" description="登录账号并绑定手机" />
  <wd-step title="步骤3" description="完善个人信息" />
</wd-steps>
<wd-button size="small" @click="nextStep">下一步</wd-button>
```

```ts
const active = ref(0)

function nextStep() {
  active.value += 1
}
```

### 修改图标

通过 `icon` 设置步骤图标。

```html
<wd-steps :active="1" align-center>
  <wd-step icon="settings" />
  <wd-step icon="list" />
  <wd-step icon="clock-circle" />
</wd-steps>
```

## 组件状态

### 修改状态

通过 `status` 设置指定步骤的状态。

```html
<wd-steps :active="1" align-center>
  <wd-step title="绑定手机" />
  <wd-step title="重新绑定手机" status="error" />
  <wd-step title="步骤3" />
</wd-steps>
```

## 组件样式

### 水平居中

设置 `align-center` 水平居中，只对横向步骤条有效。

```html
<wd-steps :active="0" align-center>
  <wd-step />
  <wd-step />
  <wd-step />
</wd-steps>
```

## 布局能力

### 竖向步骤条

设置 `vertical` 以垂直方向展示。

```html
<wd-steps :active="1" vertical>
  <wd-step description="注册1个账号" />
  <wd-step description="登录账号并绑定手机" />
  <wd-step description="完善个人信息" />
</wd-steps>
```

## 特殊样式

### 点状步骤条

设置 `dot` 使用点状步骤条。

```html
<wd-steps :active="1" align-center dot>
  <wd-step title="步骤1" description="注册1个账号" />
  <wd-step title="步骤2" description="登录账号并绑定手机" />
  <wd-step title="步骤3" description="完善个人信息" />
</wd-steps>
```

### 可控制的点状步骤条

点状步骤条支持通过外部 `active` 控制当前步骤。

```html
<wd-steps :active="dotActive" align-center dot>
  <wd-step title="步骤1" description="注册一个账号" />
  <wd-step title="步骤2" description="登录账号并绑定手机" />
  <wd-step title="步骤3" description="完善个人信息" />
</wd-steps>
```

### 竖向点状步骤条

`vertical` 和 `dot` 可以组合使用。

```html
<wd-steps :active="1" vertical dot>
  <wd-step description="注册1个账号" />
  <wd-step description="登录账号并绑定手机" />
  <wd-step description="完善个人信息" />
</wd-steps>
```

## Steps Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| active | 当前激活步骤下标 | `number` | `0` |
| vertical | 是否垂直方向展示 | `boolean` | `false` |
| dot | 是否使用点状步骤条 | `boolean` | `false` |
| space | 步骤条间距，默认自动计算 | `string` | `''` |
| align-center | 是否水平居中，只对横向步骤条有效 | `boolean` | `false` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## Step Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 步骤标题，不传时显示默认文案 | `string` | - |
| description | 步骤描述 | `string` | - |
| icon | 步骤图标 | `string` | - |
| status | 步骤状态，可选值为 `finished`、`process`、`error`、`wait` | `StepStatus` | - |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## Steps Slots

| name | 说明 |
| --- | --- |
| default | Step 列表 |

## Step Slots

| name | 说明 |
| --- | --- |
| icon | 自定义步骤图标 |
| title | 自定义步骤标题 |
| description | 自定义步骤描述 |

