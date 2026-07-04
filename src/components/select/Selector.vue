<script generic="E extends RootEntity, S extends AbstractCurdService<E>" lang="ts" setup>
import type { IJson, ITransformerConstructor } from '@airpower/transformer'
import type { Component, Ref } from 'vue'
import type { ISearchField } from '../../decorator/@Search/ISearchField'
import type { ITableColumn } from '../../decorator/@Table/ITableColumn'
import type { ISelectorOption } from '../../hooks/table/selector/ISelectorOption'
import type { QueryRequestPage } from '../../model/query/QueryRequestPage'
import type { RootEntity } from '../../model/RootEntity'
import type { AbstractCurdService } from '../../service/AbstractCurdService'
import type { CurdServiceConstructor } from '../../service/type'
import { ElLink } from 'element-plus'
import { computed, useSlots } from 'vue'
import { getSearchConfigList } from '../../decorator/@Search/Search'
import { getTableConfigList } from '../../decorator/@Table/Table'
import { DialogUtil } from '../../dialog/DialogUtil'
import { FeedbackUtil } from '../../feedback/FeedbackUtil'
import { useSelector } from '../../hooks/table/selector/useSelector'
import { ADialog, APage, ATable } from '../index'

const props = defineProps<{
  /**
   * ### 选择器使用的实体类
   */
  entity: ITransformerConstructor<E>

  /**
   * ### 选择器使用的服务类
   */
  service: CurdServiceConstructor<E, S>

  /**
   * ### 选择器的添加按钮的权限标识
   * 则默认使用 `EntityConfig` 的 `addPermission` 配置
   */
  addPermission?: string

  /**
   * ### 选择器使用的字段列表
   */
  columnList?: Array<ITableColumn<E>>

  /**
   * ### `Editor`
   * 传入后方可开启选择器快捷添加功能
   */
  editor?: Component

  /**
   * ### 搜索使用的字段列表
   */
  searchParams?: ISearchField[]

  /**
   * ### 选择器宽度
   */
  width?: string

  /**
   * ### 选择器的高度
   */
  height?: string

  /**
   * ### 选择器标题
   */
  title?: string

  /**
   * ### 不分页
   * 默认请求分页接口 如配置了 `treeList` 则此项自动失效
   */
  unPaginate?: boolean

  /**
   * ### 请求专用的 `treeList` 接口
   */
  treeList?: boolean

  /**
   * ### 是否隐藏添加按钮
   */
  hideAdd?: boolean

  /**
   * ### 搜索前的拦截方法
   * 参数为发起请求的数据,请处理后返回
   *
   * @param requestData 请求对象
   */

  beforeSearch?: (requestData: QueryRequestPage<E>) => QueryRequestPage<E> | void

  /**
   * ### Props参数
   * ```typescript
   * const props = defineProps(airPropsSelector<?>())
   * ```
   * 使用上面的方式声明后传入
   */
  props: {
    /**
     * ### 查询参数
     */
    param: any

    /**
     * ### 是否多选
     */
    isMultiple: boolean

    /**
     * ### 已选中的列表
     */
    selectList: E[]

    /**
     * ### 确认按钮的回调事件
     * @param data [可选] 回调的数据
     */
    onConfirm: (data?: E | E[]) => void

    /**
     * ### 取消按钮的回调事件
     */
    onCancel: () => void
  }
}>()

const slots: IJson = useSlots()
const { entity, service } = props

const hookOptions: ISelectorOption<E> = {}
if (props.beforeSearch) {
  hookOptions.beforeSearch = props.beforeSearch
}
if (props.unPaginate) {
  hookOptions.unPaginate = props.unPaginate
}
if (props.treeList) {
  hookOptions.treeList = props.treeList
}
if (props.props.param) {
  hookOptions.defaultFilter = props.props.param
}

const {
  title,
  selectList,
  isLoading,
  response,
  list,
  disableConfirm,
  onSearch,
  onPageChanged,
  onSelected,
  onReloadData,
} = useSelector(props.props, service, hookOptions)

/**
 * ### 弹窗标题
 */
const dialogTitle = computed(() => {
  if (props.title) {
    return props.title
  }
  return title.value
})

/**
 * ### 列定义
 */
const fields = computed(() => {
  if (props.columnList) {
    return props.columnList
  }
  return getTableConfigList(props.entity)
})

/**
 * ### 搜索参数
 */
const searchParamList: Ref<ISearchField[]> = computed(() => {
  let list = getSearchConfigList(props.entity)
  if (props.searchParams) {
    list = props.searchParams
  }
  const defaultFilter = props.props.param
  if (!defaultFilter) {
    return list
  }
  return list.filter(item => !(defaultFilter[item.key] !== null && defaultFilter[item.key] !== undefined))
})

/**
 * ### 弹出编辑器
 */
async function onAdd() {
  if (!props.editor) {
    FeedbackUtil.toastError('请先配置编辑器')
    return
  }
  await DialogUtil.show(props.editor)
  onReloadData()
}
</script>

<template>
  <ADialog
    :disable-confirm="disableConfirm"
    :height="height || '70%'"
    :hide-buttons="!props.props.isMultiple"
    :loading="isLoading"
    :title="dialogTitle"
    :width="width || '70%'"
    is-selector
    @cancel="props.props.onCancel()"
    @confirm="props.props.onConfirm(selectList.filter((item) => !item.isDisabled))"
  >
    <ATable
      :column-list="fields"
      :data-list="unPaginate || treeList ? list : response.list"
      :entity="entity"
      :hide-add="hideAdd"
      :hide-ctrl="props.props.isMultiple"
      :on-add="onAdd"
      :on-search="onSearch"
      :on-selected="onSelected"
      :search-params="searchParamList"
      :select-list="selectList"
      :show-select="props.props.isMultiple"
      ctrl-width="60px"
      hide-delete
      hide-edit
      hide-field-selector
    >
      <template
        v-for="(index, name) in slots"
        #[name]="row"
      >
        <slot
          :data="row.data"
          :index="index"
          :name="name"
        />
      </template>
      <template
        v-if="!props.props.isMultiple"
        #customRow="{ data }"
      >
        <ElLink
          :disabled="data.isDisabled"
          underline="never"
          @click="props.props.onConfirm(data)"
        >
          选择
        </ElLink>
      </template>
    </ATable>
    <template #status>
      <APage
        :response="response"
        @change="onPageChanged"
      />
    </template>
  </ADialog>
</template>

<style lang="scss" scoped></style>
