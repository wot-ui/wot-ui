# `@wot-ui/vitepress-theme` 拆包开发计划

## Summary

* 目标：将 `docs` 当前使用的 VitePress 自定义主题、主题相关组件、共享 composables、Vite 插件与默认 VitePress 覆盖逻辑抽离为工作区包 `@wot-ui/vitepress-theme`，供 `wot-ui` 组织内项目复用。

* 核心约束：

  * 不调整现有视觉样式与页面表现，只做代码结构重组。

  * 站点侧尽量“薄”，但本次已确认采用“可配置工厂”模式，而不是完全零配置或完全细粒度拼装。

  * `nav`、`sidebar`、`component-catalog` 一类与具体文档信息架构强绑定的数据继续由站点注入，不内置进主题包。

  * 尽可能将共享逻辑与 Vite/VitePress 插件收敛到 `@wot-ui/vitepress-theme`，减少外部项目对内部实现的感知。

* 设计原则：

  * 根包默认导出 Theme 对象，满足 VitePress 外部主题分发约定。

  * 通过 `@wot-ui/vitepress-theme/config` 暴露配置工厂，统一封装别名、SSR、插件链与可选主题能力。

  * 官方 `docs` 站点改为消费工作区包，验证拆包后行为与现状一致。

## Current State Analysis

### 当前入口与耦合点

* `docs/.vitepress/theme/index.ts`

  * 当前直接扩展 `vitepress/theme`，注册 `SvgImage`、`ExternalLink`、`VPBadge`、`ElementPlus`。

  * 同时在 `enhanceApp` 中接入百度统计的路由监听。

  * 这是主题运行时入口，适合迁移到包的默认导出。

* `docs/.vitepress/theme/Layout.vue`

  * 当前通过默认主题插槽注入 `Banner`、`SpecialSponsor`、`HomeFriendly`、`HomeTeam`、`NavBarTitleAfter`、`WwAds`、`CustomFooter`。

  * 该布局与组件集合决定了现有外观，需要整体迁移或封装，确保视觉不变。

* `docs/.vitepress/config.mts`

  * 当前集中承载三类内容：

    1. 站点元信息：`title`、`description`、`head`、`search`、`socialLinks`、`footer`
    2. 站点文档结构：`locales`、`nav`、`sidebar`
    3. 主题基础设施：Vite 插件、`ssr.noExternal`、`VP*` 组件 alias 覆盖

  * 其中第 3 类应进入主题包，第 1、2 类保留在站点或通过工厂参数注入。

### 已识别的共享资产

* 主题组件与样式目录：`docs/.vitepress/theme/*`

  * 包含 `Layout.vue`、`styles/custom.css`、`styles/vars.css`

  * 包含一组 VP 内部组件覆盖：`VPContent.vue`、`VPDoc.vue`、`VPLocalNav.vue`、`VPNavBar.vue`、`VPSidebar.vue`、`VPSidebarItem.vue`

  * 包含站点展示组件与对应 composables：`Banner.vue`、`SpecialSponsor.vue`、`HomeFriendly.vue`、`HomeTeam.vue`、`SidebarAds.vue`、`WwAds.vue` 等，及 `composables/*`

* 主题相关 Vite 插件：`docs/.vitepress/plugins/*`

  * `markdown-transform.ts`

  * `markdown-version-badge-transform.ts`

  * `markdown-scss-variables-transform.ts`

  * `version-badge.ts`

* 主题本地化辅助：`docs/.vitepress/locales/markdown-transform.ts`

### 当前与站点强耦合但不适合直接内置的数据

* `docs/.vitepress/locales/zh-CN.ts`

* `docs/.vitepress/locales/en-US.ts`

* `src/config/component-catalog.ts`

这些文件描述的是 `wot-ui` 官方文档结构、导航分组、组件目录与文案，不属于主题基础能力。它们应继续留在站点侧，通过配置工厂传入最终的 `themeConfig` 或 locale 配置。

