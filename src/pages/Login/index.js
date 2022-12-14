import React, { useEffect } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useState } from "react";
import AuthenService from "../../services/AuthenService";
import { INFO_LOGIN, USER_TOKEN } from "../../common/SystemConstant/index";
import { useNavigate } from "react-router-dom";
import { getMyInfo } from "./../../redux/UserInfo/action";
import UserService from "../../services/UserSerice";
import { useDispatch } from "react-redux";
import { ls } from "../../utils/ls";
import { showMessageAct } from "./../../redux/Message/action";
import { loadingAct } from "../../redux/Loading/action";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    username: "",
    password: "",
  });
  const [remember, setRemember] = useState(false);

  useEffect(() => {
    const infoLogin = ls.get(INFO_LOGIN);
    if (infoLogin) {
      setInfo(infoLogin);
      setRemember(true);
    }
  }, []);

  const [message, setMessage] = useState({
    isValid: false,
    username: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    const valid = validate();
    if (valid.valid) {
      dispatch(loadingAct(true));
      AuthenService.Login({ username: info.username, password: info.password })
        .then((response) => {
          if (remember) {
            ls.set(INFO_LOGIN, info);
          } else {
            localStorage.removeItem(INFO_LOGIN);
          }

          localStorage.setItem(USER_TOKEN, response.data.token);
          (async () => {
            const user = await UserService.getMyInfo();
            if (user.data) {
              dispatch(loadingAct(false));

              dispatch(getMyInfo(user.data));
              navigate("/");
              dispatch(
                showMessageAct({
                  isShow: true,
                  message: "LOGIN SUCCESS",
                  importantLevel: "1",
                })
              );
            }
          })();
        })
        .catch((err) => {
          dispatch(loadingAct(false));
          let message = "LOGIN FAILED";
          localStorage.removeItem(INFO_LOGIN);
          dispatch(getMyInfo(null));
          dispatch(
            showMessageAct({
              isShow: true,
              message: message,
              importantLevel: "3",
            })
          );
        });
    }
  };

  const validateUserName = () => {
    const minLengthUserName = 5;
    let messageUserName = "";
    let valid = true;
    if (!info.username) {
      messageUserName = "Vui lòng nhập tên đăng nhập!";
      valid = false;
      return { valid, messageUserName };
    }
    if (info.username.length < minLengthUserName) {
      valid = false;
      messageUserName = `Chiều dài tối thiếu phải là ${minLengthUserName} ký tự`;
      return { valid, messageUserName };
    }
    return { valid, messageUserName };
  };

  const validateRegex = (regex, text) => {
    return regex.exec(text);
  };

  const validatePassword = () => {
    let password = "";
    let minLengthPassword = 8;
    let regexAll =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const valid = regexAll.test(info.password);
    if (!valid) {
      if (!info.password) {
        password = "Vui lòng nhập tên nhập mật khẩu!";
        return { valid, password };
      }
      if (info.password.length < minLengthPassword) {
        password = `Chiều dài tối thiếu phải là ${minLengthPassword} ký tự`;
        return { valid, password };
      }
      const regexCharLowerCase = /[a-z]/;
      if (!validateRegex(regexCharLowerCase, info.password)) {
        password = `Phải chứa ít nhất 1 chữ thường!`;
        return { valid, password };
      }
      const regexCharUpperCase = /[A-Z]/;
      if (!validateRegex(regexCharUpperCase, info.password)) {
        password = `Phải chứa ít nhất 1 chữ hoa!`;
        return { valid, password };
      }
      const regexNumber = /[0-9]/;
      if (!validateRegex(regexNumber, info.password)) {
        password = `Phải chứa ít nhất 1 số!`;
        return { valid, password };
      }
      const regexSpecialChar = /[[!@#$%^&*(),.?":{}|<>]/;
      if (!validateRegex(regexSpecialChar, info.password)) {
        password = `Phải chứa ít nhất 1 ký tự đặc biệt!`;
        return { valid, password };
      }
    }

    return { valid, password };
  };

  const validate = () => {
    // validate user name
    const validUserName = validateUserName();
    // validate password
    const validPassword = validatePassword();
    const valid = validUserName.valid && validPassword.valid;
    let validResult = {
      valid,
      username: validUserName.messageUserName,
      password: validPassword.password,
    };
    setMessage(validResult);
    return validResult;
  };

  const handleOnChange = (e) => {
      const { value, name } = e.target;
      setMessage({
        ...message,
        [name]: "",
      });
      setInfo({
        ...info,
        [name]: value,
      });
  };

  return (
    <div className="container">
    <div className="row">
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div className="card border-0 shadow rounded-3 my-5">
          <div className="card-body p-4 p-sm-5">
            <h5 className="card-title text-center mb-5 fw-light fs-5">
              Đăng nhập
            </h5>
            <form>
              <div className="form-floating mb-3">
                <input
                  name="username"
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Tên đăng nhập"
                  value={info.username}
                  onChange={handleOnChange}
                />
                <label htmlFor="floatingInput">Tên đăng nhập</label>
                <div
                  className={`invalid-feedback`}
                  style={{ display: message.username ? "block" : "none" }}
                >
                  {message.username}
                </div>
              </div>
              <div className="form-floating mb-3">
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Mật khẩu"
                  value={info.password}
                  onChange={handleOnChange}
                />
                <label htmlFor="floatingPassword">Mật khẩu</label>
                <div
                  className={`invalid-feedback`}
                  style={{ display: message.password ? "block" : "none" }}
                >
                  {message.password}
                </div>
              </div>

              <div className="form-check mb-3">
                <input
                  onChange={(e) => {
                    setRemember(!remember);
                  }}
                  className="form-check-input"
                  type="checkbox"
                  value={true}
                  checked={remember}
                  id="rememberPasswordCheck"
                />
                <label
                  className="form-check-label"
                  htmlFor="rememberPasswordCheck"
                >
                  Lưu mật khẩu
                </label>
              </div>
              <div className="d-grid">
                <button
                  onClick={handleLogin}
                  className="btn btn-primary btn-login text-uppercase fw-bold"
                  type="submit"
                >
                  Đăng nhập
                </button>
              </div>
              <hr className="my-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Login;
