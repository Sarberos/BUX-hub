import api from "./axiosSetting";


class TasksFetching {
  static async tasksList() {
    const resp= await api.get('task/all-tasks-with-user');
    return resp.data;
}
  static async startTask(id:number) {
    const resp= await api.post(`task/start-task/${id}`);
    return resp.data;
}
  static async tgCheckSubscribe(id:number) {
    const resp= await api.post(`/task/check-subscribe/${id}`);
    return resp.data;
}
  static async claimTaskCoins(id:number) {
    const resp= await api.post(`task/claim-task-coins/${id}`);
    return resp.data;
}
  static async mainTaskComplete(id:number) {
    const resp= await api.post(`task/complete-main/${id}`);
    return resp.data;
}

}
export default TasksFetching;
