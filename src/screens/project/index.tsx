import React from "react";
import { Link } from "react-router-dom";
import { Navigate, Route, Routes } from 'react-router'
import { KanbanScreen } from "screens/kanban";
import { EpicScreen } from "screens/epic";

export const ProjectScreen = () => {
  return <div>
    <h1>project screen</h1>
    {/* 加斜线是根路由 */}
    {/* <Link to={'/kanban'}>看板</Link> */}
    <Link to={'kanban'}>看板</Link>
    <Link to={'epic'}>任务组</Link>
    <Routes>
      {/* projects/:projectId/kanban */}
      <Route path={'/kanban'} element={<KanbanScreen />}></Route>
      {/* projects/:projectId/epic */}
      <Route path={'/epic'} element={<EpicScreen />}></Route>
      {/* 如果不能匹配上面写的两个路由，就统一打开kanban */}
      <Navigate to={window.location.pathname + '/kanban'} />
    </Routes>
  </div>
}