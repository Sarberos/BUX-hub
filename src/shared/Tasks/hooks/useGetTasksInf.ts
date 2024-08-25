import TasksFetching from '@shared/utilits/axios/TasksRequest'
import {useQuery} from '@tanstack/react-query'

export type TTaskItem={
    channel_id: string;
    coins:number,
    createdAt:string;
    description:string|null;
    id: number;
    link:string;
    main_task_id:number,
    status:string;
    sub_tasks:TTaskItem[],
    title:string,
    updatedAt:string,
}
export  type TTaskInf={
    content:TTaskItem[],
    status: string,
}
export const useGetTasksInf=()=>{
    return useQuery<TTaskInf>({
        queryKey:['task_inf'],
        queryFn: TasksFetching.tasksList,
    })
}