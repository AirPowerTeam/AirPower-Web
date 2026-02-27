# Copy 复制

支持一键复制文本内容到剪贴板，带复制成功提示。

## 引入

```typescript
import { ACopy } from '@airpower/web'
```

## Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
| ---- | ---- | ---- | ------ | ---- |
| content | 要复制的内容 | `string` | - | 是 |
| hideIcon | 是否隐藏复制图标 | `boolean` | `false` | 否 |
| wrap | 是否换行显示 | `boolean` | `undefined` | 否 |

## Emits

无（通过 `$attrs` 透传给 ElLink）

## Slots

| 插槽名 | 说明 | 作用域参数 |
| ------ | ---- | ---------- |
| default | 自定义显示内容，不传则显示 content | - |

## 示例

```vue
<template>
  <!-- 基础用法 -->
  <ACopy content="要复制的文本" />

  <!-- 自定义显示内容 -->
  <ACopy content="实际复制的内容">
    显示的内容
  </ACopy>

  <!-- 隐藏图标 -->
  <ACopy content="文本" hide-icon />

  <!-- 允许换行 -->
  <ACopy content="长文本内容" wrap />
</template>
```

## 注意事项

- 点击组件会自动复制 `content` 到剪贴板
- 复制成功后会显示 Toast 提示
- 支持所有 Element Plus Link 的原生属性和事件（通过 `$attrs` 透传）
- 如 `content` 为空，插槽默认显示 `-`
