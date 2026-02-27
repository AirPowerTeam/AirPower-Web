# Desensitize 脱敏

数据脱敏显示，支持点击切换显示/隐藏真实数据。

## 引入

```typescript
import { ADesensitize } from '@airpower/web'
```

## Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
| ---- | ---- | ---- | ------ | ---- |
| content | 要脱敏的内容 | `string` | - | 是 |
| type | 脱敏类型 | `DesensitizeType` | `DesensitizeType.CUSTOM` | 否 |
| head | 脱敏开始保留位数 | `number` | `0` | 否 |
| tail | 脱敏末尾保留位数 | `number` | `0` | 否 |
| symbol | 脱敏替换符号 | `string` | `undefined` | 否 |

## Emits

无

## Slots

无

## 示例

```vue
<template>
  <!-- 手机号脱敏 -->
  <ADesensitize 
    content="13800138000" 
    :type="DesensitizeType.MOBILE_PHONE" 
  />

  <!-- 身份证脱敏 -->
  <ADesensitize 
    content="110101199001011234" 
    :type="DesensitizeType.ID_CARD" 
  />

  <!-- 自定义脱敏 -->
  <ADesensitize 
    content="敏感信息" 
    :type="DesensitizeType.CUSTOM"
    :head="2"
    :tail="2"
    symbol="*"
  />
</template>

<script setup lang="ts">
import { DesensitizeType } from '@airpower/util'
</script>
```

## 注意事项

- 点击脱敏图标可切换显示真实数据/脱敏数据
- 脱敏时图标显示红色，正常显示灰色
- 支持所有 `DesensitizeType` 预设类型
- 如 `content` 为空，显示 `-`
