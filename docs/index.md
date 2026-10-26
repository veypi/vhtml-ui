# vhtml-ui 文档地图

统一架构：根目录放 `README.md` / `CHANGELOG.md` / `AGENTS.md` / `LICENSE`，
其余文档进 `docs/`（`architecture/`、`reference/`、`guides/`、`development/`）。
本仓是组件库，组件文档跟随组件源码放在 `ui/`，不在 `docs/` 另起一套。

## 入口

| 文档 | 内容 | 何时读 |
| --- | --- | --- |
| [README.md](../README.md) | 库定位与组件清单 | 了解本库提供什么 |
| [ui/README.md](../ui/README.md) | 组件文档：引用方式、参数、事件、主题与语言切换、`$message` | 使用或修改组件前必读 |
| [AGENTS.md](../AGENTS.md) | 组件开发流程与文档写法约定 | 新增组件前必读 |
| [CHANGELOG.md](../CHANGELOG.md) | 已完成变更（含破坏性契约调整） | 升级组件库时 |

## 约定

- 一个组件的真相文档只有 `ui/README.md` 里的一节；示例页放 `ui/docs/`，不写第二份说明。
- 版本以 git tag 为准；已完成的变更写 CHANGELOG，未来计划写 `docs/development/todo.md`。
