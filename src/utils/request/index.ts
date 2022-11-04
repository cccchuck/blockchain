import axios from 'axios'
import { useRouter } from 'vue-router'
import { Message } from '@arco-design/web-vue'
import { getAuthToken, setAuthToken } from '../auth'

import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import type { IResponseData } from './types'

const router = useRouter()

const handleServerResponse = (data: IResponseData) => {
  if (!data.message.includes('success')) {
    switch (data.code) {
      case 40001:
        Message.error('Authorized Failed')
        break
      case 40002:
        Message.error('Authorized Expiration')
        setAuthToken('')
        router.push('/sign-in')
        break
    }
    return null
  }
  return data.data
}

const handleStatusError = (error: any) => {
  if (error.config) {
    switch (error.config) {
      case 401:
        Message.error('Authorized Failed')
        break
      case 403:
        Message.error('Forbidden')
        break
      case 404:
        Message.error('Source Not Exist')
        break
      case 429:
        Message.error('Request speed limited')
        break
      case 500:
        Message.error('Server Error')
        break
    }
  }
}

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

const request = (config: AxiosRequestConfig<any>) => {
  const service = axios.create({
    baseURL: 'https://localhost:',
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

      if (config.headers) config.headers['X-Token'] = getAuthToken()
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
      const data = handleServerResponse(response.data)
      return data as AxiosResponse<any, any>
    },
    (error) => {
      const key = getPendingRequestKey(error?.config)
      removePendingRequest(key)
      handleStatusError(error)
      return Promise.reject(error)
    }
  )

  return service.request(config)
}

export default request
