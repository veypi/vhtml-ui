# vhtml UI 组件文档

vhtml UI 是一套基于 vhtml 框架的轻量级 UI 组件库，旨在提供简洁、高效的界面构建方案。

## 组件列表

- [Button 按钮](#button-按钮)
- [Input 输入框](#input-输入框)
- [Form 表单](#form-表单)
- [Card 卡片](#card-卡片)
- [Tag 标签](#tag-标签)
- [Alert 警告提示](#alert-警告提示)
- [Spinner 加载](#spinner-加载)
- [Empty 空状态](#empty-空状态)
- [Tooltip 文字提示](#tooltip-文字提示)
- [Table 表格](#table-表格)
- [Pagination 分页](#pagination-分页)
- [Badge 徽标](#badge-徽标)
- [Avatar 头像](#avatar-头像)
- [Popover 气泡卡片](#popover-气泡卡片)
- [Skeleton 骨架屏](#skeleton-骨架屏)
- [Breadcrumb 面包屑](#breadcrumb-面包屑)
- [Dialog 对话框](#dialog-对话框)
- [Dropdown 下拉菜单](#dropdown-下拉菜单)
- [Sidebar 侧边栏](#sidebar-侧边栏)
- [Tabs 标签页](#tabs-标签页)
- [Tree 树形组件](#tree-树形组件)
- [Lang 语言切换](#lang-语言切换)

## Button 按钮

常用的操作按钮，支持多种变体、尺寸和图标。

### 基础用法

```html
<v-btn
  variant="default"
  size="md"
  :disabled="false"
  :loading="false"
  :click="handleClick"
>
  按钮
</v-btn>
```

### 带图标的按钮

```html
<v-btn>
  <svg>...</svg>
  带图标
</v-btn>

<v-btn icon variant="outline">
  <svg>...</svg>
</v-btn>
```

### 圆角按钮

```html
<v-btn round>圆角按钮</v-btn>
<v-btn icon round>
  <svg>...</svg>
</v-btn>
```

### 颜色主题

支持语义化颜色名和自定义颜色值。

```html
<!-- 语义颜色 -->
<v-btn color="success">成功</v-btn>
<v-btn color="danger">危险</v-btn>
<v-btn color="warning">警告</v-btn>
<v-btn color="info">信息</v-btn>

<!-- 配合变体使用 -->
<v-btn color="danger" variant="outline">删除</v-btn>
<v-btn color="success" variant="ghost">完成</v-btn>

<!-- 自定义颜色 (Hex/RGB) -->
<v-btn color="#8a2be2">紫色按钮</v-btn>
<v-btn color="rgba(255, 99, 71, 0.8)">番茄红</v-btn>
```

### Props

| 参数     | 说明                                        | 类型     | 可选值                                                                 | 默认值  |
| -------- | ------------------------------------------- | -------- | ---------------------------------------------------------------------- | ------- |
| variant  | 按钮变体样式                                | String   | default / outline / ghost                                              | default |
| size     | 按钮尺寸                                    | String   | xxs / xs / sm / md / lg / xl / xxl                                     | md      |
| color    | 按钮颜色                                    | String   | primary / secondary / success / danger / warning / info / 自定义颜色值 | primary |
| icon     | 是否为图标按钮                              | Boolean  | -                                                                      | false   |
| round    | 是否为圆形/圆角按钮                         | Boolean  | -                                                                      | false   |
| block    | 是否为块级元素                              | Boolean  | -                                                                      | false   |
| disabled | 是否禁用                                    | Boolean  | -                                                                      | false   |
| loading  | 是否加载中                                  | Boolean  | -                                                                      | false   |
| click    | 点击回调，若返回 Promise 则自动出现加载动画 | Function | -                                                                      | null    |

危险按钮使用 `color="danger"`（实心）或 `variant="outline" color="danger"`（描边），不存在 `variant="destructive"`。

click 尽量使用:click 传递给组件，而不是@click，因为@click 会触发组件的系统点击事件，而:click 会触发组件的自定义点击事件

### Events

| 事件名 | 说明                                | 回调参数            |
| ------ | ----------------------------------- | ------------------- |
| click  | 点击按钮时触发(若未提供 click 属性) | (event: MouseEvent) |

## Input 输入框

统一的输入组件，支持 text, password, number 等基础类型，以及后续的 select, checkbox 等。

### 基础用法 (Text/Password/Number)

```html
<v-input v:value="textVal" label="用户名" placeholder="请输入用户名"></v-input>

<v-input
  type="password"
  v:value="passVal"
  label="密码"
  placeholder="请输入密码"
></v-input>

<v-input
  type="number"
  v:value="numVal"
  label="年龄"
  placeholder="请输入年龄"
  :validate="ageValidator"
></v-input>
```

### 基础用法 (Select)

```html
<v-input
  type="select"
  v:value="selectVal"
  label="选择城市"
  placeholder="请选择"
  :opts="{options: [{label: 'Beijing', value: 'bj'}, {label: 'Shanghai', value: 'sh'}]}"
></v-input>
```

### 基础用法 (Checkbox)

```html
<!-- 单个复选框 (Boolean) -->
<v-input type="checkbox" v:value="checked" placeholder="同意协议"></v-input>

<!-- 复选框组 (Array) -->
<v-input
  type="checkbox"
  v:value="selectedHobbies"
  label="兴趣爱好"
  :opts="{options: [{label: 'Reading', value: 'read'}, {label: 'Gaming', value: 'game'}]}"
></v-input>
```

### 基础用法 (Radio)

```html
<v-input
  type="radio"
  v:value="gender"
  label="性别"
  :opts="{options: [{label: 'Male', value: 'm'}, {label: 'Female', value: 'f'}]}"
></v-input>
```

### 基础用法 (Switch)

```html
<v-input type="switch" v:value="notification" placeholder="开启通知"></v-input>
```

### 基础用法 (Date / Time)

```html
<!-- 日期选择 -->
<v-input type="date" v:value="dateStr" label="出生日期"></v-input>

<!-- 日期时间选择 (支持 type="datetime" 或 "datetime-local") -->
<v-input type="datetime" v:value="datetimeStr" label="会议时间"></v-input>
```

### 基础用法 (Slider)

```html
<v-input
  type="slider"
  v:value="sliderVal"
  :opts="{min: 0, max: 100, step: 1, showValue: true}"
></v-input>
```

### 基础用法 (Range)

```html
<v-input
  type="range"
  v:value="rangeVal"
  :opts="{min: 0, max: 100, step: 1, showValue: true}"
></v-input>
<!-- rangeVal should be an array, e.g., [20, 80] -->
```

### 基础用法 (File)

```html
<!-- 自动上传 (绑定 URL 列表) -->
<v-input
  type="file"
  v:value="fileList"
  :opts="{
    multiple: true, 
    autoUpload: true,
    uploader: myUploaderFunc
  }"
></v-input>

<!-- 手动上传 -->
<v-input
  type="file"
  placeholder="请选择文件"
  :opts="{
    autoUpload: false,
    uploader: myUploaderFunc
  }"
></v-input>

<!-- 自定义触发器 (如头像上传) -->
<v-input
  type="file"
  v:value="avatarVal"
  noborder
  :opts="{
    autoUpload: true, 
    showList: false, 
    accept: 'image/*',
    uploader: myUploaderFunc
  }"
>
  <div
    vslot="trigger"
    class="my-avatar-box"
    :style="{backgroundImage: avatarVal && avatarVal[0] ? 'url(' + avatarVal[0].url + ')' : 'none'}"
  >
    <span v-if="!avatarVal || !avatarVal[0]">+</span>
  </div>
</v-input>

<!-- myUploaderFunc 示例 -->
<script setup>
  myUploaderFunc = (file, onProgress) => {
    return new Promise((resolve, reject) => {
      // Upload logic...
      // onProgress(50);
      resolve("https://...");
    });
  };
</script>
```

### Props

| 参数        | 说明                                                      | 类型               | 默认值 |
| ----------- | --------------------------------------------------------- | ------------------ | ------ |
| type        | 输入类型 (text, password, number, select, checkbox, etc.) | String             | text   |
| value       | 绑定值 (支持 v:value 双向绑定)                            | Any                | -      |
| label       | 标签文本                                                  | String             | -      |
| placeholder | 占位符                                                    | String             | -      |
| disabled    | 是否禁用                                                  | Boolean            | false  |
| readonly    | 是否只读                                                  | Boolean            | false  |
| required    | 是否必填                                                  | Boolean            | false  |
| noborder    | 是否隐藏边框 (用于自定义样式)                             | Boolean            | false  |
| validate    | 校验规则 (Regex 或 Function)                              | RegExp \| Function | -      |
| opts        | 类型特定的额外配置项                                      | Object             | {}     |

### Opts 配置

- **Select / Checkbox / Radio**:
  - `options`: Array<{label: string, value: any}>
- **Slider / Range**:
  - `min`: Number (default 0)
  - `max`: Number (default 100)
  - `step`: Number (default 1)
  - `showValue`: Boolean (default false)
- **File**:
  - `accept`: String (e.g. ".jpg,.png" or "image/\*")
  - `multiple`: Boolean (default false)
  - `uploader`: Function (file, onProgress) => Promise<string>
  - `autoUpload`: Boolean (default true)
  - `showList`: Boolean (default true) - 是否显示默认的文件列表
- **Textarea**:
  - `rows`: Number (default 3)

### Events

| 事件名       | 说明                        | 回调参数 |
| ------------ | --------------------------- | -------- |
| update:value | 值变化时触发 (用于双向绑定) | value    |
| input        | 输入时触发                  | value    |
| focus        | 聚焦时触发                  | event    |
| blur         | 失焦时触发                  | event    |

### Validation

`validate` 属性支持正则表达式或函数：

- **Regex**: 如 `/^\d+$/`
- **Function**: `(val) => true` (校验通过) 或 `(val) => "错误信息"` (校验失败)

---

| input | 在 Input 值改变时触发 | (value: string \| number) |
| change | 仅在输入框失去焦点或用户按下回车时触发 | (value: string \| number) |
| focus | 在 Input 获得焦点时触发 | (event: Event) |
| blur | 在 Input 失去焦点时触发 | (event: Event) |

### Methods

| 方法名        | 说明                               |
| ------------- | ---------------------------------- |
| checkValidity | 检测输入框内容是否合法，返回布尔值 |

### Slots

| 插槽名  | 说明                                         |
| ------- | -------------------------------------------- |
| trigger | 自定义文件选择触发器 (仅 type="file" 时有效) |

## Form 表单

表单生成器：按字段配置渲染一组 `v-input`，内置栅格布局、聚合校验（提交时逐字段校验，全部通过才触发 `submit`）与重置快照。

### 基础用法

```html
<v-form :items="formItems" v:data="formData" :cols="2" @submit="onSubmit" @reset="onReset"></v-form>

<script setup>
  formData = {
    username: "",
    role: "user",
  };

  formItems = [
    { name: "username", label: "用户名", required: true },
    {
      name: "role",
      type: "select",
      label: "角色",
      opts: {
        options: [
          { label: "用户", value: "user" },
          { label: "管理员", value: "admin" },
        ],
      },
    },
    { name: "bio", type: "textarea", label: "简介", full: true },
  ];

  onSubmit = (data) => {};
</script>
```

### Props

| 参数     | 说明                                   | 类型    | 默认值 |
| -------- | -------------------------------------- | ------- | ------ |
| items    | 字段配置列表（见下）                   | Array   | []     |
| data     | 表单数据对象（支持 v:data 双向绑定）   | Object  | {}     |
| cols     | 栅格列数                               | Number  | 1      |
| disabled | 整体禁用                               | Boolean | false  |

字段配置项： `{ name, type, label, placeholder, required, disabled, readonly, noborder, validate, opts, span, full }`，其中 `span` 为占据栅格列数、`full` 为整行。

### Events

| 事件名 | 说明                             | 回调参数 |
| ------ | -------------------------------- | -------- |
| submit | 聚合校验全部通过后触发           | data     |
| reset  | 重置（恢复初始快照并清空错误态） | -        |

### Slots

| 插槽名  | 说明                                   |
| ------- | -------------------------------------- |
| actions | 操作按钮区（默认渲染 提交/重置 按钮） |

## Card 卡片

通用内容容器，支持头部、底部插槽与阴影模式。

### 基础用法

```html
<v-card title="简单卡片">卡片内容</v-card>

<v-card>
  <div vslot="header">自定义头部</div>
  卡片内容
  <div vslot="footer">底部区域</div>
</v-card>
```

### Props

| 参数     | 说明             | 类型    | 可选值                | 默认值 |
| -------- | ---------------- | ------- | --------------------- | ------ |
| title    | 标题（便捷头部） | String  | -                     | ''     |
| shadow   | 阴影显示时机     | String  | always / hover / never | hover  |
| bordered | 是否显示边框     | Boolean | -                     | true   |

### Slots

| 插槽名 | 说明     |
| ------ | -------- |
| header | 头部区域 |
| -      | 主体内容 |
| footer | 底部区域 |

## Tag 标签

用于标记和分类的小型标签。

### 基础用法

```html
<v-tag color="primary">Primary</v-tag>
<v-tag variant="filled" color="success">Success</v-tag>
<v-tag variant="outline" color="danger">Danger</v-tag>
<v-tag closable @close="onClose">可关闭</v-tag>
```

### Props

| 参数     | 说明         | 类型    | 可选值                                                   | 默认值  |
| -------- | ------------ | ------- | -------------------------------------------------------- | ------- |
| color    | 颜色         | String  | default / primary / success / warning / danger / info / 自定义色值 | default |
| variant  | 变体         | String  | light / filled / outline                                 | light   |
| size     | 尺寸         | String  | sm / md / lg                                             | md      |
| closable | 是否可关闭   | Boolean | -                                                        | false   |
| round    | 是否圆角胶囊 | Boolean | -                                                        | false   |

### Events

| 事件名 | 说明         |
| ------ | ------------ |
| close  | 点击关闭按钮 |

## Alert 警告提示

页面内警告提示条，四种语义类型。

### 基础用法

```html
<v-alert type="success" title="成功" description="操作已完成"></v-alert>
<v-alert type="danger" title="错误" closable>自定义描述内容</v-alert>
```

### Props

| 参数        | 说明     | 类型    | 可选值                             | 默认值 |
| ----------- | -------- | ------- | ---------------------------------- | ------ |
| type        | 类型     | String  | info / success / warning / danger  | info   |
| title       | 标题     | String  | -                                  | ''     |
| description | 描述文字 | String  | -                                  | ''     |
| closable    | 可关闭   | Boolean | -                                  | false  |

### Slots / Events

| 名称 | 说明                     |
| ---- | ------------------------ |
| icon | 自定义图标插槽           |
| -    | 描述内容（默认插槽）     |
| close | 关闭时触发（事件）      |

## Spinner 加载

加载状态指示器。

### 基础用法

```html
<v-spinner></v-spinner>
<v-spinner size="lg" color="var(--v-color-success)" text="加载中..."></v-spinner>
```

### Props

| 参数  | 说明 | 类型           | 可选值             | 默认值 |
| ----- | ---- | -------------- | ------------------ | ------ |
| size  | 尺寸 | String / Number | sm / md / lg / px 数值 | md     |
| color | 颜色 | String         | 任意 CSS 色值      | primary |
| text  | 文案 | String         | -                  | ''     |

## Empty 空状态

空数据占位组件，内置 SVG 插画。

### 基础用法

```html
<v-empty></v-empty>
<v-empty description="没有找到相关结果">
  <v-btn size="sm" variant="outline">重置筛选</v-btn>
</v-empty>
```

### Props

| 参数        | 说明           | 类型   | 默认值          |
| ----------- | -------------- | ------ | --------------- |
| description | 描述文字       | String | $t('empty.noData') |
| image       | 自定义图片地址 | String | ''（内置插画）  |

### Slots

| 插槽名 | 说明               |
| ------ | ------------------ |
| image  | 自定义插画区域     |
| -      | 底部操作区         |

## Tooltip 文字提示

悬停或点击触发的气泡提示。

### 基础用法

```html
<v-tooltip content="提示文字" placement="top">
  <v-btn>Hover</v-btn>
</v-tooltip>
```

### Props

| 参数      | 说明     | 类型   | 可选值                        | 默认值 |
| --------- | -------- | ------ | ----------------------------- | ------ |
| content   | 提示内容 | String | -                             | ''     |
| placement | 出现方向 | String | top / bottom / left / right   | top    |
| trigger   | 触发方式 | String | hover / click                 | hover  |
| delay     | 悬停延迟 | Number | ms                            | 100    |

## Table 表格

数据表格，支持自定义单元格、条纹、边框、加载与空状态。

### 基础用法

```html
<v-table :columns="columns" :data="tableData" striped></v-table>

<script setup>
  columns = [
    { key: "name", label: "姓名" },
    { key: "role", label: "角色" },
  ];
  tableData = [{ name: "Alice", role: "Developer" }];
</script>
```

### 自定义单元格

`cell` 插槽通过 `vbind` 暴露 `row` 与 `col`：

```html
<v-table :columns="columns" :data="tableData">
  <template vslot="cell">
    <div v-if="col.key === 'status'"><v-tag color="success">在职</v-tag></div>
    <template v-else>{{ row[col.key] }}</template>
  </template>
</v-table>
```

### Props

| 参数      | 说明           | 类型    | 默认值 |
| --------- | -------------- | ------- | ------ |
| columns   | 列配置 [{key, label, width, align}] | Array | [] |
| data      | 行数据         | Array   | []     |
| striped   | 斑马纹         | Boolean | false  |
| bordered  | 边框           | Boolean | false  |
| loading   | 加载中         | Boolean | false  |
| emptyText | 空态文案       | String  | 暂无数据 |

## Pagination 分页

分页导航，支持省略与总数显示。

### 基础用法

```html
<v-pagination v:value="page" :total="500" showTotal></v-pagination>
```

### Props

| 参数       | 说明                     | 类型    | 默认值 |
| ---------- | ------------------------ | ------- | ------ |
| value      | 当前页（v:value 双向）   | Number  | 1      |
| total      | 总条数                   | Number  | 0      |
| pageSize   | 每页条数                 | Number  | 10     |
| maxButtons | 页码按钮上限             | Number  | 7      |
| showTotal  | 显示总数                 | Boolean | false  |

### Events

| 事件名 | 说明       | 回调参数 |
| ------ | ---------- | -------- |
| change | 页码变化时 | page     |

## Badge 徽标

右上角数字或小红点标记，可包裹任意内容或独立使用。

### 基础用法

```html
<v-badge :count="5"><v-btn>消息</v-btn></v-badge>
<v-badge dot><v-avatar name="A"></v-avatar></v-badge>
<v-badge :count="120" :max="99"></v-badge>
```

### Props

| 参数   | 说明               | 类型    | 默认值 |
| ------ | ------------------ | ------- | ------ |
| count  | 数字（0 不显示）   | Number  | 0      |
| dot    | 小红点模式         | Boolean | false  |
| max    | 超过显示 max+      | Number  | 99     |
| hidden | 隐藏徽标           | Boolean | false  |

## Avatar 头像

图片或字符头像，图片加载失败自动回退到首字符。

### 基础用法

```html
<v-avatar src="/user.jpg" name="Alice"></v-avatar>
<v-avatar name="Bob" size="lg" shape="square"></v-avatar>
```

### Props

| 参数  | 说明                   | 类型            | 可选值              | 默认值 |
| ----- | ---------------------- | --------------- | ------------------- | ------ |
| src   | 图片地址               | String          | -                   | ''     |
| name  | 名称（兜底首字符）     | String          | -                   | ''     |
| size  | 尺寸                   | String / Number | sm / md / lg / px 数值 | md  |
| shape | 形状                   | String          | circle / square     | circle |

## Popover 气泡卡片

点击或悬停弹出的富内容气泡卡片。

### 基础用法

```html
<v-popover title="标题" content="内容">
  <v-btn>点击</v-btn>
</v-popover>

<v-popover trigger="hover" placement="right" title="用户卡片">
  <v-avatar name="A"></v-avatar>
  <div vslot="content">自定义内容</div>
</v-popover>
```

### Props

| 参数      | 说明         | 类型   | 可选值                      | 默认值 |
| --------- | ------------ | ------ | --------------------------- | ------ |
| title     | 标题         | String | -                           | ''     |
| content   | 内容         | String | -                           | ''     |
| placement | 弹出方向     | String | top / bottom / left / right | top    |
| trigger   | 触发方式     | String | click / hover               | click  |

### Slots

| 插槽名  | 说明           |
| ------- | -------------- |
| -       | 触发元素       |
| content | 自定义气泡内容 |

## Skeleton 骨架屏

加载占位骨架屏，`loading` 为 false 时显示真实内容。

### 基础用法

```html
<v-skeleton :loading="loading" avatar :rows="2">
  <div>真实内容</div>
</v-skeleton>
```

### Props

| 参数    | 说明           | 类型    | 默认值 |
| ------- | -------------- | ------- | ------ |
| loading | 是否显示骨架   | Boolean | true   |
| rows    | 文本行数       | Number  | 3      |
| avatar  | 显示头像占位   | Boolean | false  |
| title   | 显示标题占位   | Boolean | true   |

## Breadcrumb 面包屑

层级导航面包屑，链接自动接入 vrouter。

### 基础用法

```html
<v-breadcrumb :items="items" separator="/"></v-breadcrumb>

<script setup>
  items = [
    { label: "首页", path: "/" },
    { label: "组件", path: "/c/breadcrumb" },
    { label: "面包屑" },
  ];
</script>
```

### Props

| 参数      | 说明                          | 类型   | 默认值 |
| --------- | ----------------------------- | ------ | ------ |
| items     | 项配置 [{label, path}]，末项不渲染链接 | Array | []  |
| separator | 分隔符                        | String | /      |

## Dialog 对话框

在保留当前页面状态的情况下，告知用户并承载相关操作。

### 基础用法

```html
<v-btn @click="showDialog = true">点击打开 Dialog</v-btn>

<v-dialog v:visible="showDialog" title="提示">
  <span>这是一段信息</span>
  <div vslot="footer">
    <v-btn @click="showDialog = false">取消</v-btn>
    <v-btn type="primary" @click="showDialog = false">确定</v-btn>
  </div>
</v-dialog>

<script setup>
  showDialog = false;
</script>
```

### 紧凑模式

```html
<v-dialog v:visible="showDialog" compact="true">
  <div>紧凑模式无 header、footer、背景和内边距，宽高由内容决定</div>
</v-dialog>
```

### Props

| 参数              | 说明                                                         | 类型    | 默认值 |
| ----------------- | ------------------------------------------------------------ | ------- | ------ |
| visible           | 是否显示 Dialog，支持 `v:visible` 双向绑定                   | Boolean | false  |
| title             | Dialog 的标题                                                | String  | Dialog |
| width             | Dialog 的宽度（compact 模式下无效）                          | String  | 50%    |
| closeOnClickModal | 是否可以通过点击 modal 关闭 Dialog                           | Boolean | true   |
| compact           | 紧凑模式，无 header/footer/背景/内边距，宽高由内容自适应     | Boolean | false  |

### Events

| 事件名 | 说明              | 回调参数 |
| ------ | ----------------- | -------- |
| close  | Dialog 关闭的回调 | -        |

### Slots

| 插槽名 | 说明                    |
| ------ | ----------------------- |
| -      | Dialog 的内容           |
| title  | Dialog 标题区的内容     |
| footer | Dialog 按钮操作区的内容 |

## Dropdown 下拉菜单

向下弹出的列表。

### 基础用法

```html
<v-dropdown :items="items" @command="handleCommand">
  <v-btn>Dropdown List</v-btn>
</v-dropdown>

<script setup>
  items = [
    { label: "Action 1", value: "1" },
    { label: "Disabled", value: "2", disabled: true },
  ];
  handleCommand = (val) => {
    console.log(val);
  };
</script>
```

### Props

| 参数      | 说明           | 类型                                     | 默认值       |
| --------- | -------------- | ---------------------------------------- | ------------ |
| items     | 菜单项配置列表 | Array<{label, value, disabled, divided}> | []           |
| placement | 菜单弹出位置   | String                                   | bottom-start |

### Events

| 事件名  | 说明           | 回调参数     |
| ------- | -------------- | ------------ |
| command | 点击菜单项触发 | value / item |

### Slots

| 插槽名 | 说明               |
| ------ | ------------------ |
| -      | 触发下拉显示的元素 |
| menu   | 自定义菜单内容     |

## Sidebar 侧边栏

垂直导航菜单，用于后台管理系统等场景。

### 基础用法

```html
<v-sidebar :items="menuItems" v:collapsed="isCollapsed" @select="handleSelect">
  <div vslot="header" class="****">LOGO</div>
  <div vslot="footer" class="****">Footer</div>
</v-sidebar>

<script setup>
  isCollapsed = false;
  menuItems = [
    {
      label: () => $t("dashboard"),
      icon: "<svg>...</svg>",
      path: "/dashboard",
    },
    {
      label: "用户管理",
      icon: "<svg>...</svg>", // <i class='fas fa-XXX' />
      path: "/users",
      children: [{ label: "用户列表", path: "/users/list" }],
    },
  ];
  handleSelect = (item) => {
    console.log("Selected:", item);
  };
</script>
```

### Props

| 参数           | 说明                                                             | 类型                                 | 默认值 |
| -------------- | ---------------------------------------------------------------- | ------------------------------------ | ------ |
| items          | 菜单项配置列表                                                   | Array<{label, icon, path, children}> | []     |
| collapsed      | 是否折叠 (支持双向绑定)                                          | Boolean                              | false  |
| width          | 展开时的宽度                                                     | String                               | 240px  |
| collapsedWidth | 折叠时的宽度                                                     | String                               | 64px   |
| value          | 当前路径 (支持 v:value 双向绑定)，绑定后点击不跳转、仅更新 value | String                               | null   |

绑定 `v:value` 后菜单项根据 `item.path === value` 自动高亮（受控模式，适用于演示与 SPA）；不绑定时点击走正常链接跳转（MPA），在 `<vrouter>` 内由路由拦截并实现 `active` 高亮。

### Events

| 事件名 | 说明             | 回调参数 |
| ------ | ---------------- | -------- |
| select | 选中菜单项时触发 | item     |

### Slots

该插槽无内置样式

| 插槽名 | 说明                        |
| ------ | --------------------------- |
| header | 侧边栏顶部区域 (如 Logo)    |
| footer | 侧边栏底部区域 (如折叠按钮) |

## Tabs 标签页

选项卡切换组件，提供平级的区域将大块内容进行收纳和展现。

### 基础用法

```html
<v-tabs v:value="activeTab" :items="items">
  <!-- 内容区域，根据 activeTab 显示不同内容 -->
  <div class="content-box">
    <div v-if="activeTab === '1'">用户管理内容</div>
    <div v-if="activeTab === '2'">配置管理内容</div>
  </div>
</v-tabs>

<script setup>
  activeTab = "1";
  items = [
    { label: "用户管理", value: "1" },
    { label: "配置管理", value: "2" },
    { label: "角色管理", value: "3", disabled: true },
  ];
</script>
```

### 样式变体

支持 `line` (默认), `card`, `pills` 三种样式。

```html
<!-- Card 样式 -->
<v-tabs variant="card" v:value="tab" :items="items">...</v-tabs>

<!-- Pills 样式 -->
<v-tabs variant="pills" v:value="tab" :items="items">...</v-tabs>
```

### Props

| 参数    | 说明                                 | 类型                            | 默认值 |
| ------- | ------------------------------------ | ------------------------------- | ------ |
| items   | 标签项配置列表                       | Array<{label, value, disabled}> | []     |
| value   | 当前选中的值 (支持 v:value 双向绑定) | String                          | -      |
| variant | 样式变体 (line / card / pills)       | String                          | line   |

### Events

| 事件名 | 说明           | 回调参数 |
| ------ | -------------- | -------- |
| change | 切换标签时触发 | value    |

### Slots

| 插槽名 | 说明         |
| ------ | ------------ |
| -      | 标签页的内容 |

## Tree 树形组件

轻量树形组件，默认渲染带展开/收起箭头，也可通过插槽完全自定义行内容。

### 基础用法（默认渲染）

```html
<v-tree :items="treeData"></v-tree>

<script setup>
  treeData = [
    {
      name: "Root",
      expand: true,
      children: [
        { name: "Child 1" },
        { name: "Child 2", children: [{ name: "Grandchild" }] },
      ],
    },
  ];
</script>
```

节点字段：`name`（显示文本）、`children`（子节点数组）、`expand`（是否展开）。

### 自定义行渲染

默认插槽通过 `vbind` 暴露 `row`（节点数据）和 `depth`（深度），展开/收起由调用方控制：

```html
<v-tree :items="treeData">
  <div :style="{paddingLeft: (depth * 20) + 'px'}" @click="row.expand = !row.expand">
    {{ row.name }}
  </div>
</v-tree>
```

### Props

| 参数  | 说明     | 类型  | 默认值 |
| ----- | -------- | ----- | ------ |
| items | 树形数据 | Array | []     |

### Slots

| 插槽名 | 说明       | 绑定                       |
| ------ | ---------- | -------------------------- |
| -      | 行内容定义 | row (节点数据), depth (深度) |

## Lang 语言切换

简洁的语言切换组件，用于在中文和英文之间快速切换，集成 vhtml 的 i18n 功能。

### 基础用法

```html
<v-lang></v-lang>
```

### 组件特性

- 点击切换中英文
- 自动同步 $i18n 状态
- 显示当前激活语言
- 圆角标签式设计
- size: 36px \* 36px

### 样式说明

组件采用内联标签式设计：

- 显示 `中 / En` 两种语言选项
- 当前激活语言高亮显示（使用主色调）
- 悬停时有背景色变化效果
- 无边框，轻量级设计

### 集成方式

组件通过 `$i18n.getLocale()` 和 `$i18n.setLocale()` 与 vhtml 的国际化系统集成：

```html
<v-lang></v-lang>
```

### Props

该组件无外部 Props，内部自动管理状态。

### 使用场景

适合放置在页面顶部导航栏、设置面板或页脚等位置：

```html
<header class="header">
  <h1>Logo</h1>
  <div class="header-actions">
    <v-lang></v-lang>
    <v-btn>登录</v-btn>
  </div>
</header>
```
