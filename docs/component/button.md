# Button 按钮

按钮用于触发一个操作，如提交表单或打开链接。

## 组件类型

### 类型

```html
<wd-button>主要按钮</wd-button>
<wd-button type="success">成功按钮</wd-button>
<wd-button type="info">信息按钮</wd-button>
<wd-button type="warning">警告按钮</wd-button>
<wd-button type="danger">危险按钮</wd-button>
```

## 组件状态

### 禁用

设置 `disabled` 属性。

```html
<wd-button disabled>默认按钮</wd-button>
```

### 加载

设置 `loading` 属性，让按钮处于加载中状态。加载中的按钮是禁止点击的。

```html
<wd-button loading>加载中</wd-button>
```

## 组件变体

### 镂空

设置 `variant="plain"`。

```html
<wd-button variant="plain">主要按钮</wd-button>
```

### 虚线

设置 `variant="dashed"`。

```html
<wd-button variant="dashed">主要按钮</wd-button>
```

### 柔和

设置 `variant="soft"`。

```html
<wd-button variant="soft">主要按钮</wd-button>
```

### 文字

设置 `variant="text"`。

```html
<wd-button variant="text">文字按钮</wd-button>
```

## 组件样式

### 尺寸

设置 `size` ，支持 'mini'、'small'、'medium'、'large'，默认为 'medium'。

```html
<wd-button size="mini">迷你按钮</wd-button>
<wd-button size="small">小号按钮</wd-button>
<wd-button size="medium">中号按钮</wd-button>
<wd-button size="large">大号按钮</wd-button>
```

### 细边框与圆角

设置 `hairline` 与 `round` 属性。

```html
<wd-button variant="plain" hairline>细边框</wd-button>
<wd-button variant="plain" round>圆角按钮</wd-button>
```

## 特殊样式

### custom-class 阴影

通过 `custom-class` 和 `custom-style` 属性可以自定义按钮样式，这里使用 `custom-class` 添加 `Material Design 3` 风格 `box-shadow`。

```html
<view class="page-class">
  <wd-button custom-class="custom-shadow">主要按钮</wd-button>
  <wd-button type="success" custom-class="custom-shadow">成功按钮</wd-button>
  <wd-button type="info" custom-class="custom-shadow">信息按钮</wd-button>
  <wd-button type="warning" custom-class="custom-shadow">警告按钮</wd-button>
  <wd-button type="danger" custom-class="custom-shadow">危险按钮</wd-button>
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

## 内容形态

### 纯图标按钮

设置 `icon` 属性可展示图标按钮。

```html
<wd-button icon="edit-outline"></wd-button>
```

### 图文按钮

结合 `icon` 与内容展示图文按钮；结合 `classPrefix` 可使用自定义图标，参见 [Icon 自定义图标](/component/icon#自定义图标)。

```html
<wd-button icon="download">下载</wd-button>
<wd-button classPrefix="fish" icon="kehuishouwu">可回收</wd-button>
```

## 布局能力

### 块状按钮

设置 `block` 属性。

```html
<wd-button block>主要按钮</wd-button>
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 按钮类型，可选值为 `primary`、`success`、`info`、`warning`、`danger` | string | primary |
| variant | 按钮变体，可选值为 `base`、`plain`、`dashed`、`soft`、`text` | string | base |
| size | 按钮尺寸，可选值为 `mini`、`small`、`medium`、`large` | string | medium |
| round | 圆角按钮 | boolean | false |
| disabled | 禁用按钮 | boolean | false |
| hairline | 细边框 | boolean | false |
| block | 块状按钮 | boolean | false |
| loading | 加载中按钮 | boolean | false |
| text | 按钮文本 | string | - |
| icon | 图标类名 | string | - |
| class-prefix | 类名前缀，用于使用自定义图标，用法参考 Icon 组件 | string | wd-icon |
| css-icon | CSS 图标，用法参考 Icon 组件 | `boolean \| string` | false |
| loading-props | 加载配置项 | `Partial<LoadingProps>` | - |
| open-type | 开放能力类型，详见下方 `ButtonOpenType` | string | - |
| hover-stop-propagation | 阻止祖先节点点击态 | boolean | false |
| hover-start-time | 按下后多久出现点击态（ms） | number | 20 |
| hover-stay-time | 松开后多久移除点击态（ms） | number | 70 |
| lang | 用户信息语言，可选值为 `zh_CN`、`zh_TW`、`en` | string | - |
| session-from | 会话来源（`open-type=contact` 时有效） | string | - |
| send-message-title | 会话消息卡片标题（`open-type=contact` 时有效） | string | 当前标题 |
| send-message-path | 会话消息卡片路径（`open-type=contact` 时有效） | string | 当前分享路径 |
| send-message-img | 会话消息卡片图片（`open-type=contact` 时有效） | string | 截图 |
| app-parameter | 打开 APP 传参（`open-type=launchApp` 时有效） | string | - |
| show-message-card | 显示会话消息卡片（`open-type=contact` 时有效） | boolean | false |
| button-id | 按钮唯一标识 | string | - |
| scope | 支付宝授权范围，可选值为 `phoneNumber`、`userInfo`（open-type=getAuthorize 时有效） | string | - |
| loading-color | 加载图标颜色 | string | - |
| custom-class | 根节点自定义类名 | string | - |
| custom-style | 根节点自定义样式 | string | - |

