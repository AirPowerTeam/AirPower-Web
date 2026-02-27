# Table 表格

数据表格组件，支持排序、筛选、分页、导出等功能。

## 引入

```typescript
import { ATable } from '@airpower/web'
```

## Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
| ---- | ---- | ---- | ------ | ---- |
| buttons | 自定义按钮列表 | `ITableButton<E>[]` | `[]` | 否 |
| useHook | 直接使用表格 Hook | `ITableResult<E, S>` | `undefined` | 否 |
| disablePage | 禁用分页 | `boolean` | `false` | 否 |
| loading | 表格加载中 | `boolean` | `false` | 否 |
| hideAdd | 隐藏添加按钮 | `boolean` | `false` | 否 |
| editPermission | 行尾编辑按钮权限 | `string` | `undefined` | 否 |
| disablePermission | 行尾禁用按钮权限 | `string` | `undefined` | 否 |
| enablePermission | 行尾启用按钮权限 | `string` | `undefined` | 否 |
| detailPermission | 行尾详情按钮权限 | `string` | `undefined` | 否 |
| deletePermission | 行尾删除按钮权限 | `string` | `undefined` | 否 |
| addRowPermission | 行尾添加按钮权限 | `string` | `undefined` | 否 |
| addPermission | 左侧添加按钮权限 | `string` | `undefined` | 否 |
| exportPermission | 导出按钮权限 | `string` | `undefined` | 否 |
| importPermission | 导入按钮权限 | `string` | `undefined` | 否 |
| dataList | 表格显示的数据数组 | `E[]` | `[]` | 否 |
| selectList | 默认选中的数据数组 | `E[]` | `[]` | 否 |
| columnList | 显示字段列表 | `ITableColumn<E>[]` | `[]` | 否 |
| emptyText | 表格空文案 | `string` | `undefined` | 否 |
| hideEdit | 隐藏编辑按钮 | `boolean` | `false` | 否 |
| disableEdit | 禁用行内编辑按钮回调 | `(row: E) => boolean` | `null` | 否 |
| disableAddRow | 禁用行内添加按钮回调 | `(row: E) => boolean` | `null` | 否 |
| disableChangeStatus | 禁用启用/禁用操作回调 | `(row: E) => boolean` | `null` | 否 |
| disableDetail | 禁用行内详情按钮回调 | `(row: E) => boolean` | `null` | 否 |
| disableDelete | 禁用行内删除按钮回调 | `(row: E) => boolean` | `null` | 否 |
| disableRow | 整行显示禁用状态回调 | `(row: E) => boolean` | `null` | 否 |
| selectable | 禁用多选按钮回调 | `(row: E) => boolean` | `null` | 否 |
| showSelect | 显示多选框 | `boolean` | `false` | 否 |
| showEnableAndDisable | 显示启用/禁用按钮 | `boolean` | `false` | 否 |
| fieldCacheKey | 表格字段缓存 Key | `string` | `undefined` | 否 |
| hideColumnSelector | 隐藏字段选择 | `boolean` | `false` | 否 |
| ctrlWidth | 操作区宽度 | `string` | `''` | 否 |
| autoHeight | 自动撑起高度 | `boolean` | `false` | 否 |
| hideCtrl | 隐藏操作按钮 | `boolean` | `false` | 否 |
| showDetail | 显示详情按钮 | `boolean` | `false` | 否 |
| showAddRow | 显示行添加按钮 | `boolean` | `false` | 否 |
| customDelete | 自定义删除事件 | `boolean` | `false` | 否 |
| deleteTitle | 删除确认框标题 | `string` | `''` | 否 |
| deleteContent | 删除确认框内容 | `string` | `''` | 否 |
| entity | 表格数据实体类 | `ITransformerConstructor<E>` | `undefined` | 否 |
| showImport | 显示导入按钮 | `boolean` | `false` | 否 |
| importTitle | 导入上传标题 | `string` | `undefined` | 否 |
| exportParam | 导出请求参数 | `QueryRequest` | `undefined` | 否 |
| showExport | 显示导出按钮 | `boolean` | `false` | 否 |
| service | 接口服务类 | `CurdServiceConstructor<E, S>` | `undefined` | 否 |
| defaultFilter | 默认筛选器 | `E` | `undefined` | 否 |
| searchParams | 搜索参数 | `ISearchField[]` | `undefined` | 否 |
| importUrl | 导入接口地址 | `string` | `undefined` | 否 |
| importTemplateUrl | 导入模板下载地址 | `string` | `undefined` | 否 |
| fileEntity | 导入文件实体类 | `ITransformerConstructor<IFile>` | `undefined` | 否 |
| onAdd | 自定义添加事件 | `() => void` | `undefined` | 否 |
| onDetail | 自定义详情事件 | `(row: E) => void` | `undefined` | 否 |
| onDelete | 自定义删除事件 | `(row: E) => void` | `undefined` | 否 |
| onEdit | 自定义编辑事件 | `(row: E) => void` | `undefined` | 否 |
| onSelected | 选择变更事件 | `(list: E[]) => void` | `undefined` | 否 |
| onAddRow | 行添加事件 | `(row: E) => void` | `undefined` | 否 |
| onSortChange | 排序变更事件 | `(sort?: QuerySort) => void` | `undefined` | 否 |
| onDisable | 禁用事件 | `(row: E) => void` | `undefined` | 否 |
| onEnable | 启用事件 | `(row: E) => void` | `undefined` | 否 |
| onSearch | 搜索事件 | `(request: QueryRequestPage<E>) => void` | `undefined` | 否 |
| isTree | 是否树形表格 | `boolean` | `false` | 否 |

