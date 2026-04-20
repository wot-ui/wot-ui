---
version: New
---
# CLI

我们在 [Open Wot](https://github.com/wot-ui/open-wot)  中维护了Wot UI 的 AI 工具链仓库，其中对外发布的核心包为 [@wot-ui/cli](https://www.npmjs.com/package/@wot-ui/cli)。它提供命令行工具、MCP Server、离线组件知识库与数据提取脚本，用于把 wot-ui v2 的组件知识接入编辑器、AI Agent 和本地工程分析流程。

## 亮点

- 完全离线：组件 Props、事件、CSS 变量、Demo、Changelog 等元数据随包安装，无需网络请求
- Agent 友好：多数命令支持 `--format json`，适合被工具/脚本消费
- 项目分析：提供 `doctor / usage / lint` 诊断与统计能力
- MCP 集成：通过 `wot mcp` 以 stdio 方式提供 tools，便于集成到支持 MCP 的客户端

## 安装

```bash
npm install -g @wot-ui/cli
```

安装完成后可直接使用 `wot` 命令。

## 快速开始

```bash
wot list
wot info Button
wot demo Button basic
wot doc Button
wot token Button
wot changelog
```

## 命令速查

### 组件知识

- `wot list`：列出可用的 wot-ui 组件
- `wot info <Component>`：查看组件 props、events、slots、CSS 变量
- `wot doc <Component>`：输出组件 Markdown 文档
- `wot demo <Component> [name]`：查看 demo 列表或输出指定 demo 源码
- `wot token [Component]`：查看组件 CSS 变量与默认值
- `wot changelog [version] [component]`：查看版本更新记录

### 项目分析

- `wot doctor [dir]`：检查项目依赖、运行环境与基础集成情况
- `wot usage [dir]`：统计 `.vue` 文件中的 `<wd-*>` 使用情况
- `wot lint [dir]`：检查未知组件、空按钮等规则

### MCP Server

启动 MCP Server：

```bash
wot mcp
```

在支持 MCP 的客户端中添加配置（示例）：

```json
{
  "mcpServers": {
    "wot-ui": {
      "command": "wot",
      "args": ["mcp"]
    }
  }
}
```

当前 MCP Server 提供的 tools 包括：

- `wot_list`
- `wot_info`
- `wot_doc`
- `wot_demo`
- `wot_token`
- `wot_changelog`
- `wot_lint`

## 通用参数

多数查询命令支持以下参数：

- `--format text|json`
- `--version v2`
