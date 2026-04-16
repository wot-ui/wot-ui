---
version: New
---

# LLMs.txt

[llms.txt](https://llmstxt.org/) is a text file designed specifically for large language models, similar to robots.txt but with different goals. robots.txt tells search engine crawlers which pages can be crawled, while llms.txt provides structured information about website content for AI tools, helping them better understand and index component library documentation, examples, and best practices.

## Available Resources

We also provide 2 `llms.txt` routes to help AI tools access the documentation:

- [llms.txt](https://wot-ui.cn/llms.txt) - Contains structured overview of all components and their documentation links
- [llms-full.txt](https://wot-ui.cn/llms-full.txt) - Provides complete documentation including implementation details and examples

## Using in AI Tools

### Cursor

Find `Indexing & Docs` settings in Cursor, and add `llms.txt` to `Docs`, use the `@Docs` feature to include llms.txt files in the project.

[Learn more about @Docs feature in Cursor](https://cursor.com/docs/agent/tools/search)

### TRAE

Find `Context/Docs` settings in TRAE, and add `llms.txt` to `Docs`, use the `#Docs` feature to include llms.txt files in the project.

[Learn more about #Docs feature in TRAE](https://docs.trae.ai/ide/number-sign)

### Other Tools

Any tool that supports the `llms.txt` standard, or supports ingesting documentation through URLs, can use the llms.txt files we provide. You can add it to the tool's `Docs`, `rules`, or knowledge base configuration to help AI better understand the Wot UI component library.

### context7

If you don't use llms.txt, you can also directly read component library documentation through [context7](https://github.com/upstash/context7).

[Learn more about context7](https://github.com/upstash/context7)

## Further Reading

- [Skills](./skills)
- [llms.txt: Let AI Better Understand Your Documentation](https://juejin.cn/post/7500981295105015847)
