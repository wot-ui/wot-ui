---
name: create-demo-page
description: 为组件创建演示页面并统一组织结构。用户要求新建/重构组件 Demo、统一展示顺序或用 demo-group 与 demo-group-item 编排时调用。
---

# 组件演示页面编写技能

本技能用于在 `wot-ui` 中创建或重构组件演示页，输出统一、可迁移、可维护的示例结构。

默认遵循 `wot-ui-component-baseline` 中的共享约束。

## 职责边界

- 本 Skill 只负责 `src/subPages/<component>/Index.vue` 及其演示组织。
- 不负责 Markdown 文档表结构迁移。
- 不负责纯文档 API 一致性审计。

## 何时使用

- 用户要求“给某组件写 Demo 页”。
- 用户要求“整理/重构示例页结构”。
- 用户要求“统一演示顺序、标题口径、展示规范”。
- 用户明确要求使用 `demo-group` 与 `demo-group-item`。

## 目标输出

- 产出 `src/subPages/<component>/Index.vue` 的规范化演示结构。
- 使用两层容器：
  - 第一层：`demo-group`（能力域）
  - 第二层：`demo-group-item`（能力切面）
- 保证示例覆盖核心能力，并具备可复制到其他组件的组织模板。

## 固定组织顺序

按以下顺序编排分组：

1. 组件类型（Type）
2. 组件状态（State）
3. 组件变体（Variant）
4. 组件样式（Style）
5. 特殊样式（Special Style）

按需分组（内部规则：仅在满足条件时启用；对外标题不标注“可选”）：

- 内容形态（Content Form）：存在 icon/text/slot 形态差异时启用。
- 布局能力（Layout）：存在 block/方向/密度/排列差异时启用。

## 条目编排规则

- 单一变量原则：一个 `demo-group-item` 只突出一个核心变量。
- 对照原则：优先同屏展示“默认 vs 变化态”。
- 完整原则：关键能力至少包含正常态和边界态（如 disabled/loading）。
- 顺序稳定：同类类型固定顺序 `primary -> success -> info -> warning -> danger`。
- 语义标题：标题直接说明当前演示变量，避免模糊命名。

## 模板结构

```vue
<template>
  <page-wraper>
    <view class="page-xxx">
      <demo-group title="组件类型">
        <demo-group-item title="类型">
          <!-- 示例 -->
        </demo-group-item>
      </demo-group>
    </view>
  </page-wraper>
</template>
```

## 实施步骤

1. 盘点组件能力：props / slots / events / states / variants。
2. 映射分组：先放入五个核心分组，再判断可选分组是否启用。
3. 编排条目：每个 item 保持单变量，形成对照。
4. 复用渲染：对重复矩阵使用数组 + `v-for`。
5. 收敛样式：统一按钮间距与行间距，减少内联样式。
6. 校验结果：确认示例覆盖、命名一致、页面无语法/类型错误。

## 数据驱动约定

- 建议在 `<script setup>` 中声明：
  - `typeItems`
  - `stateItems`
  - `variantItems`
  - `sizeItems`
  - `styleItems`
  - 其他可选能力数据项
- 使用 `as const` 固定字面量类型，保证模板推导稳定。

## 命名与文案约定

- 分组标题优先使用规范词汇：组件类型、组件状态、组件变体、组件样式、特殊样式。
- 按需分组标题直接写“内容形态”“布局能力”，不在标题后追加“（可选）”。
- 条目标题尽量简短直述，不加“状态：/样式：/内容：/布局：”前缀，如“禁用”“加载”“镂空”“尺寸”。
- 文案优先使用 `$t()`，临时中文文案控制在最小范围。

## 样式约定

- 页面根类：`.page-<component>`
- 公共行容器：`.demo-row`
- 统一间距在页面 scoped 样式中维护，避免大段内联 style。

## 验收清单

- 已使用 `demo-group > demo-group-item` 两层结构。
- 分组顺序符合“核心五分类 + 条件可选分组”规则。
- 核心能力未遗漏，且无明显重复。
- 重复矩阵已数据驱动化。
- 页面诊断与 lint 通过（至少校验当前文件）。

## 示例参考（Button）

- `src/subPages/button/Index.vue` 可作为首个落地参考。
