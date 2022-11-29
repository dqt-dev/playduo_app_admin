import { USER_INFO } from "../../common/SystemConstant";
import { LOGIN_ACTION, LOGOUT_ACTION, SET_MY_INFO } from "./type";
let userInfo = null
const userLogin = localStorage.getItem(USER_INFO)
if (userLogin) {
  userInfo = JSON.parse(userLogin)
}
const initialState = {
  userInfo,
  isLoading: false,
  error: null
};

export const userInfoReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_ACTION:
      return {
        state,
        payload,
      };
    case LOGOUT_ACTION:
      return initialState;
    case SET_MY_INFO:
      localStorage.setItem(USER_INFO,JSON.stringify(payload))
      return {
        isLoading:false,
        error: null,
        userInfo: payload
      };
    default:
      return state;
  }
};
