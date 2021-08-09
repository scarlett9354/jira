import { useState } from "react"

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
/**
 * @param initialState 用户传入的state，优先级比defaultInitialState高
 */
export const useAsync = <D>(initialState?: State<D>) => {
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState
  })

  // 请求成功
  const setData = (data: D) => setState({
    data,
    stat: 'success',
    error: null
  })

  // 请求失败
  const setError = (error: Error) => setState({
    error,
    stat: 'error',
    data: null
  })

  // run用来触发异步请求
  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      // 会打断一切进程
      throw new Error('请传入 Promise 类型数据')
    }
    setState({ ...state, stat: 'loading' })
    return promise.then(data => {
      setData(data)
      return data
    }).catch(error => {
      setError(error)
      return error
    })
  }
  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    run,
    setData,
    setError,
    ...state
  }
}