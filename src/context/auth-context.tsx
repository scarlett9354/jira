import React, { ReactNode, useCallback } from "react"
import * as auth from 'auth-provider'
import { User } from "screens/project-list/search-panel"
import { http } from "utils/http"
import { useMount } from "utils"
import { useAsync } from "utils/use-async"
import { FullPageErrorFallBack, FullPageLoading } from "components/lib"
import * as authStore from "store/auth-slice"
import { useDispatch, useSelector } from "react-redux"

export interface AuthForm {
  username: string
  password: string
}

// 从localStorage读取我们存的token，用token获取user信息，并赋给setUser
export const bootstrapUser = async () => {
  let user = null
  const token = auth.getToken()
  if (token) {
    const data = await http('me', { token })
    user = data.user
  }
  return user
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { error, isLoading, isIdle, isError, run } = useAsync<User | null>()
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch()
  // 消参：point free
  // const login = (form: AuthForm) => auth.login(form).then(setUser)
  // const register = (form: AuthForm) => auth.register(form).then(setUser)
  // const logout = () => auth.logout().then(() => setUser(null))

  useMount(() => {
    run(dispatch(authStore.bootstrap()))
  })

  if (isIdle || isLoading) {
    return <FullPageLoading />
  }

  if (isError) {
    return <FullPageErrorFallBack error={error} />
  }

  return <div>{children}</div>
}

export const useAuth = () => {
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch()
  const user = useSelector(authStore.selectUser)
  // 此处需要注意，当我们用自定义hook返回方法时，要给它加上useCallback
  const login = useCallback((form: AuthForm) => dispatch(authStore.login(form)), [dispatch])
  const register = useCallback((form: AuthForm) => dispatch(authStore.register(form)), [dispatch])
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch])

  return {
    user, login, register, logout
  }
}