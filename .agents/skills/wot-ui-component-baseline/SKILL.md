---
name: wot-ui-component-baseline
description: wot-ui 组件开发公共基线。涉及组件目录结构、命名、源码为准、最小修改、验证收口或需要为组件创建、Demo、文档迁移提供统一约束时调用。
---

# wot-ui 组件公共基线

本 Skill 提供 wot-ui 组件相关任务的共享规则，供“创建组件”“创建 Demo”“文档一致性核对”“文档迁移”等 Skill 复用。

## 何时使用

- 用户要求遵循 wot-ui 既有组件结构与命名。
- 任务同时涉及组件源码、Demo 页、文档中的两个及以上区域。
- 需要统一判断“以什么为准”“改动范围到哪里为止”“最终如何验收”。

## 公共规则

### 1. 目录与文件约定

- 组件源码目录：`src/uni_modules/wot-ui/components/wd-<component>/`
- 组件主文件：`wd-<component>.vue`
- 类型文件：`types.ts`
- 样式文件：`index.scss`
- 全局类型声明：`src/uni_modules/wot-ui/global.d.ts`
- Demo 页面：`src/subPages/<component>/Index.vue`
- 中文文档：`docs/component/<component>.md`

### 2. 命名约定

- 组件目录与文件使用 `kebab-case`。
- 组件名使用 `wd-<component>`，Vue 全局组件名使用 `Wd<Component>`。
- 变量、函数使用 `camelCase`。
- 类型、接口、组件实例类型使用 `PascalCase`。

### 3. 事实来源

- 涉及 API 对齐时，以组件源码为事实来源。
- 涉及 Demo 整理时，以现有 Demo 页和组件真实能力为事实来源。
- 无源码或现有能力依据的内容不得主观补充为正式能力。

### 4. 改动原则

- 优先最小修改，避免无关重排。
- 先保证真实、可验证，再考虑结构统一。
- 如果任务只要求核对，不额外做迁移或重构。
- 如果任务是迁移，不重复发明新的展示规则，优先复用现有基线。

### 5. 验证收口

- 至少对当前修改文件做一次诊断或类型校验。
- 如果任务包含文档迁移或 Demo 重构，需确认无新增语法错误。
- 如果任务包含组件源码改动，需补充必要注册点或类型声明检查。

## 适用边界

- 本 Skill 不直接替代具体工作流。
- 创建新组件时，配合 `create-component`。
- 创建或重构 Demo 时，配合 `create-demo-page`。
- 做纯 API 一致性核查时，配合 `check-doc-component-consistency`。
- 做 Markdown 新规范迁移时，配合 `migrate-component-doc`。