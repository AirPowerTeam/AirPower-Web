import type { AbstractEntityService, ClassConstructor, IJson, RegExpEnum } from '@airpower/core'
import type { WebEntity } from '../../base'
import type {
  WebValidateRule,
  WebValidatorCallback,
  WebValidatorTarget,
  WebValidatorTrigger,
  WebValidatorType,
} from './type'
import { ClassTransformer, ValidateUtil } from '@airpower/core'
import { WebI18n } from '../../i18n'

/**
 * # 表单验证
 * @author Hamm.cn
 */
export class WebValidator {
  /**
   * ### 错误提醒
   * 请通过 `.show()` 传入
   */
  message!: string
  /**
   * ### 触发方式
   * 不建议直接设置哦~ (默认blur)
   */
  trigger: WebValidatorTrigger = 'change'
  /**
   * ### 类型
   * 可通过 `toString` `toNumber` `toArray` 设置 (默认`string`)
   */
  type!: WebValidatorType
  /**
   * ### 是否必填
   * 可以调用 `.ifEmpty()`
   */
  required = false

  /**
   * ### 自定义验证器
   * 请调用 `.setCustomValidator()`
   */
  validator!: (rule: WebValidatorTarget, value: any, callback: WebValidatorCallback) => void

  /**
   * ### 通过指定错误信息来创建一个验证器
   * @param message `可选` 验证失败的提示
   */
  static show(message?: string): WebValidator {
    return new WebValidator().show(message)
  }

  /**
   * ### 是否满足如下的规则
   * @param str 被验证字符串
   * @param list 验证器
   */
  static validate(str: string, ...list: RegExpEnum[]) {
    let regString = ''
    for (let i = 0; i < list.length; i += 1) {
      regString += list[i]
    }
    try {
      return new RegExp(String.raw`^[${regString}]+$`).test(str)
    }
    catch (e) {
      console.error(e)
      // 抛出错误的正则表达式
      throw new Error('What the fuck your regexp is?')
    }
  }

  /**
   * ### 创建一个验证器
   * @param rule 验证规则
   */
  static create(rule: WebValidateRule): WebValidateRule {
    return rule
  }

  /**
   * ### 创建验证器
   * @param service 接口服务对象
   * @param rules `可选` 表单验证规则
   */
  static createRules<T extends WebEntity, S extends AbstractEntityService<T>, V extends WebValidator>(
    this: ClassConstructor<V> & typeof WebValidator,
    service: S,
    rules: WebValidateRule<T> = {},
  ) {
    const formRules: IJson = rules
    const entity = ClassTransformer.newInstance(service.entityClass)
    const formFieldList = entity.getFormFieldConfigList()
    for (let i = 0; i < formFieldList.length; i += 1) {
      const config = formFieldList[i]
      const fieldKey = config.key!
      if (!formRules[fieldKey]) {
        formRules[fieldKey] = []
      }
      if (config.requiredString) {
        formRules[fieldKey].push(this.getValidator(config.requiredString).ifEmpty())
      }
      if (config.requiredNumber) {
        formRules[fieldKey].push(this.getValidator(config.requiredNumber).toNumber().ifEmpty())
      }
      if (config.requiredPayload) {
        formRules[fieldKey].push(this.getValidator(config.requiredPayload).ifPayloadEmpty())
      }
      if (config.minLength) {
        formRules[fieldKey].push(WebValidator.show().ifLengthLessThan(config.minLength))
      }
      if (config.number) {
        if (config.min) {
          formRules[fieldKey].push(WebValidator.show().ifLessThan(config.min))
        }
        if (config.max) {
          formRules[fieldKey].push(WebValidator.show().ifGreaterThan(config.max))
        }
      }
      if (config.chinese) {
        formRules[fieldKey].push(this.getValidator(config.chinese).ifNotChinese())
      }
      if (config.telPhone) {
        formRules[fieldKey].push(this.getValidator(config.telPhone).ifNotTelPhone())
      }
      if (config.mobilePhone) {
        formRules[fieldKey].push(this.getValidator(config.mobilePhone).ifNotMobilePhone())
      }
      if (config.phone) {
        formRules[fieldKey].push(this.getValidator(config.phone).ifNotPhone())
      }
      if (config.email) {
        formRules[fieldKey].push(this.getValidator(config.email).ifNotEmail())
      }
      if (config.regExp) {
        formRules[fieldKey].push(WebValidator.show('').ifNotTest(config.regExp))
      }
    }
    return formRules as WebValidateRule<T>
  }

