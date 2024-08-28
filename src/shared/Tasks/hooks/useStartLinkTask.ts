import {  useQuery} from "@tanstack/react-query"
import TasksFetching from "@shared/utilits/axios/TasksRequest"
import { TTaskItem } from "./useGetTasksInf"

export type TStartLinkTaskF= Pick<TTaskItem,'link' | 'id'>&{telegram_id:number|undefined}

export const useStartLinkTask=(taskData:TStartLinkTaskF,enabled:boolean)=>{
    return useQuery({
        queryKey:['start_link_task',taskData.id,taskData.link,taskData.telegram_id],
        queryFn:()=> TasksFetching.startLinkTask(taskData),
        enabled,
    })
}