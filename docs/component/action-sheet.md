# ActionSheet 动作面板

从底部弹出的动作菜单面板。

## 组件类型

### 基本用法

通过 `v-model` 设置显示隐藏。

`actions` 类型为 `Array`，数组内部对象结构如下：

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| name | 选项名称 | string |
| description | 描述信息 | string |
| color | 颜色 | string |

```html
<wd-toast />
<wd-button @click="showActions">弹出菜单</wd-button>
<wd-action-sheet v-model="show" :actions="actions" @close="close" @select="select" />
```

```typescript
const show = ref<boolean>(false)
const actions = ref([
  {
    name: '选项1'
  },
  {
    name: '选项2'
  },
  {
    name: '选项3',
    description: '描述信息'
  }
])

function showActions() {
  show.value = true
}

function close() {
  show.value = false
}

const toast = useToast()

function select({ item, index }) {
  toast.show(`当前选中项: ${item.name}, 下标: ${index}`)
}
```

### 自定义单行面板

自定义单行面板时，`panels` 类型为一维数组，数组内部对象结构如下：

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| icon | 图标名或图片地址 | string |
| title | 标题 | string |

```html
<wd-button @click="showActions">弹出菜单</wd-button>
<wd-action-sheet v-model="show" :panels="panels" @close="close" @select="select" />
```

```typescript
const show = ref<boolean>(false)
const panels = ref([
  {
    icon: 'user',
    title: '微信好友'
  },
  {
    icon: 'share-internal',
    title: '朋友圈'
  },
  {
    icon: 'message',
    title: 'QQ 好友'
  },
  {
    icon: 'star-fill',
    title: '收藏'
  },
  {
    icon: 'share-internal',
    title: '更多分享'
  },
  {
    icon: 'user-add',
    title: '邀请好友'
  }
])
function showActions() {
  show.value = true
}

function close() {
  show.value = false
}
const toast = useToast()

function select({ item, index }) {
  toast.show(`当前选中项: ${item.title}, 下标: ${index}`)
}
```

### 自定义多行面板

自定义多行面板时，`panels` 类型为多维数组，每个数组内部对象结构如下：

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| icon | 图标名或图片地址 | string |
| title | 标题 | string |

```html
<wd-button @click="showActions">弹出菜单</wd-button>
<wd-action-sheet v-model="show" :panels="panels" @close="close" @select="select1" />
```

```typescript
const show = ref<boolean>(false)
const panels = ref([
  [
    {
      icon: 'user',
      title: '微信好友'
    },
    {
      icon: 'share-internal',
      title: '朋友圈'
    },
    {
      icon: 'message',
      title: 'QQ 好友'
    },
    {
      icon: 'star-fill',
      title: '收藏'
    },
    {
      icon: 'user-add',
      title: '邀请'
    },
    {
      icon: 'share-external',
      title: '外部分享'
    },
    {
      icon: 'qrcode',
      title: '生成二维码'
    },
    {
      icon: 'save',
      title: '保存图片'
    }
  ],
  [
    {
      icon: 'file-image',
      title: '图片'
    },
    {
      icon: 'download',
      title: '下载'
    },
    {
      icon: 'copy',
      title: '复制链接'
    }
  ]
])

function showActions() {
  show.value = true
}

function close() {
  show.value = false
}
const toast = useToast()

function select1({ item, rowIndex, colIndex }) {
  toast.show(`当前选中项: ${item.title}, 行下标: ${rowIndex}, 列下标: ${colIndex}`)
}
```

## 组件状态

### 选项状态

可以设置颜色、禁用、加载等状态。

```html
<wd-button @click="showActions">弹出菜单</wd-button>
<wd-action-sheet v-model="show" :actions="actions" @close="close" />
```

```typescript
const show = ref<boolean>(false)
const actions = ref([
  {
    name: '颜色',
    color: '#0083ff'
  },
  {
    name: '禁用',
    disabled: true
  },
  {
    loading: true
  }
])
function showActions() {
  show.value = true
}

function close() {
  show.value = false
}
```

## 组件变体

### 取消按钮

设置 `cancel-text` 取消按钮文案，展示取消按钮。

```html
<wd-action-sheet v-model="show" :actions="actions" @close="close" cancel-text="取消" />
```

### 标题

设置 `title` 展示标题。

```html
<wd-action-sheet v-model="show" title="标题" @close="close">
  <view style="padding: 15px 15px 150px 15px;">内容</view>
</wd-action-sheet>
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 设置菜单显示隐藏 | boolean | false |
| actions | 菜单选项，详见下方 Action 数据结构 | `Action[]` | `[]` |
| panels | 自定义宫格面板项，支持一维 `Panel[]` 与二维 `Panel[][]`（多行） | `Array<Panel \| Panel[]>` | `[]` |
| title | 标题 | string | - |
| cancel-text | 取消按钮文案 | string | - |
| close-on-click-action | 点击选项后是否关闭菜单 | boolean | true |
| close-on-click-modal | 点击遮罩是否关闭 | boolean | true |
| duration | 动画持续时间（ms） | number | 200 |
| z-index | 菜单层级 | number | 10 |
| lazy-render | 弹层内容懒渲染，触发展示时才渲染内容 | boolean | true |
| safe-area-inset-bottom | 弹出面板是否设置底部安全距离（iPhone X 类型机型） | boolean | true |
| root-portal | 是否从页面中脱离出来（H5: teleport，App: renderjs，小程序: root-portal） | boolean | false |
| custom-title-class | 标题区域自定义类名 | string | - |
| custom-class | 根节点自定义类名 | string | - |
| custom-style | 根节点自定义样式 | string | - |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| select | 点击选项时触发 | 菜单选项或自定义面板一维数组：`{ item, index }`；自定义面板二维数组：`{ item, rowIndex, colIndex }` |
| enter | 打开动画开始时触发 | - |
| after-enter | 打开动画结束时触发 | - |
| leave | 关闭动画开始时触发 | - |
| after-leave | 关闭动画结束时触发 | - |
| close | 面板关闭时触发 | - |
| click-modal | 点击遮罩时触发 | - |
| cancel | 点击取消按钮时触发 | - |

## Action 数据结构

| 键名 | 说明 | 类型 |
| --- | --- | --- |
| name | 选项名称 | string |
| description | 描述信息 | string |
| color | 颜色 | string |
| disabled | 禁用 | boolean |
| loading | 加载中状态 | boolean |

## Panel 数据结构

| 键名 | 说明 | 类型 |
| --- | --- | --- |
| icon | 图标名或图片地址 | string |
| title | 标题内容 | string |

## Slots

| name | 说明 | 参数 |
| --- | --- | --- |
| default | 自定义内容区，传入后会覆盖默认 actions/panels 渲染 | - |
| close | 自定义标题栏右侧关闭区域 | `{ close }` |
