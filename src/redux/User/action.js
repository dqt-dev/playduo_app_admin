import { FAILED_USERS, REQUEST_USERS, SUCCESS_USERS } from "./type";
import UserService from "./../../services/UserSerice";
import { loadingAct } from "./../Loading/action";

export const successUsers = (data) => ({ type: SUCCESS_USERS, payload: data });
export const failedUser = (err) => ({ type: FAILED_USERS, payload: err });
export const requestUsers = () => ({ type: REQUEST_USERS });

export const getUsers = () => {
  return async (dispatch) => {
    dispatch(loadingAct(true));
    try {
      dispatch(requestUsers());
      const res = await UserService.getUsers();
      if (res.status === 200) {
        dispatch(successUsers(res.data));
        dispatch(loadingAct(false));
      }
    } catch (err) {
      dispatch(failedUser(err));
      dispatch(loadingAct(false));
    }
  };
};

export const actDisableUser = (id) => {
  return async (dispatch) => {
    dispatch(loadingAct(true));
    try {
      const res = await UserService.disableUser(id);
      if (res.status === 200) {
        dispatch(getUsers());
      }
      dispatch(loadingAct(false));
    } catch (err) {
      dispatch(loadingAct(false));
    }
  };
};
export const actEnableUser = (id) => {
  return async (dispatch) => {
    dispatch(loadingAct(true));
    try {
      const res = await UserService.enableUser(id);
      if (res.status === 200) {
        dispatch(getUsers());
      }
      dispatch(loadingAct(false));
    } catch (err) {
      dispatch(loadingAct(false));
    }
  };
};
