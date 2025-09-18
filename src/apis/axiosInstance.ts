import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://ec2-3-35-143-24.ap-northeast-2.compute.amazonaws.com:8080",
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
