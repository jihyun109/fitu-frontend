import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL
const axiosInstance = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem("Authorization");
    if (accessToken) {
      config.headers["Authorization"] = accessToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
// 아직 리프레쉬 토큰 없음
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response?.status === 401) {
//       const refreshToken = sessionStorage.getItem("RefreshToken");
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
