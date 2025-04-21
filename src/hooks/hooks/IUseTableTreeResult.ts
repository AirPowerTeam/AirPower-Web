import type { AirEntity } from '../../../../../spms/airpower/base/AirEntity'
import type { AirAbstractEntityService } from '../../base/AirAbstractEntityService'
import type { IUseTableResult } from './IUseTableResult'

/**
 * # 树表格的 `Hook` 标准返回
 * @author Hamm.cn
 */
export interface IUseTableTreeResult<E extends AirEntity, S extends AirAbstractEntityService<E>>
  extends IUseTableResult<E, S> {
  /**
   * ### 表格行的添加按钮点击事件
   */
  onAddRow: (row: E) => void
}