### ButtonOpenType 开放能力

<!-- prettier-ignore -->
| 属性 | 说明 |
| --- | --- |
| feedback | 打开“意见反馈”页 |
| share | 触发用户转发 |
| getUserInfo | 获取用户信息 |
| contact | 打开客服会话 |
| getPhoneNumber | 获取手机号 |
| getRealtimePhoneNumber | 实时获取手机号（仅微信） |
| launchApp | 在小程序中打开 APP |
| openSetting | 打开授权设置页 |
| chooseAvatar | 获取用户头像 |
| getAuthorize | 支持支付宝授权（配合 `scope`） |
| lifestyle | 关注生活号（支付宝） |
| contactShare | 分享到通讯录（支付宝） |
| openGroupProfile | 打开群资料卡（微信） |
| openGuildProfile | 打开频道资料卡（微信） |
| openPublicProfile | 打开公众号资料卡（微信） |
| shareMessageToFriend | 分享消息给朋友（微信） |
| addFriend | 添加好友（微信） |
| addColorSign | 添加彩签（微信） |
| addGroupApp | 添加群应用（微信） |
| addToFavorites | 收藏（微信） |
| chooseAddress | 选择收货地址（微信） |
| chooseInvoiceTitle | 选择发票抬头（微信） |
| login | 授权登录（平台能力） |
| subscribe | 订阅（平台能力） |
| favorite | 收藏（平台能力） |
| watchLater | 稍后再看（平台能力） |
| openProfile | 打开个人主页（平台能力） |
| agreePrivacyAuthorization | 用户同意隐私协议 |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| click | 点击事件 | `event` |
| getuserinfo | 获取用户信息回调 | `event` |
| contact | 客服消息回调（`open-type=contact`） | `event` |
| getphonenumber | 获取手机号回调（`open-type=getPhoneNumber`） | `event` |
| getrealtimephonenumber | 实时获取手机号回调（`open-type=getRealtimePhoneNumber`） | `event` |
| error | 开放能力错误回调（`open-type=launchApp`） | `event` |
| launchapp | 打开 APP 成功回调（`open-type=launchApp`） | `event` |
| opensetting | 打开授权设置页回调（`open-type=openSetting`） | `event` |
| chooseavatar | 获取用户头像回调（`open-type=chooseAvatar`） | `event` |
| agreeprivacyauthorization | 同意隐私协议回调（`open-type=agreePrivacyAuthorization`） | `event` |

## Slots

| name | 说明 |
| --- | --- |
| default | 按钮内容 |
