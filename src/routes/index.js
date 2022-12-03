import Login from './../pages/Login/index';
import Dashboard from './../pages/Dashboard/index';
import UserManagement from './../pages/UserManagement/index';
import UserDetail from '../pages/UserDetail';
import SkillsApprove from "../pages/SkillsApprove";
import Category from '../pages/Category';

export const urlLogin = [
    {
        id: 1,
        component: <Login/>,
        url: '/login',
    },
]
export const urlAdmin = [
    {
        id: 1,
        component: <Dashboard/>,
        url: '/'
    },
    {
        id: 2,
        component: <Dashboard/>,
        url: '/dashboard'
    },
    {
        id: 3,
        component: <UserManagement/>,
        url: '/user-management'
    },
    {
        id: 4,
        component: <SkillsApprove/>,
        url: 'skills-approve'
    },
    {
        id: 5,
        component: <Category/>,
        url: 'category'
    },
    {
        id: 3,
        component: <UserDetail/>,
        url: '/user/:userId'
    },
]