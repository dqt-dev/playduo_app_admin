import { FAILED_USERS, REQUEST_USERS, SUCCESS_USERS } from "./type";
import UserService from "./../../services/UserSerice";
import { loadingAct } from "./../Loading/action";
import { showMessageAct } from "../Message/action";

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
      let message = 'FAILED'
      if (err.message) {
        message = err.message
      }
      dispatch(
        showMessageAct({
          isShow: true,
          message: message,
          importantLevel: "3",
        })
      );
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
        showMessageAct({
          isShow: true,
          message: "SUCCESS",
          importantLevel: "1",
        });
      }
      dispatch(loadingAct(false));
    } catch (err) {
      dispatch(loadingAct(false));
      let message = 'FAILED'
      if (err.message) {
        message = err.message
      }
      dispatch(
        showMessageAct({
          isShow: true,
          message: message,
          importantLevel: "3",
        })
      );
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
        showMessageAct({
          isShow: true,
          message: "SUCCESS",
          importantLevel: "1",
        });
      }
      dispatch(loadingAct(false));
    } catch (err) {
      dispatch(loadingAct(false));
      let message = 'FAILED'
      if (err.message) {
        message = err.message
      }
      dispatch(
        showMessageAct({
          isShow: true,
          message: message,
          importantLevel: "3",
        })
      );
    }
  };
};
