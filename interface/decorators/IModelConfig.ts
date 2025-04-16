/**
 * # 模型配置
 * @author Hamm.cn
 */
export interface IModelConfig {
  /**
   * ### 模型名称
   */
  label?: string

  /**
   * ### 模型属性前缀
   */
  fieldPrefix?: string

  /**
   * ### 是否显示搜索框
   * 优先级: 组件传入 > `Model` 配置
   */
  showSearch?: boolean

  /**
   * ### 添加按钮的标题
   * 优先级: 组件传入 > 自动生成
   */
  addTitle?: string

  /**
   * ### 添加权限标识
   */
  addPermission?: string

  /**
   * ### 导出权限标识
   */
  exportPermission?: string

  /**
   * ### 导入权限标识
   */
  importPermission?: string

  /**
   * ### 表格的没有数据时的提示文本
   */
  tableEmptyText?: string

  /**
   * ### 编辑权限标识
   */
  editPermission?: string

  /**
   * ### 详情权限标识
   */
  detailPermission?: string

  /**
   * ### 删除权限标识
   */
  deletePermission?: string

  /**
   * ### 添加子项目权限标识
   */
  addChildPermission?: string

  /**
   * ### 禁用权限标识
   */
  disablePermission?: string

  /**
   * ### 启用权限标识
   */
  enablePermission?: string

  /**
   * ### 权限标识前缀
   */
  permissionPrefix?: string

  /**
   * ### 全局隐藏字段列选择器
   * 如设置 `true`, 则 `ATable` 传入的 `hideFieldSelector` 失效
   */
  hideFieldSelector?: boolean
}
