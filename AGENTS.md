# Wot UI — AI 协作总控指南

Wot UI 是一个面向 uni-app 的多端组件库（微信小程序、支付宝小程序、H5、App 等），提供 80+ 高质量组件。本文件为项目内所有 AI 代理工作流的总入口，优先语言为中文。

## 快速导航

| 你的任务 | 推荐方案 |
|---------|--------|
| 创建新组件骨架 | Skill `create-component` + `wot-ui-component-baseline` |
| 创建 / 重构演示页 | Skill `create-demo-page` + `wot-ui-component-baseline` |
| 核对文档与源码 API 是否一致 | Skill `check-doc-component-consistency` |
| 迁移文档到新规范 | Agent **Demo Doc Migrator** 或 Skill `migrate-component-doc` |
| Demo 与文档同步迁移 | Agent **Demo Doc Migrator** |
| 创建 / 补齐 / 审查测试 | Agent **Component Test Guardian** 或 Skill `create-test` |
| 页面样式巡检与修复 | Agent **Page Style Optimizer** 或 Skill `optimize-page-styles` |
| 生成 SCSS 设计令牌变量 | Skill `generate-scss-variables` 或 Prompt `plan-scssVariableNaming` |
| 规范源码注释与命名 | Skill `vue-comment` |
| 创建 VitePress 主题 | Prompt `create-vitepress-theme` |

如果你不确定用哪个方案，先读取 `.agents/skills/wot-ui-component-baseline/SKILL.md`——它是所有组件任务的公共基线。

## 核心约束

以下五条是跨任务的硬规则，任何改动都不允许违反：

1. **目录结构不可乱**
   - 组件源码：`src/uni_modules/wot-ui/components/wd-<name>/`（含 `wd-<name>.vue`、`types.ts`、`index.scss`）
   - Demo 页：`src/subPages/<name>/Index.vue`
   - 文档：`docs/component/<name>.md`
   - 测试：`tests/components/<name>.test.ts`

2. **命名规范不可混**
   - 文件与目录：`kebab-case`
   - 全局组件名：`Wd<Name>`（PascalCase）
   - 变量与函数：`camelCase`
   - 类型与接口：`PascalCase`

3. **源码为唯一事实来源**
   - 所有 API（props / emits / slots / methods）以组件源码为准
   - Demo 可辅证，但不可超出源码能力
   - 不可主观臆造新能力写入文档

4. **最小必要改动**
   - 核对一致性 ≠ 顺便迁移；迁移文档 ≠ 顺便重构
   - 每个任务只做用户要求范围内的改动
   - 发现范围外问题，先标注，再询问是否处理

5. **改后必须验证**
   - 源码改动：运行 `pnpm type-check` 或检查类型声明
   - 样式/模板改动：运行 `pnpm lint`
   - 测试改动：运行 `pnpm test:h5` 确认目标组件测试通过
   - 覆盖率检查：`pnpm coverage:h5`（目标 80%+，关键组件 90%+）

## Skills 速查

所有 Skill 文件位于 `.agents/skills/`，需用 AI 工具读取才生效。

| Skill | 路径 | 职责 | 触发词 |
|-------|------|------|--------|
| `wot-ui-component-baseline` | `.agents/skills/wot-ui-component-baseline/SKILL.md` | 公共约束基线，所有组件任务的前置 | 遵循基线、组件结构规范 |
| `create-component` | `.agents/skills/create-component/SKILL.md` | 新建组件骨架、注册类型 | 创建组件、新建组件、组件骨架 |
| `create-demo-page` | `.agents/skills/create-demo-page/SKILL.md` | 演示页分组与条目组织 | 创建演示页、Demo 重构 |
| `check-doc-component-consistency` | `.agents/skills/check-doc-component-consistency/SKILL.md` | API 一致性核对，仅最小修正 | 核对文档、API 一致性 |
| `migrate-component-doc` | `.agents/skills/migrate-component-doc/SKILL.md` | 迁移 Markdown 文档至新规范 | 迁移文档、文档迁移 |
| `create-test` | `.agents/skills/create-test/SKILL.md` | 组件单元测试创建标准流程 | 创建测试、补测试 |
| `generate-scss-variables` | `.agents/skills/generate-scss-variables/SKILL.md` | 生成 SCSS 设计令牌，三层架构规范 | 生成 SCSS 变量、设计令牌 |
| `optimize-page-styles` | `.agents/skills/optimize-page-styles/SKILL.md` | 页面样式规范化，语义变量替换 + BEM | 优化页面样式、语义变量替换 |
| `vue-comment` | `.agents/skills/vue-comment/SKILL.md` | 规范源码注释与命名 | 规范注释、补充注释 |

**组合说明**
- 创建新组件完整流程：`wot-ui-component-baseline` → `create-component` → `vue-comment`
- Demo + 文档同步：`create-demo-page` + `migrate-component-doc`（或直接用 **Demo Doc Migrator** 代理）
- 文档迁移时可选并行：先检查 API（`check-doc-component-consistency`），再整体迁移（`migrate-component-doc`）

## Custom Agents 速查

Agents 文件位于 `.github/agents/`，比单独 Skill 具备更强的多步骤串联能力。

