---
version: New
---
# CLI

We maintain Wot UI's AI toolchain in [Open Wot](https://github.com/wot-ui/open-wot). Its main public package is [@wot-ui/cli](https://www.npmjs.com/package/@wot-ui/cli). It provides a CLI, an MCP server, an offline component knowledge base, and metadata extraction scripts, so you can bring wot-ui v2 component knowledge into editors, AI agents, and local project analysis workflows.

## Highlights

- Fully offline: metadata (Props, Events, CSS variables, Demos, Changelog) ships with the package
- Agent-friendly: most commands support `--format json` for structured consumption
- Project analysis: `doctor / usage / lint` for diagnostics and usage insights
- MCP integration: `wot mcp` exposes tools via stdio for MCP-compatible clients

## Installation

```bash
npm install -g @wot-ui/cli
```

After installation, use the `wot` command.

## Quick Start

```bash
wot list
wot info Button
wot demo Button basic
wot doc Button
wot token Button
wot changelog
```

## Command Reference

### Component Knowledge

- `wot list`: list available wot-ui components
- `wot info <Component>`: view props, events, slots, and CSS variables
- `wot doc <Component>`: output the component Markdown documentation
- `wot demo <Component> [name]`: list demos or output the source of a specific demo
- `wot token [Component]`: show CSS variables and default values
- `wot changelog [version] [component]`: show changelog entries

### Project Analysis

- `wot doctor [dir]`: check dependencies, runtime environment, and basic integration
- `wot usage [dir]`: analyze `<wd-*>` usage in `.vue` files
- `wot lint [dir]`: rules such as unknown components, empty buttons, etc.

### MCP Server

Start the MCP server:

```bash
wot mcp
```

Add configuration in an MCP-compatible client (example):

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

Available tools include:

- `wot_list`
- `wot_info`
- `wot_doc`
- `wot_demo`
- `wot_token`
- `wot_changelog`
- `wot_lint`

## Common Options

Most query commands support:

- `--format text|json`
- `--version v2`
