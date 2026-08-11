<script generic="E extends RootEntity, S extends AbstractCurdService<E>" lang="ts" setup>
import type { IJson, ITransformerConstructor } from '@airpower/transformer'
import type { TableInstance } from 'element-plus'
import type { ComputedRef, PropType, Ref } from 'vue'
import type { IModelConfig } from '../../decorator/@Model/IModelConfig'
import type { ISearchField } from '../../decorator/@Search/ISearchField'
import type { ITableColumn } from '../../decorator/@Table/ITableColumn'
import type { ITableResult } from '../../hooks/table/list/ITableResult'
import type { ITableTreeResult } from '../../hooks/table/tree/ITableTreeResult'
import type { IFile } from '../../interface/IFile'
import type { ITree } from '../../interface/ITree'
import type { QueryRequest } from '../../model/query/QueryRequest'
import type { RootEntity } from '../../model/RootEntity'
import type { AbstractCurdService } from '../../service/AbstractCurdService'
import type { CurdServiceConstructor } from '../../service/type'
import type { IPayload } from '../index'
import type { ITableButton } from './TableButton'
import { DateTimeFormatter } from '@airpower/util'
import { ElInput, ElLink, ElMessageBox, ElOption, ElSelect, ElTable, ElTableColumn } from 'element-plus'
import { computed, nextTick, ref, watch } from 'vue'
import { WebConfig } from '../../config/WebConfig'
import { WebConstant } from '../../config/WebConstant'
import { getDictionary, getFieldLabel } from '../../decorator/@Field/Field'
import { getModelConfig } from '../../decorator/@Model/Model'
import { getSearchConfigList } from '../../decorator/@Search/Search'
import { DialogUtil } from '../../dialog/DialogUtil'
import { FeedbackUtil } from '../../feedback/FeedbackUtil'
import { WebI18n } from '../../i18n/WebI18n'
import { ExportModel } from '../../model/export/ExportModel'
import { QueryRequestPage } from '../../model/query/QueryRequestPage'
import { QuerySort } from '../../model/query/QuerySort'
import { RootModel } from '../../model/RootModel'
import { PermissionAction } from '../../permission/PermissionAction'
import { PermissionUtil } from '../../permission/PermissionUtil'
import { AButton, ADateTime, ADesensitize, AImage, AMoney, APage, APayload, APhone } from '../index'
import { ColumnSelector, CopyColumn, EnumColumn } from './component'
import { useTableButton } from './useTableButton'
import { useTableColumn } from './useTableColumn'

