import type { ITree } from '@airpower/core'
import type { IUseTableOption } from './IUseTableOption'

/**
 * # `TableTreeList` 的 `Hook` 可选配置
 * @author Hamm.cn
 */
export interface IUseTableTreeOption<T extends ITree> extends IUseTableOption<T> {
  /**
   * ### 添加行的子项的前置拦截方法
   * 参数为发起请求的数据,请处理后返回 `param`
   *
   * @param param 添加的数据
   * @param row 当前行数据
   */
  beforeAddRow?: (param: T, row: T) => T | void
}
