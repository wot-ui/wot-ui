# CalendarView 日历面板组件

提供单选、多选、范围、周/月、日期时间等日历选择能力，可作为业务日历选择器的底层面板组件。

::: tip 性能提示
`min-date` 与 `max-date` 不建议设置差距过大。若业务需要较大时间跨度，建议配合 `switch-mode`（`month` / `year-month`）降低一次性渲染压力。
:::

## 组件类型

### 单个日期选择

```html
<wd-calendar-view type="date" v-model="value" @change="handleChange" />
```

### 多个日期选择

```html
<wd-calendar-view type="dates" v-model="value" @change="handleChange" />
```

### 日期范围选择

```html
<wd-calendar-view type="daterange" v-model="value" @change="handleChange" />
```

### 日期时间类型

```html
<wd-calendar-view type="datetime" v-model="value" @change="handleChange" />
<wd-calendar-view type="datetimerange" v-model="valueRange" @change="handleChange" />
```

### 周与月类型

```html
<wd-calendar-view type="week" v-model="value" :first-day-of-week="1" @change="handleChange" />
<wd-calendar-view type="month" v-model="value" @change="handleChange" />
<wd-calendar-view type="weekrange" v-model="valueRange" @change="handleChange" />
<wd-calendar-view type="monthrange" v-model="valueRange" @change="handleChange" />
```

## 组件状态

### 范围选择允许同一天

```html
<wd-calendar-view type="daterange" v-model="valueRange" allow-same-day @change="handleChange" />
```

## 组件变体

### 切换模式

设置 `switch-mode` 控制面板切换行为：
- `none`：平铺展示所有月份/年份，不展示切换按钮
- `month`：支持按月切换，展示上个月/下个月按钮
- `year-month`：支持按年与按月切换，展示上一年/下一年、上个月/下个月按钮

```html
<wd-calendar-view type="date" v-model="value" switch-mode="month" @change="handleChange" />
```

## 组件样式

### 格式化日期

设置 `formatter` 可定制日期单元格文案与状态。

```html
<wd-calendar-view type="daterange" v-model="valueRange" allow-same-day :formatter="formatter" @change="handleChange" />
```

### 设置周起始日

```html
<wd-calendar-view :first-day-of-week="1" v-model="value" @change="handleChange" />
```

### 展示面板标题

```html
<wd-calendar-view type="daterange" :show-panel-title="false" v-model="valueRange" @change="handleChange" />
```

## 特殊样式

### 最大范围限制

```html
<wd-calendar-view type="daterange" :max-range="3" v-model="valueRange" @change="handleChange" />
```

### 时间选项过滤

设置 `hide-second` 与 `time-filter` 过滤时分秒选项。

```html
<wd-calendar-view type="datetime" v-model="value" hide-second :time-filter="timeFilter" @change="handleChange" />
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 选中值，13 位时间戳或时间戳数组 | `number \| number[] \| null` | - |
| type | 日期类型，支持 `date / dates / datetime / week / month / daterange / datetimerange / weekrange / monthrange` | string | date |
| min-date | 最小日期时间戳 | number | 当前日期往前 6 个月 |
| max-date | 最大日期时间戳 | number | 当前日期往后 6 个月 |
| first-day-of-week | 周起始日（0 表示周日） | number | 0 |
| formatter | 日期格式化函数 | `CalendarFormatter` | - |
| max-range | 范围类型的最大可选范围 | number | - |
| range-prompt | 超出最大范围提示文案 | string | - |
| allow-same-day | 范围类型是否允许同一天/同一周/同一月 | boolean | false |
| show-panel-title | 是否展示面板标题 | boolean | true |
| default-time | 日期默认时分秒 | `string \| string[]` | `00:00:00` |
| panel-height | 可滚动面板高度 | number | 316 |
| time-filter | 时间选项过滤函数（datetime / datetimerange） | `CalendarTimeFilter` | - |
| time-item-height | 时间选项高度 | number | 44 |
| time-visible-item-count | 时间可见项数量 | number | 3 |
| hide-second | 是否隐藏秒选择（datetime / datetimerange） | boolean | false |
| immediate-change | 是否手指松开即触发时间选择 change 事件 | boolean | false |
| switch-mode | 切换模式，可选值为`none`、`month`、`year-month`，`none` 平铺展示所有月份/年份且不展示切换按钮；`month` 支持按月切换并展示上个月/下个月按钮；`year-month` 支持按年与按月切换并展示上一年/下一年、上个月/下个月按钮。大跨度日期场景建议使用 `month` 或 `year-month` 以降低渲染压力 | string | none |
| custom-class | 根节点自定义类名 | string | `''` |
| custom-style | 根节点自定义样式 | string | `''` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 面板值变化时触发 | `{ value }` |
| pickstart | 时间选择滚动开始时触发 | - |
| pickend | 时间选择滚动结束时触发 | - |

## Methods

| 方法名称 | 说明 | 参数 |
| --- | --- | --- |
| scrollIntoView | 使当前日期或选中日期滚动到可视区域（面板隐藏到显示时建议调用） | - |

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
