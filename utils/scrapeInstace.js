import axios from "axios";
import Cookies from "js-cookie";
const scrapInstance = axios.create({
  //  baseURL: "https://linkdin-bnyj.onrender.com/"
baseURL: "http://localhost:10000/"
});

scrapInstance.interceptors.request.use(
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

export default scrapInstance;
