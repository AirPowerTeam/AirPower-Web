import type { WebMoneyDirection } from '../components'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

export class WebConfig {
  /**
   * ### 是否自动处理权限前缀
   */
  static autoPermissionPrefix = true

  static appKey = 'airpower'

  static uploadUrl = '/upload'

  /**
   * ### 是否禁用权限
   *
   * - 如此项配置为 `true`, 则所有自动处理权限的功能都将失效。
   */
  static disablePermission = false

  /**
   * ### 金额方向 (向上取、向下取、四舍五入)
   */
  static moneyDirection: WebMoneyDirection = 'down'

  /**
   * ### 金额精度
   */
  static moneyPrecision = 2

  /**
   * ### 每页显示条数可选项
   */
  static pageSizes = [10, 20, 50, 100]

  /**
   * ### 默认的上传文件名称
   */
  static uploadFileName = 'file'

  static elementPlusLocale = zhCn
}