const props = defineProps({
  /**
   * ### 按钮
   */
  buttons: {
    type: Array as PropType<Array<ITableButton<E>>>,
    default: () => [],
  },

  /**
   * ### 直接使用表格Hook
   * 请注意，将不会再触发一些事件，请使用 Hook 的前后置等拦截方法处理
   */
  useHook: {
    type: Object as PropType<ITableResult<E, S>>,
    default: undefined,
  },

  /**
   * ### 是否禁用分页
   */
  disablePage: {
    type: Boolean,
    default: false,
  },

  /**
   * ### 表格加载中
   */
  loading: {
    type: Boolean,
    default: false,
  },

  /**
   * ### 隐藏添加按钮
   */
  hideAdd: {
    type: Boolean,
    default: false,
  },

  /**
   * ### 行尾编辑按钮的权限标识
   */
  editPermission: {
    type: String,
    default: undefined,
  },

  /**
   * ### 行尾禁用按钮的权限标识
   */
  disablePermission: {
    type: String,
    default: undefined,
  },

  /**
   * ### 行尾启用按钮的权限标识
   */
  enablePermission: {
    type: String,
    default: undefined,
  },

  /**
   * ### 行尾详情按钮的权限标识
   */
  detailPermission: {
    type: String,
    default: undefined,
  },

  /**
   * ### 行尾删除按钮的权限标识
   */
  deletePermission: {
    type: String,
    default: undefined,
  },

  /**
   * ### 行尾添加按钮的权限标识
   */
  addRowPermission: {
    type: String,
    default: undefined,
  },

  /**
   * ### 左侧添加按钮的权限标识
   */
  addPermission: {
    type: String,
    default: undefined,
  },

  /**
   * ### 右侧导出按钮的权限标识
   */
  exportPermission: {
    type: String,
    default: undefined,
  },

  /**
   * ### 左侧导入按钮的权限标识
   */
  importPermission: {
    type: String,
    default: undefined,
  },

  /**
   * ### 表格显示的数据数组
   */
  dataList: {
    type: Array<E>,
    default: () => [],
  },

  /**
   * ### 默认选中的数据数组
   */
  selectList: {
    type: Array<E>,
    default: () => [],
  },

  /**
   * ### 显示字段列表
   * 如传入 则优先使用
   */
  columnList: {
    type: Array<ITableColumn<E>>,
    default: () => [],
  },

  /**
   * ### 默认表格空文案
   */
  emptyText: {
    type: String,
    default: undefined,
  },

  /**
   * ### 是否隐藏编辑按钮
   */
  hideEdit: {
    type: Boolean,
    default: false,
  },

  /**
   * ### 控制是否禁用行内编辑按钮的回调方法
   */
  disableEdit: {
    type: Function as PropType<(row: E) => boolean>,
    default: null,
  },

  /**
   * ### 控制是否禁用行内添加按钮的回调方法
   */
  disableAddRow: {
    type: Function as PropType<(row: E) => boolean>,
    default: null,
  },

  /**
   * ### 控制是否允许操作禁用启用
   */
  disableChangeStatus: {
    type: Function as PropType<(row: E) => boolean>,
    default: null,
  },

  /**
   * ### 控制是否禁用行内详情按钮的回调方法
   */
  disableDetail: {
    type: Function as PropType<(row: E) => boolean>,
    default: null,
  },

  /**
   * ### 控制是否禁用行内删除按钮的回调方法
   */
  disableDelete: {
    type: Function as PropType<(row: E) => boolean>,
    default: null,
  },

  /**
   * ### 控制是否整行显示禁用状态
   * 如禁用了行，则行将被模糊并显示灰色背景色
   */
  disableRow: {
    type: Function as PropType<(row: E) => boolean>,
    default: null,
  },

  /**
   * ### 是否隐藏删除按钮
   */
  hideDelete: {
    type: Boolean,
    default: false,
  },

  /**
   * ### 控制是否禁用多选按钮的回调方法
   */
  selectable: {
    type: Function as PropType<(row: E) => boolean>,
    default: null,
  },

  /**
   * ### 是否显示多选框
   * 可触发 `@on-select(selectList)` 事件, 可配置 `:select-list` 默认选中
   */
  showSelect: {
    type: Boolean,
    default: false,
  },

  /**
   * ### 是否显示禁用启用
   */
  showEnableAndDisable: {
    type: Boolean,
    default: false,
  },

  /**
   * ### 表格字段缓存Key
   */
  fieldCacheKey: {
    type: String,
    default: undefined,
  },

  /**
   * ### 是否隐藏字段选择
   */
  hideColumnSelector: {
    type: Boolean,
    default: false,
  },

  /**
   * ### 操作区宽度
   */
  ctrlWidth: {
    type: String,
    default: '',
  },

  /**
   * ### 自动撑起高度
   * 默认fix滚动
   */
  autoHeight: {
    type: Boolean,
    default: false,
  },

  /**
   * ### 是否隐藏操作按钮
   */
  hideCtrl: {
    type: Boolean,
    default: false,
  },

  /**
   * ### 是否显示详情按钮
   */
  showDetail: {
    type: Boolean,
    default: false,
  },

  /**
   * ### 是否显示行添加按钮
   */
  showAddRow: {
    type: Boolean,
    default: false,
  },

  /**
   * ### 是否自定义删除事件
   */
  customDelete: {
    type: Boolean,
    default: false,
  },

  /**
   * ### 删除确认框提示标题
   */
  deleteTitle: {
    type: String,
    default: '',
  },

  /**
   * ### 删除确认框提示内容
   */
  deleteContent: {
    type: String,
    default: '',
  },

  /**
   * ### 表格绑定的数据实体
   */
  entity: {
    type: Function as unknown as PropType<ITransformerConstructor<E>>,
    default: undefined,
  },

  /**
   * ### 是否显示导入按钮
   * - `import-url` `可选` 导入的API接口地址
   * - `import-title` `可选` 指定上传框的标题
   */
  showImport: {
    type: Boolean,
    default: false,
  },

  /**
   * ### 导入上传的标题
   * 默认按传入的 `service` 自动生成
   */
  importTitle: {
    type: String,
    default: undefined,
  },

  /**
   * ### 导出的请求参数
   */
  exportParam: {
    type: Object as PropType<QueryRequest>,
    default: undefined,
  },

  /**
   * ### 是否显示导出按钮
   * 如传入 则需要再传入 `:service`
   */
  showExport: {
    type: Boolean,
    default: false,
  },

  /**
   * ### 接口服务类
   */
  service: {
    type: Function as unknown as PropType<CurdServiceConstructor<E, S>>,
    required: undefined,
  },

  /**
   * ### 默认的筛选器
   */
  defaultFilter: {
    type: Object as PropType<E>,
    default: undefined,
  },

  /**
   * ### 搜索的对象
   * 则覆盖自动生成的条件
   */
  searchParams: {
    type: Array<ISearchField>,
    default: undefined,
  },

  /**
   * ### 导入接口地址
   * 默认按传入的 `service` 自动生成
   */
  importUrl: {
    type: String,
    default: undefined,
  },

  /**
   * ### 导入模板下载地址
   * 默认按传入的 `service` 自动生成
   */
  importTemplateUrl: {
    type: String,
    default: undefined,
  },

  /**
   * ### 导入的文件实体类
   */
  fileEntity: {
    type: Function as unknown as PropType<ITransformerConstructor<IFile & RootEntity>>,
    default: undefined,
  },

  /**
   * ### 自定义添加事件
   */
  onAdd: {
    type: Function as PropType<() => void>,
    default: undefined,
  },

  /**
   * ### 自定义详情事件
   */
  onDetail: {
    type: Function as PropType<(row: E) => void>,
    default: undefined,
  },

  /**
   * ### 自定义删除事件
   */
  onDelete: {
    type: Function as PropType<(row: E) => void>,
    default: undefined,
  },

  /**
   * ### 自定义编辑事件
   */
  onEdit: {
    type: Function as PropType<(row: E) => void>,
    default: undefined,
  },

  /**
   * ### 选择变更事件
   */
  onSelected: {
    type: Function as PropType<(list: E[]) => void>,
    default: undefined,
  },

  /**
   * ### 行添加事件
   */
  onAddRow: {
    type: Function as PropType<(row: E) => void>,
    default: undefined,
  },

  /**
   * ### 排序变更事件
   */
  onSortChange: {
    type: Function as PropType<(sort?: QuerySort) => void>,
    default: undefined,
  },

  /**
   * ### 禁用事件
   */
  onDisable: {
    type: Function as PropType<(row: E) => void>,
    default: undefined,
  },

  /**
   * ### 启用事件
   */
  onEnable: {
    type: Function as PropType<(row: E) => void>,
    default: undefined,
  },

  /**
   * ### 搜索事件
   */
  onSearch: {
    type: Function as PropType<(request: QueryRequestPage<E>) => void>,
    default: undefined,
  },

  /**
   * ### 是否树形
   */
  isTree: {
    type: Boolean,
    default: false,
  },
})

