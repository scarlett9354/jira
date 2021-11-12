import React from "react"
import { useDebounce, useDocumentTitle } from "utils"
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import styled from "@emotion/styled"
import { Row, Typography } from "antd"
import { useProjects } from "utils/project"
import { useUsers } from "utils/user"
import { useProjectModal, useProjectSearchParams } from "./util"
import { ButtonNoPadding } from "components/lib"

export const ProjectListScreen = () => {
  useDocumentTitle('项目列表', false)

  const { open } = useProjectModal()

  const [param, setParam] = useProjectSearchParams()
  const { isLoading, error, data: list, retry } = useProjects(useDebounce(param, 200))
  const { data: users } = useUsers()

  return <Container>
    <Row align="middle" justify="space-between">
      <h1>项目列表</h1>
      <ButtonNoPadding type={'link'} onClick={open}>
        创建项目
      </ButtonNoPadding>
    </Row>
    <SearchPanel users={users || []} param={param} setParam={setParam}></SearchPanel>
    {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
    <List
      refresh={retry}
      loading={isLoading}
      dataSource={list || []} users={users || []}
    />
  </Container>
}

const Container = styled.div`
padding: 3.2rem;
`