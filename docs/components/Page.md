# Page 分页

分页组件，支持页码快捷选择、跳转等功能。

## 引入

```typescript
import { APage } from '@airpower/web'
```

## Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
| ---- | ---- | ---- | ------ | ---- |
| response | 分页响应对象 | `QueryResponsePage<E>` | - | 是 |

## Emits

| 事件名 | 说明 | 回调参数 |
| ------ | ---- | -------- |
| change | 分页变化 | `(page: QueryPage) => void` |

## Slots

无

## 示例

```vue
<template>
  <APage 
    :response="response"
    @change="handlePageChange"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QueryResponsePage } from '@airpower/web'

const response = ref(new QueryResponsePage())

function handlePageChange(page: QueryPage) {
  console.log('页码:', page.pageNum)
  console.log('每页数量:', page.pageSize)
  // 加载数据
}
</script>
```

## 注意事项

- 需传入 `QueryResponsePage` 类型的响应对象
- 点击页码区域会弹出页码选择面板
- 支持快捷页码选择和页码跳转
- 支持修改每页数量
- 页码变化时会触发 `change` 事件
