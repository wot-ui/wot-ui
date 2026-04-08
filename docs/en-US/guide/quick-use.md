# Quick Start

This section introduces how to install, configure, and use `Wot UI` in a `uni-app` project.

## Before Use

Before using, please ensure you have learned the official Vue [Quick Start](https://vuejs.org/guide/quick-start.html) and the learning path provided by uni-app [Learning Path](https://uniapp.dcloud.net.cn/resource.html).

## Installation

:::warning About Installation

`Wot UI` provides two installation methods: `uni_modules` and `npm`, choose as needed.

- Using `uni_modules` installation requires no additional configuration, plug and play, but each update of the component library requires handling code differences (usually just overwriting is fine).
- Using `npm` installation requires additional configuration, and no code differences need to be handled when updating the component library.

:::

### npm Installation

::: code-group

```bash [npm]
npm i @wot-ui/ui
```

```bash [yarn]
yarn add @wot-ui/ui
```

```bash [pnpm]
pnpm add @wot-ui/ui
```

:::

### uni_modules Installation

`Wot UI` supports the [uni_modules](https://uniapp.dcloud.net.cn/plugin/uni_modules.html#uni-modules) specification and is available on the uni-app plugin market.

In `uni-app plugin market`, choose to import using `HBuildX`, or manually create a uni_modules folder under the src directory and extract `Wot UI` into uni_modules, with the structure as follows:

```bash
- uni_modules
- - - wot-ui 
```

Download link: <a href="https://ext.dcloud.net.cn/plugin?id=27534"><span>wot-ui</span></a>

## Sass

`Wot UI` depends on `sass`, so before using, you need to confirm whether `sass` is installed in the project. If not installed, you can install it with the following command:

::: code-group

```bash [npm]
npm i sass -D
```

```bash [yarn]
yarn add sass -D
```

```bash [pnpm]
pnpm add sass -D
```
:::

## Configuration

### Import Components

::: tip Reminder
When using `uni_modules` installation, `Wot UI` components naturally support the `easycom` specification, requiring no additional configuration for automatic component import. When using `npm installation`, you need to follow this step for configuration. Choose one of the following two solutions.
:::

#### Vite-based Auto-import Configuration <el-tag type="primary" style="vertical-align: middle;margin-left:8px;" effect="dark" >Option 1</el-tag>

If you are not familiar with `easycom`, you can also achieve automatic component import through [@uni-helper/vite-plugin-uni-components](https://github.com/uni-helper/vite-plugin-uni-components).

:::tip Reminder
- If using this solution, the console prints many `Sourcemap for points to missing source files​`, you can try upgrading `Vite` version to `4.5.x` or above.

:::

::: code-group

```bash [npm]
npm i @uni-helper/vite-plugin-uni-components -D
```

```bash [yarn]
yarn add @uni-helper/vite-plugin-uni-components -D
```

```bash [pnpm]
pnpm add @uni-helper/vite-plugin-uni-components -D
```

:::

::: code-group

```ts [wot-ui-resolver.ts]
import type { ComponentResolver } from '@uni-helper/vite-plugin-uni-components'

import { kebabCase } from '@uni-helper/vite-plugin-uni-components'

export function WotResolver(): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (name.match(/^Wd[A-Z]/)) {
        const compName = kebabCase(name)
        return {
          name,
          from: `@wot-ui/ui/components/${compName}/${compName}.vue`,
        }
      }
    },
  }
}

```

```ts [vite.config.ts]
// vite.config.ts
import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";

import Components from '@uni-helper/vite-plugin-uni-components'
import { WotResolver } from '@/resolvers/wot-ui-resolver'


export default defineConfig({
  plugins: [
    // make sure put it before `Uni()`
    Components({
    resolvers: [WotResolver()]
  }), uni()],
});
```
:::

If you use `pnpm`, please create a `.npmrc` file in the root directory, see [Issue](https://github.com/antfu/unplugin-vue-components/issues/389).

```text
// .npmrc
public-hoist-pattern[]=@vue*
// or
// shamefully-hoist = true
```

#### Configure easycom Auto-import <el-tag type="primary" style="vertical-align: middle;margin-left:8px;" effect="dark" >Option 2</el-tag>

Traditional vue components require three steps: install, reference, and register before they can be used. `easycom` streamlines this to one step.
As long as the component path conforms to the specification (see [easycom](https://uniapp.dcloud.net.cn/collocation/pages.html#easycom)), you can use components directly in pages without referencing or registering.

:::tip Reminder

- uni-app considers compilation speed, directly modifying `easycom` in `pages.json` will not trigger recompilation, you need to modify page content to trigger.
- Please ensure there is only one `easycom` field in your `pages.json`, otherwise please merge multiple import rules yourself.

:::

```JSON
// pages.json
{
 "easycom": {
  "autoscan": true,
  "custom": {
    "^wd-(.*)": "@wot-ui/ui/components/wd-$1/wd-$1.vue"
  }
 },
 
 // This is existing content
 "pages": [
  // ......
 ]
}
```
## Volar Support

If you use `Volar`, please specify global component types through `compilerOptions.type` in `tsconfig.json`.

:::tip
CLI projects using `uni_modules` installation do not need configuration, support for `Volar` is automatically effective. `HbuildX` projects do not support this configuration, so this step is only required when using `npm` installation in `cli` projects.
:::

```json
// tsconfig.json
{
  "compilerOptions": {
    "types": ["@wot-ui/ui/global"]
  }
}
```

## Usage

After `Wot UI` installation and configuration are complete, it supports automatic component import, so you can use it directly in SFC without importing in the page or declaring in components, and it can be used on any page. It is worth noting that the `uni-app` platform does not support global mounting of components, so `Message`, `Toast` and other components still need to be explicitly used in SFC, for example:

``` html
<wd-toast></wd-toast>
```

## Scaffolding

We provide a quick start project [wot-starter](https://github.com/wot-ui/wot-starter), which integrates `Wot UI` and many excellent plugins, you can clone this project directly.

You can also use [create-uni](https://github.com/uni-helper/create-uni) to quickly create a starter project through the following command:

```bash
pnpm create uni@latest -t wot-starter <your-project-name>
```

For more scaffolding and templates, please see [Scaffolding and Templates](./templates.html).
