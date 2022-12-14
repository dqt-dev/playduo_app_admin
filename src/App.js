import { Route, Routes } from "react-router-dom";
import "./App.css";
import { urlAdmin, urlLogin } from "./routes/index";
import AdminTemplate from "./templates/AdminTemplate";
import LoginTemplate from "./templates/LoginTemplate";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { showMessageAct } from "./redux/Message/action";
import Loading from "./common/components/Loading";
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.loadingReducer);
  const {
    message: messageShow,
    isShow,
    importantLevel,
  } = useSelector((state) => state.messageReducer);
  useEffect(() => {
    if (isShow) {
      toast[
        importantLevel === "1"
          ? "success"
          : importantLevel === "2"
          ? "warning"
          : "error"
      ](messageShow, {
        position: toast.POSITION.TOP_CENTER,
      });

      dispatch(showMessageAct({ isShow: false, message: "" }));
    }
  }, [toast, isShow]);
  return (
    <>
            <ToastContainer />

      {isLoading && <Loading loading={true} />}
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
