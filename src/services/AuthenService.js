import http from "./http-common";
const Login = (loginRequest) => {
    return http.post("Authen/login/admin", loginRequest);
  };

  const Register = (registerRequest) => {
    return http.post("Authen/register", registerRequest);

  }
const AuthenService = {
    Login,
    Register
};
export default AuthenService;