## Emits

无（通过 Props 回调）

## Slots

| 插槽名 | 说明 | 作用域参数 |
| ------ | ---- | ---------- |
| 自定义列插槽 | 自定义列显示 | `{ data: E, index: number }` |
| customRow | 自定义行操作 | `{ data: E }` |

## 示例

```vue
<template>
  <!-- 基础用法 -->
  <ATable
    :entity="User"
    :service="UserService"
    :data-list="userList"
  />

  <!-- 带搜索和分页 -->
  <ATable
    :entity="User"
    :service="UserService"
    :search-params="searchParams"
    @search="handleSearch"
  />

  <!-- 多选 -->
  <ATable
    :entity="User"
    :service="UserService"
    show-select
    :select-list="selectedList"
    @selected="handleSelected"
  />

  <!-- 自定义列 -->
  <ATable
    :entity="User"
    :service="UserService"
  >
    <template #status="{ data }">
      <ElTag :type="data.enabled ? 'success' : 'danger'">
        {{ data.enabled ? '启用' : '禁用' }}
      </ElTag>
    </template>
  </ATable>

  <!-- 自定义操作 -->
  <ATable
    :entity="User"
    :service="UserService"
    hide-edit
    hide-delete
    :on-add="handleAdd"
    :on-edit="handleEdit"
    :on-delete="handleDelete"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { User } from '@/model/User'
import { UserService } from '@/service/UserService'

const userList = ref([])
const selectedList = ref([])

function handleSearch(request: QueryRequestPage<User>) {
  // 搜索逻辑
}

function handleSelected(list: User[]) {
  selectedList.value = list
}

function handleAdd() {
  // 添加逻辑
}

function handleEdit(row: User) {
  // 编辑逻辑
}

function handleDelete(row: User) {
  // 删除逻辑
}
</script>
```

## 注意事项

- `entity`、`service`、`useHook` 三者必须传入一个
- 支持所有 `@Table` 装饰器配置
- 支持字段缓存（通过 `fieldCacheKey` 配置）
- 支持树形表格（通过 `isTree` 配置）
- 支持导入/导出功能
- 支持权限控制
