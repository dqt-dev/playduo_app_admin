import http from "./http-common";
const getAll = () => {
  return http.get("category");
};
const createCategory = (data) => {
  return http.post("category",data);
};

const updateCategory = (id,data) => {
  return http.put(`category?categoryId=${id}`,data);
};
const CategoryService = {
  getAll,
  createCategory,
  updateCategory
};
export default CategoryService;