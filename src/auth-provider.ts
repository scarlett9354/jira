import { User } from "screens/project-list/search-panel"

const localStorageKey = '__auth_provider_token__'

export const getToken = () => window.localStorage.getItem(localStorageKey)

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || '')
  return user
}

const apiUrl = process.env.REACT_APP_API_URL
export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(async response => {
    if (response.ok) {
      return handleUserResponse(await response.json())
    } else {
      // 相当于throw new Error
      // return Promise.reject(data)
      return Promise.reject(await response.json())
    }
  })
}

export const register = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(async response => {
    if (response.ok) {
      return handleUserResponse(await response.json())
    } else {
      // 相当于throw new Error
      // return Promise.reject(data)
      return Promise.reject(await response.json())
    }
  })
}

export const logout = async () => window.localStorage.removeItem(localStorageKey)