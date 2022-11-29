import { SET_LOADING } from "./type";

const initialState = {
  isLoading: false
};

export const loadingReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_LOADING:
      return {
        isLoading: payload
      }
    default:
      return state;
  }
};