  /**
   * ### 获取一个验证器
   * @param configValue 验证器配置的值
   */
  private static getValidator(configValue: string | boolean): WebValidator {
    return WebValidator.show(typeof configValue === 'string' ? configValue : '')
  }

  /**
   * ### 转换验证数据为数组
   */
  toArray(): this {
    this.type = 'array'
    return this
  }

  /**
   * ### 转换验证数据为数字
   */
  toNumber(): this {
    this.type = 'number'
    return this
  }

  /**
   * ### 转换验证数据为字符串
   */
  toString(): this {
    this.type = 'string'
    return this
  }

  /**
   * ### 转换验证数据为日期
   */
  toDate(): this {
    this.type = 'date'
    return this
  }

  /**
   * ### 显示错误信息
   * @param message 验证失败提醒文案
   */
  show(message?: string): this {
    if (message) {
      this.message = message
    }
    return this
  }

  /**
   * ### 不允许的内容
   * @param str 内容
   */
  ifEquals(str: string): this {
    this.validator = (_: WebValidatorTarget, value: string, callback: WebValidatorCallback) => {
      if (value && value === str) {
        callback(this.message || `输入的内容不能是${str}`)
      }
      else {
        callback()
      }
    }
    return this
  }

  /**
   * ### 字符长度少于多少时报错
   * @param min 最小值
   */
  ifLengthLessThan(min: number): this {
    this.validator = (_: WebValidatorTarget, value: string, callback: WebValidatorCallback) => {
      if (value && value.length < min) {
        callback(this.message || `最少请输入${min}个字符`)
      }
      else {
        callback()
      }
    }
    return this
  }

  /**
   * ### 字符长度超过多少时报错
   * @param max 最大值
   */
  ifLengthGreaterThan(max: number): this {
    this.validator = (_: WebValidatorTarget, value: string, callback: WebValidatorCallback) => {
      if (value && value.length > max) {
        callback(this.message || `最多允许输入${max}个字符`)
      }
      else {
        callback()
      }
    }
    return this
  }

  /**
   * ### 不小于多少时报错 即必须大于
   * @param min 最小值
   */
  ifNotLessThan(min: number): this {
    this.toNumber()
    this.validator = (_: WebValidatorTarget, value: number, callback: WebValidatorCallback) => {
      if (value <= min) {
        callback(this.message || `数字必须大于${min}`)
      }
      else {
        callback()
      }
    }
    return this
  }

  /** ********************************************* 数学相关 */

  /**
   * ### 不大于多少时报错 即必须小于
   * @param max 最大值
   */
  ifNotGreaterThan(max: number): this {
    this.toNumber()
    this.validator = (_: WebValidatorTarget, value: number, callback: WebValidatorCallback) => {
      if (value >= max) {
        callback(this.message || `数字必须小于${max}`)
      }
      else {
        callback()
      }
    }
    return this
  }

  /**
   * ### 小于多少时报错
   * @param min 最小值
   */
  ifLessThan(min: number): this {
    this.toNumber()
    this.validator = (_: WebValidatorTarget, value: number, callback: WebValidatorCallback) => {
      if (value < min) {
        callback(this.message || `数字最小允许输入${min}`)
      }
      else {
        callback()
      }
    }
    return this
  }

  /**
   * ### 大于多少时报错
   * @param max 最大值
   */
  ifGreaterThan(max: number): this {
    this.toNumber()
    this.validator = (_: WebValidatorTarget, value: number, callback: WebValidatorCallback) => {
      if (value > max) {
        callback(this.message || `数字最大允许输入${max}`)
      }
      else {
        callback()
      }
    }
    return this
  }

