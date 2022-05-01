import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { HZHRequestConfig, HZHRequestInterceptor } from './type'
import { ElLoading } from 'element-plus'

const DEAFULT_LOADING = true

class HZHRequest {
  instance: AxiosInstance
  interceptors?: HZHRequestInterceptor
  //默认加载loading动画
  isShowLoading?: boolean
  loadingInstance?: any

  constructor(config: HZHRequestConfig) {
    //1.创建axios实例
    this.instance = axios.create(config)

    this.interceptors = config.interceptors
    this.isShowLoading = config.isShowLoading ?? DEAFULT_LOADING

    //2.使用拦截器
    //2.1.将config中设置的拦截器取出给创建的实例
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    //2.2.此处设置所有axios实例都会带有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log('请求拦截成功')
        //设置loading加载动画
        if (this.isShowLoading) {
          this.loadingInstance = ElLoading.service({
            lock: true,
            text: '正在请求数据....',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }
        return config
      },
      (err) => {
        console.log('请求拦截失败')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // 将loading移除
        this.loadingInstance.close()

        const data = res.data
        //例子：状态码为200，但是还是请求失败，服务器错误
        if (data.returnCode === '-1001') {
          console.log('请求失败，错误信息：-1001')
        } else {
          return data
        }
        return res
      },
      (err) => {
        // 将loading移除
        this.loadingInstance.close()

        //例子：判断不同的HTTPErrorCode显示不同的错误信息
        if (err.response.status === 404) {
          console.log('404错误')
        }
        return err
      }
    )
  }

  //3.0.实现axios用例对应的方法
  request<T>(config: HZHRequestConfig<T>): Promise<T> {
    return new Promise((reslove, reject) => {
      //2.3.处理某个请求对拦截器的个别设置
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      //判断是否需要显示loading
      if (config.isShowLoading === false) {
        this.isShowLoading = config.isShowLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors?.responseInterceptor(res)
          }

          //将showLoading设置true, 这样不会影响下一个请求
          this.isShowLoading = DEAFULT_LOADING
          reslove(res)
        })
        .catch((err) => {
          //将showLoading设置true, 这样不会影响下一个请求
          this.isShowLoading = DEAFULT_LOADING
          reject(err)
        })
    })
  }
  get<T>(config: HZHRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: HZHRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: HZHRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T>(config: HZHRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default HZHRequest
