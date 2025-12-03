// //src\utils\api.js
// import axios from './axios.customize'

// const creatUserApi = async (username, email, password) => {
//   try {
//     const URL_API = "api/v1/register";
//     const res = await axios.post(URL_API, { username, email, password });

//     // res.data chính là dữ liệu thật bạn trả về từ Node.js (success, message, data)
//     return res;
//   } catch (error) {
//     console.error("Error in creatUserApi:", error.response?.data || error.message);
//     return null;
//   }
// };

// const loginApi = async (username, password) => {
//   try {
//     const URL_API = "api/v1/login";
//     const res = await axios.post(URL_API, { username, password });

//     // res.data chính là dữ liệu thật bạn trả về từ Node.js (success, message, data)
//     return res;
//   } catch (error) {
//     console.error("Error in loginApi:", error.response?.data || error.message);
//     return null;
//   }
// };

// export { creatUserApi, loginApi };

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
  }
};

export default userApi;