/**
 * ### 暴露一个重置搜索的方法
 */
defineExpose({
  resetSearch: onReset,
  search: onSearch,
})

/**
 * 表格dom
 */
const airTableRef = ref<TableInstance>()

/**
 * Table的ID
 */
const tableId: string = `table_${Math.random()}`

const hook = props.useHook

const ServiceClass: CurdServiceConstructor<E, S> | undefined = props.service || hook?.serviceClass

let EntityClass: ITransformerConstructor<E>

if (ServiceClass) {
  EntityClass = RootModel.newInstance(ServiceClass).entityClass
}
else {
  EntityClass = props.entity as ITransformerConstructor<E>
}

if (!EntityClass) {
  throw new Error('[ATable] entity/service/useHook 三者必须传入一个')
}

/**
 * ### Entity的实例
 */
const entityInstance = RootModel.newInstance(EntityClass)

/**
 * ### 内部使用的配置
 */
const modelConfig: IModelConfig = getModelConfig(EntityClass)

const dataListRef = computed(() => {
  if (props.dataList.length > 0) {
    return props.dataList
  }
  if (hook) {
    if (props.isTree) {
      return hook.list.value
    }
    return hook.response.value.list
  }
  return []
})

const selectListRef = computed(() => {
  if (props.selectList.length > 0) {
    return props.selectList
  }
  if (hook && hook.selectList.value.length > 0) {
    return hook.selectList.value
  }
  return []
})

const isLoadingRef = computed(() => {
  return hook ? hook.isLoading.value : props.loading
})

const {
  allColumnList,
  isColumnSelectorEnabled,
  updateSelectKeys,
  showColumnList,
} = useTableColumn({
  entityClass: EntityClass,
  customColumns: props.columnList,
  hideColumnSelector: props.hideColumnSelector,
  modelConfig,
})

/**
 * ### 选中行
 */
function selectRow(list: Array<ITree & E>) {
  for (const row of list) {
    airTableRef.value?.toggleRowSelection(row, false)
    for (const selectedRow of selectListRef.value) {
      // 遍历每一行
      if (selectedRow.id === row.id) {
        airTableRef.value?.toggleRowSelection(row, true)
      }
    }
    if (row.children && row.children.length > 0) {
      selectRow(row.children as unknown as Array<ITree & E>)
    }
  }
}

