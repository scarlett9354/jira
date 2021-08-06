import React, { useEffect, useState } from "react"
import { cleanObject, useDebounce, useMount } from "utils"
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import { useHttp } from "utils/http"
import styled from "@emotion/styled"

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const [users, setUsers] = useState([])
  const [list, setList] = useState([])
  const client = useHttp()

  useMount(() => {
    client('users').then(setUsers)
  })

  const debouncedParam = useDebounce(param, 200)
  useEffect(() => {
    client('projects', { data: cleanObject(debouncedParam) }).then(setList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedParam])

  return <Container>
    <h1>项目列表</h1>
    <SearchPanel users={users} param={param} setParam={setParam}></SearchPanel>
    <List list={list} users={users}></List>
  </Container>
}

const Container = styled.div`
padding: 3.2rem;
`