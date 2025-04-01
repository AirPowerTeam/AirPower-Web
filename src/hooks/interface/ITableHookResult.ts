import type { AirEntity, Page, QueryPageRequest, QueryPageResponse, QuerySort } from '@airpower/core'
import type { Ref } from 'vue'
import type { AbstractWebService } from '../../service'

/**
 * # `TableHook` 的基础返回结构
 * @author Hamm.cn
 */
export interface ITableHookResult<E extends AirEntity, S extends AbstractWebService<E>> {
  /**
   * ### 当前绑定的 `Loading` 状态
   * 请随意 `v-loading` 到你需要的地方
   */
  isLoading: Ref<boolean>

  /**
   * ### 响应数据
   */
  response: Ref<QueryPageResponse<E>>

  /**
   * ### 请求数据
   */
  request: Ref<QueryPageRequest<E>>

  /**
   * ### 返回的单页数据列表
   */
  list: Ref<E[]>

  /**
   * ### 选中的数据列表
   */
  selectList: Ref<E[]>

  /**
   * ### 实体的实例
   */
  entity: E

  /**
   * ### `Service`的实例
   */
  service: S

  /**
   * ### 刷新数据 返回第一页
   */
  onReloadData: () => void

  /**
   * ### 搜索事件
   *
   * @param request 请求对象
   */
  onSearch: (request: QueryPageRequest<E>) => void

  /**
   * ### 分页变更事件
   *
   * @param page 分页对象
   */

  onPageChanged: (page: Page) => void

  /**
   * ### 详情事件
   *
   * @param row 选择的行
   */

  onDetail: (row: E) => void

  /**
   * ### 添加事件
   */
  onAdd: () => void

  /**
   * ### 排序变更事件
   *
   * @param sort 排序对象
   */

  onSortChanged: (sort?: QuerySort) => void | Promise<void>

  /**
   * ### 多选事件
   *
   * @param list 选择的行列表
   */

  onSelected: (list: E[]) => void

  /**
   * ### 刷新数据 保持留在当页
   */
  onGetList: () => void
}
