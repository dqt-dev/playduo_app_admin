import { FAILED_USER_SKILLS, REQUEST_USER_SKILLS, SUCCESS_USER_SKILLS, SET_USER_DETAIL } from "./type";
import { loadingAct } from "../Loading/action";
import { showMessageAct } from "../Message/action";
import SkillService from "../../services/SkillService";
import UserService from "../../services/UserSerice";

export const skillsSuccess = (data) => ({ type: SUCCESS_USER_SKILLS, payload: data });
export const setUserDetail = (data) => ({ type: SET_USER_DETAIL, payload: data });
export const failedSkills = (err) => ({ type: FAILED_USER_SKILLS, payload: err });
export const requestSkill = () => ({ type: REQUEST_USER_SKILLS });

export const getAllSkills = (data) => {
  return async (dispatch) => {
    dispatch(loadingAct(true));
    try {
      dispatch(requestSkill());
      const res = await SkillService.getAll(data);
      if (res.status === 200) {
        dispatch(skillsSuccess(res.data));
      }
      dispatch(loadingAct(false));
    } catch (err) {
      dispatch(failedSkills(err));
      dispatch(loadingAct(false));
      let message = "Lấy danh sách kỹ năng thành công!";
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

export const getGetUserDetail = (userId) => {
  return async (dispatch) => {
    dispatch(loadingAct(true));
        dispatch(setUserDetail(null));
        try {
      const res = await UserService.get(userId);
      if (res.status === 200) {
        dispatch(setUserDetail(res.data));
      }
      dispatch(loadingAct(false));
    } catch (err) {
      dispatch(loadingAct(false));
      let message = "Không thể lấy chi tiết người dùng!";
        dispatch(setUserDetail(null));
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

export const actDisableUserSkill = (id, skillId) => {
  return async (dispatch) => {
    dispatch(loadingAct(true));
    try {
      const res = await SkillService.disableUserSkill(skillId);
      if (res.status === 200) {
        dispatch(getAllSkills({userId:id}));
        dispatch(getGetUserDetail(id))
        dispatch(
          showMessageAct({
            isShow: true,
            message: "Vô hiệu hoá thành công!",
            importantLevel: "1",
          })
        );
      }
      dispatch(loadingAct(false));
    } catch (err) {
      dispatch(loadingAct(false));
      let message = "Thất bại!";
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
export const actEnableUserSkill = (id,skillId) => {
  return async (dispatch) => {
    dispatch(loadingAct(true));
    try {
      const res = await SkillService.enableUserSkill(skillId);
      if (res.status === 200) {
        dispatch(getAllSkills({userId:id}));
        dispatch(getGetUserDetail(id))
        dispatch(showMessageAct({
          isShow: true,
          message: "Bật thành công!",
          importantLevel: "1",
        }));
      }
      dispatch(loadingAct(false));
    } catch (err) {
      dispatch(loadingAct(false));
      let message = "Thất bại";
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
