---
version: New
---

# LLMs.txt

[llms.txt](https://llmstxt.org/) 是一个专为大型语言模型设计的文本文件，类似 robots.txt，但目标不同。robots.txt 告诉搜索引擎爬虫哪些页面可以爬取，而 llms.txt 为 AI 工具提供网站内容的结构化信息，帮助它们更好地理解和索引组件库文档、示例和最佳实践。

## 可用资源

我们也提供 2 个 `llms.txt` 路由来帮助 AI 工具访问文档：

- [llms.txt](https://wot-ui.cn/llms.txt) - 包含所有组件及其文档链接的结构化概览
- [llms-full.txt](https://wot-ui.cn/llms-full.txt) - 提供包含实现细节和示例的完整文档

## 在 AI 工具中使用

### Cursor

在 Cursor 中找到 `Indexing & Docs` 设置，并将 `llms.txt` 添加到 `Docs` 中，使用 `@Docs` 功能将 llms.txt 文件包含到项目中。

[详细了解 Cursor 中的 @Docs 功能](https://cursor.com/docs/agent/tools/search)

### TRAE

在 TRAE 中找到 `上下文/文档集` 设置，并将 `llms.txt` 添加到 `文档集` 中，使用 `#Docs` 功能将 llms.txt 文件包含到项目中。

[详细了解 TRAE 中的 #Docs 功能](https://docs.trae.ai/ide/number-sign)

### 其他工具

任何支持 `llms.txt` 标准，或支持通过 URL 摄取文档的工具，都可以使用我们提供的 llms.txt 文件。你可以将它加入工具的 `文档集`、`rules` 或知识库配置中，帮助 AI 更好地理解 Wot UI 组件库。

### context7

如果不使用 llms.txt，也可以通过 [context7](https://github.com/upstash/context7) 直接读取组件库文档。

[详细了解 context7](https://github.com/upstash/context7)

## 延伸阅读

- [Skills](/guide/skills)
- [llms.txt：让 AI 更好地理解你的文档](https://juejin.cn/post/7500981295105015847)