### 需要特别处理的边界

* `docs/.vitepress/theme/index.ts` 中的百度统计属于站点业务能力，不宜硬编码为所有消费者默认行为。

* `docs/.vitepress/config.mts` 中的 `vitepress-plugin-llms`、压缩插件、Algolia 搜索、`head` 脚本等存在“共享实现 + 站点参数”混合特征。

* `docs/.vitepress/plugins/markdown-transform.ts` 与 `markdown-scss-variables-transform.ts` 当前通过仓库固定路径读取 `src/` 与 `docs/`，拆包后必须改为基于参数或根目录解析，避免包内写死 `wot-ui` 路径。

* `docs/.vitepress/theme/components/VPIframe.vue` 依赖 `/wxqrcode/...` 静态资源路径；样式不变的前提下，需要保留该资源约定，或通过配置暴露静态资源前缀。

## Proposed Changes

### 1. 建立工作区包骨架

新增工作区包目录，建议路径：

* `packages/vitepress-theme/package.json`

* `packages/vitepress-theme/tsconfig.json`

* `packages/vitepress-theme/src/index.ts`

* `packages/vitepress-theme/src/config.ts`

* `packages/vitepress-theme/src/types.ts`

* `packages/vitepress-theme/src/theme/*`

* `packages/vitepress-theme/src/plugins/*`

* `packages/vitepress-theme/src/locales/markdown-transform.ts`

实施要点：

* 将根工作区从仅包含 `docs` 调整为包含 `packages/*`，使本仓库内可以直接联调并为后续发布做准备。

* 根包 `package.json` 新增必要脚本，用于构建/检查 `@wot-ui/vitepress-theme`。

* `packages/vitepress-theme/package.json` 设计导出面：

  * 根导出：默认导出 Theme 对象。

  * 子路径导出：`./config` 暴露配置工厂。

  * 类型导出：可选暴露 `ThemeConfig`/工厂参数类型，方便组织内项目获得类型提示。

### 2. 迁移主题运行时资源到包内

将以下内容整体迁入 `packages/vitepress-theme/src/theme`：

* `docs/.vitepress/theme/Layout.vue`

* `docs/.vitepress/theme/styles/custom.css`

* `docs/.vitepress/theme/styles/vars.css`

* `docs/.vitepress/theme/components/*`

* `docs/.vitepress/theme/composables/*`

实施要点：

* 保持组件名、插槽结构、CSS 文件内容与导入顺序不变，确保视觉零变化。

* 所有相对路径与资源引用在包内重新对齐。

* VP 内部组件覆盖仍保留在包内，由配置工厂统一生成 alias 映射，站点不再显式写 `resolve.alias`。

* 对站点业务属性进行“配置化而非站点复制”：

  * 百度统计改成可选配置项，如 `analytics.baiduHmId` 或 `routeTracking` 开关。

  * 静态资源前缀如 `/wxqrcode` 改成可选参数，默认沿用当前值，确保官方站点无变化。

### 3. 将 Vite/VitePress 基础设施封装为配置工厂

新增 `packages/vitepress-theme/src/config.ts`，提供统一工厂，例如：

* `createWotVitePressTheme()`

* `createWotVitePressConfig(options)`

推荐职责划分：

* 根导出主题对象：

  * 负责 `extends: DefaultTheme`

  * 负责全局组件注册、`ElementPlus` 注入

  * 负责包内样式加载

  * 负责可选的客户端增强逻辑

* `config` 子路径工厂：

  * 生成 Vite 插件链

  * 注入 `ssr.noExternal: ['element-plus']`

  * 注入 VP 内部组件 alias 覆盖

  * 合并调用方传入的 `head`、`locales`、`themeConfig`、`vite.plugins`

建议工厂入参按“共享默认 + 站点覆盖”设计：

* `site`

  * `title`

  * `description`

  * `head`

