# Collapse

Place a set of content in multiple collapsible panels, click panel title to expand or collapse content.

## Component Type

### Basic Usage

`v-model` binding value can be:
- Normal collapse: `string[]`
- Accordion mode: `string`
- View more mode: `boolean`

```html
<wd-collapse v-model="value">
  <wd-collapse-item title="Tag 1" name="item1">This is a simple example text.</wd-collapse-item>
  <wd-collapse-item title="Tag 2" name="item2">This is a simple example text.</wd-collapse-item>
</wd-collapse>
```

## Component State

### Disabled

Set `wd-collapse-item` `disabled` property to disable a single panel.

```html
<wd-collapse v-model="value">
  <wd-collapse-item title="Tag 1" name="item1">This is a simple example text.</wd-collapse-item>
  <wd-collapse-item title="Tag 2" name="item2" disabled>This is a simple example text.</wd-collapse-item>
</wd-collapse>
```

### Async Update

Execute interception before panel opens through `before-expend`, return `boolean` or `Promise<boolean>`.

```html
<wd-collapse v-model="value">
  <wd-collapse-item v-for="item in itemList" :key="item.name" :title="item.title" :name="item.name" :before-expend="beforeExpend">
    {{ item.body }}
  </wd-collapse-item>
</wd-collapse>
```

```ts
const beforeExpend = (name: string) => {
  return new Promise<boolean>((resolve) => {
    setTimeout(() => resolve(true), 500)
  })
}
```

## Component Variant

### Accordion

Set `accordion` to expand only one item at the same time.

```html
<wd-collapse v-model="value" accordion>
  <wd-collapse-item title="Tag 1" name="item1">This is a simple example text.</wd-collapse-item>
  <wd-collapse-item title="Tag 2" name="item2">This is a simple example text.</wd-collapse-item>
  <wd-collapse-item title="Tag 3" name="item3">This is a simple example text.</wd-collapse-item>
</wd-collapse>
```

### View More

Set `viewmore` to collapse long text, `line-num` controls collapsed line count.

```html
<wd-collapse v-model="value" viewmore :line-num="3">
  This is a simple example text. This is a simple example text. This is a simple example text. This is a simple example text.
</wd-collapse>
```

## Component Style

### Custom Title

Use `wd-collapse-item` `title` named slot, can get `expanded / disabled / isFirst`.

```html
<wd-collapse v-model="value">
  <wd-collapse-item name="item1">
    <template #title="{ expanded }">
      <view class="header">
        <text style="color: red">Custom title through slot</text>
        <text>{{ expanded ? 'I am expanded' : 'I am collapsed' }}</text>
      </view>
    </template>
    This is a simple example text.
  </wd-collapse-item>
</wd-collapse>
```

### View More Slot

In view more mode, `use-more-slot` can enable `more` slot to customize "expand/collapse" area.

```html
<wd-collapse v-model="value" viewmore use-more-slot custom-more-slot-class="more-slot">
  This is a simple example text. This is a simple example text. This is a simple example text.
  <template #more>
    <view>Show All</view>
  </template>
</wd-collapse>
```

## Special Style

### Nested Usage

`collapse` supports nesting. Since `collapse-item` content container has default `padding`, it is recommended to use `custom-body-style` or `custom-body-class` to override when nesting.

```html
<wd-collapse v-model="collapseRoot">
  <wd-collapse-item v-for="item in 5" :key="item" :name="`${item}`" :title="`Tag${item}`" custom-body-style="padding:0 0 0 14px">
    <wd-collapse v-model="collapseList[item - 1]">
      <wd-collapse-item v-for="child in itemList" :key="child.name" :name="child.name" :title="child.title">
        {{ child.body }}
      </wd-collapse-item>
    </wd-collapse>
  </wd-collapse-item>
</wd-collapse>
```

### toggleAll

Batch toggle expand status through `Collapse` instance method `toggleAll`.

```html
<wd-collapse ref="collapseRef">...</wd-collapse>
```

```ts
collapseRef.value?.toggleAll()
collapseRef.value?.toggleAll(true)
collapseRef.value?.toggleAll(false)
collapseRef.value?.toggleAll({ skipDisabled: true })
collapseRef.value?.toggleAll({ expanded: true, skipDisabled: true })
```

## CollapseItem Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| name | Collapse item unique identifier | string | - |
| title | Collapse item title, supports `title` slot override | string | `''` |
| disabled | Whether to disable this collapse item | boolean | false |
| before-expend | Pre-open interception function, receives `name` parameter, returns `boolean` or `Promise<boolean>` | `CollapseItemBeforeExpand` | - |
| border | Whether to show border | boolean | true |
| custom-body-class | Collapse item content container custom class name | string | `''` |
| custom-body-style | Collapse item content container custom style | string | `''` |
| custom-class | Root node custom class name | string | `''` |
| custom-style | Root node custom style | string | `''` |

### CollapseItemBeforeExpand Parameters

| Parameter Name | Description | Type |
| --- | --- | --- |
| name | Current collapse item unique identifier | string |

## Collapse Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| v-model | Binding value. Normal mode is `string[]`, accordion mode is `string`, view more mode is `boolean` | `string \| string[] \| boolean` | - |
| accordion | Whether to enable accordion mode | boolean | false |
| viewmore | Whether to enable view more mode | boolean | false |
| use-more-slot | Whether to enable `more` slot in view more mode | boolean | false |
| line-num | Collapsed display line count in view more mode | number | 2 |
| custom-more-slot-class | `more` slot external custom class name in view more mode | string | `''` |
| custom-class | Root node custom class name | string | `''` |
| custom-style | Root node custom style | string | `''` |

## Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| change | Triggered when binding value changes | `{ value }` |

## Methods

| Method Name | Description | Parameters |
| --- | --- | --- |
| toggleAll | Toggle all panel expand status. Pass `true` to expand all, `false` to collapse all, no parameter to toggle all | `options?: CollapseToggleAllOptions` |

### CollapseToggleAllOptions

| Parameter Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| expanded | Whether to expand, `true` to expand, `false` to collapse | boolean | - |
| skipDisabled | Whether to skip disabled items | boolean | false |

## Collapse Slots

| name | Description | Parameters |
| --- | --- | --- |
| default | Panel content or panel item list | - |
| more | Custom expand/collapse area in view more mode | - |

## CollapseItem Slots

| name | Description | Parameters |
| --- | --- | --- |
| title | Custom title area | `{ expanded, disabled, isFirst }` |
| default | Collapse item content | - |
