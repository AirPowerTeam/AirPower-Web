// noinspection Annotator
import type { IJson } from '@airpower/core'
import type { AxiosRequestConfig } from 'axios'
import { AbstractHttp, HttpResponse, HttpStatus, Model } from '@airpower/core'
import axios from 'axios'
import { ref } from 'vue'
import { Table } from '../decorator'
import { WebAccessTokenUtil } from '../util'

/**
 * # 网络请求类
 * @author Hamm.cn
 */
@Model({
  label: 'HTTP',
})
export class WebHttp extends AbstractHttp {
  /**
   * ### 加载状态
   */
  @Table()
  loading = ref(false)

  protected async request(body?: unknown): Promise<HttpResponse> {
    const axiosConfig: AxiosRequestConfig = {}
    axiosConfig.url = this.getUrl()
    axiosConfig.headers = this.getHttpHeaders() as IJson
    axiosConfig.timeout = this.getTimeout()
    axiosConfig.method = this.getMethod()
    axiosConfig.data = body
    const response = new HttpResponse()
    try {
      const res = await axios.request(axiosConfig)
      if (res.status !== HttpStatus.OK) {
        response.code = res.status
        response.message = res.statusText
        response.data = res
        return response
      }
      response.code = res.data.code
      response.message = res.data.message
      response.data = res.data.data
      return response
    }
    catch (e) {
      response.code = HttpStatus.INTERNAL_SERVER_ERROR
      response.message = (e as Error).message
      response.data = e
      return response
    }
  }

  /**
   * # 获取AccessToken
   */
  protected getAccessToken(): string {
    return WebAccessTokenUtil.getAccessToken()
  }

  protected startLoading() {
    this.loading.value = true
  }

  protected stopLoading() {
    this.loading.value = false
  }
}
