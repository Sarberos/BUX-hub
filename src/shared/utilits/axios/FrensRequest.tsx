import api from "./axiosSetting";

class FrensFetching {
    static async myRefList() {
        const resp= await api.get('referal/my');
        return resp.data;
      }
    static async claimRefCoins() {
        const resp= await api.post('revenues/claim');
        return resp.data;
      }
}
export default FrensFetching;
