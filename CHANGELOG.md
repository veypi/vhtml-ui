# Changelog

版本以 git tag（`vX.Y.Z`）为准，遵循 SemVer。本文只记录已完成变更，未来计划写入
`docs/development/todo.md`。

## 0.1.8 — 2026-11-12

- **修复 `v-html` 用在非 div 上导致内容不渲染**：vhtml 的 `v-html` 只在 `<div>` 上生效，写成
  `<span v-html>` / `<li v-html>` 时属性原样留在 DOM 上、内容永远为空。alert 的图标槽位正是
  `<span v-html="typeIcon()">`——所有提示条都不带图标。改为 `<div v-html>`；empty 的默认插图与
  tree 示例同步修正。
- **特性栅格不再留灰色空块**：首页「为什么选择 vhtml-ui」用 `auto-fill` 排 6 张卡，宽屏下排成
  4+2，空出的两格露出容器底色（一大块灰）。改为固定 3 列 → 2 行填满，窄屏 2/1 列。

- **组件文档补充事件约定**：新增「事件约定」章节——vhtml 只在原生 DOM 事件里注入 `$event`，
  组件自定义事件（`update` / `v-focus` / `v-blur`）的 payload 要用形参接收
  （`@update="value => handler(value)"`），并说明自定义事件名不得与 DOM 内置事件同名。

- **新增 `$message` 示例页**：覆盖四种通知、持续消息、复制、confirm 与 prompt；消息弹层接入当前语言，标题、确认、取消和复制反馈不再硬编码，并统一新的明暗主题样式。
- **统一视觉系统**：重做明暗主题色板、控件密度、圆角、焦点与阴影；统一按钮、输入、卡片、导航、反馈、表格和弹层样式。首页改为真实组件工作台，文档页改为独立内容面板；视觉约束见 `docs/development/design.md`。
- **修复表单动态字段绑定**：`form` 改用显式 `update` 回写以符合静态双向绑定约束，并为可选字段属性提供默认值；基础 `input` 现在与委托控件一样发出 `update`。
- **修复语言切换尺寸**：`lang` 独立使用时默认 32×32px，页头明确约束主题与语言组件宿主，避免内部 SVG 按默认尺寸异常放大。
- **dialog 定位模式与可配置项**：新增 `position`（`{x, y}`，数字按 px，也接受 CSS 长度；
  不传则居中）、`showClose`、`lockScroll` 三个属性；定位模式下遮罩改为 `display:block`、
  内容绝对定位。`prompt(message, value)` 默认把 message 作为弹窗标题、正文只显示输入框
  （显式传 `title` 时保留「标题 + 说明」形态）。文档：`ui/README.md`；回归：`test/vmessage.html`。

- **`$message` 通知条换独立高明度配色**：浅色主题用近白亮底（info `#eef7ff` / success `#effff9` / warning `#fffbea` / danger `#fff1f4`）+ 鲜亮前景 + 同色系浅阴影，不再混用主题底色与边框；暗色主题沿用 accent 派生色（`hsl(from var(--vmsg-accent) …)`），两类主题各自可读。

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
