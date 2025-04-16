<script generic="E extends Entity" lang="ts" setup>
import type { ClassConstructor, Entity } from '@airpower/core'
import type { PropType } from 'vue'
import type { ITableFieldConfig } from '../../decorator'
import { ClassTransformer } from '@airpower/core'
import { ElTable, ElTableColumn } from 'element-plus'
import { computed } from 'vue'
import { getTableConfigList } from '../../decorator'

const props = defineProps({
  /**
   * ### 表格列配置
   */
  columns: {
    type: Array<ITableFieldConfig>,
  },

  /**
   * ### 表格数据
   */
  data: {
    type: Array<E>,
    required: true,
  },

  /**
   * ### 表格实体类
   */
  clazz: {
    type: Function as unknown as PropType<ClassConstructor<E>>,
    required: true,
  },

  /**
   * ### 表格ID
   * 如传入，选择表格列后会自动缓存
   */
  tableId: {
    type: String,
    default: '',
  },
})

/**
 * ### 表格列
 */
const tableColumns = computed(() => {
  if (props.columns && props.columns.length > 0) {
    return props.columns
  }
  const instance = ClassTransformer.newInstance(props.clazz)
  return getTableConfigList(instance, [])
})
</script>

<template>
  <ElTable
    :data="data"
    row-key="id"
    v-bind="$attrs"
    v-on="$attrs"
  >
    <ElTableColumn
      v-for="item in tableColumns"
      :key="item.key"
      :prop="item.key"
      v-bind="item"
    />
  </ElTable>
</template>
