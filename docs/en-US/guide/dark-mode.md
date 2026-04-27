# Dark Mode

We have built-in support for dark mode. Developers only need simple configuration to use it in projects. You can switch to dark mode in the upper right corner of the official website to experience it.

## Enable Dark Mode
By wrapping the application or page entry with the `wd-config-provider` component and setting `theme` to `dark`, Wot components within the scope wrapped by the current `wd-config-provider` can be switched to dark style.

::: warning Note
Before using dark mode, you need to import the theme variable file in the entry file (e.g. `App.vue`):

- npm install: `@use '@wot-ui/ui/styles/theme/index.scss' as *;`
- uni_modules install: `@use '@/uni_modules/wot-ui/styles/theme/index.scss' as *;`
:::

::: code-group
```html [vue]
<wd-config-provider theme="dark">
  <wd-button type="primary">Dark Mode Button</wd-button>
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
 
 ## More Features

 See [ConfigProvider](/component/config-provider) component.
