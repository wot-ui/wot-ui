# Badge 徽标


出现在按钮、图标旁的数字或状态标记。

## 组件类型

### 展示消息数量

通过 `value` 展示消息数量，支持数字或文本。

```html
<wd-badge custom-class="badge" :value="12">
  <wd-button :round="false" type="info" size="small">评论</wd-button>
</wd-badge>
<wd-badge custom-class="badge" :value="3" bg-color="green">
  <wd-button :round="false" type="info" size="small">回复</wd-button>
</wd-badge>
<wd-badge custom-class="badge" :value="1" type="primary">
  <wd-button :round="false" type="info" size="small">评论</wd-button>
</wd-badge>
<wd-badge custom-class="badge" :value="2" type="warning">
  <wd-button :round="false" type="info" size="small">回复</wd-button>
</wd-badge>
<wd-badge custom-class="badge" :value="1" type="success">
  <wd-button :round="false" type="info" size="small">评论</wd-button>
</wd-badge>
<wd-badge custom-class="badge" :value="2" type="info">
  <wd-button :round="false" type="danger" size="small">回复</wd-button>
</wd-badge>
```

## 组件状态

### 点状类型

设置 `is-dot` 以红点形式标注。

```html
<wd-badge custom-class="badge" is-dot>数据查询</wd-badge>
<wd-badge custom-class="badge" is-dot>
  <wd-button :round="false" type="info" size="small">回复</wd-button>
</wd-badge>
```

### 展示 0 值

通过 `show-zero` 控制 `value=0` 时是否显示。`is-dot` 优先级高于 `show-zero`。

```html
<wd-badge custom-class="badge" :value="0" show-zero>
  <wd-button :round="false" type="info" size="small">评论</wd-button>
</wd-badge>
<wd-badge custom-class="badge" :value="0">
  <wd-button :round="false" type="info" size="small">回复</wd-button>
</wd-badge>
<wd-badge custom-class="badge" :value="0" is-dot>
  <wd-button :round="false" type="info" size="small">回复</wd-button>
</wd-badge>
```

## 组件变体

### 徽标形状

设置 `shape` 切换徽标形状。

```html
<wd-badge custom-class="badge" :value="12" shape="square">
  <wd-button :round="false" type="info" size="small">方形</wd-button>
</wd-badge>
<wd-badge custom-class="badge" :value="12" shape="bubble">
  <wd-button :round="false" type="info" size="small">气泡</wd-button>
</wd-badge>
```

## 组件样式

### 可定义消息最大值

通过 `max` 设置最大显示值。仅当 `value` 为数字时生效。

```html
<wd-badge custom-class="badge" :value="200" :max="99">
  <wd-button :round="false" type="info" size="small">评论</wd-button>
</wd-badge>
<wd-badge custom-class="badge" :value="200" :max="10">
  <wd-button :round="false" type="info" size="small">回复</wd-button>
</wd-badge>
```

## 特殊样式

### 描边徽标

设置 `border` 可展示描边徽标。

```html
<wd-badge custom-class="badge" :value="12" border>
  <wd-button :round="false" type="primary" size="small">描边</wd-button>
</wd-badge>
<wd-badge custom-class="badge" :value="1" border type="primary">
  <wd-button :round="false" type="danger" size="small">描边</wd-button>
</wd-badge>
<wd-badge custom-class="badge" :value="999" border type="warning">
  <wd-button :round="false" type="success" size="small">描边</wd-button>
</wd-badge>
```

## 内容形态

### 自定义内容

设置字符串 `value` 显示数字以外的文本内容。

```html
<wd-badge custom-class="badge" value="new">
  <wd-button :round="false" type="info" size="small">评论</wd-button>
</wd-badge>
<wd-badge custom-class="badge" value="hot">
  <wd-button :round="false" type="info" size="small">回复</wd-button>
</wd-badge>
```

```scss
:deep(.badge) {
  margin: 0 30px 20px 0;
  display: inline-block;
}
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 显示值 | string \| number | - |
| max | 最大值，超过后显示 `{max}+`，仅当 `value` 为 number 时生效 | number | - |
| top | 为正时，角标向下偏移对应像素 | string \| number | - |
| right | 为正时，角标向左偏移对应像素 | string \| number | - |
| is-dot | 红色点状标注 | boolean | false |
| hidden | 隐藏 badge | boolean | false |
| type | 类型，支持 `primary / success / warning / danger / info` | string | - |
| bg-color | 背景色 | string | - |
| show-zero | 是否显示 0 | boolean | false |
| shape | 徽标形状，支持 `circle / square / bubble` | string | circle |
| border | 是否显示白色描边 | boolean | false |
| custom-class | 根节点自定义类名 | string | - |
| custom-style | 根节点自定义样式 | string | - |

## Slots

| 名称 | 说明 |
| --- | --- |
| default | 徽标包裹的内容 |
