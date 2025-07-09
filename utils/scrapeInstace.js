import axios from "axios";
import Cookies from "js-cookie";
const scrapInstance = axios.create({
baseURL: "https://linkedinscrap.sytes.net/"

//baseURL: "http://65.0.92.139:4000/"
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
