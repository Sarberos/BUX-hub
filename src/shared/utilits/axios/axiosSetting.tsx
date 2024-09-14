import axios from "axios";

export const apiUrl = "https://roxide-dev.up.railway.app/";
// export const apiUrl = "https://api.bux-hub.pro/";

const api = axios.create({
  baseURL: apiUrl,
});

const parsedData= window.Telegram.WebApp.initData;

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${parsedData}`;
  // config.headers.Authorization = `Bearer query_id=AAG2ZV01AAAAALZlXTWWMus6&user=%7B%22id%22%3A895313334%2C%22first_name%22%3A%22sarberos%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22Sarberos%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1726302042&hash=0749bddadd0cbdd8217e37f77cac43d7480e01bece7c06c99f59b03c1b2ef994`;
  return config;
});
api.interceptors.response.use(response=>response,error=>{
  return Promise.reject({
    ...error.response.data
  })
});

export default api;