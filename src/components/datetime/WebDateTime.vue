<script lang="ts" setup>
import { DateTimeFormatter, DateTimeUtil } from '@airpower/core'
import { computed } from 'vue'
import { WebButton } from '../button'

const props = defineProps({
  /**
   * # 毫秒时间戳
   */
  milliSecond: {
    type: Number,
    default: undefined,
  },

  /**
   * # 时间日期对象
   */
  date: {
    type: Date,
    default: new Date(),
  },

  /**
   * # 时间格式化模板
   * 建议使用 `AirDateTimeFormatter`
   */
  formatter: {
    type: DateTimeFormatter,
    default: DateTimeFormatter.FULL_DATE_TIME,
  },

  /**
   * # 是否显示友好时间
   */
  isFriendly: {
    type: Boolean,
    default: false,
  },
})

/**
 * # 读取友好时间
 */
const getDateTimeString = computed(() => {
  if (!props.milliSecond && !props.date) {
    return '-'
  }
  if (props.isFriendly) {
    if (props.milliSecond) {
      return DateTimeUtil.getFriendlyDateTime(props.milliSecond)
    }
    if (props.date) {
      return DateTimeUtil.getFriendlyDateTime(props.date)
    }
    return '未知时间'
  }
  if (props.milliSecond) {
    return props.formatter.formatMilliSecond(props.milliSecond)
  }
  if (props.date) {
    return props.formatter.formatDate(props.date)
  }
  return '-'
})
</script>

<template>
  <WebButton icon="CLOCK" link>
    {{ getDateTimeString }}
  </WebButton>
</template>

<style lang="scss" scoped>
.web-friend-datetime,
.web-friend-datetime * {
  user-select: none !important;
}
</style>
