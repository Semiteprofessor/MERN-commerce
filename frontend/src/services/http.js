import axios from "axios";

const getToken = () => {
  const cname = "token";
  if (typeof window !== "undefined") {
    let name = cname + "=";
    let decodeCookie = decodeURIComponent(document.cookie);
    let ca = decodeCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let ca = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  return "";
};

const baseUrl = process.env.BASE_URL;
const http = axios.create({
  baseURL: baseUrl + `http://localhost:8899/api`,
  timeout: 30000,
});

http.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;
