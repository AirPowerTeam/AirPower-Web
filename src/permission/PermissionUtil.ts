import type { ITransformerConstructor } from '@airpower/transformer'
import type { IModelConfig } from '../decorator/@Model/IModelConfig'
import type { RootEntity } from '../model/RootEntity'
import { WebConfig } from '../config/WebConfig'
import { getModelConfig } from '../decorator/@Model/Model'
import { PermissionAction } from './PermissionAction'

/**
 * ### 权限标识处理类
 * @author Hamm.cn
 */
export class PermissionUtil {
  /**
   * ### 权限列表
   */
  private static permissionList: string[] = []

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
  static get<E extends RootEntity>(EntityClass: ITransformerConstructor<E>, action: PermissionAction | string): string {
    let permission: string | undefined
    const modelConfig: IModelConfig = getModelConfig(EntityClass)
    const actionRecord: Record<PermissionAction, string | undefined> = {
      [PermissionAction.ADD]: modelConfig?.addPermission,
      [PermissionAction.DELETE]: modelConfig?.deletePermission,
      [PermissionAction.EDIT]: modelConfig?.editPermission,
      [PermissionAction.DETAIL]: modelConfig?.detailPermission,
      [PermissionAction.ADD_CHILD]: modelConfig?.addChildPermission,
      [PermissionAction.EXPORT]: modelConfig?.exportPermission,
      [PermissionAction.IMPORT]: modelConfig?.importPermission,
      [PermissionAction.DISABLE]: modelConfig?.disablePermission,
      [PermissionAction.ENABLE]: modelConfig?.enablePermission,
    }

    const keys: string[] = Object.keys(actionRecord)
    if (keys.includes(action)) {
      permission = actionRecord[action as PermissionAction]
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
      return WebConfig.permissionPrefix + permission
    }
    if (prefix === undefined) {
      if (!WebConfig.autoPermissionPrefix) {
        return WebConfig.permissionPrefix + permission
      }
      const entityName: string = EntityClass.name.replace('Entity', '')
      prefix = entityName.slice(0, 1) + entityName.slice(1)
    }
    return `${WebConfig.permissionPrefix}${prefix}:${permission}`
  }

  /**
   * ### 保存权限列表
   * @param permissions 权限列表
   */
  static saveList(permissions: string[]) {
    this.permissionList = permissions
    localStorage.setItem(WebConfig.permissionCacheKey, JSON.stringify(this.permissionList))
  }

  /**
   * ### 获取缓存的权限列表
   */
  static getList(): string[] {
    const str: string = localStorage.getItem(WebConfig.permissionCacheKey) || '[]'
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
    return this.permissionList.map(item => item.toLowerCase()).includes(permission.toLowerCase())
  }
}
