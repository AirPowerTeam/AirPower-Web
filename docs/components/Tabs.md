# Tabs 标签页容器

标签页容器组件，用于包裹多个 Tab。

## 引入

```typescript
import { ATabs } from '@airpower/web'
```

## Props

无

## Emits

无

## Slots

| 插槽名 | 说明 | 作用域参数 |
| ------ | ---- | ---------- |
| default | ATab 组件列表 | - |

## 示例

```vue
<template>
  <ATabs>
    <ATab label="用户信息">
      <div>用户信息内容</div>
    </ATab>
    <ATab label="订单信息">
      <div>订单信息内容</div>
    </ATab>
  </ATabs>
</template>
```

## 注意事项

- 必须与 `ATab` 组件配合使用
- 使用 Element Plus border-card 风格
- 容器会自动填充父容器高度
- 支持所有 Element Plus Tabs 的原生属性和事件（通过 `$attrs` 透传）
