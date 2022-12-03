import {
  SET_USER_DETAIL,
  REQUEST_USER_SKILLS,
  FAILED_USER_SKILLS,
  SUCCESS_USER_SKILLS,
} from "./type";

const initialState = {
  userDetail: null,
  skills: null,
};

export const userDetailReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_USER_DETAIL:
      return {
        ...state,
        userDetail: payload,
      };
    case SUCCESS_USER_SKILLS:
      return {
        ...state,
        skills: payload,
      };
    case FAILED_USER_SKILLS:
      return {
        ...state,
        skills: null,
      };
    case REQUEST_USER_SKILLS:
      return {
        ...state,
        skills: null,
      };
    default:
      return state;
  }
};
