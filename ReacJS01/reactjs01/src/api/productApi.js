import axiosClient from "./axiosClient";

const productApi = {
  getCategories: () => axiosClient.get("/categories"),
  getProducts: (params) => axiosClient.get("/products", { params }),
  search: (params) => axiosClient.get("/products/search", { params }),
};

export default productApi;
