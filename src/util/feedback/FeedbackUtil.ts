import type { FeedbackType } from './type'
import { ElMessage, ElMessageBox } from 'element-plus'
import { WebI18n } from '../../i18n'

/**
 * ### 弹窗工具
 * @author Hamm.cn
 */
export class FeedbackUtil {
  static defaultToastDuration = 3000

  /**
   * ### 警告吐司
   * @param message 消息
   */
  static toastWarning(message: string) {
    this.showToast(message, 'warning')
  }

  /**
   * ### 信息吐司
   * @param message 消息
   */
  static toastInfo(message: string) {
    this.showToast(message, 'info')
  }

  /**
   * ### 成功吐司
   * @param message 消息
   */
  static toastSuccess(message: string) {
    this.showToast(message, 'success')
  }

  /**
   * ### 错误吐司
   * @param message 错误
   */
  static toastError(message: string) {
    this.showToast(message, 'error')
  }

  /**
   * ### 显示吐司
   * @param message 消息
   * @param type 类型
   * @param duration 显示时长
   */
  static showToast(message: string, type: FeedbackType = undefined, duration = this.defaultToastDuration) {
    ElMessage({
      message,
      type,
      plain: true,
      duration,
    })
  }

  /**
   * ### 显示确认窗
   * @param message 消息
   * @param title 标题
   * @param type 类型
   */
  static async showConfirm(message: string, title = WebI18n.get().ConfirmPlease, type: FeedbackType = undefined): Promise<void> {
    await ElMessageBox.alert(
      message,
      title,
      {
        confirmButtonText: WebI18n.get().Confirm,
        type,
        closeOnClickModal: false,
        closeOnPressEscape: true,
        draggable: true,
        overflow: false,
      },
    )
  }

  /**
   * ### 显示成功确认
   * @param message 消息
   * @param title 标题
   */
  static async confirmSuccess(message: string, title?: string): Promise<void> {
    return this.showConfirm(message, title, 'success')
  }

  /**
   * ### 显示错误确认
   * @param message 消息
   * @param title 标题
   */
  static async confirmError(message: string, title?: string): Promise<void> {
    return this.showConfirm(message, title, 'error')
  }

  /**
   * ### 显示警告确认
   * @param message 消息
   * @param title 标题
   */
  static async confirmWarning(message: string, title?: string): Promise<void> {
    return this.showConfirm(message, title, 'warning')
  }

  /**
   * ### 显示信息确认
   * @param message 消息
   * @param title 标题
   */
  static async confirmInfo(message: string, title?: string): Promise<void> {
    return this.showConfirm(message, title, 'info')
  }

  /**
   * ### 显示弹窗
   * @param message 消息
   * @param title 标题
   * @param type 类型
   */
  static async showAlert(message: string, title = WebI18n.get().Alert, type: FeedbackType = undefined): Promise<void> {
    await ElMessageBox.alert(
      message,
      title,
      {
        confirmButtonText: WebI18n.get().Confirm,
        type,
        closeOnClickModal: false,
        closeOnPressEscape: true,
        draggable: true,
        overflow: false,
      },
    )
  }

  /**
   * ### 显示弹窗成功
   * @param message 消息
   * @param title 标题
   */
  static async alertSuccess(message: string, title?: string): Promise<void> {
    return this.showAlert(message, title, 'success')
  }

  /**
   * ### 显示弹窗错误
   * @param message 消息
   * @param title 标题
   */
  static async alertError(message: string, title?: string): Promise<void> {
    return this.showAlert(message, title, 'error')
  }

  /**
   * ### 显示弹窗警告
   * @param message 消息
   * @param title 标题
   */
  static async alertWarning(message: string, title?: string): Promise<void> {
    return this.showAlert(message, title, 'warning')
  }

  /**
   * ### 显示弹窗信息
   * @param message 消息
   * @param title 标题
   */
  static async alertInfo(message: string, title?: string): Promise<void> {
    return this.showAlert(message, title, 'info')
  }
}
