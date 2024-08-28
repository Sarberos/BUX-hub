import axios from "axios";

const apiUrl = "https://roxide-dev.up.railway.app/";
// const apiUrl = "https://api.bux-hub.pro/";

const api = axios.create({
  baseURL: apiUrl,
});

// const parsedData= window.Telegram.Utils.urlParseQueryString(window.Telegram.WebApp.initData);
const parsedData= btoa(window.Telegram.WebApp.initData);

api.interceptors.request.use((config) => {
  // config.headers.Authorization = `Bearer ${JSON.stringify(parsedData)}`;
  config.headers.Authorization = `Bearer ${(parsedData)}`;
  return config;
});
api.interceptors.response.use(response=>response,error=>{
  return Promise.reject({
    ...error.response.data
  })
});

export default api;
