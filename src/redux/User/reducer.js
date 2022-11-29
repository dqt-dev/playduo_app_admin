import { FAILED_USERS, REQUEST_USERS, SUCCESS_USERS } from "./type";

const initialState = {
  users: null,
  isLoading: false,
  error: null,
  totalCount: 0,
  totalPage: 0
};

export const userManagementReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SUCCESS_USERS:
      return {
        isLoading: false,
        error: null,
        users: payload.items,
        totalCount: payload.totalCount,
        totalPage: payload.totalPage
      };
    case FAILED_USERS:
      return {
        isLoading: false,
        error: payload,
        users: null,
      };
    case REQUEST_USERS:
      return {
        isLoading: true,
        error: null,
        users: null,
      };
    default:
      return state;
  }
};
