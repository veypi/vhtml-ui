# 页面迁移到 vhtml-ui

迁移目标是消除重复的通用控件，不是把业务页面改成同一种模板。

## 推荐顺序

1. 先替换按钮、输入、选择、Tabs、Tag、Alert、Spinner、Empty、Pagination 和 `$message`。
2. 再处理普通 Table、Dialog、Dropdown 等结构组件。
3. 最后评估布局组件；导航高亮、权限过滤和窗口行为不能因换组件而丢失。

## 契约检查

- 开发前读取 `ui/README.md` 的真实 Props、Events、Slots，不凭其他框架经验猜 API。
- `v:value` 只用于静态属性路径；动态键使用 `:value` + `@update`。
- `v-input type="number"` 的输出是字符串，业务提交层负责数值转换和边界校验。
- 默认 Tabs 为线型；需要图标或其他标签内容时，先确认组件能力，不在页面复制一套 Tabs。
- `v-table` 的 `cell` 插槽通过 `row`、`col` 定制单元格；排序表头、展开行等能力未提供时保留业务表格。
- Dialog 的操作按钮放入 `<div vslot="footer">`；简单确认与输入使用 `$message.confirm()` / `$message.prompt()`。
- 旧 CSS 类不要继续挂在官方组件宿主上模拟内部控件，否则容易出现双层边框和布局偏移。

每批迁移后运行 `vhtml check` 和相关逻辑测试；视觉验收必须基于真实页面，而不是只凭模板检查。
