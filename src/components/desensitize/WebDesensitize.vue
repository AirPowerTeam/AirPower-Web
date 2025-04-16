<script lang="ts" setup>
import { DesensitizeType, DesensitizeUtil } from '@airpower/core'
import { Hide, View } from '@element-plus/icons-vue'
import { ElIcon } from 'element-plus'
import { computed, ref } from 'vue'

const props = defineProps({
  /**
   * # 复制的内容
   */
  content: {
    type: String,
    required: true,
  },

  /**
   * # 是否脱敏
   */
  type: {
    type: DesensitizeType,
    default: DesensitizeType.CUSTOM,
  },

  /**
   * # 脱敏开始保留
   * 默认使用传入的参数
   */
  head: {
    type: Number,
    default: 0,
  },

  /**
   * # 脱敏末尾保留
   * 默认使用传入的参数
   */
  tail: {
    type: Number,
    default: 0,
  },

  /**
   * # 脱敏符号
   */
  symbol: {
    type: String,
    default: DesensitizeUtil.DEFAULT_MASK,
  },
})

const isDesensitize = ref(true)

/**
 * # 脱敏
 */
const desensitized = computed(() => {
  if (!isDesensitize.value || !props.type) {
    return props.content
  }
  return DesensitizeUtil.desensitize(
    props.content,
    props.type,
    props.head,
    props.tail,
    props.symbol,
  )
})
</script>

<template>
  <div class="web-desensitize">
    <ElIcon
      :class="!isDesensitize ? 'desensitize' : ''"
      class="icon"
      @click.stop="isDesensitize = !isDesensitize"
    >
      <View v-if="isDesensitize" />
      <Hide v-else />
    </ElIcon>
    {{ desensitized || '-' }}
  </div>
</template>

<style lang="scss" scoped>
.web-desensitize {
  display: flex !important;
  flex-direction: row;
  align-items: center;

  .icon {
    margin-right: 3px;
    font-weight: bold;
    cursor: pointer;
  }

  .desensitize {
    color: red;
  }
}
</style>
