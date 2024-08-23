import api from "./axiosSetting";

class Fetching {
  static async farmStatus() {
    const resp= await api.get('farm/status');
    return resp.data;
}
  static async farmStart() {
    const resp= await api.post('farm/start');
    return resp.data;
}
  static async farmClaim() {
    const resp= await api.post('farm/claim');
    return resp.data;
}
}
export default Fetching;
