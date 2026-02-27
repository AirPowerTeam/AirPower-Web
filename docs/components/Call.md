# Call 拨打电话

拨打电话弹窗组件，显示电话号码和二维码。

## 引入

```typescript
import { ACall } from '@airpower/web'
```

## Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
| ---- | ---- | ---- | ------ | ---- |
| ...DialogProps | 继承 Dialog 的所有 Props | - | - | 否 |
| param | 电话号码 | `string` | `''` | 否 |
| tips | 提示信息 | `string` | `'请使用手机自带的相机扫码'` | 否 |

## Emits

继承 Dialog 的所有 Emits

## Slots

无

## 示例

```vue
<template>
  <!-- 通常通过 DialogUtil 调用 -->
  <ACall 
    :param="phoneNumber"
    @cancel="handleCancel"
  />
</template>

<script setup lang="ts">
import { DialogUtil } from '@airpower/web'

const phoneNumber = '13800138000'

// 通过工具类调用
async function showCallDialog() {
  await DialogUtil.show(ACall, phoneNumber)
}
</script>
```

## 注意事项

- 此组件通常通过 `DialogUtil.show()` 调用
- 弹窗会显示电话号码的二维码
- 支持复制电话号码
- 弹窗最小宽度 250px，最小高度 200px
