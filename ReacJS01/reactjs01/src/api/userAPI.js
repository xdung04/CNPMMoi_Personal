import axiosClient from "./axiosClient";

const userApi = {
  register: (data) => axiosClient.post("/register", data),
  login: (data) => axiosClient.post("/login", data),
  getAccount: () => axiosClient.get("/account"),
};

export default userApi;
