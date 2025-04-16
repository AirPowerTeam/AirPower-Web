import type { Entity, IJson } from '@airpower/core'
import type { App, Component } from 'vue'
import type { IFile } from '../../util'
import type { IUploadProps } from '../upload'
import ElementPlus from 'element-plus'
import { createApp } from 'vue'
import { WebConfig } from '../../config'
import { WebUpload } from '../upload'

/**
 * # 弹窗工具类
 * @author Hamm.cn
 */
export class DialogUtil {
  /**
   * ### 弹出对话框的内部方法
   * @param view 使用的视图组件 传入一个 `import` 的 `vue`
   * @param param 弹窗参数 将传入到合并到 `props` 上
   */
  static async build<T>(view: Component, param: IJson): Promise<T> {
    const parentNode = document.createElement('div')
    const domId = `dialog_${Math.random()}`
    parentNode.setAttribute('id', domId)
    let app: App<Element> | undefined

    // 卸载dom的方法
    const unmount = () => {
      if (app) {
        app.unmount()
        document.body.removeChild(parentNode)
        app = undefined
      }
    }
    return new Promise((resolve, reject) => {
      if (app) {
        return
      }

      const dialogParam = {
        onConfirm: (p: T) => {
          unmount()
          resolve(p)
        },
        onCallback: (result: IJson) => {
          reject(result)
        },
        onCancel: (error: IJson) => {
          unmount()
          reject(error)
        },
        ...param,
      }

      /**
       * 创建App实例
       */
      app = createApp(view, dialogParam)

      app.use(ElementPlus, { locale: WebConfig.elementPlusLocale })

      document.body.appendChild(parentNode)
      // 挂载组件
      app.mount(parentNode)
    })
  }

  /**
   * ### 弹出一个弹窗
   * @param view 使用的视图组件 传入一个 `import` 的 `vue`
   * @param param `可选` 参数 将传入到目标对象的 `props.param` 参数上
   */
  static async show<T>(view: Component, param?: unknown): Promise<T> {
    return this.build<T>(view, {
      param,
    })
  }

  /**
   * ### 弹出上传文件对话框
   * @param config `可选` 上传自定义配置
   * @param customConfirm `可选` 自定义确认按钮回调方法
   */
  static async showUpload<F extends IFile & Entity>(config?: IUploadProps<F>, customConfirm?: () => void): Promise<F> {
    return this.build<F>(WebUpload, {
      onCustomConfirm: () => {
        if (customConfirm) {
          customConfirm()
        }
      },
      ...config,
    })
  }

  /**
   * ### 弹出一个单选选择器
   * @param view 使用的视图组件 传入一个 `import` 的 `vue`
   * @param param `可选` 普通参数 将传入到目标对象的 `props.param` 参数上
   */
  static async select<E extends Entity>(view: Component, param: E | undefined = undefined): Promise<E> {
    return this.build(view, {
      param,
    })
  }

  /**
   * ### 弹出一个多选选择器
   * @param view 使用的视图组件 传入一个 `import` 的 `vue`
   * @param selectList `可选` 已选列表 将传入到目标对象的 `props.selectList` 参数上
   * @param param `可选` 普通参数 将传入到目标对象的 `props.param` 参数上
   */
  static async selectList<E extends Entity>(
    view: Component,
    selectList: E[] = [],
    param: E | undefined = undefined,
  ): Promise<E[]> {
    return this.build(view, {
      selectList,
      isMultiple: true,
      param,
    })
  }
}
