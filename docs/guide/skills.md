---
version: New
---

# Skills

Skills 是 AI 的“超能力模板”，是一套完整的、可复用的、能解决特定问题的方案，本章节将会为你介绍专为 AI Agent（如 Trae, Cursor, Cline 等）设计的技能指令（Skills）。这些技能通过提供系统化的 Prompt 指令、上下文约束和最佳实践，帮助 AI 更加准确、高效地处理 `wot-ui` 和 `@wot-ui/cli` 相关的开发任务。

## 🎯 内置技能

当前仓库提供以下 AI 技能，可供 AI 智能体根据任务需求加载：

| Skill | 描述 | 适用场景 | 入口 |
| --- | --- | --- | --- |
| `wot-ui-v2` | 处理 wot-ui v2 组件库日常开发的核心技能。 | 组件选型、API 查询、生成 Vue3 + uni-app 页面代码、排查常见组件坑位（如 Toast, Dialog 挂载等）。 | [skills/wot-ui-v2/SKILL.md](https://github.com/wot-ui/open-wot/tree/main/skills/wot-ui-v2/SKILL.md) |
| `wot-ui-cli` | 专门用于回答、使用和调试 `@wot-ui/cli` 工具本身的技能。 | 查询 CLI 命令用法（list, info, doc 等）、配置 MCP Server、本地调试 CLI 源码、执行离线数据提取。 | [skills/wot-ui-cli/SKILL.md](https://github.com/wot-ui/open-wot/tree/main/skills/wot-ui-cli/SKILL.md) |
| `wot-ui-unocss-preset-guide` | 指导安装、配置并使用 `@wot-ui/unocss-preset`。 | 预设接入、`unocss.config.ts` 配置（如 `presetWot`）、`prefix/preflight/baseTokens` 使用示例、类名不生效/自动补全不出现等问题排查。 | [skills/wot-ui-unocss-preset-guide/SKILL.md](https://github.com/wot-ui/open-wot/tree/main/skills/wot-ui-unocss-preset-guide/SKILL.md) |
| `create-wot-ui-theme` | 生成 wot-ui 单文件主题 SCSS 的专项技能。 | 需要为 wot-ui 定制品牌主题，且要求遵循“单文件包含 mixin 和挂载选择器、App.vue 仅作 `@use` 引入”的约束时使用。 | [skills/create-wot-ui-theme/SKILL.md](https://github.com/wot-ui/open-wot/tree/main/skills/create-wot-ui-theme/SKILL.md) |

## 安装

推荐使用脚本安装 Skills，可以根据实际需求选择安装项：

```sh
pnpx skills add wot-ui/open-wot
# or
npx skills add wot-ui/open-wot
```

## 延伸阅读

- [llms.txt](/guide/llms-txt)
- [Agent Skills、Rules、Prompt、MCP，一文把它们理清楚了](https://juejin.cn/post/7599268297201958950)
