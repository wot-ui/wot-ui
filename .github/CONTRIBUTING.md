# 贡献指南

### 介绍

感谢你使用 Wot UI。

以下是关于向 Wot UI 提交反馈或代码的指南。在向 Wot UI 提交 issue 或者 PR 之前，请先花几分钟时间阅读以下内容。

### Issue 规范

- 遇到问题时，请先确认这个问题是否已经在 issue 中有记录或者已被修复。
- 提 issue 时，请用简短的语言描述遇到的问题，并添加出现问题时的环境和复现步骤。
- 如果在提问前，无法确认怎样的一个问题是好的、更容易被回复的问题，可以读一读[提问的智慧](https://github.com/ryanhanwu/How-To-Ask-Questions-The-Smart-Way/blob/master/README-zh_CN.md)。

## 参与开发

- 请先 [fork](https://help.github.com/cn/github/getting-started-with-github/fork-a-repo) 一份组件库源码到自己的 github。
- 使用 `git clone` 将自己 github 上 fork 得到的源码同步到到你的本地
- 请确保基于 `master` 分支进行开发，我们只接受此分支上的代码贡献。

### OpenSpec 变更流程

本仓库参考 open-wot，使用 [OpenSpec](https://github.com/Fission-AI/OpenSpec) 管理新功能、破坏性变更、跨模块改造和架构调整。小型 bug 修复、拼写和文档微调可以直接修改。

OpenSpec `1.13.1` 已作为精确版本的开发依赖锁定，需要 Node.js `>= 20.19.0`。在仓库根目录执行：

```bash
pnpm install
pnpm exec openspec --version # 应输出 1.13.1
pnpm exec openspec list
npm install -g @fission-ai/openspec@1.13.1 # 使用 Skill 或 Claude /opsx:* 入口时需要
openspec --version # 应输出 1.13.1
```

共享工作流位于 `.agents/skills/openspec-*`，按以下顺序使用：

1. `openspec-propose`：创建并评审 proposal、specs、design 和 tasks。
2. `openspec-apply-change`：按任务实现，并组合组件、Demo、文档和测试等专项 Skills。
3. `openspec-verify-change`：核对规格、任务、实现和验证结果。
4. `openspec-archive-change`：将完成的变更归档并更新主规格。

需要探索需求、修订规划或提前同步主规格时，分别使用 `openspec-explore`、`openspec-update-change` 和 `openspec-sync-specs`。手动执行命令时使用 `pnpm exec openspec ...`；Skill 与 Claude `/opsx:*` 入口直接调用 PATH 中的 `openspec`，需要预先安装同版本 CLI。

项目上下文和 artifact 规则位于 `openspec/config.yaml`。活动变更保存在 `openspec/changes/`，归档历史位于 `openspec/changes/archive/`，主规格保存在 `openspec/specs/`。引入时保留空目录，后续随实际变更逐步沉淀规格。所有规划文档使用简体中文，仅保留模板与校验器要求的英文标记、代码标识符、路径、命令和产品名。

常用校验命令：

```bash
pnpm exec openspec status --change <change-name> --json
pnpm exec openspec validate <change-name> --strict
pnpm exec openspec validate --all --strict
```

OpenSpec 校验检查规划文档结构，不能替代 `pnpm type-check`、`pnpm lint` 和受影响组件的测试。

共享工作流 Skills 维护在 `.agents/skills/`，Claude Code 通过已有的 `CLAUDE.md -> AGENTS.md` 与 `.claude/skills -> ../.agents/skills` 相对 Git 符号链接复用规则和 Skills；OpenSpec 1.13.1 同时生成 `.claude/commands/opsx/` 下的 Claude `/opsx:*` 命令入口。检出仓库时需保留符号链接。`.agents/skills/.openspec-target` 标记共享目标为 `agents`。

升级时显式更新 `package.json` 中的固定版本并安装依赖。`update` 会按本机全局 profile 刷新或删除工作流，先通过 `pnpm exec openspec config profile` 确认自定义选择包含 `propose`、`explore`、`apply`、`update`、`sync`、`archive`、`verify`，再运行 `pnpm exec openspec update --force`。检查生成物 diff，保留共享 `agents` 目标与上述 7 个工作流，并一并提交依赖、lockfile 和生成物。项目约束写入 `AGENTS.md` 与 `openspec/config.yaml`，避免手改生成的工作流后被升级覆盖。

### 代码规范

在编写代码时，请注意：

- 确保代码可以通过仓库的 `ESLint` 校验。
- 确保代码格式是规范的，使用 `prettier` 进行代码格式化。

### 关于新功能

新功能需要标注最低版本号，如何确定版本号呢？当然没那么复杂啦！只需要各位贡献者在`/docs/*.md`内需要显示最低版本号的地方写上`$LOWEST_VERSION$`占位符即可；当下一次发版时，脚手架将会自动确定版本号并替换全部`/docs/*.md`中的`$LOWEST_VERSION$`占位符

```
| 参数  | 说明            | 类型     | 可选值    | 默认值    | 最低版本           |
| ----- | --------------- | ------ | --------- | --------- | ---------------- |
| text  | 设置通知栏文案  | `string` | -         | -         | $LOWEST_VERSION$ |
```


## Commit

开发之后，在 commit 代码时，commit message 请遵循以下格式：

> 如不按照此以下格式，`git commit` 可能无法正常工作。

```
<Commit 类型>(Commit 修改项): <commit 描述>
// 或者
<Commit 类型>: <commit 描述>
```

例如：

```shell script
npm run commit
# 或者
yarn commit

# 或者
pnpm commit

## 执行命令后根据修改类型选择
```

### commit 类型

```json
[
  {
    "type": "feat",
    "section": "✨ Features | 新功能",
    "hidden": false
  },
  {
    "type": "fix",
    "section": "🐛 Bug Fixes | Bug 修复",
    "hidden": false
  },
  {
    "type": "init",
    "section": "🎉 Init | 初始化",
    "hidden": true
  },
  {
    "type": "docs",
    "section": "✏️ Documentation | 文档",
    "hidden": false
  },
  {
    "type": "style",
    "section": "💄 Styles | 风格",
    "hidden": true
  },
  {
    "type": "refactor",
    "section": "♻️ Code Refactoring | 代码重构",
    "hidden": true
  },
  {
    "type": "perf",
    "section": "⚡ Performance Improvements | 性能优化",
    "hidden": true
  },
  {
    "type": "test",
    "section": "✅ Tests | 测试",
    "hidden": true
  },
  {
    "type": "revert",
    "section": "⏪ Revert | 回退",
    "hidden": true
  },
  {
    "type": "build",
    "section": "📦‍ Build System | 打包构建",
    "hidden": true
  },
  {
    "type": "chore",
    "section": "🚀 Chore | 构建/工程依赖/工具",
    "hidden": true
  },
  {
    "type": "ci",
    "section": "👷 Continuous Integration | CI 配置",
    "hidden": true
  }
]
```

### commit 描述

commit 描述说明了我们本次提交的具体描述，具体内容视情况而定，无固定规范。

## 提交 Pull Request

### 参考指南

如果你是第一次在 GitHub 上提 Pull Request ，可以阅读下面这两篇文章来学习：

- [第一次参与开源](https://github.com/firstcontributions/first-contributions/blob/main/translations/README.zh-cn.md)
- [如何优雅地在 GitHub 上贡献代码](https://segmentfault.com/a/1190000000736629)

### Pull Request 规范

在提交 Pull Request 时，请注意：

- 保持你的 PR 足够小，一个 PR 只解决单个问题或添加单个功能。
- 当新增组件或者修改原有组件时，记得增加或者修改对应的文档、Usage和暗黑模式样式。
- 在 PR 中请添加合适的描述，并关联相关的 Issue。

### Pull Request 流程

1. fork 主仓库，如果已经 fork 过，请同步主仓库的最新代码。
2. 基于 fork 后仓库的 master 分支新建一个分支，比如 `feature/add_button`。
3. 在新分支上进行开发，开发完成后，提 Pull Request 到主仓库的 main 分支。
4. Pull Request 会在 Review 通过后被合并到主仓库。
5. 等待组件库发布新版本。

### Pull Request 标题格式

Pull Request 的标题应该遵循以下格式：

```bash
type：commit message
```

示例：

- docs: fix typo in quickstart
- build: optimize build speed
- fix: incorrect style
- feat: add color prop

可选的类型：

- fix
- feat
- docs
- perf
- test
- types
- style
- build
- chore
- release
- refactor
- breaking change
- revert

### 同步最新代码

提 Pull Request 前，请依照下面的流程同步主仓库的最新代码：

```bash
# 添加主仓库到 remote
git remote add upstream https://github.com/wot-ui/wot-ui.git

# 拉取主仓库最新代码
git fetch upstream

# 切换至 master 分支
git checkout master

# 合并主仓库代码
git merge upstream/master
```
