import {
  SET_SKILLS_APPROVE
} from "./type";

const initialState = {
  skills: null,
};

export const skillsApproveReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_SKILLS_APPROVE:
      return {
        ...state,
        skills: payload,
      };
    default:
      return state;
  }
};
