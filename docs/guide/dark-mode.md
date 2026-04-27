# 深色模式

我们内置了对深色模式的支持，开发者只需进行简单的配置即可在项目中使用，官网右上角可以切换至深色模式进行体验。

## 开启深色模式
通过 `wd-config-provider` 组件包裹应用或页面入口，并将 `theme` 设置为 `dark`，可以让当前 `wd-config-provider` 包裹范围内的 Wot 组件切换为深色风格。

::: warning 注意
使用深色模式前，需要在入口文件（如 `App.vue`）中引入主题变量文件：

- npm 安装：`@use '@wot-ui/ui/styles/theme/index.scss' as *;`
- uni_modules 安装：`@use '@/uni_modules/wot-ui/styles/theme/index.scss' as *;`
:::

::: code-group
```html [vue]
<wd-config-provider theme="dark">
  <wd-button type="primary">深色模式按钮</wd-button>
</wd-config-provider>
```
```scss [App.vue - npm]
/* App.vue */
@use '@wot-ui/ui/styles/theme/index.scss' as *;
```
```scss [App.vue - uni_modules]
/* App.vue */
@use '@/uni_modules/wot-ui/styles/theme/index.scss' as *;
```
:::
 
 ## 更多功能

 参见 [ConfigProvider](/component/config-provider) 组件。