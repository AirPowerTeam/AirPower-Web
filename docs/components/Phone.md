# Phone 电话

电话号码显示组件，支持脱敏和点击拨打。

## 引入

```typescript
import { APhone } from '@airpower/web'
```

## Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
| ---- | ---- | ---- | ------ | ---- |
| phone | 电话号码 | `string` | - | 是 |
| desensitize | 脱敏类型 | `DesensitizeType` | `undefined` | 否 |
| desensitizeHead | 脱敏开始保留位数 | `number` | `0` | 否 |
| desensitizeTail | 脱敏末尾保留位数 | `number` | `0` | 否 |

## Emits

无

## Slots

无

## 示例

```vue
<template>
  <!-- 基础用法 -->
  <APhone phone="13800138000" />

  <!-- 脱敏显示 -->
  <APhone 
    phone="13800138000"
    :desensitize="DesensitizeType.MOBILE_PHONE"
  />

  <!-- 自定义脱敏 -->
  <APhone 
    phone="13800138000"
    :desensitize="DesensitizeType.CUSTOM"
    :desensitize-head="3"
    :desensitize-tail="4"
  />
</template>

<script setup lang="ts">
import { DesensitizeType } from '@airpower/util'
</script>
```

## 注意事项

- 仅当电话号码格式正确时显示电话图标
- 点击组件会弹出拨打电话弹窗（显示二维码）
- 支持脱敏显示电话号码
- 如 `phone` 为空或格式不正确，显示 `-`
