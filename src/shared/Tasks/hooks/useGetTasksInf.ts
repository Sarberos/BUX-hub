import TasksFetching from '@shared/utilits/axios/TasksRequest'
import {useQuery} from '@tanstack/react-query'
import { EnumIcons } from '../types/taskImg.enum';

export type TTaskItem={
    task_picture:null|string;
    channel_id: string;
    coins:number,
    createdAt:string;
    description:string|null;
    id: number;
    link:string;
    main_task_id:number|null,
    status:'in-progress'|'pending'|'completed'|'claimed';
    sub_tasks:TTaskItem[],
    title:string,
    updatedAt:string,
    channel_link:null|string,
    icon:EnumIcons,
}
export  type TTaskInf={
    content:TTaskItem[],
    status: string,
}
export const useGetTasksInf=()=>{
    // const dispatch=useAppDispatch();
    // const state= useAppSelector(state=>state.home);
    return useQuery<TTaskInf>({
    queryKey:['task_inf'],
    queryFn: TasksFetching.tasksList,
})
}