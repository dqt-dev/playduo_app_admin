import {
  SET_CATEGORY_APPROVE
} from "./type";

const initialState = {
  category: null,
};

export const categoryReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_CATEGORY_APPROVE:
      return {
        ...state,
        category: payload,
      };
    default:
      return state;
  }
};
