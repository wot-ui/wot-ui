# Custom Style

In this section, you will learn how to effectively override the default styles of Wot UI components.

## Using External Style Classes

We provide a large number of external style classes for developers to use, such as `custom-style` and `custom-class`. The specific style class names can be found in the documentation of the corresponding components.

When using them, simply pass your custom class name to the corresponding external style class attribute:

```vue
<wd-button custom-class="custom-button" type="primary">Primary Button</wd-button>
```

```scss
/* Component Style */
:deep(.custom-button) {
  color: red !important;
}
```

## Page-level Style Override

When using Wot UI components in a page, you can directly override styles in the page's style file.

Wot UI components usually have a characteristic class name starting with `wd-` at the outermost layer or key nodes. If you are in an ordinary style block without `scoped`, you can directly override styles through the class name:

```vue
<wd-button type="primary">Primary Button</wd-button>
```

```scss
/* Page Style (non-scoped) */
.wd-button {
  color: red !important;
}
```

If you are in a `scoped` style block, you need to use the `:deep()` pseudo-class to penetrate the component for style overriding:

```vue
<wd-button type="primary">Primary Button</wd-button>
```

```scss
/* Page Style (scoped) */
:deep(.wd-button) {
  color: red !important;
}
```

### Deep Understanding of :deep()

In most cases, you can override styles directly using class names. However, if you use `scoped` styles in **your own page**, your CSS will only affect elements on the current page. If you want to affect child components (i.e., Wot UI components) within `scoped` styles, you need to use the `:deep()` pseudo-class:

```css
<style scoped>
.my-page :deep(.wd-button) {
  color: red !important;
}
</style>
```

The above code will be compiled to something like this (with data attributes):

```css
.my-page[data-v-f3f3eg9] .wd-button {
  color: red !important;
}
```

For more details, please refer to [SFC CSS Features](https://vuejs.org/api/sfc-css-features.html).

## Disable Custom Component Style Isolation

If you use Wot UI components in **your custom components** and want to override Wot component styles within your custom component, you may find that the styles do not take effect.

This is because in the mini-program environment, custom components enable style isolation by default. You need to explicitly remove this restriction by enabling the `styleIsolation: 'shared'` option.

```vue
<wd-button type="primary">Primary Button</wd-button>
```

**Configuration for Vue 3.3+:**
Using the `defineOptions` macro:

```ts
<script lang="ts" setup>
defineOptions({
  options: {
    styleIsolation: 'shared'
  }
})
</script>
```

**Configuration for Vue 3.2 and below:**

```ts
// vue
<script lang="ts">
export default {
  options: {
    styleIsolation: 'shared'
  }
}
</script>
<script lang="ts" setup>
// ... other logic
</script>
```

After enabling `shared`, you can override Wot components in your component styles:

```scss
/* Component Style */
:deep(.wd-button) {
  color: red !important;
}
```

## Using CSS Variables

We have provided a customization solution based on CSS Variables for all components.

Compared to the mandatory override via class names or penetration introduced above, this approach is more elegant. It supports bulk modification of styles for multiple components at the page or application level for theme customization.

Of course, using it to modify part of the styles of a single component is also more than enough:

```vue
<template>
  <view class="custom-theme-wrapper">
    <wd-button type="primary">Primary Button</wd-button>
  </view>
</template>

<style>
.custom-theme-wrapper {
  /* Override the primary background color of the button */
  --wot-button-primary-bg: pink;
}
</style>
```

For a complete list of CSS variables and a deeper guide to theme customization, please refer to [Custom Theme](./custom-theme.md).

## Style Penetration Failure on Specific Platforms

In some specific platform updates (such as Alipay mini-program), the default style isolation strategy might change, causing the original style penetration to fail.

For example, uni-app changed the default value of `styleIsolation` for Alipay mini-programs to `apply-shared` in version `3.99.2023122704`, while the original default `styleIsolation` for Alipay mini-programs was `shared`. This causes the style penetration of components like masks to fail.

**Solution:**
Force `styleIsolation` to `shared` in the `manifest.json` at the root of the project.

```json
{
  // ...
  "mp-alipay": {
    // ...
    "styleIsolation": "shared"
    // ...
  }
  // ...
}
```