  /**
   * ### 为空时报错
   */
  ifEmpty(): this {
    this.required = true
    if (!this.message) {
      this.message = WebI18n.get().Required
    }
    return this
  }

  /**
   * ### 失去焦点时验证
   */
  whenBlur(): this {
    this.trigger = 'blur'
    return this
  }

  /**
   * ### 设置自定义验证器
   * @param validator 验证方法
   */

  setCustomValidator(validator: (_: WebValidatorTarget, value: unknown, callback: WebValidatorCallback) => void): this {
    this.validator = validator
    return this
  }

  /**
   * ### 当不包含某些字符串时报错
   * @param whats 字符串数组
   */
  ifNotContain(...whats: string[]): this {
    let error = false
    this.validator = (_: WebValidatorTarget, value: string, callback: WebValidatorCallback) => {
      error = false
      for (const what of whats) {
        if (!value || !value.includes(what)) {
          error = true
          break
        }
      }
      if (error) {
        callback(this.message || `输入中必须包含 ${whats.join(',')}`)
      }
      else {
        callback()
      }
    }
    return this
  }

  /**
   * ### 当包含某些字符串时报错
   * @param whats 字符串数组
   */
  ifContain(...whats: string[]): this {
    let error = ''
    this.validator = (_: WebValidatorTarget, value: string, callback: WebValidatorCallback) => {
      if (!value) {
        callback()
        return
      }
      for (const what of whats) {
        error = ''
        if (value.includes(what)) {
          error = what
          break
        }
      }
      if (error) {
        callback(this.message || `${WebI18n.get().InvalidContain} ${error} `)
      }
      else {
        callback()
      }
    }
    return this
  }

  /**
   * ### 满足指定正则表达式后报错
   * @param regx 正则
   */
  ifTest(regx: RegExp): this {
    this.validator = (_: WebValidatorTarget, value: string, callback: WebValidatorCallback) => {
      if (value && regx.test(value)) {
        callback(this.message || WebI18n.get().TestError)
      }
      else {
        callback()
      }
    }
    return this
  }

  /**
   * ### 不满足指定正则表达式后报错
   * @param regx 正则
   */
  ifNotTest(regx: RegExp): this {
    this.validator = (_: WebValidatorTarget, value: string, callback: WebValidatorCallback) => {
      if (value && !regx.test(value)) {
        callback(this.message || WebI18n.get().TestError)
      }
      else {
        callback()
      }
    }
    return this
  }

  /**
   * ### 如果不是邮箱时报错
   */
  ifNotEmail(): this {
    this.validator = (_: WebValidatorTarget, value: string, callback: WebValidatorCallback) => {
      if (!value || ValidateUtil.isEmail(value)) {
        callback()
      }
      else {
        callback(this.message || WebI18n.get().InvalidEmail)
      }
    }
    return this
  }

  /**
   * ### 如果不是手机号时报错
   */
  ifNotMobilePhone(): this {
    this.validator = (_: WebValidatorTarget, value: string, callback: WebValidatorCallback) => {
      if (!value || ValidateUtil.isMobilePhone(value)) {
        callback()
      }
      else {
        callback(this.message || WebI18n.get().InvalidMobilePhone)
      }
    }
    return this
  }

  /**
   * ### 如果不是座机号时报错
   */
  ifNotTelPhone(): this {
    this.validator = (_: WebValidatorTarget, value: string, callback: WebValidatorCallback) => {
      if (!value || ValidateUtil.isTelephone(value)) {
        callback()
      }
      else {
        callback(this.message || WebI18n.get().InvalidTelPhone)
      }
    }
    return this
  }

  /**
   * ### 如果不是联系电话时报错
   */
  ifNotPhone(): this {
    this.validator = (_: WebValidatorTarget, value: string, callback: WebValidatorCallback) => {
      if (!value || ValidateUtil.isTelephoneOrMobilePhone(value)) {
        callback()
      }
      else {
        callback(this.message || WebI18n.get().InvalidPhone)
      }
    }
    return this
  }

