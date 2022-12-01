import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { PieChartOutlined, UserOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import { INFO_LOGIN } from "./../../common/SystemConstant/index";
import { getMyInfo } from "./../../redux/UserInfo/action";
import { ls } from "../../utils/ls";
import { Avatar } from "antd";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items: MenuItem[] = [
  getItem(
    "Dashboard",
    "/dashboard",
    <Link to={"/dashboard"}>
      <PieChartOutlined />
    </Link>
  ),
  getItem(
    "User",
    "/user-management",
    <Link to={"/user-management"}>
      <UserOutlined />
    </Link>
  ),
];

const AdminTemplate = ({ children, ...props }) => {
  const userInfo = useSelector((state) => state.userInfoReducer.userInfo);
  const [isLogin, setIsLogin] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      // setIsLogin(false);
    }
  }, [userInfo]);
  const handleSignOut = () => {
    const infoLogin = ls.get(INFO_LOGIN);
    localStorage.clear();
    if (infoLogin) {
      ls.set(INFO_LOGIN, infoLogin);
    }
    dispatch(getMyInfo(null));
    navigate("/login");
  };
  return isLogin ? (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            selectedKeys={[location.pathname]}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              padding: 10,
            }}
          >
            <Avatar
              style={{ backgroundColor: "#87d068" }}
              icon={<UserOutlined />}
            />
            <Link
              style={{ marginLeft: "10px" }}
              to={"/login"}
              onClick={handleSignOut}
            >
              Logout
            </Link>
          </Header>
          <Content style={{ margin: "0 16px" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </>
  ) : (
    <Navigate to={"/login"} />
  );
};

export default AdminTemplate;
