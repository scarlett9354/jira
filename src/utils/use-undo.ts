import { useCallback, useState } from "react"

export const UseUndo = <T>(initialPresent: T) => {
  const [state, setState] = useState<{
    past: T[],
    present: T,
    future: T[]
  }>({
    past: [],
    present: initialPresent,
    future: []
  })
  // 或者可以这样写
  // const [state, setState] = useState({
  //   past: [] as T[],
  //   present: initialPresent,
  //   future: [] as T[]
  // })

  const canUndo = state.past.length !== 0 // 表示有历史记录，可以往回时空穿梭（往后跳）
  const canRedo = state.future.length !== 0 // 表示有future的操作，可以往前跳

  const undo = useCallback(() => {
    setState(currentState => {
      const { past, present, future } = currentState
      if (past.length === 0) return currentState
      const previous = past[past.length - 1] // 历史记录中最新的那个
      const newPast = past.slice(0, past.length - 1) // 这时候新的past就不包括上面的previous了
      return {
        past: newPast,
        present: previous,
        future: [present, ...future]
      }
    })
  }, [])

  const redo = useCallback(() => {
    setState(currentState => {
      const { past, present, future } = currentState
      if (future.length === 0) return currentState
      const next = future[0] // f1
      const newFuture = future.slice(1) // [f2, f3]
      return {
        past: [...past, present],
        present: next,
        future: newFuture
      }
    })
  }, [])

  const set = useCallback((newPresent: T) => {
    setState(currentState => {
      const { past, present } = currentState
      if (newPresent === present) return currentState
      return {
        past: [...past, present],
        present: newPresent,
        future: []
      }
    })
  }, [])

  const reset = useCallback((newPresent: T) => {
    setState(() => {
      return {
        past: [],
        present: newPresent,
        future: []
      }
    })
  }, [])

  return [
    state,
    { set, reset, undo, redo, canUndo, canRedo }
  ] as const
}