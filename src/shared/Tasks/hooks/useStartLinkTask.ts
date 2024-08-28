import { useMutation} from "@tanstack/react-query"
import TasksFetching from "@shared/utilits/axios/TasksRequest"
import { TTaskItem } from "./useGetTasksInf"

export type TStartLinkTaskF= Pick<TTaskItem,'link' | 'id'>&{telegram_id:number}

export const useStartLinkTask=()=>{
    return useMutation({
        mutationKey:['start_link_task'],
        mutationFn: (taskData:TStartLinkTaskF)=>TasksFetching.startLinkTask(taskData),
    })
}