# CalendarView

Provides single selection, multiple selection, range, week/month, and datetime calendar selection capabilities. Can be used as a underlying panel component for business calendar selectors.

::: tip Performance Tip
It is not recommended to set too large a difference between `min-date` and `max-date`. If you need a large time span, it is recommended to use `switch-mode` (`month` / `year-month`) to reduce rendering pressure.
:::

## Component Type

### Single Date Selection

```html
<wd-calendar-view type="date" v-model="value" @change="handleChange" />
```

### Multiple Date Selection

```html
<wd-calendar-view type="dates" v-model="value" @change="handleChange" />
```

### Date Range Selection

```html
<wd-calendar-view type="daterange" v-model="value" @change="handleChange" />
```

### Date Time Type

```html
<wd-calendar-view type="datetime" v-model="value" @change="handleChange" />
<wd-calendar-view type="datetimerange" v-model="valueRange" @change="handleChange" />
```

### Week and Month Type

```html
<wd-calendar-view type="week" v-model="value" :first-day-of-week="1" @change="handleChange" />
<wd-calendar-view type="month" v-model="value" @change="handleChange" />
<wd-calendar-view type="weekrange" v-model="valueRange" @change="handleChange" />
<wd-calendar-view type="monthrange" v-model="valueRange" @change="handleChange" />
```

## Component State

### Range Selection Allow Same Day

```html
<wd-calendar-view type="daterange" v-model="valueRange" allow-same-day @change="handleChange" />
```

## Component Variant

### Switch Mode

Set `switch-mode` to control panel switch behavior:
- `none`: Display all months/years flatly without switch buttons
- `month`: Support month switching with previous/next month buttons
- `year-month`: Support year and month switching with previous/next year, previous/next month buttons

```html
<wd-calendar-view type="date" v-model="value" switch-mode="month" @change="handleChange" />
```

## Component Style

### Format Date

Set `formatter` to customize date cell text and status.

```html
<wd-calendar-view type="daterange" v-model="valueRange" allow-same-day :formatter="formatter" @change="handleChange" />
```

### Set Week Start Day

```html
<wd-calendar-view :first-day-of-week="1" v-model="value" @change="handleChange" />
```

### Show Panel Title

```html
<wd-calendar-view type="daterange" :show-panel-title="false" v-model="valueRange" @change="handleChange" />
```

## Special Style

### Max Range Limit

```html
<wd-calendar-view type="daterange" :max-range="3" v-model="valueRange" @change="handleChange" />
```

### Time Option Filter

Set `hide-second` and `time-filter` to filter hour/minute/second options.

```html
<wd-calendar-view type="datetime" v-model="value" hide-second :time-filter="timeFilter" @change="handleChange" />
```

## Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| v-model | Selected value, 13-digit timestamp or timestamp array | `number \| number[] \| null` | - |
| type | Date type, supports `date / dates / datetime / week / month / daterange / datetimerange / weekrange / monthrange` | string | date |
| min-date | Minimum date timestamp | number | 6 months before current date |
| max-date | Maximum date timestamp | number | 6 months after current date |
| first-day-of-week | Week start day (0 means Sunday) | number | 0 |
| formatter | Date formatting function | `CalendarFormatter` | - |
| max-range | Maximum selectable range for range types | number | - |
| range-prompt | Prompt text when exceeding maximum range | string | - |
| allow-same-day | Whether to allow same day/week/month for range types | boolean | false |
| show-panel-title | Whether to show panel title | boolean | true |
| default-time | Default time for date | `string \| string[]` | `00:00:00` |
| panel-height | Scrollable panel height | number | 316 |
| time-filter | Time option filter function (datetime / datetimerange) | `CalendarTimeFilter` | - |
| time-item-height | Time option height | number | 44 |
| time-visible-item-count | Time visible item count | number | 3 |
| hide-second | Whether to hide second selection (datetime / datetimerange) | boolean | false |
| immediate-change | Whether to trigger time selection change event when finger is released | boolean | false |
| switch-mode | Switch mode, optional values are `none`, `month`, `year-month`. `none` displays all months/years flatly without switch buttons; `month` supports month switching with previous/next month buttons; `year-month` supports year and month switching with previous/next year, previous/next month buttons. For large date spans, it is recommended to use `month` or `year-month` to reduce rendering pressure | string | none |
| custom-class | Root node custom class name | string | `''` |
| custom-style | Root node custom style | string | `''` |

## Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| change | Triggered when panel value changes | `{ value }` |
| pickstart | Triggered when time selection scroll starts | - |
| pickend | Triggered when time selection scroll ends | - |

## Methods

| Method Name | Description | Parameters |
| --- | --- | --- |
| scrollIntoView | Scroll current date or selected date into visible area (recommended to call when panel shows from hidden) | - |

## CalendarDayItem Data Structure

| Property | Description | Type |
| --- | --- | --- |
| type | Date status type | CalendarDayType |
| date | 13-digit timestamp | number |
| text | Date text content | string |
| topInfo | Top tip info | string |
| bottomInfo | Bottom tip info | string |
| disabled | Whether disabled | boolean |

### CalendarDayType

| Type | Description |
| --- | --- |
| selected | Single date selected |
| start | Range start date |
| end | Range end date |
| middle | Dates between range start and end |
| same | Range start and end dates are the same |
| current | Current date |
| multiple-middle | Multiple date range selection, dates between start and end |
| multiple-selected | Multiple date range selection, selected dates |
