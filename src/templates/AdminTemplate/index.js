import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { PieChartOutlined, UserOutlined , CalendarOutlined } from "@ant-design/icons";
import { Image, MenuProps } from "antd";
import { Layout, Menu } from "antd";
import { INFO_LOGIN } from "./../../common/SystemConstant/index";
import { getMyInfo } from "./../../redux/UserInfo/action";
import { ls } from "../../utils/ls";
import { Avatar } from "antd";
import logo from '../../logo.gif';
import Title from "antd/es/typography/Title";
import {FaGamepad} from 'react-icons/fa';

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
    "Trang chủ",
    "/dashboard",
    <Link to={"/dashboard"}>
      <PieChartOutlined />
    </Link>
  ),
  getItem(
    "Quản lý người dùng",
    "/user-management",
    <Link to={"/user-management"}>
      <UserOutlined />
    </Link>
  ),
  getItem(
    "Quản lý kỹ năng",
    "/skills-approve",
    <Link to={"/skills-approve"}>
      <FaGamepad />
    </Link>
  ),
  getItem(
    "Quản lý danh mục",
    "/category",
    <Link to={"/category"}>
      <CalendarOutlined />
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
      setIsLogin(false);
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
        <Header
          className=" d-flex justify-content-between"
          style={{
            alignItems: "center",
            padding: 10,
          }}
        >
          <div className="d-flex">
          <Image
            width={40}
            src={logo}
            style= {{marginLeft : "10px"}}
          />
          <Title level={4} style= {{color: "white",marginTop : "20px", marginLeft: "15px"}} >YOYO</Title>
          </div>
          
          <div>
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
          </div>
        </Header>
        <Layout className="site-layout">
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
          <Content >
            <div
              className="site-layout-background ms-2 pt-2 ps-4 pe-4"
              style={{ minHeight: 360 }}
            >
              {children}
            </div>
          </Content>
        </Layout>
        <Footer style={{ textAlign: "center", marginLeft: "200px" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>

    </>
  ) : (
    <Navigate to={"/login"} />
  );
};

export default AdminTemplate;
