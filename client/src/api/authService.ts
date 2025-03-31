import axiosInstance from "./axiosInstance";

const authService = Object.freeze({
  async login(username: string, password: string) {
    const response = await axiosInstance.post("auth/login", {
      username,
      password,
    });

    return response;
  },
});

export default authService;
