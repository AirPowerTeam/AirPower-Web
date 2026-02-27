# Money 金额

金额显示组件，支持格式化、复制等功能。

## 引入

```typescript
import { AMoney } from '@airpower/web'
```

## Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
| ---- | ---- | ---- | ------ | ---- |
| money | 金额 | `number` | `0` | 否 |
| precision | 小数精度 | `number` | `WebConfig.moneyPrecision` | 否 |
| prefix | 金额前缀符号 | `string` | `'¥'` | 否 |
| direction | 小数舍弃方式 | `'up' \| 'down'` | `WebConfig.moneyDirection` | 否 |

## Emits

无

## Slots

无

## 示例

```vue
<template>
  <!-- 基础用法 -->
  <AMoney :money="1234.567" />

  <!-- 自定义精度 -->
  <AMoney 
    :money="1234.567"
    :precision="3"
  />

  <!-- 自定义前缀 -->
  <AMoney 
    :money="100"
    prefix="$"
  />

  <!-- 向上取整 -->
  <AMoney 
    :money="1234.567"
    direction="up"
  />

  <!-- 向下取整 -->
  <AMoney 
    :money="1234.567"
    direction="down"
  />
</template>
```

## 注意事项

- 金额会自动进行格式化显示
- 支持点击复制金额（使用 `ACopy` 组件）
- 默认精度由 `WebConfig.moneyPrecision` 配置
- 支持向上/向下取整处理小数
