import { Spin } from "antd";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { urlAdmin, urlLogin } from "./routes/index";
import AdminTemplate from "./templates/AdminTemplate";
import LoginTemplate from "./templates/LoginTemplate";
import { useSelector } from "react-redux";

function App() {
  const { isLoading } = useSelector((state) => state.loadingReducer);
  return (
    <>
      { isLoading && <div className="spin_wrapper">
        <Spin/>
        </div>}
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
