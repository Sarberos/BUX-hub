import TasksFetching from "@shared/utilits/axios/TasksRequest"
import { useMutation} from "@tanstack/react-query"


export const useTgSubscribe=()=>{
    // const queryClient = useQueryClient()
    return useMutation({
        mutationKey:['tg subcs'],
        mutationFn: (id:number)=>TasksFetching.tgCheckSubscribe(id),
        // onSuccess: ()=>{queryClient.invalidateQueries({queryKey:['task_inf']})}
    })
}