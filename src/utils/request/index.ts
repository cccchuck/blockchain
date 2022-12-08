/**
 * 对网络请求进行了封装
 * 该封装主要实现的功能:
 * - 对请求层进行抽象，避免耦合
 * - 对请求进行拦截，统一添加 token 以用来鉴权
 * - 对响应进行拦截
 * - 对请求中的请求进行删除，避免多次请求
 */

import axios from 'axios'
import { getAuthToken } from '../auth'

import type { AxiosRequestConfig } from 'axios'

// 用来存储请求中的请求
const pendingRequest = new Map()

// 针对每个请求，生成一个 key
const getPendingRequestKey = (config: AxiosRequestConfig) => {
  let { url, method, params, data } = config
  if (typeof data === 'string') data = JSON.parse(data)
  return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&')
}

// 移除请求中的请求
const removePendingRequest = (key: string) => {
  pendingRequest.delete(key)
}

// 添加请求中的请求
const addPendingRequest = (config: AxiosRequestConfig) => {
  let canceler = null
  const key = getPendingRequestKey(config)
  config.cancelToken = new axios.CancelToken((e) => (canceler = e))
  pendingRequest.set(key, canceler)
}

// 当重复请求时，取消请求
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
