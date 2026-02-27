# Empty 空状态

空状态展示组件，使用自定义空状态图片。

## 引入

```typescript
import { AEmpty } from '@airpower/web'
```

## Props

无

## Emits

无

## Slots

| 插槽名 | 说明 | 作用域参数 |
| ------ | ---- | ---------- |
| default | 空状态描述文字 | - |
| footer | 底部操作区域 | - |

## 示例

```vue
<template>
  <!-- 基础用法 -->
  <AEmpty />

  <!-- 自定义描述 -->
  <AEmpty>
    暂无数据
  </AEmpty>

  <!-- 带操作按钮 -->
  <AEmpty>
    暂无数据
    <template #footer>
      <AButton primary @click="handleRefresh">
        刷新
      </AButton>
    </template>
  </AEmpty>
</template>
```

## 注意事项

- 组件使用自定义的空状态图片
- 图片尺寸为 80x80px
- 组件自动绝对定位填充父容器
- 支持所有 Element Plus Empty 的原生属性和事件（通过 `$attrs` 透传）
