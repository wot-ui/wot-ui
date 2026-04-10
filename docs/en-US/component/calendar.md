# Calendar

Provides single selection, multiple selection, range, week/month, and datetime calendar selection capabilities.

::: tip Performance Tip
It is not recommended to set too large a difference between `min-date` and `max-date`, as it may affect performance due to heavy date calculations. If you need a large time span, it is recommended to use `switch-mode` (e.g., `month` / `year-month`) to reduce rendering pressure.
:::

## Component Type

### Single Date Selection

```html
<wd-cell-group border>
  <wd-cell title="Single Date Selection" :value="formatValue(value1, 'date')" is-link @click="show1 = true" />
</wd-cell-group>
<wd-calendar v-model="value1" v-model:visible="show1" @confirm="handleConfirm" />
```

### Multiple Date Selection

```html
<wd-cell-group border>
  <wd-cell title="Multiple Date Selection" :value="formatValue(value2, 'dates')" is-link @click="show2 = true" />
</wd-cell-group>
<wd-calendar type="dates" v-model="value2" v-model:visible="show2" />
```

### Range Selection

```html
<wd-cell-group border>
  <wd-cell title="Date Range Selection" :value="formatValue(value3, 'daterange')" is-link @click="show3 = true" />
</wd-cell-group>
<wd-calendar type="daterange" v-model="value3" v-model:visible="show3" />
```

### Date Time Type

```html
<wd-cell-group border>
  <wd-cell title="Date Time Selection" :value="formatValue(value4, 'datetime')" is-link @click="show4 = true" />
</wd-cell-group>
<wd-calendar type="datetime" v-model="value4" v-model:visible="show4" />
```

```html
<wd-cell-group border>
  <wd-cell title="Date Time Range Selection" :value="formatValue(value5, 'datetimerange')" is-link @click="show5 = true" />
</wd-cell-group>
<wd-calendar type="datetimerange" v-model="value5" v-model:visible="show5" />
```

### Week and Month Type

```html
<wd-cell-group border>
  <wd-cell title="Week Selection" :value="formatValue(value6, 'week')" is-link @click="show6 = true" />
</wd-cell-group>
<wd-calendar type="week" v-model="value6" v-model:visible="show6" />
```

```html
<wd-cell-group border>
  <wd-cell title="Month Selection" :value="formatValue(value7, 'month')" is-link @click="show7 = true" />
</wd-cell-group>
<wd-calendar type="month" :min-date="minDate" v-model="value7" v-model:visible="show7" />
```

### Week Range and Month Range Selection

```html
<wd-cell-group border>
  <wd-cell title="Week Range Selection" :value="formatValue(value8, 'weekrange')" is-link @click="show8 = true" />
</wd-cell-group>
<wd-calendar :first-day-of-week="1" type="weekrange" v-model="value8" v-model:visible="show8" />
```

```html
<wd-cell-group border>
  <wd-cell title="Month Range Selection" :value="formatValue(value9, 'monthrange')" is-link @click="show9 = true" />
</wd-cell-group>
<wd-calendar type="monthrange" v-model="value9" v-model:visible="show9" />
```

## Component State

### Quick Operation

After setting `show-confirm="false"`, confirmation occurs on selection.

```html
<wd-cell-group border>
  <wd-cell title="Quick Operation" :value="formatValue(value16, 'date')" is-link @click="show16 = true" />
</wd-cell-group>
<wd-calendar v-model="value16" v-model:visible="show16" :show-confirm="false" />
```

### before-confirm

Set `before-confirm` to intercept before confirmation, returning `false` or `Promise<false>` can prevent confirmation.

```html
<wd-cell-group border>
  <wd-cell title="before-confirm" :value="formatValue(value14, 'date')" is-link @click="show14 = true" />
</wd-cell-group>
<wd-calendar v-model="value14" v-model:visible="show14" :before-confirm="beforeConfirm" />
```

## Component Variant

### Switch Mode

Set `switch-mode` to control panel switch behavior:
- `none`: Display flatly without switch buttons
- `month`: Switch by month
- `year-month`: Support switching by year and month

```html
<wd-radio-group v-model="switchMode" type="button">
  <wd-radio value="none">none</wd-radio>
  <wd-radio value="month">month</wd-radio>
  <wd-radio value="year-month">year-month</wd-radio>
</wd-radio-group>
```

### Day/Week/Month Switch

Set `show-type-switch` to enable day/week/month switching.

```html
<wd-cell-group border>
  <wd-cell title="Day/Week/Month Switch" :value="formatValue(value10, 'date')" is-link @click="show10 = true" />
</wd-cell-group>
<wd-calendar :first-day-of-week="1" show-type-switch v-model="value10" v-model:visible="show10" :switch-mode="switchMode" />
```

## Component Style

### Date Formatting

Set `formatter` to customize date cell text and status display.

