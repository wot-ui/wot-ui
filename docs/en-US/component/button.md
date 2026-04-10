# Button

Buttons are used to trigger an action, such as submitting a form or opening a link.

## Component Type

### Type

```html
<wd-button>Primary Button</wd-button>
<wd-button type="success">Success Button</wd-button>
<wd-button type="info">Info Button</wd-button>
<wd-button type="warning">Warning Button</wd-button>
<wd-button type="danger">Danger Button</wd-button>
```

## Component State

### Disabled

Set the `disabled` property.

```html
<wd-button disabled>Default Button</wd-button>
```

### Loading

Set the `loading` property to put the button in a loading state. Buttons in loading state are disabled from clicking.

```html
<wd-button loading>Loading</wd-button>
```

## Component Variant

### Plain

Set `variant="plain"`.

```html
<wd-button variant="plain">Primary Button</wd-button>
```

### Dashed

Set `variant="dashed"`.

```html
<wd-button variant="dashed">Primary Button</wd-button>
```

### Text

Set `variant="text"`.

```html
<wd-button variant="text">Text Button</wd-button>
```

## Component Style

### Size

Set `size`, supports 'mini', 'small', 'medium', 'large', default is 'medium'.

```html
<wd-button size="mini">Mini Button</wd-button>
<wd-button size="small">Small Button</wd-button>
<wd-button size="medium">Medium Button</wd-button>
<wd-button size="large">Large Button</wd-button>
```

### Hairline and Round

Set `hairline` and `round` properties.

```html
<wd-button variant="plain" hairline>Hairline</wd-button>
<wd-button variant="plain" round>Round Button</wd-button>
```

## Special Style

### custom-class Shadow

Customize button styles through `custom-class` and `custom-style` properties. Here we use `custom-class` to add `Material Design 3` style `box-shadow`.

```html
<view class="page-class">
  <wd-button custom-class="custom-shadow">Primary Button</wd-button>
  <wd-button type="success" custom-class="custom-shadow">Success Button</wd-button>
  <wd-button type="info" custom-class="custom-shadow">Info Button</wd-button>
  <wd-button type="warning" custom-class="custom-shadow">Warning Button</wd-button>
  <wd-button type="danger" custom-class="custom-shadow">Danger Button</wd-button>
</view>
```

```scss
.page-class {
  :deep() {
    .custom-shadow {
      box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
    }
  }
}
```

## Content Form

### Icon Only Button

Set the `icon` property to display an icon button.

```html
<wd-button icon="edit-outline"></wd-button>
```

### Icon and Text Button

Combine `icon` with content to display an icon and text button; combine with `classPrefix` to use custom icons, see [Icon Custom Icon](/component/icon#custom-icon).

```html
<wd-button icon="download">Download</wd-button>
<wd-button classPrefix="fish" icon="kehuishouwu">Recyclable</wd-button>
```

## Layout Capability

### Block Button

Set the `block` property.

```html
<wd-button block>Primary Button</wd-button>
```

## Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| type | Button type, optional values are `primary`, `success`, `info`, `warning`, `danger` | string | primary |
| variant | Button variant, optional values are `base`, `plain`, `dashed`, `text` | string | base |
| size | Button size, optional values are `mini`, `small`, `medium`, `large` | string | medium |
| round | Round button | boolean | false |
| disabled | Disabled button | boolean | false |
| hairline | Hairline border | boolean | false |
| block | Block button | boolean | false |
| loading | Loading button | boolean | false |
| text | Button text | string | - |
| icon | Icon class name | string | - |
| classPrefix | Icon class prefix | string | wd-icon |
| loading-props | Loading configuration | `Partial<LoadingProps>` | - |
| open-type | Open capability type, see `ButtonOpenType` below | string | - |
| hover-stop-propagation | Stop ancestor node click state | boolean | false |
| hover-start-time | How long after pressing to show click state (ms) | number | 20 |
| hover-stay-time | How long after releasing to remove click state (ms) | number | 70 |
| lang | User info language, optional values are `zh_CN`, `zh_TW`, `en` | string | - |
| session-from | Session source (valid when `open-type=contact`) | string | - |
| send-message-title | Conversation message card title (valid when `open-type=contact`) | string | Current title |
| send-message-path | Conversation message card path (valid when `open-type=contact`) | string | Current share path |
| send-message-img | Conversation message card image (valid when `open-type=contact`) | string | Screenshot |
| app-parameter | Open APP parameter (valid when `open-type=launchApp`) | string | - |
| show-message-card | Show conversation message card (valid when `open-type=contact`) | boolean | false |
| button-id | Button unique identifier | string | - |
| scope | Alipay authorization scope, optional values are `phoneNumber`, `userInfo` (valid when open-type=getAuthorize) | string | - |
| loading-color | Loading icon color | string | - |
| custom-class | Root node custom class name | string | - |
| custom-style | Root node custom style | string | - |

### ButtonOpenType Open Capabilities

<!-- prettier-ignore -->
| Property | Description |
| --- | --- |
| feedback | Open "Feedback" page |
| share | Trigger user forwarding |
| getUserInfo | Get user info |
| contact | Open customer service conversation |
| getPhoneNumber | Get phone number |
| getRealtimePhoneNumber | Get real-time phone number (WeChat only) |
| launchApp | Open APP in mini program |
| openSetting | Open authorization settings page |
| chooseAvatar | Get user avatar |
| getAuthorize | Support Alipay authorization (with `scope`) |
| lifestyle | Follow lifestyle account (Alipay) |
| contactShare | Share to contacts (Alipay) |
| openGroupProfile | Open group profile card (WeChat) |
| openGuildProfile | Open channel profile card (WeChat) |
| openPublicProfile | Open official account profile card (WeChat) |
| shareMessageToFriend | Share message to friend (WeChat) |
| addFriend | Add friend (WeChat) |
| addColorSign | Add color sign (WeChat) |
| addGroupApp | Add group app (WeChat) |
| addToFavorites | Add to favorites (WeChat) |
| chooseAddress | Choose shipping address (WeChat) |
| chooseInvoiceTitle | Choose invoice title (WeChat) |
| login | Authorized login (platform capability) |
| subscribe | Subscribe (platform capability) |
| favorite | Favorite (platform capability) |
| watchLater | Watch later (platform capability) |
| openProfile | Open personal homepage (platform capability) |
| agreePrivacyAuthorization | User agrees to privacy agreement |

## Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| click | Click event | `event` |
| getuserinfo | Get user info callback | `event` |
| contact | Customer service message callback (`open-type=contact`) | `event` |
| getphonenumber | Get phone number callback (`open-type=getPhoneNumber`) | `event` |
| getrealtimephonenumber | Get real-time phone number callback (`open-type=getRealtimePhoneNumber`) | `event` |
| error | Open capability error callback (`open-type=launchApp`) | `event` |
| launchapp | Open APP success callback (`open-type=launchApp`) | `event` |
| opensetting | Open authorization settings page callback (`open-type=openSetting`) | `event` |
| chooseavatar | Get user avatar callback (`open-type=chooseAvatar`) | `event` |
| agreeprivacyauthorization | Agree to privacy agreement callback (`open-type=agreePrivacyAuthorization`) | `event` |

## Slots

| name | Description |
| --- | --- |
| default | Button content |
