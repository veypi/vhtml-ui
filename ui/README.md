# vhtml UI 组件文档

vhtml UI 是一套基于 vhtml 框架的轻量级 UI 组件库，旨在提供简洁、高效的界面构建方案。

## 组件列表

- [Button 按钮](#button-按钮)
- [Input 输入框](#input-输入框)
- [Form 表单](#form-表单)
- [Dialog 对话框](#dialog-对话框)
- [Dropdown 下拉菜单](#dropdown-下拉菜单)
- [Sidebar 侧边栏](#sidebar-侧边栏)
- [Tabs 标签页](#tabs-标签页)
- [Tree 树形组件](#tree-树形组件)

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
| variant  | 按钮变体样式                                | String   | default / destructive / outline / ghost                                | default |
| size     | 按钮尺寸                                    | String   | xxs / xs / sm / md / lg / xl / xxl                                     | md      |
| color    | 按钮颜色                                    | String   | primary / secondary / success / danger / warning / info / 自定义颜色值 | primary |
| icon     | 是否为图标按钮                              | Boolean  | -                                                                      | false   |
| round    | 是否为圆形/圆角按钮                         | Boolean  | -                                                                      | false   |
| block    | 是否为块级元素                              | Boolean  | -                                                                      | false   |
| disabled | 是否禁用                                    | Boolean  | -                                                                      | false   |
| loading  | 是否加载中                                  | Boolean  | -                                                                      | false   |
| click    | 点击回调，若返回 Promise 则自动出现加载动画 | Function | -                                                                      | null    |

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

基于配置生成的表单组件，集成了输入验证、布局和操作按钮。

### 基础用法

```html
<v-form
  :data="formData"
  :items="formItems"
  @submit="onSubmit"
  @reset="onReset"
></v-form>

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
  ];

  onSubmit = () => {};
</script>
```

### Props

| 参数     | 说明                    | 类型    | 默认值 |
| -------- | ----------------------- | ------- | ------ |
| data     | 表单数据对象 (Reactive) | Object  | {}     |
| items    | 表单项配置列表          | Array   | []     |
| disabled | 是否全局禁用            | Boolean | false  |

### Item Configuration

`items` 数组中的每个对象支持以下属性：

| 属性        | 说明                               | 类型               |
| ----------- | ---------------------------------- | ------------------ |
| name        | 数据字段名 (对应 data 中的 key)    | String             |
| type        | 输入类型 (text, select, etc.)      | String             |
| label       | 标签文本                           | String             |
| placeholder | 占位符                             | String             |
| required    | 是否必填                           | Boolean            |
| disabled    | 是否禁用                           | Boolean            |
| readonly    | 是否只读                           | Boolean            |
| noborder    | 是否无边框                         | Boolean            |
| validate    | 校验规则                           | RegExp \| Function |
| opts        | 特定类型的额外配置 (见 Input 组件) | Object             |

### Events

| 事件名 | 说明           | 回调参数 |
| ------ | -------------- | -------- |
| submit | 表单提交时触发 | -        |
| reset  | 表单重置时触发 | -        |

### Slots

| 插槽名  | 说明                                         |
| ------- | -------------------------------------------- |
| actions | 自定义操作按钮区域 (覆盖默认的提交/重置按钮) |

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

### Props

| 参数              | 说明                                       | 类型    | 默认值 |
| ----------------- | ------------------------------------------ | ------- | ------ |
| visible           | 是否显示 Dialog，支持 `v:visible` 双向绑定 | Boolean | false  |
| title             | Dialog 的标题                              | String  | Dialog |
| width             | Dialog 的宽度                              | String  | 50%    |
| top               | Dialog CSS 中的 margin-top 值              | String  | 15vh   |
| closeOnClickModal | 是否可以通过点击 modal 关闭 Dialog         | Boolean | true   |

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
  <div vslot="header">LOGO</div>
  <div vslot="footer">Footer</div>
</v-sidebar>

<script setup>
  isCollapsed = false;
  menuItems = [
    { label: "仪表盘", icon: "<svg>...</svg>", path: "/dashboard" },
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

| 参数           | 说明                    | 类型                                 | 默认值 |
| -------------- | ----------------------- | ------------------------------------ | ------ |
| items          | 菜单项配置列表          | Array<{label, icon, path, children}> | []     |
| collapsed      | 是否折叠 (支持双向绑定) | Boolean                              | false  |
| width          | 展开时的宽度            | String                               | 240px  |
| collapsedWidth | 折叠时的宽度            | String                               | 64px   |

### Events

| 事件名 | 说明             | 回调参数 |
| ------ | ---------------- | -------- |
| select | 选中菜单项时触发 | item     |

### Slots

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

无样式树形组件，提供树形结构容器。

### 基础用法

```html
<v-tree :data="treeData">
  <div vslot="row">
    <div :style="{paddingLeft: (depth * 20) + 'px'}">
      <span v-if="row.children && row.children.length">
        {{ row.expand ? '[-]' : '[+]' }}
      </span>
      {{ row.name }}
    </div>
  </div>
</v-tree>

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

### Props

| 参数 | 说明     | 类型  | 默认值 |
| ---- | -------- | ----- | ------ |
| data | 树形数据 | Array | []     |

### Slots

| 插槽名 | 说明       | 参数                         |
| ------ | ---------- | ---------------------------- |
| row    | 行内容定义 | row (节点数据), depth (深度) |