/**
 * ### 回显选中
 */
function toggleSelection() {
  selectRow((dataListRef.value) as unknown as Array<ITree & E>)
}

const {
  isAddRowDisabled,
  isSelectable,
  isEditDisabled,
  isDetailDisabled,
  isDisableChangeStatus,
  isDeleteDisabled,
} = useTableButton({
  entityClass: EntityClass,
  editPermission: props.editPermission,
  deletePermission: props.deletePermission,
  addRowPermission: props.addRowPermission,
  disablePermission: props.disablePermission,
  enablePermission: props.enablePermission,
  detailPermission: props.detailPermission,
  disableAddRow: props.disableAddRow,
  disableDelete: props.disableDelete,
  disableEdit: props.disableEdit,
  disableDetail: props.disableDetail,
  disableChangeStatus: props.disableChangeStatus,
  selectable: props.selectable,
  isAddDisabled: props.disableAddRow,
})

/**
 * ### 高级搜索字段列表
 */
const searchFieldList: ComputedRef<ISearchField[]> = computed(() => props.searchParams || getSearchConfigList(EntityClass))

/**
 * ### 获取字符串值
 * @param data 数据
 */
function getStringValue(data: string | number | object | undefined | null): string {
  if (data === undefined || data === null) {
    return ''
  }
  return data.toString()
}

/**
 * ### 查询对象
 */
const request = ref(new QueryRequestPage(EntityClass)) as Ref<QueryRequestPage<E>>

/**
 * ### 导出方法
 */
function onExport() {
  const service = getService()
  const exportModel = new ExportModel()
  exportModel.param = request.value
  exportModel.createExportTaskUrl = `${service.baseUrl}${WebConfig.exportUrl}`
  exportModel.queryExportUrl = `${service.baseUrl}${WebConfig.exportQueryUrl}`
  DialogUtil.createExportTask(exportModel)
}

/**
 * ### 单个删除
 * @param item
 */
async function handleDelete(item: E) {
  if (props.customDelete) {
    if (props.onDelete) {
      props.onDelete(item)
    }
    else if (hook) {
      hook.onDelete(item)
    }
    return
  }
  try {
    let title: string
    let content: string
    // 如果实体传入 则尝试自动获取

    title = WebI18n.get().ConfirmPlease
    content = WebI18n.get().ConfirmToDelete

    // 如果传入配置项 则覆盖实体标注的内容
    if (props.deleteTitle) {
      title = props.deleteTitle
    }
    if (props.deleteContent) {
      content = props.deleteContent
    }
    await ElMessageBox.confirm(content, title, {
      closeOnPressEscape: false,
      confirmButtonText: WebI18n.get().Confirm,
      cancelButtonText: WebI18n.get().Cancel,
      type: 'warning',
    })
    if (props.onDelete) {
      props.onDelete(item)
    }
    else if (hook) {
      hook.onDelete(item)
    }
  }
  catch (e) {
    console.error(e)
    // 取消删除
  }
}

/**
 * ### 是否在当前页数据中
 */
function inCurrentPage(list: E[], find: E): boolean {
  const isIn = false
  for (let i = 0; i < list.length; i += 1) {
    const row = list[i]
    if (row.id === find.id) {
      return true
    }
    if ((row as IJson).children && (row as IJson).children.length > 0) {
      return inCurrentPage((row as IJson).children, find)
    }
  }
  return isIn
}

/**
 * ### 选中事件
 * @param list 选中的列表
 */
function handleSelectChanged(list: E[]) {
  const selectAll = list.map(item => item.copy())
  list.forEach((find) => {
    if (inCurrentPage(dataListRef.value, find)) {
      // 在当前页面没找到的数据 保持选中
      return
    }
    const exist = selectAll.find(item => item.id === find.id)
    if (!exist) {
      selectAll.push(find)
    }
  })
  if (props.onSelected) {
    props.onSelected(selectAll)
  }
  else if (hook) {
    hook.onSelected(selectAll)
  }
}

/**
 * ### 排序事件
 * @param data 数据
 * @param data.prop 排序字段
 * @param data.order 排序方向
 */
function handleSortChanged(data: { prop: string, order: string }) {
  let callback: QuerySort | undefined
  if (data.prop && data.order) {
    const sort = new QuerySort()
    sort.field = data.prop
    sort.direction = data.order === 'descending' ? 'desc' : 'asc'
    callback = sort
  }
  if (props.onSortChange) {
    props.onSortChange(callback)
  }
  else if (hook) {
    hook.onSortChanged(callback)
  }
}

/**
 * ### 获取行的实体数据
 * @param scope
 */
