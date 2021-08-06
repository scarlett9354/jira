import { useAuth } from "context/auth-context";
import React from "react";
import { ProjectListScreen } from "screens/project-list";
import { ReactComponent as SoftwareLogo } from 'assets/logo.svg'
import styled from "@emotion/styled";
import { Row } from "components/lib";
import { Button, Dropdown, Menu } from "antd";

export const AuthenticatedApp = () => {
  const { logout, user } = useAuth()
  return <Container>
    <Header between>
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
padding: 3.2rem;
box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
z-index: 1;
`
const HeaderLeft = styled(Row)``
const HeaderRight = styled.div``
const Main = styled.main`grid-area: main`