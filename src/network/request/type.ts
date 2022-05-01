import { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface HZHRequestInterceptor<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (err: any) => any
}

export interface HZHRequestConfig<T = AxiosResponse>
  extends AxiosRequestConfig {
  interceptors?: HZHRequestInterceptor<T>
  //可传入是否需要loading加载动画
  isShowLoading?: boolean
}
