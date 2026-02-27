# ColumnSelector 列选择器

表格列选择器组件，用于控制表格列的显示/隐藏。

## 引入

```typescript
import { ColumnSelector } from '@airpower/web'
```

## Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
| ---- | ---- | ---- | ------ | ---- |
| columnList | 列配置列表 | `ITableColumn<E>[]` | - | 是 |
| entityClass | 实体类 | `ITransformerConstructor<E>` | - | 是 |

## Emits

| 事件名 | 说明 | 回调参数 |
| ------ | ---- | -------- |
| change | 列选择变化 | `(keys: string[]) => void` |

## Slots

无

## 示例

```vue
<template>
  <ColumnSelector
    :column-list="columnList"
    :entity-class="User"
    @change="handleColumnChange"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { User } from '@/model/User'
import { ITableColumn } from '@airpower/web'

const columnList = ref<ITableColumn<User>[]>([
  { key: 'id', label: 'ID' },
  { key: 'name', label: '姓名' },
  { key: 'email', label: '邮箱' }
])

function handleColumnChange(keys: string[]) {
  console.log('显示的列:', keys)
}
</script>
```

## 注意事项

- 点击按钮会弹出列选择面板
- 被标记为 `force` 的列不允许隐藏
- 选择变化时会触发 `change` 事件，返回当前选中的列 key 数组
- 组件会自动读取实体类的 `@Table` 配置
