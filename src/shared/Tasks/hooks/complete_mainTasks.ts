import TasksFetching from "@shared/utilits/axios/TasksRequest"
import { useMutation, useQueryClient} from "@tanstack/react-query"


export const useCompleteMainTask=()=>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey:['complete_main_task'],
        mutationFn: (id:number)=>TasksFetching.mainTaskComplete(id),
        onSuccess: ()=>{queryClient.invalidateQueries({queryKey:['task_inf']})}
    })
}