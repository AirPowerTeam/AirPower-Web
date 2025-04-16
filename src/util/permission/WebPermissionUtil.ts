import type { ClassConstructor } from '@airpower/core'
import type { WebEntity } from '../../base'
import { WebConfig } from '../../config'
import { getWebModelConfig } from '../../decorator'
import { WebPermissionAction } from './WebPermissionAction'

/**
 * # 权限标识处理类
 * @author Hamm.cn
 */
export class WebPermissionUtil {
  /**
   * ### 权限列表
   */
  private static permissionList: string[] = []

  /**
   * ### 权限缓存 `Key`
   */
  private static readonly permissionKey = '_permissions'

  /**
   * ### 获取权限标识
   * - 如 `action` 对应装饰的 `xxxPermission` 是空字符串，则表示无需权限，否则：
   * - 使用 `action` 来生成权限，除非手动配置了 `action` 对应装饰的 `xxxPermission`
   * - 如 `permissionPrefix` 装饰了空字符串，则表示无需添加前缀，否则：
   *
   * #### `WebConfig.autoPermissionPrefix=true`
   *
   * - 使用实体类名作为权限前缀，除非 `permissionPrefix` 装饰了非空字符串
   *
   * #### `WebConfig.autoPermissionPrefix=false`
   *
   * - 不自动添加前缀，除非 `permissionPrefix` 装饰了非空字符串
   *
   * @param EntityClass 实体类
   * @param action 权限场景
   * @returns 权限标识
   */
  static get<E extends WebEntity>(EntityClass: ClassConstructor<E>, action: WebPermissionAction | string): string {
    let permission: string | undefined
    const modelConfig = getWebModelConfig(new EntityClass())
    const actionRecord: Record<WebPermissionAction, string | undefined> = {
      [WebPermissionAction.ADD]: modelConfig?.addPermission,
      [WebPermissionAction.DELETE]: modelConfig?.deletePermission,
      [WebPermissionAction.EDIT]: modelConfig?.editPermission,
      [WebPermissionAction.DETAIL]: modelConfig?.detailPermission,
      [WebPermissionAction.ADD_CHILD]: modelConfig?.addChildPermission,
      [WebPermissionAction.EXPORT]: modelConfig?.exportPermission,
      [WebPermissionAction.IMPORT]: modelConfig?.importPermission,
      [WebPermissionAction.DISABLE]: modelConfig?.disablePermission,
      [WebPermissionAction.ENABLE]: modelConfig?.enablePermission,
    }

    const keys = Object.keys(actionRecord)
    if (keys.includes(action)) {
      permission = actionRecord[action as WebPermissionAction]
    }
    else {
      permission = action
    }
    if (permission === '') {
      return ''
    }
    if (permission === undefined) {
      permission = action
    }
    let prefix: string | undefined = modelConfig?.permissionPrefix
    if (prefix === '') {
      return permission
    }
    if (prefix === undefined) {
      if (!WebConfig.autoPermissionPrefix) {
        return permission
      }
      const entityName = EntityClass.name.replace('Entity', '')
      prefix = entityName.slice(0, 1) + entityName.slice(1)
    }
    return `${prefix}_${permission}`
  }

  /**
   * ### 保存权限列表
   * @param permissions 权限列表
   */
  static saveList(permissions: string[]) {
    this.permissionList = permissions.map(permission => permission.toLocaleLowerCase())
    localStorage.setItem(WebConfig.appKey + this.permissionKey, JSON.stringify(this.permissionList))
  }

  /**
   * ### 获取缓存的权限列表
   */
  static getList(): string[] {
    const str = localStorage.getItem(WebConfig.appKey + this.permissionKey) || '[]'
    try {
      return JSON.parse(str)
    }
    catch (e) {
      console.error(e)
      return []
    }
  }

  /**
   * ### 是否有权限
   * @param permission 权限标识
   */
  static has(permission: string): boolean {
    return this.permissionList.includes(permission.toLowerCase())
  }
}