function getRowEntity(scope: IJson): E {
  return scope.row
}

/**
 * ### 获取行的数据列
 * @param scope Scope
 * @param config 列的配置
 */
function getValue(scope: IJson, config: ITableColumn<E>): any {
  const key = config.key
  if (config.formatter) {
    return config.formatter(getRowEntity(scope))
  }
  return getRowEntity(scope)[key as keyof E]
}

/**
 * ### 获取数组列
 * @param scope Scope
 * @param config 列的配置
 */
function getPayloadArray(scope: IJson, config: ITableColumn<E>): Array<RootEntity & IPayload> {
  const value = getValue(scope, config)
  return value as Array<RootEntity & IPayload>
}

function tableRowClassName({ row }: { row: E, rowIndex: number }) {
  if (props.disableRow && props.disableRow(row)) {
    return 'disable-row'
  }
  return ''
}

/**
 * ### 监听传入数据变化
 */
watch(
  () => dataListRef,
  () => {
    nextTick(() => {
      toggleSelection()

      // 分页后滚动条置顶
      const table = document.getElementById(tableId)
      const bodyWrap = table?.querySelector('.el-scrollbar__wrap') as HTMLElement
      bodyWrap.scrollTop = 0
    })
  },
  {
    deep: true,
    immediate: true,
  },
)

/**
 * ### 监听选择的数组列表
 */
watch(
  () => selectListRef.value,
  () => {
    nextTick(() => {
      if (airTableRef.value) {
        airTableRef.value.clearSelection()
      }
      toggleSelection()
    })
  },
  {
    deep: true,
    immediate: true,
  },
)

/**
 * ### 获取API地址
 * @param url
 */
function getApiUrl(url: string): string {
  if (url.includes(WebConstant.PREFIX_HTTP) || url.includes(WebConstant.PREFIX_HTTPS)) {
    return url
  }
  return WebConfig.apiUrl + url
}

/**
 * ### 添加事件
 */
function handleAdd() {
  if (props.onAdd) {
    props.onAdd()
  }
  else if (hook) {
    hook.onAdd()
  }
}

/**
 * ### 添加行
 * @param row 行
 */
function handleAddRow(row: E) {
  if (props.onAddRow) {
    props.onAddRow(row)
  }
  else if (props.isTree) {
    (hook as ITableTreeResult<E, S>)?.onAddRow(row)
  }
}

/**
 * ### 编辑事件
 */
function handleEdit(row: E) {
  if (props.onEdit) {
    props.onEdit(row)
  }
  else if (hook) {
    hook.onEdit(row)
  }
}

/**
 * ### 详情事件
 */
function handleDetail(row: E) {
  if (props.onDetail) {
    props.onDetail(row)
  }
  else if (hook) {
    hook.onDetail(row)
  }
}

/**
 * ### 禁用事件
 */
function handleDisable(row: E) {
  if (props.onDisable) {
    props.onDisable(row)
  }
  else if (hook) {
    hook.onDisable(row)
  }
}

/**
 * ### 启用事件
 */
function handleEnable(row: E) {
  if (props.onEnable) {
    props.onEnable(row)
  }
  else if (hook) {
    hook.onEnable(row)
  }
}

/**
 * ### 获取服务
 */
function getService(): S {
  let service: S | undefined
  if (props.service) {
    service = RootModel.newInstance(props.service)
  }
  else if (props.useHook) {
    service = props.useHook.service
  }
  else {
    FeedbackUtil.toastError('请先传入 service 参数')
    throw new Error('请先传入 service 参数')
  }
  return service
}

/**
 * ### 导入
 */
async function onImport() {
  let url = props.importUrl
  if (!url) {
    const service = getService()
    url = `${service.baseUrl}/${WebConfig.importUrl}`
    url = getApiUrl(url)
  }
  if (!props.fileEntity) {
    FeedbackUtil.toastError('请先传入 fileEntity 参数')
    return
  }
  await DialogUtil.showUpload(
    {
      uploadUrl: url,
      extensions: ['xls', 'xlsx'],
      title: props.importTitle || WebI18n.get().Import,
      uploadSuccess: WebI18n.get().ImportSuccess,
      confirmText: WebI18n.get().DownloadTemplate,
      entity: props.fileEntity,
    },
    () => {
      onDownloadTemplate()
    },
  )
  onReset()
}

/**
 * ### 为URL拼接AccessToken
 * @param url
 */
function getUrlWithAccessToken(url: string): string {
  const accessToken = WebConfig.getAccessToken()
  const tempString = `${WebConfig.authorizationHeaderKey}=`
  if (url.includes(`?${tempString}`) || url.includes((`&${tempString}`))) {
    return url
  }
  if (url.includes('?')) {
    return `&${WebConfig.authorizationHeaderKey}=${accessToken}`
  }
  return `?${WebConfig.authorizationHeaderKey}=${accessToken}`
}

