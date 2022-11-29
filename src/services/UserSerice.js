import http from "./http-common";
const get = (id) => {
  return http.get("Users/" + id);
};

const getMyInfo = () => {
  return http.get("Users/me");
}

const UpdateUserInfo = (data) => {
  return http.put("Users/me", data);
}

const getTradesHistory = () => {
  return http.get("Users/me/tradehistory");
}

const Payment = (data) => {
  return http.put("Users/me/payment", data);
}

const UpdateStatus = (status) => {
  return http.put(`Users/status?isStatus=${status}`);
}

const getUsers = () => {
  return http.get(`Users/manage`)
}

const disableUser = (id: string) => {
  return http.put(`Users/${id}/disable`)
}

const enableUser = (id:string) => {
  return http.put(`Users/${id}/enable`)
}


const UserService = {
  get,
  getMyInfo,
  UpdateUserInfo,
  getTradesHistory,
  Payment,
  UpdateStatus,
  getUsers,
  disableUser,
  enableUser
};
export default UserService;
