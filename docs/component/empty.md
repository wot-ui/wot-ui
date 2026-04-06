# Empty 缺省提示

一般用于兜底占位展示。

## 内容形态

设置 `icon` 修改展示缺省图标或图片，默认为 `empty`。支持内置的常见图标名如 `no-result`、`no-wifi`、`no-content`、`no-collection`、`no-comment`、`failpayment`、`no-message`。可设置 `tip` 来控制展示提示文案。

```html
<wd-empty icon="no-result" tip="当前搜索无结果" />
<wd-empty icon="no-wifi" tip="当前网络不可用，请检查你的网络设置" />
<wd-empty icon="no-content" tip="暂无内容" />
<wd-empty icon="no-collection" tip="暂无收藏" />
<wd-empty icon="no-comment" tip="暂无评论" />
<wd-empty icon="failpayment" tip="支付失败，请重新订购" />
<wd-empty icon="no-message" tip="已订阅全部消息" />
```

## 组件样式

### 自定义大小

通过 `icon-size` 属性自定义图标或图片的大小，默认单位为 `px`。

```html
<wd-empty :icon-size="140" icon="no-result" tip="当前搜索无结果" />
```

## 特殊样式

### 自定义图片

需要自定义外部图片时，可以直接在 `icon` 属性中传入完整的图片 URL。

```html
<wd-empty icon="https://wot-ui.cn/assets/panda.jpg" tip="查看我的头像" />
```

### 自定义图片内容

使用 `image` 插槽可以完全自定义图标或图片位置的渲染内容。

```html
<wd-empty tip="自定义图片内容">
  <template #image>
    <wd-icon name="sun-fill" size="100px"></wd-icon>
  </template>
</wd-empty>
```

### 自定义底部内容

使用 `bottom` 插槽可以在提示文本底部渲染自定义内容（如操作交互按钮）。建议在插槽内部包裹一层容器以便于控制与上方内容的间距。

```html
<wd-empty icon="no-content" tip="当前搜索无结果">
  <template #bottom>
    <view class="bottom-actions">
      <wd-button type="info">重新加载</wd-button>
    </view>
  </template>
</wd-empty>
```

建议样式（可在页面或全局样式中添加）：

```css
.bottom-actions {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  width: 100%;
}
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| icon | 缺省图标名称或图片 URL | string | `empty` |
| icon-size | 图标或图片大小，默认单位为 px | string / number | - |
| tip | 提示文案 | string | - |

## Slots

| name | 说明 |
| --- | --- |
| image | 自定义图片区域内容 |
| bottom | 自定义底部内容 |

## 外部样式类

| 类名 | 说明 |
| --- | --- |
| custom-class | 根节点样式 |
| custom-style | 根节点样式 |