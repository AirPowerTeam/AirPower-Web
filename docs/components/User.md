# User 用户

用户信息组件，显示用户头像和弹窗面板。

## 引入

```typescript
import { AUser } from '@airpower/web'
```

## Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
| ---- | ---- | ---- | ------ | ---- |
| user | 用户信息 | `IUser` | - | 是 |
| width | 弹窗宽度 | `number` | `400` | 否 |
| height | 弹窗高度 | `number` | `300` | 否 |

## Emits

无

## Slots

| 插槽名 | 说明 | 作用域参数 |
| ------ | ---- | ---------- |
| default | 用户弹窗内容 | - |
| title | 用户弹窗标题 | - |

## 示例

```vue
<template>
  <!-- 基础用法 -->
  <AUser :user="currentUser" />

  <!-- 自定义尺寸 -->
  <AUser 
    :user="currentUser"
    :width="500"
    :height="400"
  />

  <!-- 自定义内容 -->
  <AUser :user="currentUser">
    <div>
      <p>姓名：{{ currentUser.nickname }}</p>
      <p>邮箱：{{ currentUser.email }}</p>
    </div>
  </AUser>

  <!-- 自定义标题 -->
  <AUser :user="currentUser">
    <template #title>
      <span>{{ currentUser.nickname }}</span>
      <ElTag>管理员</ElTag>
    </template>
  </AUser>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IUser } from '@airpower/web'

const currentUser = ref<IUser>({
  id: 1,
  nickname: '管理员',
  email: 'admin@example.com',
  avatar: '/avatar.jpg'
})
</script>
```

## 注意事项

- 点击用户头像会弹出用户面板
- 用户面板包含退出登录按钮
- 点击遮罩层可关闭弹窗
- 如无头像会显示默认头像
- 支持自定义弹窗内容
