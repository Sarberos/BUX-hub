import TasksFetching from '@shared/utilits/axios/TasksRequest'
import {useQuery} from '@tanstack/react-query'
// import { useAppDispatch } from '@shared/utilits/redux/hooks';
// import { callIsLoading } from '@shared/utilits/redux/redux_slice/home_slice';
// import { useEffect } from 'react';

export type TTaskItem={
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