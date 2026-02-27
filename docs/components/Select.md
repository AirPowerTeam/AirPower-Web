# Select 选择器

数据选择器组件，支持单选/多选、搜索、快捷添加等功能。

## 引入

```typescript
import { ASelect } from '@airpower/web'
```

## Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
| ---- | ---- | ---- | ------ | ---- |
| entity | 选择器使用的实体类 | `ITransformerConstructor<E>` | - | 是 |
| service | 选择器使用的服务类 | `CurdServiceConstructor<E, S>` | - | 是 |
| addPermission | 添加按钮的权限标识 | `string` | `undefined` | 否 |
| columnList | 表格字段列表 | `ITableColumn<E>[]` | `undefined` | 否 |
| editor | 编辑器组件（用于快捷添加） | `Component` | `undefined` | 否 |
| searchParams | 搜索字段列表 | `ISearchField[]` | `undefined` | 否 |
| width | 选择器宽度 | `string` | `undefined` | 否 |
| height | 选择器高度 | `string` | `undefined` | 否 |
| title | 选择器标题 | `string` | `undefined` | 否 |
| unPaginate | 不分页 | `boolean` | `undefined` | 否 |
| treeList | 请求树形接口 | `boolean` | `undefined` | 否 |
| hideAdd | 隐藏添加按钮 | `boolean` | `undefined` | 否 |
| beforeSearch | 搜索前的拦截方法 | `(requestData: QueryRequestPage<E>) => QueryRequestPage<E> \| void` | `undefined` | 否 |
| props | Props 参数对象 | `SelectorProps` | - | 是 |

### props 参数对象

| 参数 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ------ |
| param | 查询参数 | `any` | `undefined` |
| isMultiple | 是否多选 | `boolean` | `false` |
| selectList | 已选中的列表 | `E[]` | `[]` |
| onConfirm | 确认按钮回调 | `(data?: E \| E[]) => void` | - |
| onCancel | 取消按钮回调 | `() => void` | - |

## Emits

无（通过 props 回调）

## Slots

| 插槽名 | 说明 | 作用域参数 |
| ------ | ---- | ---------- |
| 自定义列插槽 | 自定义列显示 | `{ data: E, index: number }` |
| customRow | 自定义行操作（单选模式） | `{ data: E }` |

## 示例

```vue
<template>
  <!-- 单选 -->
  <ASelect
    :entity="User"
    :service="UserService"
    :props="{
      isMultiple: false,
      onConfirm: handleConfirm,
      onCancel: handleCancel
    }"
  />

  <!-- 多选 -->
  <ASelect
    :entity="User"
    :service="UserService"
    :props="{
      isMultiple: true,
      selectList: selectedList,
      onConfirm: handleConfirm,
      onCancel: handleCancel
    }"
  />

  <!-- 带查询参数 -->
  <ASelect
    :entity="User"
    :service="UserService"
    :props="{
      param: { departmentId: 1 },
      isMultiple: false,
      onConfirm: handleConfirm,
      onCancel: handleCancel
    }"
  />

  <!-- 带编辑器 -->
  <ASelect
    :entity="User"
    :service="UserService"
    :editor="UserEditor"
    :props="{
      isMultiple: false,
      onConfirm: handleConfirm,
      onCancel: handleCancel
    }"
  />

  <!-- 自定义列 -->
  <ASelect
    :entity="User"
    :service="UserService"
    :column-list="customColumns"
    :props="{
      isMultiple: false,
      onConfirm: handleConfirm,
      onCancel: handleCancel
    }"
  >
    <template #status="{ data }">
      <ElTag :type="data.enabled ? 'success' : 'danger'">
        {{ data.enabled ? '启用' : '禁用' }}
      </ElTag>
    </template>
  </ASelect>
</template>

<script setup lang="ts">
import { User } from '@/model/User'
import { UserService } from '@/service/UserService'
import UserEditor from '@/views/user/UserEditor.vue'

const selectedList = ref([])

function handleConfirm(data: User | User[]) {
  console.log('选中:', data)
}

function handleCancel() {
  console.log('取消')
}
</script>
```

## 注意事项

- 必须传入 `entity` 和 `service`
- 单选模式下会显示"选择"链接，多选模式下使用底部确认按钮
- 支持所有 `ATable` 的功能和配置
- 可通过插槽自定义列显示
