import type { DecoratorTarget } from '@airpower/core'
import type { IWebModelConfig } from './IWebModelConfig'
import { getModelConfig, Model } from '@airpower/core'

/**
 * ### 为模型类标记配置项
 * @param config 配置项
 */
export function WebModel(config: IWebModelConfig = {}) {
  return Model(config)
}

/**
 * ### 获取模型类配置项
 * @param target 目标类
 */
export function getWebModelConfig(target: DecoratorTarget): IWebModelConfig {
  return getModelConfig(target)
}
