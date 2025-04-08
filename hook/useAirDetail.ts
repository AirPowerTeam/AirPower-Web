import type { Ref } from 'vue'
import type { AirAbstractEntityService } from '../base/AirAbstractEntityService'
import type { AirEntity } from '../base/AirEntity'
import type { IUseDetailOption } from '../interface/hooks/IUseDetailOption'
import type { IUseDetailResult } from '../interface/hooks/IUseDetailResult'
import type { IJson } from '../interface/IJson'
import type { ServiceConstructor } from '../type/AirType'
import { provide, ref } from 'vue'
import { AirClassTransformer } from '../helper/AirClassTransformer'
import { AirI18n } from '../helper/AirI18n'

/**
 * # 引入详情的`Hook`
 * @param props `defineProps` 的返回值
 * @param serviceClass 详情使用的 `Service`
 * @param option `可选` 更多的配置
 * @author Hamm.cn
 */
export function useAirDetail<E extends AirEntity, S extends AirAbstractEntityService<E>>(
  props: IJson,
  serviceClass: ServiceConstructor<E, S>,
  option: IUseDetailOption<E> = {},
): IUseDetailResult<E, S> {
  /**
   * ### 加载状态
   */
  const isLoading = ref(false)

  /**
   * ### 传入的 `Service` 对象
   */
  const service = AirClassTransformer.newInstance(serviceClass)
  service.loading = isLoading

  /**
   * ### 表单对象
   */
  const formData: Ref<E> = ref(props.param ? props.param.copy() : AirClassTransformer.newInstance(service.entityClass))

  /**
   * ### 显示的对话框标题
   */
  const title = ref(AirI18n.get().Detail || '详情')

  /**
   * ### 查询详情方法
   */
  async function getDetail() {
    if (formData.value.id) {
      formData.value = await service.getDetail(formData.value.id, option.apiUrl)

      if (option.afterGetDetail) {
        const result = option.afterGetDetail(formData.value)
        if (result !== undefined) {
          formData.value = result
        }
      }
    }
  }

  provide('entityClass', service.entityClass)
  provide('formData', formData)

  getDetail()

  return {
    title,
    formData,
    isLoading,
    service,
    getDetail,
  }
}