* `theme`

  * `socialLinks`

  * `search`

  * `footer`

  * `editLink`

  * `logo`

* `locales`

  * 直接接收现有 `zh-CN` / `en-US` 配置对象

* `markdown`

  * GitHub 仓库地址

  * 组件源码根目录

  * demo 源码根目录

  * SCSS 扫描根目录

* `features`

  * `enableLlms`

  * `llms.domain`

  * `llms.ignoreFiles`

  * `enableCompression`

  * `analytics.baiduHmId`

  * `assetBase`

这样 `docs/.vitepress/config.mts` 最终只负责：

* 调用 `createWotVitePressConfig()`

* 传入站点元信息、搜索配置、locale 与导航/侧边栏数据

* 在必要时补充极少量官方站特有覆盖

### 4. 将现有插件迁入包，并消除仓库路径硬编码

迁移以下文件到 `packages/vitepress-theme/src/plugins`：

* `docs/.vitepress/plugins/markdown-transform.ts`

* `docs/.vitepress/plugins/markdown-version-badge-transform.ts`

* `docs/.vitepress/plugins/markdown-scss-variables-transform.ts`

* `docs/.vitepress/plugins/version-badge.ts`

* `docs/.vitepress/locales/markdown-transform.ts`

插件改造重点：

* `markdown-transform.ts`

  * 当前通过 `src/uni_modules/wot-ui/common/util` 获取 `camelCase`，拆包后应改为包内内聚实现或引入轻量本地 util，避免主题包依赖主仓源码路径。

  * GitHub 地址、demo 目录与源码目录由工厂参数传入。

* `markdown-scss-variables-transform.ts`

  * 当前基于 `id` 中 `/docs/` 反推仓库根目录，再拼接 `src/uni_modules/wot-ui/components/...`

  * 拆包后应改成显式 `workspaceRoot`/`componentScssRoot` 配置，保证包在不同组织项目中仍可用。

* `version-badge.ts`

  * 当前会写回 `docs/.vitepress/config/version-data.ts`

  * 拆包后建议支持可配置输出路径，默认写入当前 VitePress 站点下的缓存/生成文件。

  * 若 VitePress/构建链允许，也可改为虚拟模块生成，减少对站点目录写文件的耦合。

### 5. 重构官方 docs 站点为“消费方”

现有站点需调整的重点文件：

* `pnpm-workspace.yaml`

  * 纳入 `packages/*`

* 根 `package.json`

  * 增加主题包相关脚本与工作区依赖联动

* `docs/package.json`

  * 增加对 `@wot-ui/vitepress-theme` 的工作区依赖

  * 清理迁移后不再由站点直接维护的依赖归属

* `docs/.vitepress/theme/index.ts`

  * 改成从 `@wot-ui/vitepress-theme` 创建或直接导出主题

  * 若工厂支持插槽/站点增强选项，则只做极薄包装

* `docs/.vitepress/config.mts`

  * 改成调用 `@wot-ui/vitepress-theme/config`

  * 删除本地 `resolve.alias`、`ssr.noExternal`、共享插件装配代码

* `docs/.vitepress/plugins/*`

  * 迁移后删除或改成转发层，避免双份实现

建议 `docs` 侧最终形态：

* `docs/.vitepress/theme/index.ts`

  * 仅负责 `export default createWotVitePressTheme({ ...少量站点参数... })`

* `docs/.vitepress/config.mts`

  * 仅负责 `export default createWotVitePressConfig({ ...站点配置... })`

* `docs/.vitepress/locales/zh-CN.ts` / `en-US.ts`

  * 保留为站点文档结构数据源

### 6. 导出 API 设计

结合 VitePress 外部主题分发规范与本次“可配置工厂”决策，建议对外 API 稳定为：

* `@wot-ui/vitepress-theme`

  * 默认导出：可直接用于 `.vitepress/theme/index.ts`

  * 命名导出：`createWotVitePressTheme`

