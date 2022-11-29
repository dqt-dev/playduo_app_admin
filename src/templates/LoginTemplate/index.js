import  { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const LoginTemplate = ({ children, ...props }) => {
  const userInfo = useSelector((state) => state.userInfoReducer.userInfo);
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    if (userInfo) {
      setIsLogin(true)
    }
  }, [userInfo]);
  return !isLogin ? children : <Navigate to={"/"}/>;
};

export default LoginTemplate;
