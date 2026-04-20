# @wot-ui/vitepress-theme

这是一个为 [Wot UI](https://github.com/wot-ui/wot-ui) 文档量身定制的 VitePress 共享主题包。
该主题包内聚了 VitePress 运行时配置、自定义 Vue 组件、Markdown 增强插件以及常用的业务配置（如顶部通栏、广告、赞助商等），通过配置工厂的形式暴露，支持通过选项灵活开启、关闭或定制各模块能力，使得组织内其他项目能够快速复用一致的文档风格。

## 安装

由于本包主要供组织内文档站点使用，推荐通过工作区 (workspace) 的方式引入：

```bash
pnpm add @wot-ui/vitepress-theme -D
```

## 使用方式

### 1. 配置 VitePress (`config.mts`)

在 `.vitepress/config.mts` 中，使用 `createWotVitePressConfig` 来包装你的 VitePress 配置。该工厂函数将自动注入主题所需的别名、SSR 处理和必要的 Vite/Markdown 插件。

```typescript
import { createWotVitePressConfig } from '@wot-ui/vitepress-theme/config'
import { fileURLToPath, URL } from 'node:url'

export default createWotVitePressConfig({
  title: 'My Project',
  description: '项目描述',
  markdown: {
    // 组件源码与 Demo 的链接追加
    componentLinks: {
      repoUrl: 'https://github.com/my-org/my-repo/tree/master',
      demoSourceRoot: 'src/subPages',
      componentSourceRoot: 'src/components',
    },
    // SCSS 变量解析插件配置
    scssVars: {
      componentScssRoot: fileURLToPath(new URL('../../src/components', import.meta.url)),
      componentMap: {
        // 自定义你的组件别名映射
        table: ['my-table', 'my-table-column']
      }
    },
    versionBadge: true, // 开启 `^(x.y.z)` 转换为 Badge 标签
    virtualVersionData: {
      docsRoot: fileURLToPath(new URL('../', import.meta.url))
    }
  },
  features: {
    // 是否开启大语言模型文档生成插件
    llms: {
      ignoreFiles: ['reward/*'],
      domain: 'https://my-docs-domain.com'
    },
    compression: {} // 是否开启产物压缩
  },
  // 你原有的 VitePress 配置...
  themeConfig: {
    logo: '/logo.svg',
    // nav, sidebar, locales ...
  }
})
```

### 2. 主题运行时入口 (`theme/index.ts`)

在 `.vitepress/theme/index.ts` 中，使用 `createWotVitePressTheme` 创建并导出默认主题。可以在这里传入 UI 层面的业务数据（广告、赞助商、案例等）URL 列表。

```typescript
import { createWotVitePressTheme } from '@wot-ui/vitepress-theme'

export default createWotVitePressTheme({
  // 开启百度统计路由监听
  analytics: {
    trackBaiduRoute: true
  },
  // 移动端模拟器（右侧手机Iframe）配置
  demoIframe: {
    assetBase: '/wxqrcode' // 静态二维码图片前缀
  },
  // 以下是各业务组件的数据源配置
  // 不传或传 false 则代表关闭该模块
  banner: {
    urls: ['https://api.example.com/banner.json']
  },
  sponsors: {
    urls: ['https://api.example.com/sponsors.json']
  },
  ads: {
    wwadsId: '372', // 万维广告 ID
    urls: ['https://api.example.com/ads.json']
  },
  team: {
    urls: ['https://api.example.com/team.json']
  },
  friendly: {
    urls: ['https://api.example.com/friendly.json']
  },
  cases: {
    urls: ['https://api.example.com/cases.json']
  }
})
```

### 3. 在 Markdown 中使用业务组件数据

我们提供了一系列配套的 Vue Composables 供你在特定的 Markdown 页面（如赞助页、案例页）中渲染数据。直接从包名引入即可：

```vue
<script setup>
import { useCaseData, useSponsor, useTeam, useFriendly } from '@wot-ui/vitepress-theme'

const { data: cases } = useCaseData()
const { data: sponsors } = useSponsor()
</script>

<div v-for="item in cases" :key="item.name">
  {{ item.name }}
</div>
```

## 配置项说明

### Markdown 增强插件 (`markdown`)
- `componentLinks`: 是否在组件文档末尾追加 `源代码 | 文档 | 组件` 的 GitHub 外部链接。传入 `false` 可关闭。
- `scssVars`: 是否在组件文档的 `## 主题定制` 下方自动解析并渲染 SCSS 变量表。传入 `false` 可关闭。
- `versionBadge`: 是否将 `^(1.2.3)` 文本自动转换为深色 `<Badge>` 标签。
- `virtualVersionData`: 从文档中扫描版本变更，提供虚拟模块供组件侧边栏显示 `New` 或 `Update` 徽标。

### 基础设施特性 (`features`)
- `llms`: 通过 `@vitepress-plugin-llms` 生成用于大语言模型的文本产物（`llms.txt`）。
- `compression`: 通过 `vite-plugin-compression` 生成 gzip 压缩文件。

### 主题 UI 特性 (传给 `createWotVitePressTheme`)
所有选项均遵循 `false | Options` 的形式。如果不传入或传入 `false`，相关 UI 模块将会自动隐藏。

- `analytics.trackBaiduRoute`: 开启后，在路由变化时调用 `_hmt.push(['_trackPageview'])`。
- `demoIframe`: 配置右侧手机模拟器相关选项。
- `banner` / `sponsors` / `ads` / `team` / `friendly` / `cases`: 提供给对应功能模块的请求地址数组（支持多线路重试）。

## 构建要求

如果你需要修改本包的源码，请确保在根目录执行依赖安装。
开发模式下，VitePress 站点直接引用本包的编译后产物（通过 `pnpm build` 或根目录统筹的 `pnpm dev:docs` 触发 `esbuild` 实时输出到 `dist`）。

```bash
pnpm --filter @wot-ui/vitepress-theme build
```

## 发版与发布规范

`@wot-ui/vitepress-theme` 作为 Wot Design Uni 项目的官方周边共享包，它的版本号与主仓库 `wot-ui` 强绑定。

1. **版本同步**：当你在根目录执行 `pnpm release-tag` 时，发版脚本会自动将最新的版本号同步写入 `packages/vitepress-theme/package.json`。
2. **自动化构建发布**：我们已经在主仓库的 `.github/workflows/release.yml` 中集成了此主题包的自动构建与 npm 发布流。只要带有 `v*` 的 Tag 被推送到主分支，GitHub Action 会在发布 `wot-ui` 的同时，自动进入 `packages/vitepress-theme` 执行 `npm publish` 将最新版本的主题包发布至 npm 官方镜像。
