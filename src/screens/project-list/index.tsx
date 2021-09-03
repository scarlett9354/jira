import React from "react"
import { useDebounce, useDocumentTitle } from "utils"
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import styled from "@emotion/styled"
import { Row, Typography } from "antd"
import { useProjects } from "utils/project"
import { useUsers } from "utils/user"
import { useProjectSearchParams } from "./util"

export const ProjectListScreen = (props: { projectButton: JSX.Element }) => {
  useDocumentTitle('项目列表', false)

  const [param, setParam] = useProjectSearchParams()
  const { isLoading, error, data: list, retry } = useProjects(useDebounce(param, 200))
  const { data: users } = useUsers()

  return <Container>
    <Row align="middle" justify="space-between">
      <h1>项目列表</h1>
      {props.projectButton}
    </Row>
    <SearchPanel users={users || []} param={param} setParam={setParam}></SearchPanel>
    {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
    <List
      projectButton={props.projectButton}
      refresh={retry}
      loading={isLoading}
      dataSource={list || []} users={users || []}
    />
  </Container>
}

const Container = styled.div`
padding: 3.2rem;
`