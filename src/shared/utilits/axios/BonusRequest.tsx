import api from "./axiosSetting";

class BonusFetching {
  static async bonusStatuss() {
    const resp= await api.get('bonus/status');
    return resp.data;
}
  static async bonusClaim() {
    const resp= await api.post('bonus/claim');
    return resp.data;
}

}
export default BonusFetching;
