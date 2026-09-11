# AI 使用指南

Wot UI 提供了面向 AI 工具的文档索引、命令行查询、MCP Server 与 Agent Skills。你可以根据使用场景选择不同接入方式，让 AI 更准确地理解组件能力、示例代码、主题变量和常见实践。

## 选择接入方式

| 场景 | 推荐能力 | 适合工具 |
| --- | --- | --- |
| 让 AI 读取完整文档 | [LLMs.txt](/guide/llms-txt) | Cursor、TRAE、支持 URL 文档摄取的工具 |
| 查询组件 API、Demo 和 CSS 变量 | [@wot-ui/cli](/guide/open-wot) | 终端、脚本、Agent 工具调用 |
| 在 AI 客户端中调用组件知识库 | [MCP Server](/guide/open-wot#mcp-server) | 支持 MCP 的编辑器和 Agent 客户端 |
| 让 Agent 按 Wot UI 规范完成开发任务 | [AI Skills](/guide/skills) | Cursor、TRAE、Cline、Codex 等 Agent |

## 推荐使用路径

### 只想让 AI 理解文档

把 `llms.txt` 加到 AI 工具的文档集或知识库中：

```text
https://wot-ui.cn/llms.txt
```

如果工具支持读取更长上下文，可以使用完整版本：

```text
https://wot-ui.cn/llms-full.txt
```

### 想让 AI 查询组件知识

安装 `@wot-ui/cli` 后，可以通过命令查询组件列表、API、Demo、CSS 变量和更新记录：

```bash
npm install -g @wot-ui/cli

wot list
wot info Button
wot demo Button basic
wot token Button
```

### 想接入 MCP

启动 MCP Server：

```bash
wot mcp
```

在支持 MCP 的客户端中添加配置：

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

### 想让 Agent 按项目规范工作

安装 Wot UI 相关 Skills：

```bash
pnpm dlx skills add wot-ui/open-wot
```

Skills 适合让 AI 执行更主动的任务，例如组件选型、API 查询、生成 Vue 3 + uni-app 页面代码、主题生成、UnoCSS Preset 接入和常见问题排查。

## 能力地图

| 能力 | 提供内容 |
| --- | --- |
| `llms.txt` | 面向 AI 的文档入口、组件索引和结构化链接 |
| `llms-full.txt` | 更完整的文档内容、示例和实现细节 |
| `@wot-ui/cli` | 离线组件元数据、API 查询、Demo 查询、CSS 变量查询 |
| `wot mcp` | 通过 MCP tools 暴露组件知识库 |
| AI Skills | 面向 Agent 的任务说明、约束和最佳实践 |

## 延伸阅读

- [LLMs.txt](/guide/llms-txt)
- [@wot-ui/cli](/guide/open-wot)
- [AI Skills](/guide/skills)
