# 视觉基线维护

当前仅包含 ConfigProvider 的 Button.size 控件，验证 Radio 按钮、选中标记、文字、换行和间距在明暗主题及窄宽视口下的布局。截取完整展开后、无遮挡的单元格；固定中文，等待字体加载，禁用截图期间的动画，按 CSS 像素保存。

- Playwright：1.63.0；macOS 15.7.1（24G231）。基线文件名带浏览器配置和操作系统；不跨系统共用。
- Chromium mobile：Pixel 7，412×839、DPR 2.625。
- WebKit mobile：iPhone 13，390×664、DPR 3。
- Chromium desktop：1280×720、DPR 1。
- 2026-09-15 已逐张查看六张 macOS PNG：内容无遮挡、各选项可读、明暗颜色不同、移动布局两行、桌面布局一行。它们记录现有布局，不代表完整设计规范验收。

运行 `pnpm test:e2e:h5:visual` 比较基线。需要更新时加 `--update-snapshots`，逐张查看 PNG 和差异后再纳入变更；不要将“更新成功”当作审阅完成。

Linux 尚无经过审阅的基线，因此 Ubuntu 功能 CI 不启用视觉集。后续在固定 Linux 环境生成并审阅对应基线后，再开启同平台的视觉任务。Mac 与 Linux 的字体渲染差异不能通过提高截图容差来掩盖。

2026-09-16 已尝试在本机 Colima 中运行官方 `mcr.microsoft.com/playwright:v1.63.0-noble` x64 镜像。ARM 主机上的 QEMU 在 Chromium 启动时因 `rcu_read_unlock` 内部断言崩溃，尚未打开页面；没有生成或接受 Linux 基线。诊断见 `test-results/verification/linux-diagnostic/`，不能将此环境失败认定为组件回归。

工作流 `Playwright E2E (H5)` 在 PR 上生成候选图；手动入口也增加了 `generate_visual_candidates`。它在原生 x64 runner 的同版本官方容器中生成候选 PNG，可下载 `playwright-h5-linux-visual-candidates` artifact。候选生成成功不等于视觉验收通过：必须逐张查看、在同一容器中不带 `--update-snapshots` 再比较，最后将审阅通过的 Linux PNG 纳入版本管理。普通 push 不生成候选图；当前尚未启用以 Linux 基线为准的视觉对比检查。
