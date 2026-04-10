# Calendar 日历选择器

提供单选、多选、范围、周/月、日期时间等日历选择能力。

::: tip 性能提示
`min-date` 与 `max-date` 不建议设置差距过大，避免大量日期计算影响性能。若业务需要较大时间跨度，建议配合 `switch-mode`（如 `month` / `year-month`）减少一次性渲染压力。
:::

## 组件类型

### 单个日期选择

```html
<wd-cell-group border>
  <wd-cell title="单个日期选择" :value="formatValue(value1, 'date')" is-link @click="show1 = true" />
</wd-cell-group>
<wd-calendar v-model="value1" v-model:visible="show1" @confirm="handleConfirm" />
```

### 多个日期选择

```html
<wd-cell-group border>
  <wd-cell title="多个日期选择" :value="formatValue(value2, 'dates')" is-link @click="show2 = true" />
</wd-cell-group>
<wd-calendar type="dates" v-model="value2" v-model:visible="show2" />
```

### 范围选择

```html
<wd-cell-group border>
  <wd-cell title="日期范围选择" :value="formatValue(value3, 'daterange')" is-link @click="show3 = true" />
</wd-cell-group>
<wd-calendar type="daterange" v-model="value3" v-model:visible="show3" />
```

### 日期时间类型

```html
<wd-cell-group border>
  <wd-cell title="日期时间选择" :value="formatValue(value4, 'datetime')" is-link @click="show4 = true" />
</wd-cell-group>
<wd-calendar type="datetime" v-model="value4" v-model:visible="show4" />
```

```html
<wd-cell-group border>
  <wd-cell title="日期时间范围选择" :value="formatValue(value5, 'datetimerange')" is-link @click="show5 = true" />
</wd-cell-group>
<wd-calendar type="datetimerange" v-model="value5" v-model:visible="show5" />
```

### 周与月类型

```html
<wd-cell-group border>
  <wd-cell title="周选择" :value="formatValue(value6, 'week')" is-link @click="show6 = true" />
</wd-cell-group>
<wd-calendar type="week" v-model="value6" v-model:visible="show6" />
```

```html
<wd-cell-group border>
  <wd-cell title="月选择" :value="formatValue(value7, 'month')" is-link @click="show7 = true" />
</wd-cell-group>
<wd-calendar type="month" :min-date="minDate" v-model="value7" v-model:visible="show7" />
```

### 周范围与月范围选择

```html
<wd-cell-group border>
  <wd-cell title="周范围选择" :value="formatValue(value8, 'weekrange')" is-link @click="show8 = true" />
</wd-cell-group>
<wd-calendar :first-day-of-week="1" type="weekrange" v-model="value8" v-model:visible="show8" />
```

```html
<wd-cell-group border>
  <wd-cell title="月范围选择" :value="formatValue(value9, 'monthrange')" is-link @click="show9 = true" />
</wd-cell-group>
<wd-calendar type="monthrange" v-model="value9" v-model:visible="show9" />
```

## 组件状态

### 快捷操作

设置 `show-confirm="false"` 后，选中即确认。

```html
<wd-cell-group border>
  <wd-cell title="快捷操作" :value="formatValue(value16, 'date')" is-link @click="show16 = true" />
</wd-cell-group>
<wd-calendar v-model="value16" v-model:visible="show16" :show-confirm="false" />
```

### before-confirm

设置 `before-confirm` 在确认前拦截，返回 `false` 或 `Promise<false>` 可阻止确认。

```html
<wd-cell-group border>
  <wd-cell title="before-confirm" :value="formatValue(value14, 'date')" is-link @click="show14 = true" />
</wd-cell-group>
<wd-calendar v-model="value14" v-model:visible="show14" :before-confirm="beforeConfirm" />
```

## 组件变体

### 切换模式

设置 `switch-mode` 控制面板切换行为：
- `none`：平铺，不展示切换按钮
- `month`：按月切换
- `year-month`：支持按年与按月切换

```html
<wd-radio-group v-model="switchMode" type="button">
  <wd-radio value="none">none</wd-radio>
  <wd-radio value="month">month</wd-radio>
  <wd-radio value="year-month">year-month</wd-radio>
</wd-radio-group>
```

### 日周月切换

设置 `show-type-switch` 开启日/周/月切换。

```html
<wd-cell-group border>
  <wd-cell title="日周月切换" :value="formatValue(value10, 'date')" is-link @click="show10 = true" />
</wd-cell-group>
<wd-calendar :first-day-of-week="1" show-type-switch v-model="value10" v-model:visible="show10" :switch-mode="switchMode" />
```

## 组件样式

### 日期格式化

设置 `formatter` 可定制日期单元格文案与状态展示。

```html
<wd-cell-group border>
  <wd-cell title="日期格式化" :value="formatValue(value11, 'daterange')" is-link @click="show11 = true" />
</wd-cell-group>
<wd-calendar type="daterange" v-model="value11" v-model:visible="show11" :formatter="formatter" />
```

### 自定义展示

设置 `inner-display-format` 自定义范围选择面板中的起止文案。

```html
<wd-cell-group border>
  <wd-cell title="自定义展示" :value="displayFormat(value13)" is-link @click="show13 = true" />
</wd-cell-group>
<wd-calendar
  type="daterange"
  v-model="value13"
  v-model:visible="show13"
  :inner-display-format="innerDisplayFormat"
/>
```

