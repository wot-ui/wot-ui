# ActionSheet

Action menu panel that pops up from the bottom.

## Component Type

### Basic Usage

Control show/hide through `v-model`.

The `actions` type is `Array`, with the following object structure:

| Parameter | Description | Type |
| --- | --- | --- |
| name | Option name | string |
| description | Description info | string |
| color | Color | string |

```html
<wd-toast />
<wd-button @click="showActions">Show Menu</wd-button>
<wd-action-sheet v-model="show" :actions="actions" @close="close" @select="select" />
```

```typescript
const show = ref<boolean>(false)
const actions = ref([
  {
    name: 'Option 1'
  },
  {
    name: 'Option 2'
  },
  {
    name: 'Option 3',
    description: 'Description info'
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
  toast.show(`Current selection: ${item.name}, index: ${index}`)
}
```

### Custom Single Row Panel

When using custom single row panel, `panels` type is a one-dimensional array with the following object structure:

| Parameter | Description | Type |
| --- | --- | --- |
| icon | Icon name or image URL | string |
| title | Title | string |

```html
<wd-button @click="showActions">Show Menu</wd-button>
<wd-action-sheet v-model="show" :panels="panels" @close="close" @select="select" />
```

```typescript
const show = ref<boolean>(false)
const panels = ref([
  {
    icon: 'user',
    title: 'WeChat Friends'
  },
  {
    icon: 'share-internal',
    title: 'Moments'
  },
  {
    icon: 'message',
    title: 'QQ Friends'
  },
  {
    icon: 'star-fill',
    title: 'Favorites'
  },
  {
    icon: 'share-internal',
    title: 'More Share'
  },
  {
    icon: 'user-add',
    title: 'Invite Friends'
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
  toast.show(`Current selection: ${item.title}, index: ${index}`)
}
```

### Custom Multi-Row Panel

When using custom multi-row panel, `panels` type is a multi-dimensional array with the following object structure:

| Parameter | Description | Type |
| --- | --- | --- |
| icon | Icon name or image URL | string |
| title | Title | string |

```html
<wd-button @click="showActions">Show Menu</wd-button>
<wd-action-sheet v-model="show" :panels="panels" @close="close" @select="select1" />
```

```typescript
const show = ref<boolean>(false)
const panels = ref([
  [
    {
      icon: 'user',
      title: 'WeChat Friends'
    },
    {
      icon: 'share-internal',
      title: 'Moments'
    },
    {
      icon: 'message',
      title: 'QQ Friends'
    },
    {
      icon: 'star-fill',
      title: 'Favorites'
    },
    {
      icon: 'user-add',
      title: 'Invite'
    },
    {
      icon: 'share-external',
      title: 'External Share'
    },
    {
      icon: 'qrcode',
      title: 'Generate QR Code'
    },
    {
      icon: 'save',
      title: 'Save Image'
    }
  ],
  [
    {
      icon: 'file-image',
      title: 'Image'
    },
    {
      icon: 'download',
      title: 'Download'
    },
    {
      icon: 'copy',
      title: 'Copy Link'
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
  toast.show(`Current selection: ${item.title}, row index: ${rowIndex}, column index: ${colIndex}`)
}
```

## Component State

### Option States

Can set color, disabled, loading and other states.

```html
<wd-button @click="showActions">Show Menu</wd-button>
<wd-action-sheet v-model="show" :actions="actions" @close="close" />
```

```typescript
const show = ref<boolean>(false)
const actions = ref([
  {
    name: 'Color',
    color: '#0083ff'
  },
  {
    name: 'Disabled',
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

## Component Variant

### Cancel Button

Set `cancel-text` to display cancel button text.

```html
<wd-action-sheet v-model="show" :actions="actions" @close="close" cancel-text="Cancel" />
```

### Title

Set `title` to display title.

```html
<wd-action-sheet v-model="show" title="Title" @close="close">
  <view style="padding: 15px 15px 150px 15px;">Content</view>
</wd-action-sheet>
```

## Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| v-model | Control menu show/hide | boolean | false |
| actions | Menu options, see Action data structure below | `Action[]` | `[]` |
| panels | Custom grid panel items, supports one-dimensional `Panel[]` and two-dimensional `Panel[][]` (multi-row) | `Array<Panel \| Panel[]>` | `[]` |
| title | Title | string | - |
| cancel-text | Cancel button text | string | - |
| close-on-click-action | Whether to close menu after clicking option | boolean | true |
| close-on-click-modal | Whether to close when clicking mask | boolean | true |
| duration | Animation duration (ms) | number | 200 |
| z-index | Menu z-index | number | 10 |
| lazy-render | Lazy render popup content, only render when triggered to show | boolean | true |
| safe-area-inset-bottom | Whether popup panel sets bottom safe distance (iPhone X type devices) | boolean | true |
| root-portal | Whether to detach from page (H5: teleport, App: renderjs, Mini Program: root-portal) | boolean | false |
| custom-title-class | Title area custom class name | string | - |
| glass | Enable glassmorphism (glass) style | boolean | `false` |
| custom-class | Root node custom class name | string | - |
| custom-style | Root node custom style | string | - |

## Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| select | Triggered when clicking option | Menu options or custom panel one-dimensional array: `{ item, index }`; Custom panel two-dimensional array: `{ item, rowIndex, colIndex }` |
| enter | Triggered when open animation starts | - |
| after-enter | Triggered when open animation ends | - |
| leave | Triggered when close animation starts | - |
| after-leave | Triggered when close animation ends | - |
| close | Triggered when panel closes | - |
| click-modal | Triggered when clicking mask | - |
| cancel | Triggered when clicking cancel button | - |

## Action Data Structure

| Key | Description | Type |
| --- | --- | --- |
| name | Option name | string |
| description | Description info | string |
| color | Color | string |
| disabled | Disabled | boolean |
| loading | Loading state | boolean |

## Panel Data Structure

| Key | Description | Type |
| --- | --- | --- |
| icon | Icon name or image URL | string |
| title | Title content | string |

## Slots

| name | Description | Parameters |
| --- | --- | --- |
| default | Custom content area, will override default actions/panels rendering when passed | - |
| close | Custom title bar right close area | `{ close }` |
