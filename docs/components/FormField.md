# FormField 表单字段

表单字段组件，自动绑定实体类字段配置，支持多种输入类型。

## 引入

```typescript
import { AFormField } from '@airpower/web'
```

## Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
| ---- | ---- | ---- | ------ | ---- |
| entity | 实体类，传入表单内容的类型 | `ITransformerConstructor<E>` | `null` | 否 |
| field | 字段名称 | `string` | - | 是 |
| modelValue | 手动绑定的表单对象 | `E` | `null` | 否 |
| disabled | 是否禁用输入 | `boolean` | `false` | 否 |
| readonly | 是否只读 | `boolean` | `false` | 否 |
| disabledValue | 禁用时显示的值 | `string \| boolean \| number \| Array \| Object` | `undefined` | 否 |
| list | 可选数组（枚举） | `IEnum[]` | `undefined` | 否 |
| tree | 可选树结构 | `ITree[]` | `undefined` | 否 |

## Emits

| 事件名 | 说明 | 回调参数 |
| ------ | ---- | -------- |
| change | 值变化 | `(value: E) => void` |
| update:modelValue | v-model 更新 | `(value: E) => void` |
| blur | 失焦 | `() => void` |
| focus | 聚焦 | `() => void` |
| clear | 清空 | `() => void` |

## Slots

| 插槽名 | 说明 | 作用域参数 |
| ------ | ---- | ---------- |
| default | 自定义输入组件，默认使用 AInput | - |

## 示例

```vue
<template>
  <!-- 基础用法 -->
  <AFormField 
    :entity="User" 
    field="username" 
  />

  <!-- 手动绑定表单 -->
  <AFormField 
    v-model="formData"
    :entity="User" 
    field="username" 
  />

  <!-- 禁用状态 -->
  <AFormField 
    :entity="User" 
    field="status"
    disabled
    :disabled-value="1"
  />

  <!-- 使用枚举 -->
  <AFormField 
    :entity="User" 
    field="role"
    :list="roleList"
  />

  <!-- 使用树形选择 -->
  <AFormField 
    :entity="User" 
    field="departmentId"
    :tree="departmentTree"
  />

  <!-- 自定义输入组件 -->
  <AFormField 
    :entity="User" 
    field="description"
  >
    <ElInput 
      v-model="formData.description"
      type="textarea"
    />
  </AFormField>
</template>

<script setup lang="ts">
import { User } from '@/model/User'

const formData = ref(new User())
const roleList = ref([...])
const departmentTree = ref([...])
</script>
```

## 注意事项

- 必须传入 `field` 参数
- 需要配合 `useEditor` 创建的表单对象使用，或手动传入 `entity` 和 `modelValue`
- 会自动读取实体类上的 `@Field` 和 `@Form` 装饰器配置
- 支持所有 `AInput` 的功能和配置
