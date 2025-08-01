import type { IEntity } from '../interface/IEntity'
import { Field } from '../decorator/@Field/Field'
import { Table } from '../decorator/@Table/Table'
import { DisableEnum } from '../enum/DisableEnum'
import { RootModel } from './RootModel'

/**
 * ### 实体模型
 *
 * @author Hamm.cn
 */
export class RootEntity extends RootModel implements IEntity {
  @Field({
    label: 'ID',
  })
  @Table({
    width: 80,
    order: 9999,
    force: true,
    copy: true,
  })
  id!: number

  /**
   * ### 是否禁用
   */
  @Table({
    width: 80,
    order: -100,
    force: true,
    color: true,
  })
  @Field({
    label: '是否禁用',
    dictionary: DisableEnum,
  })
  isDisabled!: boolean

  /**
   * ### 实例化一个实体
   * @param id `可选` 主键 `ID`
   */
  constructor(id?: number) {
    super()
    if (id) {
      this.id = id
    }
  }

  /**
   * ### 设置禁用
   * @param isDisabled 禁用
   */
  setDisable(isDisabled = true): this {
    this.isDisabled = isDisabled
    return this
  }
}
