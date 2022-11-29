import Login from './../pages/Login/index';
import Dashboard from './../pages/Dashboard/index';
import UserManagement from './../pages/UserManagement/index';
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
    }
]