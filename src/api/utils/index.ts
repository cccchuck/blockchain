import { Message } from '@arco-design/web-vue'
import type { AxiosRequestConfig } from 'axios'

import request from '@/utils/request'
import { IResponseData } from './types'

import router from '@/router'

const handleServerResponse = <T>(data: IResponseData) => {
  if (data.code === 40001) {
    router.push({
      path: '/sign-in',
      query: { redirect: router.currentRoute.value.fullPath },
    })
    return null
  }

  if (data.code !== 20000) {
    Message.error(data.msg)
    return null
  }
  return data.data as T
}

const handleRequestError = (error: any) => {
  if (error.message) Message.error(error.message)
  return null
}

const handleStatusError = (error: any) => {
  if (error.config) {
    switch (error.config) {
      case 404:
        Message.error('Source Not Exist')
        break
      case 500:
        Message.error('Server Error')
        break
    }
  }
}

const handleRequest = async <T>(
  config: AxiosRequestConfig
): Promise<T | null> => {
  try {
    const result = await request<T>(config)
    const data = handleServerResponse<T>(result.data as IResponseData)
    return data
  } catch (error) {
    handleRequestError(error)
    handleStatusError(error)
    return null
  }
}

async function get<T>({ url }: { url: string }): Promise<T | null> {
  const config = {
    url,
    method: 'GET',
  }

  return await handleRequest<T>(config)
}

async function post<T>({
  url,
  data,
}: {
  url: string
  data: unknown
}): Promise<T | null> {
  const config = {
    url,
    data,
    method: 'POST',
  }

  return await handleRequest<T>(config)
}

export { get, post }