/**
 * ### 下载导入的模板
 */
function onDownloadTemplate() {
  let url = props.importTemplateUrl
  if (url) {
    window.open(WebConfig.apiUrl + getUrlWithAccessToken(url))
    return
  }
  const service = getService()
  url = `${service.baseUrl}/${WebConfig.importTemplateUrl}`
  url = getApiUrl(url)
  window.open(getUrlWithAccessToken(url))
}

const searchFilter = ref(entityInstance.copy())

function onReset() {
  if (props.defaultFilter) {
    searchFilter.value = props.defaultFilter
  }
  else if (props.useHook) {
    searchFilter.value = props.useHook.request.value?.filter
  }
  else {
    searchFilter.value = entityInstance.copy()
  }
  request.value = new QueryRequestPage(EntityClass)
  request.value.exclude('filter')
}

/**
 * ### 查询事件
 */
function onSearch() {
  request.value = new QueryRequestPage(EntityClass)
  const keys = Object.keys(searchFilter.value)
  keys.forEach((key) => {
    if (searchFilter.value[key] === '') {
      searchFilter.value[key] = undefined
    }
  })
  request.value.filter = searchFilter.value.copy()
  if (request.value.page) {
    request.value.page.pageNum = 1
  }
  if (props.onSearch) {
    props.onSearch(request.value)
  }
  else if (hook) {
    hook.onSearch(request.value)
  }
}

if (props.defaultFilter) {
  searchFilter.value = props.defaultFilter
}
else if (props.useHook) {
  searchFilter.value = props.useHook.request.value?.filter
}
onSearch()
</script>

