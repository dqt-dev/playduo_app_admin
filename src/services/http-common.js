import axios from "axios";
import { BASE_API, USER_TOKEN } from "../common/SystemConstant/index";

const api = axios.create({
  baseURL: BASE_API,
});

api.interceptors.request.use(
  function (config) {
    const toKenUser = "Bearer " + localStorage.getItem(USER_TOKEN);

    config.headers = {
      ...config.headers,
      Authorization: toKenUser,
    };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default api;
