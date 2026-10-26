# Changelog

版本以 git tag（`vX.Y.Z`）为准，遵循 SemVer。本文只记录已完成变更，未来计划写入
`docs/development/todo.md`。

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
