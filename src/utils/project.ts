import { useEffect } from "react"
import { Project } from "screens/project-list/list"
import { cleanObject } from "utils"
import { useHttp } from "./http"
import { useAsync } from "./use-async"

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp()
  const { run, ...result } = useAsync<Project[]>()
  const fetchProjects = () => client('projects', { data: cleanObject(param || {}) })
  useEffect(() => {
    run(fetchProjects(), {
      retry: fetchProjects
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param])
  return result
}

// 这里需要传入参数，如果直接作为hook函数的参数传进来，在调用时需要在行间调用hook并传参(onCheckedChange={()=>useEditProject(id, {pin:true})})，不符合react规定，因为react hook必须放在顶层，不能放在函数里面
export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync()
  const client = useHttp()
  const mutate = (params: Partial<Project>) => {
    return run(client(`projects/${params.id}`, {
      data: params,
      method: 'PATCH'
    }))
  }
  return { mutate, ...asyncResult }
}

export const useAddProject = () => {
  const { run, ...asyncResult } = useAsync()
  const client = useHttp()
  const mutate = (params: Partial<Project>) => {
    return run(client(`projects/${params.id}`, {
      data: params,
      method: 'POST'
    }))
  }
  return { mutate, ...asyncResult }
}