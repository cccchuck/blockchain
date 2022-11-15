import { Message } from '@arco-design/web-vue'
import { useRouter } from 'vue-router'
import type { AxiosRequestConfig } from 'axios'

import request from '@/utils/request'
import { IResponseData } from './types'

const router = useRouter()

const handleServerResponse = (data: IResponseData) => {
  if (data.code !== 20000) {
    Message.error(data.msg)
    return null
  }
  return data.data
}

const handleRequestError = (error: any) => {
  if (error.message) Message.error(error.message)
  return null
}

const handleStatusError = (error: any) => {
  if (error.config) {
    switch (error.config) {
      case 401:
        Message.error('Authorized Expired')
        router.push({
          path: '/sign-in',
          query: { redirect: router.currentRoute.value.fullPath },
        })
        break
      case 404:
        Message.error('Source Not Exist')
        break
      case 500:
        Message.error('Server Error')
        break
    }
  }
}

const handleRequest = async (
  config: AxiosRequestConfig
): Promise<unknown | null> => {
  try {
    const result = await request(config)
    const data = handleServerResponse(result.data)
    return data
  } catch (error) {
    handleRequestError(error)
    handleStatusError(error)
    return null
  }
}

async function get({ url }: { url: string }): Promise<unknown | null> {
  const config = {
    url,
    method: 'GET',
  }

  return await handleRequest(config)
}

async function post({
  url,
  data,
}: {
  url: string
  data: unknown
}): Promise<unknown | null> {
  const config = {
    url,
    data,
    method: 'POST',
  }

  return await handleRequest(config)
}

export { get, post }
