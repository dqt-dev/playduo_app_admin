import SkillService from "../../services/SkillService";
import { loadingAct } from "./../Loading/action";
import { showMessageAct } from "./../Message/action";
import { SET_SKILLS_APPROVE , SET_SKILLS_UPDATE} from "./type";

export const setSkills = (payload) => ({ type: SET_SKILLS_APPROVE, payload });
export const setSkillsUpdate = (payload) => ({ type: SET_SKILLS_UPDATE, payload });

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

export const getSkillsUpdate = () => async (dispatch) => {
  dispatch(loadingAct(true));
  try {
    dispatch(setSkillsUpdate(null));
    const res = await SkillService.getSkillTemp();
    if (res.status === 200) {
      dispatch(setSkillsUpdate(res.data));
    }
    dispatch(loadingAct(false));
  } catch (err) {
    dispatch(setSkillsUpdate(null));
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
        dispatch(getSkillsApprove({}));
        dispatch(getSkillsUpdate());
        dispatch(
          showMessageAct({
            isShow: true,
            message: "Kích hoạt kỹ năng thành công!",
            importantLevel: "1",
          })
        );
      }
      dispatch(loadingAct(false));
    } catch (err) {
      dispatch(loadingAct(false));
      let message = "Có lỗi xảy ra";
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

export const actAcceptUserSkill = (skillId) => {
  return async (dispatch) => {
    dispatch(loadingAct(true));
    try {
      const res = await SkillService.acceptUserSkill(skillId);
      if (res.status === 200) {
        dispatch(getSkillsApprove({}));
        dispatch(getSkillsUpdate());
        dispatch(
          showMessageAct({
            isShow: true,
            message: "Kỹ năng đã được cập nhật thành công!",
            importantLevel: "1",
          })
        );
      }
      dispatch(loadingAct(false));
    } catch (err) {
      dispatch(loadingAct(false));
      let message = "Có lỗi xảy ra";
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

export const actDisableUserSkill = (skillId) => {
  return async (dispatch) => {
    dispatch(loadingAct(true));
    try {
      const res = await SkillService.disableUserSkill(skillId);
      if (res.status === 200) {
        dispatch(getSkillsApprove({}));
        dispatch(getSkillsUpdate());
        dispatch(
          showMessageAct({
            isShow: true,
            message: "Vô hiệu hóa kỹ năng thành công!",
            importantLevel: "1",
          })
        );
      }
      dispatch(loadingAct(false));
    } catch (err) {
      dispatch(loadingAct(false));
      let message = "Có lỗi xảy ra";
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
