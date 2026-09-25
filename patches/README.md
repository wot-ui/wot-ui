# H5 运行时补丁

`@dcloudio__uni-h5@3.0.0-4080720251210001.patch` 通过根 `package.json` 的 `pnpm.patchedDependencies` 和锁文件自动应用。请使用 `pnpm install --frozen-lockfile`，不要手动编辑 `node_modules`。

补丁只修改当前锁定版本的普通 uni-app H5 浏览器入口 `dist/uni-h5.es.js`，不修改 SSR/CJS、uni-app x 或小程序运行时。

## 修复内容

- **H5-003 输入竞态**：父级外部修改（如清空）取消尚未派发的旧 input；正常 v-model 回显不会取消后续键入。失焦时先派发待处理输入，再触发 blur，使紧接着的鼠标提交能读取最新值。保持原有组合输入和正常节流逻辑。
- **H5-007 滚轮精确吸附**：即使拖动恰好停在整行位置，也调用 `onSnap` 更新选中值。拖动达到 20px 后忽略该次手势产生的 click，下一次手势开始时恢复点击，防止鼠标松开又选择另一行。20px 与上游 `useCustomClick` 的点击位移阈值一致。

## 验证与维护

2026-09-16 已在独立空目录使用仓库清单和锁文件执行 `pnpm install --frozen-lockfile --ignore-scripts`。安装成功，锁文件未变化，安装后的 uni-h5 浏览器入口 SHA256 与被测工作区完全一致。此安装检查跳过 only-allow/Husky 生命周期脚本，不替代远程 CI 的完整安装与构建；证据保存在 `test-results/verification/post-fix-full/clean-install.log` 和 `clean-install-runtime.txt`。

回归位于 `tests/e2e/flows/input-timing.spec.ts`、`picker-mouse.spec.ts`、`picker-touch.spec.ts`。输入用例覆盖真实键入和受控节流窗口、快速清空后重输、父级回显、立即提交、合成中文组合事件。滚轮覆盖上下整行/非整行、后续点击、滚轮以及原生 tap/CDP 连续触摸。合成组合事件不等同于真机输入法验证。

该补丁只随本仓库的依赖安装生效，**不会自动传播给通过 npm/uni_modules 使用 Wot UI 的其他应用**。其他应用遇到相同上游问题，需要在其工程应用对应补丁或使用经过验证的上游修复版本。Wot UI 组件内的 `data-no-touch-simulate` 是另一项 H5-006 修复，与本补丁分开。

升级 uni-app 时先检查上游 `useValueSync`、`useEvent`、`Scroller.snap` 和 `PickerViewColumn`，在新版本移除补丁后运行上述回归。仅当原始上游运行时全部通过时删除补丁及 `patchedDependencies`；否则重新生成并审查补丁，不能仅换版本号继续套用。本次未向上游提交 issue/PR。
