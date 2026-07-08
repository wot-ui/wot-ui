# AI Guide

Wot UI provides AI-oriented documentation indexes, command-line queries, an MCP Server, and Agent Skills. Choose the integration path that matches your workflow so AI tools can understand components, examples, theme tokens, and best practices more accurately.

## Choose an Integration

| Scenario | Recommended Feature | Works Well With |
| --- | --- | --- |
| Let AI read the full documentation | [LLMs.txt](/en-US/guide/llms-txt) | Cursor, TRAE, tools that ingest docs by URL |
| Query component APIs, demos, and CSS variables | [@wot-ui/cli](/en-US/guide/open-wot) | Terminals, scripts, Agent tool calls |
| Call the component knowledge base from AI clients | [MCP Server](/en-US/guide/open-wot#mcp-server) | Editors and Agent clients that support MCP |
| Let Agents follow Wot UI conventions during development | [AI Skills](/en-US/guide/skills) | Cursor, TRAE, Cline, Codex, and other Agents |

## Recommended Path

### Let AI Understand the Docs

Add `llms.txt` to your AI tool's docs, rules, or knowledge base:

```text
https://wot-ui.cn/llms.txt
```

If your tool supports larger context, use the full version:

```text
https://wot-ui.cn/llms-full.txt
```

### Query Component Knowledge

Install `@wot-ui/cli` to query component lists, APIs, demos, CSS variables, and changelogs:

```bash
npm install -g @wot-ui/cli

wot list
wot info Button
wot demo Button basic
wot token Button
```

### Connect Through MCP

Start the MCP Server:

```bash
wot mcp
```

Add the server to an MCP-compatible client:

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

### Let Agents Follow Project Conventions

Install Wot UI-related Skills:

```bash
pnpm dlx skills add wot-ui/open-wot
```

Skills are useful for more active Agent workflows, such as component selection, API lookup, Vue 3 + uni-app page generation, theme generation, UnoCSS Preset integration, and troubleshooting common issues.

## Capability Map

| Feature | Provides |
| --- | --- |
| `llms.txt` | AI-oriented documentation entry, component index, and structured links |
| `llms-full.txt` | Fuller documentation content, examples, and implementation details |
| `@wot-ui/cli` | Offline component metadata, API lookup, demo lookup, CSS variable lookup |
| `wot mcp` | Component knowledge exposed through MCP tools |
| AI Skills | Agent-oriented task instructions, constraints, and best practices |

## Further Reading

- [LLMs.txt](/en-US/guide/llms-txt)
- [@wot-ui/cli](/en-US/guide/open-wot)
- [AI Skills](/en-US/guide/skills)