| 代理 | 适用场景 | 触发词 |
|------|---------|--------|
| **Demo Doc Migrator** | Demo 演示页 + 文档联动迁移，含 API 对齐与示例顺序重排 | 迁移组件 demo、重构演示页、迁移组件文档、对齐源码 API |
| **Component Test Guardian** | 新增测试、修复错误断言、完整性审查（≥80% 覆盖目标） | 创建测试用例、补测试、测试完整性审查、回顾历史测试 |
| **Page Style Optimizer** | 按文件顺序批量修复 `src/pages` 与 `src/subPages` 页面样式 | 检查页面样式、修 pages 样式、修 subPages 样式、语义变量替换 |

**何时用代理而非单一 Skill？**
- 任务横跨多个文件且需要串联步骤时
- 需要进度追踪（代理逐文件汇报）时
- 任务范围超过 1 个 Skill 的职责边界时

## Prompts 速查

Prompts 文件位于 `.github/prompts/`，可在 VS Code 聊天中以 `/` 触发。

| Prompt | 文件 | 用途 | 输入示例 |
|--------|------|------|--------|
| `plan-scssVariableNaming` | `.github/prompts/plan-scssVariableNaming.prompt.md` | 规划 SCSS 变量三层命名结构 | 组件名 + 属性列表 |
| `create-vitepress-theme` | `.github/prompts/create-vitepress-theme.prompt.md` | 生成 VitePress 主题方案 | 目标风格 + 改造范围 + 覆盖策略 |

## 常见任务配方

### 从零新建一个组件

```
1. 读取 .agents/skills/wot-ui-component-baseline/SKILL.md
2. 读取 .agents/skills/create-component/SKILL.md
3. 创建 src/uni_modules/wot-ui/components/wd-<name>/ 目录结构
4. 注册全局类型到 src/uni_modules/wot-ui/global.d.ts
5. 读取 .agents/skills/vue-comment/SKILL.md，补齐 Props 注释
6. 运行 pnpm type-check 确认无类型错误
```

### 迁移一个组件的 Demo + 文档

```
1. 用 Demo Doc Migrator 代理（触发词："迁移 <组件名> 的 demo 页和文档"）
   或手动：读取 create-demo-page/SKILL.md + migrate-component-doc/SKILL.md
2. 核对 Demo 分组顺序（组件类型 → 状态 → 变体 → 样式 → 特殊样式）
3. 核对文档 API 表格（参数 | 说明 | 类型 | 默认值，含 ^(x.y.z) 版本标记）
4. 运行 pnpm lint 确认无语法错误
```

### 为组件补测试或审查历史测试

```
1. 用 Component Test Guardian 代理（触发词："为 <组件名> 创建完整测试"）
   或手动：读取 .agents/skills/create-test/SKILL.md
2. 从源码抽取真实 API，对照 tests/components/<name>.test.ts 找缺口
3. 补齐高优先级场景：默认值、状态切换、事件触发、禁用态
4. 运行 pnpm test:h5 -- --reporter=verbose 验证目标组件通过
```

### 批量修复页面样式

```
1. 用 Page Style Optimizer 代理（触发词："按顺序优化 pages 和 subPages 的样式"）
   或手动：读取 .agents/skills/optimize-page-styles/SKILL.md
2. 按 src/pages → src/subPages 路径顺序逐页处理
3. 硬编码颜色/字号/间距 → 语义 SCSS 变量；class 名 → BEM 规范
4. <style lang="scss"> 中可直接用全局注入的 variable.scss 变量，无需额外引入
5. 运行 pnpm lint 检查改后文件
```

## 非目标与边界

以下是明确 **不做** 的事情，发现相关请求时应先拆分任务：

- 不在核对一致性时同步迁移文档结构
- 不在创建组件时顺带重构已有组件
- 不在修复样式时改动页面业务逻辑
- 不臆造组件能力（所有能力必须可追溯到源码）
- 不修改与当前任务无关的文件
- 不删除分支、强制推送、修改共享基础设施（需用户显式确认）

## 构建与测试命令参考

```bash
# 开发预览
pnpm dev:h5              # H5 预览
pnpm dev:mp-weixin       # 微信小程序预览

# 代码质量
pnpm lint                # ESLint 自动修复
pnpm type-check          # TypeScript 类型检查

# 测试
pnpm test:h5             # H5 平台单元测试
pnpm coverage:h5         # H5 平台覆盖率报告

# 文档
pnpm dev:docs            # 启动文档本地预览

# 构建
pnpm build:h5            # H5 构建
pnpm build:lib           # 组件库构建

# 提交（遵循 Commitizen 规范）
pnpm commit
```

## 详细参考文档

- 组件开发公共基线：[`.agents/skills/wot-ui-component-baseline/SKILL.md`](.agents/skills/wot-ui-component-baseline/SKILL.md)
- 贡献流程（分支、提交、PR 规范）：[`.github/CONTRIBUTING.md`](.github/CONTRIBUTING.md)
- 测试策略与最佳实践：[`.github/TESTING.md`](.github/TESTING.md)
- 项目文档网站：https://wot-ui.cn
