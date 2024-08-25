import { useMutation} from "@tanstack/react-query"
import TasksFetching from "@shared/utilits/axios/TasksRequest"


export const useStartTask=()=>{
    return useMutation({
        mutationKey:['start_task'],
        mutationFn: (taskId:number)=>TasksFetching.startTask(taskId),
    })
}