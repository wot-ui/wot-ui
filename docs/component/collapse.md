# Collapse 折叠面板

将一组内容放置在多个折叠面板中，点击面板标题可展开或收起内容。

## 组件类型

### 基本使用

`v-model` 绑定值可为：
- 普通折叠：`string[]`
- 手风琴模式：`string`
- 查看更多模式：`boolean`

```html
<wd-collapse v-model="value">
  <wd-collapse-item title="标签1" name="item1">这是一条简单的示例文字。</wd-collapse-item>
  <wd-collapse-item title="标签2" name="item2">这是一条简单的示例文字。</wd-collapse-item>
</wd-collapse>
```

## 组件状态

### 禁用

设置 `wd-collapse-item` 的 `disabled` 属性禁用单个面板。

```html
<wd-collapse v-model="value">
  <wd-collapse-item title="标签1" name="item1">这是一条简单的示例文字。</wd-collapse-item>
  <wd-collapse-item title="标签2" name="item2" disabled>这是一条简单的示例文字。</wd-collapse-item>
</wd-collapse>
```

### 异步更新

通过 `before-expend` 在面板打开前执行拦截，返回 `boolean` 或 `Promise<boolean>`。

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

## 组件变体

### 手风琴

设置 `accordion` 后同一时刻仅展开一项。

```html
<wd-collapse v-model="value" accordion>
  <wd-collapse-item title="标签1" name="item1">这是一条简单的示例文字。</wd-collapse-item>
  <wd-collapse-item title="标签2" name="item2">这是一条简单的示例文字。</wd-collapse-item>
  <wd-collapse-item title="标签3" name="item3">这是一条简单的示例文字。</wd-collapse-item>
</wd-collapse>
```

### 查看更多

设置 `viewmore` 后可折叠长文本，`line-num` 控制收起行数。

```html
<wd-collapse v-model="value" viewmore :line-num="3">
  这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。
</wd-collapse>
```

## 组件样式

### 自定义标题

使用 `wd-collapse-item` 的 `title` 具名插槽，可获取 `expanded / disabled / isFirst`。

```html
<wd-collapse v-model="value">
  <wd-collapse-item name="item1">
    <template #title="{ expanded }">
      <view class="header">
        <text style="color: red">通过 slot 自定义标题</text>
        <text>{{ expanded ? '我展开了' : '我已收起' }}</text>
      </view>
    </template>
    这是一条简单的示例文字。
  </wd-collapse-item>
</wd-collapse>
```

### 查看更多插槽

查看更多模式下可通过 `use-more-slot` 启用 `more` 插槽，自定义“展开/收起”区域。

```html
<wd-collapse v-model="value" viewmore use-more-slot custom-more-slot-class="more-slot">
  这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。
  <template #more>
    <view>显示全部</view>
  </template>
</wd-collapse>
```

## 特殊样式

### 嵌套使用

`collapse` 支持嵌套。由于 `collapse-item` 内容容器存在默认 `padding`，嵌套时建议用 `custom-body-style` 或 `custom-body-class` 覆盖。

```html
<wd-collapse v-model="collapseRoot">
  <wd-collapse-item v-for="item in 5" :key="item" :name="`${item}`" :title="`标签${item}`" custom-body-style="padding:0 0 0 14px">
    <wd-collapse v-model="collapseList[item - 1]">
      <wd-collapse-item v-for="child in itemList" :key="child.name" :name="child.name" :title="child.title">
        {{ child.body }}
      </wd-collapse-item>
    </wd-collapse>
  </wd-collapse-item>
</wd-collapse>
```

### toggleAll

通过 `Collapse` 实例方法 `toggleAll` 批量切换展开状态。

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

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 折叠栏唯一标识符 | string | - |
| title | 折叠栏标题，支持 `title` 插槽覆盖 | string | `''` |
| disabled | 是否禁用该折叠栏 | boolean | false |
| before-expend | 打开前拦截函数，接收 `name` 参数，返回 `boolean` 或 `Promise<boolean>` | `CollapseItemBeforeExpand` | - |
| border | 是否显示边框 | boolean | true |
| custom-body-class | 折叠栏内容容器自定义类名 | string | `''` |
| custom-body-style | 折叠栏内容容器自定义样式 | string | `''` |
| custom-class | 根节点自定义类名 | string | `''` |
| custom-style | 根节点自定义样式 | string | `''` |

### CollapseItemBeforeExpand 参数

| 参数名 | 说明 | 类型 |
| --- | --- | --- |
| name | 当前折叠栏唯一标识符 | string |

## Collapse Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 绑定值。普通模式为 `string[]`，手风琴模式为 `string`，查看更多模式为 `boolean` | `string \| string[] \| boolean` | - |
| accordion | 是否开启手风琴模式 | boolean | false |
| viewmore | 是否开启查看更多模式 | boolean | false |
| use-more-slot | 查看更多模式下是否启用 `more` 插槽 | boolean | false |
| line-num | 查看更多模式下收起显示行数 | number | 2 |
| custom-more-slot-class | 查看更多模式下 `more` 插槽外部自定义类名 | string | `''` |
| custom-class | 根节点自定义类名 | string | `''` |
| custom-style | 根节点自定义样式 | string | `''` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 绑定值变化时触发 | `{ value }` |

## Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| toggleAll | 切换所有面板展开状态。传 `true` 全部展开，`false` 全部收起，不传为全部切换 | `options?: CollapseToggleAllOptions` |

### CollapseToggleAllOptions

| 参数名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| expanded | 是否展开，`true` 展开，`false` 收起 | boolean | - |
| skipDisabled | 是否跳过禁用项 | boolean | false |

## Collapse Slots

| name | 说明 | 参数 |
| --- | --- | --- |
| default | 面板内容或面板项列表 | - |
| more | 查看更多模式下自定义展开收起区域 | - |

## CollapseItem Slots

| name | 说明 | 参数 |
| --- | --- | --- |
| title | 自定义标题区域 | `{ expanded, disabled, isFirst }` |
| default | 折叠栏内容 | - |
