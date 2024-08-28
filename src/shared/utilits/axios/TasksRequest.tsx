import api from "./axiosSetting";
import { TStartLinkTaskF } from "@shared/Tasks/hooks/useStartLinkTask";

class TasksFetching {
  static async tasksList() {
    const resp= await api.get('task/all-tasks-with-user');
    return resp.data;
}
  static async startLinkTask({telegram_id=1,link,id}:TStartLinkTaskF) {
    const resp= await api.get(`task/goToLink/${telegram_id}/${link}/${id}`);
    return resp.data;
}
  static async startTask(id:number) {
    const resp= await api.post(`task/start-task/${id}`);
    return resp.data;
}
  static async tgSubscribe() {
    const resp= await api.post('task/start-task/:id');
    return resp.data;
}
  static async claimTaskCoins(id:number) {
    const resp= await api.post(`task/claim-task-coins/${id}`);
    return resp.data;
}
}
export default TasksFetching;
