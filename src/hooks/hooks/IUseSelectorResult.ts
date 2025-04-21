import type { Ref } from 'vue'
import type { AirEntity } from '../../../../../spms/airpower/base/AirEntity'
import type { AirAbstractEntityService } from '../../base/AirAbstractEntityService'
import type { ITableHookResult } from './ITableHookResult'

/**
 * # 选择器 `Hook` 的标准返回
 * @author Hamm.cn
 */
export interface IUseSelectorResult<E extends AirEntity, S extends AirAbstractEntityService<E>>
  extends ITableHookResult<E, S> {
  /**
   * ### `Selector` 的标题
   */
  title: Ref<string>

  /**
   * ### 是否禁用确认按钮
   * 多选时当没有选择任何数据时将禁用确认按钮
   */
  disableConfirm: Ref<boolean>
}
