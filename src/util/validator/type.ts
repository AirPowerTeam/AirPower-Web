import type { Entity } from '@airpower/core'
import type { WebValidator } from './WebValidator'

/**
 * ### 验证器数据类型
 */
export type WebValidatorType = 'string' | 'number' | 'date' | 'array'

/**
 * ### 验证器触发类型
 */
export type WebValidatorTrigger = 'blur' | 'change'

/**
 * ### 验证器规则类型
 */
export type WebValidatorTarget = any

/**
 * ### 验证器回调函数类型
 */
export type WebValidatorCallback = (error?: string) => void

/**
 * ### 表单验证规则
 */
export type WebValidateRule<E extends Entity = Entity> = {
  /**
   * ### 字段名:[验证器]
   */
  [K in keyof E]?: WebValidator[]
}
