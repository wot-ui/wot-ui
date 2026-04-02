# Card 卡片

用于展示商品的图片、价格等信息。

## 组件类型

### 基本使用

通过 `title` 设置标题，默认插槽传入内容，`footer` 插槽用于底部操作区。

```html
<wd-card title="岳阳楼记">
  <view class="content-text">
    至若春和景明，波澜不惊，上下天光，一碧万顷，沙鸥翔集，锦鳞游泳，岸芷汀兰，郁郁青青。
  </view>
  <template #footer>
    <wd-button size="small" plain>阅读全文</wd-button>
  </template>
</wd-card>
```

### 矩形卡片

设置 `type="rectangle"` 使用矩形卡片样式。

```html
<wd-card title="生活记录" type="rectangle">
  <view class="list-group">
    <view class="list-item">
      <image src="https://wot-ui.cn/assets/panda.jpg" class="list-item__image" mode="aspectFill" />
      <view class="list-item__content">
        <view class="list-item__title">今天天气真好</view>
        <view class="list-item__desc">2026年2月11日 晴天 22℃</view>
      </view>
    </view>
  </view>
  <template #footer>
    <wd-button size="small" plain>点赞</wd-button>
  </template>
</wd-card>
```

## 组件样式

### 复杂卡片

结合图片、标签、属性区块可构建信息密度更高的卡片内容。

```html
<wd-card title="宠物档案">
  <view class="info-card">...</view>
  <template #footer>
    <wd-button size="small" plain>点赞 (1.2w)</wd-button>
  </template>
</wd-card>
```

## 内容形态

### 自定义标题

使用 `title` 插槽自定义标题区域内容。

```html
<wd-card type="rectangle">
  <template #title>
    <view class="custom-title">
      <view>兴趣爱好</view>
      <view class="custom-title__tip">
        <wd-icon name="heart" size="14px" custom-style="vertical-align: bottom; margin-right: 4px;" />
        快乐源泉
      </view>
    </view>
  </template>
  <view class="list-group">...</view>
</wd-card>
```

## 特殊样式

### 去除 Footer

不传 `footer` 插槽时，底部区域不会渲染。

```html
<wd-card title="精彩瞬间" type="rectangle">
  <view class="moment-card">...</view>
</wd-card>
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 卡片标题 | string | - |
| type | 卡片类型，支持 `rectangle` | string | - |
| custom-title-class | 标题区域自定义类名 | string | `''` |
| custom-content-class | 内容区域自定义类名 | string | `''` |
| custom-footer-class | 底部区域自定义类名 | string | `''` |
| custom-class | 根节点自定义类名 | string | `''` |
| custom-style | 根节点自定义样式 | string | `''` |

## Slots

| name | 说明 |
| --- | --- |
| default | 卡片内容 |
| title | 卡片标题 |
| footer | 底部操作内容 |
