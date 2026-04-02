# Internationalization

Wot UI uses Chinese by default and supports multi-language switching. If you want to use other languages, you can refer to the solutions below.

:::warning Note
Currently, the package published on npm is uncompiled `vue` and `ts`. Vite will cache [pre-built](https://vitejs.dev/guide/dep-pre-bundling.html) dependencies in `node_modules/.vite`. The component library's internationalization is implemented based on `reactive` for data sharing. During the `dev` stage, the page will use internationalization data from the pre-built product, while the component library uses its internal internationalization data. Therefore, when importing in non-`uni_modules` mode, you need to add the following configuration in `vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

export default defineConfig({
  ...
  optimizeDeps: {
    exclude: ['@wot-ui/ui']
  }
  ...
})

```

Use [optimizeDeps.exclude](https://cn.vitejs.dev/config/dep-optimization-options.html#optimizedeps-exclude) to forcibly exclude the `@wot-ui/ui` module from pre-building. In `uni_modules` mode, no processing is needed.

:::

## Using Other Languages

We implement multi-language support through the **Locale** component. You can use the **Locale.use** method to switch the current language.

```typescript
import { Locale } from '@wot-ui/ui'
// Import English language pack
import enUS from '@wot-ui/ui/locale/lang/en-US'

Locale.use('en-US', enUS)
```

## Override Language Pack

You can modify and extend the text through the **Locale.add** method, for example:

```typescript
import { Locale } from '@wot-ui/ui'

const messages = {
  'zh-CN': {
    calendar: {
      title: 'Please select date' // Change 'Select date' to 'Please select date'
    }
  }
}

Locale.add(messages)
```

## Supported Languages

| Language | File Name | Version |
| ---------------- | --------- | --------- |
| Simplified Chinese | zh-CN | `v0.2.20` |
| Traditional Chinese (Taiwan) | zh-TW | `v0.2.20` |
| Traditional Chinese (Hong Kong) | zh-HK | `v0.2.20` |
| English | en-US | `v0.2.20` |
| Thai | th-TH | `v0.2.20` |
| Vietnamese | vi-VN | `v0.2.20` |
| Arabic | ar-SA | `v1.3.12` |
| German | de-DE | `v1.3.12` |
| Spanish | es-ES | `v1.3.12` |
| Portuguese | pt-PT | `v1.3.12` |
| French | fr-FR | `v1.3.12` |
| Japanese | ja-JP | `v1.3.12` |
| Korean | ko-KR | `v1.3.12` |
| Turkish | tr-TR | `v1.3.12` |
| Russian | ru-RU | `v1.3.12` |

If you need to use other languages, you are welcome to contribute a [PR](https://github.com/wot-ui/wot-ui/pulls). Just add a language configuration file [here](https://github.com/wot-ui/wot-ui/tree/master/src/uni_modules/wot-ui/locale/lang).