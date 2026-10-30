# 玻璃效果（Glassmorphism）

Wot UI 提供了一套可复用的毛玻璃（glassmorphism）视觉层，灵感来自 Apple Liquid Glass，但在 CSS 能力范围内实现：半透明表面、背景模糊、饱和度增强、细边框与柔和阴影。

::: warning 说明
这是“磨砂玻璃”近似效果，不是完整的 Apple Liquid Glass。动态反射、光照、交互形变等能力依赖原生渲染，CSS 无法复现。在不支持 `backdrop-filter` 的端上会退化为半透明纯色表面。
:::

## 快速开始

玻璃效果依赖主题 token。推荐先启用内置的 `glass` 或 `glass-dark` 预设：

```scss
/* App.vue */
@use '@wot-ui/ui/styles/theme/index.scss' as *;
@use './theme/presets.scss' as *;

page,
.wd-root-portal {
  @include glass-theme-vars();
}
```

深色模式使用 `glass-dark-theme-vars()`。也可以直接使用默认主题内置的 `--wot-glass-*` token，无需预设。

## 三种启用方式

### 1. 组件属性

大多数容器、弹层、导航与表单组件提供 `glass` 属性：

```html
<wd-card title="玻璃卡片" glass>
  <view>半透明磨砂玻璃效果。</view>
</wd-card>

<wd-button glass>玻璃按钮</wd-button>
```

### 2. 全局工具类

没有 `glass` 属性的组件，可以直接加 `.wd-glass`：

```html
<view class="wd-glass">任意容器</view>
<wd-cell title="玻璃单元格" custom-class="wd-glass"></wd-cell>
```

### 3. 共享 mixin

在自己的样式里复用同一套玻璃样式：

```scss
@use '@wot-ui/ui/styles/mixin/glass.scss' as *;

.my-panel {
  @include glass;
}
```

## 支持的组件

| 分类 | 组件 | 启用方式 |
| --- | --- | --- |
| 容器 | Card、Cell、CellGroup、Collapse、Empty、Loadmore、Sticky | `glass` |
| 弹层 | Popup、Dialog、ActionSheet、FloatingPanel、Toast、Notify、NoticeBar、Popover、Tooltip、Tour | `glass` |
| 导航 | Navbar、Tabbar、Tabs、Sidebar、DropMenu、Segmented、Steps、Pagination、Grid | `glass` |
| 表单 | Input、Textarea、Search、InputNumber、PasswordInput、Picker、SelectPicker、Cascader、DatetimePicker、Calendar、FormItem | `glass` |
| 数据展示 | Table、Tag、Badge、Avatar、Img、ImagePreview、VideoPreview、Swiper、SwipeAction、Upload、CountDown、CountTo、Backtop | `glass` |
| 其他 | 任意元素 | `.wd-glass` 或 `@include glass;` |

## 示例

### 玻璃卡片 + 按钮

```html
<wd-card title="今日概览" glass>
  <view class="stat">12,480</view>
  <template #footer>
    <wd-button glass size="small">查看详情</wd-button>
  </template>
</wd-card>
```

### 玻璃导航栏

```html
<wd-navbar title="玻璃导航" glass fixed placeholder />
```

### 玻璃弹层

```html
<wd-popup v-model="show" glass position="bottom" round>
  <view class="panel">内容</view>
</wd-popup>
```

### 玻璃输入框

```html
<wd-input v-model="keyword" glass placeholder="搜索" />
```

## 可定制 token

| Token | 说明 | 默认值（浅色） |
| --- | --- | --- |
| `--wot-glass-surface` | 玻璃表面颜色 | `rgba(255, 255, 255, 0.25)` |
| `--wot-glass-blur` | 背景模糊半径 | `12px` |
| `--wot-glass-saturate` | 背景饱和度 | `180%` |
| `--wot-glass-border` | 玻璃边框颜色 | `rgba(255, 255, 255, 0.3)` |
| `--wot-glass-shadow` | 玻璃阴影 | `0 8px 32px 0 rgba(15, 23, 42, 0.12)` |
| `--wot-glass-radius` | 玻璃圆角 | `12px` |

覆盖示例：

```css
.my-glass-panel {
  --wot-glass-blur: 20px;
  --wot-glass-saturate: 200%;
  --wot-glass-surface: rgba(255, 255, 255, 0.15);
}
```

## 平台与可访问性

- H5、现代 WebView 与多数小程序支持 `backdrop-filter`；不支持的端自动退化为半透明表面。
- 玻璃表面会降低文字对比度。请确保正文与背景的对比度不低于 WCAG AA（4.5:1），必要时提高表面不透明度或加深文字颜色。
- 不建议在同一屏叠加过多玻璃层，既影响性能也会削弱层级关系。
- 装饰性玻璃元素不应承载唯一的信息表达。
