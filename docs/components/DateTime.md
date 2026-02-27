# DateTime 日期时间

显示日期时间，支持友好时间切换显示。

## 引入

```typescript
import { ADateTime } from '@airpower/web'
```

## Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
| ---- | ---- | ---- | ------ | ---- |
| time | 时间日期对象或毫秒时间戳 | `Date \| number` | `undefined` | 否 |
| formatter | 时间格式化模板 | `DateTimeFormatter` | `DateTimeFormatter.FULL_DATE_TIME` | 否 |
| isFriendly | 是否默认显示友好时间（如：3 分钟前） | `boolean` | `false` | 否 |

## Emits

无

## Slots

无

## 示例

```vue
<template>
  <!-- 基础用法 -->
  <ADateTime :time="new Date()" />

  <!-- 毫秒时间戳 -->
  <ADateTime :time="Date.now()" />

  <!-- 友好时间 -->
  <ADateTime :time="new Date()" is-friendly />

  <!-- 自定义格式化 -->
  <ADateTime 
    :time="new Date()" 
    :formatter="DateTimeFormatter.FULL_DATE" 
  />
</template>

<script setup lang="ts">
import { DateTimeFormatter } from '@airpower/util'
</script>
```

## 注意事项

- 点击组件可在格式化时间和友好时间之间切换
- 友好时间格式如：`3 分钟前 `、`2 小时前`、`3 天前` 等
- 如 `time` 为空，显示 `-`
- 支持所有 Element Plus Link 的原生属性和事件
