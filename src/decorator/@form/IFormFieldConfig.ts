import type { EnumConstructor, IField } from '@airpower/core'

/**
 * # 表单的字段配置接口
 * @author Hamm.cn
 */
export interface IFormFieldConfig extends IField {

  /**
   * ### 最大数字
   * 默认配置 `AirConfig.maxNumber` 仅在 `number` 时有效
   */
  max?: number

  /**
   * ### 最小数字
   */
  min?: number

  /**
   * ### 最小长度
   */
  minLength?: number

  /**
   * ### 排序 越大越靠前
   */
  orderNumber?: number

  /**
   * ### 数字输入
   */
  number?: boolean

  /**
   * ### 字典
   */
  enums?: EnumConstructor

  /**
   * ### 是否是纯中文
   * 支持传入 `boolean` 和 `string`
   * - 如传入 `有效字符串` 则认为需要校验, 内容即是校验失败的报错信息
   * - 如传入 `true` 则认为需要校验且自动生成校验失败的报错信息
   */
  chinese?: boolean | string

  /**
   * ### 是否是手机号
   * 支持传入 `boolean` 和 `string`
   * - 如传入 `有效字符串` 则认为需要校验, 内容即是校验失败的报错信息
   * - 如传入 `true` 则认为需要校验且自动生成校验失败的报错信息
   */
  mobilePhone?: boolean | string

  /**
   * ### 是否是座机电话
   * 支持传入 `boolean` 和 `string`
   * - 如传入 `有效字符串` 则认为需要校验, 内容即是校验失败的报错信息
   * - 如传入 `true` 则认为需要校验且自动生成校验失败的报错信息
   */
  telPhone?: boolean | string

  /**
   * ### 是否是电子邮箱
   * 支持传入 `boolean` 和 `string`
   * - 如传入 `有效字符串` 则认为需要校验, 内容即是校验失败的报错信息
   * - 如传入 `true` 则认为需要校验且自动生成校验失败的报错信息
   */
  email?: boolean | string

  /**
   * ### 是否是座机电话或手机
   * 支持传入 `boolean` 和 `string`
   * - 如传入 `有效字符串` 则认为需要校验, 内容即是校验失败的报错信息
   * - 如传入 `true` 则认为需要校验且自动生成校验失败的报错信息
   */
  phone?: boolean | string

  /**
   * ### 是否必填(字符串类型)
   * 支持传入 `boolean` 和 `string`
   * - 如传入 `有效字符串` 则认为需要校验, 内容即是校验失败的报错信息
   * - 如传入 `true` 则认为需要校验且自动生成校验失败的报错信息
   */
  requiredString?: boolean | string

  /**
   * ### 是否必填(数字类型)
   * 支持传入 `boolean` 和 `string`
   * - 如传入 `有效字符串` 则认为需要校验, 内容即是校验失败的报错信息
   * - 如传入 `true` 则认为需要校验且自动生成校验失败的报错信息
   */
  requiredNumber?: boolean | string

  /**
   * ### 是否必填(挂载对象)
   * 支持传入 `boolean` 和 `string`
   * - 如传入 `有效字符串` 则认为需要校验, 内容即是校验失败的报错信息
   * - 如传入 `true` 则认为需要校验且自动生成校验失败的报错信息
   */
  requiredPayload?: boolean | string

  /**
   * ### 正则表达式对象
   */
  regExp?: RegExp

  /**
   * ### 是否隐藏表单字段
   * 如配置`true` 则`getFormFieldConfigList`将无法拿到这个属性
   */
  hide?: boolean
}
