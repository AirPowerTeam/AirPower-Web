# Group 分组

表单/内容分组容器，支持展开收起、多列布局。

## 引入

```typescript
import { AGroup } from '@airpower/web'
```

## Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
| ---- | ---- | ---- | ------ | ---- |
| minHeight | 最低高度 | `string` | `undefined` | 否 |
| hideTitle | 隐藏标题 | `boolean` | `false` | 否 |
| title | 分组标题 | `string` | `''` | 否 |
| column | 分组列数，配置范围 1~3 | `1 \| 2 \| 3` | `1` | 否 |
| autoHeight | 自适应高度 | `boolean` | `false` | 否 |
| autoCol | 列数自适应 | `boolean` | `false` | 否 |
| disableCollapse | 禁用展开收起 | `boolean` | `false` | 否 |
| collapse | 默认收起 | `boolean` | `false` | 否 |

## Emits

无

## Slots

| 插槽名 | 说明 | 作用域参数 |
| ------ | ---- | ---------- |
| default | 分组内容 | - |
| tips | 标题提示区域 | - |
| custom | 标题自定义区域 | - |

## 示例

```vue
<template>
  <!-- 基础用法 -->
  <AGroup title="基本信息">
    <AFormField field="name" />
    <AFormField field="age" />
  </AGroup>

  <!-- 两列布局 -->
  <AGroup title="详细信息" :column="2">
    <AFormField field="phone" />
    <AFormField field="email" />
    <AFormField field="address" />
    <AFormField field="city" />
  </AGroup>

  <!-- 默认收起 -->
  <AGroup title="高级选项" collapse>
    <AFormField field="remark" />
  </AGroup>

  <!-- 禁用展开收起 -->
  <AGroup title="必填信息" disable-collapse>
    <AFormField field="username" />
  </AGroup>

  <!-- 自定义标题 -->
  <AGroup title="信息">
    <template #tips>
      <ElTooltip content="提示信息">
        <ElIcon><QuestionFilled /></ElIcon>
      </ElTooltip>
    </template>
    <AFormField field="data" />
  </AGroup>

  <!-- 自适应高度 -->
  <AGroup title="内容" auto-height>
    <div>自适应高度内容</div>
  </AGroup>
</template>
```

## 注意事项

- `column` 属性支持 1、2、3 列布局
- `autoCol` 模式下每个子元素最小宽度 320px
- 展开收起功能可通过 `disableCollapse` 禁用
- 自适应高度模式下会填充父容器剩余空间
