import SkillService from "../../services/SkillService";
import { loadingAct } from "./../Loading/action";
import { showMessageAct } from "./../Message/action";
import { SET_SKILLS_APPROVE } from "./type";

export const setSkills = (payload) => ({ type: SET_SKILLS_APPROVE, payload });

export const getSkillsApprove = (data) => async (dispatch) => {
  dispatch(loadingAct(true));
  try {
    dispatch(setSkills(null));
    const res = await SkillService.getAll(data);
    if (res.status === 200) {
      dispatch(setSkills(res.data));
    }
    dispatch(loadingAct(false));
  } catch (err) {
    dispatch(setSkills(null));
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

export const actEnableUserSkill = (skillId) => {
  return async (dispatch) => {
    dispatch(loadingAct(true));
    try {
      const res = await SkillService.enableUserSkill(skillId);
      if (res.status === 200) {
        dispatch(getSkillsApprove({ isEnabled: false }));
        dispatch(
          showMessageAct({
            isShow: true,
            message: "Bật thành công!",
            importantLevel: "1",
          })
        );
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
