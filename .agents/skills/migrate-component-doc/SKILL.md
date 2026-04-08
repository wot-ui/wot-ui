---
name: migrate-component-doc
description: 迁移组件 Markdown 文档到新规范。用户明确要求迁移文档结构、重排 Demo 章节、合并 Attributes/Options 列、迁移最低版本标记或升级旧文档格式时调用；不用于仅做一致性核对。
---

# 组件文档迁移技能

本技能用于将组件文档迁移到统一新规范，覆盖 API 对齐、Demo 结构统一、Attributes/Options 表结构迁移与最低版本标记迁移。

默认遵循 `wot-ui-component-baseline` 中的共享约束。

## 何时使用

- 用户要求“迁移某组件文档到新规范”。
- 用户要求“按 Demo 规则整理文档中的示例章节”。
- 用户要求“将最低版本并入参数列、合并说明与可选值列”。

## 何时不要使用

- 用户只要求核对 props、events、slots、methods 是否准确，且未要求改文档结构。

以上场景应优先使用 `check-doc-component-consistency`。

## 目标输出

- 文档 API 与组件实现一致：Attributes / Events(Emits) / Slots / Methods。
- Demo 章节与演示页组织顺序一致，满足 `create-demo-page` 规则。
- Attributes/Options 表结构迁移完成，版本标记迁移到参数列。
- 产出差异清单、修改说明与验证结果。

## 核心规则

### 1) API 一致性核对

- 组件源码核对范围：
  - props：`types.ts`、`defineProps`、默认值
  - emits：`defineEmits` 与模板事件转发
  - slots：模板 `<slot>` 与具名插槽
  - methods：`defineExpose` 暴露方法
- 文档核对范围：
  - `## Attributes`
  - `## Events`
  - `## Slots`
  - `## Methods`（若无对外方法可省略）
- 差异处理原则：
  - 文档缺失：补齐
  - 文档冗余：删除
  - 命名不一致：统一为组件真实 API 命名

### 2) Demo 顺序与分组规范

- Demo 内容来源必须以“对应组件 demo 页面 + 组件源码能力”为准，不凭主观补充或删减。
- 先对齐 `src/subPages/<component>/Index.vue` 的示例能力，再与组件 props/slots/events/methods 交叉校验覆盖面。
- 使用 `create-demo-page` 作为默认基线顺序与命名规则，但允许按组件语义做自适应调整。
- 若文档存在介绍性章节（如适用场景、使用前说明、平台差异、注意事项），应保留在 Demo 分组之前，不强制重排。
- 当进入 Demo 能力展示区时，章节顺序、标题口径、可选分组启用方式均复用 `create-demo-page`，不要重复定义另一套规则。
- 若组件存在强语义能力分组（如“异步流程”“平台能力”“业务模式”），可插入到最贴近语义的位置，并在迁移说明中记录原因。
- 同类顺序保持稳定：`primary -> success -> info -> warning -> danger`。

### 3) Attributes / Options 表迁移

- 目标列结构：`参数 | 说明 | 类型 | 默认值`。
- 迁移规则：
  - 合并“说明 + 可选值”到说明列。
  - “最低版本”迁移到参数列后缀。
  - 支持识别版本标记语法 `^(x.y.z)` 并在构建时转换为 Badge。
- 文档编写要求：
  - 不手写 `<Badge />` 或 `<el-tag />`。
  - 使用约定标记，由文档插件统一转换。
  - 可选值统一写法：在说明列使用“可选值为 `a`、`b`、`c`”，不使用 `a / b / c` 斜杠串写。
  - 示例代码尽量同时提供 `vue/html` 与 `ts` 两段，保证可直接复现。
  - 多段示例优先使用 `::: code-group` 组织（如“模板/脚本”分组），提升可读性。
  - 当示例非常长、影响阅读体验时，使用 `::: details` 折叠长代码。

## 执行步骤

1. 识别目标组件与文档文件路径。
2. 核对源码 API（props/emits/slots/methods）与文档章节差异。
3. 以对应 demo 页面与组件源码能力为基准抽取示例，再保留组件介绍性章节，按 `create-demo-page` 基线与组件语义重排 Demo 章节顺序与命名，并按“vue/html + ts”成对补齐示例。
4. 迁移 Attributes/Options 表：列合并、最低版本迁移到参数列。
5. 应用版本标记约定（例如 `^(1.3.6)`）。
6. 运行诊断与文档构建验证，输出剩余问题。

## 验收清单

- API 四要素核对完成且文档与源码一致。
- Demo 示例均可追溯到对应 demo 页面与组件真实能力。
- Demo 分组顺序符合“create-demo-page 基线 + 组件语义自适应”规则。
- Attributes/Options 已完成列合并与最低版本迁移。
- 未手写组件标签，版本标签由约定格式生成。
- 当前改动无新增语法或构建错误。

## 示例触发语句

- “帮我把 button 文档迁移到新规范并对齐源码”
- “按 demo 规范整理 calendar 文档示例顺序”
- “把最低版本并到参数列，说明和可选值合并”
