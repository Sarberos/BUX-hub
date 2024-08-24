import api from "./axiosSetting";

class Fetching {
  static async tasksList() {
    const resp= await api.get('referral/my');
    return resp.data;
}
  static async completeTask() {
    const resp= await api.get('task/:telegram_id/goToLink/:link/:task_id');
    return resp.data;
}
  static async startTask() {
    const resp= await api.post('task/start-task/:id');
    return resp.data;
}
  static async tgSubscribe() {
    const resp= await api.post('task/start-task/:id');
    return resp.data;
}
  static async claimTaskCoins() {
    const resp= await api.post('task/claim-task-coins/:id');
    return resp.data;
}
}
export default Fetching;
