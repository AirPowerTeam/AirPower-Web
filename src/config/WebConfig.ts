import type { MoneyDirection } from '../type'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { HttpHeader } from '../http/enum/HttpHeader'
import { HttpStatus } from '../http/enum/HttpStatus'

/**
 * ### 全局配置
 *
 * @author Hamm.cn
 */
export class WebConfig {
  /**
   * ### 应用标识
   */
  static appKey: string = 'AirPower'

  /**
   * ### 是否自动处理权限前缀
   */
  static autoPermissionPrefix: boolean = true

  /**
   * ### 最大文本域长度
   */
  static maxTextAreaLength: number = 200

  /**
   * ### 最大文本长度
   */
  static maxTextLength: number = 50

  /**
   * ### 文本域的最小行数
   */
  static textareaMinRows: number = 3

  /**
   * ### 文本域的最大行数
   */
  static textareaMaxRows: number = 6

  /**
   * ### 上传地址
   */
  static uploadUrl: string = '/upload'

  /**
   * ### 是否禁用权限
   *
   * - 如此项配置为 `true`, 则所有自动处理权限的功能都将失效。
   */
  static disablePermission: boolean = false

  /**
   * ### 金额方向 (向上取、向下取、四舍五入)
   */
  static moneyDirection: MoneyDirection = 'down'

  /**
   * ### 金额精度
   */
  static moneyPrecision: number = 2

  /**
   * ### 每页显示条数可选项
   */
  static pageSizes: number[] = [10, 20, 50, 100]

  /**
   * ### 默认的上传文件名称
   */
  static uploadFileName: string = 'file'

  /**
   * ### element-plus 语言包
   */
  static elementPlusLocale = zhCn

  /**
   * ### 权限缓存 `Key`
   */
  static permissionCacheKey: string = 'permissions'

  /**
   * ### 接口根地址
   * 以 `/` 结尾
   */
  static apiUrl: string = '/api/'

  /**
   * ### 最大数字
   */
  static maxNumber: number = 999999999

  /**
   * ### 最小数字
   */
  static minNumber: number = 0

  /**
   * ### `AccessToken` 对应的 `Key`
   */
  static authorizationHeaderKey: string = HttpHeader.AUTHORIZATION

  /**
   * ### 全局 `http` 请求返回 成功状态码
   */
  static successCode: number = HttpStatus.OK

  /**
   * ### 全局 `http` 请求返回 登录状态码
   */
  static unAuthorizeCode: number = HttpStatus.UNAUTHORIZED

  /**
   * ### 超时时间 毫秒
   * 超时后请求会自动断开并抛出异常
   */
  static timeout: number = 5000

  /**
   * ### 导出模板地址
   */
  static importTemplateUrl: string = '/export/template'

  /**
   * ### 导入API地址
   */
  static importUrl: string = '/import'

  /**
   * ### 导出API地址
   */
  static exportUrl: string = '/export'

  /**
   * ### 导出查询API地址
   */
  static exportQueryUrl: string = '/queryExport'

  /**
   * ### 静态资源地址
   */
  static staticUrl: string = '/static/'

  /**
   * ### 登录地址
   */
  static loginUrl: string = '/login'

  /**
   * ### 小数精度位数
   */
  static numberPrecision: number = 2

  /**
   * ### 是否超时
   */
  static isTimeout: boolean = false

  /**
   * ### 产品名称
   */
  static product: string = 'AirPower'

  /**
   * ### 树形控件属性
   */
  static treeProps = {
    children: 'children',
    label: 'name',
  }

  /**
   * ### 权限前缀
   */
  static permissionPrefix = ''

  /**
   * ### 获取身份令牌
   */
  static getAccessToken(): string {
    return localStorage.getItem(this.authorizationHeaderKey) || ''
  }

  /**
   * ### 移除身份令牌
   */
  static removeAccessToken() {
    localStorage.removeItem(this.authorizationHeaderKey)
  }

  /**
   * ### 设置身份令牌
   * @param accessToken 身份令牌
   */
  static saveAccessToken(accessToken: string) {
    localStorage.setItem(this.authorizationHeaderKey, accessToken)
  }
}
