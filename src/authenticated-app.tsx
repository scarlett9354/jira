import React from "react";
import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screens/project-list";
import { ReactComponent as SoftwareLogo } from 'assets/logo.svg'
import styled from "@emotion/styled";
import { Row } from "components/lib";
import { Button, Dropdown, Menu } from "antd";
import { Route, Routes } from "react-router";
import { BrowserRouter as Router } from 'react-router-dom'
import { ProjectScreen } from "screens/project";

export const AuthenticatedApp = () => {
  return <Container>
    <PageHeader />
    <Main>
      <Router>
        <Routes>
          <Route path={'/projects'} element={<ProjectListScreen />}></Route>
          <Route path={'/projects/:projectId/*'} element={<ProjectScreen />}></Route>
        </Routes>
      </Router>
    </Main>
  </Container>
}

const PageHeader = () => {
  const { logout, user } = useAuth()
  return <Header between>
    <HeaderLeft gap>
      <SoftwareLogo width={'6rem'} color={'rgb(38,132,255)'} />
      <h2>项目</h2>
      <h2>用户</h2>
    </HeaderLeft>
    <HeaderRight>
      <Dropdown overlay={<Menu>
        <Menu.Item key={'logoout'}>
          <Button type={'link'} onClick={logout}>登出</Button>
        </Menu.Item>
      </Menu>}>
        <Button type={'link'} onClick={e => e.preventDefault()}>
          Hi, {user?.name}
        </Button>
      </Dropdown>
    </HeaderRight>
  </Header>
}

const Container = styled.div`
display: grid; // grid布局
grid-template-rows: 6rem 1fr;
grid-template-areas:
"header"
"main"
;
height: 100vh;
`

const Header = styled(Row)`
grid-area: header;
padding: 3.2rem;
box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
z-index: 1;
`
const HeaderLeft = styled(Row)``
const HeaderRight = styled.div``
const Main = styled.main`grid-area: main`