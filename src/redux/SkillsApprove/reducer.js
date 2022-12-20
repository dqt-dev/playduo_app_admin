import { SET_SKILLS_APPROVE, SET_SKILLS_UPDATE } from "./type";

const initialState = {
  skills: null,
  skillsUpdate: null
};

export const skillsApproveReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_SKILLS_APPROVE:
      return {
        ...state,
        skills: payload,
      };
    case SET_SKILLS_UPDATE:
      return {
        ...state,
        skillsUpdate: payload,
      };
    default:
      return state;
  }
};
