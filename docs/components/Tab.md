# Tab 标签页

标签页组件，用于分组展示内容。

## 引入

```typescript
import { ATab } from '@airpower/web'
```

## Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
| ---- | ---- | ---- | ------ | ---- |
| label | Tab 标题 | `string` | `'Tab'` | 否 |

## Emits

无

## Slots

| 插槽名 | 说明 | 作用域参数 |
| ------ | ---- | ---------- |
| default | 标签页内容 | - |

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
    <ATab label="设置">
      <div>设置内容</div>
    </ATab>
  </ATabs>
</template>
```

## 注意事项

- 必须与 `ATabs` 组件配合使用
- 支持所有 Element Plus TabPane 的原生属性和事件（通过 `$attrs` 透传）
