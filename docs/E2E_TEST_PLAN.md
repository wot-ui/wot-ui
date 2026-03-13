# 补充测试方案实施计划：引入 Playwright E2E 测试

目前项目已使用 `Vitest` 进行单元测试和组件测试，这涵盖了逻辑验证和基础 DOM 渲染。为了进一步提升组件库的质量，建议引入 **Playwright** 进行端到端 (E2E) 测试。

## 为什么需要 Playwright？

1.  **真实浏览器环境**：Vitest 基于 `jsdom`，它模拟了浏览器环境但不完全等同（例如布局、CSS 渲染差异）。Playwright 在真实的 Chromium, Firefox, WebKit 中运行。
2.  **视觉回归测试 (Visual Regression)**：组件库非常依赖 UI 表现。Playwright 强大的截图对比功能可以精准捕捉样式崩坏。
3.  **复杂交互验证**：对于弹窗、滚动、键盘输入、拖拽等复杂交互，E2E 测试能模拟用户的真实操作路径。
4.  **跨端/跨浏览器测试**：一次编写，多浏览器运行，确保兼容性。

## 实施计划

### 第一阶段：环境搭建

1.  **安装依赖**
    ```bash
    pnpm add -D @playwright/test
    # 安装浏览器二进制文件
    npx playwright install
    ```

2.  **配置文件**
    创建 `playwright.config.ts`，配置测试目录、Base URL（通常指向文档站或示例页面）、浏览器目标等。

3.  **目录结构**
    建议在根目录建立 `e2e` 文件夹：
    ```
    wot-design-uni/
    ├── e2e/
    │   ├── components/      # 组件测试文件
    │   │   ├── button.spec.ts
    │   │   └── keyboard.spec.ts
    │   └── utils/           # 测试辅助工具
    ├── tests/               # 现有的 Vitest 测试
    └── playwright.config.ts
    ```

4.  **添加脚本**
    在 `package.json` 中添加：
    ```json
    "scripts": {
      "test:e2e": "playwright test",
      "test:e2e:ui": "playwright test --ui",  // 可视化调试模式
      "test:e2e:report": "playwright show-report"
    }
    ```

### 第二阶段：编写首个测试用例 (Pilot)

以 `wd-button` 或 `wd-keyboard` 为例，编写第一个 E2E 测试。

**示例：wd-button.spec.ts**
```typescript
import { test, expect } from '@playwright/test';

test('button render correctly', async ({ page }) => {
  // 访问文档或示例页面
  await page.goto('/#/pages/button/index');
  
  // 定位按钮并截图对比 (Visual Regression)
  const button = page.locator('.wd-button').first();
  await expect(button).toBeVisible();
  await expect(page).toHaveScreenshot('button-page.png');
});

test('button click interaction', async ({ page }) => {
  await page.goto('/#/pages/button/index');
  // 模拟点击
  await page.getByText('点击按钮').click();
  // 验证点击后的副作用（如弹窗/Toast）
  await expect(page.locator('.wd-toast')).toBeVisible();
});
```

### 第三阶段：集成与规范

1.  **截图快照管理**：建立更新快照的规范（如 `pnpm test:e2e --update-snapshots`）。
2.  **CI 集成**：在 GitHub Actions 或 GitLab CI 中添加步骤，运行 E2E 测试并上传测试报告。
3.  **编写 Skill**：创建 `create-e2e-test` skill，规范 E2E 测试代码风格（类似于现有的 `create-test` skill）。

## 预期收益

- **减少 UI Regression**：在发布前自动拦截样式问题。
- **提升信心**：确保核心路径（如表单提交、流程跳转）在真实浏览器中正常工作。
- **文档即测试**：直接测试文档示例页，确保文档与代码实现一致。
