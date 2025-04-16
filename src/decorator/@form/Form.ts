import type { DecoratorTarget } from '@airpower/core'
import type { IFormFieldConfig } from './IFormFieldConfig'
import { DecoratorUtil, getFieldConfig } from '@airpower/core'

/**
 * ### 表单字段 `key`
 */
const FIELD_CONFIG_KEY = 'Form'

/**
 * ### 表单字段列表 `key`
 */
const FIELD_LIST_KEY = 'FormList'

/**
 * ### 标记该字段可用于表单配置
 * @param config 配置项
 */
export function Form(config: IFormFieldConfig = {}) {
  return (target: DecoratorTarget, key: string) => {
    config.key = key
    return DecoratorUtil.setFieldConfig(target, key, FIELD_CONFIG_KEY, config, FIELD_LIST_KEY)
  }
}

/**
 * ### 获取对象某个字段标记的表单配置项
 * @param target 目标类或对象
 * @param key 属性名
 */
export function getFormConfig(target: DecoratorTarget, key: string): IFormFieldConfig | null {
  const formConfig: IFormFieldConfig | null = DecoratorUtil.getFieldConfig(target, key, FIELD_CONFIG_KEY, true)
  if (!formConfig) {
    return null
  }
  if (!formConfig.enums) {
    const props = getFieldConfig(target, key)
    if (props && props.enums) {
      formConfig.enums = props.enums
    }
  }
  return formConfig
}

/**
 * ### 获取标记了表单配置的字段列表
 * @param target 目标对象
 */
export function getFormFieldList(target: DecoratorTarget): string[] {
  return DecoratorUtil.getFieldList(target, FIELD_LIST_KEY)
}

/**
 * ### 获取指定类的表单字段配置项列表
 * @param target 目标类或对象
 * @param keyList 选择字段列表
 */
export function getFormConfigList(target: DecoratorTarget, keyList: string[]): IFormFieldConfig[] {
  return DecoratorUtil.getFieldConfigList<IFormFieldConfig>(target, FIELD_LIST_KEY, FIELD_CONFIG_KEY, keyList)
    .filter(item => !item.hide)
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
