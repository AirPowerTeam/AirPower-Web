import type { ITree } from '../../../interface/ITree'
import type { RootEntity } from '../../../model/RootEntity'
import type { AbstractCurdService } from '../../../service/AbstractCurdService'
import type { CurdServiceConstructor } from '../../../service/type'
import type { ITableTreeOption } from './ITableTreeOption'
import type { ITableTreeResult } from './ITableTreeResult'
import { Transformer } from '@airpower/transformer'
import { DialogUtil } from '../../../dialog/DialogUtil'
import { FeedbackUtil } from '../../../feedback/FeedbackUtil'
import { useTable } from '../list/useTable'

/**
 * ### 引入表格树使用的`Hook`
 * @param serviceClass 表格使用的`Service`类
 * @param option `可选` 更多配置
 * @author Hamm.cn
 */
export function useTableTree<E extends ITree & RootEntity, S extends AbstractCurdService<E>>(
  serviceClass: CurdServiceConstructor<E, S>,
  option: ITableTreeOption<E> = {},
): ITableTreeResult<E, S> {
  // 设置不分页
  if (option.unPaginate === undefined) {
    option.unPaginate = true
  }

  /**
   * ### 表格`Hook`返回对象
   */
  const result = useTable(serviceClass, option)

  /**
   * ### 树表格添加子项事件
   * @param row 行数据
   */
  async function onAddRow(row: E) {
    if (!option.editView) {
      FeedbackUtil.toastError('请为 useTable 的 option 传入 editor')
      return
    }
    try {
      let param = Transformer.newInstance(result.service.entityClass)
      param.parentId = row.id
      if (option.beforeAddRow) {
        const result = option.beforeAddRow(param, row)
        if (result !== undefined) {
          param = result
        }
      }
      await DialogUtil.show(option.editView, param)
    }
    finally {
      result.onReloadData()
    }
  }

  return Object.assign(result, {
    onAddRow,
  })
}
