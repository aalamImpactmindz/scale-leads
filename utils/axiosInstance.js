import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: "https://impactmindz.in/client/scaleleads",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("authToken");
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;


// const scrapInstance = axios.create({
//   baseURL: "https://impactmindz.in/client/scaleleads",
// });

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = Cookies.get("authToken");
//     if (token) {
//       config.headers.authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
