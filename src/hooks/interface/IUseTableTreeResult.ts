import type { AirEntity } from '@airpower/core'
import type { AbstractWebService } from '../../service'
import type { IUseTableResult } from './IUseTableResult'

/**
 * # 树表格的 `Hook` 标准返回
 * @author Hamm.cn
 */
export interface IUseTableTreeResult<E extends AirEntity, S extends AbstractWebService<E>>
  extends IUseTableResult<E, S> {
  /**
   * ### 表格行的添加按钮点击事件
   */
  onAddRow: (row: E) => void
}
