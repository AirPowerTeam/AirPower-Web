<script lang="ts" setup>
import useClipboard from 'vue-clipboard3'
import { WebI18n } from '../../i18n'
import { FeedbackUtil } from '../../util/feedback'
import { WebButton } from '../button'

const props = defineProps({
  /**
   * # 复制的内容
   */
  content: {
    type: String,
    required: true,
  },

  hideIcon: {
    type: Boolean,
    default: false,
  },
})
const { toClipboard } = useClipboard()

/**
 * 复制事件
 */
async function copy() {
  if (!props.content) {
    return
  }
  await toClipboard(props.content.toString())
  FeedbackUtil.toastSuccess(WebI18n.get().CopySuccess)
}
</script>

<template>
  <div class="web-copy">
    <WebButton
      :icon="hideIcon ? '' : 'COPY'"
      link
      v-bind="$attrs"
      @click="copy"
      v-on="$attrs"
    >
      <slot>{{ content || '-' }}</slot>
    </WebButton>
  </div>
</template>

<style lang="scss" scoped>
.web-copy {
  font-size: inherit;
  color: inherit;
  display: flex;
  flex-direction: row;
  align-items: center;

  ::v-deep(.el-link__inner) {
    flex: 1;
  }

  .el-button.is-link {
    font-size: inherit;
    padding: 0;
    font-weight: bold;
  }
}
</style>
