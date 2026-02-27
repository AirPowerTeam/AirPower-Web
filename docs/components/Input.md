# Input 输入框

通用输入框组件，支持多种输入类型和自动配置。

## 引入

```typescript
import { AInput } from '@airpower/web'
```

## Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
| ---- | ---- | ---- | ------ | ---- |
| modelValue | 绑定值 | `string \| boolean \| number \| Array \| Object` | `undefined` | 否 |
| modelModifiers | v-model 修饰符 | `Object` | `{}` | 否 |
| modifier | 字段名（循环时必传） | `string` | `undefined` | 否 |
| disabled | 是否禁用输入 | `boolean` | `false` | 否 |
| readonly | 是否只读 | `boolean` | `false` | 否 |
| disabledValue | 禁用时显示的值 | `string \| boolean \| number \| Array \| Object` | `undefined` | 否 |
| dateShowFormatter | 显示的格式化方式 | `string` | `undefined` | 否 |
| entity | 传入的实体类 | `ITransformerConstructor<E>` | `undefined` | 否 |
| placeholder | 自定义提示文字 | `string` | `''` | 否 |
| list | 可选数组（枚举） | `IEnum[]` | `undefined` | 否 |
| tree | 可选树结构 | `ITree[]` | `undefined` | 否 |
| showClear | 是否显示清空图标 | `boolean` | `false` | 否 |
| onSearch | 远程搜索回调方法 | `Function` | `null` | 否 |

## Emits

| 事件名 | 说明 | 回调参数 |
| ------ | ---- | -------- |
| blur | 失焦 | `() => void` |
| focus | 聚焦 | `() => void` |
| change | 值变化 | `(value: any) => void` |
| update:modelValue | v-model 更新 | `(value: any) => void` |
| clear | 清空 | `() => void` |

## Slots

| 插槽名 | 说明 | 作用域参数 |
| ------ | ---- | ---------- |
| append | 后置内容 | - |
| suffix | 后缀图标 | - |
| prefix | 前缀图标 | - |

## 示例

```vue
<template>
  <!-- 基础输入 -->
  <AInput v-model="value" />

  <!-- 数字输入 -->
  <AInput 
    v-model="age"
    :entity="User"
    modifier="age"
  />

  <!-- 日期选择 -->
  <AInput 
    v-model="date"
    :entity="User"
    modifier="birthday"
  />

  <!-- 下拉选择 -->
  <AInput 
    v-model="role"
    :list="roleList"
  />

  <!-- 树形选择 -->
  <AInput 
    v-model="deptId"
    :tree="departmentTree"
  />

  <!-- 开关 -->
  <AInput 
    v-model="enabled"
    :entity="User"
    modifier="enabled"
  />

  <!-- 远程搜索 -->
  <AInput 
    v-model="keyword"
    :on-search="handleRemoteSearch"
  />

  <!-- 自定义插槽 -->
  <AInput v-model="value">
    <template #append>
      <span>元</span>
    </template>
  </AInput>
</template>

<script setup lang="ts">
const value = ref('')
const age = ref(0)
const date = ref(Date.now())
const role = ref('')
const deptId = ref('')
const enabled = ref(false)
const keyword = ref('')

const roleList = ref([...])
const departmentTree = ref([...])

function handleRemoteSearch(query: string) {
  // 远程搜索逻辑
}
</script>
```

## 注意事项

- 组件会根据 `@Form` 装饰器配置自动选择输入类型
- 支持文本、数字、日期、开关、单选、多选、下拉、级联等类型
- 数字输入会自动处理边界值和精度
- 日期输入支持多种格式化方式
- 远程搜索需传入 `onSearch` 回调函数
