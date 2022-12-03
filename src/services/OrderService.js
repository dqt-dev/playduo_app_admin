import http from "./http-common";
const getReviewBySkillId = (skillId) => {
  return http.get("Orders/review/" + skillId);
};
const createNewOrder = (requestCreateOrder) => {
  return http.post("Orders/me", requestCreateOrder );
};
const ratingOrder = (orderId, requestRatingOrder) => {
  return http.put(`Orders/${orderId}/rating`, requestRatingOrder );
};
const getNewOrder = () => {
  return http.get("Orders/me");
};
const getOrdersManage = () => {
  return http.get("Orders/manage");
};
const ConfirmOrder = (orderId) => {
  return http.put(`Orders/${orderId}/confirm`)
}
const CancelOrder = (orderId) => {
  return http.put(`Orders/${orderId}/cancel`)
}
const FinishOrder = (orderId) => {
  return http.put(`Orders/${orderId}/finish`)
}
const OrderService = {
    getReviewBySkillId,
    createNewOrder,
    getOrdersManage,
    ConfirmOrder,
    CancelOrder,
    getNewOrder,
    ratingOrder,
    FinishOrder
};
export default OrderService;