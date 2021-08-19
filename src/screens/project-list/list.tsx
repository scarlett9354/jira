import React from "react"
import { User } from 'screens/project-list/search-panel'
import { Table, TableProps } from 'antd'
import dayjs from "dayjs"
// react-router 和 react-router-dom的关系，类似于react 和 react-dom/react-native/react-vr...
// react是一个核心的库，里面主要处理虚拟的、计算的、理论的逻辑，类似于在组件中的state、useEffect的状态怎么影响虚拟dom树，这次的虚拟dom树和上次的虚拟dom树中间的diff运算，都是在react中处理的
// 经过一系列的计算，得出的结果就会被react-dom消费。
// 为什么一开始不把react和react-dom结合在一起，因为react-dom主要生活在浏览器的宿主环境里，里面充满了dom操作，而这些dom操作只能在浏览器中运行；而react-native是用来的在native环境如在ios和安卓环境中来消费react运算出的结果；react-vr也一样，来消费那个结果并渲染在ps5上
// react-router主要用来管理路由状态，所以Routes和Route都是从它中引入进来，它们在内存中就像是个对象，用来计算当前这个路由树是怎样的，计算结果就给react-router-dom消费，或者也可以给native环境消费。
import { Link } from "react-router-dom"

export interface Project {
  id: string
  name: string
  personId: string
  pin: Boolean
  organization: string
  created: number
}

interface ListProps extends TableProps<Project> {
  users: User[]
}

export const List = ({ users, ...props }: ListProps) => {
  return <Table pagination={false} columns={[{
    title: '名称',
    sorter: (a, b) => a.name.localeCompare(b.name), // 可以排序中文字符
    render(value, project) {
      return <Link to={String(project.id)}>{project.name}</Link>
    }
  }, {
    title: '部门',
    dataIndex: 'organization'
  }, {
    title: '负责人',
    render(value, project) {
      return <span>
        {users.find(user => user.id === project.personId)?.name || '未知'}
      </span>
    }
  }, {
    title: '创建时间',
    render(value, project) {
      return <span>
        {project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'}
      </span>
    }
  }]}
    {...props} />
}