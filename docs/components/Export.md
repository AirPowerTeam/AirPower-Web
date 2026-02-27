# Export 导出

导出任务弹窗组件，显示导出进度和下载链接。

## 引入

```typescript
import { Export } from '@airpower/web'
```

## Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
| ---- | ---- | ---- | ------ | ---- |
| ...DialogProps | 继承 Dialog 的所有 Props | - | - | 否 |
| param | 导出参数（ExportModel） | `ExportModel` | - | 是 |

### ExportModel 参数

| 参数 | 说明 | 类型 |
| ---- | ---- | ---- |
| createExportTaskUrl | 创建导出任务接口 | `string` |
| queryExportUrl | 查询导出结果接口 | `string` |
| param | 导出请求参数 | `any` |

## Emits

继承 Dialog 的所有 Emits

## Slots

无

## 示例

```vue
<template>
  <!-- 通常通过 DialogUtil 调用 -->
  <Export 
    :param="exportModel"
    @cancel="handleCancel"
    @confirm="handleConfirm"
  />
</template>

<script setup lang="ts">
import { ExportModel } from '@airpower/web'
import { DialogUtil } from '@airpower/web'

const exportModel = new ExportModel()
exportModel.createExportTaskUrl = '/api/export/create'
exportModel.queryExportUrl = '/api/export/query'
exportModel.param = {
  // 导出参数
}

// 通过工具类调用
function startExport() {
  DialogUtil.createExportTask(exportModel)
}

function handleCancel() {
  console.log('取消导出')
}

function handleConfirm(filePath: string) {
  console.log('导出完成，文件路径:', filePath)
}
</script>
```

## 注意事项

- 此组件通常通过 `DialogUtil.createExportTask()` 调用
- 组件会自动轮询导出任务状态
- 导出完成后显示下载按钮
- 关闭弹窗时会询问是否取消导出
- 轮询间隔为 1 秒
