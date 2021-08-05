import { useAuth } from "context/auth-context";
import React from "react";
import { ProjectListScreen } from "screens/project-list";
import styled from "@emotion/styled";

export const AuthenticatedApp = () => {
  const { logout } = useAuth()
  return <Container>
    <Header>
      <HeaderLeft>
        <h3>logo</h3>
        <h3>项目</h3>
        <h3>用户</h3>
      </HeaderLeft>
      <HeaderRight>
        <button onClick={logout}>登出</button>
      </HeaderRight>
    </Header>
    <Nav>nav</Nav>
    <Main>
      <ProjectListScreen />
    </Main>
    <Aside>aside</Aside>
    <Footer>footer</Footer>
  </Container>
}

// step2.写container的布局样式
const Container = styled.div`
display: grid; // grid布局
grid-template-rows: 6rem 1fr 6rem; // 从上到下的高度，即header和footer各高6rem，中间高100vh - 12rem
grid-template-columns: 20rem 1fr 20rem; // // 从左到右的宽度，注意把header和footer也切成了3列
grid-template-areas: // 元素的排列方式
"header header header" // header独占一行，高6rem
"nav main aside" // 左nav 中间main 右aside，分别宽20rem 1fr 20rem
"footer footer footer" // footer独占一行，高6rem
;
height: 100vh;
/* grid-gap: 10rem; // 形容块与块之间的距离 */
`

// step1.分别定义这五个子元素
// grid-area 用来给grid子元素起名字
const Header = styled.header`
grid-area: header;
display: flex;
align-items: center;
justify-content: space-between;
`
const HeaderLeft = styled.div`
display: flex;
align-items: center;
`
const HeaderRight = styled.div``
const Main = styled.main`grid-area: main`
const Nav = styled.nav`grid-area: nav`
const Aside = styled.aside`grid-area: aside`
const Footer = styled.footer`grid-area: footer`