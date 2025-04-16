import type { AirEntity } from '../base/AirEntity'
import type { ClassConstructor } from '../type/AirType'
import { AirApi } from '../config/AirApi'
import { AirConfig } from '../config/AirConfig'
import { getModelConfig } from '../decorator/Model'
import { AirPermissionAction } from '../enum/AirPermissionAction'

/**
 * # 权限标识处理类
 * @author Hamm.cn
 */
export class AirPermission {
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
  static get<E extends AirEntity>(EntityClass: ClassConstructor<E>, action: AirPermissionAction | string): string {
    let permission: string | undefined
    const modelConfig = getModelConfig(new EntityClass())
    const actionRecord: Record<AirPermissionAction, string | undefined> = {
      [AirPermissionAction.ADD]: modelConfig?.addPermission,
      [AirPermissionAction.DELETE]: modelConfig?.deletePermission,
      [AirPermissionAction.EDIT]: modelConfig?.editPermission,
      [AirPermissionAction.DETAIL]: modelConfig?.detailPermission,
      [AirPermissionAction.ADD_CHILD]: modelConfig?.addChildPermission,
      [AirPermissionAction.EXPORT]: modelConfig?.exportPermission,
      [AirPermissionAction.IMPORT]: modelConfig?.importPermission,
      [AirPermissionAction.DISABLE]: modelConfig?.disablePermission,
      [AirPermissionAction.ENABLE]: modelConfig?.enablePermission,
    }

    const keys = Object.keys(actionRecord)
    if (keys.includes(action)) {
      permission = actionRecord[action as AirPermissionAction]
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
      if (!AirConfig.autoPermission) {
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
    AirApi.setStorage(AirConfig.appKey + this.permissionKey, JSON.stringify(this.permissionList))
  }

  /**
   * ### 获取缓存的权限列表
   */
  static getList(): string[] {
    const str = AirApi.getStorage(AirConfig.appKey + this.permissionKey) || '[]'
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
