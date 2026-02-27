# CopyColumn 复制列

表格复制列组件，用于显示可复制的单元格内容。

## 引入

```typescript
import { CopyColumn } from '@airpower/web'
```

## Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
| ---- | ---- | ---- | ------ | ---- |
| column | 列配置 | `ITableColumn<E>` | - | 是 |
| data | 行数据 | `E` | - | 是 |

## Emits

无

## Slots

无

## 示例

```vue
<!-- 此组件为 ATable 内部使用 -->
<template>
  <CopyColumn 
    :column="column"
    :data="rowData"
  />
</template>

<script setup lang="ts">
import { ITableColumn } from '@airpower/web'

const column = {
  key: 'username',
  label: '用户名'
}

const rowData = {
  id: 1,
  username: 'admin'
}
</script>
```

## 注意事项

- 此组件为 `ATable` 内部使用的组件
- 会自动使用 `ACopy` 组件包裹内容
- 如列配置了 `formatter`，会使用 formatter 格式化显示
- 如值为空，显示 `column.emptyValue` 或 `-`
