<script lang="ts" setup>
import type { PropType } from 'vue'
import type { WebMoneyDirection } from './type'
import { computed } from 'vue'
import { WebConfig } from '../../config'
import { WebCopy } from '../copy'

const props = defineProps({
  /**
   * # 💰金额
   */
  money: {
    type: Number,
    default: 0,
  },

  /**
   * # 💰金额的小数精度
   * 默认为 `WebConfig.moneyPrecision`
   */
  precision: {
    type: Number,
    default: WebConfig.moneyPrecision,
  },

  /**
   * # 💰金额的前缀
   */
  prefix: {
    type: String,
    default: '¥',
  },

  /**
   * # 💰金额的小数舍弃方式
   * 默认为 `WebConfig.moneyDirection`
   */
  direction: {
    type: String as PropType<WebMoneyDirection>,
    default: WebConfig.moneyDirection,
  },
})

/**
 * # 💰显示金额
 */
const showMoney = computed(() => {
  const precision = 10 ** props.precision
  let number = props.money * precision

  if (props.direction === 'up') {
    number = Math.ceil(number)
  }
  else {
    number = Math.floor(number)
  }
  return (number / precision).toFixed(props.precision).toString()
})
</script>

<template>
  <div
    class="web-money"
  >
    <div class="prefix">
      {{ props.prefix }}
    </div>
    <WebCopy :content="showMoney" hide-icon>
      {{ showMoney }}
    </WebCopy>
  </div>
</template>

<style lang="scss" scoped>
.web-money {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
  width: auto;
  flex: none;

  :deep(.el-link__inner) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
  }

  .money {
    font-weight: bold;
  }

  .prefix {
    color: #999;
    font-size: 12px;
  }
}
</style>
