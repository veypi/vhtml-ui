# 开发指南

## 文档约定

统一架构（与 ivec 各仓一致）：根目录只有 `README.md` / `CHANGELOG.md` / `AGENTS.md`，
文档地图在 `docs/index.md`；组件文档跟随源码放 `ui/README.md`，示例页放 `ui/docs/`。
已完成的变更写根目录 `CHANGELOG.md`（版本以 git tag 为准），未来计划写
`docs/development/todo.md`，不另设第二份组件说明。

## 组件开发流程
注意：因为该组件是纯粹静态ui组件，所以在没被其他库引用时是没确定组件前缀的, 所以在编写组件文档时要注意不要使用带前缀的引用方式,使用vsrc语法引入组件，如<div vsrc='/btn'></div>
0. 每次只开发一个组件
1. 先确定功能和文件位置 如按钮组件的文件位置为/ui/btn.html 尽量使用缩写 文件名不用写v-前缀
2. 阅读common.css, 开始编写组件代码
3. 更新组件文档到/ui/README.md内部 尽量简洁易懂 不要废话（引用方式，传入参数列表，事件列表, 参考btn） ，该处撰写代码时使用带前缀的引用方式 如 <v-btn></v-btn>
4. 完善/ui/docs/XXXX.html案例页面 组件库案例页面通过vsrc引入规则引入该组件,可以参考btn.html, 部分样式已经在/ui/root.html中定义好, 可以直接使用