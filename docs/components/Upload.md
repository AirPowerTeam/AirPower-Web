# Upload 上传

文件上传弹窗组件，支持拖拽上传、文件校验等功能。

## 引入

```typescript
import { AUpload } from '@airpower/web'
```

## Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
| ---- | ---- | ---- | ------ | ---- |
| onConfirm | 标准确认返回 | `(file: F \| null) => void` | `null` | 否 |
| onCustomConfirm | 自定义确认按钮事件 | `Function` | `null` | 否 |
| onCustomSuccess | 自定义上传成功回调 | `Function` | `null` | 否 |
| onCancel | 标准取消返回 | `Function` | `null` | 否 |
| title | 上传弹窗标题 | `string` | `'文件上传'` | 否 |
| confirmText | 确认按钮文字 | `string` | `undefined` | 否 |
| maxSize | 允许的最大文件大小（字节） | `number` | `10MB` | 否 |
| uploadName | 上传文件字段名 | `string` | `WebConfig.uploadFileName` | 否 |
| uploadSuccess | 上传成功文案 | `string` | `'上传成功'` | 否 |
| uploadUrl | 上传路径 | `string` | `WebConfig.uploadUrl` | 否 |
| extensions | 允许上传的后缀 | `string[]` | `['jpg', 'jpeg', 'png']` | 否 |
| entity | 接收文件的实体类 | `ITransformerConstructor<F>` | - | 是 |
| data | 上传同时发送的数据 | `IJson` | `null` | 否 |
| header | 上传同时发送的 header | `IJson` | `null` | 否 |
| tips | 提示文字 | `string` | `''` | 否 |

## Emits

无（通过 Props 回调）

## Slots

无

## 示例

```vue
<template>
  <!-- 基础用法 -->
  <AUpload
    :entity="FileEntity"
    :on-confirm="handleConfirm"
    :on-cancel="handleCancel"
  />

  <!-- 自定义配置 -->
  <AUpload
    :entity="FileEntity"
    title="上传头像"
    confirm-text="确定"
    :max-size="5 * 1024 * 1024"
    :extensions="['jpg', 'png']"
    :on-confirm="handleConfirm"
    :on-cancel="handleCancel"
  />

  <!-- 自定义上传成功 -->
  <AUpload
    :entity="FileEntity"
    :on-custom-success="handleCustomSuccess"
    :on-cancel="handleCancel"
  />

  <!-- 带额外数据 -->
  <AUpload
    :entity="FileEntity"
    :data="{ type: 'avatar', userId: 1 }"
    :header="{ token: 'xxx' }"
    :on-confirm="handleConfirm"
    :on-cancel="handleCancel"
  />
</template>

<script setup lang="ts">
import { FileEntity } from '@/model/FileEntity'

function handleConfirm(file: FileEntity | null) {
  if (file) {
    console.log('上传成功:', file)
  }
}

function handleCancel() {
  console.log('取消上传')
}

function handleCustomSuccess(result: any) {
  console.log('自定义上传成功:', result)
}
</script>
```

## 注意事项

- 必须传入 `entity` 参数
- 上传前会自动校验文件大小和格式
- 支持拖拽上传
- 上传成功后会自动关闭弹窗
- 可通过 `onCustomSuccess` 自定义上传成功处理逻辑
- 默认最大 10MB，支持自定义
