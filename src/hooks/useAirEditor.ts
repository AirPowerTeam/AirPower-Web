import type { Ref } from 'vue'
import type { AirAbstractEntityService } from '../../../../spms/airpower/base/AirAbstractEntityService'
import type { AirEntity } from '../../../../spms/airpower/base/AirEntity'
import type { IUseEditorOption } from '../../../../spms/airpower/interface/hooks/IUseEditorOption'
import type { IUseEditorResult } from '../../../../spms/airpower/interface/hooks/IUseEditorResult'
import type { IJson } from '../../../../spms/airpower/interface/IJson'
import type { IValidateRule } from '../../../../spms/airpower/interface/IValidateRule'
import type { AirFormInstance, ServiceConstructor } from '../../../../spms/airpower/type/AirType'
import { computed, ref, watch } from 'vue'
import { AirConfig } from '../../../../spms/airpower/config/AirConfig'
import { AirClassTransformer } from '../../../../spms/airpower/helper/AirClassTransformer'
import { AirI18n } from '../../../../spms/airpower/helper/AirI18n'
import { useAirDetail } from './useAirDetail'

/**
 * # 引入`Editor`的`Hook`
 * @param props `defineProps`的返回值
 * @param serviceClass `Editor`使用的`Service`
 * @param option `可选` 更多的配置
 * @author Hamm.cn
 */
export function useAirEditor<E extends AirEntity, S extends AirAbstractEntityService<E>>(
  props: IJson,
  serviceClass: ServiceConstructor<E, S>,
  option: IUseEditorOption<E> = {},
): IUseEditorResult<E, S> {
  /**
   * ### 详情`Hook`返回对象
   */
  const result = useAirDetail(props, serviceClass, option)

  /**
   * ### 对话框显示的标题
   */
  const title = computed(() => (result.formData.value.id ? AirI18n.get().Edit || '编辑' : AirI18n.get().Add || '添加'))

  /**
   * ### 自动生成的验证规则
   */
  const rules: IValidateRule<E> = result.service.createValidator(props.param, option.customRules || {})

  /**
   * ### 表单实例
   */
  const formRef = ref<AirFormInstance>() as Ref<AirFormInstance>

  /**
   * ### 表单提交事件
   */
  async function onSubmit() {
    let postData = AirClassTransformer.copy(result.formData.value, result.service.entityClass)
    if (option.beforeSubmit) {
      const result = option.beforeSubmit(postData)
      if (result === null) {
        return
      }
      postData = result
    }
    try {
      if (postData.id) {
        const id = await result.service.update(
          postData,
          option.successMessage || AirI18n.get().EditSuccess || '编辑成功',
          option.apiUrlUpdate,
        )
        props.onConfirm(id)
        return
      }
      const id = await result.service.add(
        postData,
        option.successMessage || AirI18n.get().AddSuccess || '添加成功',
        option.apiUrlAdd,
      )
      props.onConfirm(id)
    }
    catch (e: unknown) {
      if ((e as IJson).code === AirConfig.continueCode) {
        if (option.successAndContinue) {
          option.successAndContinue(AirClassTransformer.parse((e as IJson).data, result.service.entityClass))
        }
      }
    }
  }

  watch(
    result.formData,
    () => {
      formRef.value?.validate()
    },
    {
      deep: true,
      immediate: true,
    },
  )

  return Object.assign(result, {
    title,
    formRef,
    rules,
    onSubmit,
  })
}
