import axios from "../utils/axios.customize";

const userApi = {
  async register(username, email, password) {
    try {
      const res = await axios.post("api/v1/user/register", {
        username,
        email,
        password
      });
      return res;       // res.data là dữ liệu backend trả về
    } catch (error) {
      console.error("userApi.register error:", error.response?.data || error);
      return null;
    }
  },

  async login(username, password) {
    try {
      const res = await axios.post("api/v1/user/login", {
        username,
        password
      });
      return res;
    } catch (error) {
      console.error("userApi.login error:", error.response?.data || error);
      return null;
    }
  },

  async getMe() {
    try {
      const res = await axios.get("api/v1/customer/me");
      return res;      
    } catch (error) {
      console.error("userApi.getMe error:", error.response?.data || error);
      return null;
    }
  }
};

export default userApi;
