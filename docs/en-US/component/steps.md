# Steps

Used to guide users through completing tasks in a process, or to show users the current step status.

:::tip Tip
`wd-step` now directly supports `title`, `icon`, and `description` slots. No need to set the old `*-slot` control fields.
:::

## Component Types

### Basic Usage

`active` is the current step progress, corresponding to the step index.

```html
<wd-steps :active="0">
  <wd-step />
  <wd-step />
  <wd-step />
</wd-steps>
```

### Title and Description

Set the title and description for each step via `title` and `description`.

```html
<wd-steps :active="active" align-center>
  <wd-step title="Step 1" description="Register an account" />
  <wd-step title="Step 2" description="Log in and bind phone" />
  <wd-step title="Step 3" description="Complete personal information" />
</wd-steps>
<wd-button size="small" @click="nextStep">Next Step</wd-button>
```

```ts
const active = ref(0)

function nextStep() {
  active.value += 1
}
```

### Custom Icon

Set the step icon via `icon`.

```html
<wd-steps :active="1" align-center>
  <wd-step icon="settings" />
  <wd-step icon="list" />
  <wd-step icon="clock-circle" />
</wd-steps>
```

## Component States

### Modify Status

Set the status of a specific step via `status`.

```html
<wd-steps :active="1" align-center>
  <wd-step title="Bind Phone" />
  <wd-step title="Rebind Phone" status="error" />
  <wd-step title="Step 3" />
</wd-steps>
```

## Component Styles

### Horizontal Center

Setting `align-center` centers horizontally. Only effective for horizontal step bars.

```html
<wd-steps :active="0" align-center>
  <wd-step />
  <wd-step />
  <wd-step />
</wd-steps>
```

## Layout Capabilities

### Vertical Steps

Setting `vertical` displays in vertical direction.

```html
<wd-steps :active="1" vertical>
  <wd-step description="Register an account" />
  <wd-step description="Log in and bind phone" />
  <wd-step description="Complete personal information" />
</wd-steps>
```

## Special Styles

### Dot Steps

Setting `dot` uses dot-style steps.

```html
<wd-steps :active="1" align-center dot>
  <wd-step title="Step 1" description="Register an account" />
  <wd-step title="Step 2" description="Log in and bind phone" />
  <wd-step title="Step 3" description="Complete personal information" />
</wd-steps>
```

### Controllable Dot Steps

Dot-style steps support controlling the current step via external `active`.

```html
<wd-steps :active="dotActive" align-center dot>
  <wd-step title="Step 1" description="Register an account" />
  <wd-step title="Step 2" description="Log in and bind phone" />
  <wd-step title="Step 3" description="Complete personal information" />
</wd-steps>
```

### Vertical Dot Steps

`vertical` and `dot` can be combined.

```html
<wd-steps :active="1" vertical dot>
  <wd-step description="Register an account" />
  <wd-step description="Log in and bind phone" />
  <wd-step description="Complete personal information" />
</wd-steps>
```

## Steps Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| active | Current active step index | `number` | `0` |
| vertical | Whether to display vertically | `boolean` | `false` |
| dot | Whether to use dot-style steps | `boolean` | `false` |
| space | Step bar spacing, automatically calculated by default | `string` | `''` |
| align-center | Whether to center horizontally, only effective for horizontal step bars | `boolean` | `false` |
| glass | Enable glassmorphism (glass) style | boolean | `false` |
| custom-class | Root node custom class name | `string` | `''` |
| custom-style | Root node custom style | `string` | `''` |

## Step Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| title | Step title, displays default text when not passed | `string` | - |
| description | Step description | `string` | - |
| icon | Step icon | `string` | - |
| status | Step status, optional values are `finished`, `process`, `error`, `wait` | `StepStatus` | - |
| custom-class | Root node custom class name | `string` | `''` |
| custom-style | Root node custom style | `string` | `''` |

## Steps Slots

| name | Description |
| --- | --- |
| default | Step list |

## Step Slots

| name | Description |
| --- | --- |
| icon | Custom step icon |
| title | Custom step title |
| description | Custom step description |
