import { SHOW_MESSAGE } from "./type";

const initialState = {
  isShow: false,
  message: '',
  importantLevel: '1'
};

export const messageReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SHOW_MESSAGE:
      return {
        isShow: payload.isShow,
        message: payload.message,
        importantLevel: payload.importantLevel
      }
    default:
      return state;
  }
};
