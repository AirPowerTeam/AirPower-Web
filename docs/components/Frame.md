# Frame 框架

页面布局框架组件，包含顶部导航、左侧菜单和主内容区。

## 引入

```typescript
import { AFrame } from '@airpower/web'
```

## Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
| ---- | ---- | ---- | ------ | ---- |
| menuWidth | 左侧菜单宽度 | `number` | `220` | 否 |
| menuList | 菜单列表，需为 IMenu 实现类数组 | `IMenu[]` | `[]` | 否 |
| uniqueOpened | 是否只保持展开一个菜单 | `boolean` | `false` | 否 |
| hideMenu | 是否隐藏菜单 | `boolean` | `false` | 否 |
| headerHeight | 头部高度 | `number` | `40` | 否 |

## Emits

无

## Slots

| 插槽名 | 说明 | 作用域参数 |
| ------ | ---- | ---------- |
| logo | 顶部 Logo 区域 | - |
| navigator | 顶部导航区域 | - |
| user | 顶部用户区域 | - |
| default | 主内容区域 | - |

## 示例

```vue
<template>
  <AFrame
    :menu-list="menuList"
    :unique-opened="true"
  >
    <!-- 自定义 Logo -->
    <template #logo>
      <img src="/logo.png" alt="Logo" />
    </template>

    <!-- 顶部导航 -->
    <template #navigator>
      <span>当前位置：首页 / 用户管理</span>
    </template>

    <!-- 用户区域 -->
    <template #user>
      <AUser :user="currentUser" />
    </template>

    <!-- 主内容 -->
    <router-view />
  </AFrame>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const menuList = ref([
  {
    id: '1',
    name: '用户管理',
    path: '/user',
    icon: 'icon-user',
    children: []
  }
])

const currentUser = ref({...})
</script>
```

## 注意事项

- 菜单列表需实现 `IMenu` 接口
- 菜单支持多级嵌套，会自动渲染子菜单
- 左侧菜单支持 Loading 状态
- 组件自动固定定位填充整个页面
