<script lang="ts" setup>
import { WarningFilled } from '@element-plus/icons-vue'
import { ACopy, ADialog, AQrcode } from '..'
import { DialogProps } from '../../dialog/DialogProps'

const props = defineProps({
  ...DialogProps.withParam(''),

  /**
   * ### 💡提示
   */
  tips: {
    type: String,
    default: '请使用手机自带的相机扫码',
  },
})

const content = `tel:${props.param}`
</script>

<template>
  <ADialog
    class="a-phone-call"
    hide-footer
    hide-fullscreen
    min-height="200px"
    min-width="250px"
    title="拨打电话"
    @cancel="onCancel()"
  >
    <div class="a-phone-call__content">
      <AQrcode
        :content="content"
        :size="160"
      />
      <ACopy
        :content="param"
      >
        {{ param }}
      </ACopy>
      <span><el-icon class="icon"> <WarningFilled /> </el-icon>{{ tips }}</span>
    </div>
  </ADialog>
</template>

<style lang="scss" scoped>
.a-phone-call__content {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  > span {
    font-size: 12px;
    color: var(--text-danger-color);
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .icon {
      margin-right: 3px;
    }
  }
}
</style>