<template>
  <div
    :style="{ height: autoHeight ? 'auto' : '0px' }"
    class="a-table-container"
  >
    <div class="a-table-toolbar">
      <div class="a-table-toolbar-left">
        <slot name="left">
          <slot name="beforeButton" />
          <slot name="addButton">
            <AButton
              v-if="!hideAdd"
              :permission="addPermission || PermissionUtil.get(EntityClass, PermissionAction.ADD)"
              icon="ADD"
              primary
              @click="handleAdd()"
            >
              {{ modelConfig.addTitle || WebI18n.get().Add }}
            </AButton>
          </slot>
          <AButton
            v-if="showImport"
            :permission="importPermission || PermissionUtil.get(EntityClass, PermissionAction.IMPORT)"
            icon="IMPORT"
            @click="onImport()"
          >
            {{ WebI18n.get().Import }}
          </AButton>
          <slot name="afterButton" />
        </slot>
      </div>
      <div class="a-table-toolbar-right">
        <div class="a-table-toolbar-search">
          <slot name="beforeSearch" />
          <slot name="search" />
          <template
            v-for="item in searchFieldList"
            :key="item.key"
          >
            <div
              v-if="!item.hide"
              :style="{ width: `${item.width || 150}px` }"
              class="a-table-toolbar-search-item"
            >
              <slot
                :data="searchFilter"
                :name="`search-${item.key}`"
              >
                <ElSelect
                  v-if="getDictionary(EntityClass, item.key)"
                  v-model="searchFilter[item.key]"
                  :clearable="item.clearable !== false"
                  :filterable="item.filterable"
                  :placeholder="`${getFieldLabel(EntityClass, item.key)}...`"
                  @change="onSearch()"
                  @clear="searchFilter[item.key] = undefined"
                >
                  <template v-for="enumItem of getDictionary(EntityClass, item.key)?.toArray()">
                    <ElOption
                      v-if="!enumItem.disabled"
                      :key="enumItem.key.toString()"
                      :label="enumItem.label"
                      :value="enumItem.key"
                    />
                  </template>
                </ElSelect>
                <ElInput
                  v-else
                  v-model="searchFilter[item.key]"
                  :clearable="item.clearable !== false"
                  :placeholder="`${getFieldLabel(EntityClass, item.key)}...`"
                  @blur="onSearch()"
                  @clear="onSearch"
                  @keydown.enter="onSearch"
                />
              </slot>
            </div>
          </template>
        </div>
        <AButton
          v-if="showExport"
          :permission="exportPermission || PermissionUtil.get(EntityClass, PermissionAction.EXPORT)"
          icon="EXPORT"
          @click="onExport()"
        >
          {{ WebI18n.get().Export }}
        </AButton>
        <slot name="afterSearch" />
        <ColumnSelector
          v-if="isColumnSelectorEnabled"
          :column-list="allColumnList"
          :entity-class="EntityClass"
          @change="updateSelectKeys($event)"
        />
      </div>
    </div>
    <ElTable
      v-if="allColumnList"
      :id="tableId"
      ref="airTableRef"
      v-loading="isLoadingRef"
      :data="dataListRef"
      :row-class-name="tableRowClassName"
      :row-key="(row: E) => `${row.id}`"
      :tree-props="WebConfig.treeProps"
      class="a-table"
      flexible
      height="100%"
      @select="handleSelectChanged"
      @select-all="handleSelectChanged"
      @sort-change="handleSortChanged"
    >
      <ElTableColumn
        v-if="showSelect"
        :reserve-selection="true"
        :selectable="isSelectable"
        fixed="left"
        type="selection"
        width="40"
      />
      <!-- 文本数据渲染 -->
      <template
        v-for="item in showColumnList"
        :key="item.key"
      >
        <ElTableColumn
          :align="item.align"
          :fixed="item.fixed"
          :label="getFieldLabel(EntityClass, item.key)"
          :min-width="item.minWidth || 'auto'"
          :prop="item.key as string"
          :sortable="item.sortable"
          :width="item.width || 'auto'"
        >
          <template #default="scope">
            <slot
              v-if="scope.$index >= 0"
              :data="getRowEntity(scope)"
              :index="scope.$index as number"
              :name="item.key"
            >
              <span
                v-if="item.prefixText"
                style="color: #aaa; margin-right: 3px"
              >{{ item.prefixText }}</span>
              <EnumColumn
                v-else-if="getDictionary(EntityClass, item.key)"
                :column="item"
                :data="getRowEntity(scope)"
                :dictionary="getDictionary(EntityClass, item.key)!"
              />
              <AImage
                v-else-if="item.image"
                :height="item.imageHeight || 40"
                :src="getValue(scope, item)"
                :width="item.imageWidth || 40"
              />
              <APhone
                v-else-if="item.phone"
                :desensitize="item.desensitize"
                :phone="getValue(scope, item)"
              />
              <ADateTime
                v-else-if="item.datetime"
                :formatter="item.datetime === true ? DateTimeFormatter.FULL_DATE_TIME : item.datetime"
                :time="getValue(scope, item)"
              />
              <AMoney
                v-else-if="item.money"
                :money="getValue(scope, item)"
              />
              <template v-else-if="item.payload">
                <template v-if="item.array">
                  {{ getPayloadArray(scope, item).map(payload => payload.getPayloadLabel()).join(',') }}
                </template>
                <APayload
                  v-else
                  :payload="getValue(scope, item)"
                />
              </template>
              <ADesensitize
                v-else-if="item.desensitize"
                :content="getValue(scope, item)"
                :type="item.desensitize"
              />
              <CopyColumn
                v-else-if="item.copy"
                :column="item"
                :data="getRowEntity(scope)"
              />
              <template v-else>
                <div
                  :class="item.wrap ? '' : 'nowrap'"
                  class="a-table-column"
                >
                  {{ getStringValue(getValue(scope, item)) ?? item.emptyValue }}
                </div>
              </template>
              <span
                v-if="item.suffixText"
                style="color: #aaa"
              >{{ item.suffixText }}</span>
            </slot>
          </template>
        </ElTableColumn>
      </template>
      <!-- 如果没有隐藏操作列 或者字段选择器启用 -->
      <ElTableColumn
        v-if="!hideCtrl"
        :width="ctrlWidth || '90px'"
        align="right"
        fixed="right"
      >
        <template #header>
          {{ WebI18n.get().Operation }}
        </template>
        <template #default="scope">
          <div class="ctrlRow">
            <!-- 自定义操作列前置插槽 -->
            <slot
              v-if="scope.$index >= 0"
              :data="getRowEntity(scope)"
              :index="scope.$index as number"
              name="customRow"
            />
            <ElLink
              v-for="(button, index) in buttons"
              :key="index"
              :disabled="button.disabled ? button.disabled(getRowEntity(scope)) : false"
              :type="button.dangerButton ? 'danger' : button.warningButton ? 'warning' : 'default'"
              underline="never"
              @click="button.click(getRowEntity(scope))"
            >
              {{ button.label }}
            </ElLink>
            <ElLink
              v-if="showAddRow"
              :disabled="isAddRowDisabled(getRowEntity(scope))"
              underline="never"
              @click="handleAddRow(getRowEntity(scope))"
            >
              {{ WebI18n.get().Add }}
            </ElLink>
            <ElLink
              v-if="!props.hideEdit"
              :disabled="isEditDisabled(getRowEntity(scope))"
              underline="never"
              @click="handleEdit(getRowEntity(scope))"
            >
              {{ WebI18n.get().Update }}
            </ElLink>
            <ElLink
              v-if="showDetail"
              :disabled="isDetailDisabled(getRowEntity(scope))"
              underline="never"
              @click="handleDetail(getRowEntity(scope))"
            >
              {{ WebI18n.get().Detail }}
            </ElLink>
            <template v-if="showEnableAndDisable">
              <ElLink
                v-if="getRowEntity(scope).isDisabled"
                :disabled="isDisableChangeStatus(getRowEntity(scope))"
                underline="never"
                @click="handleEnable(getRowEntity(scope))"
              >
                {{ WebI18n.get().Enable }}
              </ElLink>
              <ElLink
                v-else
                :disabled="isDisableChangeStatus(getRowEntity(scope))"
                type="warning"
                underline="never"
                @click="handleDisable(getRowEntity(scope))"
              >
                {{ WebI18n.get().Disable }}
              </ElLink>
            </template>
            <ElLink
              v-if="!hideDelete"
              :disabled="isDeleteDisabled(getRowEntity(scope))"
              type="danger"
              underline="never"
              @click="handleDelete(getRowEntity(scope))"
            >
              {{ WebI18n.get().Delete }}
            </ElLink>
            <!-- 自定义操作列后置插槽 -->
            <slot
              v-if="scope.$index >= 0"
              :data="getRowEntity(scope)"
              :index="scope.$index as number"
              name="endRow"
            />
          </div>
        </template>
      </ElTableColumn>
      <template #empty>
        <img
          alt=""
          src="../../assets/img/empty.svg"
          style="width: 80px"
        >
        <div>{{ emptyText || modelConfig.tableEmptyText || WebI18n.get().NoData }}</div>
      </template>
    </ElTable>
    <div class="a-table-footer">
      <div class="left">
        <slot name="beforePage" />
        <APage
          v-if="!disablePage && hook"
          :response="hook.response.value"
          class="a-table-page"
          @change="hook.onPageChanged($event)"
        />
        <slot name="afterPage" />
      </div>
      <div class="right">
        <slot name="footerRight" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.a-table-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 300px;
  position: relative;

  .a-table-toolbar {
    display: flex;
    align-items: flex-start;
    margin-bottom: 10px;

    .a-table-toolbar-left {

      .el-button + .el-button {
        margin-left: 5px;
      }
    }

    .a-table-toolbar-right {
      flex: 1;
      display: flex;
      justify-content: flex-end;

      .a-table-toolbar-search {
        display: flex;
        flex-direction: row;
        width: 0;
        flex: 1;
        overflow: hidden;
        flex-wrap: wrap;
        justify-content: flex-end;
      }

      .el-button + .el-button {
        margin-left: 5px;
      }

      .a-table-toolbar-search-item {
        margin-right: 5px;
        margin-bottom: 5px;
      }
    }
  }

  .a-table {
    flex: 1;
    height: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .disable-row {
      background: #f5f5f5;
      cursor: not-allowed;
      position: relative;

      > * {
        user-select: none;
        filter: blur(1px);
      }
    }

    thead .cell {
      overflow: hidden;
      white-space: nowrap;
      word-break: keep-all;
      text-overflow: ellipsis;
    }

    td .cell {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .is-right .cell {
      justify-content: flex-end;
    }

    .el-table__cell .nowrap {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-break: keep-all;
      cursor: pointer;
      user-select: none;
    }

    .el-table__cell .nowrap * {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-break: keep-all;
      cursor: pointer;
      user-select: none;
      display: inherit;
    }

    .el-table__cell .nowrap .el-link__inner {
      display: inline-block !important;
    }

    .el-table__empty-text {
      line-height: 40px;
    }

    .el-table__header-wrapper {
      background-color: var(--el-color-primary-light-9);
      border-radius: 5px;

      th {
        background-color: var(--el-color-primary-light-9) !important;
      }
    }

    .el-table__body-wrapper {
      flex: 1;
      height: 0;
      overflow: hidden;
      overflow-y: auto;

      .el-scrollbar__view {
        height: 100%;
      }
    }

    .custom-header {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;

      .el-icon:hover {
        color: var(--primary-color);
      }
    }

    .row-delete {
      color: var(--el-color-error);
    }

    .ctrlRow {
      display: flex;

      .el-link {
        user-select: none;
        padding: 0 3px;
      }
    }
  }
}

.a-table-footer {
  padding: 10px 0 0 0;
  display: flex;
  flex-direction: row;
  align-items: center;

  .left {
    flex: 1;
  }
}
</style>
