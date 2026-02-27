# EnumColumn 枚举列

表格枚举列组件，用于显示带颜色标记的枚举值。

## 引入

```typescript
import { EnumColumn } from '@airpower/web'
```

## Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
| ---- | ---- | ---- | ------ | ---- |
| column | 列配置 | `ITableColumn<E>` | - | 是 |
| data | 行数据 | `E` | - | 是 |
| dictionary | 枚举类 | `WebEnumConstructor` | - | 是 |

## Emits

无

## Slots

无

## 示例

```vue
<!-- 此组件为 ATable 内部使用 -->
<template>
  <EnumColumn 
    :column="column"
    :data="rowData"
    :dictionary="UserStatus"
  />
</template>

<script setup lang="ts">
import { ITableColumn } from '@airpower/web'
import { UserStatus } from '@/enum/UserStatus'

const column = {
  key: 'status',
  label: '状态',
  color: true
}

const rowData = {
  id: 1,
  status: 1 // 启用
}
</script>
```

## 注意事项

- 此组件为 `ATable` 内部使用的组件
- 如列配置了 `color: true`，会显示颜色标记点
- 颜色来自枚举定义的 `color` 属性
- 空值显示 `column.emptyValue` 或枚举的默认标签
