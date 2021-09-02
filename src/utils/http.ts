import qs from 'qs'
import * as auth from 'auth-provider'
import { useAuth } from 'context/auth-context'
import { useCallback } from 'react'

const apiUrl = process.env.REACT_APP_API_URL
/**
 * @param endpoint 接口
 * @param param1 fetch的一些配置
 * @returns 
 */
interface Config extends RequestInit {
  token?: string
  data?: object
}
export const http = async (endpoint: string, { data, token, headers, ...customConfig }: Config = {}) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : ''
    },
    ...customConfig
  }
  // get请求中的参数直接带到url里，post、patch、delete直接放到body中
  if (config.method.toUpperCase() === 'GET') {
    endpoint += `?${qs.stringify(data)}`
  } else {
    config.body = JSON.stringify(data || {})
  }
  // 如果不记得像fetch这样的api定义的参数，直接鼠标+ctrl就能看到它的类型定义
  return window.fetch(`${apiUrl}/${endpoint}`, config).then(async response => {
    if (response.status === 401) {
      // 未登录或者token失效
      await auth.logout()
      window.location.reload()
      return Promise.reject({ message: '请重新登录' })
    }
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      // 这里之所以要主动返回reject，是因为在fetch api中服务端返回的异常状态并不能在它的catch中抛出异常，只有断网、网络连接失败时才抛出
      // axios和fetch的表现不一样，axios可以直接在返回状态不为2xx时抛出异常
      return Promise.reject(data)
    }
  })
}

export const useHttp = () => {
  const { user } = useAuth()
  // [string, Config]类型和上面http的参数类型完全一致，可以复用 - 使用Parameters操作(Utility Types)
  // return ([endpoint, config]: [string, Config]) => http(endpoint, { ...config, token: user?.token })
  return useCallback(
    (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, { ...config, token: user?.token }),
    [user?.token]
  )
}