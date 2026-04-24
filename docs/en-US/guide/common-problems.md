# FAQ

This section introduces some **common problems** and **solutions** encountered during development.

## What platforms are currently supported?

Currently supports WeChat Mini Program, Alipay Mini Program, DingTalk Mini Program, H5, APP and other platforms.

## Are there any best practices to share?

Yes, you can follow my WeChat public account "不如摸鱼去" (Better to Slack Off), or visit my blog [不如摸鱼去](https://blog.wot-ui.cn/), which shares countless干货 (dry goods), waiting for you to read.

## Does the component library provide individually importable components?

Currently not available. First, the plugin market lacks `CI/CD` tools and cannot achieve automated publishing. Maintaining a set of individually importable components is time-consuming and labor-intensive. Second, the installation methods provided by the component library can all achieve on-demand import, so there is no need to provide individually importable components.

## How to enable dark mode?

`Wot UI` supports dark mode, theme customization and other capabilities, see [ConfigProvider Global Configuration](/component/config-provider.html) component for details.

## Is there a technical exchange group?

Yes!
You can join the [Wot UI Mutual Aid Group](/guide/join-group.html) to share experiences and exchange ideas.

## Sass throws a lot of warnings?
If you encounter the following warning at runtime:
```sh
Deprecation Warning [legacy-js-api]: The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0.
```
You can do this in `vite.config.ts`:

```ts
export default defineConfig({
  // ...
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        silenceDeprecations: ['legacy-js-api']
      }
    }
  },
// ...
})
```
`Sass` has deprecated a large number of APIs, while `uni-app` is still using these APIs, causing warnings to be thrown.

## Mini Program Custom Component Rendering Issues

WeChat/QQ/Baidu/Douyin mini programs, custom components will have one more level of node when rendering than App/H5. The following uses the `divider` component as an example:

```vue
<!-- Usage -->
<wd-divider></wd-divider>

<!-- h5 rendering -->
<view class="wd-divider"></view>

<!-- WeChat Mini Program rendering -->
<wd-divider>
  <view class="wd-divider"></view>
</wd-divider>
```

### Solution

On WeChat, you can use [virtualHost](https://uniapp.dcloud.net.cn/tutorial/vue-api.html#%E5%85%B6%E4%BB%96%E9%85%8D%E7%BD%AE) to solve this. After setting `virtualHost` to `true`, the custom node will be set to virtual, which is closer to the performance of Vue components. It can remove the extra outermost tag of WeChat Mini Program custom components. After enabling, you can also merge the outer attributes of component virtual nodes through [mergeVirtualHostAttributes](https://uniapp.dcloud.net.cn/collocation/manifest.html#mp-weixin).

```js
// vue2 using virtualHost
export default {
  data() {
    return {}
  },
  options: {
    virtualHost: true
  }
}
```

```ts
// vue3 script setup using virtualHost
<script lang="ts">
export default {
  // Set custom node to virtual, closer to Vue component performance, can remove extra outermost tag of WeChat Mini Program custom components
  options: {
    virtualHost: true
  }
}
</script>
<script lang="ts" setup>
</script>
```

### Enable virtualHost Effect

Here we still use the `divider` component as an example:

```vue
<!-- Usage -->
<wd-divider></wd-divider>

<!-- h5 rendering -->
<view class="wd-divider"></view>

<!-- WeChat Mini Program rendering -->
<view class="wd-divider"></view>
```

## How to customize the theme?

We provide `css variables` for each component. You can refer to the usage introduction of [config-provider](../component/config-provider) component to customize the theme.

## Toast and Dialog components have no effect when called?

First, check if the usage is correct. The `uni-app` platform does not support global mounting of components, so `Dialog`, `Toast` and other components still need to be explicitly used in SFC, for example:

```html
<wd-toast></wd-toast>
```

The function calls of `Dialog`, `Toast` are based on `provide/inject` implementation, so your call must be in `setup`.

## When compiling to Alipay Mini Program, the mask of Popup component cannot be displayed?

Due to platform updates changing the default style isolation strategy. See [Style Override - Specific Platform Style Penetration Failure](./custom-style.md#specific-platform-style-penetration-failure) for details.

## Why are methods and tool classes imported from `@/uni_modules/wot-ui` in the component library documentation?

The current component library development method is to place the component library code in the `@/uni_modules/wot-ui` directory, so the documentation imports methods and tool classes from `@/uni_modules/wot-ui`. When using `npm` to install the component library, you can adjust it like this:

```ts
// useToast, useNotify, etc.
import { useDialog } from '@/uni_modules/wot-ui'
```

Replace with

```ts
import { useDialog } from '@wot-ui/ui'
```

## How does uni-app customize compilation platforms, such as DingTalk Mini Program?

You can refer to the [package.json](https://uniapp.dcloud.net.cn/collocation/package.html#%E7%A4%BA%E4%BE%8B-%E9%92%89%E9%92%89%E5%B0%8F%E7%A8%8B%E5%BA%8F) chapter in the `uni-app` documentation.

DingTalk Mini Program example:
```JSON
{
    "uni-app": {
    "scripts": {
      "mp-dingtalk": {
        "title": "DingTalk Mini Program",
        "env": {
          "UNI_PLATFORM": "mp-alipay"
        },
        "define": {
          "MP-DINGTALK": true
        }
      }
    }
  },
}
```

## What to do if the hooks provided by the current component library to control component display/hide don't work?

:::tip Note
The issue of `useToast`, `useDialog`, `useNotify`, `useQueue` and other hooks not working after multiple `use` executions has been fixed in version 1.3.14, please upgrade to the latest version.
:::

**_You can troubleshoot according to the following steps_**

1. The `uni-app` platform does not support global mounting of components, so `Message`, `Toast`, `Notify` and other components need to be explicitly used in SFC, for example:

```html
<wd-toast></wd-toast>
```

2. `useToast`, `useDialog`, `useNotify`, `useQueue` and other hooks don't work, please check if they are called in `setup`. If called in `setup`, please check if there are multiple `use` execution scenarios on the current page, such as executing in multiple components, which will cause the previous `use` to become invalid. For this scenario, the function calls of components all support passing the `selector` parameter. You can use the `selector` parameter to specify the component, for example:

```html
<wd-toast></wd-toast>
<wd-toast selector="my-toast"></wd-toast>
```

```ts
const toast = useToast()
const myToast = useToast('my-toast')
```



## Why do `Slider`, `Tabs` and other components behave abnormally when wrapped by `Popup`, `ActionSheet`, `DropDownItem` and other popup components on WeChat Mini Program?

Currently, uni-app has issues when using `v-if` to control whether slots are displayed when compiled to WeChat Mini Program. For specific issues, see: [4755](https://github.com/dcloudio/uni-app/issues/4755), [4847](https://github.com/dcloudio/uni-app/issues/4847). `Popup`, `ActionSheet`, `DropDownItem` happen to use `v-if` to control whether slots are displayed, so it causes `Slider`, `Tabs` to execute related lifecycles when not rendered. Some data of `Slider`, `Tabs` components, such as the width of `Slider`, the position of the slider in `Tabs`, etc., will be obtained in lifecycles like onMounted. At this time, this data will be abnormal.

Solution:

1. Use `v-if` outside `Slider`, `Tabs` and other components to control not displaying before the popup opens, for example:
```html
<wd-slider v-if="showSlider"></wd-slider>
```

1. Reinitialize `Slider`, `Tabs` components in the hook when `Popup`, `ActionSheet`, `DropDownItem` and other components are fully opened, for example:
   
```html
<wd-popup v-model="show" position="bottom" closable custom-style="height: 200px;" @after-enter="handleOpened">
<wd-slider v-model="value" ref="slider"></wd-slider>
</wd-popup>
```
```ts
const slider = ref()

function handleOpened() {
  slider.value!.initSlider()
}

```

## Why are multiple Dialogs popping up?
Check if the page where multiple `Dialog` popups appear has multiple identical `selector` or no `selector` `<wd-dialog></wd-dialog>` tags (current page including components used in the page). The same applies to `toast`. When using `Dialog` and other components in child components, you need to specify `selector` and ensure `selector` is unique.

## How to globally call Toast, Message, Loading?

For global calling solutions, see [wot-starter](https://starter.wot-ui.cn/guide/feedback.html), which supports globally callable feedback components for use in scenarios such as route navigation guards and network request interceptors.


## How to quickly solve your problem?

[How to Ask Questions The Smart Way](https://lug.ustc.edu.cn/wiki/doc/smart-questions/) can help you quickly ask the right questions and get faster answers.

## About Us

**If your problem is not in the above list or you have better suggestions, please contact us [Moonofweisheng](https://github.com/wot-ui/wot-ui)**
