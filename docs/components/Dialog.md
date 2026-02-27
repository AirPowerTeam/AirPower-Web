# Dialog 对话框

封装的对话框组件，支持全屏、拖拽、表单验证等功能。

## 引入

```typescript
import { ADialog } from '@airpower/web'
```

## Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
| ---- | ---- | ---- | ------ | ---- |
| title | 弹窗标题 | `string` | - | 是 |
| confirmText | 确定按钮文字 | `string` | `确认` | 否 |
| cancelText | 取消按钮文字 | `string` | `取消` | 否 |
| width | 宽度，支持像素和百分比 | `string` | `''` | 否 |
| height | 高度，支持像素和百分比 | `string` | `''` | 否 |
| minWidth | 最小宽度 | `string` | `500px` | 否 |
| minHeight | 最小高度 | `string` | `300px` | 否 |
| hideButtons | 隐藏底部按钮 | `boolean` | `false` | 否 |
| hideFooter | 隐藏 Footer 区域 | `boolean` | `false` | 否 |
| hideConfirm | 隐藏确认按钮 | `boolean` | `false` | 否 |
| disableConfirm | 禁用确认按钮 | `boolean` | `false` | 否 |
| showCancel | 显示取消按钮 | `boolean` | `false` | 否 |
| hideClose | 隐藏右上角关闭按钮 | `boolean` | `false` | 否 |
| loading | 是否正在 Loading | `boolean` | `false` | 否 |
| hideFullscreen | 隐藏全屏按钮 | `boolean` | `false` | 否 |
| fullScreen | 是否全屏 | `boolean` | `false` | 否 |
| movable | 允许拖拽移动 | `boolean` | `true` | 否 |
| formRef | Form 的 Ref 实例，传入则自动校验 | `FormInstance` | `undefined` | 否 |
| isSelector | 是否是选择器模式 | `boolean` | `false` | 否 |
| hoverClose | 支持点击遮罩层关闭 | `boolean` | `false` | 否 |

## Emits

| 事件名 | 说明 | 回调参数 |
| ------ | ---- | -------- |
| cancel | 取消/关闭弹窗 | - |
| fullscreenChange | 全屏状态变化 | `(isFullScreen: boolean) => void` |
| confirm | 确认按钮点击 | - |

## Slots

| 插槽名 | 说明 | 作用域参数 |
| ------ | ---- | ---------- |
| default | 对话框内容 | - |
| status | 底部左侧状态区域 | - |
| leftCtrl | 底部左侧控制按钮 | - |
| middleButton | 底部中间按钮 | - |

## 示例

```vue
<template>
  <!-- 基础用法 -->
  <ADialog
    title="标题"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  >
    <div>内容</div>
  </ADialog>

  <!-- 表单验证 -->
  <ADialog
    title="表单弹窗"
    :form-ref="formRef"
    @confirm="handleConfirm"
  >
    <ElForm ref="formRef" :model="form">
      <!-- 表单项 -->
    </ElForm>
  </ADialog>

  <!-- 自定义底部 -->
  <ADialog title="标题">
    <div>内容</div>
    <template #status>
      <span>状态信息</span>
    </template>
    <template #leftCtrl>
      <AButton>左侧按钮</AButton>
    </template>
  </ADialog>

  <!-- 选择器模式 -->
  <ADialog
    title="选择器"
    is-selector
    @confirm="handleSelect"
  >
    <!-- 选择器内容 -->
  </ADialog>
</template>
```

## 注意事项

- 支持双击标题栏切换全屏
- 支持拖拽移动（可通过 `movable` 禁用）
- 如传入 `formRef`，点击确认时会自动触发表单验证
- 选择器模式下底部样式会适配分页器
- 支持所有 Element Plus 原生 Dialog 的属性和事件（通过 `$attrs` 透传）
