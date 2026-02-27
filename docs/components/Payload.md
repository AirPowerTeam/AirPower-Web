# Payload 负载

负载对象显示组件，点击可弹窗查看详情。

## 引入

```typescript
import { APayload } from '@airpower/web'
```

## Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
| ---- | ---- | ---- | ------ | ---- |
| payload | 负载对象，需实现 IPayload 接口 | `IPayload & RootEntity` | - | 是 |
| view | 视图文件组件 | `Component` | `undefined` | 否 |

## Emits

无

## Slots

无

## 示例

```vue
<template>
  <!-- 基础用法 -->
  <APayload :payload="userPayload" />

  <!-- 带详情弹窗 -->
  <APayload 
    :payload="userPayload"
    :view="UserDetail"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UserPayload } from '@/model/UserPayload'
import UserDetail from '@/views/user/UserDetail.vue'

const userPayload = ref(new UserPayload())
</script>
```

## 注意事项

- `payload` 对象需实现 `IPayload` 接口的 `getPayloadLabel()` 方法
- 传入 `view` 组件后，点击会弹窗显示详情
- 详情弹窗会使用 `payload.copy()` 传递数据
- 如无 `payload` 或 `getPayloadLabel()` 抛出异常，显示 `-`
