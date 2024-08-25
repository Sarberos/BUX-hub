import TasksFetching from '@shared/utilits/axios/TasksRequest'
import {useQuery} from '@tanstack/react-query'

export  type TTaskInf={

}
export const useGetTasksInf=()=>{
    return useQuery<TTaskInf>({
        queryKey:['task_inf'],
        queryFn: TasksFetching.tasksList,
    })
}