  /**
   * ### 如果不是纯字母时报错
   */
  ifNotOnlyLetter(): this {
    this.validator = (_: WebValidatorTarget, value: string, callback: WebValidatorCallback) => {
      if (!value || ValidateUtil.isOnlyLetter(value)) {
        callback()
      }
      else {
        callback(this.message || WebI18n.get().InvalidLetter)
      }
    }
    return this
  }

  /**
   * ### 如果不是字母和数字报错
   */
  ifNotOnlyNumberAndLetter(): this {
    this.validator = (_: WebValidatorTarget, value: string, callback: WebValidatorCallback) => {
      if (!value || ValidateUtil.isOnlyNumberAndLetter(value)) {
        callback()
      }
      else {
        callback(this.message || WebI18n.get().InvalidNumberAndLetter)
      }
    }
    return this
  }

  /**
   * ### 如果不是自然整数(含0)时报错
   */
  ifNotNaturalInteger(): this {
    this.toNumber()
    this.validator = (_: WebValidatorTarget, value: string, callback: WebValidatorCallback) => {
      if (!value || ValidateUtil.isNaturalInteger(value)) {
        callback()
      }
      else {
        callback(this.message || WebI18n.get().InvalidNaturalIntegerNumber || '只允许输入非负整数')
      }
    }
    return this
  }

  /**
   * ### 如果不是自然整数(含0)时报错
   */
  ifNotNaturalNumber(): this {
    this.toNumber()
    this.validator = (_: WebValidatorTarget, value: string, callback: WebValidatorCallback) => {
      if (!value || ValidateUtil.isNaturalNumber(value)) {
        callback()
      }
      else {
        callback(this.message || WebI18n.get().InvalidNaturalNumber || '只允许输入非负数字')
      }
    }
    return this
  }

  /**
   * ### 如果不是整数时报错
   */
  ifNotInteger(): this {
    this.toNumber()
    this.validator = (_: WebValidatorTarget, value: string, callback: WebValidatorCallback) => {
      if (!value || ValidateUtil.isInteger(value)) {
        callback()
      }
      else {
        callback(this.message || WebI18n.get().InvalidIntegerNumber)
      }
    }
    return this
  }

  /**
   * ### 如果不是数字(含小数)时报错
   */
  ifNotNumber(): this {
    this.toNumber()
    this.validator = (_: WebValidatorTarget, value: string, callback: WebValidatorCallback) => {
      if (!value || ValidateUtil.isNumber(value)) {
        callback()
      }
      else {
        callback(this.message || WebI18n.get().InvalidNumber)
      }
    }
    return this
  }

  /**
   * ### 如果不是有效身份证时报错
   */
  ifNotChineseIdCard(): this {
    this.validator = (_: WebValidatorTarget, value: string, callback: WebValidatorCallback) => {
      if (!value || ValidateUtil.isChineseIdCard(value)) {
        callback()
      }
      else {
        callback(this.message || WebI18n.get().InvalidChineseIdCard)
      }
    }
    return this
  }

  /**
   * ### 如果不是纯汉字
   */
  ifNotChinese(): this {
    this.validator = (_: WebValidatorTarget, value: string, callback: WebValidatorCallback) => {
      if (!value || ValidateUtil.isChinese(value)) {
        callback()
      }
      else {
        callback(this.message || WebI18n.get().IfNotChinese)
      }
    }
    return this
  }

  /**
   * ### 如果输入内容不在以下范围内报错
   * @param list 范围 枚举或字符
   */
  ifNot(...list: RegExpEnum[] | string[]): this {
    this.validator = (_: WebValidatorTarget, value: string, callback: WebValidatorCallback) => {
      if (!value || WebValidator.validate(value, list as unknown as RegExpEnum)) {
        callback()
      }
      else {
        callback(this.message || WebI18n.get().ContainLetterNotAllowed)
      }
    }
    return this
  }

  /**
   * ### 如果输入内容不在以下范围内报错
   */
  ifPayloadEmpty(): this {
    this.required = true
    this.trigger = 'change'
    this.validator = (_: WebValidatorTarget, value: object, callback: WebValidatorCallback) => {
      if (value) {
        callback()
      }
      else {
        callback(this.message || WebI18n.get().SelectPlease)
      }
    }
    return this
  }
}