* `@wot-ui/vitepress-theme/config`

  * 命名导出：`createWotVitePressConfig`

* `@wot-ui/vitepress-theme/types`

  * 命名导出：`WotVitePressThemeOptions`、`WotVitePressConfigOptions`

使用方式预期：

* 主题入口：

  * `import Theme from '@wot-ui/vitepress-theme'`

  * 或 `import { createWotVitePressTheme } from '@wot-ui/vitepress-theme'`

* 配置入口：

  * `import { createWotVitePressConfig } from '@wot-ui/vitepress-theme/config'`

该方案与 VitePress 官方“根包默认导出 theme、子路径导出 config”的分发建议一致，也与用户参考的 `sugar-blog` 风格相匹配。

### 7. 迁移顺序

建议按以下顺序实施，降低回归风险：

1. 建包并配置工作区、包导出与基础构建。
2. 先迁移 `theme/index.ts`、`Layout.vue`、样式文件、全局注册逻辑。
3. 再迁移 VP 覆盖组件与 `resolve.alias` 生成逻辑。
4. 再迁移 Markdown/Vite 插件，并将路径与仓库信息参数化。
5. 最后重写 `docs/.vitepress/config.mts` 与 `docs/.vitepress/theme/index.ts` 为消费方形态。
6. 完成联调后，再清理 `docs/.vitepress/plugins/*` 的冗余实现。

## Assumptions & Decisions

* 已确认本次采用工作区包落地，而不是仅写独立 npm 设计稿。

* 已确认对外 API 采用“可配置工厂”，而不是站点自由拼装全部插件。

* 已确认 `nav`、`sidebar`、`component-catalog` 继续由站点提供，不进入主题包默认数据。

* 主题包默认服务于 `wot-ui` 组织内项目，因此允许保留一部分“组织级默认能力”；但所有明显站点业务能力需提供开关或参数，不强绑到每个消费者。

* “不要调整我现在的样式”解释为：

  * 不主动改 `custom.css`、`vars.css` 的视觉结果

  * 不改变 `Layout.vue` 插槽排布

  * 不改变 VP 内部组件覆盖后的交互与布局

* `vitepress-plugin-llms` 与压缩插件默认放入配置工厂，但是否开启、参数为何由调用方决定。

* 如果 `version-badge.ts` 继续采用写文件模式，本次需把生成目标路径显式配置化；若执行中发现 VitePress 对虚拟模块支持更稳妥，可改为虚拟模块方案，但输出行为必须与现状保持一致。

## Verification Steps

### 结构验证

* 确认 `pnpm-workspace.yaml` 已纳入 `packages/*`

* 确认 `docs` 通过工作区依赖消费 `@wot-ui/vitepress-theme`

* 确认主题包存在根导出与 `./config` 子路径导出

### 类型与构建验证

* 运行主题包类型检查，确保 `Theme`、配置工厂与导出类型可解析

* 运行 `docs` 的 VitePress 构建，确保包导入路径、alias、SSR 与插件链均正常

* 重点验证 `element-plus` 在 SSR 构建下不因外部化出错

### 回归验证

* 首页检查：

  * `Banner`

  * 特别赞助位

  * 友链/团队模块

  * 底部页脚

* 文档页检查：

  * 自定义导航栏区域

  * 侧边栏与大纲区域

  * 广告位/二维码位

  * 版本徽标渲染

* Markdown 增强检查：

  * 组件页“源代码/文档/组件”链接追加是否正常

  * `^(x.y.z)` 是否仍能转成 `Badge`

  * SCSS 变量表是否仍自动生成

### 非目标确认

* 不在本次拆包中改动页面风格、颜色、布局、动效设计

* 不在本次拆包中重写站点信息架构或国际化文案

* 不在本次拆包中抽离新的 `docs-data` 独立包，除非执行阶段发现主题包无法在不增加该层的前提下保持 API 简洁

