import axios from "axios";


const apiUrl = "https://roxide-dev.up.railway.app/";

const api = axios.create({
  baseURL: apiUrl,
});

// const parsedData= window.Telegram.Utils.urlParseQueryString(window.Telegram.WebApp.initData);

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer {"user":"{\"id\":1213507635,\"first_name\":\"Pavel\",\"last_name\":\"Volchek\",\"username\":\"Fist_a\",\"language_code\":\"ru\",\"allows_write_to_pm\":true}","chat_instance":"6314719466906384835","chat_type":"private","auth_date":"1724135187","hash":"208f6706b6497b3d60acbd3466bee58aad86941e996e6883d2b95e76318f996e"}`;
  return config;
});
api.interceptors.response.use(response=>response,error=>{
  return Promise.reject({
    ...error.response.data
  })
});


export default api;
