import type { PropType } from 'vue'
import type { RootEntity } from '../model/RootEntity'
import { RootModel } from '../model/RootModel'

/**
 * ### 弹窗的配置
 *
 * @author Hamm.cn
 */
export class DialogProps {
  /**
   * ### 使用无参 `DialogProps` 配置
   */
  static create() {
    return {
      /**
       * ### 弹窗的确认按钮被点击事件
       * 如果给 `ADialog` 传入了 `form` 表单的 `ref` 实体对象, 则校验通过之后才会回调此方法
       */
      onConfirm: {
        type: Function as PropType<(data?: unknown) => void>,
        default: () => () => {
          // console.log('On Confirm')
        },
      },

      /**
       * ### 弹窗的取消或关闭按钮被点击事件
       */
      onCancel: {
        type: Function as PropType<() => void>,
        default: () => () => {
          // console.log('On Cancel')
        },
      },

      /**
       * ### 弹窗的回调事件,不关闭弹窗
       */
      onCallback: {
        type: Function as PropType<() => void>,
        default: () => () => {
          // console.log('On Cancel')
        },
      },
    }
  }

  /**
   * ### 使用实体的 `DialogProps` 配置
   * - `P` Param的类型
   * @param value `可选` 默认参数
   */
  static withParam<P>(value: P | null = null) {
    // 如果 value 是 RootModel 的之类 调用RootModel的copy方法
    if (value instanceof RootModel) {
      value = value.copy()
    }
    return Object.assign(this.create(), {
      /**
       * ### 父窗体弹出当前窗体时传入的参数
       */
      param: {
        type: Object as PropType<P>,
        default: value,
      },
    })
  }

  /**
   * ### 使用 `ID` 的 `DialogProps` 配置
   * 传入的 `param` 参数为 `Number` 类型的 `ID`
   */
  static withId() {
    return this.withParam<number>(0)
  }

  /**
   * ### 使用选择器的 `DialogProps` 配置
   * - `S`: `selectList` 参数的类型
   * - `P`: `param` 参数的类型(默认同 `selectList` 类型一致)
   *
   * @param param 选择器的参数
   */
  static withSelector<S extends RootEntity, P extends RootEntity = S>(param: P | null = null) {
    return Object.assign(this.withParam<P>(param), {
      /**
       * ### 是否使用多选
       */
      isMultiple: {
        type: Boolean,
        default: false,
      },

      /**
       * ### 已经选择了的实体列表数组
       * ! 仅在 `isMultiple` 为true时会有值
       * 请放心使用ID属性, 其他的属性不一定有
       */
      selectList: {
        type: Array<S>,
        default: () => [],
      },

      /**
       * ### 传入参数为一个实体
       *
       * 能保证的是, 确实是一个实体的基类, 可以调用一些 `Transformer` 的方法
       *
       * ```typescript
       * Transformer.parse(props.param.toSourceObject(), UserEntity)
       * ```
       */
      param: {
        type: Object as PropType<P>,
        default: param,
      },
    })
  }
}