## 特殊样式

### 快捷选项

设置 `shortcuts` 与 `on-shortcuts-click` 实现快捷日期区间。

```html
<wd-cell-group border>
  <wd-cell title="快捷选项" :value="formatValue(value12, 'daterange')" is-link @click="show12 = true" />
</wd-cell-group>
<wd-calendar
  :shortcuts="shortcuts"
  :on-shortcuts-click="onShortcutsClick"
  type="daterange"
  v-model="value12"
  v-model:visible="show12"
/>
```

### 拓展确定区域

通过 `confirm-left` / `confirm-right` 插槽拓展确定区按钮。

```html
<wd-cell-group border>
  <wd-cell title="拓展确定区域" :value="formatValue(value19, 'date')" is-link @click="show19 = true" />
</wd-cell-group>
<wd-calendar v-model="value19" v-model:visible="show19">
  <template #confirm-right>
    <wd-button block plain custom-style="margin-left: 10px;" @click="selectToday">选择今天</wd-button>
  </template>
</wd-calendar>
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 选中值，13 位时间戳或时间戳数组 | `number \| number[] \| null` | - |
| v-model:visible | 是否显示弹层 | boolean | false |
| type | 日期类型，支持 `date / dates / datetime / week / month / daterange / datetimerange / weekrange / monthrange` | string | date |
| min-date | 最小日期时间戳 | number | 当前日期往前 6 个月 |
| max-date | 最大日期时间戳 | number | 当前日期往后 6 个月 |
| first-day-of-week | 周起始日（0 表示周日） | number | 0 |
| formatter | 日期格式化函数 | `CalendarFormatter` | - |
| max-range | 范围类型的最大可选范围 | number | - |
| range-prompt | 超出最大范围提示文案 | string | - |
| allow-same-day | 范围类型是否允许同一天/同一周/同一月 | boolean | false |
| default-time | 日期默认时分秒 | `string \| string[]` | - |
| time-filter | 时间选项过滤函数（datetime / datetimerange） | `CalendarTimeFilter` | - |
| hide-second | 是否隐藏秒选择（datetime / datetimerange） | boolean | false |
| title | 弹层标题 | string | 选择日期（内置文案） |
| close-on-click-modal | 点击遮罩是否关闭 | boolean | true |
| z-index | 弹层层级 | number | 15 |
| show-confirm | 是否显示确认按钮 | boolean | true |
| confirm-text | 确认按钮文案 | string | 确定（内置文案） |
| inner-display-format | 自定义范围面板内部回显 | `CalendarInnerDisplayFormat` | - |
| ellipsis | 范围文案是否省略显示 | boolean | false |
| show-type-switch | 是否显示日周月切换 | boolean | false |
| shortcuts | 快捷选项列表（项需包含 `text`） | `Record<string, any>[]` | `[]` |
| on-shortcuts-click | 快捷选项点击回调 | `CalendarOnShortcutsClick` | - |
| safe-area-inset-bottom | 是否开启底部安全区 | boolean | true |
| before-confirm | 确认前校验函数 | `CalendarBeforeConfirm` | - |
| custom-view-class | 面板内部视图类名 | string | `''` |
| immediate-change | 是否手指松开即触发时间选择 change 事件 | boolean | false |
| root-portal | 是否脱离页面渲染 | boolean | false |
| panel-height | 可滚动面板高度 | number | 316 |
| show-panel-title | 是否展示滚动面板标题 | boolean | true |
| switch-mode | 切换模式，可选值为`none`、`month`、`year-month`，`none` 平铺展示所有月份/年份且不展示切换按钮；`month` 支持按月切换并展示上个月/下个月按钮；`year-month` 支持按年与按月切换并展示上一年/下一年、上个月/下个月按钮。大跨度日期场景建议使用 `month` 或 `year-month` 以降低渲染压力 | string | none |
| duration | 弹层动画时长 | number | 200 |
| custom-class | 根节点自定义类名 | string | `''` |
| custom-style | 根节点自定义样式 | string | `''` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| confirm | 点击确认后触发 | `{ value, type }` |
| change | 面板日期变化时触发 | `{ value }` |
| cancel | 关闭且未确认时触发 | - |
| open | 日历打开时触发 | - |

## Methods

| 方法名称 | 说明 | 参数 |
| --- | --- | --- |
| open | 打开日历弹层 | - |
| close | 关闭日历弹层 | - |

## Slots

| name | 说明 |
| --- | --- |
| confirm-left | 确认区域左侧插槽 |
| confirm-right | 确认区域右侧插槽 |

## CalendarDayItem 数据结构

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| type | 日期状态类型 | CalendarDayType |
| date | 13 位时间戳 | number |
| text | 日期文本内容 | string |
| topInfo | 上方提示信息 | string |
| bottomInfo | 下方提示信息 | string |
| disabled | 是否禁用 | boolean |

### CalendarDayType

| 类型 | 说明 |
| --- | --- |
| selected | 单日期选中 |
| start | 范围开始日期 |
| end | 范围结束日期 |
| middle | 范围开始与结束之间的日期 |
| same | 范围开始与结束日期同一天 |
| current | 当前日期 |
| multiple-middle | 多日期范围选择，开始与结束之间的日期 |
| multiple-selected | 多日期范围选择，选中的日期 |
