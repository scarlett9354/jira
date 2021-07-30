import React, { ReactNode, useState } from "react"
import * as auth from 'auth-provider'
import { User } from "screens/project-list/search-panel"

interface AuthForm {
  username: string
  password: string
}

const AuthContext = React.createContext<{
  user: User | null
  register: (form: AuthForm) => Promise<void>
  login: (form: AuthForm) => Promise<void>
  logout: () => Promise<void>
} | undefined>(undefined)
// 主要用户devtool中，项目实际应用中没有任何作用
AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  // const login = (form: AuthForm) => auth.login(form).then(user => setUser(user))
  // const register = (form: AuthForm) => auth.register(form).then(user => setUser(user))
  // 消参：point free
  const login = (form: AuthForm) => auth.login(form).then(setUser)
  const register = (form: AuthForm) => auth.register(form).then(setUser)
  const logout = () => auth.logout().then(() => setUser(null))
  return <AuthContext.Provider children={children} value={{ user, login, register, logout }} />
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth必须在AuthProvider中使用')
  }
  return context
}