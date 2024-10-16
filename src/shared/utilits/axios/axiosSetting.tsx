import axios from "axios";

// export const apiUrl:string = "https://roxide-dev.up.railway.app/";
export const apiUrl:string = "https://api.bux-hub.pro/";


const api = axios.create({
  baseURL: apiUrl,
});

const parsedData= window.Telegram.WebApp.initData;

api.interceptors.request.use((config) => {
  if (apiUrl === "https://api.bux-hub.pro/") {
    config.headers.Authorization = `Bearer ${parsedData}`;

  }else if(apiUrl==="https://roxide-dev.up.railway.app/"){
    // config.headers.Authorization = `Bearer ${parsedData}`;
    config.headers.Authorization = `Bearer query_id=AAG2ZV01AAAAALZlXTWWMus6&user=%7B%22id%22%3A895313334%2C%22first_name%22%3A%22sarberos%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22Sarberos%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1726302042&hash=0749bddadd0cbdd8217e37f77cac43d7480e01bece7c06c99f59b03c1b2ef994`;
    config.headers.Authorization = `Bearer query_id=AAEzqFRIAAAAADOoVEipI-qC&user=%7B%22id%22%3A1213507635%2C%22first_name%22%3A%22%D0%9F%D0%B0%D0%B2%D0%B5%D0%BB%22%2C%22last_name%22%3A%22%D0%92%D0%BE%D0%BB%D1%87%D0%B5%D0%BA%22%2C%22username%22%3A%22Fist_a%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1725611288&hash=aef3bb36b3ef479036dc42bee88a3ae75066f15997db3c9527fd197eb24a0399`;
  }
  return config;
});
api.interceptors.response.use(response=>response,error=>{
  return Promise.reject({
    ...error.response.data
  })
});

export default api;