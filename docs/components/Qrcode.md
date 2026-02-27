# Qrcode 二维码

二维码生成组件。

## 引入

```typescript
import { AQrcode } from '@airpower/web'
```

## Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
| ---- | ---- | ---- | ------ | ---- |
| content | 二维码内容 | `string` | - | 是 |
| size | 二维码尺寸 | `number` | `200` | 否 |

## Emits

无

## Slots

无

## 示例

```vue
<template>
  <!-- 基础用法 -->
  <AQrcode content="https://example.com" />

  <!-- 自定义尺寸 -->
  <AQrcode 
    content="https://example.com"
    :size="300"
  />

  <!-- 动态内容 -->
  <AQrcode 
    :content="qrContent"
    :size="256"
  />
</template>

<script setup lang="ts">
const qrContent = ref('https://example.com')
</script>
```

## 注意事项

- 二维码内容变化时会自动重新生成
- 支持二维码容错率 H（最高）
- 组件有白色背景和圆角边框
- 内容为空时显示 Loading 状态
