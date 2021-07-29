import React, { useEffect, useState } from "react"
import { cleanObject, useDebounce, useMount } from "utils"
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import * as qs from "qs"

const apiUrl = process.env.REACT_APP_API_URL
export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const [users, setUsers] = useState([])
  const [list, setList] = useState([])

  // 传入[]表示只在页面初始化时触发一次
  useMount(() => {
    fetch(`${apiUrl}/users`).then(async response => {
      if (response.ok) {
        // 说明请求成功了，还得添加一个table列表的state
        setUsers(await response.json())
      }
    })
  })

  const debouncedParam = useDebounce(param, 200)
  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`).then(async response => {
      if (response.ok) {
        // 说明请求成功了，还得添加一个table列表的state
        setList(await response.json())
      }
    })
  }, [debouncedParam])

  return <div>
    <SearchPanel users={users} param={param} setParam={setParam}></SearchPanel>
    <List list={list} users={users}></List>
  </div>
}