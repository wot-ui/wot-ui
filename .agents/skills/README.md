# wot-ui Skills

本目录用于存放 wot-ui 项目的专用 Skills。

这些 Skills 的目标不是替代通用编码能力，而是把组件开发、文档维护、Demo 组织、测试补齐、样式变量和主题生成等高频任务沉淀为稳定工作流，降低重复指令成本，并减少不同任务之间的职责混淆。

## 设计目标

- 单一职责：每个 Skill 只负责一类工作流。
- 可组合：多个 Skill 可以围绕同一组件任务组合使用。
- 可维护：共享规则尽量上收，避免在多个 Skill 中重复维护。
- 可发现：通过清晰 description 让 Agent 能正确命中对应 Skill。

## Skill 总览

| Skill | 主要职责 | 不负责 |
|------|------|------|
| `wot-ui-component-baseline` | 提供组件相关任务的公共基线：目录结构、命名、事实来源、最小修改、验证收口 | 不直接替代具体工作流 |
| `create-component` | 创建新组件骨架、基础文件和必要注册点 | Demo、测试、文档迁移 |
| `create-demo-page` | 创建或重构 `src/subPages/<component>/Index.vue` 演示页 | 文档表结构迁移、纯 API 审计 |
| `check-doc-component-consistency` | 核对组件文档与源码 API 是否一致，并做最小修正 | 文档结构迁移、Demo 重排、新规范升级 |
| `migrate-component-doc` | 将组件 Markdown 文档迁移到新规范，包括表结构、Demo 章节顺序、版本标记 | 仅做一致性核查 |
| `vue-comment` | 统一组件源码中的命名与注释规范 | 组件骨架创建、Demo、文档迁移 |
| `create-test` | 为组件补充或创建单元测试 | 组件源码骨架、文档迁移 |
| `generate-scss-variables` | 生成或审计组件级 SCSS 变量定义 | 旧设计系统迁移、主题生成 |
| `generate-theme` | 生成单文件主题 SCSS，并在 App.vue 中挂载 | 组件级变量命名审计 |

## 推荐使用方式

### 1. 新建组件

优先组合：

- `wot-ui-component-baseline`
- `create-component`
- 按需追加 `vue-comment`
- 按需追加 `create-demo-page`
- 按需追加 `create-test`

### 2. 只检查文档是否写对

优先组合：

- `wot-ui-component-baseline`
- `check-doc-component-consistency`

适用场景：

- props、events、slots、methods 是否与源码一致
- 默认值、命名、可选值是否准确
- 仅做最小修正，不改文档结构

### 3. 迁移旧文档到新规范

优先组合：

- `wot-ui-component-baseline`
- `migrate-component-doc`

适用场景：

- 调整 Demo 章节顺序
- 合并 Attributes 或 Options 表列
- 迁移最低版本标记
- 对齐新文档结构

### 4. 重构组件 Demo

优先组合：

- `wot-ui-component-baseline`
- `create-demo-page`

适用场景：

- 统一 demo-group 与 demo-group-item 结构
- 调整展示顺序
- 把重复示例改为数据驱动

### 5. 调整源码注释或命名

优先组合：

- `wot-ui-component-baseline`
- `vue-comment`

适用场景：

- Props 注释不规范
- 类型说明缺失
- 函数和变量命名不统一

## 当前职责边界

为避免 Skill 相互覆盖，当前按以下规则区分：

- 只核对文档准确性，不做结构迁移：使用 `check-doc-component-consistency`
- 明确要求迁移文档结构或整理 Demo 章节：使用 `migrate-component-doc`
- 只改 Demo 页：使用 `create-demo-page`
- 只改源码注释和命名：使用 `vue-comment`
- 只建组件骨架：使用 `create-component`

## 维护约定

维护本目录中的 Skill 时，建议遵循以下规则：

1. 共享规则优先上收至 `wot-ui-component-baseline`，不要在多个 Skill 中重复维护。
2. 每个 Skill 的 description 必须写清楚触发场景和排除场景，避免命中冲突。
3. 当两个 Skill 出现职责交叉时，优先收紧 description，而不是继续堆叠正文说明。
4. 示例触发语句要与 description 一致，不能把别的 Skill 的场景写回来。
5. 新增 Skill 前，先确认是否只是现有 Skill 的子场景；若是，优先补充现有 Skill 或公共基线。

## 建议阅读顺序

如果是首次维护本目录，建议按以下顺序阅读：

1. `wot-ui-component-baseline`
2. `create-component`
3. `create-demo-page`
4. `check-doc-component-consistency`
5. `migrate-component-doc`
6. 其余辅助 Skill