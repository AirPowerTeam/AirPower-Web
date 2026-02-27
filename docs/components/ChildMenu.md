# ChildMenu 子菜单

递归菜单组件，用于渲染多级嵌套菜单。

## 引入

```typescript
import { AChildMenu } from '@airpower/web'
```

## Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
| ---- | ---- | ---- | ------ | ---- |
| menuList | 菜单列表，需为 IMenu 实现类数组 | `IMenu[]` | - | 是 |

## Emits

无

## Slots

无

## 示例

```vue
<template>
  <!-- 通常与 AMenu 配合使用 -->
  <AMenu :menu-list="menuList" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const menuList = ref([
  {
    id: '1',
    name: '用户管理',
    path: '/user',
    icon: 'icon-user',
    isDisabled: false,
    children: [
      {
        id: '1-1',
        name: '用户列表',
        path: '/user/list',
        icon: 'icon-list',
        isDisabled: false,
        children: []
      }
    ]
  }
])
</script>
```

## 注意事项

- 此组件通常不直接使用，而是通过 `AMenu` 组件内部调用
- 菜单项需实现 `IMenu` 接口
- 支持无限级菜单嵌套
- 被禁用的菜单项（`isDisabled: true`）不会显示
