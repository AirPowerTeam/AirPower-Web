# Button 按钮

封装 Element Plus 按钮，支持权限控制、多种类型和预设图标。

## 引入

```typescript
import { AButton } from '@airpower/web'
```

## Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
| ---- | ---- | ---- | ------ | ---- |
| permission | 权限标识，无权限时禁用按钮 | `string` | `undefined` | 否 |
| link | 是否是链接按钮 | `boolean` | `false` | 否 |
| primary | 是否是主按钮 | `boolean` | `false` | 否 |
| danger | 是否是危险按钮 | `boolean` | `false` | 否 |
| warning | 是否是警告按钮 | `boolean` | `false` | 否 |
| success | 是否是成功按钮 | `boolean` | `false` | 否 |
| disabled | 是否禁用按钮，如不禁用且传入 permission 则按权限判断 | `boolean` | `false` | 否 |
| icon | 图标，支持预设图标类型 | `ButtonIcon` | `''` | 否 |

### ButtonIcon 类型

```typescript
type ButtonIcon = 
  | 'ADD' | 'CLOCK' | 'EDIT' | 'DELETE' | 'COPY' 
  | 'SETTING' | 'IMPORT' | 'EXPORT' | 'UPLOAD' 
  | 'CHECK' | 'FILTER'
```

## Emits

无（通过 `$attrs` 透传给 ElButton/ElLink）

## Slots

| 插槽名 | 说明 | 作用域参数 |
| ------ | ---- | ---------- |
| default | 按钮内容 | - |

## 示例

```vue
<template>
  <!-- 普通按钮 -->
  <AButton primary @click="handleClick">
    确定
  </AButton>

  <!-- 链接按钮 -->
  <AButton link @click="handleClick">
    查看详情
  </AButton>

  <!-- 带图标的按钮 -->
  <AButton primary icon="ADD">
    添加
  </AButton>

  <!-- 带权限控制的按钮 -->
  <AButton primary permission="user:add">
    添加用户
  </AButton>

  <!-- 危险按钮 -->
  <AButton danger icon="DELETE">
    删除
  </AButton>
</template>
```

## 注意事项

- 组件会自动根据 `permission` 和当前用户权限判断是否禁用按钮
- 如无权限会在控制台输出警告信息
- 支持所有 Element Plus Button/Link 的原生属性和事件（通过 `$attrs` 透传）
- 预设图标会自动映射到 Element Plus 的图标组件
