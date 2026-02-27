# Menu 菜单

导航菜单组件，支持多级菜单和路由联动。

## 引入

```typescript
import { AMenu } from '@airpower/web'
```

## Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
| ---- | ---- | ---- | ------ | ---- |
| menuList | 菜单列表，需为 IMenu 实现类数组 | `IMenu[]` | - | 是 |
| uniqueOpened | 是否只保持展开一个菜单 | `boolean` | `false` | 否 |

## Emits

无

## Slots

无

## 示例

```vue
<template>
  <!-- 基础用法 -->
  <AMenu :menu-list="menuList" />

  <!-- 手风琴模式 -->
  <AMenu 
    :menu-list="menuList"
    :unique-opened="true"
  />
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

- 菜单会自动根据当前路由高亮对应菜单项
- 菜单项需实现 `IMenu` 接口
- 支持多级菜单嵌套
- 被禁用的菜单项不会显示
- 菜单项的 `path` 会作为路由跳转链接
