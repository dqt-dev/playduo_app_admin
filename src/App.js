import { Spin } from "antd";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { urlAdmin, urlLogin } from "./routes/index";
import AdminTemplate from "./templates/AdminTemplate";
import LoginTemplate from "./templates/LoginTemplate";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { useEffect } from "react";
import { showMessageAct } from "./redux/Message/action";

function App() {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.loadingReducer);
  const {
    message: messageShow,
    isShow,
    importantLevel,
  } = useSelector((state) => state.messageReducer);
  useEffect(() => {
    if (isShow) {
      messageApi.open({
        key: "a",
        duration: 3,
        type:
          importantLevel === "1"
            ? "success"
            : importantLevel === "2"
            ? "warning"
            : "error",
        content: messageShow,
        onClick: () => messageApi.destroy("a"),
      });
      dispatch(showMessageAct({ isShow: false, message: "" }));
    }
  }, [messageApi, isShow]);
  return (
    <>
      {contextHolder}
      {isLoading && (
        <div className="spin_wrapper">
          <Spin />
        </div>
      )}
      <Routes>
        {urlAdmin.map((item) => {
          return (
            <Route
              path={item.url}
              key={item.id}
              element={<AdminTemplate>{item.component}</AdminTemplate>}
            />
          );
        })}
        {urlLogin.map((item) => {
          return (
            <Route
              path={item.url}
              key={item.id}
              element={<LoginTemplate>{item.component}</LoginTemplate>}
            />
          );
        })}
      </Routes>
    </>
  );
}

export default App;
