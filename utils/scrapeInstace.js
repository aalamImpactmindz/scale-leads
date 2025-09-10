import axios from "axios";
import Cookies from "js-cookie";
const scrapInstance = axios.create({

baseURL: process.env.NEXT_PUBLIC_SCRAPE_URL



});

scrapInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("authToken");
    const ua = Cookies.get("ua");
   
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
      config.headers.userAgent=`${ua}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default scrapInstance;
