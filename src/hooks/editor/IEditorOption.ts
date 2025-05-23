import type { RootEntity } from '../../model/RootEntity'
import type { WebValidateRule } from '../../validator/type'
import type { IDetailOption } from '../detail/IDetailOption'

/**
 * ### `Editor` 的 `Hook` 可选配置
 * @author Hamm.cn
 */
export interface IEditorOption<E extends RootEntity> extends IDetailOption<E> {
  /**
   * ### 自定义验证
   */
  customRules?: WebValidateRule<E>

  /**
   * ### 编辑成功的提示消息
   */
  successMessage?: string

  /**
   * ### 请求前拦截器
   * 参数为发起请求的数据,请处理后返回
   *
   * @param submitData 实体
   */
  beforeSubmit?: (submitData: E) => E | null

  /**
   * ### 请求要求继续操作
   */
  successAndContinue?: (data: E) => void

  /**
   * ### 请求添加的URL
   *
   * 如不传入，则默认为 `Service` 的 `urlForAdd`
   */
  apiUrlAdd?: string

  /**
   * ### 请求更新的URL
   *
   * 如不传入，则默认为 `Service` 的 `urlForUpdate`
   */
  apiUrlUpdate?: string
}
