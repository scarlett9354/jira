import { useCallback, useReducer } from "react"

const UNDO = 'UNDO'
const REDO = 'REDO'
const SET = 'SET'
const RESET = 'RESET'

type State<T> = {
  past: T[],
  present: T,
  future: T[]
}

// type规定这个action是什么类型，newPresent是作为数据的参数
type Action<T> = { newPresent?: T, type: typeof UNDO | typeof REDO | typeof SET | typeof RESET }

// reducer的基本的工作机制是从前面的state推断出后面的state，当我们把undoReducer用在useReducer()运行时，useReducer会自动给undoReducer传进来现在的state
const undoReducer = <T>(state: State<T>, action: Action<T>) => {
  const { past, present, future } = state
  const { type, newPresent } = action
  switch (type) {
    case UNDO: {
      if (past.length === 0) return state
      const previous = past[past.length - 1] // 历史记录中最新的那个
      const newPast = past.slice(0, past.length - 1) // 这时候新的past就不包括上面的previous了
      return {
        past: newPast,
        present: previous,
        future: [present, ...future]
      }
    }

    case REDO: {
      if (future.length === 0) return state
      const next = future[0] // f1
      const newFuture = future.slice(1) // [f2, f3]
      return {
        past: [...past, present],
        present: next,
        future: newFuture
      }
    }

    case SET: {
      if (newPresent === present) return state
      return {
        past: [...past, present],
        present: newPresent,
        future: []
      }
    }

    case RESET: {
      return {
        past: [],
        present: newPresent,
        future: []
      }
    }

    default:
      return state
  }
}

export const UseUndo = <T>(initialPresent: T) => {
  const [state, dispatch] = useReducer(undoReducer, {
    past: [],
    present: initialPresent,
    future: []
  } as State<T>)

  const canUndo = state.past.length !== 0 // 表示有历史记录，可以往回时空穿梭（往后跳）
  const canRedo = state.future.length !== 0 // 表示有future的操作，可以往前跳

  // 如果想让useReducer产值，必须调用dispatch
  const undo = useCallback(() => dispatch({ type: UNDO }), [])

  const redo = useCallback(() => dispatch({ type: REDO }), [])

  const set = useCallback((newPresent: T) => dispatch({ type: SET, newPresent }), [])

  const reset = useCallback((newPresent: T) => dispatch({ type: RESET, newPresent }), [])

  return [
    state,
    { set, reset, undo, redo, canUndo, canRedo }
  ] as const
}