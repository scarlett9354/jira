import { useCallback, useReducer, useState } from "react"
import { useMountedRef } from "utils"

interface State<D> {
  error: Error | null
  data: D | null
  stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState: State<null> = {
  stat: 'idle',
  data: null,
  error: null
}
const defaultConfig = {
  throwOnError: false
}

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef()
  return useCallback((...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0), [dispatch, mountedRef])
}

/**
 * @param initialState 用户传入的state，优先级比defaultInitialState高
 */
export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
  const config = { ...defaultConfig, ...initialConfig }
  const [state, dispatch] = useReducer((state: State<D>,
    action: Partial<State<D>>) => ({ ...state, ...action }), {
    ...defaultInitialState,
    ...initialState
  })

  const safeDispatch = useSafeDispatch(dispatch)

  const [retry, setRetry] = useState(() => () => { })

  // 请求成功
  const setData = useCallback((data: D) => safeDispatch({
    data,
    stat: 'success',
    error: null
  }), [safeDispatch])

  // 请求失败
  const setError = useCallback((error: Error) => safeDispatch({
    error,
    stat: 'error',
    data: null
  }), [safeDispatch])

  // run用来触发异步请求
  const run = useCallback((promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
    if (!promise || !promise.then) {
      // 会打断一切进程
      throw new Error('请传入 Promise 类型数据')
    }
    setRetry(() => () => {
      if (runConfig?.retry) {
        run(runConfig?.retry(), runConfig)
      }
    })
    safeDispatch({ stat: 'loading' })
    return promise.then(data => {
      // 这里的setData已经在上面safeDispatch了
      setData(data)
      return data
    }).catch(error => {
      // catch会消化异常，如果不主动抛出，外面是接收不到异常的
      setError(error)
      if (config.throwOnError) return Promise.reject(error)
      return error
    })
  }, [config.throwOnError, setData, setError, safeDispatch])
  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    run,
    setData,
    setError,
    // retry 被调用时重新跑一遍run，让state刷新一遍
    retry,
    ...state
  }
}