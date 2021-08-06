import { useAuth } from "context/auth-context";
import React from "react";
import { ProjectListScreen } from "screens/project-list";
import styled from "@emotion/styled";
import { Row } from "components/lib";

export const AuthenticatedApp = () => {
  const { logout } = useAuth()
  return <Container>
    <Header between>
      <HeaderLeft gap>
        <h2>logo</h2>
        <h2>项目</h2>
        <h2>用户</h2>
      </HeaderLeft>
      <HeaderRight>
        <button onClick={logout}>登出</button>
      </HeaderRight>
    </Header>
    <Main>
      <ProjectListScreen />
    </Main>
  </Container>
}

// step2.写container的布局样式
const Container = styled.div`
display: grid; // grid布局
grid-template-rows: 6rem 1fr;
grid-template-areas:
"header"
"main"
;
height: 100vh;
`

// step1.分别定义这五个子元素
// grid-area 用来给grid子元素起名字
const Header = styled(Row)`
grid-area: header;
`
const HeaderLeft = styled(Row)``
const HeaderRight = styled.div``
const Main = styled.main`grid-area: main`