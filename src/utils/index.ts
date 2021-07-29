import { useEffect, useState } from "react"

// 排除value为0的情况
export const isFalsy = (value: any) => value === 0 ? false : !value

export const cleanObject = (obj: object) => {
  const result = { ...obj }
  Object.keys(result).forEach(key => {
    // @ts-ignore
    const value = result[key]
    if (isFalsy(value)) {
      // @ts-ignore
      delete result[key]
    }
  })
  return result
}

// Custom Hook
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export const useDebounce = (value: any, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    // 每次在value变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay)
    // 每次在上一个useEffect处理完以后再运行
    return () => clearTimeout(timeout)
  }, [value, delay])
  return debouncedValue
}