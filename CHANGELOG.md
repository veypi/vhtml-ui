# Changelog

版本以 git tag（`vX.Y.Z`）为准，遵循 SemVer。本文只记录已完成变更，未来计划写入
`docs/development/todo.md`。

## 0.1.7 — 2026-10-28

### 修复

- **主题运行时跟模块重载解绑**：`ui/env.js` 的 `$theme` 原先在**每次模块初始化时重建**——
  `matchMedia` 监听与 `storage` 监听随 env.js 一起挂，模块被 `clearScoped` / import epoch
  换掉后旧闭包与全局 handler 无人解绑地累积（重载越多，`change` / `storage` 回调发得越多），
  且 `$theme` 服务本身也随模块实例换掉，订阅者拿到的是不同的服务对象。现把主题运行时挂到
  `window`（`Symbol.for('vhtml-ui.theme.runtime')`）：服务、全局监听集合与 `lastTheme` 状态
  跨模块实例复用，重复 env 初始化只重新 `define` 同一服务。`applyTheme` 区分「显式变更」
  与「重载后同步 DOM」两种调用——后者在偏好与解析结果都没变时**不惊动存活的旧订阅者**
  （但 DOM 属性照常同步），避免重载本身变成一次「主题变了」的事件。监听注册（`bind`）按
  window 幂等，只挂一次。新增 `test/theme-env.test.mjs` 4 例。

## 0.1.6 — 2026-10-27

### 破坏性变更

- **主题模型改为 `light` / `dark` / `auto` 三态**：`$mod.theme`（`t1`/`t2` 与
  `toggle()`）退役，新增全局服务 `$theme`（`get` / `resolved` / `set` / `cycle` /
  `subscribe`）。`localStorage['vhtml-ui-theme']` 只存偏好；`documentElement` 的
  `theme` 属性始终是解析后的 `light` / `dark`，并同步 `style.colorScheme`；`auto`
  经 `matchMedia('(prefers-color-scheme: dark)')` 跟随系统，系统切换、其他组件调用
  与跨标签页修改都会同步。CSS 由 `:root[theme="t2"]` 改为 `:root[theme="dark"]`，
  浅色仍是 `:root` 基础值。

### 新增与调整

- 新增 `ui/theme.html` 三态主题切换组件（`<v-theme>`），点击按
  `light → dark → auto` 循环；用法与 `$theme` API 见 `ui/README.md`「Theme 主题切换」。
- `ui/layout/header.html` 接入新主题组件；`ui/lang.html` 移除圆环扫过动画及对应
  状态；`ui/langs.json` 主题文案同步（浅色 / 深色 / 跟随系统）。

### 文档

- `agents.md` 更名为 `AGENTS.md`；新增根目录 `CHANGELOG.md` 与
  [docs/index.md](docs/index.md) 文档地图。
