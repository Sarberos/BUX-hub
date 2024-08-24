import api from "./axiosSetting";

class RaitingFetching {
  static async raitingList() {
    const resp= await api.get('user/raiting');
    return resp.data;
  }
}
export default RaitingFetching;
