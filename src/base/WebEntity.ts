import type { IFormFieldConfig } from '../decorator/@form/IFormFieldConfig'
import { Entity } from '@airpower/core'
import { getFormConfigList } from '../decorator/@form/Form'

export class WebEntity extends Entity {
  /**
   * ### 获取表单字段的配置列表
   * @param fieldNameList 字段列表
   */
  static getFormFieldConfigList(...fieldNameList: string[]): IFormFieldConfig[] {
    return this.newInstance().getFormFieldConfigList(fieldNameList)
  }

  /**
   * ### `请直接调用静态方法获取`
   * ! 内部使用的保留方法
   */
  getFormFieldConfigList(fieldNameList: string[] = []): IFormFieldConfig[] {
    return getFormConfigList(this, fieldNameList)
  }
}
