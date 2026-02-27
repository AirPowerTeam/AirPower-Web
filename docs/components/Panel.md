# Panel 卡片

卡片容器组件，支持标题、全屏等功能。

## 引入

```typescript
import { APanel } from '@airpower/web'
```

## Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
| ---- | ---- | ---- | ------ | ---- |
| title | 卡片标题 | `string` | `''` | 否 |
| description | 描述 | `string` | `''` | 否 |
| showTitle | 是否显示标题 | `boolean` | `true` | 否 |
| hideIcon | 是否显示图标 | `boolean` | `false` | 否 |
| allowFullscreen | 是否允许全屏 | `boolean` | `false` | 否 |

## Emits

无

## Slots

| 插槽名 | 说明 | 作用域参数 |
| ------ | ---- | ---------- |
| default | 卡片内容 | - |
| icon | 标题图标 | - |
| headerRight | 标题右侧区域 | - |

## 示例

```vue
<template>
  <!-- 基础用法 -->
  <APanel title="标题">
    <div>内容</div>
  </APanel>

  <!-- 带图标 -->
  <APanel title="标题">
    <template #icon>
      <ElIcon><User /></ElIcon>
    </template>
    <div>内容</div>
  </APanel>

  <!-- 允许全屏 -->
  <APanel 
    title="标题"
    allow-fullscreen
  >
    <div>内容</div>
  </APanel>

  <!-- 自定义标题右侧 -->
  <APanel title="标题">
    <template #headerRight>
      <AButton size="small">操作</AButton>
    </template>
    <div>内容</div>
  </APanel>

  <!-- 隐藏标题 -->
  <APanel :show-title="false">
    <div>内容</div>
  </APanel>
</template>
```

## 注意事项

- 如未传入 `title`，会尝试从路由 meta 中读取
- 全屏模式下卡片会固定定位覆盖整个页面
- 支持所有 Element Plus 原生属性和事件（通过 `$attrs` 透传）
