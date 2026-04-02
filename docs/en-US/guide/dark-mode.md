# Dark Mode

We have built-in support for dark mode. Developers only need to make simple configurations to use it in their projects. You can switch to dark mode in the upper right corner of the official website to experience it.

## Enabling Dark Mode

Wrap the application or page entry with the `wd-config-provider` component and set `theme` to `dark`. This allows the Wot components within the `wd-config-provider` to switch to the dark style.

```html
<wd-config-provider theme="dark">
  <wd-button type="primary">Dark Mode Button</wd-button>
</wd-config-provider>
```

## More Features

See the [ConfigProvider](/en-US/component/config-provider) component.
