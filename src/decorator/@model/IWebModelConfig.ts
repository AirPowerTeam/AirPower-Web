import type { IModelConfig } from '@airpower/core'

export interface IWebModelConfig extends IModelConfig {
  /**
   * ### 添加权限标识
   */
  addPermission?: string

  /**
   * ### 导出权限标识
   */
  exportPermission?: string

  /**
   * ### 禁用权限标识
   */
  disablePermission?: string

  /**
   * ### 启用权限标识
   */
  enablePermission?: string

  /**
   * ### 导入权限标识
   */
  importPermission?: string

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
   * ### 权限标识前缀
   */
  permissionPrefix?: string

  /**
   * ### 表格的没有数据时的提示文本
   *  如 `ATable` 传入 `emptyText` , 则此项失效，否则:
   *
   * - 如配置 `AirConfig.autoPermissionPrefix=false`, 则传入 `permissionPrefix` 失效
   */
  tableEmptyText?: string
}
