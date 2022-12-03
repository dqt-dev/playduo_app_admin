import CategoryService from "../../services/CategoryService";
import { loadingAct } from "./../Loading/action";
import { showMessageAct } from "./../Message/action";
import { SET_CATEGORY_APPROVE } from "./type";

export const setCategory = (payload) => ({ type: SET_CATEGORY_APPROVE, payload });

export const getCategory = () => async (dispatch) => {
  dispatch(loadingAct(true));
  try {
    dispatch(setCategory(null));
    const res = await CategoryService.getAll();
    if (res.status === 200) {
      dispatch(setCategory(res.data));
    }
    dispatch(loadingAct(false));
  } catch (err) {
    dispatch(setCategory(null));
    dispatch(loadingAct(false));
    let message = "Lấy danh sách kỹ năng thành công!";
    dispatch(
      showMessageAct({
        isShow: true,
        message: message,
        importantLevel: "3",
      })
    );
  }
};

export const createCategory = (data, cb) => async (dispatch) => {
  dispatch(loadingAct(true));
  try {
    const res = await CategoryService.createCategory(data)
    if (res.status === 200) {
      dispatch(getCategory())
      let message = "Tạo danh mục thành công!";
      cb && cb();
      dispatch(
        showMessageAct({
          isShow: true,
          message: message,
          importantLevel: "1",
        })
      );
    }
    dispatch(loadingAct(false));
  } catch(err) {
    dispatch(loadingAct(false));
    let message = "Tạo danh mục không thành công!";
    dispatch(
      showMessageAct({
        isShow: true,
        message: message,
        importantLevel: "3",
      })
    );
  }
}



export const updateCategory = (categoryId,data, cb) => async (dispatch) => {
  dispatch(loadingAct(true));
  try {
    const res = await CategoryService.updateCategory(categoryId, data)
    if (res.status === 200) {
      dispatch(getCategory())
      let message = "Cập nhật danh mục thành công!";
      cb && cb();
      dispatch(
        showMessageAct({
          isShow: true,
          message: message,
          importantLevel: "1",
        })
      );
    }
    dispatch(loadingAct(false));
  } catch(err) {
    dispatch(loadingAct(false));
    let message = "Tạo danh mục không thành công!";
    dispatch(
      showMessageAct({
        isShow: true,
        message: message,
        importantLevel: "3",
      })
    );
  }
}