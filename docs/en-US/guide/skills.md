---
version: New
---

# Skills

Skills are “superpower templates” for AI: a complete, reusable set of instructions designed for specific tasks. This chapter introduces Skills built for AI Agents (such as Trae, Cursor, Cline, etc.). By providing structured prompts, context constraints, and best practices, these Skills help AI handle `wot-ui` and `@wot-ui/cli` tasks more accurately and efficiently.

## 🎯 Built-in Skills

This repository provides the following Skills, which can be loaded by an AI agent as needed:

| Skill | Description | Use Cases | Entry |
| --- | --- | --- | --- |
| `wot-ui-v2` | Core skill for daily development with the wot-ui v2 component library. | Component selection, API lookups, generating Vue 3 + uni-app page code, troubleshooting common pitfalls (e.g. Toast/Dialog mounting). | [skills/wot-ui-v2/SKILL.md](https://github.com/wot-ui/open-wot/tree/main/skills/wot-ui-v2/SKILL.md) |
| `wot-ui-cli` | Skill dedicated to answering, using, and debugging the `@wot-ui/cli` tool itself. | CLI command usage (list, info, doc, etc.), configuring MCP Server, local debugging of CLI source, running offline metadata extraction. | [skills/wot-ui-cli/SKILL.md](https://github.com/wot-ui/open-wot/tree/main/skills/wot-ui-cli/SKILL.md) |
| `wot-ui-unocss-preset-guide` | Guides installation, configuration, and usage of `@wot-ui/unocss-preset`. | Preset integration, `unocss.config.ts` setup (e.g. `presetWot`), examples for `prefix/preflight/baseTokens`, troubleshooting issues like missing styles or no IntelliSense. | [skills/wot-ui-unocss-preset-guide/SKILL.md](https://github.com/wot-ui/open-wot/tree/main/skills/wot-ui-unocss-preset-guide/SKILL.md) |
| `create-wot-ui-theme` | Specialized skill for generating a single-file wot-ui theme SCSS. | Creating a brand theme for wot-ui while following the constraint: “single file includes mixins and mount selector; App.vue only uses `@use` to import”. | [skills/create-wot-ui-theme/SKILL.md](https://github.com/wot-ui/open-wot/tree/main/skills/create-wot-ui-theme/SKILL.md) |

## Installation

We recommend installing Skills via a script. Choose the items you need:

```sh
pnpx skills add wot-ui/open-wot
# or
npx skills add wot-ui/open-wot
```

## Further Reading

- [llms.txt](./llms-txt)
- [Agent Skills, Rules, Prompts, MCP: A Clear Guide](https://juejin.cn/post/7599268297201958950)