```html
<wd-cell-group border>
  <wd-cell title="Date Formatting" :value="formatValue(value11, 'daterange')" is-link @click="show11 = true" />
</wd-cell-group>
<wd-calendar type="daterange" v-model="value11" v-model:visible="show11" :formatter="formatter" />
```

### Custom Display

Set `inner-display-format` to customize the start/end text in range selection panel.

```html
<wd-cell-group border>
  <wd-cell title="Custom Display" :value="displayFormat(value13)" is-link @click="show13 = true" />
</wd-cell-group>
<wd-calendar
  type="daterange"
  v-model="value13"
  v-model:visible="show13"
  :inner-display-format="innerDisplayFormat"
/>
```

## Special Style

### Shortcut Options

Set `shortcuts` and `on-shortcuts-click` to implement shortcut date ranges.

```html
<wd-cell-group border>
  <wd-cell title="Shortcut Options" :value="formatValue(value12, 'daterange')" is-link @click="show12 = true" />
</wd-cell-group>
<wd-calendar
  :shortcuts="shortcuts"
  :on-shortcuts-click="onShortcutsClick"
  type="daterange"
  v-model="value12"
  v-model:visible="show12"
/>
```

### Extend Confirm Area

Extend confirm area buttons through `confirm-left` / `confirm-right` slots.

```html
<wd-cell-group border>
  <wd-cell title="Extend Confirm Area" :value="formatValue(value19, 'date')" is-link @click="show19 = true" />
</wd-cell-group>
<wd-calendar v-model="value19" v-model:visible="show19">
  <template #confirm-right>
    <wd-button block plain custom-style="margin-left: 10px;" @click="selectToday">Select Today</wd-button>
  </template>
</wd-calendar>
```

## Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| v-model | Selected value, 13-digit timestamp or timestamp array | `number \| number[] \| null` | - |
| v-model:visible | Whether to show popup | boolean | false |
| type | Date type, supports `date / dates / datetime / week / month / daterange / datetimerange / weekrange / monthrange` | string | date |
| min-date | Minimum date timestamp | number | 6 months before current date |
| max-date | Maximum date timestamp | number | 6 months after current date |
| first-day-of-week | Week start day (0 means Sunday) | number | 0 |
| formatter | Date formatting function | `CalendarFormatter` | - |
| max-range | Maximum selectable range for range types | number | - |
| range-prompt | Prompt text when exceeding maximum range | string | - |
| allow-same-day | Whether to allow same day/week/month for range types | boolean | false |
| default-time | Default time for date | `string \| string[]` | - |
| time-filter | Time option filter function (datetime / datetimerange) | `CalendarTimeFilter` | - |
| hide-second | Whether to hide second selection (datetime / datetimerange) | boolean | false |
| title | Popup title | string | Select Date (built-in text) |
| close-on-click-modal | Whether to close when clicking mask | boolean | true |
| z-index | Popup z-index | number | 15 |
| show-confirm | Whether to show confirm button | boolean | true |
| confirm-text | Confirm button text | string | Confirm (built-in text) |
| inner-display-format | Custom range panel internal display | `CalendarInnerDisplayFormat` | - |
| ellipsis | Whether to omit range text display | boolean | false |
| show-type-switch | Whether to show day/week/month switch | boolean | false |
| shortcuts | Shortcut option list (items need to contain `text`) | `Record<string, any>[]` | `[]` |
| on-shortcuts-click | Shortcut option click callback | `CalendarOnShortcutsClick` | - |
| safe-area-inset-bottom | Whether to enable bottom safe area | boolean | true |
| before-confirm | Validation function before confirm | `CalendarBeforeConfirm` | - |
| custom-view-class | Panel internal view class name | string | `''` |
| immediate-change | Whether to trigger time selection change event when finger is released | boolean | false |
| root-portal | Whether to render outside page | boolean | false |
| panel-height | Scrollable panel height | number | 316 |
| show-panel-title | Whether to show scroll panel title | boolean | true |
| switch-mode | Switch mode, optional values are `none`, `month`, `year-month`. `none` displays all months/years flatly without switch buttons; `month` supports month switching with previous/next month buttons; `year-month` supports year and month switching with previous/next year, previous/next month buttons. For large date spans, it is recommended to use `month` or `year-month` to reduce rendering pressure | string | none |
| duration | Popup animation duration | number | 200 |
| custom-class | Root node custom class name | string | `''` |
| custom-style | Root node custom style | string | `''` |

## Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| confirm | Triggered after clicking confirm | `{ value, type }` |
| change | Triggered when panel date changes | `{ value }` |
| cancel | Triggered when closed without confirmation | - |
| open | Triggered when calendar opens | - |

## Methods

| Method Name | Description | Parameters |
| --- | --- | --- |
| open | Open calendar popup | - |
| close | Close calendar popup | - |

## Slots

| name | Description |
| --- | --- |
| confirm-left | Confirm area left slot |
| confirm-right | Confirm area right slot |

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
