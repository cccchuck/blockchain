import axios from 'axios'
import { getAuthToken } from '../auth'

import type { AxiosRequestConfig } from 'axios'

const pendingRequest = new Map()

const getPendingRequestKey = (config: AxiosRequestConfig) => {
  let { url, method, params, data } = config
  if (typeof data === 'string') data = JSON.parse(data)
  return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&')
}

const removePendingRequest = (key: string) => {
  pendingRequest.delete(key)
}

const addPendingRequest = (config: AxiosRequestConfig) => {
  let canceler = null
  const key = getPendingRequestKey(config)
  config.cancelToken = new axios.CancelToken((e) => (canceler = e))
  pendingRequest.set(key, canceler)
}

const cancelPendingRequest = (key: string) => {
  const canceler = pendingRequest.get(key)
  canceler()
  pendingRequest.delete(key)
}

const request = <T>(config: AxiosRequestConfig<T>) => {
  const service = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 5000,
  })

  service.interceptors.request.use(
    (config) => {
      const key = getPendingRequestKey(config)

      if (pendingRequest.get(key) !== undefined) {
        // 取消重复请求
        cancelPendingRequest(key)
        removePendingRequest(key)
      }
      addPendingRequest(config)

      if (config.headers)
        config.headers['Authorization'] = getAuthToken()
          ? `Bearer ${getAuthToken()}`
          : getAuthToken()

      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  service.interceptors.response.use(
    (response) => {
      const key = getPendingRequestKey(response.config)
      removePendingRequest(key)
      return response
    },
    (error) => {
      const key = getPendingRequestKey(error?.config)
      removePendingRequest(key)
      return Promise.reject(error)
    }
  )

  return service.request<T>(config)
}

export default request
