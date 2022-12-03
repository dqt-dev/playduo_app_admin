import {userInfoReducer} from "./UserInfo/reducer"
import { userManagementReducer } from './User/reducer';
import { loadingReducer } from './Loading/reducer';
import { messageReducer } from './Message/reducer';
import { userDetailReducer } from './UserDetail/reducer';
const { combineReducers } = require("redux");
export const app = combineReducers({
    userInfoReducer,
    userManagementReducer,
    loadingReducer,
    messageReducer,
    userDetailReducer
})
