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
    // const dispatch=useAppDispatch();
    // const state= useAppSelector(state=>state.home);
    const {data,isLoading}=useQuery<TTaskInf>({
    queryKey:['task_inf'],
    queryFn: TasksFetching.tasksList,
})
// useEffect(()=>{
//     debugger
//     dispatch(callIsLoading(isLoading))
// },[isLoading])
// useEffect(()=>{
//     !isSuccess && navigate('/not_found')
// },[isSuccess])
return{data,isLoading}
}