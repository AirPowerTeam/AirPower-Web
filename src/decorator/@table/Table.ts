import type { DecoratorTarget } from '@airpower/core'
import type { ITableFieldConfig } from './ITableFieldConfig'
import { DecoratorUtil, getFieldConfig } from '@airpower/core'

/**
 * ### 表格字段 `key`
 */
const FIELD_CONFIG_KEY = 'Table'

/**
 * ### 表格字段列表key
 */
const FIELD_LIST_KEY = 'TableList'

/**
 * ### 为属性标记是表格字段
 * @param config 表格列的配置
 */
export function Table(config: ITableFieldConfig = {}) {
  return (target: DecoratorTarget, key: string) => {
    config.key = key
    return DecoratorUtil.setFieldConfig(target, key, FIELD_CONFIG_KEY, config, FIELD_LIST_KEY)
  }
}

/**
 * ### 获取对象的属性表格的配置
 * @param target 目标对象
 * @param key 属性名
 */
export function getTableConfig(target: DecoratorTarget, key: string): ITableFieldConfig | null {
  const tableConfig: ITableFieldConfig | null = DecoratorUtil.getFieldConfig(target, key, FIELD_CONFIG_KEY, true)
  if (!tableConfig) {
    return null
  }
  if (!tableConfig.enums) {
    const props = getFieldConfig(target, key)
    if (props && props.enums) {
      tableConfig.enums = props.enums
    }
  }
  return tableConfig
}

/**
 * ### 获取标记了表格配置的字段列表
 * @param target 目标对象
 */
export function getTableFieldList(target: DecoratorTarget): string[] {
  return DecoratorUtil.getFieldList(target, FIELD_LIST_KEY)
}

/**
 * ### 获取字段标记的表格字段配置列表
 * @param target 目标实体类
 * @param keyList 字段列表
 */
export function getTableConfigList(target: DecoratorTarget, keyList: string[]): ITableFieldConfig[] {
  return DecoratorUtil.getFieldConfigList<ITableFieldConfig>(target, FIELD_LIST_KEY, FIELD_CONFIG_KEY, keyList)
    .sort((a, b) => (b.orderNumber || 0) - (a.orderNumber || 0))
    .map((item) => {
      const props = getFieldConfig(target, item.key!)
      item.label = item.label || props.label || item.key
      if (!item.enums) {
        const fieldConfig = getFieldConfig(target, item.key!)
        if (fieldConfig && fieldConfig.enums) {
          item.enums = fieldConfig.enums
        }
      }
      return item
    })
}
