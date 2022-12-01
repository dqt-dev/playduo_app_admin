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

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    userName: "",
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
    // const valid = validate();
    const valid = {
      valid: true,
    };
    if (valid.valid) {
      dispatch(
        showMessageAct({
          isShow: true,
          message: "LOGIN SUCCESS",
          importantLevel: "1",
        })
      );
      AuthenService.Login({ username: info.username, password: info.password })
        .then((response) => {
          // set token in local storage

          if (remember) {
            ls.set(INFO_LOGIN, info);
          } else {
            localStorage.removeItem(INFO_LOGIN);
          }

          localStorage.setItem(USER_TOKEN, response.data.token);
          (async () => {
            try {
              const user = await UserService.getMyInfo();
              if (user.data) {
                dispatch(getMyInfo(user.data));
              }
              dispatch(
                showMessageAct({ isShow: true, message: "LOGIN SUCCESS" })
              );
            } catch (error) {
              dispatch(getMyInfo(null));
            }
          })();
          navigate("/");
        })
        .catch((e) => {});
    }
  };

  // const validateUserName = () => {
  //   const minLengthUserName = 8;
  //   let messageUserName = "";
  //   let valid = true;
  //   if (!info.username) {
  //     messageUserName = "Vui lòng nhập tên đăng nhập!";
  //     valid = false;
  //     return { valid, messageUserName };
  //   }
  //   if (info.username.length < minLengthUserName) {
  //     valid = false;
  //     messageUserName = `Chiều dài tối thiếu phải là ${minLengthUserName} ký tự`;
  //     return { valid, messageUserName };
  //   }
  //   return { valid, messageUserName };
  // };

  // const validateRegex = (regex, text) => {
  //   return regex.exec(text);
  // };

  // const validatePassword = () => {
  //   let password = "";
  //   let minLengthPassword = 8;
  //   let regexAll =
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  //   const valid = regexAll.test(info.password);
  //   if (!valid) {
  //     if (!info.password) {
  //       password = "Vui lòng nhập tên nhập mật khẩu!";
  //       return { valid, password };
  //     }
  //     if (info.password.length < minLengthPassword) {
  //       password = `Chiều dài tối thiếu phải là ${minLengthPassword} ký tự`;
  //       return { valid, password };
  //     }
  //     const regexCharLowerCase = /[a-z]/;
  //     if (!validateRegex(regexCharLowerCase, info.password)) {
  //       password = `Phải chứa ít nhất 1 chữ thường!`;
  //       return { valid, password };
  //     }
  //     const regexCharUpperCase = /[A-Z]/;
  //     if (!validateRegex(regexCharUpperCase, info.password)) {
  //       password = `Phải chứa ít nhất 1 chữ hoa!`;
  //       return { valid, password };
  //     }
  //     const regexNumber = /[0-9]/;
  //     if (!validateRegex(regexNumber, info.password)) {
  //       password = `Phải chứa ít nhất 1 số!`;
  //       return { valid, password };
  //     }
  //     const regexSpecialChar = /[[!@#$%^&*(),.?":{}|<>]/;
  //     if (!validateRegex(regexSpecialChar, info.password)) {
  //       password = `Phải chứa ít nhất 1 ký tự đặc biệc!`;
  //       return { valid, password };
  //     }
  //   }

  //   return { valid, password };
  // };

  // const validate = () => {
  //   // validate user name
  //   const validUserName = validateUserName();
  //   // validate password
  //   const validPassword = validatePassword();
  //   const valid = validUserName.valid && validPassword.valid;
  //   let validResult = {
  //     valid,
  //     userName: validUserName.messageUserName,
  //     password: validPassword.password,
  //   };
  //   setMessage(validResult);
  //   return validResult;
  // };

  const handleOnChange = (name) => {
    return (e) => {
      const { value } = e.target;
      setMessage({
        ...message,
        [name]: "",
      });
      setInfo({
        ...info,
        [name]: value,
      });
    };
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={handleLogin}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        onChange={handleOnChange("username")}
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        onChange={handleOnChange("password")}
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Login;
