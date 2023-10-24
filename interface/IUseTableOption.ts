/* eslint-disable no-unused-vars */
import { Component } from 'vue'
import { AirRequestPage } from '../model/AirRequestPage'
import { AirEntity } from '../base/AirEntity'
/**
 * # TableList的Hook可选配置
 */
export interface IUseTableOption<E extends AirEntity> {
  /**
   * # 不分页
   * ---
   * 💡 默认请求分页接口 如配置了 `treeList` 则此项自动失效
   */
  unPaginate?: boolean,

  /**
   * # 💡 请求专用的treeList接口
   */
  treeList?: boolean,

  /**
   * # 新增修改的视图Vue文件
   */
  editView?: Component

  /**
   * # 详情的视图Vue文件
   */
  detailView?: Component

  /**
   * # 搜索前的拦截方法
   * ---
   * 💡 参数为发起请求的数据,请处理后返回
   *
   * @param requestData 请求对象
   */
  beforeSearch?: (requestData: AirRequestPage<E>) => AirRequestPage<E> | void
}
