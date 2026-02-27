# Image 图片

图片显示组件，支持预览、上传、删除等功能。

## 引入

```typescript
import { AImage } from '@airpower/web'
```

## Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
| ---- | ---- | ---- | ------ | ---- |
| src | 图片显示的 URL | `string` | `undefined` | 否 |
| clearable | 是否显示删除图标（仅 upload 时有效） | `boolean` | `true` | 否 |
| placeholder | 提示文本（无图片时显示） | `string` | `undefined` | 否 |
| upload | 允许上传 | `boolean` | `false` | 否 |
| headers | 上传请求头 | `IJson` | `{}` | 否 |
| data | 上传请求数据 | `IJson` | `{}` | 否 |
| showTips | 显示上传提示 | `boolean` | `false` | 否 |
| width | 图片宽度 | `number` | `100` | 否 |
| height | 图片高度 | `number` | `100` | 否 |
| limit | 限制上传大小（字节） | `number` | `3 * 1024 * 1024` | 否 |
| extensions | 允许上传的格式 | `string[]` | `['jpg', 'jpeg', 'png']` | 否 |
| uploadUrl | 上传地址 | `string` | `''` | 否 |
| uploadFileName | 上传文件的字段名 | `string` | `'file'` | 否 |
| entity | 接收的文件实体类 | `ITransformerConstructor<F>` | `undefined` | 否 |

## Emits

| 事件名 | 说明 | 回调参数 |
| ------ | ---- | -------- |
| upload | 上传成功 | `(file: F) => void` |
| remove | 删除成功 | `() => void` |

## Slots

无

## 示例

```vue
<template>
  <!-- 基础显示 -->
  <AImage src="https://example.com/image.jpg" />

  <!-- 自定义尺寸 -->
  <AImage 
    src="https://example.com/image.jpg"
    :width="200"
    :height="150"
  />

  <!-- 支持上传 -->
  <AImage 
    :src="imageUrl"
    upload
    :entity="FileEntity"
    @upload="handleUpload"
    @remove="handleRemove"
  />

  <!-- 自定义上传配置 -->
  <AImage 
    upload
    :entity="FileEntity"
    :upload-url="customUploadUrl"
    :headers="{ token: 'xxx' }"
    :data="{ type: 'avatar' }"
    :limit="5 * 1024 * 1024"
    :extensions="['png', 'jpg']"
  />

  <!-- 自定义提示 -->
  <AImage 
    upload
    :entity="FileEntity"
    placeholder="点击上传头像"
  />
</template>

<script setup lang="ts">
import { FileEntity } from '@/model/FileEntity'

const imageUrl = ref('')

function handleUpload(file: FileEntity) {
  imageUrl.value = file.url
}

function handleRemove() {
  imageUrl.value = ''
}
</script>
```

## 注意事项

- 点击图片可预览大图
- 上传模式下，鼠标悬停显示删除按钮
- 上传前会自动校验文件大小和格式
- 上传成功后会回调 `upload` 事件并传入解析后的实体对象
- 必须传入 `entity` 才能使用上传功能
